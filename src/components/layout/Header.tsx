import Link from "next/link";
import Container from "@/components/layout/Container";
import MainNavigation from "@/components/layout/MainNavigation";
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

          <MainNavigation navigation={site.navigation} />

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
