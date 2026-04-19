import { SurahMeta, SurahDetail, VerseAudio } from "./types";

const BASE = "https://quranapi.pages.dev/api";

export async function getSurahList(): Promise<SurahMeta[]> {
  const res = await fetch(`${BASE}/surah.json`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Failed to fetch surah list");
  return res.json();
}

export async function getSurah(surahNo: number): Promise<SurahDetail> {
  const res = await fetch(`${BASE}/${surahNo}.json`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`Failed to fetch surah ${surahNo}`);
  return res.json();
}

export async function getVerseAudio(
  surahNo: number,
  ayahNo: number
): Promise<VerseAudio> {
  const res = await fetch(`${BASE}/audio/${surahNo}/${ayahNo}.json`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Failed to fetch verse audio");
  return res.json();
}