import { Link } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  CircuitBoard,
  Crown,
  Flame,
  Lock,
  Map as MapIcon,
  Skull,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/game/achievements";
import { cn } from "@/lib/utils";

const ICONS = {
  Sparkles,
  Zap,
  CircuitBoard,
  Star,
  Skull,
  Map: MapIcon,
  Crown,
  Flame,
  ArrowLeftRight,
  Trophy,
};

export default function AchievementStrip({ unlocked }) {
  const earned = ACHIEVEMENTS.filter((a) => unlocked?.[a.id]);
  const shown = [...earned, ...ACHIEVEMENTS.filter((a) => !unlocked?.[a.id])].slice(0, 5);

  return (
    <div className="rounded-[24px] border-2 border-frame bg-card p-4 shadow-[0_3px_0_hsl(var(--frame))]">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-sun/15 text-sun-ink">
          <Trophy className="h-4 w-4" fill="currentColor" strokeWidth={0} />
        </span>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink-soft">Achievements</p>
        <span className="ml-auto text-[10px] font-extrabold text-ink-soft">
          {earned.length}/{ACHIEVEMENTS.length}
        </span>
        <Link
          to="/profile"
          className="rounded-xl px-2 py-1 text-[10.5px] font-extrabold text-brand-ink transition-colors hover:bg-brand-tint"
        >
          View all
        </Link>
      </div>

      <div className="no-scrollbar mt-2.5 flex gap-2 overflow-x-auto">
        {shown.map((achievement) => {
          const Icon = ICONS[achievement.icon] || Trophy;
          const on = Boolean(unlocked?.[achievement.id]);
          return (
            <div
              key={achievement.id}
              title={achievement.description}
              className={cn(
                "flex min-w-[96px] flex-1 flex-col items-center gap-1.5 rounded-2xl border-2 px-2 py-2.5 text-center",
                on ? "border-grape/40 bg-grape/16" : "border-frame bg-tile"
              )}
            >
              <span
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-xl bg-card",
                  on ? "text-grape" : "text-ink-faint"
                )}
              >
                {on ? (
                  <Icon className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                ) : (
                  <Lock className="h-3.5 w-3.5" strokeWidth={3} />
                )}
              </span>
              <span className={cn("text-[10px] font-extrabold leading-tight", on ? "text-ink" : "text-ink-faint")}>
                {achievement.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}