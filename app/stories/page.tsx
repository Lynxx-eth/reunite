import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Scene3D from "@/components/Scene3D";

export const metadata: Metadata = {
  title: "Stories of Hope — Reunite",
  description:
    "Awareness works. Illustrative stories of how a shared photo, a watchful neighbour, or a single tip can bring someone home.",
};

const stories = [
  {
    name: "A daughter, home in 3 days",
    tag: "Community share",
    body: "A teenager who ran away was recognised at a bus station after her photo spread through a local community group. A stranger made one call — she was reunited with her family within 72 hours.",
  },
  {
    name: "The neighbour who looked twice",
    tag: "Watchful eyes",
    body: "An elderly man with dementia wandered miles from home. A neighbour who'd seen the alert recognised him at a petrol station and stayed with him until help arrived.",
  },
  {
    name: "Found through a single post",
    tag: "One share",
    body: "A missing father was located when a shared post reached someone two cities away who had seen him that morning. Awareness closed a gap that time alone never could.",
  },
];

const voices = [
  {
    quote:
      "We didn't have money or connections. What we had was people willing to share. That's what brought her back.",
    who: "— A parent, on their child's safe return",
  },
  {
    quote: "One tip. One person paying attention. That's all it takes to change everything.",
    who: "— A search volunteer",
  },
];

export default function StoriesPage() {
  return (
    <div className="relative">
      <Navbar />

      {/* hero */}
      <section className="relative min-h-[92svh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Scene3D name="constellation" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-bg via-bg/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-bg to-transparent" />

        <div className="relative z-20 mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-center px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="animate-fade-up font-medium uppercase tracking-[0.2em] text-cyan">Hope</p>
            <h1
              className="animate-fade-up mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "0.05s" }}
            >
              Every share is a <span className="text-gradient">line home.</span>
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted"
              style={{ animationDelay: "0.12s" }}
            >
              People find people. Each point in this constellation is someone paying attention — and
              every connection between them is how a missing person finds their way back.
            </p>
          </div>
        </div>
      </section>

      {/* stories */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight">When awareness works</h2>
          <p className="mt-3 text-muted">
            The kind of outcomes that everyday sharing makes possible.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {stories.map((s) => (
            <div key={s.name} className="card-hover flex flex-col rounded-2xl border border-white/10 bg-card p-7">
              <span className="w-fit rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-[11px] font-medium text-cyan">
                {s.tag}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{s.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* voices */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="grid gap-5 md:grid-cols-2">
          {voices.map((v) => (
            <figure
              key={v.who}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-bg2 to-card p-9"
            >
              <span className="absolute right-6 top-2 font-display text-8xl font-bold leading-none text-white/[0.04]">
                &rdquo;
              </span>
              <blockquote className="relative font-display text-xl font-medium leading-relaxed text-ink">
                {v.quote}
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted">{v.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card p-10 text-center sm:p-16">
          <div className="animate-floaty pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <h3 className="relative mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Add yourself to the constellation.
          </h3>
          <p className="relative mx-auto mt-4 max-w-xl text-muted">
            You don&apos;t need to search alone or do anything heroic. Look, and share. That&apos;s
            how someone gets found.
          </p>
          <a
            href="/#browse"
            className="gold-gradient ring-glow relative mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-[#1a1204] transition-transform hover:scale-[1.03]"
          >
            Start with one case
          </a>
        </div>
        <p className="mt-6 text-center text-xs text-muted/70">
          Stories on this page are illustrative composites created for awareness. They represent the
          real ways community attention helps — not specific identifiable individuals.
        </p>
      </section>

      <Footer />
    </div>
  );
}
