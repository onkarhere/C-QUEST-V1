import { useEffect } from "react";
import confetti from "canvas-confetti";
import { ArrowRight, Coins, Map, Sparkles, Star, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VictoryOverlay({ victory, mission, next, onNext, onMap }) {
  useEffect(() => {
    if (!victory) return;
    const colors = ["#58CC02", "#FFD900", "#1CB0F6", "#CE82FF", "#FF9600"];
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.65 }, colors, disableForReducedMotion: true });
    const t = setTimeout(
      () => confetti({ particleCount: 55, spread: 100, origin: { y: 0.4 }, colors, disableForReducedMotion: true }),
      260
    );
    return () => clearTimeout(t);
  }, [victory]);

  if (!victory) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#4B4B4B]/45 p-4 backdrop-blur-sm">
      <div className="anim-pop relative w-full max-w-md overflow-hidden rounded-[32px] border-4 border-frame bg-card p-6 shadow-[0_12px_0_hsl(var(--frame))]">
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-sun/15" />
        <div className="pointer-events-none absolute -left-8 top-24 h-20 w-20 rounded-full bg-brand-tint" />

        <div className="relative text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-brand-ink">
            <Sparkles className="h-3 w-3" fill="currentColor" strokeWidth={0} />
            Quest complete
          </span>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight text-ink">{mission.title}</h2>

          <div className="mt-5 flex items-center justify-center gap-3">
            {[1, 2, 3].map((n) => (
              <Star
                key={n}
                className={cn("h-11 w-11 transition-all", n <= victory.stars ? "text-[#FFD900]" : "text-frame")}
                fill="currentColor"
                strokeWidth={0}
                style={{
                  animation:
                    n <= victory.stars ? `pop 0.5s cubic-bezier(0.2,0.9,0.3,1.5) ${0.15 * n}s both` : undefined,
                }}
              />
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <div className="rounded-2xl border-2 border-aqua/45 bg-aqua/10 p-3">
              <Star className="mx-auto h-4 w-4 text-aqua" fill="currentColor" strokeWidth={0} />
              <p className="mt-1 text-xl font-extrabold text-aqua">+{victory.xp}</p>
              <p className="text-[9px] font-extrabold uppercase tracking-widest text-ink-faint">XP earned</p>
            </div>
            <div className="rounded-2xl border-2 border-tangerine/40 bg-tangerine/15 p-3">
              <Coins className="mx-auto h-4 w-4 text-tangerine-ink" fill="currentColor" strokeWidth={0} />
              <p className="mt-1 text-xl font-extrabold text-tangerine-ink">+{victory.coins}</p>
              <p className="text-[9px] font-extrabold uppercase tracking-widest text-ink-faint">Coins</p>
            </div>
          </div>

          {victory.newly?.length > 0 && (
            <div className="mt-4 space-y-2 text-left">
              {victory.newly.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center gap-2.5 rounded-2xl border-2 border-grape/40 bg-grape/16 px-3 py-2"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-card text-grape">
                    <Trophy className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-extrabold text-ink">{a.name}</p>
                    <p className="truncate text-[10.5px] font-semibold text-ink-soft">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 space-y-2.5">
            {next ? (
              <button
                type="button"
                onClick={onNext}
                className="btn-game flex h-12 w-full items-center justify-center gap-2 text-[15px]"
              >
                Next quest
                <ArrowRight className="h-5 w-5" strokeWidth={3} />
              </button>
            ) : null}
            <button
              type="button"
              onClick={onMap}
              className="btn-ghost flex h-12 w-full items-center justify-center gap-2 text-[14px]"
            >
              <Map className="h-4 w-4" strokeWidth={2.5} />
              Back to the map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}