import { BookOpen, Lightbulb, Quote, Sparkles, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BriefingPanel({ mission, hintsUsed, onRevealHint, skippable = false, onSkip }) {
  const hints = mission.hints || [];
  const revealed = hints.slice(0, hintsUsed);

  return (
    <div className="space-y-3">
      {skippable ? (
        <div className="rounded-[24px] border-2 border-aqua/45 bg-aqua/10 p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-aqua/15 text-aqua">
              <Zap className="h-4 w-4" fill="currentColor" strokeWidth={0} />
            </span>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-aqua">
              Already know this?
            </p>
          </div>
          <p className="mt-2 text-[11.5px] font-semibold leading-relaxed text-ink-soft">
            Pass a short lab-style test and this quest is credited without the lesson. The next quest
            only opens if the test passes.
          </p>
          <button
            type="button"
            onClick={onSkip}
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-2xl border-2 border-aqua/45 bg-card px-3 py-1.5 text-[11px] font-extrabold text-aqua shadow-[0_2px_0_hsl(var(--aqua)/0.3)] transition-all hover:bg-aqua/10 active:translate-y-0.5 active:shadow-none"
          >
            <Zap className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
            Take the skip test
          </button>
        </div>
      ) : null}

      <div className="rounded-[24px] border-2 border-frame bg-card p-4 shadow-[0_3px_0_hsl(var(--frame))]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-tint px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-widest text-brand-ink">
            {mission.worldName}
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-ink-soft">
            Quest {String(mission.order).padStart(2, "0")}
          </span>
          {mission.boss && (
            <span className="rounded-full bg-grape/16 px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-widest text-grape">
              Boss
            </span>
          )}
        </div>

        <h1 className="mt-2.5 text-[22px] font-extrabold leading-tight text-ink">{mission.title}</h1>
        <p className="mt-1 text-[12px] font-bold text-ink-soft">{mission.tagline}</p>

        <p className="mt-4 rounded-2xl border-l-4 border-brand bg-brand/8 px-3.5 py-3 text-[12.5px] font-semibold leading-relaxed text-ink-soft">
          {mission.story}
        </p>
      </div>

      <div className="rounded-[24px] border-2 border-frame bg-card p-4 shadow-[0_3px_0_hsl(var(--frame))]">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-aqua/15 text-aqua">
            <Target className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">Your goal</p>
        </div>
        <p className="mt-2.5 text-[12.5px] font-semibold leading-relaxed text-ink">{mission.objective}</p>
      </div>

      <div className="rounded-[24px] border-2 border-frame bg-card p-4 shadow-[0_3px_0_hsl(var(--frame))]">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-grape/16 text-grape">
            <BookOpen className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">What you'll learn</p>
        </div>
        <h2 className="mt-2.5 text-[15px] font-extrabold text-ink">{mission.concept.title}</h2>
        <ul className="mt-2.5 space-y-2">
          {mission.concept.points.map((point) => (
            <li key={point} className="flex gap-2 text-[12px] font-semibold leading-relaxed text-ink-soft">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#58CC02]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <pre className="thin-scroll mt-3 overflow-x-auto rounded-2xl border-2 border-frame bg-tile p-3 font-mono text-[11px] leading-relaxed text-ink">
          {mission.concept.snippet}
        </pre>

        <p className="mt-3 flex gap-2 rounded-2xl bg-sun/15 p-3 text-[11.5px] font-semibold italic leading-relaxed text-sun-ink">
          <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E0BE00]" strokeWidth={2.5} />
          {mission.concept.analogy}
        </p>
      </div>

      {mission.fieldNote && (
        <div className="rounded-[24px] border-2 border-aqua/45 bg-aqua/10 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-aqua" fill="currentColor" strokeWidth={0} />
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-aqua">Field note</p>
          </div>
          <p className="mt-2 text-[12px] font-semibold leading-relaxed text-ink-soft">{mission.fieldNote}</p>
        </div>
      )}

      <div className="rounded-[24px] border-2 border-frame bg-card p-4 shadow-[0_3px_0_hsl(var(--frame))]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-sun/15 text-sun-ink">
              <Lightbulb className="h-4 w-4" fill="currentColor" strokeWidth={0} />
            </span>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">Hints</p>
          </div>
          <span className="text-[10px] font-extrabold text-ink-soft">
            {hintsUsed}/{hints.length}
          </span>
        </div>

        <div className="mt-2.5 space-y-2">
          {revealed.map((hint, i) => (
            <p
              key={hint}
              className={cn(
                "rounded-2xl border-2 border-sun/45 bg-sun/15 p-3 text-[11.5px] font-semibold leading-relaxed text-sun-ink",
                i === revealed.length - 1 && "anim-fade-up"
              )}
            >
              <span className="mr-1.5 rounded bg-[#FFD900] px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-[#7A6600]">
                Hint {i + 1}
              </span>
              {hint}
            </p>
          ))}
        </div>

        {hintsUsed < hints.length ? (
          <button
            type="button"
            onClick={onRevealHint}
            className="mt-3 w-full rounded-2xl border-2 border-sun/40 bg-card py-2.5 text-[11.5px] font-extrabold text-sun-ink shadow-[0_3px_0_hsl(var(--sun)/0.35)] transition-all hover:bg-sun/8 active:translate-y-0.5 active:shadow-none"
          >
            Reveal hint {hintsUsed + 1} of {hints.length} · costs a star
          </button>
        ) : (
          <p className="mt-3 text-[11px] font-semibold text-ink-soft">All hints revealed.</p>
        )}
      </div>
    </div>
  );
}