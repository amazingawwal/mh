export type HadithBook = {
  id: string; // e.g. "bukhari"
  name: string; // e.g. "Sahih al-Bukhari"
  author: string;
  arabicName: string;
  totalChapters: number;
};

export type ChapterMeta = {
  id: number;
  bookId: number;
  arabic: string;
  english: string;
};

export type Hadith = {
  id: number;
  idInBook: number;
  chapterId: number;
  bookId: number;
  arabic: string;
  english: {
    narrator: string;
    text: string;
  };
};

export type ChapterResponse = {
  metadata: {
    length: number;
    arabic: { title: string; author: string; introduction: string };
    english: { title: string; author: string; introduction: string };
  };
  hadiths: Hadith[];
  chapter: {
    id: number;
    bookId: number;
    arabic: string;
    english: string;
  };
};