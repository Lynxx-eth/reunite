"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const MiniScene = dynamic(() => import("./three/MiniScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const cards = [
  {
    href: "/insights",
    variant: "bars" as const,
    tag: "The Data",
    title: "Global Insights",
    body: "Explore the scale of the crisis through living 3D data — who goes missing, and why the clock matters.",
    accent: "from-blue/20",
  },
  {
    href: "/guide",
    variant: "beacon" as const,
    tag: "Take Action",
    title: "Safety Guide",
    body: "The first 48 hours are critical. A clear, calm playbook for what to do the moment someone goes missing.",
    accent: "from-gold/20",
  },
  {
    href: "/stories",
    variant: "network" as const,
    tag: "Hope",
    title: "Stories of Reunion",
    body: "Every dot is a person, every line a connection. See how awareness turns strangers into someone's way home.",
    accent: "from-cyan/20",
  },
];

export default function ExploreSection() {
  return (
    <section id="explore" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 lg:px-10">
      <div className="max-w-2xl">
        <p className="font-medium uppercase tracking-[0.2em] text-cyan">Explore Reunite</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Three ways to make a difference
        </h2>
        <p className="mt-4 text-muted">
          Beyond the search, dive deeper — understand the data, learn what to do, and see what hope
          looks like.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="card-hover group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card"
          >
            {/* 3D preview */}
            <div className="relative h-52 w-full overflow-hidden">
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${c.accent} to-transparent`} />
              <MiniScene variant={c.variant} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-gold">{c.tag}</span>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{c.body}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue">
                Explore
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
