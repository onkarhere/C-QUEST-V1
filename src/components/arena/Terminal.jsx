import { ScrollText, TriangleAlert } from "lucide-react";

export default function Terminal({ result }) {
  return (
    <div className="overflow-hidden rounded-[24px] border-2 border-frame bg-card shadow-[0_4px_0_hsl(var(--frame))]">
      <div className="flex items-center gap-2 border-b-2 border-frame px-3.5 py-2.5">
        <span className="grid h-7 w-7 place-items-center rounded-xl bg-tangerine/15 text-tangerine-ink">
          <ScrollText className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <span className="text-[12px] font-extrabold text-ink">Adventure log</span>
        <span className="ml-auto rounded-full bg-tile px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-widest text-ink-soft">
          {result ? `${result.duration} ms` : "waiting"}
        </span>
      </div>

      <div className="thin-scroll h-[168px] overflow-auto bg-tile px-3.5 py-3 font-mono text-[12.5px] leading-relaxed">
        {!result ? (
          <p className="font-sans text-[12px] font-semibold text-ink-soft">
            Press Run to send your spell into the world.
          </p>
        ) : (
          <>
            <p className="text-ink-soft">
              <span className="text-[#58CC02]">▶</span> running main.c
            </p>
            {result.stdout ? (
              <pre className="mt-1 whitespace-pre-wrap break-words font-bold text-brand-ink">{result.stdout}</pre>
            ) : null}
            {result.error ? (
              <p className="mt-1.5 flex gap-1.5 whitespace-pre-wrap break-words rounded-xl bg-coral/12 p-2 font-sans text-[11.5px] font-bold text-coral">
                <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
                <span>
                  {result.error.line ? `Line ${result.error.line}: ` : ""}
                  {result.error.message}
                </span>
              </p>
            ) : null}
            <p className="mt-2 font-sans text-[10.5px] font-extrabold uppercase tracking-widest text-ink-faint">
              {result.ok ? (
                <span className="text-brand-ink">✓ quest run finished</span>
              ) : (
                <span className="text-coral">✕ run stopped</span>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}