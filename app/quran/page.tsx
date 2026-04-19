import Link from "next/link";
import { getSurahList } from "@/lib/quran/api";
import { SurahMeta } from "@/lib/quran/types";

export const metadata = {
  title: "Al-Qur'an | Muslim Hub",
  description: "Read and listen to all 114 surahs of the Holy Quran",
};

const JUZZ_COLORS = [
  "bg-emerald-50 border-emerald-200",
  "bg-teal-50 border-teal-200",
  "bg-cyan-50 border-cyan-200",
  "bg-sky-50 border-sky-200",
  "bg-indigo-50 border-indigo-200",
];

export default async function QuranPage() {
  const surahs = await getSurahList();

  const meccan = surahs.filter((s) => s.revelationPlace === "Mecca").length;
  const medinan = surahs.length - meccan;

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-4xl text-emerald-800 mb-2" dir="rtl">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
        <h1 className="text-3xl font-bold text-slate-800 mt-4">Al-Qur&apos;an</h1>
        <p className="text-slate-500 mt-1">
          114 Surahs · {meccan} Meccan · {medinan} Medinan
        </p>
      </div>

      {/* Surah grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {surahs.map((surah, index) => {
          const surahNo = index + 1;
          const colorClass = JUZZ_COLORS[surahNo % JUZZ_COLORS.length];
          return (
            <SurahCard
              key={surahNo}
              surah={surah}
              surahNo={surahNo}
              colorClass={colorClass}
            />
          );
        })}
      </div>
    </main>
  );
}

function SurahCard({
  surah,
  surahNo,
  colorClass,
}: {
  surah: SurahMeta;
  surahNo: number;
  colorClass: string;
}) {
  return (
    <Link href={`/quran/${surahNo}`}>
      <div
        className={`flex items-center gap-4 p-4 rounded-xl border ${colorClass} hover:shadow-md transition-all group`}
      >
        {/* Surah number badge */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-600 group-hover:border-emerald-400 transition-colors">
          {surahNo}
        </div>

        {/* Surah info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 truncate">
            {surah.surahName}
          </p>
          <p className="text-xs text-slate-500">
            {surah.surahNameTranslation} · {surah.totalAyah} verses ·{" "}
            {surah.revelationPlace}
          </p>
        </div>

        {/* Arabic name */}
        <div className="flex-shrink-0 text-right" dir="rtl">
          <p className="text-lg font-semibold text-emerald-700">
            {surah.surahNameArabic}
          </p>
        </div>
      </div>
    </Link>
  );
}