import { Link } from "@tanstack/react-router";
import { Coins, Flame, Star, User } from "lucide-react";
import { useGame } from "@/lib/game/GameProvider";
import { cn } from "@/lib/utils";

function Chip({ icon: Icon, value, className }) {
  return (
    <span className="flex items-center gap-1 rounded-xl bg-tile px-2 py-1.5">
      <Icon className={cn("h-4 w-4", className)} fill="currentColor" strokeWidth={1.5} />
      <span className="text-[12px] font-extrabold text-ink">{value}</span>
    </span>
  );
}

export default function HudBar() {
  const { activeSave, level, progress } = useGame();
  if (!activeSave) return null;
  const xp = progress?.xp || 0;

  return (
    <div className="sticky top-3 z-30 flex flex-wrap items-center gap-3 rounded-[22px] border-2 border-frame bg-card px-3 py-2.5 shadow-[0_3px_0_hsl(var(--frame))]">
      <Link
        to="/map"
        className="flex items-center gap-2.5 rounded-2xl px-1 py-1 transition-colors hover:bg-hover"
      >
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-tint text-[18px] font-extrabold text-brand-ink">
          {activeSave.glyph}
        </span>
        <span className="hidden sm:block">
          <span className="block text-[13px] font-extrabold leading-none text-ink">{activeSave.name}</span>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-wide text-ink-soft">
            Level {level.level}
          </span>
        </span>
      </Link>

      <div className="hidden min-w-[100px] flex-1 sm:block">
        <div className="h-2.5 overflow-hidden rounded-full bg-track">
          <div
            className="h-full rounded-full bg-[#58CC02] transition-all duration-700"
            style={{ width: `${Math.max(level.pct, 3)}%` }}
          />
        </div>
        <p className="mt-1 text-[10px] font-bold text-ink-soft">
          {xp} XP · {level.needed} to level {level.level + 1}
        </p>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <Chip icon={Star} value={progress?.stars || 0} className="text-[#FFD900]" />
        <Chip icon={Coins} value={progress?.coins || 0} className="text-[#FF9600]" />
        <Chip icon={Flame} value={progress?.streak?.count || 0} className="text-coral" />
        <Link
          to="/profile"
          className="grid h-10 w-10 place-items-center rounded-2xl border-2 border-frame text-ink-soft transition-colors hover:border-frame hover:bg-hover hover:text-ink"
          aria-label="Profile and achievements"
        >
          <User className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}