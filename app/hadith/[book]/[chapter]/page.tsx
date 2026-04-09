import { getChapter, getBook, HADITH_BOOKS } from "@/lib/hadith/api";
import { Hadith } from "@/lib/hadith/types";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{ book: string; chapter: string }>;
};

export async function generateStaticParams() {
  // Pre-render chapter 1 of every book at build time; rest are on-demand
  return HADITH_BOOKS.map((book) => ({ book: book.id, chapter: "1" }));
}

export async function generateMetadata({ params }: Props) {
  const { book: bookId, chapter } = await params;
  const book = getBook(bookId);
  if (!book) return {};
  return {
    title: `${book.name} — Chapter ${chapter} | Hadith | Muslim Hub`,
    description: `Browse hadiths from chapter ${chapter} of ${book.name}`,
  };
}

export default async function HadithChapterPage({ params }: Props) {
  const { book: bookId, chapter: chapterParam } = await params;
  const chapterNo = parseInt(chapterParam);
  const book = getBook(bookId);

  if (!book || isNaN(chapterNo) || chapterNo < 1) notFound();

  let data;
  try {
    data = await getChapter(bookId, chapterNo);
  } catch {
    notFound();
  }

  const { hadiths, chapter, metadata: bookMeta } = data;
  const prevChapter = chapterNo > 1 ? chapterNo - 1 : null;
  const nextChapter = chapterNo < book.totalChapters ? chapterNo + 1 : null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/hadith" className="hover:text-emerald-600 transition-colors">
          Hadith
        </Link>
        <span>/</span>
        <Link
          href={`/hadith/${bookId}/1`}
          className="hover:text-emerald-600 transition-colors"
        >
          {book.name}
        </Link>
        <span>/</span>
        <span className="text-slate-700 font-medium">Chapter {chapterNo}</span>
      </nav>

      {/* Chapter header */}
      <div className="mb-8 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-1">
              {book.name}
            </p>
            <h1 className="text-xl font-bold text-slate-800">
              {chapter.english}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {hadiths.length} hadith{hadiths.length !== 1 ? "s" : ""}
            </p>
          </div>
          <p className="text-xl text-emerald-800 font-semibold flex-shrink-0" dir="rtl">
            {chapter.arabic}
          </p>
        </div>
      </div>

      {/* Chapter navigation — top */}
      <ChapterNav
        bookId={bookId}
        bookName={book.name}
        chapterNo={chapterNo}
        totalChapters={book.totalChapters}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
      />

      {/* Hadith list */}
      <div className="flex flex-col gap-6 mt-6">
        {hadiths.map((hadith) => (
          <HadithCard key={hadith.id} hadith={hadith} bookName={book.name} />
        ))}
      </div>

      {/* Chapter navigation — bottom */}
      <div className="mt-10">
        <ChapterNav
          bookId={bookId}
          bookName={book.name}
          chapterNo={chapterNo}
          totalChapters={book.totalChapters}
          prevChapter={prevChapter}
          nextChapter={nextChapter}
        />
      </div>
    </main>
  );
}

function HadithCard({
  hadith,
  bookName,
}: {
  hadith: Hadith;
  bookName: string;
}) {
  return (
    <article className="rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow p-5">
      {/* Hadith number badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">
          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
            {hadith.idInBook}
          </span>
          {bookName} #{hadith.idInBook}
        </span>
      </div>

      {/* Arabic text */}
      <p
        className="text-right text-lg leading-loose text-slate-800 mb-4"
        dir="rtl"
        lang="ar"
      >
        {hadith.arabic}
      </p>

      <div className="border-t border-slate-100 my-4" />

      {/* Narrator */}
      {hadith.english.narrator && (
        <p className="text-sm font-semibold text-emerald-700 mb-2">
          {hadith.english.narrator}
        </p>
      )}

      {/* English text */}
      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
        {hadith.english.text}
      </p>
    </article>
  );
}

function ChapterNav({
  bookId,
  bookName,
  chapterNo,
  totalChapters,
  prevChapter,
  nextChapter,
}: {
  bookId: string;
  bookName: string;
  chapterNo: number;
  totalChapters: number;
  prevChapter: number | null;
  nextChapter: number | null;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-t border-slate-100">
      {prevChapter ? (
        <Link
          href={`/hadith/${bookId}/${prevChapter}`}
          className="flex flex-col group"
        >
          <span className="text-xs text-slate-400 group-hover:text-emerald-500 transition-colors">
            ← Previous
          </span>
          <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">
            Chapter {prevChapter}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {/* Chapter counter */}
      <span className="text-xs text-slate-400">
        {chapterNo} / {totalChapters}
      </span>

      {nextChapter ? (
        <Link
          href={`/hadith/${bookId}/${nextChapter}`}
          className="flex flex-col text-right group"
        >
          <span className="text-xs text-slate-400 group-hover:text-emerald-500 transition-colors">
            Next →
          </span>
          <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">
            Chapter {nextChapter}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}