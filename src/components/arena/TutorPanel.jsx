import { ArrowRight, Lightbulb, Sparkles, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TutorPanel({ feedback, hints, hintsUsed, onRevealHint }) {
  if (!feedback) return null;

  const tone = feedback.tone === "error" ? "error" : feedback.tone === "hint" ? "hint" : "neutral";
  const Icon = tone === "error" ? TriangleAlert : tone === "hint" ? Lightbulb : Sparkles;

  return (
    <div
      className={cn(
        "anim-fade-up rounded-[24px] border-2 p-4",
        tone === "error" && "border-coral/40 bg-coral/8",
        tone === "hint" && "border-sun/45 bg-sun/8",
        tone === "neutral" && "border-aqua/45 bg-aqua/10"
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid h-9 w-9 shrink-0 place-items-center rounded-2xl",
            tone === "error" && "bg-coral/12 text-coral",
            tone === "hint" && "bg-sun/15 text-sun-ink",
            tone === "neutral" && "bg-aqua/15 text-aqua"
          )}
        >
          <Icon className="h-5 w-5" fill="currentColor" strokeWidth={0} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] font-extrabold text-ink">{feedback.title}</p>
          <p className="mt-1 whitespace-pre-wrap break-words text-[12px] font-semibold leading-relaxed text-ink-soft">
            {feedback.body}
          </p>
          {feedback.analogy && (
            <p className="mt-2 text-[11.5px] font-semibold italic leading-relaxed text-ink-soft">{feedback.analogy}</p>
          )}
          {feedback.tip && (
            <p className="mt-2 flex gap-1.5 rounded-2xl bg-card/70 p-2 text-[11.5px] font-semibold leading-relaxed text-ink-soft">
              <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#58CC02]" strokeWidth={3} />
              {feedback.tip}
            </p>
          )}
        </div>
      </div>

      {hintsUsed > 0 && hints?.[hintsUsed - 1] && (
        <p className="mt-3 rounded-2xl border-2 border-sun/45 bg-sun/15 p-2.5 text-[11.5px] font-semibold leading-relaxed text-sun-ink">
          <span className="mr-1.5 rounded bg-[#FFD900] px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-[#7A6600]">
            Hint {hintsUsed}
          </span>
          {hints[hintsUsed - 1]}
        </p>
      )}

      {hintsUsed < (hints?.length || 0) && (
        <button
          type="button"
          onClick={onRevealHint}
          className="mt-3 inline-flex items-center gap-1.5 rounded-2xl border-2 border-frame bg-card px-3 py-1.5 text-[11px] font-extrabold text-sun-ink shadow-[0_2px_0_hsl(var(--frame))] transition-all hover:bg-sun/8 active:translate-y-0.5 active:shadow-none"
        >
          <Lightbulb className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
          Reveal next hint ({hintsUsed}/{hints.length})
        </button>
      )}
    </div>
  );
}