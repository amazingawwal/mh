export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8 flex flex-col items-center gap-3">
        <div className="h-9 w-72 bg-emerald-100 rounded-lg animate-pulse" />
        <div className="h-8 w-44 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-4 w-80 bg-slate-100 rounded animate-pulse" />
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 h-10 w-36 bg-slate-200 rounded-xl animate-pulse"
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-100 bg-white p-6 animate-pulse"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-6 w-52 bg-slate-200 rounded" />
              <div className="h-6 w-10 bg-emerald-100 rounded-full" />
            </div>
            {/* Arabic */}
            <div className="flex flex-col items-end gap-2 mb-4">
              <div className="h-7 w-3/4 bg-slate-100 rounded" />
              <div className="h-7 w-2/3 bg-slate-100 rounded" />
            </div>
            <div className="border-t border-slate-100 my-3" />
            {/* Transliteration */}
            <div className="h-4 w-full bg-slate-100 rounded mb-2" />
            <div className="h-4 w-5/6 bg-slate-100 rounded mb-4" />
            {/* Translation */}
            <div className="h-4 w-full bg-slate-50 rounded mb-1.5" />
            <div className="h-4 w-4/5 bg-slate-50 rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}