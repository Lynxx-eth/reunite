import type { MissingPerson } from "./types";

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

// Small, capped Levenshtein for typo tolerance.
function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 2) return 99;
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(
        dp[j] + 1,
        dp[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      prev = tmp;
    }
  }
  return dp[b.length];
}

/**
 * Relevance score for a person against a query.
 * Considers full-name substring, per-token prefix/contains, typo tolerance,
 * and matches in location and case category. 0 == no match.
 */
export function scorePerson(person: MissingPerson, rawQuery: string): number {
  const q = norm(rawQuery);
  if (!q) return 1;

  const name = norm(person.title);
  const loc = norm(person.location ?? "");
  const subj = norm((person.subjects ?? []).join(" "));
  const nameTokens = name.split(/\s+/).filter(Boolean);
  const queryTokens = q.split(/\s+/).filter(Boolean);

  let score = 0;

  if (name.includes(q)) score += 120;
  if (name.startsWith(q)) score += 60;

  for (const qt of queryTokens) {
    let best = 0;
    for (const nt of nameTokens) {
      if (nt === qt) best = Math.max(best, 40);
      else if (nt.startsWith(qt)) best = Math.max(best, 30);
      else if (nt.includes(qt)) best = Math.max(best, 18);
      else if (qt.length >= 3 && editDistance(nt, qt) <= 1) best = Math.max(best, 12);
      else if (qt.length >= 4 && editDistance(nt, qt) === 2) best = Math.max(best, 6);
    }
    score += best;
    if (loc.includes(qt)) score += 8;
    if (subj.includes(qt)) score += 5;
  }

  return score;
}

export interface FilterState {
  query: string;
  sex: "all" | "Male" | "Female";
  category: string; // "all" or a subject label
}

export function filterAndRank(items: MissingPerson[], f: FilterState): MissingPerson[] {
  const scored = items
    .filter((p) => (f.sex === "all" ? true : (p.sex ?? "").toLowerCase() === f.sex.toLowerCase()))
    .filter((p) =>
      f.category === "all" ? true : (p.subjects ?? []).some((s) => s === f.category)
    )
    .map((p) => ({ p, s: scorePerson(p, f.query) }))
    .filter((x) => x.s > 0);

  if (f.query.trim()) {
    scored.sort((a, b) => b.s - a.s);
  }
  return scored.map((x) => x.p);
}

export function categoriesOf(items: MissingPerson[]): string[] {
  const set = new Set<string>();
  items.forEach((p) => (p.subjects ?? []).forEach((s) => s && set.add(s)));
  return Array.from(set).sort();
}
