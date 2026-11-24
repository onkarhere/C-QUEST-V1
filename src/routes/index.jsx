import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Play, RotateCcw, Sparkles } from "lucide-react";
import SaveSlots from "@/components/game/SaveSlots";
import NewRunDialog from "@/components/game/NewRunDialog";
import ThemeToggle from "@/components/game/ThemeToggle";
import { useGame } from "@/lib/game/GameProvider";
import { runC } from "@/lib/c/engine";
import { highlightC } from "@/lib/c/highlight";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "C//QUEST — Learn C as an Adventure" },
      {
        name: "description",
        content:
          "Six worlds, thirty quests and a real C engine in your browser. Learn C from first principles by playing.",
      },
    ],
  }),
  component: TitleScreen,
});

// The program the page runs on arrival: three cleared worlds, twenty-seven to go.
const FIRST_PROGRAM = `#include <stdio.h>

int main(void) {
  int cleared = 3;
  int total = 30;

  for (int i = 1; i <= cleared; i++) {
    printf("world %d cleared\\n", i);
  }
  int left = total - cleared;
  printf("%d quests to go\\n", left);

  return 0;
}`;

const FACTS = [
  ["06", "worlds"],
  ["30", "quests"],
  ["00", "installs"],
];

const NOTES = [
  ["engine", "A C parser and interpreter written for this game. It answers in milliseconds, in this tab."],
  ["memory", "Every quest shows variables, frames and pointers moving while your program runs."],
  ["coursework", "The quest order follows a first-year C module, so patterns transfer to your own work."],
];

const monoLabel = "font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-soft";

function TitleScreen() {
  const { ready, saves, activeId, createSave, selectSave, deleteSave } = useGame();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const latest = saves.find((s) => s.id === activeId) || saves[0] || null;

  const handleCreate = (name, glyph) => {
    createSave(name, glyph);
    navigate({ to: "/map" });
  };

  const handleSelect = (id) => {
    selectSave(id);
    navigate({ to: "/map" });
  };

  const handleContinue = () => {
    if (latest) handleSelect(latest.id);
    else setDialogOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dots opacity-40" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-5 pb-6 pt-5 sm:px-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#58CC02] font-mono text-[15px] font-bold text-white shadow-[0_3px_0_#46A302]">
              C
            </div>
            <div className="leading-none">
              <p className="text-[16px] font-extrabold tracking-tight text-ink">
                C<span className="text-[#58CC02]">//</span>QUEST
              </p>
              <p className={`mt-1.5 hidden text-[9.5px] tracking-[0.2em] sm:block ${monoLabel}`}>first-year C, played</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle className="rounded-full" />
          <p className="flex items-center gap-2 rounded-full border border-frame bg-card px-2.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-soft sm:px-3 sm:text-[10px]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#58CC02] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#58CC02]" />
            </span>
            <span className="sm:hidden">local save</span>
            <span className="hidden sm:inline">saved on this device</span>
          </p>
          </div>
        </header>

        <main className="flex-1 py-10 lg:py-14">
          <p className="font-mono text-[12px] text-ink-faint">
            <span className="text-ink-faint">$</span> cquest --beginner
          </p>

          <div className="mt-5 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
            <div className="anim-fade-up">
              <h1 className="text-[40px] font-extrabold leading-[1.03] tracking-[-0.015em] text-ink sm:text-5xl lg:text-[56px]">
                Learn C by{" "}
                <span className="mt-1 block">
                  writing <span className="caret-blink text-[#58CC02]">C.</span>
                </span>
              </h1>

              <p className="mt-5 max-w-[30rem] text-[15px] font-semibold leading-relaxed text-ink-soft">
                Six worlds, thirty small programs. Write real C, run it here, and watch memory answer
                every line you type. Nothing to install, no account to make.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!ready}
                  className="btn-game group inline-flex h-14 items-center gap-2.5 px-7 text-[16px] disabled:opacity-60"
                >
                  {latest ? "Continue adventure" : "Start playing"}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" strokeWidth={3} />
                </button>
                <a href="#slots" className="btn-ghost inline-flex h-14 items-center px-6 text-[15px]">
                  {latest ? "Switch save" : "See the campaign"}
                </a>
              </div>

              <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-2.5 font-mono text-[11px] uppercase tracking-[0.12em] sm:flex sm:flex-wrap sm:items-baseline sm:gap-x-7 sm:gap-y-2">
                {FACTS.map(([value, label]) => (
                  <div key={label} className="flex items-baseline gap-2">
                    <dt className="text-[15px] font-bold tracking-normal text-ink">{value}</dt>
                    <dd className="text-ink-soft">{label}</dd>
                  </div>
                ))}
                <div className="flex items-baseline gap-2">
                  <dt className="text-[15px] font-bold tracking-normal text-ink">
                    {ready ? String(saves.length).padStart(2, "0") : "--"}
                  </dt>
                  <dd className="text-ink-soft">saves</dd>
                </div>
              </dl>
            </div>

            <div className="anim-fade-up [animation-delay:90ms]">
              <SaveSlots
                saves={ready ? saves : []}
                activeId={activeId}
                onSelect={handleSelect}
                onNewRun={() => setDialogOpen(true)}
                onDelete={deleteSave}
              />
            </div>
          </div>

          <FirstProgram />

          <section className="mt-10 grid gap-5 border-t border-frame pt-6 sm:grid-cols-3">
            {NOTES.map(([label, body]) => (
              <div key={label}>
                <p className={monoLabel}>{label}</p>
                <p className="mt-1.5 text-[12px] font-semibold leading-relaxed text-ink-soft">{body}</p>
              </div>
            ))}
          </section>
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-frame pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
          <p>C//QUEST · learn C by shipping C</p>
          <p className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-[#FFD900]" fill="currentColor" strokeWidth={0} />
            progress stays in this browser
          </p>
        </footer>
      </div>

      <NewRunDialog open={dialogOpen} onOpenChange={setDialogOpen} onCreate={handleCreate} />
    </div>
  );
}

/**
 * The page's one loud moment: it compiles and runs a real program with the same
 * engine every quest uses, and prints what the engine actually returned.
 */
function FirstProgram() {
  const sourceLines = useMemo(() => FIRST_PROGRAM.split("\n"), []);
  const highlighted = useMemo(
    () => sourceLines.map((line) => highlightC(line).replace(/\n$/, "")),
    [sourceLines],
  );
  const [output, setOutput] = useState([]);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(null);
  const timer = useRef(null);

  const run = () => {
    clearInterval(timer.current);
    const started = performance.now();
    const result = runC(FIRST_PROGRAM);
    const ms = Math.max(0, Math.round(performance.now() - started));
    const text = result.ok ? result.stdout : result.error?.message || "Compilation failed";
    const lines = text.replace(/\n$/, "").split("\n");

    setElapsed(ms);
    setRunning(true);
    setOutput([]);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOutput(lines);
      setRunning(false);
      return;
    }

    let shown = 0;
    timer.current = setInterval(() => {
      shown += 1;
      setOutput(lines.slice(0, shown));
      if (shown >= lines.length) {
        clearInterval(timer.current);
        setRunning(false);
      }
    }, 260);
  };

  useEffect(() => {
    run();
    return () => clearInterval(timer.current);
    // Runs once on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="anim-fade-up mt-12 overflow-hidden rounded-[26px] border border-frame bg-card shadow-[0_2px_0_hsl(var(--frame))] [animation-delay:160ms]">
      <div className="flex items-center justify-between gap-3 border-b border-frame px-4 py-2.5 sm:px-5">
        <p className="flex min-w-0 items-center gap-2 font-mono text-[11px] text-ink-soft">
          <span className="hidden text-ink-faint sm:inline">//</span>
          <span className="truncate">
            first_program<span className="text-ink-faint">.c</span>
          </span>
        </p>
        <button
          type="button"
          onClick={run}
          aria-label="Run first_program.c again"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-frame bg-card px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink transition-colors hover:border-brand hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58CC02]"
        >
          {elapsed === null || running ? (
            <Play className="h-3 w-3" fill="currentColor" strokeWidth={0} />
          ) : (
            <RotateCcw className="h-3 w-3" strokeWidth={3} />
          )}
          {running ? "running" : elapsed === null ? "run" : "run again"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-x-auto px-4 py-4 sm:px-5">
          <div className="min-w-[18rem] font-mono text-[11.5px] leading-[1.72] text-ink sm:text-[12.5px]">
            {highlighted.map((html, i) => (
              <div key={i} className="grid grid-cols-[2rem_1fr]">
                <span aria-hidden="true" className="select-none pr-3 text-right text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {html ? (
                  <span className="whitespace-pre" dangerouslySetInnerHTML={{ __html: html }} />
                ) : (
                  <span className="whitespace-pre"> </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0E1712] px-4 py-4 font-mono text-[12.5px] leading-[1.72] text-[#D7F8B0] sm:px-5">
          <p className="text-[#5E7A63]">
            <span className="text-[#8FA994]">$</span> ./first_program
          </p>
          <div aria-live="polite" aria-busy={running} className="mt-1 min-h-[6.9rem]">
            {output.map((line, i) => (
              <p key={i} className="whitespace-pre-wrap break-words">
                {line}
              </p>
            ))}
            {running && <span className="caret-blink text-[#8FA994]" />}
          </div>
          <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[#4F6A55]">
            {elapsed === null ? "not run yet" : `exit 0 · ${elapsed} ms · in this tab`}
          </p>
        </div>
      </div>
    </section>
  );
}
