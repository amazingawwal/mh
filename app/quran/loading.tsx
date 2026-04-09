export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="text-center mb-10 flex flex-col items-center gap-3">
        <div className="h-10 w-80 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-4 w-56 bg-slate-100 rounded animate-pulse" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 animate-pulse"
            style={{ animationDelay: `${(i % 6) * 60}ms` }}
          >
            <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-4 w-32 bg-slate-200 rounded" />
              <div className="h-3 w-48 bg-slate-100 rounded" />
            </div>
            <div className="h-6 w-16 bg-slate-200 rounded flex-shrink-0" />
          </div>
        ))}
      </div>
    </main>
  );
}