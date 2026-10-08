import type { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";

export function Table({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        {children}
      </table>
    </div>
  );
}

export function Th({ className = "", ...rest }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope="col"
      className={`border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 ${className}`}
      {...rest}
    />
  );
}

export function Td({ className = "", ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={`border-b border-zinc-100 px-4 py-3 align-top text-zinc-800 dark:border-zinc-800/70 dark:text-zinc-200 ${className}`} {...rest} />;
}

/** Right-aligned cell for row actions. */
export function ActionsTd({ children }: { children: ReactNode }) {
  return (
    <td className="border-b border-zinc-100 px-4 py-2 text-right whitespace-nowrap dark:border-zinc-800/70">
      <div className="inline-flex gap-1">{children}</div>
    </td>
  );
}
