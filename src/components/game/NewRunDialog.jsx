import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const GLYPHS = ["✦", "◆", "▲", "●", "⬢", "✧"];

export default function NewRunDialog({ open, onOpenChange, onCreate }) {
  const [name, setName] = useState("");
  const [glyph, setGlyph] = useState(GLYPHS[0]);

  const submit = () => {
    const clean = name.trim() || "Operator";
    onCreate(clean, glyph);
    setName("");
    setGlyph(GLYPHS[0]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-[28px] border-2 border-frame bg-card p-6 shadow-[0_8px_0_hsl(var(--frame))]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold tracking-tight text-ink">Start a new adventure</DialogTitle>
          <DialogDescription className="text-[13px] font-semibold text-ink-soft">
            Your progress is saved on this device only. Nothing leaves your browser.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div className="space-y-2">
            <label htmlFor="runner-name" className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">
              Your name
            </label>
            <Input
              id="runner-name"
              value={name}
              maxLength={18}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="e.g. Nova"
              className="h-12 rounded-2xl border-2 border-frame bg-tile px-4 text-base font-bold text-ink placeholder:font-semibold placeholder:text-ink-faint focus-visible:border-brand focus-visible:ring-0"
            />
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">Pick your badge</p>
            <div className="flex flex-wrap gap-2">
              {GLYPHS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGlyph(g)}
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-2xl border-2 text-xl transition-all",
                    glyph === g
                      ? "border-brand bg-brand-tint text-brand-ink shadow-[0_3px_0_#C6E9A8]"
                      : "border-frame bg-card text-ink-faint hover:border-frame hover:text-ink"
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={submit}
            className="btn-game flex h-12 w-full items-center justify-center gap-2 text-[15px]"
          >
            <Plus className="h-5 w-5" strokeWidth={3} />
            Begin adventure
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}