export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-10 flex flex-col items-center gap-2">
        <div className="h-9 w-32 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-4 w-72 bg-slate-100 rounded animate-pulse" />
        <div className="h-3 w-48 bg-slate-100 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-xl border-2 border-slate-100 bg-slate-50 animate-pulse"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200" />
              <div className="h-6 w-24 bg-slate-200 rounded" />
            </div>
            <div className="mt-3 h-5 w-40 bg-slate-200 rounded" />
            <div className="mt-1.5 h-3 w-56 bg-slate-100 rounded" />
            <div className="mt-4 h-5 w-24 bg-slate-100 rounded-full" />
          </div>
        ))}
      </div>
    </main>
  );
}