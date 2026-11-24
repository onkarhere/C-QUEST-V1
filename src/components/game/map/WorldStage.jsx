import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { isMissionUnlocked } from "@/lib/game/curriculum";
import { MAP_IMAGE_RATIO } from "@/lib/game/worldArt";
import QuestStop from "@/components/game/map/QuestStop";
import MapSign from "@/components/game/map/MapSign";

function Banner({ tilt }) {
  return (
    <div className="anim-sway origin-top" style={{ "--tilt": `${tilt}deg` }}>
      <div className="mx-auto h-1 w-10 rounded-full bg-[#7C5330] shadow-[0_2px_0_#5F3E22]" />
      <div
        className="mt-0.5 grid h-11 w-11 place-items-center bg-gradient-to-b from-[#8CC63F] to-[#4F9126] text-[22px] font-extrabold text-[#F3F8E4] shadow-[0_6px_12px_rgba(20,40,10,0.35)] [text-shadow:0_2px_0_rgba(58,96,22,0.6)]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 74%, 50% 100%, 0 74%)" }}
      >
        C
      </div>
      <div className="mx-auto mt-0.5 h-5 w-1.5 bg-[#8A6134]" />
    </div>
  );
}

export default function WorldStage({ world, art, progress, current, onOpenMission }) {
  const stageRef = useRef(null);
  const [box, setBox] = useState(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      const canvasW = Math.max(w, h * MAP_IMAGE_RATIO);
      setBox({ w: Math.round(canvasW), h: Math.round(canvasW / MAP_IMAGE_RATIO) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const missions = progress?.missions || {};
  const stopList = world.missions.slice(0, art.nodes.length);
  const firstLocked = stopList.findIndex((mission) => !isMissionUnlocked(mission.id, progress));
  const signStop = firstLocked >= 0 ? art.nodes[firstLocked] : null;
  const signPos = signStop
    ? {
        x: Math.min(signStop.x + 17, 84),
        y: Math.max(Math.min(signStop.y - 8, 78), 22),
      }
    : null;

  return (
    <div ref={stageRef} className="absolute inset-0 overflow-hidden bg-[#8ED8F8]">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={box ? { width: box.w, height: box.h } : { width: "100%", height: "100%" }}
      >
        <img
          src={art.image}
          alt=""
          aria-hidden
          className={cn(
            "anim-map absolute inset-0 h-full w-full select-none object-cover",
            !art.image && "bg-[#8ED8F8]"
          )}
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_80%_at_50%_0%,rgba(255,255,255,0.18),transparent_45%)]" />

        {box && (
          <>
            {firstLocked > 0 && signPos && (
              <MapSign
                x={signPos.x}
                y={signPos.y}
                text={`Complete Quest ${firstLocked} to unlock the next challenge!`}
              />
            )}

            <div className="pointer-events-none absolute hidden sm:block" style={{ left: "35%", top: "9%" }}>
              <Banner tilt={-6} />
            </div>
            <div className="pointer-events-none absolute hidden sm:block" style={{ left: "64%", top: "8%" }}>
              <Banner tilt={5} />
            </div>

            {stopList.map((mission, i) => {
              const stop = art.nodes[i];
              const record = missions[mission.id];
              const state = record
                ? "done"
                : current?.id === mission.id
                  ? "current"
                  : isMissionUnlocked(mission.id, progress)
                    ? "ready"
                    : "locked";
              return (
                <div
                  key={mission.id}
                  className="absolute"
                  style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                >
                  <QuestStop
                    mission={mission}
                    number={i + 1}
                    state={state}
                    stars={record?.stars || 0}
                    onOpen={() => onOpenMission(mission.id)}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}
