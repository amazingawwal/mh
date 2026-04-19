import PrayerTimesWidget from "@/components/prayers/PrayerTimesWidget";

export const metadata = {
  title: "Prayer Times | Muslim Hub",
  description:
    "Get accurate daily Salah times for any city worldwide, with Hijri date and next prayer countdown",
};

export default function PrayersPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Prayer Times</h1>
        <p className="text-slate-500 mt-2">
          Daily Salah times for any city worldwide
        </p>
      </div>
      <PrayerTimesWidget />
    </main>
  );
}