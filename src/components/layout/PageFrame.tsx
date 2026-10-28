import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";

type PageFrameProps = {
  children: ReactNode;
};

export default function PageFrame({ children }: PageFrameProps) {
  return (
    <section className="site-frame relative mx-2 my-2 flex flex-1 flex-col bg-gradient-to-br from-[#f8faff] to-[#eef3fa] md:mx-8 md:my-8">
      <Header />
      <main className="site-main flex w-full flex-1">
        <Container>{children}</Container>
      </main>
    </section>
  );
}
