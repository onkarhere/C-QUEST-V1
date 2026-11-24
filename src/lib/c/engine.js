// A small C interpreter for teaching: tokenizer -> parser -> tree-walking evaluator.
// Supports the subset used by the campaign: output, arithmetic, conditions, loops,
// functions, recursion, arrays, strings, pointers and simple structs.

export class CError extends Error {
  constructor(message, line = 0, kind = "syntax") {
    super(message);
    this.name = "CError";
    this.line = line;
    this.kind = kind;
  }
}

const TYPE_WORDS = new Set([
  "int", "char", "void", "float", "double", "long", "short", "unsigned", "signed",
  "const", "static", "extern", "volatile", "register", "bool",
]);

const KEYWORDS = new Set([
  "if", "else", "for", "while", "do", "return", "break", "continue", "sizeof", "struct",
  "typedef", "switch", "case", "default", "goto", "enum", "union",
]);

const BUILTIN_NAMES = new Set([
  "printf", "puts", "putchar", "strlen", "strcpy", "abs", "getchar", "scanf", "malloc", "free",
]);

const TWO_CHAR = new Set([
  "++", "--", "->", "+=", "-=", "*=", "/=", "%=", "==", "!=", "<=", ">=", "&&", "||", "<<", ">>",
  "&=", "|=", "^=",
]);

const SINGLE_CHARS = "(){}[];,.:+-*/%=<>!&|^~?#";

function escapeChar(ch) {
  switch (ch) {
    case "n": return "\n";
    case "t": return "\t";
    case "r": return "\r";
    case "0": return "\0";
    case "\\": return "\\";
    case '"': return '"';
    case "'": return "'";
    case "a": return "\x07";
    case "b": return "\b";
    default: return ch ?? "";
  }
}

export function tokenize(src) {
  const toks = [];
  let i = 0;
  let line = 1;
  const n = src.length;

  while (i < n) {
    const ch = src[i];
    if (ch === "\n") { line++; i++; continue; }
    if (ch === " " || ch === "\t" || ch === "\r" || ch === "\f" || ch === "\v") { i++; continue; }

    if (ch === "/" && src[i + 1] === "/") {
      while (i < n && src[i] !== "\n") i++;
      continue;
    }
    if (ch === "/" && src[i + 1] === "*") {
      i += 2;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) {
        if (src[i] === "\n") line++;
        i++;
      }
      i += 2;
      continue;
    }
    if (ch === "#") {
      while (i < n && src[i] !== "\n") i++;
      continue;
    }

    if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(src[i + 1] || ""))) {
      const start = i;
      let isFloat = false;
      if (ch === "0" && (src[i + 1] === "x" || src[i + 1] === "X")) {
        i += 2;
        while (/[0-9a-fA-F]/.test(src[i] || "")) i++;
        toks.push({ t: "num", v: parseInt(src.slice(start, i), 16), isFloat: false, line });
        continue;
      }
      while (/[0-9]/.test(src[i] || "")) i++;
      if (src[i] === ".") { isFloat = true; i++; while (/[0-9]/.test(src[i] || "")) i++; }
      if (/[eE]/.test(src[i] || "")) {
        isFloat = true;
        i++;
        if (/[+-]/.test(src[i] || "")) i++;
        while (/[0-9]/.test(src[i] || "")) i++;
      }
      if (/[fFlLuU]/.test(src[i] || "")) i++;
      const raw = src.slice(start, i).replace(/[fFlLuU]$/, "");
      toks.push({ t: "num", v: isFloat ? parseFloat(raw) : parseInt(raw, 10), isFloat, line });
      continue;
    }

    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (/[A-Za-z0-9_]/.test(src[j] || "")) j++;
      toks.push({ t: "id", v: src.slice(i, j), line });
      i = j;
      continue;
    }

    if (ch === '"') {
      i++;
      let out = "";
      while (i < n && src[i] !== '"') {
        if (src[i] === "\\") { out += escapeChar(src[i + 1]); i += 2; }
        else { if (src[i] === "\n") line++; out += src[i]; i++; }
      }
      if (i >= n) throw new CError("This string is never closed — add a matching \" at the end.", line, "syntax");
      i++;
      toks.push({ t: "str", v: out, line });
      continue;
    }

    if (ch === "'") {
      i++;
      let out = "";
      while (i < n && src[i] !== "'") {
        if (src[i] === "\\") { out += escapeChar(src[i + 1]); i += 2; }
        else { out += src[i]; i++; }
      }
      if (i >= n) throw new CError("This character literal is never closed — use 'a' with two quotes.", line, "syntax");
      i++;
      toks.push({ t: "char", v: out.charCodeAt(0) || 0, line });
      continue;
    }

    const three = src.substr(i, 3);
    let matched = null;
    if (three === "<<=" || three === ">>=") matched = three;
    if (!matched && TWO_CHAR.has(src.substr(i, 2))) matched = src.substr(i, 2);
    if (!matched && SINGLE_CHARS.includes(ch)) matched = ch;
    if (!matched) throw new CError(`The character "${ch}" doesn't belong in a C program.`, line, "syntax");
    toks.push({ t: "op", v: matched, line });
    i += matched.length;
  }

  toks.push({ t: "eof", v: "", line });
  return toks;
}

const BIN_LEVELS = [
  ["||"], ["&&"], ["|"], ["^"], ["&"], ["==", "!="],
  ["<", ">", "<=", ">="], ["<<", ">>"], ["+", "-"], ["*", "/", "%"],
];

class Parser {
  constructor(toks) {
    this.toks = toks;
    this.i = 0;
  }

  peek(k = 0) {
    return this.toks[this.i + k] || { t: "eof", v: "", line: 0 };
  }

  next() {
    return this.toks[this.i++] || { t: "eof", v: "", line: 0 };
  }

  is(v) {
    return this.peek().v === v;
  }

  eat(v) {
    if (this.is(v)) { this.i++; return true; }
    return false;
  }

  expect(v) {
    const tk = this.next();
    if (tk.v !== v) {
      const found = tk.v ? `'${tk.v}'` : "the end of the file";
      throw new CError(`Expected '${v}' but found ${found}.`, tk.line || this.peek().line, "syntax");
    }
    return tk;
  }

  isTypeWord(tk = this.peek()) {
    return tk.t === "id" && TYPE_WORDS.has(tk.v);
  }

  parseType() {
    let type = null;
    const line = this.peek().line;
    while (this.isTypeWord()) {
      const w = this.next().v;
      if (w === "char") type = "char";
      else if (w === "float" || w === "double") type = "double";
      else if (w === "void") type = "void";
      else if (!type) type = "int";
    }
    if (!type) throw new CError("Expected a type such as int, double or char.", line, "syntax");
    return type;
  }

  skipStatement() {
    let depth = 0;
    while (this.peek().t !== "eof") {
      const tk = this.next();
      if (tk.v === "{") depth++;
      else if (tk.v === "}") { depth--; if (depth <= 0) return; }
      else if (tk.v === ";" && depth === 0) return;
    }
  }

  parseParams() {
    this.expect("(");
    const params = [];
    if (this.is(")")) { this.next(); return params; }
    if (this.is("void") && this.peek(1).v === ")") { this.next(); this.next(); return params; }
    do {
      const type = this.parseType();
      let ptr = 0;
      while (this.is("*")) { this.next(); ptr++; }
      let name = `arg${params.length}`;
      if (this.peek().t === "id") name = this.next().v;
      params.push({ name, type, ptr: ptr > 0 });
    } while (this.eat(","));
    this.expect(")");
    return params;
  }

  parseDeclarators(type) {
    const decls = [];
    do {
      let ptr = 0;
      while (this.is("*")) { this.next(); ptr++; }
      const nm = this.next();
      if (nm.t !== "id") throw new CError("Expected a variable name.", nm.line, "syntax");
      const d = { name: nm.v, type, ptr: ptr > 0, isArray: false, size: null, init: null, line: nm.line };
      if (this.is("[")) {
        this.next();
        if (!this.is("]")) d.size = this.parseExpr();
        this.expect("]");
        d.isArray = true;
      }
      if (this.eat("=")) d.init = this.parseInitializer();
      decls.push(d);
    } while (this.eat(","));
    return decls;
  }

  parseInitializer() {
    if (this.is("{")) {
      this.next();
      const items = [];
      if (!this.is("}")) {
        do { items.push(this.parseAssign()); } while (this.eat(","));
      }
      this.expect("}");
      return { k: "initlist", items, line: this.peek().line };
    }
    return this.parseAssign();
  }

  parseProgram() {
    const functions = {};
    const globals = [];
    while (this.peek().t !== "eof") {
      if (this.is("struct") || this.is("typedef") || this.is("enum") || this.is("union")) {
        this.skipStatement();
        continue;
      }
      const type = this.parseType();
      let ptr = 0;
      while (this.is("*")) { this.next(); ptr++; }
      const nameTok = this.next();
      if (nameTok.t !== "id") {
        throw new CError("Expected a name after the type. A declaration looks like: int score = 0;", nameTok.line, "syntax");
      }
      if (this.is("(")) {
        const params = this.parseParams();
        const body = this.parseBlock();
        functions[nameTok.v] = { name: nameTok.v, params, body };
        continue;
      }
      const decls = [];
      const cur = { name: nameTok.v, type, ptr: ptr > 0, isArray: false, size: null, init: null, line: nameTok.line };
      if (this.is("[")) {
        this.next();
        if (!this.is("]")) cur.size = this.parseExpr();
        this.expect("]");
        cur.isArray = true;
      }
      if (this.eat("=")) cur.init = this.parseInitializer();
      decls.push(cur);
      while (this.eat(",")) {
        let p2 = 0;
        while (this.is("*")) { this.next(); p2++; }
        const nm = this.next();
        if (nm.t !== "id") throw new CError("Expected a variable name.", nm.line, "syntax");
        const d = { name: nm.v, type, ptr: p2 > 0, isArray: false, size: null, init: null, line: nm.line };
        if (this.is("[")) {
          this.next();
          if (!this.is("]")) d.size = this.parseExpr();
          this.expect("]");
          d.isArray = true;
        }
        if (this.eat("=")) d.init = this.parseInitializer();
        decls.push(d);
      }
      this.expect(";");
      globals.push(...decls);
    }
    return { functions, globals };
  }

  parseBlock() {
    const line = this.peek().line;
    this.expect("{");
    const body = [];
    while (!this.is("}")) {
      if (this.peek().t === "eof") throw new CError("A block is missing its closing '}'.", line, "syntax");
      body.push(this.parseStatement());
    }
    this.expect("}");
    return { k: "block", body, line };
  }

  parseStatement() {
    const tk = this.peek();
    if (this.is("{")) return this.parseBlock();
    if (this.is(";")) { this.next(); return { k: "empty", line: tk.line }; }

    if (this.is("if")) {
      this.next();
      this.expect("(");
      const cond = this.parseExpr();
      this.expect(")");
      const then = this.parseStatement();
      let alt = null;
      if (this.is("else")) { this.next(); alt = this.parseStatement(); }
      return { k: "if", cond, then, alt, line: tk.line };
    }

    if (this.is("while")) {
      this.next();
      this.expect("(");
      const cond = this.parseExpr();
      this.expect(")");
      const body = this.parseStatement();
      return { k: "while", cond, body, line: tk.line };
    }

    if (this.is("do")) {
      this.next();
      const body = this.parseStatement();
      this.expect("while");
      this.expect("(");
      const cond = this.parseExpr();
      this.expect(")");
      this.expect(";");
      return { k: "dowhile", cond, body, line: tk.line };
    }

    if (this.is("for")) {
      this.next();
      this.expect("(");
      let init = null;
      if (!this.is(";")) {
        if (this.isTypeWord()) {
          const type = this.parseType();
          init = { k: "decl", decls: this.parseDeclarators(type), line: tk.line };
        } else {
          init = { k: "expr", e: this.parseExpr(), line: tk.line };
        }
      }
      this.expect(";");
      const cond = this.is(";") ? null : this.parseExpr();
      this.expect(";");
      const update = this.is(")") ? null : this.parseExpr();
      this.expect(")");
      const body = this.parseStatement();
      return { k: "for", init, cond, update, body, line: tk.line };
    }

    if (this.is("return")) {
      this.next();
      let value = null;
      if (!this.is(";")) value = this.parseExpr();
      this.expect(";");
      return { k: "return", value, line: tk.line };
    }

    if (this.is("break")) { this.next(); this.expect(";"); return { k: "break", line: tk.line }; }
    if (this.is("continue")) { this.next(); this.expect(";"); return { k: "continue", line: tk.line }; }

    if (this.is("switch") || this.is("goto")) {
      throw new CError("switch and goto aren't part of this arena — reach for if/else and loops.", tk.line, "syntax");
    }

    if (this.isTypeWord()) {
      const type = this.parseType();
      const decls = this.parseDeclarators(type);
      this.expect(";");
      return { k: "decl", decls, line: tk.line };
    }

    const e = this.parseExpr();
    this.expect(";");
    return { k: "expr", e, line: tk.line };
  }

  parseExpr() {
    return this.parseAssign();
  }

  parseAssign() {
    const left = this.parseTernary();
    const tk = this.peek();
    if (["=", "+=", "-=", "*=", "/=", "%="].includes(tk.v)) {
      this.next();
      const right = this.parseAssign();
      return { k: "assign", op: tk.v, left, right, line: tk.line };
    }
    return left;
  }

  parseTernary() {
    const cond = this.parseBinary(0);
    if (this.is("?")) {
      const line = this.next().line;
      const a = this.parseAssign();
      this.expect(":");
      const b = this.parseAssign();
      return { k: "ternary", cond, a, b, line };
    }
    return cond;
  }

  parseBinary(level) {
    if (level >= BIN_LEVELS.length) return this.parseUnary();
    let left = this.parseBinary(level + 1);
    while (this.peek().t === "op" && BIN_LEVELS[level].includes(this.peek().v)) {
      const op = this.next();
      const right = this.parseBinary(level + 1);
      left = { k: "bin", op: op.v, left, right, line: op.line };
    }
    return left;
  }

  parseUnary() {
    const tk = this.peek();
    if (tk.t === "op" && ["-", "+", "!", "~", "*", "&", "++", "--"].includes(tk.v)) {
      this.next();
      return { k: "un", op: tk.v, arg: this.parseUnary(), line: tk.line };
    }
    if (this.is("sizeof")) {
      this.next();
      if (this.is("(")) {
        this.next();
        if (this.isTypeWord()) {
          const type = this.parseType();
          while (this.is("*")) this.next();
          this.expect(")");
          return { k: "num", v: type === "char" ? 1 : type === "double" ? 8 : 4, isFloat: false, line: tk.line };
        }
        const e = this.parseExpr();
        this.expect(")");
        return { k: "num", v: 4, isFloat: false, line: tk.line };
      }
      this.parseUnary();
      return { k: "num", v: 4, isFloat: false, line: tk.line };
    }
    return this.parsePostfix();
  }

  parsePostfix() {
    let node = this.parsePrimary();
    for (;;) {
      if (this.is("[")) {
        const line = this.next().line;
        const idx = this.parseExpr();
        this.expect("]");
        node = { k: "index", obj: node, index: idx, line };
      } else if (this.is("(")) {
        const line = this.next().line;
        const args = [];
        if (!this.is(")")) {
          do { args.push(this.parseAssign()); } while (this.eat(","));
        }
        this.expect(")");
        node = { k: "call", callee: node, args, line };
      } else if (this.is(".") || this.is("->")) {
        const op = this.next();
        const name = this.next();
        node = { k: "member", obj: node, name: name.v, arrow: op.v === "->", line: name.line };
      } else if (this.is("++") || this.is("--")) {
        const op = this.next();
        node = { k: "post", op: op.v, arg: node, line: op.line };
      } else break;
    }
    return node;
  }

  parsePrimary() {
    const tk = this.peek();
    if (tk.t === "num") { this.next(); return { k: "num", v: tk.v, isFloat: tk.isFloat, line: tk.line }; }
    if (tk.t === "str") { this.next(); return { k: "str", v: tk.v, line: tk.line }; }
    if (tk.t === "char") { this.next(); return { k: "num", v: tk.v, isFloat: false, line: tk.line }; }
    if (tk.t === "id") { this.next(); return { k: "id", name: tk.v, line: tk.line }; }
    if (this.is("(")) { this.next(); const e = this.parseExpr(); this.expect(")"); return e; }
    throw new CError(
      `Unexpected ${tk.v ? `'${tk.v}'` : "end of file"} — an expression is missing or a ';' is out of place.`,
      tk.line,
      "syntax"
    );
  }
}

class Frame {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.vars = new Map();
  }
}

function hex(n) {
  if (typeof n !== "number") return "—";
  return "0x" + n.toString(16).toUpperCase();
}

class Interpreter {
  constructor(program, stdin = "") {
    this.program = program;
    this.stdinTokens = (stdin || "").trim().split(/\s+/).filter(Boolean);
    this.stdinPos = 0;
    this.out = "";
    this.snapshots = [];
    this.lastFrames = [];
    this.nextAddr = 0x7ffd0000;
    this.mem = new Map();
    this.ops = 0;
    this.maxOps = 400000;
    this.depth = 0;
    this.globals = new Frame("globals", null);
    this.frame = this.globals;
  }

  run() {
    try {
      for (const d of this.program.globals) this.declare(d, this.globals);
      const mainFn = this.program.functions.main;
      if (!mainFn) throw new CError("Every program needs a main() function.", 1, "syntax");
      this.callFunction(mainFn, []);
      if (!this.snapshots.length) this.snapshot(0);
      return { stdout: this.out, snapshots: this.snapshots, frames: this.lastFrames };
    } catch (e) {
      if (e instanceof CError) {
        e.partial = this.out;
        e.snapshots = this.snapshots;
        e.frames = this.lastFrames;
      }
      throw e;
    }
  }

  write(s) {
    if (this.out.length > 8000) return;
    this.out += s;
  }

  alloc(size) {
    const addr = this.nextAddr;
    this.nextAddr += Math.max(4, Math.ceil(size / 4) * 4);
    return addr;
  }

  lookup(name, frame = this.frame) {
    for (let f = frame; f; f = f.parent) {
      if (f.vars.has(name)) return f.vars.get(name);
    }
    return null;
  }

  declare(d, frame) {
    if (d.isArray) {
      let count = d.size ? this.constInt(d.size) : 0;
      let elems = [];
      if (d.init && d.init.k === "str") {
        const s = d.init.v;
        if (!count) count = s.length + 1;
        elems = new Array(count).fill(0);
        for (let i = 0; i < s.length && i < count; i++) elems[i] = s.charCodeAt(i);
      } else if (d.init && d.init.k === "initlist") {
        const vals = d.init.items.map((it) => this.coerce(d.type, this.evalExpr(it, frame)));
        if (!count) count = vals.length;
        elems = new Array(count).fill(0);
        for (let i = 0; i < Math.min(count, vals.length); i++) elems[i] = vals[i];
      } else {
        if (!count) count = 1;
        elems = new Array(count).fill(0);
      }
      const elemSize = d.type === "char" ? 1 : d.type === "double" ? 8 : 4;
      const addr = this.alloc(count * elemSize);
      const cell = {
        name: d.name, type: d.type, isArray: true, isPtr: false,
        elems, addr, elemSize, count,
      };
      frame.vars.set(d.name, cell);
      for (let i = 0; i < count; i++) this.mem.set(addr + i * elemSize, { cell, index: i });
      return cell;
    }

    const pointeeSize = d.type === "char" ? 1 : d.type === "double" ? 8 : 4;
    let value = 0;
    if (d.init) {
      const v = this.evalExpr(d.init, frame);
      value = d.ptr ? v.v : this.coerce(d.type, v);
    }
    const addr = this.alloc(4);
    const cell = {
      name: d.name,
      type: d.ptr ? "ptr" : d.type,
      elemType: d.type,
      elemSize: pointeeSize,
      isPtr: !!d.ptr,
      isArray: false,
      value,
      addr,
    };
    frame.vars.set(d.name, cell);
    this.mem.set(addr, { cell, index: null });
    return cell;
  }

  constInt(node) {
    try {
      const v = this.evalExpr(node, this.frame);
      return Math.max(0, Math.trunc(Number(v.v)) || 0);
    } catch {
      return 0;
    }
  }

  coerce(type, val) {
    const raw = val && val.v !== undefined ? val.v : val;
    if (type === "double") return Number(raw) || 0;
    if (type === "char") {
      if (typeof raw === "number") return Math.trunc(raw);
      const s = String(raw ?? "");
      return s.length ? s.charCodeAt(0) : 0;
    }
    const n = Number(raw);
    return Number.isFinite(n) ? Math.trunc(n) : 0;
  }

  cellValue(cell) {
    if (cell.isArray) {
      return { v: cell.addr, t: "ptr", elemType: cell.type, elemSize: cell.elemSize, arr: cell, isArray: true };
    }
    if (cell.isPtr) {
      return {
        v: cell.value,
        t: "ptr",
        elemType: cell.elemType,
        elemSize: cell.elemSize,
        str: typeof cell.value === "string" ? cell.value : undefined,
      };
    }
    return { v: cell.value, t: cell.type };
  }

  truthy(val) {
    if (val.t === "ptr" || val.t === "str") return Boolean(val.v);
    return Number(val.v) !== 0;
  }

  isIntVal(val) {
    return val.t === "int" || val.t === "char";
  }

  numeric(v, isInt) {
    return { v: isInt ? Math.trunc(v) : v, t: isInt ? "int" : "double" };
  }

  pointerAddr(val) {
    if (val.t === "ptr" && typeof val.v === "number") return val.v;
    if (typeof val.v === "number" && val.elemSize) return val.v;
    throw new CError("That value isn't a memory address, so it can't be indexed or dereferenced.", 0, "memory");
  }

  readMem(addr, type, line) {
    const slot = this.mem.get(addr);
    if (!slot) {
      throw new CError(
        "That pointer doesn't point at any variable in this program. Check the address before you read from it.",
        line,
        "memory"
      );
    }
    if (slot.index !== null) return { v: slot.cell.elems[slot.index] || 0, t: slot.cell.type };
    return { v: slot.cell.value, t: slot.cell.type };
  }

  writeMem(addr, value, line) {
    const slot = this.mem.get(addr);
    if (!slot) {
      throw new CError(
        "That pointer doesn't point at memory you own, so writing through it would be unsafe.",
        line,
        "memory"
      );
    }
    if (slot.index !== null) slot.cell.elems[slot.index] = value;
    else slot.cell.value = value;
  }

  readString(addr) {
    if (typeof addr !== "number") return "";
    let s = "";
    for (let i = 0; i < 4096; i++) {
      const slot = this.mem.get(addr + i);
      if (!slot) break;
      const code = slot.index !== null ? slot.cell.elems[slot.index] : slot.cell.value;
      if (!code) break;
      s += String.fromCharCode(code);
    }
    return s;
  }

  toText(val) {
    if (!val) return "";
    if (val.str !== undefined) return val.str;
    if (val.t === "ptr" && typeof val.v === "number") return this.readString(val.v);
    if (val.t === "ptr") return String(val.v ?? "");
    return String(val.v);
  }

  evalExpr(node, frame = this.frame) {
    switch (node.k) {
      case "num":
        return { v: node.v, t: node.isFloat ? "double" : "int" };
      case "str":
        return { v: node.v, t: "str", str: node.v };
      case "id": {
        const cell = this.lookup(node.name, frame);
        if (!cell) {
          if (this.program.functions[node.name] || BUILTIN_NAMES.has(node.name)) {
            return { v: 0, t: "fn", name: node.name };
          }
          throw new CError(
            `'${node.name}' is used before it's declared. In C every variable needs a type first: int ${node.name} = 0;`,
            node.line,
            "name"
          );
        }
        return this.cellValue(cell);
      }
      case "bin": {
        const op = node.op;
        if (op === "&&") {
          const l = this.evalExpr(node.left, frame);
          if (!this.truthy(l)) return { v: 0, t: "int" };
          const r = this.evalExpr(node.right, frame);
          return { v: this.truthy(r) ? 1 : 0, t: "int" };
        }
        if (op === "||") {
          const l = this.evalExpr(node.left, frame);
          if (this.truthy(l)) return { v: 1, t: "int" };
          const r = this.evalExpr(node.right, frame);
          return { v: this.truthy(r) ? 1 : 0, t: "int" };
        }
        const l = this.evalExpr(node.left, frame);
        const r = this.evalExpr(node.right, frame);
        return this.applyBin(op, l, r, node.line);
      }
      case "un": {
        const op = node.op;
        if (op === "++" || op === "--") {
          const cur = this.evalExpr(node.arg, frame);
          const nv = Number(cur.v) + (op === "++" ? 1 : -1);
          this.assignTo(node.arg, { v: nv, t: cur.t }, frame);
          return { v: nv, t: cur.t };
        }
        if (op === "&") {
          const addr = this.lvalueAddr(node.arg, frame);
          const type = this.lvalueType(node.arg, frame);
          return { v: addr, t: "ptr", elemType: type, elemSize: type === "char" ? 1 : type === "double" ? 8 : 4 };
        }
        if (op === "*") {
          const p = this.evalExpr(node.arg, frame);
          if (p.t !== "ptr" || p.str !== undefined) {
            throw new CError(
              "'*' needs a pointer on its right. If you meant multiplication, put the value on both sides: a * b.",
              node.line,
              "memory"
            );
          }
          return this.readMem(p.v, p.elemType, node.line);
        }
        const v = this.evalExpr(node.arg, frame);
        if (op === "-") return { ...v, v: -Number(v.v) };
        if (op === "+") return v;
        if (op === "!") return { v: this.truthy(v) ? 0 : 1, t: "int" };
        if (op === "~") return { v: ~Math.trunc(Number(v.v)), t: "int" };
        throw new CError(`Unsupported operator '${op}'.`, node.line, "syntax");
      }
      case "post": {
        const cur = this.evalExpr(node.arg, frame);
        const nv = Number(cur.v) + (node.op === "++" ? 1 : -1);
        this.assignTo(node.arg, { v: nv, t: cur.t }, frame);
        return { v: cur.v, t: cur.t };
      }
      case "assign": {
        const right = this.evalExpr(node.right, frame);
        if (node.op !== "=") {
          const cur = this.evalExpr(node.left, frame);
          const combined = this.applyBin(node.op[0], cur, right, node.line);
          this.assignTo(node.left, combined, frame);
          return combined;
        }
        this.assignTo(node.left, right, frame);
        return right;
      }
      case "ternary": {
        const c = this.evalExpr(node.cond, frame);
        return this.truthy(c) ? this.evalExpr(node.a, frame) : this.evalExpr(node.b, frame);
      }
      case "index": {
        const base = this.evalExpr(node.obj, frame);
        const idx = this.evalExpr(node.index, frame);
        const addr = this.pointerAddr(base) + Number(idx.v) * (base.elemSize || 4);
        return this.readMem(addr, base.elemType || "int", node.line);
      }
      case "call":
        return this.evalCall(node, frame);
      case "member":
        return this.evalMember(node, frame);
      case "initlist":
        return { v: 0, t: "int" };
      default:
        throw new CError("This expression isn't supported in the arena yet.", node.line, "syntax");
    }
  }

  applyBin(op, l, r, line) {
    if (op === "+" || op === "-") {
      if (l.t === "ptr" && typeof l.v === "number" && l.elemSize) {
        const step = Number(r.v) * l.elemSize;
        return { v: l.v + (op === "+" ? step : -step), t: "ptr", elemType: l.elemType, elemSize: l.elemSize };
      }
      if (op === "+" && r.t === "ptr" && typeof r.v === "number") {
        return { v: r.v + Number(l.v) * (r.elemSize || 4), t: "ptr", elemType: r.elemType, elemSize: r.elemSize };
      }
    }

    const bothInt = this.isIntVal(l) && this.isIntVal(r);
    const a = Number(l.v);
    const b = Number(r.v);

    switch (op) {
      case "+": return this.numeric(a + b, bothInt);
      case "-": return this.numeric(a - b, bothInt);
      case "*": return this.numeric(a * b, bothInt);
      case "/":
        if (b === 0) {
          throw new CError("Division by zero. Guard the divisor before dividing.", line, "runtime");
        }
        return this.numeric(bothInt ? Math.trunc(a / b) : a / b, bothInt);
      case "%":
        if (b === 0) throw new CError("Modulo by zero: '%' needs a non-zero divisor.", line, "runtime");
        return { v: Math.trunc(a) % Math.trunc(b), t: "int" };
      case "==": return { v: a === b ? 1 : 0, t: "int" };
      case "!=": return { v: a !== b ? 1 : 0, t: "int" };
      case "<": return { v: a < b ? 1 : 0, t: "int" };
      case ">": return { v: a > b ? 1 : 0, t: "int" };
      case "<=": return { v: a <= b ? 1 : 0, t: "int" };
      case ">=": return { v: a >= b ? 1 : 0, t: "int" };
      case "&": return { v: Math.trunc(a) & Math.trunc(b), t: "int" };
      case "|": return { v: Math.trunc(a) | Math.trunc(b), t: "int" };
      case "^": return { v: Math.trunc(a) ^ Math.trunc(b), t: "int" };
      case "<<": return { v: Math.trunc(a) << Math.trunc(b), t: "int" };
      case ">>": return { v: Math.trunc(a) >> Math.trunc(b), t: "int" };
      default:
        throw new CError(`The operator '${op}' isn't supported here.`, line, "syntax");
    }
  }

  lvalueAddr(node, frame) {
    if (node.k === "id") {
      const cell = this.lookup(node.name, frame);
      if (!cell) throw new CError(`'${node.name}' isn't declared, so it has no address.`, node.line, "name");
      return cell.addr;
    }
    if (node.k === "index") {
      const base = this.evalExpr(node.obj, frame);
      const idx = this.evalExpr(node.index, frame);
      return this.pointerAddr(base) + Number(idx.v) * (base.elemSize || 4);
    }
    if (node.k === "un" && node.op === "*") {
      const p = this.evalExpr(node.arg, frame);
      return p.v;
    }
    throw new CError("'&' needs a variable, like &score.", node.line, "memory");
  }

  lvalueType(node, frame) {
    if (node.k === "id") {
      const cell = this.lookup(node.name, frame);
      return cell ? cell.type : "int";
    }
    if (node.k === "index") {
      const base = this.evalExpr(node.obj, frame);
      return base.elemType || "int";
    }
    if (node.k === "un" && node.op === "*") {
      const p = this.evalExpr(node.arg, frame);
      return p.elemType || "int";
    }
    return "int";
  }

  assignTo(target, val, frame) {
    if (target.k === "id") {
      const cell = this.lookup(target.name, frame);
      if (!cell) {
        throw new CError(`'${target.name}' was assigned before it was declared.`, target.line, "name");
      }
      if (cell.isArray) {
        throw new CError(
          `'${target.name}' is an array — you can't replace the whole thing. Assign to one slot: ${target.name}[0] = value;`,
          target.line,
          "type"
        );
      }
      cell.value = cell.isPtr ? val.v : this.coerce(cell.type, val);
      return;
    }
    if (target.k === "index") {
      const base = this.evalExpr(target.obj, frame);
      const idx = this.evalExpr(target.index, frame);
      const addr = this.pointerAddr(base) + Number(idx.v) * (base.elemSize || 4);
      this.writeMem(addr, this.coerce(base.elemType || "int", val), target.line);
      return;
    }
    if (target.k === "un" && target.op === "*") {
      const p = this.evalExpr(target.arg, frame);
      this.writeMem(p.v, this.coerce(p.elemType || "int", val), target.line);
      return;
    }
    throw new CError("The left side of '=' has to be a variable you can store into.", target.line, "syntax");
  }

  evalMember(node) {
    throw new CError("Structs aren't unlocked in this arena yet — use plain variables and arrays.", node.line, "syntax");
  }

  evalCall(node, frame) {
    if (node.callee.k !== "id") {
      throw new CError("Only named functions can be called here.", node.line, "syntax");
    }
    const name = node.callee.name;
    const args = node.args.map((a) => this.evalExpr(a, frame));

    if (name === "printf") return this.doPrintf(args, node.line);
    if (name === "puts") {
      this.write(this.toText(args[0]) + "\n");
      return { v: 0, t: "int" };
    }
    if (name === "putchar") {
      this.write(String.fromCharCode(Number(args[0] && args[0].v) || 0));
      return { v: 0, t: "int" };
    }
    if (name === "strlen") {
      const a = args[0];
      const s = a && a.str !== undefined ? a.str : this.readString(a ? a.v : 0);
      return { v: s.length, t: "int" };
    }
    if (name === "abs") {
      return { v: Math.abs(Math.trunc(Number(args[0] && args[0].v) || 0)), t: "int" };
    }
    if (name === "getchar" || name === "scanf") {
      const tok = this.stdinTokens[this.stdinPos++] ?? "0";
      const n = Number(tok);
      return { v: Number.isFinite(n) ? Math.trunc(n) : 0, t: "int" };
    }
    if (name === "malloc" || name === "free") {
      return { v: 0, t: "ptr", elemSize: 4, elemType: "int" };
    }

    const fn = this.program.functions[name];
    if (!fn) {
      throw new CError(
        `'${name}' isn't a function in this program. Define it above main(): int ${name}(int x) { ... }`,
        node.line,
        "name"
      );
    }
    return this.callFunction(fn, args);
  }

  doPrintf(args, line) {
    const fmtVal = args[0];
    if (!fmtVal) throw new CError('printf needs a format string: printf("Hello\\n");', line, "format");
    const f = this.toText(fmtVal);
    let out = "";
    let ai = 1;

    for (let i = 0; i < f.length; i++) {
      const ch = f[i];
      if (ch !== "%") { out += ch; continue; }
      if (f[i + 1] === "%") { out += "%"; i++; continue; }
      i++;
      let spec = "";
      while ("-+ 0#".includes(f[i] || "")) { spec += f[i]; i++; }
      while (/[0-9]/.test(f[i] || "")) { spec += f[i]; i++; }
      if (f[i] === ".") {
        spec += f[i];
        i++;
        while (/[0-9]/.test(f[i] || "")) { spec += f[i]; i++; }
      }
      while ("lhLz".includes(f[i] || "")) i++;
      const conv = f[i];
      const arg = args[ai++];
      const precision = (spec.match(/\.(\d+)/) || [])[1];

      if (conv === undefined) break;
      if (arg === undefined) {
        throw new CError(
          `The format string has "%${conv}" but no value follows it. Add the value: printf("...", value);`,
          line,
          "format"
        );
      }
      const raw = arg.str !== undefined ? arg.str : arg.v;
      switch (conv) {
        case "d":
        case "i":
        case "u": {
          const n = Number(raw);
          out += String(Number.isFinite(n) ? Math.trunc(n) : 0);
          break;
        }
        case "f":
        case "F": {
          const n = Number(raw);
          out += (Number.isFinite(n) ? n : 0).toFixed(precision !== undefined ? Number(precision) : 6);
          break;
        }
        case "e":
        case "E": {
          const n = Number(raw);
          out += (Number.isFinite(n) ? n : 0).toExponential(precision !== undefined ? Number(precision) : 6);
          break;
        }
        case "g":
        case "G": {
          const n = Number(raw);
          out += String(Number.isFinite(n) ? n : 0);
          break;
        }
        case "c":
          out += String.fromCharCode(Number(raw) || 0);
          break;
        case "s":
          out += this.toText(arg);
          break;
        case "x":
          out += (Math.trunc(Number(raw)) >>> 0).toString(16);
          break;
        case "X":
          out += (Math.trunc(Number(raw)) >>> 0).toString(16).toUpperCase();
          break;
        case "p":
          out += hex(Number(raw));
          break;
        default:
          throw new CError(
            `"%${conv}" isn't a format this arena knows. Use %d for int, %f for double, %c for char or %s for a string.`,
            line,
            "format"
          );
      }
    }

    this.write(out);
    return { v: out.length, t: "int" };
  }

  callFunction(fn, args) {
    if (this.depth > 100) {
      throw new CError(
        "The call stack overflowed — too much recursion. Every recursive function needs a base case that stops it.",
        0,
        "runtime"
      );
    }
    const frame = new Frame(fn.name, this.globals);
    fn.params.forEach((p, i) => {
      const arg = args[i] || { v: 0, t: p.type };
      const size = p.type === "char" ? 1 : p.type === "double" ? 8 : 4;
      const cell = {
        name: p.name,
        type: p.ptr ? "ptr" : p.type,
        elemType: p.type,
        elemSize: size,
        isPtr: p.ptr,
        isArray: false,
        value: p.ptr ? arg.v : this.coerce(p.type, arg),
        addr: this.alloc(4),
      };
      frame.vars.set(p.name, cell);
      this.mem.set(cell.addr, { cell, index: null });
    });

    const prev = this.frame;
    this.frame = frame;
    this.depth += 1;
    let signal = null;
    try {
      signal = this.execBlock(fn.body, frame);
    } finally {
      this.frame = prev;
      this.depth -= 1;
    }
    if (signal && signal.type === "return") return signal.value || { v: 0, t: "int" };
    return { v: 0, t: "void" };
  }

  execBlock(block, frame) {
    for (const st of block.body) {
      const signal = this.execStmt(st, frame);
      if (signal) return signal;
    }
    return null;
  }

  execStmt(node, frame) {
    this.ops += 1;
    if (this.ops > this.maxOps) {
      throw new CError(
        "That loop ran hundreds of thousands of times. Check that its condition can actually become false.",
        node.line,
        "timeout"
      );
    }

    switch (node.k) {
      case "empty":
        return null;
      case "block":
        return this.execBlock(node, frame);
      case "decl":
        for (const d of node.decls) this.declare(d, frame);
        this.snapshot(node.line);
        return null;
      case "expr":
        this.evalExpr(node.e, frame);
        this.snapshot(node.line);
        return null;
      case "if": {
        if (this.truthy(this.evalExpr(node.cond, frame))) return this.execStmt(node.then, frame);
        if (node.alt) return this.execStmt(node.alt, frame);
        return null;
      }
      case "while": {
        while (this.truthy(this.evalExpr(node.cond, frame))) {
          this.ops += 1;
          if (this.ops > this.maxOps) {
            throw new CError("That loop never ends. Check its condition.", node.line, "timeout");
          }
          const s = this.execStmt(node.body, frame);
          if (s) {
            if (s.type === "break") break;
            if (s.type === "return") return s;
          }
          this.snapshot(node.line);
        }
        return null;
      }
      case "dowhile": {
        for (;;) {
          this.ops += 1;
          if (this.ops > this.maxOps) {
            throw new CError("That loop never ends. Check its condition.", node.line, "timeout");
          }
          const s = this.execStmt(node.body, frame);
          if (s) {
            if (s.type === "break") break;
            if (s.type === "return") return s;
          }
          if (!this.truthy(this.evalExpr(node.cond, frame))) break;
          this.snapshot(node.line);
        }
        return null;
      }
      case "for": {
        if (node.init) this.execStmt(node.init, frame);
        for (;;) {
          this.ops += 1;
          if (this.ops > this.maxOps) {
            throw new CError("That loop never ends. Check its condition.", node.line, "timeout");
          }
          if (node.cond && !this.truthy(this.evalExpr(node.cond, frame))) break;
          const s = this.execStmt(node.body, frame);
          if (s) {
            if (s.type === "break") break;
            if (s.type === "return") return s;
          }
          if (node.update) this.evalExpr(node.update, frame);
          this.snapshot(node.line);
        }
        return null;
      }
      case "return": {
        const value = node.value ? this.evalExpr(node.value, frame) : { v: 0, t: "void" };
        this.snapshot(node.line);
        return { type: "return", value };
      }
      case "break":
        return { type: "break" };
      case "continue":
        return { type: "continue" };
      default:
        throw new CError("Unsupported statement.", node.line, "syntax");
    }
  }

  cellView(cell) {
    const view = {
      name: cell.name,
      type: cell.isArray ? `${cell.type}[${cell.count}]` : cell.isPtr ? `${cell.elemType} *` : cell.type,
      addr: hex(cell.addr),
      isArray: cell.isArray,
      isPtr: cell.isPtr,
    };
    if (cell.isArray) {
      view.elems = cell.elems.slice(0, 40).map((v, i) => ({
        i,
        v: cell.type === "char" ? charLabel(v) : v,
      }));
      view.raw = cell.type === "char" ? this.readString(cell.addr) : cell.elems.slice();
      view.value = cell.type === "char" ? `"${this.readString(cell.addr)}"` : null;
    } else if (cell.isPtr) {
      view.value = typeof cell.value === "number" ? hex(cell.value) : String(cell.value);
      view.ptrTo = typeof cell.value === "number" ? cell.value : null;
      view.raw = cell.value;
    } else {
      view.value = cell.type === "char" ? charLabel(cell.value) : cell.value;
      view.raw = cell.value;
    }
    return view;
  }

  snapshot(line) {
    if (this.snapshots.length >= 400) return;
    const chain = [];
    for (let f = this.frame; f; f = f.parent) chain.unshift(f);
    const frames = chain.map((f) => ({
      name: f.name,
      vars: [...f.vars.values()].map((c) => this.cellView(c)),
    }));
    this.lastFrames = frames;
    this.snapshots.push({ line, frames });
  }
}

function charLabel(code) {
  const n = Number(code) || 0;
  if (n === 0) return "'\\0'";
  const ch = String.fromCharCode(n);
  if (ch === "\n") return "'\\n'";
  if (ch === "\t") return "'\\t'";
  if (n < 32 || n > 126) return String(n);
  return `'${ch}'`;
}

export function runC(source, options = {}) {
  const started = Date.now();
  try {
    const toks = tokenize(source);
    const parser = new Parser(toks);
    const program = parser.parseProgram();
    const interp = new Interpreter(program, options.stdin || "");
    const result = interp.run();
    return {
      ok: true,
      stdout: result.stdout,
      snapshots: result.snapshots,
      frames: result.frames,
      error: null,
      duration: Date.now() - started,
    };
  } catch (e) {
    const known = e instanceof CError;
    return {
      ok: false,
      stdout: (known && e.partial) || "",
      snapshots: (known && e.snapshots) || [],
      frames: (known && e.frames) || [],
      error: {
        message: e.message || "Something went wrong while running this program.",
        line: known ? e.line : 0,
        kind: known ? e.kind : "runtime",
      },
      duration: Date.now() - started,
    };
  }
}

function norm(s) {
  return String(s || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((l) => l.replace(/[ \t]+$/g, ""))
    .join("\n")
    .trim();
}

export function evaluateChecks(mission, result, source = "") {
  const checks = mission.checks || [];
  const out = result.stdout || "";

  const results = checks.map((c) => {
    let pass = false;
    if (c.type === "output") {
      if (c.mode === "exact") pass = norm(out) === norm(c.value);
      else if (c.mode === "regex") pass = new RegExp(c.value, c.flags || "i").test(out);
      else pass = out.includes(c.value);
    } else if (c.type === "var") {
      const cells = (result.frames || []).flatMap((f) => f.vars || []);
      pass = cells.some(
        (cell) => cell.name === c.name && (c.equals === undefined || Number(cell.raw) === Number(c.equals))
      );
    } else if (c.type === "code") {
      pass = new RegExp(c.value, c.flags || "").test(source);
    }
    return { ...c, pass };
  });

  return {
    passed: Boolean(result.ok) && results.length > 0 && results.every((r) => r.pass),
    ok: Boolean(result.ok),
    results,
  };
}

export function formatOutput(result) {
  if (!result) return "";
  return result.stdout || "";
}

export { hex };