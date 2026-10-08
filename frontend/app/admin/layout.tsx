import type { Metadata } from "next";
import type { ReactNode } from "react";
import Toaster from "./_ui/Toaster";

export const metadata: Metadata = {
  title: { template: "%s · ISTE Admin", default: "ISTE Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full flex-1 flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Toaster>{children}</Toaster>
    </div>
  );
}
