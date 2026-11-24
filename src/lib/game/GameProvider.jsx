import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  loadStore,
  persistStore,
  newSave,
  parseImportedSave,
  levelProgress,
} from "@/lib/game/storage";
import { applyCompletion } from "@/lib/game/achievements";
import { applyMastery } from "@/lib/game/mastery";
import { setSoundEnabled } from "@/lib/game/sound";

const GameContext = createContext(null);

const EMPTY = { saves: [], activeId: null, settings: { sound: true } };

export function GameProvider({ children }) {
  const [store, setStore] = useState(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loaded = loadStore();
    setStore(loaded);
    setSoundEnabled(loaded.settings?.sound !== false);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) persistStore(store);
  }, [store, ready]);

  const activeSave = useMemo(
    () => store.saves.find((s) => s.id === store.activeId) || null,
    [store.saves, store.activeId]
  );

  const createSave = useCallback((name, glyph) => {
    const save = newSave(name, glyph);
    setStore((prev) => ({ ...prev, saves: [save, ...prev.saves], activeId: save.id }));
    return save;
  }, []);

  const selectSave = useCallback((id) => {
    setStore((prev) => ({ ...prev, activeId: id }));
  }, []);

  const deleteSave = useCallback((id) => {
    setStore((prev) => {
      const saves = prev.saves.filter((s) => s.id !== id);
      return { ...prev, saves, activeId: prev.activeId === id ? saves[0]?.id || null : prev.activeId };
    });
  }, []);

  const completeMission = useCallback(
    (missionId, payload) => {
      if (!activeSave) return { newly: [] };
      const { save, newly } = applyCompletion(activeSave, missionId, payload);
      setStore((prev) => ({ ...prev, saves: prev.saves.map((s) => (s.id === save.id ? save : s)) }));
      return { newly };
    },
    [activeSave]
  );

  const completeMastery = useCallback(
    (challenge, payload) => {
      if (!activeSave) return { newly: [], already: true };
      const result = applyMastery(activeSave, challenge, payload);
      if (!result.already) {
        setStore((prev) => ({
          ...prev,
          saves: prev.saves.map((s) => (s.id === result.save.id ? result.save : s)),
        }));
      }
      return result;
    },
    [activeSave]
  );

  const importSave = useCallback((text) => {
    const save = parseImportedSave(text);
    setStore((prev) => ({ ...prev, saves: [save, ...prev.saves], activeId: save.id }));
    return save;
  }, []);

  const toggleSound = useCallback(() => {
    setStore((prev) => {
      const sound = !(prev.settings?.sound !== false);
      setSoundEnabled(sound);
      return { ...prev, settings: { ...prev.settings, sound } };
    });
  }, []);

  const value = useMemo(
    () => ({
      ready,
      saves: store.saves,
      activeSave,
      activeId: store.activeId,
      soundOn: store.settings?.sound !== false,
      progress: activeSave?.progress || null,
      level: levelProgress(activeSave?.progress?.xp || 0),
      createSave,
      selectSave,
      deleteSave,
      completeMission,
      completeMastery,
      importSave,
      toggleSound,
    }),
    [
      ready,
      store.saves,
      activeSave,
      store.activeId,
      store.settings,
      createSave,
      selectSave,
      deleteSave,
      completeMission,
      completeMastery,
      importSave,
      toggleSound,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}