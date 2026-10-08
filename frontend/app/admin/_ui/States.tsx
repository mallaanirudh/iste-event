import type { ReactNode } from "react";
import Button from "./Button";

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
      <p className="font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
      {children && <p className="mx-auto mt-1 max-w-[50ch] text-sm text-zinc-600 dark:text-zinc-400">{children}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/60 dark:text-red-100" role="alert">
      <p className="font-medium">Couldn&apos;t load this data.</p>
      <p className="mt-1">{message}</p>
      {onRetry && <Button variant="secondary" size="sm" className="mt-3" onClick={onRetry}>Try again</Button>}
    </div>
  );
}

/** Placeholder rows shaped like the table that will replace them. */
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900" aria-busy="true" aria-label="Loading">
      <div className="h-10 border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60" />
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="flex gap-6 border-b border-zinc-100 px-4 py-4 last:border-0 dark:border-zinc-800/70">
          {Array.from({ length: cols }, (_, c) => (
            <div key={c} className="h-3.5 flex-1 animate-pulse rounded bg-zinc-200 motion-reduce:animate-none dark:bg-zinc-800" style={{ maxWidth: c === 0 ? 220 : 140 }} />
          ))}
        </div>
      ))}
    </div>
  );
}
