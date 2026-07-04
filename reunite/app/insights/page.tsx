import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Scene3D from "@/components/Scene3D";

export const metadata: Metadata = {
  title: "Global Insights — Reunite",
  description:
    "Understand the scale of the missing-persons crisis: who goes missing, how many are found, and why the first hours matter most.",
};

const bigStats = [
  { value: "~8M", label: "Children reported missing worldwide every year (indicative)" },
  { value: "1 in 5", label: "Missing-person cases that involve a child" },
  { value: "88%", label: "Of missing children are recovered — awareness raises the odds" },
  { value: "48h", label: "The window where the chance of a safe recovery is highest" },
];

const whoBreakdown = [
  { label: "Runaways & at-risk youth", pct: 46, color: "bg-blue" },
  { label: "Family / custodial cases", pct: 23, color: "bg-cyan" },
  { label: "Lost, injured or missing adults", pct: 19, color: "bg-gold" },
  { label: "Abductions by non-family", pct: 6, color: "bg-gold2" },
  { label: "Other / unknown", pct: 6, color: "bg-white/30" },
];

const timeWindow = [
  { window: "First 3 hours", odds: 95 },
  { window: "3–24 hours", odds: 82 },
  { window: "1–3 days", odds: 68 },
  { window: "3–7 days", odds: 51 },
  { window: "1+ week", odds: 34 },
];

export default function InsightsPage() {
  return (
    <div className="relative">
      <Navbar />

      {/* hero */}
      <section className="relative min-h-[92svh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Scene3D name="data" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-bg via-bg/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-bg to-transparent" />

        <div className="relative z-20 mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-center px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="animate-fade-up font-medium uppercase tracking-[0.2em] text-blue">The Data</p>
            <h1
              className="animate-fade-up mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "0.05s" }}
            >
              The scale of the <span className="text-gradient">missing.</span>
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted"
              style={{ animationDelay: "0.12s" }}
            >
              Behind every number is a person and a family waiting. These figures show why speed,
              visibility, and everyday people sharing cases matter so much.
            </p>
          </div>
        </div>
      </section>

      {/* big stats */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {bigStats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-card p-6">
              <div className="font-display text-4xl font-bold text-gradient sm:text-5xl">{s.value}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* breakdown + time */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 lg:grid-cols-2 lg:px-10">
        <div className="rounded-3xl border border-white/10 bg-card p-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Who goes missing</h2>
          <p className="mt-2 text-sm text-muted">
            Missing-person cases span every age and situation. Understanding the mix helps direct
            attention where it counts.
          </p>
          <div className="mt-7 space-y-5">
            {whoBreakdown.map((b) => (
              <div key={b.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink">{b.label}</span>
                  <span className="text-muted">{b.pct}%</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/5">
                  <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-card p-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Why the first hours matter</h2>
          <p className="mt-2 text-sm text-muted">
            The likelihood of a safe recovery falls the longer someone is missing. Fast, wide
            awareness is the single biggest lever ordinary people can pull.
          </p>
          <div className="mt-7 space-y-4">
            {timeWindow.map((t) => (
              <div key={t.window} className="flex items-center gap-4">
                <span className="w-28 shrink-0 text-sm text-muted">{t.window}</span>
                <div className="h-6 flex-1 overflow-hidden rounded-lg bg-white/5">
                  <div
                    className="flex h-full items-center justify-end rounded-lg gold-gradient pr-2 text-xs font-semibold text-[#1a1204]"
                    style={{ width: `${t.odds}%` }}
                  >
                    {t.odds}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-bg2 to-card p-10 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              Numbers become names in the search.
            </h3>
            <p className="mt-2 text-muted">Browse real open cases and share one today.</p>
          </div>
          <a
            href="/#browse"
            className="gold-gradient ring-glow inline-flex shrink-0 items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-[#1a1204] transition-transform hover:scale-[1.03]"
          >
            Search cases
          </a>
        </div>
        <p className="mt-6 text-center text-xs text-muted/70">
          Figures are indicative, compiled from public missing-persons awareness sources (e.g. NCMEC,
          FBI, ICMEC) to illustrate scale and trends — not exact real-time counts.
        </p>
      </section>

      <Footer />
    </div>
  );
}
