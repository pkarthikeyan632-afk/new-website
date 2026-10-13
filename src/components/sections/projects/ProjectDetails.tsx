import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/content/categories";
import type { Project } from "@/content/projects";

type ProjectDetailsProps = {
  category: Category;
  project: Project;
};

export default function ProjectDetails({ category, project }: ProjectDetailsProps) {
  return (
    <article className="project-detail-content max-w-4xl pb-16">
            <Link
              href={`/projects/${category.slug}`}
              className="mb-8 inline-block rounded-md text-sm font-medium text-blue-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
            >
              Back to {category.title}
            </Link>
            {project.image && (
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
              </div>
            )}
            <p className="text-sm font-medium text-blue-700">{category.title}</p>
            <h1 className="mt-3 font-display text-4xl text-slate-950 sm:text-5xl">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{project.oneLine}</p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <section>
                <h2 className="text-xl font-semibold text-slate-900">Problem</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{project.problem}</p>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-slate-900">Solution</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{project.solution}</p>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-slate-900">How it works</h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-slate-600">
                  {project.howItWorks.map((step, index) => <li key={`${index}-${step}`}>{step}</li>)}
                </ol>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-slate-900">Technology</h2>
                <ul className="mt-3 space-y-3 text-slate-600">
                  {project.stack.map((item) => (
                    <li key={item.name}>
                      <span className="font-medium text-slate-800">{item.name}</span>: {item.why}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-slate-900">Result</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{project.result}</p>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-slate-900">What I learned</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{project.learned}</p>
              </section>
            </div>

            <dl className="mt-10 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-slate-900">Role</dt>
                <dd className="mt-1 text-slate-600">{project.role}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Duration</dt>
                <dd className="mt-1 text-slate-600">{project.duration}</dd>
              </div>
            </dl>

            {project.links.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <a
                      href={link.href}
                      className="font-medium text-blue-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
    </article>
  );
}
