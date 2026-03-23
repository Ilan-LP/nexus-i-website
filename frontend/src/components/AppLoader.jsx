export default function AppLoader() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-mist px-6 text-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_45%)]" />
      <div className="relative w-full max-w-sm rounded-3xl border border-black/10 bg-white/80 p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-black/15 border-t-ink" />
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">Nexus-I</p>
            <p className="text-sm text-stone">Loading experience...</p>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="h-2 w-full animate-pulse rounded-full bg-black/10" />
          <div className="h-2 w-10/12 animate-pulse rounded-full bg-black/10" />
          <div className="h-2 w-8/12 animate-pulse rounded-full bg-black/10" />
        </div>
      </div>
    </div>
  );
}
