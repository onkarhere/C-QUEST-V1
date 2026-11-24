import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, BookOpen, Code2, Crown, Lock, Play, RotateCcw, Sparkles } from "lucide-react";
import AmbientBackground from "@/components/game/AmbientBackground";
import BriefingPanel from "@/components/arena/BriefingPanel";
import ThemeToggle from "@/components/game/ThemeToggle";
import CodeEditor from "@/components/arena/CodeEditor";
import Terminal from "@/components/arena/Terminal";
import MemoryViewer from "@/components/arena/MemoryViewer";
import ChecksPanel from "@/components/arena/ChecksPanel";
import TutorPanel from "@/components/arena/TutorPanel";
import VictoryOverlay from "@/components/arena/VictoryOverlay";
import { useGame } from "@/lib/game/GameProvider";
import { canSkipMission, isMissionUnlocked, missionById, nextMission } from "@/lib/game/curriculum";
import { readDraft, writeDraft } from "@/lib/game/storage";
import { evaluateChecks, runC } from "@/lib/c/engine";
import { buildTutorFeedback } from "@/lib/game/tutor";
import { sfx } from "@/lib/game/sound";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mission/$missionId")({
  ssr: false,
  head: () => ({ meta: [{ title: "Quest — C//QUEST" }] }),
  component: MissionPage,
});

const TABS = [
  ["brief", "Quest", BookOpen],
  ["code", "Code", Code2],
  ["memory", "Magic", Sparkles],
];

function MissionPage() {
  const { missionId } = Route.useParams();
  const navigate = useNavigate();
  const { ready, activeSave, progress, completeMission } = useGame();
  const mission = useMemo(() => missionById(missionId), [missionId]);

  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [victory, setVictory] = useState(null);
  const [tab, setTab] = useState("code");

  const snapshots = useMemo(() => result?.snapshots || [], [result]);

  useEffect(() => {
    if (ready && !activeSave) navigate({ to: "/" });
  }, [ready, activeSave, navigate]);

  useEffect(() => {
    if (!mission || !activeSave) return;
    const draft = readDraft(activeSave.id, mission.id);
    setCode(draft || mission.starter);
    setResult(null);
    setEvaluation(null);
    setFeedback(null);
    setAttempts(0);
    setHintsUsed(0);
    setVictory(null);
    setTab(typeof window !== "undefined" && window.innerWidth < 1024 ? "brief" : "code");
  }, [mission?.id, activeSave?.id]);

  const handleRun = () => {
    if (!mission || !activeSave) return;
    sfx.run();
    const res = runC(code);
    const ev = evaluateChecks(mission, res, code);
    setResult(res);
    setEvaluation(ev);
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    writeDraft(activeSave.id, mission.id, code);

    if (ev.passed) {
      const stars = hintsUsed === 0 && attempts === 0 ? 3 : hintsUsed <= 1 && attempts <= 2 ? 2 : 1;
      const replay = Boolean(progress?.missions?.[mission.id]);
      const xp = replay ? Math.round(mission.reward.xp * 0.2) : mission.reward.xp + stars * 5;
      const coins = replay ? 0 : mission.reward.coins + (stars === 3 ? 10 : 0);
      const { newly } = completeMission(mission.id, {
        stars,
        xp,
        coins,
        attempts: nextAttempts,
        hints: hintsUsed,
      });
      sfx.success();
      setFeedback(null);
      setVictory({ stars, xp, coins, newly: newly || [] });
    } else {
      sfx.fail();
      setFeedback(buildTutorFeedback({ result: res, evaluation: ev, mission, attempts: nextAttempts }));
      setTab("code");
    }
  };

  const revealHint = () => {
    if (!mission) return;
    setHintsUsed((h) => Math.min(h + 1, mission.hints.length));
    sfx.click();
  };

  const handleReset = () => {
    if (!mission || !activeSave) return;
    setCode(mission.starter);
    setResult(null);
    setEvaluation(null);
    setFeedback(null);
    writeDraft(activeSave.id, mission.id, mission.starter);
    sfx.click();
  };

  if (!ready || !activeSave) {
    return (
      <div className="grid min-h-screen place-items-center">
        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">Loading your quest…</p>
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="grid min-h-screen place-items-center px-6">
        <div className="max-w-sm rounded-[28px] border-2 border-frame bg-card p-6 text-center shadow-[0_5px_0_hsl(var(--frame))]">
          <p className="text-lg font-extrabold text-ink">Quest not found</p>
          <p className="mt-1.5 text-[12.5px] font-semibold text-ink-soft">That quest isn't part of this campaign.</p>
          <Link to="/map" className="btn-game mt-4 inline-flex h-11 items-center px-5 text-[13px]">
            Back to the map
          </Link>
        </div>
      </div>
    );
  }

  if (!isMissionUnlocked(mission.id, progress)) {
    return (
      <div className="relative grid min-h-screen place-items-center overflow-hidden px-6">
        <AmbientBackground />
        <div className="relative z-10 max-w-sm rounded-[28px] border-2 border-frame bg-card p-6 text-center shadow-[0_5px_0_hsl(var(--frame))]">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-tile text-ink-faint">
            <Lock className="h-6 w-6" strokeWidth={3} />
          </div>
          <p className="mt-3 text-lg font-extrabold text-ink">Quest locked</p>
          <p className="mt-1.5 text-[12.5px] font-semibold leading-relaxed text-ink-soft">
            Clear the quest before this one to open the path.
          </p>
          <Link to="/map" className="btn-game mt-4 inline-flex h-11 items-center px-5 text-[13px]">
            Back to the map
          </Link>
        </div>
      </div>
    );
  }

  const upcoming = nextMission(mission.id);
  const next = upcoming && isMissionUnlocked(upcoming.id, progress) ? upcoming : null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground variant="violet" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-3 pb-16 pt-3 sm:px-5">
        <header className="sticky top-2 z-30 flex items-center gap-2.5 rounded-[22px] border-2 border-frame bg-card px-2.5 py-2 shadow-[0_3px_0_hsl(var(--frame))]">
          <Link
            to="/map"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border-2 border-frame text-ink-soft transition-colors hover:bg-hover hover:text-ink"
            aria-label="Back to the map"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={3} />
          </Link>

          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 truncate text-[9.5px] font-extrabold uppercase tracking-[0.16em] text-ink-soft">
              {mission.boss ? (
                <Crown className="h-3 w-3 text-grape" fill="currentColor" strokeWidth={0} />
              ) : null}
              {mission.worldName} · {mission.boss ? "boss quest" : `quest ${mission.order}`}
            </p>
            <p className="truncate text-[14px] font-extrabold text-ink">{mission.title}</p>
          </div>

          <ThemeToggle className="hidden sm:grid" />

          <button
            type="button"
            onClick={handleReset}
            className="hidden h-10 items-center gap-1.5 rounded-2xl border-2 border-frame px-3 text-[11.5px] font-extrabold text-ink-soft transition-colors hover:bg-hover hover:text-ink sm:flex"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={3} />
            Reset
          </button>

          <button
            type="button"
            onClick={handleRun}
            className="btn-game flex h-10 items-center gap-1.5 px-4 text-[13px]"
          >
            <Play className="h-4 w-4" fill="currentColor" strokeWidth={0} />
            Run
          </button>
        </header>

        <div className="mt-2 flex gap-1 rounded-[20px] border-2 border-frame bg-card p-1 shadow-[0_2px_0_hsl(var(--frame))] lg:hidden">
          {TABS.map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-2xl py-2 text-[12px] font-extrabold transition-all",
                tab === id ? "bg-[#58CC02] text-white shadow-[0_2px_0_#46A302]" : "text-ink-soft"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2.5} />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)_minmax(0,330px)] lg:gap-4">
          <div className={cn("space-y-3", tab !== "brief" && "hidden lg:block")}>
            <BriefingPanel
              mission={mission}
              hintsUsed={hintsUsed}
              onRevealHint={revealHint}
              skippable={canSkipMission(mission.id, progress)}
              onSkip={() =>
                navigate({ to: "/mastery/$challengeId", params: { challengeId: `topic-${mission.id}` } })
              }
            />
          </div>

          <div className={cn("space-y-3", tab !== "code" && "hidden lg:block")}>
            <CodeEditor value={code} onChange={setCode} onRun={handleRun} />
            <Terminal result={result} />
            <TutorPanel
              feedback={feedback}
              hints={mission.hints}
              hintsUsed={hintsUsed}
              onRevealHint={revealHint}
            />
          </div>

          <div className={cn("space-y-3", tab !== "memory" && "hidden lg:block")}>
            <MemoryViewer snapshots={snapshots} />
            <ChecksPanel mission={mission} evaluation={evaluation} />
          </div>
        </div>
      </div>

      <VictoryOverlay
        victory={victory}
        mission={mission}
        next={next}
        onNext={() => {
          if (!next) return;
          setVictory(null);
          navigate({ to: "/mission/$missionId", params: { missionId: next.id } });
        }}
        onMap={() => navigate({ to: "/map" })}
      />
    </div>
  );
}