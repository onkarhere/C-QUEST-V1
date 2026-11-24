import { Link } from "@tanstack/react-router";
import { ChevronRight, Crown, ShieldCheck } from "lucide-react";
import { WORLDS } from "@/lib/game/curriculum";
import { cn } from "@/lib/utils";

export default function MasteryGate({ world, cleared, mastered, className }) {
  if (!cleared) return null;

  // The last world has no successor: its gate closes the campaign instead.
  const isFinalWorld = world.index === WORLDS[WORLDS.length - 1].index;

  if (mastered) {
    return (
      <div
        className={cn(
          "pointer-events-auto flex items-center gap-2.5 rounded-[16px] border-2 border-brand/40 bg-card/95 px-3.5 py-2.5 shadow-[0_8px_20px_rgba(20,35,15,0.28)]",
          className
        )}
      >
        <ShieldCheck className="h-5 w-5 shrink-0 text-brand-ink" strokeWidth={2.6} />
        <p className="text-[12px] font-extrabold text-ink">
          World {world.index} mastered
          <span className="font-semibold text-ink-soft">
            {isFinalWorld ? " · campaign complete" : " · next world open"}
          </span>
        </p>
      </div>
    );
  }

  return (
    <Link
      to="/mastery/$challengeId"
      params={{ challengeId: `world-${world.id}` }}
      className={cn(
        "pointer-events-auto group flex items-center gap-2.5 rounded-[16px] border-2 border-[#E7B900] bg-[#FFD52E] px-3.5 py-2.5 text-left shadow-[0_6px_16px_rgba(60,40,0,0.35)] transition-transform hover:-translate-y-0.5",
        className
      )}
    >
      <Crown className="h-5 w-5 shrink-0 text-[#7A5B00]" fill="currentColor" strokeWidth={0} />
      <span className="min-w-0">
        <span className="block text-[12.5px] font-extrabold leading-tight text-[#4A3820]">
          World {world.index} Mastery Challenge
        </span>
        <span className="block text-[10.5px] font-bold leading-tight text-[#7A5B00]">
          {isFinalWorld ? "Final assessment · required to finish the campaign" : `Required to open World ${world.index + 1}`}
        </span>
      </span>
      <ChevronRight
        className="ml-1 h-4 w-4 shrink-0 text-[#7A5B00] transition-transform group-hover:translate-x-0.5"
        strokeWidth={3.2}
      />
    </Link>
  );
}
