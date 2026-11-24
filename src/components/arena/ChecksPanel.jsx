import { Check, Coins, Star, Target, X } from "lucide-react";
import { cn } from "@/lib/utils";

function label(check) {
  if (check.type === "output") {
    if (check.mode === "exact") {
      const value = String(check.value).replace(/\n/g, " ⏎ ");
      return value.length > 46 ? `Exact output: ${value.slice(0, 46)}…` : `Exact output: ${value}`;
    }
    if (check.mode === "regex") return "Output matches the required pattern";
    return `Output contains "${check.value}"`;
  }
  if (check.type === "var") return `${check.name} ends up as ${check.equals}`;
  return "Mission condition";
}

export default function ChecksPanel({ mission, evaluation }) {
  return (
    <div className="rounded-[24px] border-2 border-frame bg-card p-4 shadow-[0_4px_0_hsl(var(--frame))]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-tint text-brand-ink">
            <Target className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">Quest goals</p>
        </div>
        {evaluation && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-extrabold",
              evaluation.passed ? "bg-brand-tint text-brand-ink" : "bg-sun/15 text-sun-ink"
            )}
          >
            {evaluation.results.filter((r) => r.pass).length}/{evaluation.results.length}
          </span>
        )}
      </div>

      <ul className="mt-3 space-y-2">
        {mission.checks.map((check, i) => {
          const state = evaluation?.results?.[i];
          return (
            <li key={i} className="flex items-start gap-2.5 text-[11.5px] font-semibold leading-relaxed">
              <span
                className={cn(
                  "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2",
                  state?.pass && "border-brand bg-[#58CC02] text-white",
                  state && !state.pass && "border-[#FF4B4B] bg-coral/12 text-coral",
                  !state && "border-frame bg-card text-ink-faint"
                )}
              >
                {state?.pass ? (
                  <Check className="h-3 w-3" strokeWidth={4} />
                ) : state ? (
                  <X className="h-3 w-3" strokeWidth={4} />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-track" />
                )}
              </span>
              <span className={cn(state?.pass ? "text-ink-soft line-through decoration-[#C6E9A8]" : "text-ink")}>
                {label(check)}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 flex items-center justify-between border-t-2 border-frame pt-3">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">Reward</span>
        <span className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-aqua/15 px-2 py-0.5 text-[10.5px] font-extrabold text-aqua">
            <Star className="h-3 w-3" fill="currentColor" strokeWidth={0} />
            {mission.reward.xp} XP
          </span>
          <span className="flex items-center gap-1 rounded-full bg-tangerine/15 px-2 py-0.5 text-[10.5px] font-extrabold text-tangerine-ink">
            <Coins className="h-3 w-3" fill="currentColor" strokeWidth={0} />
            {mission.reward.coins}
          </span>
        </span>
      </div>
    </div>
  );
}