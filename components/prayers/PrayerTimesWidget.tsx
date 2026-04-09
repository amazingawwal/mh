"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  PrayerTimesResponse,
  PRAYER_NAMES,
  PrayerName,
  CALCULATION_METHODS,
  Timings,
} from "@/lib/prayer/types";

// ─── Prayer icons (emoji fallback — swap for SVGs if desired) ────────────────
const PRAYER_ICONS: Record<string, string> = {
  Fajr: "🌙",
  Sunrise: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤️",
  Maghrib: "🌇",
  Isha: "🌃",
};

const PRAYER_LABELS: Record<string, string> = {
  Fajr: "Fajr",
  Sunrise: "Sunrise",
  Dhuhr: "Dhuhr",
  Asr: "Asr",
  Maghrib: "Maghrib",
  Isha: "Isha",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTodayDDMMYYYY(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

function parseTime(timeStr: string): { h: number; m: number } {
  const [h, m] = timeStr.split(":").map(Number);
  return { h, m };
}

function toMinutes(h: number, m: number): number {
  return h * 60 + m;
}

function getNextPrayer(
  timings: Timings,
  nowMinutes: number
): { name: PrayerName; time: string; minutesLeft: number } | null {
  for (const name of PRAYER_NAMES) {
    if (name === "Sunrise") continue; // Sunrise is not a prayer
    const { h, m } = parseTime(timings[name]);
    const prayerMinutes = toMinutes(h, m);
    if (nowMinutes < prayerMinutes) {
      return { name, time: timings[name], minutesLeft: prayerMinutes - nowMinutes };
    }
  }
  // After Isha — next is Fajr tomorrow
  const { h, m } = parseTime(timings.Fajr);
  const fajrMinutes = toMinutes(h, m) + 24 * 60;
  return {
    name: "Fajr",
    time: timings.Fajr,
    minutesLeft: fajrMinutes - nowMinutes,
  };
}

function formatCountdown(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function to12Hour(time: string): string {
  const { h, m } = parseTime(time);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PrayerTimesWidget() {
  const [city, setCity] = useState("London");
  const [country, setCountry] = useState("United Kingdom");
  const [method, setMethod] = useState(3); // MWL — global default
  const [data, setData] = useState<PrayerTimesResponse["data"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nowMinutes, setNowMinutes] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const cityInputRef = useRef<HTMLInputElement>(null);

  // Update current time every minute
  useEffect(() => {
    function tick() {
      const now = new Date();
      setNowMinutes(toMinutes(now.getHours(), now.getMinutes()));
    }
    tick();
    const interval = setInterval(tick, 60_000);
    return () => clearInterval(interval);
  }, []);

  const fetchTimes = useCallback(async () => {
    if (!city.trim() || !country.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const date = getTodayDDMMYYYY();
      const url = `https://api.aladhan.com/v1/timingsByCity/${date}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`;
      const res = await fetch(url);
      const json: PrayerTimesResponse = await res.json();
      if (json.code !== 200) throw new Error(json.status ?? "API error");
      setData(json.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not fetch prayer times. Check the city and country."
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [city, country, method]);

  // Fetch on mount
  useEffect(() => {
    fetchTimes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetchTimes();
  }

  const nextPrayer = data ? getNextPrayer(data.timings, nowMinutes) : null;

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-6">

      {/* ── Search form ─────────────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              City
            </label>
            <input
              ref={cityInputRef}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. London"
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Country
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. United Kingdom"
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </div>
        </div>

        {/* Calculation method */}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setShowSettings((v) => !v)}
            className="flex items-center gap-1 text-xs text-slateald-500 hover:text-emerald-600 transition-colors w-fit"
          >
            <span>{showSettings ? "▾" : "▸"}</span>
            <span className="font-semibold uppercase tracking-wide">
              Calculation Method
            </span>
          </button>
          {showSettings && (
            <select
              value={method}
              onChange={(e) => setMethod(Number(e.target.value))}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
            >
              {CALCULATION_METHODS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.region})
                </option>
              ))}
            </select>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold rounded-xl py-2.5 text-sm transition-colors"
        >
          {loading ? "Fetching…" : "Get Prayer Times"}
        </button>
      </form>

      {/* ── Error ───────────────────────────────────────────────── */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* ── Loading skeleton ────────────────────────────────────── */}
      {loading && !data && <PrayerTimesSkeleton />}

      {/* ── Results ─────────────────────────────────────────────── */}
      {data && !loading && (
        <>
          {/* Hijri date + location banner */}
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white rounded-2xl p-5 text-center">
            <p className="text-sm text-emerald-200 mb-0.5">
              {data.date.gregorian.weekday.en},{" "}
              {data.date.readable}
            </p>
            <p className="text-2xl font-bold tracking-wide" dir="rtl">
              {data.date.hijri.day}{" "}
              {data.date.hijri.month.ar}{" "}
              {data.date.hijri.year}
            </p>
            <p className="text-emerald-200 text-sm mt-0.5">
              {data.date.hijri.day} {data.date.hijri.month.en}{" "}
              {data.date.hijri.year} AH
            </p>
            {data.date.hijri.holidays.length > 0 && (
              <p className="mt-2 text-xs bg-white/20 rounded-full px-3 py-1 inline-block">
                🌙 {data.date.hijri.holidays.join(", ")}
              </p>
            )}
            <p className="text-xs text-emerald-300 mt-3">
              {city}, {country} · {data.meta.method.name}
            </p>
          </div>

          {/* Next prayer countdown */}
          {nextPrayer && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">
                  Next Prayer
                </p>
                <p className="text-xl font-bold text-slate-800 mt-0.5">
                  {PRAYER_ICONS[nextPrayer.name]} {nextPrayer.name}
                </p>
                <p className="text-sm text-slate-500">
                  at {to12Hour(nextPrayer.time)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-amber-600">
                  {formatCountdown(nextPrayer.minutesLeft)}
                </p>
                <p className="text-xs text-slate-400">remaining</p>
              </div>
            </div>
          )}

          {/* Prayer times grid */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {PRAYER_NAMES.map((name, i) => {
              const time = data.timings[name];
              const { h, m } = parseTime(time);
              const prayerMinutes = toMinutes(h, m);
              const isNext = nextPrayer?.name === name;
              const isPast =
                name !== "Sunrise" && prayerMinutes < nowMinutes && !isNext;

              return (
                <div
                  key={name}
                  className={`flex items-center justify-between px-5 py-4 transition-colors
                    ${isNext ? "bg-emerald-50 border-l-4 border-emerald-500" : ""}
                    ${isPast ? "opacity-40" : ""}
                    ${i < PRAYER_NAMES.length - 1 ? "border-b border-slate-100" : ""}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{PRAYER_ICONS[name]}</span>
                    <div>
                      <p
                        className={`font-semibold text-sm ${
                          isNext ? "text-emerald-700" : "text-slate-700"
                        }`}
                      >
                        {PRAYER_LABELS[name]}
                        {isNext && (
                          <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 rounded-full px-2 py-0.5">
                            Next
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold tabular-nums ${
                        isNext ? "text-emerald-700" : "text-slate-800"
                      }`}
                    >
                      {to12Hour(time)}
                    </p>
                    <p className="text-xs text-slate-400">{time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timezone note */}
          <p className="text-center text-xs text-slate-400">
            Times shown in {data.meta.timezone} timezone
          </p>
        </>
      )}
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function PrayerTimesSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {/* Date banner skeleton */}
      <div className="bg-emerald-100 rounded-2xl p-5 flex flex-col items-center gap-2">
        <div className="h-4 w-40 bg-emerald-200 rounded" />
        <div className="h-8 w-56 bg-emerald-200 rounded" />
        <div className="h-4 w-44 bg-emerald-200 rounded" />
      </div>
      {/* Countdown skeleton */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-20 bg-amber-200 rounded" />
          <div className="h-6 w-28 bg-slate-200 rounded" />
          <div className="h-3 w-16 bg-slate-100 rounded" />
        </div>
        <div className="h-10 w-20 bg-amber-200 rounded" />
      </div>
      {/* Prayer rows skeleton */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {PRAYER_NAMES.map((name, i) => (
          <div
            key={name}
            className={`flex items-center justify-between px-5 py-4 ${
              i < PRAYER_NAMES.length - 1 ? "border-b border-slate-100" : ""
            }`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-slate-100" />
              <div className="h-4 w-20 bg-slate-200 rounded" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="h-5 w-20 bg-slate-200 rounded" />
              <div className="h-3 w-12 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}