import { ArrowUpRight, Award, Building2, Lock, ShieldCheck } from "lucide-react";
import projects from "@/data/projects.json";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const iconMap = {
  building: Building2,
  award: Award,
} as const;

export function Highlights() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Professional Highlights"
          description="A selection of engagements and recognitions — described without disclosing any confidential client information."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.featured.map((project, i) => {
            const Icon = iconMap[project.icon as keyof typeof iconMap] ?? Lock;
            const isHall = Boolean(project.link);

            return (
              <Reveal key={project.title} delay={i * 0.1}>
                <article className="border-gradient group relative h-full overflow-hidden rounded-3xl p-[1px]">
                  <div className="flex h-full flex-col rounded-3xl bg-ink-850/80 p-7 sm:p-9">
                    <div className="flex items-center justify-between">
                      <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-accent-500/12 text-accent-400 shadow-glow">
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        <ShieldCheck className="h-3 w-3 text-accent-400" strokeWidth={2} />
                        {project.category}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-100 sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400 sm:text-base">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {isHall && project.link ? (
                      <a
                        href={project.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl border border-accent-400/25 bg-accent-500/10 px-5 py-2.5 text-sm font-medium text-accent-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-500/20 hover:text-accent-200"
                      >
                        {project.link.label}
                        <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
