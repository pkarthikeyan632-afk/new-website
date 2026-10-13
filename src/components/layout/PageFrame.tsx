import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";

type PageFrameProps = {
  children: ReactNode;
  aboutScrollSnap?: boolean;
};

export default function PageFrame({ children, aboutScrollSnap = false }: PageFrameProps) {
  return (
    <section className={`relative mx-2 my-2 flex min-h-[calc(100svh-1rem)] flex-1 flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f8faff] to-[#eef3fa] shadow-[0_32px_96px_rgba(30,64,175,0.18),0_10px_28px_rgba(15,23,42,0.08)] md:mx-8 md:my-8 md:min-h-auto lg:min-h-[calc(100vh-4rem)] ${aboutScrollSnap ? "about-scroll-container" : ""}`}>
      <Header />
      <main className="flex w-full flex-1">
        <Container>
          <div className="mx-auto w-full max-w-[90rem]">{children}</div>
        </Container>
      </main>
    </section>
  );
}
