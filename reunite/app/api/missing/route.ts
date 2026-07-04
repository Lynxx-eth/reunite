import { NextRequest, NextResponse } from "next/server";
import type { MissingPerson } from "@/lib/types";

const BASE = "https://api.fbi.gov/wanted/v1/list";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

// Derive the public fbi.gov case page from an image URL like
// https://www.fbi.gov/wanted/kidnap/jane-doe/@@images/image/large
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
  height_max?: number | null;
  age_range?: string | null;
  dates_of_birth_used?: string[] | null;
  subjects?: string[] | null;
  field_offices?: string[] | null;
  reward_text?: string | null;
  publication?: string | null;
  files?: { url?: string }[] | null;
}

function normalize(item: RawItem): MissingPerson {
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

async function fetchList(page: string, title: string) {
  const params = new URLSearchParams({
    poster_classification: "missing",
    page,
    pageSize: "24",
    sort_on: "modified",
    sort_order: "desc",
  });
  if (title) params.set("title", title);
  return fetch(`${BASE}?${params.toString()}`, {
    headers: { "User-Agent": UA, Accept: "application/json" },
    next: { revalidate: 300 },
  });
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const page = sp.get("page") ?? "1";
  const title = sp.get("title")?.trim() ?? "";
  const wantAll = sp.get("all") === "1";

  // "all" mode: page through the whole missing-persons set once (cached upstream)
  // so the client can do fast, accurate, typo-tolerant search locally.
  if (wantAll) {
    try {
      const all: MissingPerson[] = [];
      let total = 0;
      for (let p = 1; p <= 12; p++) {
        const res = await fetchList(String(p), "");
        if (!res.ok) break;
        const data = (await res.json()) as { total?: number; items?: RawItem[] };
        total = data.total ?? total;
        const batch = (data.items ?? []).filter((i) => i.uid && i.title).map(normalize);
        all.push(...batch);
        if (batch.length === 0 || all.length >= total) break;
      }
      // de-dupe by uid (some cases appear across pages)
      const seen = new Set<string>();
      const items = all.filter((i) => (seen.has(i.uid) ? false : (seen.add(i.uid), true)));
      return NextResponse.json({ total: items.length, page: 1, items });
    } catch {
      return NextResponse.json(
        { total: 0, page: 1, items: [], error: "Could not reach the FBI missing-persons service." },
        { status: 502 }
      );
    }
  }

  const params = new URLSearchParams({
    poster_classification: "missing",
    page,
    pageSize: "24",
    sort_on: "modified",
    sort_order: "desc",
  });
  if (title) params.set("title", title);

  try {
    const res = await fetch(`${BASE}?${params.toString()}`, {
      headers: { "User-Agent": UA, Accept: "application/json" },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { total: 0, page: Number(page), items: [], error: `Upstream error ${res.status}` },
        { status: 502 }
      );
    }

    const data = (await res.json()) as { total?: number; items?: RawItem[] };
    const items = (data.items ?? [])
      .filter((i) => i.uid && i.title)
      .map(normalize);

    return NextResponse.json({
      total: data.total ?? items.length,
      page: Number(page),
      items,
    });
  } catch {
    return NextResponse.json(
      {
        total: 0,
        page: Number(page),
        items: [],
        error: "Could not reach the FBI missing-persons service. Please try again.",
      },
      { status: 502 }
    );
  }
}
