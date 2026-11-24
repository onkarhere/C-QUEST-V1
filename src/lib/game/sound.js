let ctx = null;
let enabled = true;

export function setSoundEnabled(value) {
  enabled = Boolean(value);
}

function audio() {
  if (!enabled || typeof window === "undefined") return null;
  try {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    if (!ctx) ctx = new Ctor();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone({ freq = 440, dur = 0.12, type = "sine", gain = 0.05, delay = 0, slideTo = null }) {
  const ac = audio();
  if (!ac) return;
  const t0 = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  amp.gain.setValueAtTime(0.0001, t0);
  amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(amp).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

export const sfx = {
  hover() {
    tone({ freq: 620, dur: 0.04, type: "triangle", gain: 0.012 });
  },
  click() {
    tone({ freq: 340, dur: 0.06, type: "triangle", gain: 0.03, slideTo: 460 });
  },
  run() {
    tone({ freq: 300, dur: 0.07, type: "square", gain: 0.02 });
    tone({ freq: 520, dur: 0.09, type: "triangle", gain: 0.022, delay: 0.06 });
  },
  success() {
    [523, 659, 784, 1047].forEach((f, i) => {
      tone({ freq: f, dur: 0.16, type: "triangle", gain: 0.035, delay: i * 0.07 });
    });
  },
  fail() {
    tone({ freq: 220, dur: 0.18, type: "sine", gain: 0.035, slideTo: 160 });
  },
  star() {
    tone({ freq: 880, dur: 0.1, type: "triangle", gain: 0.03, slideTo: 1320 });
  },
  unlock() {
    [392, 523, 784].forEach((f, i) => {
      tone({ freq: f, dur: 0.2, type: "sine", gain: 0.03, delay: i * 0.08 });
    });
  },
};