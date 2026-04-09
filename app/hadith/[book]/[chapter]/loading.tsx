export default function Loading() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-12 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 w-2 bg-slate-100 rounded" />
        <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 w-2 bg-slate-100 rounded" />
        <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
      </div>

      {/* Chapter header */}
      <div className="mb-8 p-5 bg-emerald-50 rounded-2xl border border-emerald-100 animate-pulse">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="h-3 w-28 bg-emerald-200 rounded" />
            <div className="h-6 w-56 bg-slate-200 rounded" />
            <div className="h-4 w-20 bg-slate-100 rounded" />
          </div>
          <div className="h-7 w-24 bg-emerald-100 rounded" />
        </div>
      </div>

      {/* Hadith skeletons */}
      <div className="flex flex-col gap-6 mt-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-100 bg-white p-5 animate-pulse"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Badge */}
            <div className="h-6 w-36 bg-emerald-50 rounded-full mb-4" />
            {/* Arabic */}
            <div className="flex flex-col items-end gap-2 mb-4">
              <div className="h-5 w-5/6 bg-slate-100 rounded" />
              <div className="h-5 w-4/6 bg-slate-100 rounded" />
              <div className="h-5 w-3/4 bg-slate-100 rounded" />
            </div>
            <div className="border-t border-slate-100 my-4" />
            {/* Narrator */}
            <div className="h-4 w-48 bg-emerald-100 rounded mb-2" />
            {/* English text */}
            <div className="flex flex-col gap-1.5">
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-4/5 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}