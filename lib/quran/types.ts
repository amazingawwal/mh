export type SurahMeta = {
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: "Mecca" | "Madina";
  totalAyah: number;
};

export type AudioReciter = {
  reciter: string;
  url: string;
  originalUrl: string;
};

export type SurahDetail = SurahMeta & {
  surahNo: number;
  audio: Record<string, AudioReciter>;
  english: string[];
  arabic1: string[]; // Uthmani script
  arabic2: string[]; // Simple script
  bengali?: string[];
  urdu?: string[];
};

export type VerseAudio = Record<string, AudioReciter>;