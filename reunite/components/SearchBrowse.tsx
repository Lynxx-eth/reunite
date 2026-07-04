"use client";

import { useEffect, useMemo, useState } from "react";
import type { MissingPerson, MissingResponse } from "@/lib/types";
import { filterAndRank, categoriesOf } from "@/lib/search";
import PersonCard from "./PersonCard";
import PersonModal from "./PersonModal";

type Sex = "all" | "Male" | "Female";
const PAGE_SIZE = 12;

const SEX_FILTERS: { key: Sex; label: string }[] = [
  { key: "all", label: "Everyone" },
  { key: "Female", label: "Female" },
  { key: "Male", label: "Male" },
];

export default function SearchBrowse() {
  const [all, setAll] = useState<MissingPerson[]>([]);
  const [query, setQuery] = useState("");
  const [sex, setSex] = useState<Sex>("all");
  const [category, setCategory] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<MissingPerson | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetch("/api/missing?all=1")
      .then((r) => r.json())
      .then((data: MissingResponse) => {
        if (data.error) setError(data.error);
        setAll(data.items ?? []);
      })
      .catch(() => setError("Something went wrong while loading cases."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const categories = useMemo(() => categoriesOf(all), [all]);

  const results = useMemo(
    () => filterAndRank(all, { query, sex, category }),
    [all, query, sex, category]
  );

  // reset visible count when filters change
  useEffect(() => setVisible(PAGE_SIZE), [query, sex, category]);

  const shown = results.slice(0, visible);

  return (
    <section id="browse" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-medium uppercase tracking-[0.2em] text-blue">Live database</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Search active cases
        </h2>
        <p className="mt-4 text-muted">
          Every profile below is a real, currently-open missing-person case. Smart search matches
          names even with typos — then share the ones near you.
        </p>
      </div>

      {/* search + filters */}
      <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4">
        <div className="glass flex items-center gap-3 rounded-full px-5 py-3.5">
          <svg className="h-5 w-5 shrink-0 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, city, or state…"
            className="w-full bg-transparent text-ink placeholder:text-muted focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-muted hover:text-ink" aria-label="Clear">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {SEX_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setSex(f.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                sex === f.key
                  ? "gold-gradient text-[#1a1204]"
                  : "border border-white/10 bg-white/5 text-muted hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
          {categories.length > 1 && (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:text-ink focus:outline-none"
            >
              <option value="all" className="bg-card">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c} className="bg-card">
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* count */}
      {!loading && !error && (
        <p className="mt-8 text-center text-sm text-muted">
          <span className="text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "case" : "cases"}
          {query || sex !== "all" || category !== "all" ? " match your search" : " open right now"}
        </p>
      )}

      {error && (
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-center text-sm text-red-200">
          {error}
          <button
            onClick={load}
            className="mt-3 block w-full rounded-full border border-white/15 bg-white/5 py-2 font-medium text-ink hover:bg-white/10"
          >
            Try again
          </button>
        </div>
      )}

      {/* grid */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton aspect-[4/5] rounded-2xl" />
            ))
          : shown.map((p) => <PersonCard key={p.uid} person={p} onOpen={setSelected} />)}
      </div>

      {!loading && !error && results.length === 0 && (
        <div className="mx-auto mt-12 max-w-md text-center text-muted">
          <p className="font-display text-lg text-ink">No matching cases found</p>
          <p className="mt-2 text-sm">Try a different name, city, or clear the filters.</p>
        </div>
      )}

      {!loading && visible < results.length && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 font-semibold text-ink transition-colors hover:bg-white/10"
          >
            Show more cases
            <span className="text-muted">({results.length - visible} more)</span>
          </button>
        </div>
      )}

      <PersonModal person={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
