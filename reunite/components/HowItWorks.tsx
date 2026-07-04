const steps = [
  {
    title: "Search verified cases",
    body: "Browse a live database of real, open missing-person cases — children and adults — sourced directly from official records.",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Recognise & report",
    body: "Seen someone? Every profile links to the official case and a direct line to authorities so tips reach the right people fast.",
    icon: (
      <>
        <path d="M12 21s-7-4.35-7-10a7 7 0 0114 0c0 5.65-7 10-7 10z" strokeLinejoin="round" />
        <circle cx="12" cy="11" r="2.5" />
      </>
    ),
  },
  {
    title: "Share in seconds",
    body: "One tap shares a case to your network. Awareness is the single biggest factor in bringing a missing person home safely.",
    icon: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
      </>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 lg:px-10">
      <div className="max-w-2xl">
        <p className="font-medium uppercase tracking-[0.2em] text-gold">How it works</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Three steps to make a difference
        </h2>
        <p className="mt-4 text-muted">
          You don&apos;t need to be an investigator. You just need to look, and to share.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="card-hover group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-7"
          >
            <div className="absolute -right-6 -top-8 font-display text-[7rem] font-bold leading-none text-white/[0.03]">
              {i + 1}
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-gold">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {s.icon}
              </svg>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
