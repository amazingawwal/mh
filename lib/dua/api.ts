import {
  DailyDua,
  PostSalahDhikr,
  UsefulDua,
  SurahVirtue,
} from "./types";

const BASE = "https://dua-data-api.vercel.app/api";
const CACHE = { next: { revalidate: 86400 } };

/**
 * This API wraps responses inconsistently across endpoints. Some return a
 * plain array, some return a wrapped object like { duas: [...] }, and some
 * return an array of wrapper objects like [{ key: [...] }].
 * This helper normalises all of those shapes into a flat array.
 */
function normalise<T>(raw: unknown, knownKey?: string): T[] {
  // Plain array of items
  if (Array.isArray(raw)) {
    // Array of wrapper objects e.g. [{ duas: [...] }, ...]
    const first = raw[0];
    if (first && typeof first === "object" && !Array.isArray(first)) {
      // If a known key is provided, use it
      if (knownKey && knownKey in (first as object)) {
        return raw.flatMap((item: Record<string, unknown>) =>
          Array.isArray(item[knownKey]) ? (item[knownKey] as T[]) : []
        );
      }
      // Otherwise check if first item looks like a data item itself
      // (has numeric id or arabic field — real data, not a wrapper)
      const keys = Object.keys(first as object);
      const looksLikeData =
        keys.includes("id") ||
        keys.includes("arabic") ||
        keys.includes("name");
      if (looksLikeData) return raw as T[];
      // Looks like a wrapper — flatten all array values
      return raw.flatMap((item: Record<string, unknown>) =>
        Object.values(item).flatMap((v) => (Array.isArray(v) ? (v as T[]) : []))
      );
    }
    return raw as T[];
  }
  // Single wrapper object e.g. { surahs: [...] }
  if (raw && typeof raw === "object") {
    const values = Object.values(raw as object);
    const arr = values.find((v) => Array.isArray(v));
    if (arr) return arr as T[];
  }
  return [];
}

export async function getDailyAdkar(): Promise<DailyDua[]> {
  const res = await fetch(`${BASE}/dailyAdkar`, CACHE);
  if (!res.ok) throw new Error("Failed to fetch daily adkar");
  const raw = await res.json();
  return normalise<DailyDua>(raw, "duas");
}

export async function getPostSalahDhikr(): Promise<PostSalahDhikr[]> {
  const res = await fetch(`${BASE}/postSalaah`, CACHE);
  if (!res.ok) throw new Error("Failed to fetch post-salah dhikr");
  const raw = await res.json();
  return normalise<PostSalahDhikr>(raw, "dhikr");
}

export async function getUsefulDuas(): Promise<UsefulDua[]> {
  const res = await fetch(`${BASE}/usefulDuas`, CACHE);
  if (!res.ok) throw new Error("Failed to fetch useful duas");
  const raw = await res.json();
  return normalise<UsefulDua>(raw, "duas");
}

export async function getSurahVirtues(): Promise<SurahVirtue[]> {
  const res = await fetch(`${BASE}/surahVirtues`, CACHE);
  if (!res.ok) throw new Error("Failed to fetch surah virtues");
  const raw = await res.json();
  return normalise<SurahVirtue>(raw, "surahs");
}