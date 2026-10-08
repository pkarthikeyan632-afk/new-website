import Image from "next/image";

type CardProps = {
  title: string;
  image: string;
};

export default function Card({ title, image }: CardProps) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
      <Image src={image} alt="" width={320} height={180} className="h-auto w-full" />
      <p className="p-5">{title}</p>
    </article>
  );
}
