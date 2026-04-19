export type Timings = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
};

export type HijriDate = {
  date: string;
  day: string;
  weekday: { en: string; ar: string };
  month: { number: number; en: string; ar: string; days: number };
  year: string;
  holidays: string[];
};

export type GregorianDate = {
  date: string;
  day: string;
  weekday: { en: string };
  month: { number: number; en: string };
  year: string;
};

export type PrayerTimesResponse = {
  code: number;
  status: string;
  data: {
    timings: Timings;
    date: {
      readable: string;
      timestamp: string;
      hijri: HijriDate;
      gregorian: GregorianDate;
    };
    meta: {
      timezone: string;
      method: { id: number; name: string };
    };
  };
};

export type CalculationMethod = {
  id: number;
  name: string;
  region: string;
};

// The 5 obligatory prayers we display (in order)
export const PRAYER_NAMES = [
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
] as const;

export type PrayerName = (typeof PRAYER_NAMES)[number];

// Available calculation methods
export const CALCULATION_METHODS: CalculationMethod[] = [
  { id: 2, name: "Islamic Society of North America (ISNA)", region: "North America" },
  { id: 3, name: "Muslim World League (MWL)", region: "Global" },
  { id: 4, name: "Umm Al-Qura University, Makkah", region: "Saudi Arabia" },
  { id: 5, name: "Egyptian General Authority of Survey", region: "Egypt" },
  { id: 8, name: "Gulf Region", region: "Gulf" },
  { id: 11, name: "Majlis Ugama Islam Singapura (MUIS)", region: "Singapore" },
  { id: 12, name: "Union Organization Islamic de France", region: "France" },
  { id: 15, name: "Turkish Presidency of Religious Affairs", region: "Turkey" },
  { id: 99, name: "Custom Angles", region: "Custom" },
];