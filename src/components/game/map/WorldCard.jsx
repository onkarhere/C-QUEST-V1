import { ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCENTS } from "@/lib/game/curriculum";
import { WORLD_ART } from "@/lib/game/worldArt";

export default function WorldCard({ world, progress, unlocked, onOpenWorlds, compact = false }) {
  const accent = ACCENTS[world.accent] || ACCENTS.cyan;
  const stars = world.missions.reduce(
    (sum, mission) => sum + (progress?.missions?.[mission.id]?.stars || 0),
    0
  );
  const maxStars = world.missions.length * 3;
  const art = WORLD_ART[world.id];

  return (
    <div
      className={cn(
        "pointer-events-auto w-full rounded-[20px] bg-card p-3 shadow-[0_8px_22px_rgba(30,50,80,0.22)] sm:w-[300px] sm:p-3.5",
        compact && "p-2.5"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[14px] ring-2 ring-frame sm:h-[74px] sm:w-[74px]">
          <img
            src={art?.image || "/images/world-1.jpg"}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: art?.thumbPosition || "50% 50%" }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className={cn("text-[12.5px] font-extrabold", unlocked ? accent.text : "text-ink-faint")}>
            World {world.index}
          </p>
          <h2 className="truncate text-[17px] font-extrabold leading-tight text-ink sm:text-[19px]">
            {world.name}
          </h2>
          <p className="mt-0.5 line-clamp-2 text-[11px] font-semibold leading-snug text-ink-faint sm:text-[11.5px]">
            {unlocked ? world.blurb : "Clear the world before this one to open the trail."}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenWorlds}
        className="mt-2.5 flex w-full items-center gap-2 rounded-[11px] bg-[#3F5063] px-2.5 py-2 text-left transition-colors hover:bg-[#364759]"
        aria-label="Switch world"
      >
        <Star className="h-4 w-4 text-[#FFC800]" fill="currentColor" strokeWidth={0} />
        <span className="text-[13px] font-extrabold text-white">
          {stars}
          <span className="text-white/60"> / {maxStars}</span>
        </span>
        <ChevronRight className="ml-auto h-4 w-4 text-white/70" strokeWidth={3} />
      </button>
    </div>
  );
}
