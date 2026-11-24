import { Lock } from "lucide-react";

export default function MapSign({ x, y, text }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-[6] -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="anim-sway origin-bottom" style={{ "--tilt": "-2deg" }}>
        <div className="flex items-center gap-2 rounded-[14px] border-[3px] border-[#8C6136] bg-[#C08F5C] px-3 py-2 shadow-[0_6px_0_#8C6136,inset_0_2px_0_rgba(255,243,220,0.35)]">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E8D2AE] text-[#8C6136] shadow-[inset_0_-2px_0_rgba(140,97,54,0.35)]">
            <Lock className="h-4 w-4" strokeWidth={3.2} />
          </span>
          <span className="max-w-[122px] text-left text-[10.5px] font-extrabold leading-[1.25] text-[#FFF8E9] [text-shadow:0_1px_0_rgba(120,80,40,0.5)]">
            {text}
          </span>
        </div>
        <div className="mx-auto h-8 w-2.5 rounded-b-[3px] bg-[#9E7042] shadow-[2px_0_0_#7C5330]" />
      </div>
    </div>
  );
}
