"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavDropdown from "@/components/layout/NavDropdown";

type MainNavigationProps = {
  navigation: { label: string; href: string }[];
};

export default function MainNavigation({ navigation }: MainNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
      {navigation.map((item) => {
        const isActive = item.href === "/projects"
          ? pathname === item.href || pathname.startsWith(`${item.href}/`)
          : pathname === item.href;

        if (item.href === "/projects") {
          return <NavDropdown key={item.href} isActive={isActive} />;
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`relative py-2 text-base font-medium transition-colors hover:text-blue-600 ${
              isActive ? "text-blue-600" : "text-slate-700"
            }`}
          >
            {item.label}
            {isActive && (
              <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-4 rounded-full bg-blue-600" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
