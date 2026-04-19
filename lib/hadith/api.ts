import { HadithBook, ChapterResponse } from "./types";

const BASE =
  "https://cdn.jsdelivr.net/gh/AhmedBaset/hadith-json@v1.2.0/db/by_chapter/the_9_books";

// Static metadata for the 9 books — no API call needed
export const HADITH_BOOKS: HadithBook[] = [
  {
    id: "bukhari",
    name: "Sahih al-Bukhari",
    arabicName: "صحيح البخاري",
    author: "Imam Muhammad ibn Ismail al-Bukhari",
    totalChapters: 97,
  },
  {
    id: "muslim",
    name: "Sahih Muslim",
    arabicName: "صحيح مسلم",
    author: "Imam Muslim ibn al-Hajjaj",
    totalChapters: 56,
  },
  {
    id: "abudawud",
    name: "Sunan Abu Dawud",
    arabicName: "سنن أبي داود",
    author: "Imam Abu Dawud al-Sijistani",
    totalChapters: 43,
  },
  {
    id: "tirmidhi",
    name: "Jami at-Tirmidhi",
    arabicName: "جامع الترمذي",
    author: "Imam Muhammad ibn Isa at-Tirmidhi",
    totalChapters: 49,
  },
  {
    id: "nasai",
    name: "Sunan an-Nasa'i",
    arabicName: "سنن النسائي",
    author: "Imam Ahmad ibn Shu'ayb an-Nasa'i",
    totalChapters: 51,
  },
  {
    id: "ibnmajah",
    name: "Sunan Ibn Majah",
    arabicName: "سنن ابن ماجه",
    author: "Imam Muhammad ibn Yazid ibn Majah",
    totalChapters: 37,
  },
  {
    id: "malik",
    name: "Muwatta Malik",
    arabicName: "موطأ مالك",
    author: "Imam Malik ibn Anas",
    totalChapters: 61,
  },
  {
    id: "ahmad",
    name: "Musnad Ahmad",
    arabicName: "مسند أحمد",
    author: "Imam Ahmad ibn Hanbal",
    totalChapters: 182,
  },
  {
    id: "darimi",
    name: "Sunan al-Darimi",
    arabicName: "سنن الدارمي",
    author: "Imam Abdullah ibn Abd al-Rahman al-Darimi",
    totalChapters: 23,
  },
];

export function getBook(bookId: string): HadithBook | undefined {
  return HADITH_BOOKS.find((b) => b.id === bookId);
}

export async function getChapter(
  bookId: string,
  chapterNo: number
): Promise<ChapterResponse> {
  const res = await fetch(`${BASE}/${bookId}/${chapterNo}.json`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok)
    throw new Error(`Failed to fetch ${bookId} chapter ${chapterNo}`);
  return res.json();
}