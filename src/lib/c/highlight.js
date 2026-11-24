const KEYWORDS = new Set([
  "if", "else", "for", "while", "do", "return", "break", "continue", "sizeof", "struct",
  "switch", "case", "default", "goto", "typedef", "enum", "union",
]);

const TYPES = new Set([
  "int", "char", "void", "float", "double", "long", "short", "unsigned", "signed",
  "const", "static", "extern", "bool", "size_t",
]);

const BUILTINS = new Set(["printf", "puts", "putchar", "strlen", "scanf", "getchar", "abs", "malloc", "free"]);

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const TOKEN_RE =
  /\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|^[ \t]*#[^\n]*|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b/gm;

export function highlightC(code) {
  let html = "";
  let last = 0;
  let match;
  TOKEN_RE.lastIndex = 0;

  while ((match = TOKEN_RE.exec(code))) {
    if (match.index > last) html += esc(code.slice(last, match.index));
    const token = match[0];
    let cls = "";

    if (token.startsWith("/*") || token.startsWith("//")) cls = "text-ink-faint italic";
    else if (token.startsWith('"') || token.startsWith("'")) cls = "text-brand-ink";
    else if (token.trimStart().startsWith("#")) cls = "text-grape";
    else if (/^\d/.test(token)) cls = "text-tangerine";
    else if (KEYWORDS.has(token)) cls = "text-grape font-semibold";
    else if (TYPES.has(token)) cls = "text-aqua font-semibold";
    else if (BUILTINS.has(token)) cls = "text-aqua";

    html += cls ? `<span class="${cls}">${esc(token)}</span>` : esc(token);
    last = match.index + token.length;
  }

  html += esc(code.slice(last));
  return html + "\n";
}