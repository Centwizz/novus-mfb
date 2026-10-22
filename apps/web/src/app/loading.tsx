export default function Loading() {
  return (
    <div className="container-page flex min-h-[50vh] items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <span
          className="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-700"
          role="status"
          aria-label="Loading"
        />
        <p className="text-sm text-ink-muted">Loading…</p>
      </div>
    </div>
  );
}
