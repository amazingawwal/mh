export default function Loading() {
  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-6">
      {/* Title skeleton */}
      <div className="h-10 w-64 bg-slate-200 rounded-lg animate-pulse" />

      <div className="flex flex-col gap-12 py-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <article
            key={i}
            className="flex flex-col-reverse gap-4 md:grid md:grid-cols-12 md:gap-0 animate-pulse"
          >
            {/* Category tag */}
            <div className="md:col-span-2 md:pt-1">
              <div className="h-6 w-20 bg-slate-200 rounded-full" />
            </div>
            {/* Title + author */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="h-7 w-3/4 bg-slate-200 rounded-md" />
              <div className="h-7 w-1/2 bg-slate-200 rounded-md" />
              <div className="flex gap-3 mt-2">
                <div className="h-5 w-24 bg-slate-200 rounded-md" />
                <div className="h-5 w-20 bg-slate-200 rounded-md" />
              </div>
            </div>
            {/* Image */}
            <div className="md:col-start-9 md:col-span-4">
              <div className="h-32 w-full bg-slate-200 rounded-lg" />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}