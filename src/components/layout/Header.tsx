import Link from "next/link";
import Container from "@/components/layout/Container";
import MobileMenu from "@/components/layout/MobileMenu";
import { site } from "@/content/site";

export default function Header() {
  return (
    <header className="w-full pt-6 sm:pt-8">
      <Container>
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center">
          <Link
            href="/"
            aria-label={`${site.logo} home`}
            className="justify-self-start text-3xl font-extrabold tracking-tight text-slate-950"
          >
            {site.logo}<span className="text-blue-600">.</span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            {site.navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={index === 0 ? "page" : undefined}
                className={`relative py-2 text-base font-medium transition-colors hover:text-blue-600 ${
                  index === 0 ? "text-blue-600" : "text-slate-700"
                }`}
              >
                {item.label}
                {index === 0 && (
                  <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-4 rounded-full bg-blue-600" />
                )}
              </Link>
            ))}
          </nav>

          <Link
            href={site.callToAction.href}
            className="hidden justify-self-end rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold tracking-[0.12em] text-white shadow-[0_8px_24px_rgba(37,99,235,0.24)] transition-colors hover:bg-blue-700 md:inline"
          >
            {site.callToAction.label}
          </Link>
          <MobileMenu navigation={site.navigation} callToAction={site.callToAction} />
        </div>
      </Container>
    </header>
  );
}
