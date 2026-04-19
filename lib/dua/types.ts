// ── Daily Adkar ──────────────────────────────────────────────────────────────
export type DailyDua = {
  id: number;
  duaTitle: string;
  dua: string;             // Arabic
  transliteration: string;
  translation: string;
  times: string;           // e.g. "3x", "1x", "7x"
  benefits: {
    benefitOne?: string;
    benefitTwo?: string;
    benefitThree?: string;
  };
};

export type DailyAdkarResponse = { duas: DailyDua[] }[];

// ── Post-Salah Dhikr ─────────────────────────────────────────────────────────
export type PostSalahDhikr = {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  repeat: number;
};

// ── Useful Duas ──────────────────────────────────────────────────────────────
export type UsefulDua = {
  id: number;
  title: string;
  category: string;
  arabic: string;
  transliteration: string;
  translation: string;
};

// ── Surah Virtues ────────────────────────────────────────────────────────────
export type SurahVirtue = {
  id: number;
  name: string;
  arabicName: string;
  chapter: number;
  when: string;     // actual API field (not whenToRead)
  virtue: string;   // hadith text
  benefit: string;  // single string (not benefits array)
  source: string;   // hadith source reference
};

// ── Tab config ───────────────────────────────────────────────────────────────
export type DuaTab = "morning" | "postSalah" | "daily" | "virtues";

export const DUA_TABS: { id: DuaTab; label: string; emoji: string; description: string }[] = [
  { id: "morning",   label: "Morning & Evening", emoji: "🌅", description: "Daily adhkar for morning and evening" },
  { id: "postSalah", label: "After Salah",        emoji: "🕌", description: "Dhikr to recite after each prayer"   },
  { id: "daily",     label: "Useful Duas",        emoji: "🤲", description: "100+ duas for every occasion"        },
  { id: "virtues",   label: "Surah Virtues",      emoji: "📖", description: "Surahs to read and their rewards"    },
];