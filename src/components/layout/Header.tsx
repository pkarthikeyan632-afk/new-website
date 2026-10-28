import Link from "next/link";
import Container from "@/components/layout/Container";
import DesktopNav from "@/components/layout/DesktopNav";
import MobileMenu from "@/components/layout/MobileMenu";
import { site } from "@/content/site";

export default function Header() {
  return (
    <header className="site-header relative z-30 w-full">
      <Container>
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center">
          <Link
            href="/"
            aria-label={`${site.logo} home`}
            className="justify-self-start text-3xl font-extrabold tracking-tight text-slate-950"
          >
            {site.logo}<span className="text-blue-600">.</span>
          </Link>

          <DesktopNav navigation={site.navigation} />

          <Link
            href={site.callToAction.href}
            className="site-header-cta hidden justify-self-end rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 md:inline"
          >
            {site.callToAction.label}
          </Link>
          <MobileMenu navigation={site.navigation} callToAction={site.callToAction} />
        </div>
      </Container>
    </header>
  );
}

