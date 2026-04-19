export default function Loading() {
  return (
    <main className="mx-auto p-6">
      {/* Title skeleton */}
      <div className="h-10 w-72 bg-slate-200 rounded-lg animate-pulse mb-6" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="p-4 bg-indigo-50 rounded-lg animate-pulse"
            style={{ animationDelay: `${(i % 8) * 60}ms` }}
          >
            {/* Arabic name */}
            <div className="flex justify-end mb-2">
              <div className="h-6 w-20 bg-indigo-200 rounded" />
            </div>
            {/* Transliteration */}
            <div className="h-4 w-24 bg-slate-200 rounded mb-1.5" />
            {/* Meaning */}
            <div className="h-4 w-32 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}