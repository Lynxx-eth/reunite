export default function GetInvolved() {
  return (
    <section id="act" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 lg:px-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-bg2 to-card p-10 sm:p-16">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="animate-floaty pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-blue/20 blur-3xl" />

        <div className="relative max-w-2xl">
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Someone is looking for them.
            <br />
            <span className="text-gold">Be the reason they&apos;re found.</span>
          </h2>
          <p className="mt-5 text-lg text-muted">
            Whether you share a single case or check in every day, you become part of a global
            network of people who refuse to look away.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#browse"
              className="gold-gradient ring-glow inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-[#1a1204] transition-transform hover:scale-[1.03]"
            >
              Start searching
            </a>
            <a
              href="https://www.fbi.gov/wanted/kidnap"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-ink backdrop-blur transition-colors hover:bg-white/10"
            >
              Report a missing person
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <p className="mt-8 text-sm text-muted">
            In immediate danger or you&apos;ve found someone? Call your local emergency number or the
            FBI at <span className="text-ink">1-800-CALL-FBI</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
