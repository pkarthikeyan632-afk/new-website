import Image from "next/image";
import Card from "@/components/ui/Card";
import SocialLinks from "@/components/ui/SocialLinks";
import Container from "@/components/layout/Container";
import { home } from "@/content/home";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section className="mx-8 my-8 flex flex-1 items-center rounded-[2rem] bg-white py-16 shadow-[0_24px_80px_rgba(30,64,175,0.10)]">
      <Container>
        <div className="grid grid-cols-3 items-center gap-8">
          <div>
            <p>{home.intro}</p>
            <h1 className="font-display text-6xl tracking-[0.04em]">{site.name}</h1>
            <p>{home.bio}</p>
          </div>

          <Image
            className="h-auto w-full"
            src="/images/portrait.png"
            alt={`Portrait of ${site.name}`}
            width={600}
            height={800}
            priority
          />

          <div className="flex flex-col gap-5">
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
        <div className="mt-12">
          <SocialLinks />
        </div>
      </Container>
    </section>
  );
}
