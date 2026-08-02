import { Briefcase, CheckCircle2 } from "lucide-react";
import experience from "@/data/experience.json";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Professional Experience"
          description="Delivering offensive security engagements with measurable impact for enterprise clients — without exposing confidential client information."
        />

        <div className="relative mt-14">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-500/50 via-white/10 to-transparent sm:left-[23px]" />

          <div className="space-y-10">
            {experience.roles.map((role, i) => (
              <Reveal key={role.title} delay={i * 0.08}>
                <article className="relative pl-14 sm:pl-20">
                  <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-xl border border-accent-400/25 bg-ink-850 text-accent-400 shadow-glow sm:h-12 sm:w-12">
                    <Briefcase className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.6} />
                  </span>

                  <div className="card-surface rounded-2xl p-6 transition-all duration-300 hover:border-accent-400/20 sm:p-8">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <h3 className="text-lg font-semibold tracking-tight text-slate-100 sm:text-xl">
                        {role.title}
                      </h3>
                      <span className="rounded-full bg-accent-500/12 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-300">
                        {role.type}
                      </span>
                      <span className="ml-auto rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-slate-400">
                        {role.period}
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-medium text-accent-400">
                      {role.organization} · {role.location}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                      {role.summary}
                    </p>

                    <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {role.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" strokeWidth={1.8} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-14">
          <div className="border-gradient rounded-3xl p-[1px]">
            <div className="rounded-3xl bg-ink-850/70 p-7 sm:p-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent-400">
                Core Responsibilities
              </h3>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {experience.responsibilities.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400/35 hover:bg-accent-500/10 hover:text-slate-100"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
