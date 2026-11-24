export default function AmbientBackground({ variant = "green" }) {
  const primary =
    variant === "violet" ? "rgba(206,130,255,0.20)" : "rgba(88,204,2,0.18)";
  const secondary =
    variant === "violet" ? "rgba(28,176,246,0.14)" : "rgba(255,217,0,0.18)";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 dots opacity-60" />
      <div
        className="anim-float absolute -left-24 top-8 h-72 w-72 rounded-full blur-3xl"
        style={{ background: primary }}
      />
      <div
        className="anim-drift absolute -right-28 top-1/4 h-80 w-80 rounded-full blur-3xl"
        style={{ background: secondary }}
      />
      <div
        className="anim-float absolute bottom-0 left-1/3 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "rgba(28,176,246,0.13)" }}
      />
    </div>
  );
}