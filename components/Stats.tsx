const stats = [
  { value: "8M+", label: "People reported missing every year, worldwide" },
  { value: "40%", label: "Of missing-person cases involve children" },
  { value: "72h", label: "The critical window where every share matters most" },
  { value: "1", label: "Share can be the reason someone comes home" },
];

export default function Stats() {
  return (
    <section id="stats" className="relative scroll-mt-24 border-y border-white/5 bg-bg2/40 py-20">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 lg:grid-cols-4 lg:px-10">
        {stats.map((s) => (
          <div key={s.label} className="text-center lg:text-left">
            <div className="font-display text-5xl font-bold text-gradient sm:text-6xl">{s.value}</div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
