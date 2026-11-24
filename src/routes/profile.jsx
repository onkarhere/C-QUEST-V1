import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeftRight,
  Check,
  ChevronRight,
  CircuitBoard,
  Crown,
  Download,
  Flame,
  Home,
  Info,
  Lock,
  Map as MapIcon,
  Moon,
  Skull,
  Sparkles,
  Star,
  Sun,
  Trash2,
  Trophy,
  Upload,
  User,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/lib/theme/ThemeProvider";
import { useGame } from "@/lib/game/GameProvider";
import { ACHIEVEMENTS } from "@/lib/game/achievements";
import { WORLDS, isWorldMastered, isWorldUnlocked, worldProgress } from "@/lib/game/curriculum";
import { TOTAL_MISSIONS, serializeSave } from "@/lib/game/storage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Your Profile — C//QUEST" }],
    // Scoped to this route: the profile dashboard is set in Urbanist.
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: ProfilePage,
});

const ICONS = {
  Sparkles,
  Zap,
  CircuitBoard,
  Star,
  Skull,
  Map: MapIcon,
  Crown,
  Flame,
  ArrowLeftRight,
  Trophy,
};

const DOCK = [
  { to: "/", label: "Home", icon: Home },
  { to: "/map", label: "World map", icon: MapIcon },
  { to: "/profile", label: "Profile", icon: User },
];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "achievements", label: "Achievements" },
  { id: "worlds", label: "Worlds" },
];

const MAX_STARS = TOTAL_MISSIONS * 3;

// The dashboard palette: warm paper grey with charcoal accents in light mode,
// graphite with an off-white accent card in dark mode.
function palette(isDark) {
  if (isDark) {
    return {
      "--cb-bg": "#101012",
      "--cb-glow": "radial-gradient(900px 520px at 50% -12%, rgba(88,204,2,0.12), transparent 72%)",
      "--cb-card": "#191A1D",
      "--cb-seg": "rgba(255,255,255,0.08)",
      "--cb-ink": "#F2F3F5",
      "--cb-muted": "#9CA1A8",
      "--cb-line": "rgba(255,255,255,0.11)",
      "--cb-accent": "#F1F2F4",
      "--cb-accent-ink": "#121214",
      "--cb-accent-muted": "rgba(18,18,20,0.62)",
      "--cb-accent-chip": "rgba(18,18,20,0.10)",
      "--cb-shadow":
        "0 24px 60px -20px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.07)",
      "--cb-chip": "rgba(88,204,2,0.16)",
      "--cb-chip-ink": "#8FE05C",
      "--cb-bar": "#58CC02",
      "--cb-bar-soft": "rgba(88,204,2,0.18)",
      "--cb-gauge": "#7CE049",
      "--cb-gauge-track": "rgba(18,18,20,0.14)",
      "--cb-gauge-tick": "rgba(18,18,20,0.30)",
      "--cb-danger": "#FF7B72",
    };
  }
  return {
    "--cb-bg": "#EFEFED",
    "--cb-glow": "radial-gradient(900px 520px at 50% -12%, rgba(255,255,255,0.95), transparent 72%)",
    "--cb-card": "#FCFCFB",
    "--cb-seg": "rgba(17,17,17,0.06)",
    "--cb-ink": "#121212",
    "--cb-muted": "#6E6E69",
    "--cb-line": "rgba(17,17,17,0.10)",
    "--cb-accent": "#4A4A4A",
    "--cb-accent-ink": "#F8F8F6",
    "--cb-accent-muted": "rgba(255,255,255,0.66)",
    "--cb-accent-chip": "rgba(255,255,255,0.14)",
    "--cb-shadow":
      "0 24px 60px -18px rgba(20,40,56,0.34), 0 2px 6px rgba(20,40,56,0.08), inset 0 0 0 1px rgba(17,17,17,0.09)",
    "--cb-chip": "rgba(88,204,2,0.18)",
    "--cb-chip-ink": "#3E9202",
    "--cb-bar": "#58CC02",
    "--cb-bar-soft": "rgba(88,204,2,0.20)",
    "--cb-gauge": "#9AE85F",
    "--cb-gauge-track": "rgba(255,255,255,0.18)",
    "--cb-gauge-tick": "rgba(255,255,255,0.34)",
    "--cb-danger": "#E5484D",
  };
}

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);
  const shown = useRef(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      shown.current = target;
      setValue(target);
      return undefined;
    }

    const from = shown.current;
    const started = performance.now();
    let frame = 0;

    const step = (now) => {
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) {
        frame = requestAnimationFrame(step);
      } else {
        shown.current = target;
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function CountUp({ value }) {
  return <>{useCountUp(value)}</>;
}

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className="relative h-[26px] w-[46px] shrink-0 rounded-full transition-colors duration-300"
      style={{ backgroundColor: checked ? "var(--cb-bar)" : "var(--cb-seg)" }}
    >
      <span
        className={cn(
          "absolute top-[3px] h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-out",
          checked ? "translate-x-[23px]" : "translate-x-[3px]"
        )}
      />
    </button>
  );
}

function Gauge({ value, max }) {
  const pct = max ? Math.max(0, Math.min(1, value / max)) : 0;
  const r = 72;
  const cx = 110;
  const cy = 104;
  const arc = Math.PI * r;
  const theta = Math.PI * (1 - pct);
  const knobX = cx + r * Math.cos(theta);
  const knobY = cy - r * Math.sin(theta);

  const ticks = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    const a = Math.PI * (1 - t);
    const major = i % 5 === 0;
    const inner = major ? 82 : 86;
    return {
      key: i,
      x1: cx + Math.cos(a) * inner,
      y1: cy - Math.sin(a) * inner,
      x2: cx + Math.cos(a) * 93,
      y2: cy - Math.sin(a) * 93,
      major,
    };
  });

  return (
    <div className="relative mt-2 w-full max-w-[260px]">
      <svg viewBox="0 0 220 128" className="w-full">
        {ticks.map((tick) => (
          <line
            key={tick.key}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke="var(--cb-gauge-tick)"
            strokeOpacity={tick.major ? 1 : 0.6}
            strokeWidth={tick.major ? 2 : 1.4}
            strokeLinecap="round"
          />
        ))}

        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="var(--cb-gauge-track)"
          strokeWidth={9}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="var(--cb-gauge)"
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={arc}
          strokeDashoffset={arc * (1 - pct)}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.2,0.8,0.2,1)" }}
        />

        <circle cx={cx - r} cy={cy} r={9} fill="var(--cb-accent)" stroke="var(--cb-gauge)" strokeWidth={3} />
        <circle
          cx={knobX}
          cy={knobY}
          r={9}
          fill="var(--cb-accent)"
          stroke="var(--cb-gauge)"
          strokeWidth={3}
          style={{ transition: "cx 1.2s cubic-bezier(0.2,0.8,0.2,1), cy 1.2s cubic-bezier(0.2,0.8,0.2,1)" }}
        />
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-[18%] text-center">
        <p className="text-[34px] font-semibold leading-none tracking-[-0.03em] text-[var(--cb-accent-ink)]">
          <CountUp value={value} />
        </p>
        <p className="mt-1 text-[11.5px] font-medium text-[var(--cb-accent-muted)]">of {max} quests</p>
      </div>
    </div>
  );
}

function SectionCard({ title, meta, children, className, delay = 0 }) {
  return (
    <section
      className={cn(
        "cb-rise rounded-[24px] bg-[var(--cb-card)] p-4 shadow-[var(--cb-shadow)] sm:p-5",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--cb-ink)]">{title}</h2>
        {meta ? (
          <span className="rounded-full bg-[var(--cb-seg)] px-2.5 py-1 text-[11px] font-semibold text-[var(--cb-muted)]">
            {meta}
          </span>
        ) : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function StatCard({ accent, label, value, suffix, chip, caption, footer, onFooter, delay = 0 }) {
  return (
    <div
      className={cn(
        "cb-rise group relative overflow-hidden rounded-[22px] p-4 shadow-[var(--cb-shadow)] transition-transform duration-300 hover:-translate-y-0.5",
        accent ? "bg-[var(--cb-accent)]" : "bg-[var(--cb-card)]"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <p
        className={cn(
          "flex items-center gap-1.5 text-[13px] font-medium",
          accent ? "text-[var(--cb-accent-muted)]" : "text-[var(--cb-muted)]"
        )}
      >
        {label}
        <Info className="h-3.5 w-3.5 opacity-60" strokeWidth={2} />
      </p>

      <p
        className={cn(
          "mt-5 flex items-baseline gap-1.5 text-[36px] font-semibold leading-none tracking-[-0.03em]",
          accent ? "text-[var(--cb-accent-ink)]" : "text-[var(--cb-ink)]"
        )}
      >
        <CountUp value={value} />
        {suffix ? (
          <span
            className={cn(
              "text-[14px] font-medium tracking-normal",
              accent ? "text-[var(--cb-accent-muted)]" : "text-[var(--cb-muted)]"
            )}
          >
            {suffix}
          </span>
        ) : null}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11.5px] font-semibold",
            accent ? "text-[var(--cb-accent-ink)]" : "text-[var(--cb-chip-ink)]"
          )}
          style={{ backgroundColor: accent ? "var(--cb-accent-chip)" : "var(--cb-chip)" }}
        >
          {chip}
        </span>
        <span
          className={cn(
            "text-[12px] font-medium",
            accent ? "text-[var(--cb-accent-muted)]" : "text-[var(--cb-muted)]"
          )}
        >
          {caption}
        </span>
      </div>

      {footer ? (
        <button
          type="button"
          onClick={onFooter}
          className={cn(
            "mt-4 flex w-full items-center justify-between border-t border-dashed pt-3 text-[12.5px] font-semibold transition-opacity hover:opacity-70",
            accent
              ? "border-white/15 text-[var(--cb-accent-ink)]"
              : "border-[var(--cb-line)] text-[var(--cb-ink)]"
          )}
        >
          {footer}
          <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.6} />
        </button>
      ) : null}
    </div>
  );
}

function WorldBars({ progress }) {
  const [mode, setMode] = useState("quests");

  const data = WORLDS.map((world) => {
    const { done, total } = worldProgress(world, progress);
    const stars = world.missions.reduce(
      (sum, mission) => sum + (progress?.missions?.[mission.id]?.stars || 0),
      0
    );
    const ratio = mode === "quests" ? done / total : stars / (total * 3);
    return {
      id: world.id,
      label: `W${world.index}`,
      name: world.name,
      value: mode === "quests" ? `${done}/${total} quests` : `${stars}/${total * 3} stars`,
      ratio: Math.max(0.02, ratio),
    };
  });

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--cb-ink)]">
              Quests by world
            </h2>
            <Info className="h-3.5 w-3.5 text-[var(--cb-muted)] opacity-60" strokeWidth={2} />
            <span className="text-[12.5px] font-medium text-[var(--cb-muted)]">
              {Object.keys(progress?.missions || {}).length} of {TOTAL_MISSIONS} cleared
            </span>
          </div>
        </div>

        <div className="inline-flex shrink-0 rounded-full bg-[var(--cb-seg)] p-1">
          {[
            ["quests", "Quests"],
            ["stars", "Stars"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              aria-pressed={mode === id}
              className={cn(
                "rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition-colors",
                mode === id
                  ? "bg-[var(--cb-card)] text-[var(--cb-ink)] shadow-[0_1px_3px_rgba(0,0,0,0.14)]"
                  : "text-[var(--cb-muted)] hover:text-[var(--cb-ink)]"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-end gap-2 sm:gap-3">
        {data.map((bar, i) => (
          <div key={bar.id} className="group flex min-w-0 flex-1 flex-col items-center gap-2">
            <div className="relative flex h-[168px] w-full items-end justify-center">
              <div
                className="cb-bar relative w-full max-w-[54px] rounded-t-[12px] transition-[filter] duration-300 group-hover:brightness-110"
                title={`${bar.name} — ${bar.value}`}
                style={{
                  height: `${bar.ratio * 100}%`,
                  backgroundColor: bar.ratio >= 0.999 ? "var(--cb-bar)" : "var(--cb-bar-soft)",
                  animationDelay: `${120 + i * 70}ms`,
                }}
              >
                <span className="pointer-events-none absolute inset-x-0 -top-7 text-center text-[11px] font-semibold text-[var(--cb-ink)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {bar.value}
                </span>
              </div>
            </div>
            <span className="truncate text-[11px] font-semibold text-[var(--cb-muted)]">{bar.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-dashed border-[var(--cb-line)] pt-3 text-[11.5px] font-medium text-[var(--cb-muted)]">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--cb-bar)" }} />
        Full world
        <span className="ml-3 h-2 w-2 rounded-full" style={{ backgroundColor: "var(--cb-bar-soft)" }} />
        In progress
      </div>
    </div>
  );
}

function ProfilePage() {
  const {
    ready,
    activeSave,
    progress,
    level,
    importSave,
    toggleSound,
    soundOn,
    deleteSave,
  } = useGame();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const { isDark, toggleTheme } = useTheme();
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    if (ready && !activeSave) navigate({ to: "/" });
  }, [ready, activeSave, navigate]);

  if (!ready || !activeSave) {
    return (
      <div
        className="grid min-h-screen place-items-center"
        style={{ backgroundColor: "var(--cb-bg)", ...palette(isDark) }}
      >
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--cb-muted)]">
          Loading your profile…
        </p>
      </div>
    );
  }

  const missions = progress?.missions || {};
  const completed = Object.keys(missions).length;
  const unlockedAchievements = progress?.achievements || {};
  const unlockedCount = Object.keys(unlockedAchievements).length;
  const masteredWorlds = WORLDS.filter((world) => isWorldMastered(world.id, progress)).length;
  const stars = progress?.stars || 0;
  const coins = progress?.coins || 0;
  const streak = progress?.streak || { count: 0, best: 0 };
  const xp = progress?.xp || 0;

  const initials =
    activeSave.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "OP";

  const joined = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(activeSave.createdAt));

  const handleExport = () => {
    const blob = new Blob([serializeSave(activeSave)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeSave.name.replace(/\s+/g, "-").toLowerCase()}-cquest.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast.success("Backup downloaded");
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const save = importSave(text);
      toast.success(`Loaded ${save.name}`);
      navigate({ to: "/map" });
    } catch (err) {
      toast.error(err?.message || "That file could not be read");
    } finally {
      event.target.value = "";
    }
  };

  const handleDelete = () => {
    if (!window.confirm(`Delete the run "${activeSave.name}"? This can't be undone.`)) return;
    deleteSave(activeSave.id);
    navigate({ to: "/" });
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ ...palette(isDark), backgroundColor: "var(--cb-bg)", fontFamily: "Urbanist, ui-sans-serif, system-ui, sans-serif" }}
    >
      <div
        className="pointer-events-none fixed inset-0"
        style={{ backgroundImage: "var(--cb-glow)" }}
        aria-hidden
      />

      {/* The icon dock: a dark rail that widens to name each destination. */}
      <aside
        aria-label="Quick navigation"
        className="group fixed left-3 top-1/2 z-40 hidden w-[62px] -translate-y-1/2 flex-col gap-1 rounded-[38px] bg-[#121212] px-2.5 py-4 shadow-[0_24px_60px_-18px_rgba(20,40,56,0.45)] transition-[width] duration-300 ease-out hover:w-[196px] lg:flex"
      >
        {DOCK.map((item) => {
          const Icon = item.icon;
          const active = item.to === "/profile";
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-full p-2.5 transition-colors duration-200",
                active ? "bg-white text-[#121212]" : "text-white/65 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="h-[19px] w-[19px] shrink-0" strokeWidth={active ? 2.6 : 2.2} />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[130px] group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}

        <span className="mx-2 my-1.5 h-px bg-white/15" />

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="flex items-center gap-3 rounded-full p-2.5 text-white/65 transition-colors duration-200 hover:bg-white/10 hover:text-white"
        >
          {isDark ? <Sun className="h-[19px] w-[19px] shrink-0" strokeWidth={2.2} /> : <Moon className="h-[19px] w-[19px] shrink-0" strokeWidth={2.2} />}
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[130px] group-hover:opacity-100">
            {isDark ? "Light theme" : "Dark theme"}
          </span>
        </button>
      </aside>

      <div className="relative mx-auto w-full max-w-[1220px] px-4 pb-24 pt-5 sm:px-8 lg:pl-[92px]">
        <header className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#121212] text-[16px] font-bold text-white">
              C
            </span>
            <span className="hidden text-[15.5px] font-semibold tracking-[-0.01em] text-[var(--cb-ink)] sm:inline">
              C//QUEST
            </span>
          </Link>

          <nav className="ml-1 flex items-center rounded-full bg-[var(--cb-card)] p-1 shadow-[var(--cb-shadow)]">
            {[
              { to: "/", label: "Home" },
              { to: "/map", label: "Campaign" },
              { to: "/profile", label: "Profile" },
            ].map((item) => {
              const active = item.to === "/profile";
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 text-[12.5px] font-semibold transition-colors duration-200 sm:px-4 sm:py-2.5 sm:text-[13.5px]",
                    active
                      ? "bg-[#121212] text-white"
                      : "text-[var(--cb-muted)] hover:bg-[var(--cb-seg)] hover:text-[var(--cb-ink)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="grid h-11 w-11 place-items-center rounded-full bg-[var(--cb-card)] text-[var(--cb-ink)] shadow-[var(--cb-shadow)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {isDark ? <Sun className="h-[18px] w-[18px]" strokeWidth={2.2} /> : <Moon className="h-[18px] w-[18px]" strokeWidth={2.2} />}
            </button>
            <span
              className="hidden h-11 w-11 place-items-center rounded-full bg-[var(--cb-seg)] text-[12.5px] font-bold text-[var(--cb-ink)] ring-1 ring-[var(--cb-line)] sm:grid"
              title={activeSave.name}
            >
              {initials}
            </span>
          </div>
        </header>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-[44px] font-semibold leading-[0.95] tracking-[-0.035em] text-[var(--cb-ink)] sm:text-[56px]">
            Profile
          </h1>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-full bg-[var(--cb-card)] px-3.5 py-2.5 text-[12.5px] font-semibold text-[var(--cb-muted)] shadow-[var(--cb-shadow)] sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--cb-bar)] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--cb-bar)]" />
              </span>
              Level {level.level}
            </div>

            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--cb-card)] px-4 py-2.5 text-[13px] font-semibold text-[var(--cb-ink)] shadow-[var(--cb-shadow)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Upload className="h-4 w-4" strokeWidth={2.2} />
              Import
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-full bg-[#121212] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[var(--cb-shadow)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" strokeWidth={2.2} />
              Export
            </button>
            <input ref={fileRef} type="file" accept="application/json,.json" onChange={handleImport} className="hidden" />
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full bg-[var(--cb-seg)] p-1">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                aria-pressed={tab === item.id}
                className={cn(
                  "rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-300",
                  tab === item.id
                    ? "bg-[var(--cb-card)] text-[var(--cb-ink)] shadow-[0_1px_3px_rgba(0,0,0,0.14)]"
                    : "text-[var(--cb-muted)] hover:text-[var(--cb-ink)]"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <p className="flex items-center gap-2 text-[12.5px] font-medium text-[var(--cb-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--cb-muted)]" />
            {activeSave.name} · joined {joined} · saved on this device
          </p>
        </div>

        <div key={tab} className="cb-fade mt-4">
          {tab === "overview" ? (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  accent
                  label="Active streak"
                  value={streak.count || 0}
                  suffix="days"
                  chip={`best ${streak.best || 0}`}
                  caption="in a row"
                  footer="See worlds"
                  onFooter={() => setTab("worlds")}
                  delay={0}
                />
                <StatCard
                  label="Stars"
                  value={stars}
                  chip={`${Math.round((stars / MAX_STARS) * 100)}% of ${MAX_STARS}`}
                  caption="earned from quests"
                  footer="See achievements"
                  onFooter={() => setTab("achievements")}
                  delay={70}
                />
                <StatCard
                  label="Coins"
                  value={coins}
                  chip={`${completed} quests`}
                  caption="banked so far"
                  footer="See worlds"
                  onFooter={() => setTab("worlds")}
                  delay={140}
                />
                <StatCard
                  label="Quests cleared"
                  value={completed}
                  suffix={`/ ${TOTAL_MISSIONS}`}
                  chip={`${Math.round((completed / TOTAL_MISSIONS) * 100)}% complete`}
                  caption={`${masteredWorlds}/${WORLDS.length} worlds mastered`}
                  footer="See achievements"
                  onFooter={() => setTab("achievements")}
                  delay={210}
                />
              </div>

              <div className="grid gap-3 lg:grid-cols-[0.92fr_1.08fr]">
                <section
                  className="cb-rise rounded-[24px] bg-[var(--cb-accent)] p-4 shadow-[var(--cb-shadow)] sm:p-5"
                  style={{ animationDelay: "260ms" }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--cb-accent-ink)]">
                      Campaign mastery
                    </h2>
                    <Info className="h-3.5 w-3.5 text-[var(--cb-accent-muted)]" strokeWidth={2} />
                    <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-[var(--cb-accent-ink)]" style={{ backgroundColor: "var(--cb-accent-chip)" }}>
                      {masteredWorlds} of {WORLDS.length} worlds
                    </span>
                  </div>

                  <div className="mt-2 flex justify-center">
                    <Gauge value={completed} max={TOTAL_MISSIONS} />
                  </div>

                  <p className="mt-2 text-[14px] font-semibold text-[var(--cb-accent-ink)]">
                    {masteredWorlds === WORLDS.length
                      ? "Every world mastered"
                      : completed === TOTAL_MISSIONS
                        ? "Quests done — clear the Mastery Challenges"
                        : "Keep the trail moving"}
                  </p>
                  <p className="mt-1 text-[12.5px] font-medium leading-relaxed text-[var(--cb-accent-muted)]">
                    {completed} of {TOTAL_MISSIONS} quests cleared, {masteredWorlds} of {WORLDS.length} World
                    Mastery Challenges passed. {completed === TOTAL_MISSIONS ? "Only mastery gates remain." : "Skipping a topic still needs a passed skip test."}
                  </p>

                  <Link
                    to="/map"
                    className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--cb-accent-ink)] underline-offset-4 hover:underline"
                  >
                    Open the campaign map
                    <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.6} />
                  </Link>
                </section>

                <section
                  className="cb-rise rounded-[24px] bg-[var(--cb-card)] p-4 shadow-[var(--cb-shadow)] sm:p-5"
                  style={{ animationDelay: "320ms" }}
                >
                  <WorldBars progress={progress} />
                </section>
              </div>

              <div className="grid gap-3 lg:grid-cols-[1.02fr_0.98fr]">
                <SectionCard title="Operator" meta={`Level ${level.level}`} delay={380}>
                  <div className="flex items-center gap-3.5">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-[20px] bg-[var(--cb-seg)] text-[28px] font-semibold leading-none text-[var(--cb-ink)]">
                      {activeSave.glyph}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[var(--cb-ink)]">
                        {activeSave.name}
                      </p>
                      <p className="mt-1 text-[12.5px] font-medium text-[var(--cb-muted)]">
                        {xp} XP · joined {joined}
                      </p>
                    </div>
                    <Link
                      to="/"
                      className="shrink-0 rounded-full bg-[var(--cb-seg)] px-3 py-2 text-[11.5px] font-semibold text-[var(--cb-ink)] transition-colors hover:bg-[var(--cb-line)]"
                    >
                      Switch save
                    </Link>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11.5px] font-semibold">
                      <span className="text-[var(--cb-muted)]">Level {level.level}</span>
                      <span className="text-[var(--cb-chip-ink)]">{level.needed} XP to level {level.level + 1}</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[var(--cb-seg)]">
                      <div
                        className="h-full rounded-full bg-[var(--cb-bar)] transition-[width] duration-1000 ease-out"
                        style={{ width: `${Math.max(level.pct, 3)}%` }}
                      />
                    </div>
                  </div>

                  <dl className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      ["Quests", `${completed}/${TOTAL_MISSIONS}`],
                      ["Mastered", `${masteredWorlds}/${WORLDS.length}`],
                      ["Badges", `${unlockedCount}/${ACHIEVEMENTS.length}`],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl bg-[var(--cb-seg)] px-3 py-2.5">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--cb-muted)]">
                          {label}
                        </dt>
                        <dd className="mt-0.5 text-[14px] font-semibold text-[var(--cb-ink)]">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </SectionCard>

                <SectionCard title="Settings" meta="This device" delay={440}>
                  <div className="divide-y divide-[var(--cb-line)]">
                    <div className="flex items-center justify-between gap-3 py-2.5 first:pt-0">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--cb-seg)] text-[var(--cb-ink)]">
                          {soundOn ? <Volume2 className="h-4 w-4" strokeWidth={2.2} /> : <VolumeX className="h-4 w-4" strokeWidth={2.2} />}
                        </span>
                        <div>
                          <p className="text-[13px] font-semibold text-[var(--cb-ink)]">Sound effects</p>
                          <p className="text-[11.5px] font-medium text-[var(--cb-muted)]">Blips on run and success</p>
                        </div>
                      </div>
                      <Switch checked={soundOn} onChange={toggleSound} label="Sound effects" />
                    </div>

                    <div className="flex items-center justify-between gap-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--cb-seg)] text-[var(--cb-ink)]">
                          {isDark ? <Moon className="h-4 w-4" strokeWidth={2.2} /> : <Sun className="h-4 w-4" strokeWidth={2.2} />}
                        </span>
                        <div>
                          <p className="text-[13px] font-semibold text-[var(--cb-ink)]">Dark theme</p>
                          <p className="text-[11.5px] font-medium text-[var(--cb-muted)]">The house default</p>
                        </div>
                      </div>
                      <Switch checked={isDark} onChange={toggleTheme} label="Dark theme" />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 py-3">
                      <button
                        type="button"
                        onClick={handleExport}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--cb-seg)] px-3 py-2 text-[11.5px] font-semibold text-[var(--cb-ink)] transition-colors hover:bg-[var(--cb-line)]"
                      >
                        <Download className="h-3.5 w-3.5" strokeWidth={2.4} />
                        Export backup
                      </button>
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--cb-seg)] px-3 py-2 text-[11.5px] font-semibold text-[var(--cb-ink)] transition-colors hover:bg-[var(--cb-line)]"
                      >
                        <Upload className="h-3.5 w-3.5" strokeWidth={2.4} />
                        Import save
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[11.5px] font-semibold transition-opacity hover:opacity-75"
                        style={{ color: "var(--cb-danger)" }}
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={2.4} />
                        Delete run
                      </button>
                    </div>
                  </div>

                  <p className="mt-1 text-[11.5px] font-medium leading-relaxed text-[var(--cb-muted)]">
                    Progress lives in this browser only. Export a backup before clearing site data or
                    switching devices.
                  </p>
                </SectionCard>
              </div>
            </div>
          ) : null}

          {tab === "achievements" ? (
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {ACHIEVEMENTS.map((achievement, i) => {
                const Icon = ICONS[achievement.icon] || Trophy;
                const unlocked = Boolean(unlockedAchievements[achievement.id]);
                return (
                  <article
                    key={achievement.id}
                    className={cn(
                      "cb-rise flex items-start gap-3 rounded-[20px] p-3.5 shadow-[var(--cb-shadow)] transition-transform duration-300 hover:-translate-y-0.5",
                      unlocked ? "bg-[var(--cb-card)]" : "bg-[var(--cb-card)] ring-1 ring-[var(--cb-line)]"
                    )}
                    style={{ animationDelay: `${i * 35}ms` }}
                  >
                    <span
                      className={cn(
                        "grid h-10 w-10 shrink-0 place-items-center rounded-2xl",
                        unlocked ? "bg-[var(--cb-chip)] text-[var(--cb-chip-ink)]" : "bg-[var(--cb-seg)] text-[var(--cb-muted)]"
                      )}
                    >
                      {unlocked ? (
                        <Icon className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                      ) : (
                        <Lock className="h-4 w-4" strokeWidth={2.6} />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className={cn("truncate text-[13px] font-semibold", unlocked ? "text-[var(--cb-ink)]" : "text-[var(--cb-muted)]")}>
                          {achievement.name}
                        </p>
                        {unlocked ? (
                          <Check className="h-3.5 w-3.5 shrink-0 text-[var(--cb-chip-ink)]" strokeWidth={3} />
                        ) : null}
                      </div>
                      <p className="mt-0.5 text-[11.5px] font-medium leading-relaxed text-[var(--cb-muted)]">
                        {achievement.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : null}

          {tab === "worlds" ? (
            <div className="space-y-2">
              {WORLDS.map((world, i) => {
                const { done, total, pct } = worldProgress(world, progress);
                const mastered = isWorldMastered(world.id, progress);
                const open = isWorldUnlocked(world.id, progress);
                return (
                  <article
                    key={world.id}
                    className="cb-rise flex items-center gap-3 rounded-[20px] bg-[var(--cb-card)] px-3.5 py-3 shadow-[var(--cb-shadow)] transition-transform duration-300 hover:-translate-y-0.5"
                    style={{ animationDelay: `${i * 55}ms` }}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[var(--cb-seg)] text-[13px] font-semibold text-[var(--cb-ink)]">
                      {world.index}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <p className="truncate text-[14px] font-semibold text-[var(--cb-ink)]">{world.name}</p>
                        {mastered ? (
                          <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-[var(--cb-chip-ink)]" style={{ backgroundColor: "var(--cb-chip)" }}>
                            Mastered
                          </span>
                        ) : null}
                        {!open ? (
                          <span className="rounded-full bg-[var(--cb-seg)] px-2 py-0.5 text-[10px] font-semibold text-[var(--cb-muted)]">
                            Locked
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-0.5 truncate text-[11.5px] font-medium text-[var(--cb-muted)]">
                        {world.subtitle}
                      </p>
                    </div>

                    <div className="hidden h-2 w-24 overflow-hidden rounded-full bg-[var(--cb-seg)] sm:block md:w-36">
                      <div
                        className="h-full rounded-full bg-[var(--cb-bar)] transition-[width] duration-1000 ease-out"
                        style={{ width: `${Math.max(pct, 3)}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right text-[11.5px] font-semibold text-[var(--cb-muted)]">
                      {done}/{total}
                    </span>

                    <Link
                      to="/map"
                      aria-label={`Open ${world.name} on the map`}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--cb-seg)] text-[var(--cb-ink)] transition-colors hover:bg-[var(--cb-line)]"
                    >
                      <ChevronRight className="h-4 w-4" strokeWidth={2.6} />
                    </Link>
                  </article>
                );
              })}

              <p className="pt-2 text-[11.5px] font-medium leading-relaxed text-[var(--cb-muted)]">
                A world's Mastery Challenge must be passed before the next world opens, whether its quests
                were cleared normally or by passing a skip test.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
