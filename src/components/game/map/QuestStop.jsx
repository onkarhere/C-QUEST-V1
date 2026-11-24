import { Check, ChevronDown, Crown, Lock, Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const LABEL =
  "mt-1 w-full rounded-[10px] border-2 px-1 py-[3px] text-center sm:mt-1.5 sm:rounded-[11px] sm:px-1.5 sm:py-1 shadow-[0_4px_10px_rgba(38,50,25,0.28)]";

export default function QuestStop({ mission, number, state, stars = 0, onOpen }) {
  const boss = Boolean(mission.boss);
  const title = mission.title.replace(/^BOSS:\s*/, "");
  const locked = state === "locked";
  const current = state === "current";
  const done = state === "done";

  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={locked}
      aria-label={`${mission.title}${locked ? " (locked)" : ""}`}
      className={cn(
        "group isolate absolute z-10 flex w-[96px] -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-[filter,transform] duration-200 sm:w-[124px]",
        locked ? "cursor-not-allowed" : "hover:-translate-y-[calc(50%+4px)]"
      )}
    >
      {current && (
        <>
          <span
            aria-hidden
            className="anim-rays pointer-events-none absolute left-1/2 top-[26px] -z-10 h-[116px] w-[116px] sm:top-[32px] sm:h-[152px] sm:w-[152px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(255,246,170,0.85)_0deg,rgba(255,255,255,0)_14deg,rgba(255,244,150,0.8)_28deg,rgba(255,255,255,0)_42deg,rgba(255,249,190,0.9)_58deg,rgba(255,255,255,0)_72deg,rgba(255,244,150,0.75)_88deg,rgba(255,255,255,0)_104deg)] opacity-90 blur-[1px]"
          />
          <span className="anim-bob absolute -top-5 z-20 rounded-full border-2 border-[#E7B900] bg-[#FFD52E] px-2 py-[1px] text-[7.5px] font-extrabold uppercase tracking-[0.1em] sm:px-2.5 sm:py-[2px] sm:text-[9px] text-[#7A5B00] shadow-[0_2px_0_#DCB000]">
            Current
          </span>
        </>
      )}

      <span className={cn("relative grid place-items-center", current && "anim-bob")}>
        {!locked && (
          <span
            aria-hidden
            className={cn(
              "absolute -bottom-0.5 h-3 rounded-full blur-[3px]",
              boss ? "w-[74px] bg-[#6A3FA8]/45" : "w-[78%] bg-[#3E4A2C]/35"
            )}
          />
        )}

        {boss ? (
          <span
            className={cn(
              "relative grid h-[46px] w-[46px] place-items-center rounded-full border-[3px] border-[#C9A6F2] bg-gradient-to-b from-[#9A5BE8] to-[#6D35C0] text-white shadow-[0_0_16px_rgba(150,90,240,0.6),0_5px_0_#5C2BA6] sm:h-[60px] sm:w-[60px] sm:border-[4px]",
              locked && "border-[#D3C4E8] opacity-90 saturate-[0.55]"
            )}
          >
            <Crown className="h-5 w-5 sm:h-7 sm:w-7" fill="currentColor" strokeWidth={0} />
            {locked && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-[#9C9387] text-white sm:h-6 sm:w-6">
                <Lock className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={3.5} />
              </span>
            )}
          </span>
        ) : locked ? (
          <span className="relative grid h-[44px] w-[44px] place-items-center rounded-full border-[4px] border-[#DCD6C8] bg-[#8E887C] shadow-[0_5px_0_#6F6A5F] sm:h-[56px] sm:w-[56px]">
            <span className="grid h-[29px] w-[29px] place-items-center rounded-full border-2 border-[#726C60] bg-[#A7A195] text-[#E9E4D8] sm:h-[38px] sm:w-[38px]">
              <Lock className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={3.5} />
            </span>
          </span>
        ) : (
          <span
            className={cn(
              "relative grid place-items-center rounded-full border-[4px] border-[#B8E88A] bg-[#58CC02] text-white shadow-[0_5px_0_#3E9202]",
              current
                ? "h-[54px] w-[54px] shadow-[0_0_20px_rgba(88,204,2,0.55),0_6px_0_#3E9202] sm:h-[74px] sm:w-[74px]"
                : "h-[44px] w-[44px] sm:h-[56px] sm:w-[56px]"
            )}
          >
            {done ? (
              <Check className={current ? "h-7 w-7 sm:h-9 sm:w-9" : "h-5 w-5 sm:h-7 sm:w-7"} strokeWidth={4} />
            ) : (
              <Play className={cn("ml-0.5", current ? "h-6 w-6 sm:h-8 sm:w-8" : "h-4 w-4 sm:h-5 sm:w-5")} fill="currentColor" strokeWidth={0} />
            )}
          </span>
        )}
      </span>

      <span
        className={cn(
          LABEL,
          current
            ? "border-[#FFD75E] bg-[#FFF8DC]"
            : locked
              ? "border-[#E2D8C2] bg-[#FFFBF2]"
              : "border-[#EAD9B4] bg-[#FFF9EC]"
        )}
      >
        <span
          className={cn(
            "block text-[7px] font-extrabold uppercase tracking-[0.1em] sm:text-[8px] sm:tracking-[0.12em]",
            boss ? "text-[#8A4FD0]" : locked ? "text-[#B3A489]" : "text-[#A9855C]"
          )}
        >
          {boss ? "Boss quest" : `Quest ${number}`}
        </span>
        <span className="mt-px block text-[9px] font-extrabold leading-tight text-[#4A3820] sm:text-[11px]">
          {title}
        </span>
      </span>

      {stars > 0 && (
        <span className="mt-0.5 hidden gap-0.5 sm:flex">
          {[1, 2, 3].map((n) => (
            <Star
              key={n}
              className={cn("h-2.5 w-2.5", n <= stars ? "text-[#FFD900]" : "text-white/60")}
              fill="currentColor"
              strokeWidth={0}
            />
          ))}
        </span>
      )}

      {current && (
        <ChevronDown className="absolute -bottom-5 left-1/2 h-4 w-4 -translate-x-1/2 text-[#FFD24A] drop-shadow-[0_2px_0_rgba(120,80,0,0.4)]" strokeWidth={4} />
      )}
    </button>
  );
}
