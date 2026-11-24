import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Coins,
  Crown,
  Lightbulb,
  RotateCcw,
  Star,
  Target,
  Trophy,
  X,
} from "lucide-react";
import AmbientBackground from "@/components/game/AmbientBackground";
import CodeEditor from "@/components/arena/CodeEditor";
import Terminal from "@/components/arena/Terminal";
import ThemeToggle from "@/components/game/ThemeToggle";
import { useGame } from "@/lib/game/GameProvider";
import { isMissionUnlocked, missionById, nextMission, WORLDS } from "@/lib/game/curriculum";
import { challengeById } from "@/lib/game/mastery";
import { readDraft, writeDraft } from "@/lib/game/storage";
import { evaluateChecks, runC } from "@/lib/c/engine";
import { sfx } from "@/lib/game/sound";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mastery/$challengeId")({
  ssr: false,
  head: () => ({ meta: [{ title: "Mastery Challenge — C//QUEST" }] }),
  component: MasteryPage,
});

function criterionLabel(check) {
  if (check.type === "code") return "The program is built with the required function";
  if (check.mode === "exact") {
    const value = String(check.value).replace(/\n/g, " ⏎ ");
    return value.length > 54 ? `Output exactly: ${value.slice(0, 54)}…` : `Output exactly: ${value}`;
  }
  if (check.mode === "regex") return "Output matches the required pattern";
  return `Output contains "${check.value}"`;
}

function MasteryPage() {
  const { challengeId } = Route.useParams();
  const navigate = useNavigate();
  const { ready, activeSave, progress, completeMastery } = useGame();
  const challenge = useMemo(() => challengeById(challengeId), [challengeId]);

  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [reward, setReward] = useState(null);

  const draftKey = challenge ? `mastery:${challenge.id}` : null;

  useEffect(() => {
    if (ready && !activeSave) navigate({ to: "/" });
  }, [ready, activeSave, navigate]);

  useEffect(() => {
    if (!challenge || !activeSave) return;
    setCode(readDraft(activeSave.id, draftKey) || challenge.starter);
    setResult(null);
    setEvaluation(null);
    setAttempts(0);
    setHintsUsed(0);
    setReward(null);
  }, [challenge?.id, activeSave?.id, draftKey]);

  if (!ready || !activeSave) {
    return (
      <div className="grid min-h-screen place-items-center">
        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">
          Loading your challenge…
        </p>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="grid min-h-screen place-items-center px-6">
        <div className="max-w-sm rounded-[28px] border-2 border-frame bg-card p-6 text-center shadow-[0_5px_0_hsl(var(--frame))]">
          <p className="text-lg font-extrabold text-ink">Challenge not found</p>
          <p className="mt-1.5 text-[12.5px] font-semibold text-ink-soft">
            That assessment isn't part of this campaign.
          </p>
          <Link to="/map" className="btn-game mt-4 inline-flex h-11 items-center px-5 text-[13px]">
            Back to the map
          </Link>
        </div>
      </div>
    );
  }

  const isWorld = challenge.kind === "world";
  const world = isWorld ? WORLDS.find((w) => w.id === challenge.worldId) : null;
  const lesson = challenge.missionId ? missionById(challenge.missionId) : null;
  const alreadyPassed = Boolean(progress?.mastery?.[challenge.id]);
  const passed = Boolean(reward) || alreadyPassed;

  const revisits = challenge.revisit
    ? challenge.revisit.map((id) => missionById(id)).filter(Boolean)
    : world
      ? world.missions
      : [];

  const handleRun = () => {
    const res = runC(code);
    const ev = evaluateChecks(challenge, res, code);
    const nextAttempts = attempts + 1;
    setResult(res);
    setEvaluation(ev);
    setAttempts(nextAttempts);
    if (draftKey) writeDraft(activeSave.id, draftKey, code);

    if (ev.passed) {
      sfx.success();
      const outcome = completeMastery(challenge, { attempts: nextAttempts, hints: hintsUsed });
      setReward({ ...outcome, attempts: nextAttempts });
    } else {
      sfx.fail();
    }
  };

  const handleReset = () => {
    setCode(challenge.starter);
    setResult(null);
    setEvaluation(null);
    if (draftKey) writeDraft(activeSave.id, draftKey, challenge.starter);
    sfx.click();
  };

  const revealHint = () => {
    setHintsUsed((h) => Math.min(h + 1, challenge.hints.length));
    sfx.click();
  };

  // Where to go once the challenge is passed.
  const upcoming = lesson ? nextMission(lesson.id) : null;
  const nextOpen = upcoming && isMissionUnlocked(upcoming.id, progress) ? upcoming : null;
  const nextWorld = isWorld ? WORLDS.find((w) => w.index === world.index + 1) : null;
  const struggling = attempts >= 2 && !passed;
  const failed = evaluation?.results?.filter((r) => !r.pass) || [];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground variant={isWorld ? "violet" : "green"} />

      <div className="relative z-10 mx-auto max-w-4xl px-3 pb-16 pt-3 sm:px-5">
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
              {isWorld ? (
                <Crown className="h-3 w-3 text-grape" fill="currentColor" strokeWidth={0} />
              ) : (
                <Target className="h-3 w-3 text-aqua" strokeWidth={3} />
              )}
              {isWorld ? `World ${world.index} mastery` : `Skip test · ${lesson?.title}`}
            </p>
            <p className="truncate text-[14px] font-extrabold text-ink">{challenge.title}</p>
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
            disabled={passed}
            className="btn-game flex h-10 items-center gap-1.5 px-4 text-[13px] disabled:opacity-60"
          >
            {passed ? "Passed" : "Run"}
          </button>
        </header>

        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <section className="space-y-3">
            <div className="rounded-[24px] border-2 border-frame bg-card p-4 shadow-[0_3px_0_hsl(var(--frame))]">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-widest",
                    isWorld ? "bg-grape/16 text-grape" : "bg-aqua/15 text-aqua"
                  )}
                >
                  {isWorld ? `World ${world.index} assessment` : "Topic mastery"}
                </span>
                {isWorld ? (
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-ink-soft">
                    SPPU · semester style
                  </span>
                ) : null}
              </div>

              <p className="mt-2.5 text-[12.5px] font-semibold leading-relaxed text-ink">
                {challenge.brief}
              </p>

              {challenge.given ? (
                <ul className="mt-3 space-y-1.5">
                  {challenge.given.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 font-mono text-[11px] font-bold leading-relaxed text-ink-soft"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-aqua" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}

              <p className="mt-3 rounded-2xl border-l-4 border-brand bg-brand/8 px-3.5 py-3 text-[12px] font-semibold leading-relaxed text-ink-soft">
                {challenge.prompt}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {challenge.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="rounded-full bg-tile px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-soft"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border-2 border-frame bg-card p-4 shadow-[0_3px_0_hsl(var(--frame))]">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-tint text-brand-ink">
                  <Target className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">
                  Success criteria
                </p>
              </div>
              <ul className="mt-3 space-y-2">
                {challenge.checks.map((check, i) => {
                  const state = evaluation?.results?.[i];
                  return (
                    <li key={i} className="flex items-start gap-2.5 text-[11.5px] font-semibold leading-relaxed">
                      <span
                        className={cn(
                          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2",
                          state?.pass && "border-brand bg-brand text-white",
                          state && !state.pass && "border-coral bg-coral/12 text-coral",
                          !state && "border-frame bg-tile text-ink-faint"
                        )}
                      >
                        {state?.pass ? (
                          <Check className="h-3 w-3" strokeWidth={4} />
                        ) : state ? (
                          <X className="h-3 w-3" strokeWidth={4} />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
                        )}
                      </span>
                      <span className={state?.pass ? "text-ink-soft" : "text-ink"}>
                        {criterionLabel(check)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-3 flex items-center justify-between border-t-2 border-frame pt-3">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">
                  Reward
                </span>
                <span className="flex items-center gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-aqua/15 px-2 py-0.5 text-[10.5px] font-extrabold text-aqua">
                    <Star className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                    {challenge.reward.xp} XP
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-tangerine/15 px-2 py-0.5 text-[10.5px] font-extrabold text-tangerine-ink">
                    <Coins className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                    {challenge.reward.coins}
                  </span>
                  {isWorld ? (
                    <span className="flex items-center gap-1 rounded-full bg-sun/15 px-2 py-0.5 text-[10.5px] font-extrabold text-sun-ink">
                      <Trophy className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                      +3 stars
                    </span>
                  ) : null}
                </span>
              </div>
            </div>

            <div className="rounded-[24px] border-2 border-frame bg-card p-4 shadow-[0_3px_0_hsl(var(--frame))]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-sun/15 text-sun-ink">
                    <Lightbulb className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                  </span>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">
                    Hints
                  </p>
                </div>
                <span className="text-[10px] font-extrabold text-ink-soft">
                  {hintsUsed}/{challenge.hints.length}
                </span>
              </div>

              <div className="mt-2.5 space-y-2">
                {challenge.hints.slice(0, hintsUsed).map((hint, i) => (
                  <p
                    key={hint}
                    className="anim-fade-up rounded-2xl border-2 border-sun/45 bg-sun/15 p-3 text-[11.5px] font-semibold leading-relaxed text-sun-ink"
                  >
                    <span className="mr-1.5 rounded bg-sun px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-[#7A6600]">
                      Hint {i + 1}
                    </span>
                    {hint}
                  </p>
                ))}
              </div>

              {hintsUsed < challenge.hints.length ? (
                <button
                  type="button"
                  onClick={revealHint}
                  disabled={passed}
                  className="mt-3 w-full rounded-2xl border-2 border-sun/40 bg-card py-2.5 text-[11.5px] font-extrabold text-sun-ink shadow-[0_3px_0_hsl(var(--sun)/0.35)] transition-all hover:bg-sun/8 active:translate-y-0.5 active:shadow-none disabled:opacity-50"
                >
                  Reveal hint {hintsUsed + 1} of {challenge.hints.length} · smaller bonus
                </button>
              ) : (
                <p className="mt-3 text-[11px] font-semibold text-ink-soft">All hints revealed.</p>
              )}
            </div>

            {struggling ? (
              <div className="rounded-[24px] border-2 border-coral/40 bg-coral/8 p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-coral">
                  Weak spots
                </p>
                <p className="mt-1.5 text-[11.5px] font-semibold leading-relaxed text-ink-soft">
                  {failed.length
                    ? `${failed.length} criterion${failed.length > 1 ? "a" : ""} still failing: ${failed
                        .map((c) => criterionLabel(c).replace(/^Output (exactly|contains): /, ""))
                        .join(", ")}.`
                    : "Read the criteria again and trace your program line by line."}
                </p>
                {revisits.length ? (
                  <p className="mt-2 text-[11px] font-semibold text-ink-soft">
                    Suggested revision:{" "}
                    {revisits.map((m, i) => (
                      <span key={m.id}>
                        {i > 0 ? ", " : ""}
                        <Link
                          to="/mission/$missionId"
                          params={{ missionId: m.id }}
                          className="font-extrabold text-ink underline decoration-brand/50 underline-offset-2"
                        >
                          {m.title}
                        </Link>
                      </span>
                    ))}
                  </p>
                ) : null}
              </div>
            ) : null}
          </section>

          <section className="space-y-3">
            {passed ? (
              <div className="anim-pop rounded-[24px] border-2 border-brand/40 bg-card p-5 shadow-[0_4px_0_hsl(var(--frame))]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-brand-ink">
                  <Trophy className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                  {isWorld ? (nextWorld ? "World mastered" : "Campaign complete") : "Topic cleared"}
                </span>
                <h2 className="mt-3 text-xl font-extrabold leading-tight text-ink">
                  {isWorld ? `${world.name} is mastered` : `You can skip ${lesson?.title}`}
                </h2>
                <p className="mt-1.5 text-[12px] font-semibold leading-relaxed text-ink-soft">
                  {isWorld
                    ? nextWorld
                      ? `World ${nextWorld.index} — ${nextWorld.name} is now open.`
                      : `That was the last Mastery Challenge: all ${WORLDS.length} worlds are mastered and the campaign is complete.`
                    : `${challenge.title} passed, so the next quest on this world's trail is open.`}
                </p>

                {reward ? (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-aqua/15 px-2.5 py-1 text-[11px] font-extrabold text-aqua">
                      <Star className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />+{reward.xp} XP
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-tangerine/15 px-2.5 py-1 text-[11px] font-extrabold text-tangerine-ink">
                      <Coins className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />+{reward.coins}
                    </span>
                    {reward.stars ? (
                      <span className="flex items-center gap-1 rounded-full bg-sun/15 px-2.5 py-1 text-[11px] font-extrabold text-sun-ink">
                        <Trophy className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />+{reward.stars} stars
                      </span>
                    ) : null}
                    {reward.attempts === 1 && hintsUsed === 0 ? (
                      <span className="rounded-full bg-brand-tint px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-brand-ink">
                        First try bonus
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <p className="mt-4 text-[11px] font-semibold text-ink-soft">
                    Already recorded on this save.
                  </p>
                )}

                {reward?.newly?.length ? (
                  <div className="mt-4 space-y-2">
                    {reward.newly.map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center gap-2.5 rounded-2xl border-2 border-grape/40 bg-grape/16 px-3 py-2"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-card text-grape">
                          <Trophy className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-extrabold text-ink">{a.name}</p>
                          <p className="truncate text-[10.5px] font-semibold text-ink-soft">
                            {a.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-5 space-y-2.5">
                  {isWorld && nextWorld ? (
                    <Link
                      to="/map"
                      className="btn-game flex h-12 w-full items-center justify-center gap-2 text-[15px]"
                    >
                      Enter World {nextWorld.index}
                      <ArrowRight className="h-5 w-5" strokeWidth={3} />
                    </Link>
                  ) : null}
                  {!isWorld && nextOpen ? (
                    <Link
                      to="/mission/$missionId"
                      params={{ missionId: nextOpen.id }}
                      className="btn-game flex h-12 w-full items-center justify-center gap-2 text-[15px]"
                    >
                      Open next quest
                      <ArrowRight className="h-5 w-5" strokeWidth={3} />
                    </Link>
                  ) : null}
                  <Link
                    to="/map"
                    className="btn-ghost flex h-12 w-full items-center justify-center gap-2 text-[14px]"
                  >
                    Back to the map
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <CodeEditor value={code} onChange={setCode} onRun={handleRun} />
                <Terminal result={result} />
                {evaluation && !evaluation.passed ? (
                  <p className="rounded-2xl border-2 border-coral/40 bg-coral/8 px-3.5 py-2.5 text-[11.5px] font-semibold leading-relaxed text-ink-soft">
                    {evaluation.ok
                      ? "The program runs, but the output isn't what the lab sheet asks for yet. Compare it with the success criteria."
                      : "The program stopped with an error — fix that first, then check the output."}
                  </p>
                ) : null}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
