import { useEffect, useMemo, useRef, useState } from "react";
import { Code2, CornerDownLeft } from "lucide-react";
import { highlightC } from "@/lib/c/highlight";
import { cn } from "@/lib/utils";

export default function CodeEditor({ value, onChange, onRun }) {
  const taRef = useRef(null);
  const preRef = useRef(null);
  const gutterRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const html = useMemo(() => highlightC(value), [value]);
  const lineCount = useMemo(() => Math.max(1, value.split("\n").length), [value]);

  const syncScroll = () => {
    const ta = taRef.current;
    if (!ta) return;
    if (preRef.current) {
      preRef.current.scrollTop = ta.scrollTop;
      preRef.current.scrollLeft = ta.scrollLeft;
    }
    if (gutterRef.current) gutterRef.current.scrollTop = ta.scrollTop;
  };

  useEffect(() => {
    syncScroll();
  }, [value]);

  const commit = (next, caret) => {
    onChange(next);
    requestAnimationFrame(() => {
      const ta = taRef.current;
      if (!ta) return;
      ta.selectionStart = caret;
      ta.selectionEnd = caret;
      syncScroll();
    });
  };

  const handleKeyDown = (e) => {
    const ta = e.currentTarget;
    const { selectionStart: start, selectionEnd: end } = ta;

    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onRun();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      commit(value.slice(0, start) + "  " + value.slice(end), start + 2);
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const line = value.slice(lineStart, start);
      const indent = (line.match(/^[ \t]*/) || [""])[0];
      const extra = line.trimEnd().endsWith("{") ? "  " : "";
      const insert = "\n" + indent + extra;
      commit(value.slice(0, start) + insert + value.slice(end), start + insert.length);
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[24px] border-2 bg-card transition-all duration-200",
        focused ? "border-brand shadow-[0_4px_0_#C6E9A8]" : "border-frame shadow-[0_4px_0_hsl(var(--frame))]"
      )}
    >
      <div className="flex items-center gap-2 border-b-2 border-frame px-3.5 py-2.5">
        <span className="grid h-7 w-7 place-items-center rounded-xl bg-brand-tint text-brand-ink">
          <Code2 className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <span className="text-[12px] font-extrabold text-ink">main.c</span>
        <span className="ml-auto rounded-full bg-tile px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-widest text-ink-faint">
          spellbook
        </span>
      </div>

      <div className="flex max-h-[440px] min-h-[300px]">
        <div
          ref={gutterRef}
          aria-hidden
          className="no-scrollbar shrink-0 select-none overflow-hidden border-r-2 border-frame bg-tile py-3 pl-3 pr-2.5 text-right font-mono text-[12.5px] leading-6 text-ink-faint"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <div className="relative min-w-0 flex-1 bg-card">
          <pre
            ref={preRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden whitespace-pre px-3 py-3 font-mono text-[13px] leading-6 text-ink"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <textarea
            ref={taRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onScroll={syncScroll}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            wrap="off"
            aria-label="C source code"
            className="thin-scroll relative h-[440px] w-full resize-none overflow-auto whitespace-pre bg-transparent px-3 py-3 font-mono text-[13px] leading-6 text-transparent caret-[#58CC02] outline-none selection:bg-[#C6E9A8] selection:text-transparent"
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t-2 border-frame bg-tile px-3.5 py-2">
        <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-ink-faint">
          <CornerDownLeft className="h-3 w-3" strokeWidth={3} />
          Tab · 2 spaces
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-ink-faint">Ctrl + Enter to run</span>
      </div>
    </div>
  );
}