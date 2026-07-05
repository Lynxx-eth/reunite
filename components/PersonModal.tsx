"use client";

import { useEffect, useState } from "react";
import type { MissingPerson } from "@/lib/types";

function titleCase(name: string) {
  return name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

function cleanDetails(html: string) {
  // strip script/style just in case (source is fbi.gov, but be safe)
  return html.replace(/<\/?(script|style)[^>]*>/gi, "");
}

function Attr({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
      <div className="text-[11px] uppercase tracking-wide text-muted">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-ink">{titleCase(value)}</div>
    </div>
  );
}

export default function PersonModal({
  person,
  onClose,
}: {
  person: MissingPerson | null;
  onClose: () => void;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [person]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (person) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [person, onClose]);

  if (!person) return null;

  const shareText = `MISSING: ${titleCase(person.title)}. Please help find them via Reunite.`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="animate-fade-up relative w-full max-w-3xl overflow-hidden rounded-t-3xl border border-white/10 bg-card shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/40 text-ink backdrop-blur transition-colors hover:bg-black/70"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid gap-0 sm:grid-cols-[minmax(0,240px)_1fr]">
          {/* photo */}
          <div className="relative aspect-[4/5] w-full bg-bg2 sm:aspect-auto">
            {person.photo && !failed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={person.photo}
                alt={person.title}
                onError={() => setFailed(true)}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full min-h-[280px] w-full items-center justify-center bg-gradient-to-br from-bg2 to-card font-display text-5xl font-bold text-white/20">
                {person.title.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          {/* info */}
          <div className="max-h-[70vh] overflow-y-auto p-6">
            <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[11px] font-medium text-gold">
              {person.subjects?.[0] ?? "Missing Person"}
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
              {titleCase(person.title)}
            </h2>
            {person.location && (
              <p className="mt-1 text-sm text-muted">{person.location.replace(/\r?\n/g, " · ")}</p>
            )}

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              <Attr label="Sex" value={person.sex} />
              <Attr label="Race" value={person.race} />
              <Attr label="Hair" value={person.hair} />
              <Attr label="Eyes" value={person.eyes} />
              <Attr label="Weight" value={person.weight} />
              <Attr label="Age range" value={person.ageRange} />
            </div>

            {person.datesOfBirth?.length ? (
              <p className="mt-3 text-sm text-muted">
                <span className="text-ink">Date(s) of birth used:</span>{" "}
                {person.datesOfBirth.join(", ")}
              </p>
            ) : null}

            {person.reward && (
              <div className="mt-4 rounded-xl border border-gold/25 bg-gold/[0.06] px-4 py-3 text-sm text-gold">
                {person.reward.replace(/<[^>]+>/g, "")}
              </div>
            )}

            {person.details && (
              <div
                className="prose-invert mt-4 space-y-3 text-sm leading-relaxed text-muted [&_a]:text-blue [&_p]:mb-2"
                dangerouslySetInnerHTML={{ __html: cleanDetails(person.details) }}
              />
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {person.url && (
                <a
                  href={person.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[#1a1204]"
                >
                  View official case
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: titleCase(person.title), text: shareText, url: person.url ?? undefined });
                  } else {
                    navigator.clipboard?.writeText(`${shareText} ${person.url ?? ""}`.trim());
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white/10"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                </svg>
                Share
              </button>
            </div>

            <p className="mt-5 text-xs text-muted/70">
              Data provided by the FBI. If you have information, contact your local authorities or the
              FBI at 1-800-CALL-FBI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
