import Image from "next/image";
import Card from "@/components/ui/Card";
import SocialLinks from "@/components/ui/SocialLinks";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import { home } from "@/content/home";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section className="relative mx-8 my-8 flex flex-1 flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_rgba(30,64,175,0.10)] lg:min-h-[calc(100vh-4rem)]">
      <Header />
      <div className="pointer-events-none absolute inset-0 z-10 mx-auto hidden w-full max-w-7xl grid-cols-[1fr_1.55fr_0.75fr] grid-rows-1 gap-8 px-6 lg:grid">
        <div />
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 z-0 aspect-square h-[70%] -translate-x-1/2 rounded-full bg-slate-50 shadow-[0_0_72px_rgba(148,163,184,0.16)]"
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
            <div className="flex flex-1 items-center py-12 lg:py-0">
              <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.55fr_0.75fr]">
                <div className="relative z-20 flex min-w-0 flex-col justify-center">
                  <p>{home.intro}</p>
                  <h1 className="mb-6 font-display text-[clamp(2rem,5vw,3.75rem)] tracking-[0.04em] lg:text-[clamp(2.25rem,3.4vw,2.75rem)]">{site.name}</h1>
                  <p className="text-lg text-gray-600">{home.bio}</p>
                </div>

                <div className="hidden min-w-0 lg:block" aria-hidden="true" />

                <div className="relative z-20 flex min-w-0 flex-col gap-5 lg:justify-center">
                  {home.cards.map((card, index) => (
                    <div
                      key={card.title}
                      className={index === 1 ? "self-end" : "self-start"}
                    >
                      <Card title={card.title} image={card.image} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-auto lg:pb-8">
              <SocialLinks />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
