export default function Loading() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* Back link skeleton */}
      <div className="h-4 w-32 bg-slate-200 rounded animate-pulse mb-6" />

      {/* Header skeleton */}
      <div className="text-center mb-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center gap-3 animate-pulse">
        <div className="h-10 w-64 bg-emerald-100 rounded-lg" />
        <div className="h-7 w-40 bg-slate-200 rounded-lg" />
        <div className="h-4 w-52 bg-slate-100 rounded" />
        <div className="h-10 w-72 bg-slate-200 rounded-full mt-2" />
      </div>

      {/* Bismillah skeleton */}
      <div className="flex justify-center mb-8">
        <div className="h-8 w-72 bg-emerald-50 rounded animate-pulse" />
      </div>

      {/* Verse skeletons */}
      <div className="flex flex-col gap-6">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-100 bg-white p-5 animate-pulse"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex justify-between mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100" />
              <div className="h-4 w-10 bg-slate-100 rounded" />
            </div>
            {/* Arabic line */}
            <div className="flex justify-end gap-2 mb-4">
              <div className="h-8 w-3/4 bg-slate-100 rounded" />
            </div>
            <div className="border-t border-slate-100 my-3" />
            {/* English lines */}
            <div className="flex flex-col gap-1.5">
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-5/6 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}