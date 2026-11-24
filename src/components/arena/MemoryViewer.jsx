import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

function Cell({ cell, prev, addressNames }) {
  const changed = prev && JSON.stringify(prev) !== JSON.stringify(cell);

  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-xl px-2 py-1.5 transition-colors duration-500",
        changed ? "bg-sun/15" : "bg-transparent"
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="truncate font-mono text-[11.5px] font-bold text-ink">{cell.name}</span>
          <span className="shrink-0 font-mono text-[9.5px] text-ink-soft">{cell.type}</span>
        </div>
        <span className="font-mono text-[9px] text-ink-faint">{cell.addr}</span>
      </div>

      <div className="shrink-0 text-right">
        {cell.isArray ? (
          <div className="flex flex-wrap justify-end gap-1">
            {(cell.elems || []).slice(0, 8).map((el) => (
              <span
                key={el.i}
                className="rounded-lg border-2 border-frame bg-card px-1.5 py-0.5 font-mono text-[9.5px] font-bold text-ink-soft"
              >
                {el.v}
              </span>
            ))}
            {(cell.elems || []).length > 8 && <span className="font-mono text-[9px] text-ink-soft">…</span>}
          </div>
        ) : cell.isPtr ? (
          <div className="font-mono text-[10.5px] font-bold text-grape">
            {cell.value}
            {cell.ptrTo && addressNames[cell.ptrTo] ? (
              <span className="font-semibold text-ink-faint"> → {addressNames[cell.ptrTo]}</span>
            ) : null}
          </div>
        ) : (
          <span className="rounded-lg bg-aqua/15 px-1.5 py-0.5 font-mono text-[11.5px] font-bold text-aqua">
            {String(cell.value)}
          </span>
        )}
      </div>
    </div>
  );
}

export default function MemoryViewer({ snapshots }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setIndex(Math.max(0, (snapshots?.length || 0) - 1));
    setPlaying(false);
  }, [snapshots]);

  useEffect(() => {
    if (!playing) return undefined;
    if (!snapshots || index >= snapshots.length - 1) {
      setPlaying(false);
      return undefined;
    }
    const timer = setTimeout(() => setIndex((i) => Math.min(snapshots.length - 1, i + 1)), 420);
    return () => clearTimeout(timer);
  }, [playing, index, snapshots]);

  const current = snapshots && snapshots.length ? snapshots[Math.min(index, snapshots.length - 1)] : null;
  const previous = snapshots && index > 0 ? snapshots[index - 1] : null;

  const addressNames = useMemo(() => {
    const map = {};
    if (!current) return map;
    current.frames.forEach((f) => f.vars.forEach((v) => {
      if (v.isPtr && v.ptrTo) map[v.ptrTo] = v.name;
    }));
    return map;
  }, [current]);

  const prevFor = (frameName, varName) => {
    if (!previous) return null;
    const frame = previous.frames.find((f) => f.name === frameName);
    const cell = frame?.vars.find((v) => v.name === varName);
    return cell || null;
  };

  return (
    <div className="rounded-[24px] border-2 border-frame bg-card p-4 shadow-[0_4px_0_hsl(var(--frame))]">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-grape/16 text-grape">
          <Sparkles className="h-4 w-4" fill="currentColor" strokeWidth={0} />
        </span>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">Memory magic</p>
        <span className="ml-auto rounded-full bg-tile px-2 py-0.5 text-[9.5px] font-extrabold text-ink-soft">
          {current ? `step ${index + 1}/${snapshots.length} · line ${current.line}` : "—"}
        </span>
      </div>

      <div className="mt-3 space-y-2.5">
        {!current ? (
          <p className="rounded-2xl border-2 border-dashed border-frame px-3 py-7 text-center text-[11.5px] font-semibold leading-relaxed text-ink-soft">
            Run your program to watch variables, arrays and pointers come to life.
          </p>
        ) : (
          current.frames.map((frame) => (
            <div key={frame.name} className="overflow-hidden rounded-2xl border-2 border-frame bg-tile">
              <div className="flex items-center justify-between border-b-2 border-frame px-2.5 py-1.5">
                <span className="font-mono text-[10px] font-bold text-ink-soft">
                  {frame.name === "main" ? "main()" : frame.name === "globals" ? "globals" : `${frame.name}()`}
                </span>
                <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-ink-faint">frame</span>
              </div>
              <div className="divide-y divide-[hsl(var(--frame))] py-1">
                {frame.vars.length === 0 ? (
                  <p className="px-2.5 py-1.5 font-mono text-[10px] text-ink-faint">no variables yet</p>
                ) : (
                  frame.vars.map((cell) => (
                    <Cell
                      key={cell.name}
                      cell={cell}
                      prev={prevFor(frame.name, cell.name)}
                      addressNames={addressNames}
                    />
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {current && snapshots.length > 1 && (
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className="grid h-8 w-8 place-items-center rounded-xl border-2 border-frame text-ink-soft transition hover:bg-hover hover:text-ink"
            aria-label="Previous step"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={3} />
          </button>
          <button
            type="button"
            onClick={() => {
              if (index >= snapshots.length - 1) setIndex(0);
              setPlaying((p) => !p);
            }}
            className="grid h-8 w-8 place-items-center rounded-xl border-2 border-brand bg-brand-tint text-brand-ink transition hover:bg-brand/25"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} /> : <Play className="h-4 w-4" fill="currentColor" strokeWidth={0} />}
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(snapshots.length - 1, i + 1))}
            className="grid h-8 w-8 place-items-center rounded-xl border-2 border-frame text-ink-soft transition hover:bg-hover hover:text-ink"
            aria-label="Next step"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={3} />
          </button>
          <input
            type="range"
            min={0}
            max={snapshots.length - 1}
            value={index}
            onChange={(e) => {
              setPlaying(false);
              setIndex(Number(e.target.value));
            }}
            className="h-1.5 flex-1 accent-[#58CC02]"
            aria-label="Memory timeline"
          />
        </div>
      )}
    </div>
  );
}