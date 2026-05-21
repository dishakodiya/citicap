export default function ProductsLoading() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 h-24 animate-pulse rounded-2xl bg-slate-200" />
        <div className="mb-8 h-14 animate-pulse rounded-2xl bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl bg-slate-100">
              <div className="aspect-square animate-pulse bg-slate-200" />
              <div className="h-36 animate-pulse bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
