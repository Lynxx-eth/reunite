"use client";

import { useState } from "react";
import type { MissingPerson } from "@/lib/types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function PersonCard({
  person,
  onOpen,
}: {
  person: MissingPerson;
  onOpen: (p: MissingPerson) => void;
}) {
  const [failed, setFailed] = useState(false);
  const category = person.subjects?.[0] ?? "Missing Person";

  return (
    <button
      onClick={() => onOpen(person)}
      className="card-hover group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card text-left"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg2">
        {person.photo && !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={person.photo}
            alt={person.title}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg2 to-card">
            <span className="font-display text-4xl font-bold text-white/20">
              {initials(person.title)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

        <span className="absolute left-3 top-3 rounded-full border border-gold/30 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-gold backdrop-blur">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold leading-snug tracking-tight text-ink">
          {person.title
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase())}
        </h3>
        {person.location && (
          <p className="mt-1 line-clamp-2 flex items-start gap-1.5 text-sm text-muted">
            <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s-7-4.35-7-10a7 7 0 0114 0c0 5.65-7 10-7 10z" strokeLinejoin="round" />
              <circle cx="12" cy="11" r="2.5" />
            </svg>
            {person.location.replace(/\r?\n/g, " · ")}
          </p>
        )}

        <div className="mt-auto flex items-center gap-2 pt-4 text-sm font-medium text-blue">
          View details
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </button>
  );
}
