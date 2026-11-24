import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Lock, Trophy } from "lucide-react";
import { toast } from "sonner";
import MapNav from "@/components/game/map/MapNav";
import MasteryGate from "@/components/game/map/MasteryGate";
import WorldCard from "@/components/game/map/WorldCard";
import WorldPicker from "@/components/game/map/WorldPicker";
import WorldStage from "@/components/game/map/WorldStage";
import { useGame } from "@/lib/game/GameProvider";
import {
  WORLDS,
  activeWorld,
  currentMission,
  isMissionUnlocked,
  isWorldMastered,
  isWorldUnlocked,
  worldCleared,
} from "@/lib/game/curriculum";
import { WORLD_ART, WORLD_ART_FALLBACK } from "@/lib/game/worldArt";

export const Route = createFileRoute("/map")({
  ssr: false,
  head: () => ({ meta: [{ title: "The Campaign — C//QUEST" }] }),
  component: MapPage,
});

function TipCard({ world, locked }) {
  const isFinalWorld = world.index === WORLDS[WORLDS.length - 1].index;

  return (
    <div className="pointer-events-auto flex max-w-[250px] items-start gap-2.5 rounded-[16px] border-2 border-sun/30 bg-card/95 px-3 py-2.5 shadow-[0_8px_20px_rgba(30,40,20,0.22)]">
      <Trophy className="mt-0.5 h-6 w-6 shrink-0 text-[#E0A200]" fill="currentColor" strokeWidth={0} />
      <p className="text-[11.5px] font-extrabold leading-snug text-ink">
        {locked
          ? `Clear World ${world.index - 1} and its Mastery Challenge to open this trail.`
          : isFinalWorld
            ? "Clear all five quests, then pass the final Mastery Challenge to finish the campaign."
            : "Clear all five quests, then pass the World Mastery Challenge to open the next world."}
      </p>
      {!locked && <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6136]" strokeWidth={3} />}
    </div>
  );
}

function MapPage() {
  const { ready, activeSave, progress } = useGame();
  const navigate = useNavigate();
  const [pickedWorldId, setPickedWorldId] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    if (ready && !activeSave) navigate({ to: "/" });
  }, [ready, activeSave, navigate]);

  if (!ready || !activeSave) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#8ED8F8] dark:bg-[#0F1A20]">
        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-ink">
          Loading your adventure…
        </p>
      </div>
    );
  }

  const current = currentMission(progress);
  const focus = activeWorld(progress);
  const world = WORLDS.find((w) => w.id === pickedWorldId) || focus || WORLDS[0];
  const art = WORLD_ART[world.id] || WORLD_ART_FALLBACK;
  const unlocked = isWorldUnlocked(world.id, progress);
  const cleared = worldCleared(world.id, progress);
  const mastered = isWorldMastered(world.id, progress);

  const openMission = (id) => {
    if (!isMissionUnlocked(id, progress)) {
      toast("That quest is still locked", { description: "Clear the quest before it first." });
      return;
    }
    navigate({ to: "/mission/$missionId", params: { missionId: id } });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#8ED8F8] dark:bg-[#0F1A20]">
      <MapNav />

      <div className="relative z-20 mt-2 px-3 sm:hidden">
        <WorldCard
          world={world}
          progress={progress}
          unlocked={unlocked}
          compact
          onOpenWorlds={() => setPickerOpen(true)}
        />
      </div>

      <div className="relative z-10 mt-2 h-[78svh] min-h-[560px] sm:absolute sm:inset-0 sm:mt-0 sm:h-full sm:min-h-0">
        <WorldStage
          world={world}
          art={art}
          progress={progress}
          current={current}
          onOpenMission={openMission}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-16 z-20 hidden justify-center px-4 sm:flex">
          <MasteryGate world={world} cleared={cleared} mastered={mastered} />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 hidden justify-between px-4 sm:flex">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="pointer-events-auto flex items-center gap-2 rounded-[16px] bg-card px-4 py-2.5 text-[13.5px] font-extrabold text-ink shadow-[0_6px_16px_rgba(30,40,20,0.25)] transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={3.2} />
            Back to Worlds
          </button>

          <TipCard world={world} locked={!unlocked} />
        </div>

        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded-[14px] bg-card px-3 py-2 text-[12px] font-extrabold text-ink shadow-[0_6px_16px_rgba(30,40,20,0.25)] sm:hidden"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={3.2} />
          Worlds
        </button>
      </div>

      <div className="pointer-events-none absolute left-4 top-[92px] z-20 hidden sm:block">
        <WorldCard
          world={world}
          progress={progress}
          unlocked={unlocked}
          onOpenWorlds={() => setPickerOpen(true)}
        />
      </div>

      <div className="relative z-20 mx-3 mb-6 mt-3 flex flex-col items-center gap-2 sm:hidden">
        <MasteryGate world={world} cleared={cleared} mastered={mastered} />
        <TipCard world={world} locked={!unlocked} />
      </div>

      <WorldPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        worlds={WORLDS}
        activeId={world.id}
        progress={progress}
        onSelect={setPickedWorldId}
      />
    </div>
  );
}
