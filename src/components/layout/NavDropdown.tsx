"use client";

import { useEffect, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, categoryNavigationCopy } from "@/content/categories";

type NavDropdownProps = {
  isActive: boolean;
};

const closeDelayMs = 150;

export default function NavDropdown({ isActive }: NavDropdownProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressFocusOpenRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const cancelScheduledClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = () => {
    cancelScheduledClose();
    setIsOpen(true);
  };

  const scheduleClose = () => {
    cancelScheduledClose();
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      closeTimerRef.current = null;
    }, closeDelayMs);
  };

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isOpen]);

  useEffect(() => () => cancelScheduledClose(), []);

  const closeOnFocusLeave = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      cancelScheduledClose();
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      cancelScheduledClose();
      setIsOpen(false);
      const trigger = rootRef.current?.querySelector("a");
      if (trigger && document.activeElement !== trigger) {
        suppressFocusOpenRef.current = true;
        trigger.focus();
      }
    }
  };

  return (
    <div
      ref={rootRef}
      className="relative z-50"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocusCapture={() => {
        if (suppressFocusOpenRef.current) {
          suppressFocusOpenRef.current = false;
          return;
        }
        openMenu();
      }}
      onBlurCapture={closeOnFocusLeave}
      onKeyDown={handleKeyDown}
    >
      <Link
        href="/projects"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="projects-navigation-panel"
        aria-current={isActive ? "page" : undefined}
        className={`relative inline-flex items-center gap-1.5 py-2 text-base font-medium transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 ${
          isActive ? "text-blue-600" : "text-slate-700"
        }`}
      >
        Projects
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          className={`h-3.5 w-3.5 transition-transform duration-150 ${isOpen ? "rotate-180" : "rotate-0"} motion-reduce:transition-none`}
        >
          <path d="m3.5 6 4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {isActive && <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-4 rounded-full bg-blue-600" />}
      </Link>

      <div
        id="projects-navigation-panel"
        aria-hidden={!isOpen}
        className={`absolute left-1/2 top-full mt-2 w-[280px] -translate-x-1/2 rounded-2xl bg-white p-2 shadow-[0_18px_48px_rgba(15,23,42,0.16)] transition-[opacity,transform,visibility] duration-150 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-1.5 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="space-y-1">
          {categories.map((category) => {
            const href = `/projects/${category.slug}`;
            const categoryIsActive = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <li key={category.slug}>
                <Link
                  href={href}
                  aria-current={categoryIsActive ? "page" : undefined}
                  className="block rounded-xl px-3 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset"
                >
                  <span className="block text-sm font-semibold text-slate-900">{category.title}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{category.summary}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div aria-hidden="true" className="my-2 border-t border-slate-100" />
        <Link
          href="/projects"
          className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset"
        >
          {categoryNavigationCopy.viewAllProjects}
        </Link>
      </div>
    </div>
  );
}
