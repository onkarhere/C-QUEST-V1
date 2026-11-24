import { Lock, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { isWorldUnlocked, worldProgress } from "@/lib/game/curriculum";
import { WORLD_ART } from "@/lib/game/worldArt";

export default function WorldPicker({ open, onClose, worlds, activeId, progress, onSelect }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close world picker"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#22303F]/55 backdrop-blur-[2px]"
      />
      <div className="anim-pop relative z-10 max-h-[86svh] w-full max-w-2xl overflow-y-auto rounded-[26px] border-2 border-card bg-card p-4 shadow-[0_24px_60px_rgba(20,30,45,0.4)] sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">World map</p>
            <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Choose a world</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-tile text-ink-faint transition-colors hover:bg-hover"
            aria-label="Close"
          >
            <X className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {worlds.map((world) => {
            const art = WORLD_ART[world.id];
            const open_ = isWorldUnlocked(world.id, progress);
            const { done, total } = worldProgress(world, progress);
            const stars = world.missions.reduce(
              (sum, mission) => sum + (progress?.missions?.[mission.id]?.stars || 0),
              0
            );
            return (
              <button
                key={world.id}
                type="button"
                disabled={!open_}
                onClick={() => {
                  onSelect(world.id);
                  onClose();
                }}
                className={cn(
                  "flex items-center gap-3 rounded-[18px] border-2 p-2.5 text-left transition-all",
                  world.id === activeId
                    ? "border-brand bg-brand/15"
                    : "border-frame bg-card hover:-translate-y-0.5 hover:border-brand/40",
                  !open_ && "cursor-not-allowed opacity-70 hover:translate-y-0"
                )}
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[12px] ring-2 ring-frame">
                  <img
                    src={art?.image || "/images/world-1.jpg"}
                    alt=""
                    className={cn("h-full w-full object-cover", !open_ && "grayscale")}
                    style={{ objectPosition: art?.thumbPosition || "50% 50%" }}
                  />
                  {!open_ && (
                    <span className="absolute inset-0 grid place-items-center bg-[#22303F]/35 text-white">
                      <Lock className="h-4 w-4" strokeWidth={3.5} />
                    </span>
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-ink-soft">
                    World {world.index} · {done}/{total} cleared
                  </span>
                  <span className="block truncate text-[15px] font-extrabold text-ink">{world.name}</span>
                  <span className="mt-0.5 flex items-center gap-1 text-[11px] font-extrabold text-ink-soft">
                    <Star className="h-3.5 w-3.5 text-[#FFC800]" fill="currentColor" strokeWidth={0} />
                    {stars}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
