import {
  getDailyAdkar,
  getPostSalahDhikr,
  getUsefulDuas,
  getSurahVirtues,
} from "@/lib/dua/api";
import DuaPageClient from "@/components/dua/DuaPageClient";

export const metadata = {
  title: "Dua & Dhikr | Muslim Hub",
  description:
    "Morning & evening adhkar, post-salah dhikr, 100+ duas for every occasion, and surah virtues",
};

export default async function DuaPage() {
  // Fetch all four datasets in parallel — all cached for 24h
  const [adkar, postSalah, usefulDuas, virtues] = await Promise.all([
    getDailyAdkar().catch(() => []),
    getPostSalahDhikr().catch(() => []),
    getUsefulDuas().catch(() => []),
    getSurahVirtues().catch(() => []),
  ]);


  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <p className="text-3xl text-emerald-800 mb-2" dir="rtl">
          اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا
        </p>
        <h1 className="text-3xl font-bold text-slate-800 mt-3">
          Dua &amp; Dhikr
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          &ldquo;Remember Allah with much remembrance&rdquo; — Quran 33:41
        </p>
      </div>

      <DuaPageClient
        adkar={adkar}
        postSalah={postSalah}
        usefulDuas={usefulDuas}
        virtues={virtues}
      />
    </main>
  );
}