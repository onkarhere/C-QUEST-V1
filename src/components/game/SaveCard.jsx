import { ChevronRight, Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const TOTAL_MISSIONS = 30;

export function levelFromXp(xp = 0) {
  return Math.floor(Math.sqrt(Math.max(0, xp) / 100)) + 1;
}

export default function SaveCard({ save, active, onSelect, onDelete }) {
  const progress = save.progress || {};
  const completed = Object.keys(progress.missions || {}).length;
  const pct = Math.round((completed / TOTAL_MISSIONS) * 100);
  const level = levelFromXp(progress.xp || 0);

  return (
    <div
      className={cn(
        "group relative rounded-[22px] border-2 bg-card transition-all duration-200",
        active
          ? "border-brand shadow-[0_4px_0_#C6E9A8]"
          : "border-frame shadow-[0_3px_0_hsl(var(--frame))] hover:-translate-y-0.5 hover:border-frame"
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(save.id)}
        className="flex w-full items-center gap-3.5 rounded-[22px] px-3.5 py-3.5 text-left"
      >
        <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-tint text-[20px] font-extrabold text-brand-ink">
          {save.glyph || "✦"}
          {active && (
            <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-card bg-[#58CC02]" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-[14.5px] font-extrabold text-ink">{save.name}</p>
            <span className="shrink-0 rounded-full bg-tile px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-ink-soft">
              Lv {level}
            </span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-track">
            <div
              className="h-full rounded-full bg-[#58CC02] transition-all duration-700"
              style={{ width: `${Math.max(pct, 4)}%` }}
            />
          </div>
          <div className="mt-1.5 flex items-center gap-3 text-[11px] font-bold text-ink-soft">
            <span>
              {completed}/{TOTAL_MISSIONS} quests
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-[#FFD900]" fill="currentColor" strokeWidth={0} />
              {progress.stars || 0}
            </span>
          </div>
        </div>

        <ChevronRight
          className="h-5 w-5 shrink-0 text-ink-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#58CC02]"
          strokeWidth={3}
        />
      </button>

      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(save.id);
          }}
          aria-label={`Delete ${save.name}`}
          className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-lg text-ink-faint opacity-0 transition hover:bg-coral/12 hover:text-coral focus:opacity-100 group-hover:opacity-100"
        >
          <Trash2 className="h-3.5 w-3.5" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}