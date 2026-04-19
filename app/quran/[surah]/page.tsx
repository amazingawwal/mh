import { getSurah, getSurahList } from "@/lib/quran/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import AudioPlayer from "@/components/quran/AudioPlayer";

type Props = {
  params: Promise<{ surah: string }>;
};

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({ surah: String(i + 1) }));
}

export async function generateMetadata({ params }: Props) {
  const { surah: surahParam } = await params;
  const surahNo = parseInt(surahParam);
  if (isNaN(surahNo) || surahNo < 1 || surahNo > 114) return {};
  const surah = await getSurah(surahNo);
  return {
    title: `${surah.surahName} (${surah.surahNameArabic}) | Al-Qur'an | Muslim Hub`,
    description: `${surah.surahNameTranslation} — Surah ${surahNo}, ${surah.totalAyah} verses, revealed in ${surah.revelationPlace}`,
  };
}

export default async function SurahPage({ params }: Props) {
  const { surah: surahParam } = await params;
  const surahNo = parseInt(surahParam);

  if (isNaN(surahNo) || surahNo < 1 || surahNo > 114) notFound();

  const [surah, allSurahs] = await Promise.all([
    getSurah(surahNo),
    getSurahList(),
  ]);

  const prevSurah = surahNo > 1 ? allSurahs[surahNo - 2] : null;
  const nextSurah = surahNo < 114 ? allSurahs[surahNo] : null;

  // Default reciter: Mishary Rashid Al Afasy (id "1")
  const chapterAudioUrl = surah.audio?.["1"]?.originalUrl ?? surah.audio?.["1"]?.url ?? null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href="/quran"
        className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:text-emerald-500 mb-6 transition-colors"
      >
        ← Back to all Surahs
      </Link>

      {/* Surah header */}
      <div className="text-center mb-8 p-6 bg-gradient-to-b from-emerald-50 to-white rounded-2xl border border-emerald-100">
        <p className="text-4xl text-emerald-800 mb-1" dir="rtl">
          {surah.surahNameArabicLong}
        </p>
        <h1 className="text-2xl font-bold text-slate-800 mt-3">
          {surah.surahName}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {surah.surahNameTranslation} · {surah.totalAyah} verses ·{" "}
          {surah.revelationPlace}
        </p>

        {/* Chapter audio player */}
        {chapterAudioUrl && (
          <div className="mt-4">
            <p className="text-xs text-slate-400 mb-1">
              Recited by Mishary Rashid Al Afasy
            </p>
            <AudioPlayer src={chapterAudioUrl} label={`Surah ${surah.surahName}`} />
          </div>
        )}
      </div>

      {/* Bismillah — skip for Al-Fatihah (1) and At-Tawbah (9) */}
      {surahNo !== 1 && surahNo !== 9 && (
        <p className="text-center text-2xl text-emerald-800 mb-8" dir="rtl">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
      )}

      {/* Verses */}
      <div className="flex flex-col gap-6">
        {surah.arabic1.map((arabic, i) => (
          <VerseCard
            key={i}
            verseNo={i + 1}
            surahNo={surahNo}
            arabic={arabic}
            english={surah.english[i]}
          />
        ))}
      </div>

      {/* Prev / Next navigation */}
      <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-100">
        {prevSurah ? (
          <Link
            href={`/quran/${surahNo - 1}`}
            className="flex flex-col text-left group"
          >
            <span className="text-xs text-slate-400 group-hover:text-emerald-500 transition-colors">
              ← Previous
            </span>
            <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">
              {prevSurah.surahName}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextSurah ? (
          <Link
            href={`/quran/${surahNo + 1}`}
            className="flex flex-col text-right group"
          >
            <span className="text-xs text-slate-400 group-hover:text-emerald-500 transition-colors">
              Next →
            </span>
            <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">
              {nextSurah.surahName}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </main>
  );
}

function VerseCard({
  verseNo,
  surahNo,
  arabic,
  english,
}: {
  verseNo: number;
  surahNo: number;
  arabic: string;
  english: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow p-5">
      {/* Verse number badge */}
      <div className="flex justify-between items-center mb-4">
        <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
          {verseNo}
        </span>
        <span className="text-xs text-slate-400">
          {surahNo}:{verseNo}
        </span>
      </div>

      {/* Arabic text */}
      <p
        className="text-right text-2xl leading-loose text-slate-800 font-arabic mb-4"
        dir="rtl"
        lang="ar"
      >
        {arabic}
      </p>

      {/* Divider */}
      <div className="border-t border-slate-100 my-3" />

      {/* English translation */}
      <p className="text-slate-600 text-sm leading-relaxed">{english}</p>
    </div>
  );
}