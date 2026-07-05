import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Scene3D from "@/components/Scene3D";

export const metadata: Metadata = {
  title: "Safety Guide — Reunite",
  description:
    "What to do in the first 48 hours when someone goes missing, plus prevention tips that can keep loved ones safe.",
};

const steps = [
  {
    time: "Right now",
    title: "Report immediately — don't wait",
    body: "There is no 24-hour rule. Call your local emergency number (911 / 112 / 999) and file a report the moment you believe someone is missing. For a child, also contact the national missing-children hotline.",
  },
  {
    time: "First 30 minutes",
    title: "Search the immediate area",
    body: "Check the home, vehicles, nearby friends' houses, and last-known locations. Note what they were wearing and any devices they have with them.",
  },
  {
    time: "First hour",
    title: "Gather a recent photo & details",
    body: "Have a clear, recent photograph ready, plus height, weight, clothing, medical needs, and identifying marks. Police and the public need this to help.",
  },
  {
    time: "First few hours",
    title: "Preserve digital trails",
    body: "Don't wipe messages or accounts. Location sharing, bank cards, transit passes, and last phone pings can all help investigators.",
  },
  {
    time: "Ongoing",
    title: "Amplify — get the word out",
    body: "Share the official case widely and accurately. Awareness across a community is repeatedly what leads to a safe recovery.",
  },
];

const prevention = [
  {
    title: "Keep an updated ID kit",
    body: "A recent photo, physical description, and even a fingerprint card for children — refreshed every 6 months.",
  },
  {
    title: "Agree on check-ins",
    body: "Set simple routines and a code word so loved ones can signal if they feel unsafe.",
  },
  {
    title: "Use location sharing",
    body: "With consent, shared location among family members can dramatically shorten a search.",
  },
  {
    title: "Teach the basics",
    body: "Kids should know their full name, a parent's phone number, and how to find a trusted adult or police.",
  },
];

export default function GuidePage() {
  return (
    <div className="relative">
      <Navbar />

      {/* hero */}
      <section className="relative min-h-[92svh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Scene3D name="beacon" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-bg via-bg/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-bg to-transparent" />

        <div className="relative z-20 mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-center px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="animate-fade-up font-medium uppercase tracking-[0.2em] text-gold">Take Action</p>
            <h1
              className="animate-fade-up mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "0.05s" }}
            >
              The first <span className="text-gold">48 hours.</span>
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted"
              style={{ animationDelay: "0.12s" }}
            >
              If someone you love goes missing, the moments after matter most. This is a calm, clear
              playbook for what to do — and how to lower the risk before it ever happens.
            </p>
          </div>
        </div>
      </section>

      {/* emergency banner */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-gold/25 bg-gold/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink">
            <span className="font-semibold text-gold">In an emergency,</span> call your local number
            first — 911 (US), 112 (EU), 999 (UK).
          </p>
          <p className="text-sm text-muted">
            US missing children: <span className="text-ink">1-800-843-5678</span> · FBI:{" "}
            <span className="text-ink">1-800-CALL-FBI</span>
          </p>
        </div>
      </section>

      {/* timeline */}
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
        <h2 className="font-display text-3xl font-bold tracking-tight">If someone goes missing</h2>
        <div className="relative mt-10 space-y-8 border-l border-white/10 pl-8">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <span className="absolute -left-[41px] grid h-6 w-6 place-items-center rounded-full gold-gradient text-xs font-bold text-[#1a1204]">
                {i + 1}
              </span>
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-blue">{s.time}</span>
                <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* prevention */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="max-w-2xl">
          <p className="font-medium uppercase tracking-[0.2em] text-cyan">Prevention</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">Small habits, big protection</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {prevention.map((p) => (
            <div key={p.title} className="card-hover rounded-2xl border border-white/10 bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-gold">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" strokeLinejoin="round" />
                  <path d="M9.5 12l1.8 1.8L15 10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-bg2 to-card p-10 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">Help someone already missing.</h3>
            <p className="mt-2 text-muted">Your eyes could be the ones that recognise them.</p>
          </div>
          <a
            href="/#browse"
            className="gold-gradient ring-glow inline-flex shrink-0 items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-[#1a1204] transition-transform hover:scale-[1.03]"
          >
            Browse active cases
          </a>
        </div>
        <p className="mt-6 text-center text-xs text-muted/70">
          This guide is general awareness information, not legal or professional advice. Always follow
          the direction of your local law-enforcement agency.
        </p>
      </section>

      <Footer />
    </div>
  );
}
