import { Plus, Sparkles } from "lucide-react";
import SaveCard from "@/components/game/SaveCard";

export default function SaveSlots({ saves, activeId, onSelect, onNewRun, onDelete }) {
  return (
    <section id="slots" className="relative">
      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-ink">Your adventures</p>
          <h2 className="mt-0.5 text-xl font-extrabold text-ink">Pick up a save</h2>
        </div>
        <span className="rounded-full bg-card px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-ink-soft shadow-[0_2px_0_hsl(var(--frame))]">
          {saves.length} / 6
        </span>
      </div>

      <div className="rounded-[28px] border-2 border-frame bg-card p-3.5 shadow-[0_4px_0_hsl(var(--frame))] sm:p-4">
        <div className="space-y-2.5">
          {saves.map((save) => (
            <SaveCard
              key={save.id}
              save={save}
              active={save.id === activeId}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))}

          <button
            type="button"
            onClick={onNewRun}
            className="group flex w-full items-center gap-3.5 rounded-[22px] border-2 border-dashed border-frame px-3.5 py-3.5 text-left transition-all duration-200 hover:border-brand hover:bg-brand/10"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-2 border-dashed border-frame text-brand-ink transition group-hover:border-brand group-hover:text-[#58CC02]">
              <Plus className="h-6 w-6" strokeWidth={3} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-extrabold text-ink">New adventure</span>
              <span className="mt-0.5 block text-[11.5px] font-semibold text-ink-soft">
                Start at World 1 · no setup needed
              </span>
            </span>
          </button>
        </div>

        <p className="mt-3.5 flex items-center gap-2 border-t-2 border-frame pt-3.5 text-[11px] font-semibold leading-relaxed text-ink-soft">
          <Sparkles className="h-4 w-4 shrink-0 text-[#FFD900]" fill="currentColor" strokeWidth={0} />
          Saves live in this browser. Export a backup from your profile any time.
        </p>
      </div>
    </section>
  );
}