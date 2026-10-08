import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const control =
  "w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-500 " +
  "focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600/25 " +
  "disabled:bg-zinc-100 disabled:text-zinc-500 aria-[invalid=true]:border-red-600 " +
  "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:disabled:bg-zinc-800";

/** Label above, control, then hint or error below. */
export function Field({
  id, label, hint, error, required, children,
}: { id: string; label: string; hint?: ReactNode; error?: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {label}
        {required && <span className="ml-0.5 text-red-700 dark:text-red-400" aria-hidden="true">*</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-red-700 dark:text-red-400">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-zinc-600 dark:text-zinc-400">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ className = "", ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${control} h-10 ${className}`} {...rest} />;
}

export function Textarea({ className = "", ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${control} min-h-24 py-2 ${className}`} {...rest} />;
}

export function Select({ className = "", ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={`${control} h-10 pr-8 ${className}`} {...rest} />;
}
