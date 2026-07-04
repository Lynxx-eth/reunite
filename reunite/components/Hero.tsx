"use client";

import dynamic from "next/dynamic";

const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-64 w-64 rounded-full bg-blue/10 blur-3xl" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* 3D scene */}
      <div className="absolute inset-0 z-0">
        <GlobeScene />
      </div>

      {/* readability gradient */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-bg via-bg/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-bg to-transparent" />

      {/* copy */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 lg:px-10">
        <div className="max-w-2xl">
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            Live cases · updated worldwide
          </div>

          <h1
            className="animate-fade-up font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="text-gradient">Help bring</span>
            <br />
            them <span className="text-gold">home.</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted"
            style={{ animationDelay: "0.12s" }}
          >
            Reunite is a global network for finding missing children and adults. Search real,
            verified cases, share them in seconds, and turn awareness into action — because every
            share is a chance to bring someone home.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.18s" }}
          >
            <a
              href="#browse"
              className="gold-gradient ring-glow group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-[#1a1204] transition-transform hover:scale-[1.03]"
            >
              Search missing persons
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-ink backdrop-blur transition-colors hover:bg-white/10"
            >
              How it works
            </a>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-muted">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
