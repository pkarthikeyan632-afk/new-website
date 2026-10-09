import type { CSSProperties } from "react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import SocialLinks from "@/components/ui/SocialLinks";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import { home } from "@/content/home";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section className="relative mx-2 my-2 flex min-h-[calc(100svh-1rem)] flex-1 flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f8faff] to-[#eef3fa] shadow-[0_32px_96px_rgba(30,64,175,0.18),0_10px_28px_rgba(15,23,42,0.08)] md:mx-8 md:my-8 md:min-h-auto lg:min-h-[calc(100vh-4rem)]">
      <Header />
      <div className="pointer-events-none absolute inset-0 z-10 mx-auto hidden w-full max-w-7xl grid-cols-[1fr_1.55fr_0.75fr] grid-rows-1 gap-8 px-6 lg:grid">
        <div />
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 z-0 aspect-square h-[70%] -translate-x-1/2 rounded-full bg-[#e5edf8] shadow-[0_0_88px_rgba(148,163,184,0.30)]"
          />
          <Image
            className="absolute bottom-0 left-1/2 z-10 hidden h-[80%] w-auto max-w-full -translate-x-1/2 object-contain object-bottom drop-shadow-[0_14px_18px_rgba(15,23,42,0.10)] lg:block"
            src="/images/portrait-cutout.png"
            alt={`Portrait of ${site.name}`}
            width={1102}
            height={1428}
            priority
          />
        </div>
        <div />
      </div>
      <div className="flex flex-1 items-stretch">
        <Container>
          <div className="flex h-full flex-col">
            <div className="flex flex-1 items-start py-5 md:items-center md:py-12 lg:py-0">
              <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.55fr_0.75fr]">
                <div className="relative z-20 flex min-w-0 flex-col justify-center">
                  <p>{home.intro}</p>
                  <h1 className="mb-4 font-display text-[clamp(1.8rem,8vw,3.25rem)] tracking-[0.02em] md:mb-6 md:text-[clamp(2rem,5vw,3.75rem)] md:tracking-[0.04em] lg:text-[clamp(2.4rem,3.4vw,2.85rem)] lg:tracking-[0.02em]">{site.name}</h1>
                  <p className="text-balance text-lg text-gray-600">{home.bio}</p>
                </div>

                <div className="hidden min-w-0 lg:block" aria-hidden="true" />

                <div className="relative z-20 grid min-w-0 grid-cols-3 items-start gap-1 md:flex md:flex-col md:gap-5 lg:hidden">
                  {home.cards.map((card, index) => (
                    <div
                      key={card.title}
                      className={index === 1 ? "justify-self-center md:self-end" : "justify-self-center md:self-start"}
                    >
                      <Card href={card.href} title={card.title} animation={card.animation} scale={1} />
                    </div>
                  ))}
                </div>

                <div className="relative mx-auto h-[min(42vh,24rem)] w-full max-w-[20rem] md:hidden">
                  <Image
                    className="absolute bottom-0 left-1/2 h-full w-auto max-w-full -translate-x-1/2 object-contain object-bottom drop-shadow-[0_14px_18px_rgba(15,23,42,0.10)]"
                    src="/images/portrait-cutout.png"
                    alt={`Portrait of ${site.name}`}
                    width={1102}
                    height={1428}
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 pb-5 md:mt-12 md:pb-0 lg:mt-auto lg:pb-8">
              <SocialLinks />
            </div>
          </div>
        </Container>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 mx-auto hidden w-full max-w-7xl grid-cols-[1fr_1.55fr_0.75fr] gap-8 px-6 pt-[5.25rem] pb-6 lg:grid">
        <div />
        <div />
        <div className="relative">
          <div className="right-floating-container absolute top-[5.25rem] bottom-6">
            {home.cards.map((card) => (
              <div
                key={card.title}
                data-position={card.position.key}
                className="right-floating-item"
                style={
                  {
                    "--item-top": card.position.top,
                    "--item-left": card.position.left,
                  } as CSSProperties
                }
              >
                <Card href={card.href} title={card.title} animation={card.animation} scale={card.scale} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
