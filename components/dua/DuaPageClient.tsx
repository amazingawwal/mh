"use client";

import { useState, useMemo } from "react";
import {
  DailyDua,
  PostSalahDhikr,
  UsefulDua,
  SurahVirtue,
  DUA_TABS,
  DuaTab,
} from "@/lib/dua/types";

type Props = {
  adkar: DailyDua[];
  postSalah: PostSalahDhikr[];
  usefulDuas: UsefulDua[];
  virtues: SurahVirtue[];
};

export default function DuaPageClient({ adkar, postSalah, usefulDuas, virtues }: Props) {
  const [activeTab, setActiveTab] = useState<DuaTab>("morning");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Derive unique categories from useful duas
  const categories = useMemo(() => {
    const cats = Array.from(new Set(usefulDuas.map((d) => d.category)));
    return ["All", ...cats.sort()];
  }, [usefulDuas]);

  // Filtered useful duas
  const filteredDuas = useMemo(() => {
    const q = search.toLowerCase();
    return usefulDuas.filter((d) => {
      const matchesCat = activeCategory === "All" || (d.category ?? "") === activeCategory;
      const matchesSearch =
        !search ||
        (d.title ?? "").toLowerCase().includes(q) ||
        (d.category ?? "").toLowerCase().includes(q) ||
        (d.translation ?? "").toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [usefulDuas, search, activeCategory]);

  // Filtered adkar
  const filteredAdkar = useMemo(() => {
    if (!search) return adkar;
    const q = search.toLowerCase();
    return adkar.filter(
      (d) =>
        (d.duaTitle ?? "").toLowerCase().includes(q) ||
        (d.translation ?? "").toLowerCase().includes(q)
    );
  }, [adkar, search]);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Tab bar */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {DUA_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSearch(""); setActiveCategory("All"); }}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all
              ${activeTab === tab.id
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
              }`}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab description */}
      <p className="text-sm text-slate-500 mb-4">
        {DUA_TABS.find((t) => t.id === activeTab)?.description}
      </p>

      {/* Search bar — shown on morning and daily tabs */}
      {(activeTab === "morning" || activeTab === "daily") && (
        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={activeTab === "morning" ? "Search adhkar…" : "Search duas…"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
          />
        </div>
      )}

      {/* Category filter — only on daily tab */}
      {activeTab === "daily" && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all
                ${activeCategory === cat
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ── Morning & Evening Adhkar ──────────────────────────── */}
      {activeTab === "morning" && (
        <div className="flex flex-col gap-4">
          {filteredAdkar.length === 0 && <EmptyState />}
          {filteredAdkar.map((dua, i) => (
            <DailyDuaCard key={`adkar-${dua.id ?? i}`} dua={dua} />
          ))}
        </div>
      )}

      {/* ── Post-Salah Dhikr ──────────────────────────────────── */}
      {activeTab === "postSalah" && (
        <div className="flex flex-col gap-4">
          {postSalah.length === 0 && <EmptyState />}
          {postSalah.map((dhikr, i) => (
            <PostSalahCard key={`salah-${dhikr.id ?? i}`} dhikr={dhikr} />
          ))}
        </div>
      )}

      {/* ── Useful Duas ───────────────────────────────────────── */}
      {activeTab === "daily" && (
        <div className="flex flex-col gap-4">
          {filteredDuas.length === 0 && <EmptyState />}
          {filteredDuas.map((dua, i) => (
            <UsefulDuaCard key={`dua-${dua.id ?? i}`} dua={dua} />
          ))}
        </div>
      )}

      {/* ── Surah Virtues ─────────────────────────────────────── */}
      {activeTab === "virtues" && (
        <div className="flex flex-col gap-4">
          {virtues.length === 0 && <EmptyState />}
          {virtues.map((v, i) => (
            <SurahVirtueCard key={`virtue-${v.id ?? i}`} virtue={v} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Card components ──────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button
      onClick={handleCopy}
      title="Copy Arabic"
      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
    >
      {copied ? (
        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

function DailyDuaCard({ dua }: { dua: DailyDua }) {
  const [expanded, setExpanded] = useState(false);
  const benefits = Object.values(dua.benefits).filter(Boolean);

  return (
    <article className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
        <h2 className="font-bold text-slate-800 text-base leading-snug">
          {dua.duaTitle}
        </h2>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full px-2.5 py-1">
            {dua.times}
          </span>
          <CopyButton text={dua.dua} />
        </div>
      </div>

      {/* Arabic */}
      <div className="px-5 pb-3">
        <p className="text-right text-2xl leading-loose text-slate-800 font-arabic" dir="rtl" lang="ar">
          {dua.dua}
        </p>
      </div>

      <div className="border-t border-slate-100 mx-5" />

      {/* Transliteration */}
      <div className="px-5 py-3">
        <p className="text-sm text-emerald-700 italic leading-relaxed">
          {dua.transliteration}
        </p>
      </div>

      <div className="border-t border-slate-100 mx-5" />

      {/* Translation */}
      <div className="px-5 py-3">
        <p className="text-sm text-slate-600 leading-relaxed">
          {dua.translation}
        </p>
      </div>

      {/* Benefits accordion */}
      {benefits.length > 0 && (
        <>
          <div className="border-t border-slate-100 mx-5" />
          <div className="px-5 py-3">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors w-full text-left"
            >
              <span className={`transition-transform ${expanded ? "rotate-90" : ""}`}>▶</span>
              {expanded ? "Hide" : "Show"} benefits ({benefits.length})
            </button>
            {expanded && (
              <ul className="mt-3 flex flex-col gap-3">
                {benefits.map((b, i) => (
                  <li key={i} className="text-xs text-slate-500 leading-relaxed bg-emerald-50/60 rounded-lg p-3 border border-emerald-100">
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </article>
  );
}

function PostSalahCard({ dhikr }: { dhikr: PostSalahDhikr }) {
  return (
    <article className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow px-5 py-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-bold bg-teal-100 text-teal-700 rounded-full px-2.5 py-1">
          ×{dhikr.repeat}
        </span>
        <CopyButton text={dhikr.arabic} />
      </div>
      <p className="text-right text-2xl leading-loose text-slate-800 mb-3" dir="rtl" lang="ar">
        {dhikr.arabic}
      </p>
      <div className="border-t border-slate-100 my-3" />
      <p className="text-sm text-emerald-700 italic mb-2">{dhikr.transliteration}</p>
      <p className="text-sm text-slate-600">{dhikr.translation}</p>
    </article>
  );
}

function UsefulDuaCard({ dua }: { dua: UsefulDua }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <button
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold rounded-full px-2.5 py-1 flex-shrink-0">
            {dua.category}
          </span>
          <h2 className="font-semibold text-slate-800 text-sm">{dua.title}</h2>
        </div>
        <span className={`text-slate-400 text-xs transition-transform flex-shrink-0 ${expanded ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {expanded && (
        <div className="border-t border-slate-100">
          <div className="px-5 py-4 flex flex-col gap-3">
            <div className="flex justify-end">
              <CopyButton text={dua.arabic} />
            </div>
            <p className="text-right text-2xl leading-loose text-slate-800" dir="rtl" lang="ar">
              {dua.arabic}
            </p>
            <div className="border-t border-slate-100" />
            <p className="text-sm text-emerald-700 italic leading-relaxed">
              {dua.transliteration}
            </p>
            <div className="border-t border-slate-100" />
            <p className="text-sm text-slate-600 leading-relaxed">
              {dua.translation}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}

function SurahVirtueCard({ virtue }: { virtue: SurahVirtue }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <button
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-slate-800">{virtue.name}</h2>
            <span className="text-lg text-emerald-700" dir="rtl">{virtue.arabicName}</span>
          </div>
          <p className="text-xs text-slate-500">📖 Surah {virtue.chapter} · {virtue.when}</p>
        </div>
        <span className={`text-slate-400 text-xs transition-transform flex-shrink-0 mt-1 ${expanded ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 px-5 py-4 flex flex-col gap-3">
          {virtue.virtue && (
            <p className="text-sm text-slate-700 leading-relaxed italic bg-emerald-50 rounded-lg p-3 border border-emerald-100">
              &ldquo;{virtue.virtue}&rdquo;
            </p>
          )}
          {virtue.benefit && (
            <div className="flex gap-2 text-sm text-slate-600">
              <span className="text-emerald-500 flex-shrink-0 mt-0.5">✦</span>
              <span>{virtue.benefit}</span>
            </div>
          )}
          <p className="text-xs text-slate-400 border-t border-slate-100 pt-3">
            Source: {virtue.source}
          </p>
        </div>
      )}
    </article>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 text-slate-400">
      <p className="text-4xl mb-3">🤲</p>
      <p className="font-medium">No results found</p>
      <p className="text-sm mt-1">Try a different search or category</p>
    </div>
  );
}