export default function Loading() {
  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-6">
      {/* Title skeleton */}
      <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse" />

      <div className="flex flex-col gap-6 py-12">
        {Array.from({ length: 5 }).map((_, i) => (
          <li
            key={i}
            className="list-none bg-white p-4 rounded-lg animate-pulse flex flex-col gap-3"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Title */}
            <div className="h-6 w-48 bg-slate-200 rounded" />
            {/* Description */}
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-2/3 bg-slate-100 rounded" />
            {/* Audio player placeholder */}
            <div className="h-10 w-full max-w-sm bg-slate-200 rounded-full mt-1" />
          </li>
        ))}
      </div>
    </main>
  );
}