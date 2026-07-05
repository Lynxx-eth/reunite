import type { MissingPerson } from "./types";

// We call the FBI API DIRECTLY from the browser, not through a Next.js server
// route. Reason: the FBI API sits behind Cloudflare, which 403-blocks server-side
// runtimes (Node/undici on Vercel/Netlify) by TLS fingerprint. Real browsers are
// allowed, and the API sends `access-control-allow-origin: *`, so a direct
// client-side fetch works everywhere and keeps the whole app static.
const BASE = "https://api.fbi.gov/wanted/v1/list";
const PAGE_SIZE = 24;

interface RawItem {
  uid: string;
  title: string;
  images?: MissingPerson["images"];
  description?: string | null;
  details?: string | null;
  sex?: string | null;
  race_raw?: string | null;
  hair_raw?: string | null;
  eyes?: string | null;
  weight?: string | null;
  age_range?: string | null;
  dates_of_birth_used?: string[] | null;
  subjects?: string[] | null;
  field_offices?: string[] | null;
  reward_text?: string | null;
  publication?: string | null;
  files?: { url?: string }[] | null;
}

function deriveUrl(item: RawItem): string | undefined {
  const img =
    item.images?.[0]?.large || item.images?.[0]?.original || item.images?.[0]?.thumb;
  if (img) {
    const m = img.match(/^(https?:\/\/[^?#]*?)\/@@images/);
    if (m) return m[1];
  }
  const file = item.files?.[0]?.url;
  if (file) return file.replace(/\/download\.pdf$/i, "");
  return undefined;
}

export function normalizeItem(item: RawItem): MissingPerson {
  const photo =
    item.images?.[0]?.large || item.images?.[0]?.original || item.images?.[0]?.thumb || null;
  return {
    uid: item.uid,
    title: item.title,
    images: item.images ?? [],
    photo,
    location: item.description ?? null,
    details: item.details ?? null,
    sex: item.sex ?? null,
    race: item.race_raw ?? null,
    hair: item.hair_raw ?? null,
    eyes: item.eyes ?? null,
    weight: item.weight ?? null,
    ageRange: item.age_range ?? null,
    datesOfBirth: item.dates_of_birth_used ?? null,
    subjects: item.subjects ?? null,
    fieldOffices: item.field_offices ?? null,
    reward: item.reward_text ?? null,
    url: deriveUrl(item) ?? null,
    published: item.publication ?? null,
  };
}

async function fetchPage(page: number): Promise<{ total: number; items: MissingPerson[] }> {
  const params = new URLSearchParams({
    poster_classification: "missing",
    page: String(page),
    pageSize: String(PAGE_SIZE),
    sort_on: "modified",
    sort_order: "desc",
  });
  const res = await fetch(`${BASE}?${params.toString()}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`FBI API responded ${res.status}`);
  const data = (await res.json()) as { total?: number; items?: RawItem[] };
  return {
    total: data.total ?? 0,
    items: (data.items ?? []).filter((i) => i.uid && i.title).map(normalizeItem),
  };
}

/**
 * Load every open missing-persons case: fetch page 1 to learn the total, then
 * fetch the remaining pages in parallel. De-dupes by uid.
 */
export async function fetchAllMissing(): Promise<MissingPerson[]> {
  const first = await fetchPage(1);
  const collected = [...first.items];
  const lastPage = Math.min(Math.ceil(first.total / PAGE_SIZE) || 1, 12);

  if (lastPage > 1) {
    const rest = await Promise.all(
      Array.from({ length: lastPage - 1 }, (_, i) =>
        fetchPage(i + 2)
          .then((r) => r.items)
          .catch(() => [] as MissingPerson[])
      )
    );
    rest.forEach((batch) => collected.push(...batch));
  }

  const seen = new Set<string>();
  return collected.filter((i) => !seen.has(i.uid) && (seen.add(i.uid), true));
}
