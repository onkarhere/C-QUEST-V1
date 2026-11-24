import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme/ThemeProvider";

export default function ThemeToggle({ className }) {
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-10 w-10 shrink-0 place-items-center rounded-[15px] border-2 border-frame bg-card text-ink-soft transition-colors hover:bg-hover hover:text-ink",
        className
      )}
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px]" strokeWidth={2.6} />
      ) : (
        <Moon className="h-[18px] w-[18px]" strokeWidth={2.6} />
      )}
    </button>
  );
}
