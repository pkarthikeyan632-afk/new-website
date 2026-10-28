type PageHeadingProps = {
  title: string;
  intro: string;
  variant?: "index" | "category";
};

export default function PageHeading({ title, intro, variant = "index" }: PageHeadingProps) {
  return (
    <>
      <h1 className="font-display text-4xl font-bold text-slate-950 sm:text-5xl">{title}</h1>
      <p className={variant === "category" ? "mt-5 max-w-2xl text-lg leading-relaxed text-slate-600" : "mt-3 max-w-2xl text-base leading-relaxed text-slate-600"}>
        {intro}
      </p>
    </>
  );
}