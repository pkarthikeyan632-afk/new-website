"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/lib/navigation";

type MobileMenuProps = {
  navigation: { label: string; href: string }[];
  callToAction: { label: string; href: string };
};

export default function MobileMenu({ navigation, callToAction }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative justify-self-end md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm"
      >
        <span className="h-0.5 w-4 rounded-full bg-current" />
        <span className="h-0.5 w-4 rounded-full bg-current" />
        <span className="h-0.5 w-4 rounded-full bg-current" />
      </button>

      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="absolute right-0 top-full z-50 mt-2 flex w-64 max-w-[calc(100vw-2rem)] flex-col gap-1 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl"
        >
          {navigation.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-slate-50 hover:text-blue-600 ${
                  isActive ? "bg-blue-50 text-blue-700" : "text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={callToAction.href}
            onClick={() => setIsOpen(false)}
            className="mt-1 rounded-full bg-blue-600 px-4 py-3 text-center text-xs font-semibold tracking-[0.12em] text-white shadow-sm hover:bg-blue-700"
          >
            {callToAction.label}
          </Link>
        </nav>
      )}
    </div>
  );
}
