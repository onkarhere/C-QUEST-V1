import { Link } from "@tanstack/react-router";
import { Home, Map, Settings, Star, Trophy, User } from "lucide-react";
import { useGame } from "@/lib/game/GameProvider";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/game/ThemeToggle";

const TABS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/map", label: "World Map", icon: Map },
  { to: "/profile", label: "Achievements", icon: Trophy },
  { to: "/profile", label: "Profile", icon: User },
];

export default function MapNav() {
  const { progress, level, soundOn, toggleSound } = useGame();

  return (
    <header className="pointer-events-none relative z-40 flex items-center gap-2.5 px-3 pt-3 sm:gap-3 sm:px-4 sm:pt-4">
      <Link
        to="/"
        className="pointer-events-auto flex shrink-0 items-center gap-2.5 rounded-[16px] bg-card px-2 py-2 shadow-[0_4px_14px_rgba(38,60,92,0.16)] sm:gap-3 sm:rounded-[18px] sm:px-3"
      >
        <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-[#58CC02] text-[20px] font-extrabold leading-none text-white shadow-[0_3px_0_#46A302] sm:h-10 sm:w-10">
          C
        </span>
        <span className="hidden text-[17px] font-extrabold tracking-[0.02em] text-ink sm:block">C-QUEST</span>
      </Link>

      <nav className="pointer-events-auto hidden items-center gap-1 rounded-[18px] bg-card px-2 py-1.5 shadow-[0_4px_14px_rgba(38,60,92,0.16)] min-[420px]:flex">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = tab.label === "World Map";
          return (
            <Link
              key={tab.label}
              to={tab.to}
              className={cn(
                "flex items-center gap-2 rounded-[13px] px-2.5 py-2 text-[13px] font-extrabold transition-colors sm:px-3.5",
                active ? "text-[#58CC02]" : "text-ink-soft hover:bg-hover hover:text-ink"
              )}
            >
              <Icon
                className={cn("h-[17px] w-[17px]", active && "text-[#58CC02]")}
                fill={active && tab.label !== "Home" ? "currentColor" : "none"}
                strokeWidth={active ? 0 : 2.6}
              />
              <span className="hidden lg:block">{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pointer-events-auto ml-auto flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-[15px] bg-card px-2.5 py-2 shadow-[0_4px_14px_rgba(38,60,92,0.16)]">
          <Star className="h-[18px] w-[18px] text-[#FFC800]" fill="currentColor" strokeWidth={0} />
          <span className="text-[13px] font-extrabold text-ink">{progress?.stars || 0}</span>
        </span>

        <span className="flex items-center gap-1.5 rounded-[15px] bg-card px-1.5 py-1.5 shadow-[0_4px_14px_rgba(38,60,92,0.16)]">
          <span className="grid h-6 shrink-0 place-items-center rounded-full bg-[#FFC800] px-2 text-[10px] font-extrabold leading-none text-white">
            Lv.{level.level}
          </span>
          <span className="hidden h-2.5 w-16 overflow-hidden rounded-full bg-track md:block">
            <span
              className="block h-full rounded-full bg-[#58CC02]"
              style={{ width: `${Math.max(level.pct, 4)}%` }}
            />
          </span>
        </span>

        <ThemeToggle className="rounded-[15px] border-0 bg-card shadow-[0_4px_14px_rgba(10,22,34,0.28)]" />

        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundOn ? "Mute sound" : "Unmute sound"}
          className="grid h-10 w-10 place-items-center rounded-[15px] bg-card text-ink shadow-[0_4px_14px_rgba(38,60,92,0.16)] transition-transform hover:-translate-y-0.5"
        >
          <Settings className="h-[19px] w-[19px]" strokeWidth={2.6} />
        </button>
      </div>
    </header>
  );
}
