import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export const THEME_STORAGE_KEY = "cquest.theme";

export const DEFAULT_THEME = "dark";

// Dark is the house theme: with no saved choice the site is dark, whatever the
// operating system prefers. Kept in sync with the inline script in __root.jsx so
// the first paint is already the right theme.
function resolve(choice) {
  if (choice === "dark" || choice === "light") return choice;
  return DEFAULT_THEME;
}

export function ThemeProvider({ children }) {
  // Read the saved choice during the first client render: the inline script in
  // __root.jsx already painted the right theme, so state must agree with it.
  const [choice, setChoice] = useState(() => {
    if (typeof window === "undefined") return "system";
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "dark" || stored === "light") return stored;
    } catch {
      // Storage can be blocked; the house theme still applies.
    }
    return "system";
  });
  const [resolved, setResolved] = useState(DEFAULT_THEME);

  useEffect(() => {
    const next = resolve(choice);
    setResolved(next);
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
  }, [choice]);

  const setTheme = useCallback((next) => {
    setChoice(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Without storage the choice lasts for this visit.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setChoice((prev) => {
      const next = resolve(prev) === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Ignore blocked storage.
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme: choice, resolved, isDark: resolved === "dark", setTheme, toggleTheme }),
    [choice, resolved, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
