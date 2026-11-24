import { WORLDS, MISSIONS, missionById } from "@/lib/game/curriculum";

const BOSS_IDS = MISSIONS.filter((m) => m.boss).map((m) => m.id);

export const ACHIEVEMENTS = [
  {
    id: "first_light",
    name: "First Light",
    description: "Complete your first mission",
    icon: "Sparkles",
    test: (p) => Object.keys(p.missions).length >= 1,
  },
  {
    id: "momentum",
    name: "Momentum",
    description: "Complete 5 missions",
    icon: "Zap",
    test: (p) => Object.keys(p.missions).length >= 5,
  },
  {
    id: "operator",
    name: "Operator",
    description: "Complete 12 missions",
    icon: "CircuitBoard",
    test: (p) => Object.keys(p.missions).length >= 12,
  },
  {
    id: "flawless",
    name: "Flawless Five",
    description: "Earn 3 stars on five missions",
    icon: "Star",
    test: (p) => Object.values(p.missions).filter((m) => m.stars >= 3).length >= 5,
  },
  {
    id: "boss_down",
    name: "Boss Down",
    description: "Clear a world boss",
    icon: "Skull",
    test: (p) => BOSS_IDS.some((id) => p.missions[id]),
  },
  {
    id: "zone_clear",
    name: "Zone Clear",
    description: "Clear every mission in a world",
    icon: "Map",
    test: (p) => WORLDS.some((w) => w.missions.every((m) => p.missions[m.id])),
  },
  {
    id: "perfect_world",
    name: "Perfect Zone",
    description: "Earn 3 stars on every mission in one world",
    icon: "Crown",
    test: (p) => WORLDS.some((w) => w.missions.every((m) => (p.missions[m.id]?.stars || 0) >= 3)),
  },
  {
    id: "streak_3",
    name: "Warm Circuit",
    description: "Play 3 days in a row",
    icon: "Flame",
    test: (p) => (p.streak?.best || 0) >= 3,
  },
  {
    id: "streak_7",
    name: "Locked In",
    description: "Play 7 days in a row",
    icon: "Flame",
    test: (p) => (p.streak?.best || 0) >= 7,
  },
  {
    id: "pointer_adept",
    name: "Pointer Adept",
    description: "Complete a pointer mission",
    icon: "ArrowLeftRight",
    test: (p) => Object.keys(p.missions).some((id) => missionById(id)?.world === "w6"),
  },
  {
    id: "proven",
    name: "Already Knew It",
    description: "Pass a topic skip test",
    icon: "Zap",
    test: (p) => Object.keys(p.mastery || {}).some((id) => id.startsWith("topic-")),
  },
  {
    id: "world_scholar",
    name: "World Scholar",
    description: "Clear a World Mastery Challenge",
    icon: "Crown",
    test: (p) => Object.keys(p.mastery || {}).some((id) => id.startsWith("world-")),
  },
  {
    id: "mastery_complete",
    name: "Master of C",
    description: "Pass all six World Mastery Challenges",
    icon: "Trophy",
    test: (p) => WORLDS.every((w) => p.mastery?.[`world-${w.id}`]),
  },
  {
    id: "completionist",
    name: "Systems Complete",
    description: "Complete all 30 missions",
    icon: "Trophy",
    test: (p) => Object.keys(p.missions).length >= 30,
  },
];

export function evaluateAchievements(progress, existing = {}) {
  const unlocked = { ...existing };
  const newly = [];
  for (const achievement of ACHIEVEMENTS) {
    if (!unlocked[achievement.id] && achievement.test(progress)) {
      unlocked[achievement.id] = new Date().toISOString();
      newly.push(achievement);
    }
  }
  return { unlocked, newly };
}

export function applyCompletion(save, missionId, payload) {
  const progress = save.progress || {};
  const previous = progress.missions?.[missionId];
  const stars = Math.max(previous?.stars || 0, payload.stars || 0);
  const starDelta = Math.max(0, stars - (previous?.stars || 0));

  const nextProgress = {
    ...progress,
    xp: (progress.xp || 0) + (payload.xp || 0),
    coins: (progress.coins || 0) + (payload.coins || 0),
    stars: (progress.stars || 0) + starDelta,
    missions: {
      ...(progress.missions || {}),
      [missionId]: {
        stars,
        attempts: payload.attempts || 1,
        hints: payload.hints || 0,
        completedAt: new Date().toISOString(),
      },
    },
    streak: require_streak(progress.streak),
  };

  const { unlocked, newly } = evaluateAchievements(nextProgress, progress.achievements || {});
  nextProgress.achievements = unlocked;

  return {
    save: { ...save, progress: nextProgress, updatedAt: new Date().toISOString() },
    newly,
  };
}

// Kept local to avoid a circular import with storage.js helpers.
function require_streak(streak) {
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, "0")}-${String(y.getDate()).padStart(2, "0")}`;
  const current = streak || { count: 0, best: 0, last: null };
  if (current.last === today) return current;
  const count = current.last === yesterday ? (current.count || 0) + 1 : 1;
  return { count, best: Math.max(current.best || 0, count), last: today };
}