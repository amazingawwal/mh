import Link from "next/link";
import { HADITH_BOOKS } from "@/lib/hadith/api";
import { HadithBook } from "@/lib/hadith/types";

export const metadata = {
  title: "Hadith | Muslim Hub",
  description:
    "Browse 50,000+ hadiths from the 9 canonical books of the Sunnah",
};

const BOOK_COLORS: Record<string, string> = {
  bukhari: "bg-emerald-50 border-emerald-200 hover:border-emerald-400",
  muslim: "bg-teal-50 border-teal-200 hover:border-teal-400",
  abudawud: "bg-cyan-50 border-cyan-200 hover:border-cyan-400",
  tirmidhi: "bg-sky-50 border-sky-200 hover:border-sky-400",
  nasai: "bg-indigo-50 border-indigo-200 hover:border-indigo-400",
  ibnmajah: "bg-violet-50 border-violet-200 hover:border-violet-400",
  malik: "bg-purple-50 border-purple-200 hover:border-purple-400",
  ahmad: "bg-fuchsia-50 border-fuchsia-200 hover:border-fuchsia-400",
  darimi: "bg-rose-50 border-rose-200 hover:border-rose-400",
};

export default function HadithPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-800">Hadith</h1>
        <p className="text-slate-500 mt-2">
          The sayings and actions of the Prophet Muhammad ﷺ
        </p>
        <p className="text-sm text-slate-400 mt-1">
          50,884 hadiths across 9 canonical books
        </p>
      </div>

      {/* Book grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {HADITH_BOOKS.map((book, index) => (
          <BookCard key={book.id} book={book} index={index} />
        ))}
      </div>
    </main>
  );
}

function BookCard({ book, index }: { book: HadithBook; index: number }) {
  const colorClass =
    BOOK_COLORS[book.id] ?? "bg-slate-50 border-slate-200 hover:border-slate-400";

  return (
    <Link href={`/hadith/${book.id}/1`}>
      <div
        className={`p-5 rounded-xl border-2 transition-all group ${colorClass}`}
      >
        <div className="flex items-start justify-between gap-3">
          {/* Number badge */}
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200 text-sm font-bold text-slate-500 flex items-center justify-center group-hover:border-current transition-colors">
            {index + 1}
          </span>

          {/* Arabic name */}
          <p className="text-lg font-semibold text-slate-700" dir="rtl">
            {book.arabicName}
          </p>
        </div>

        <h2 className="mt-3 text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
          {book.name}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">{book.author}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs bg-white/80 border border-slate-200 text-slate-600 rounded-full px-2 py-0.5">
            {book.totalChapters} chapters
          </span>
          <span className="text-xs text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Browse →
          </span>
        </div>
      </div>
    </Link>
  );
}