import Link from "next/link";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import type { ExpertiseEntry } from "@/content/expertise";

type ExpertiseHeroProps = {
  entry: ExpertiseEntry;
};

export default function ExpertiseHero({ entry }: ExpertiseHeroProps) {
  return (
    <>
      <Header />
      <main className="flex w-full flex-1">
        <Container>
          <section className="mx-auto flex min-h-[60vh] max-w-4xl flex-col justify-center py-16">
            <Link
              href="/"
              className="mb-8 w-fit rounded-md text-sm font-medium text-blue-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
            >
              Back to home
            </Link>
            <h1 className="font-display text-4xl text-slate-950 sm:text-5xl">
              {entry.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              {entry.summary}
            </p>
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-slate-900">Projects</h2>
              {entry.projects.length === 0 ? (
                <p className="mt-3 text-slate-600">Projects coming soon.</p>
              ) : (
                <ul className="mt-3 list-disc pl-5 text-slate-600">
                  {entry.projects.map((project) => <li key={project}>{project}</li>)}
                </ul>
              )}
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}
