import { GraduationCap, School } from "lucide-react";
import education from "@/data/education.json";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Education"
          title="Academic Foundation"
          description="Formal training in cybersecurity and networking that underpins a hands-on offensive security practice."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="border-gradient h-full rounded-3xl p-[1px]">
              <div className="flex h-full items-start gap-5 rounded-3xl bg-ink-850/80 p-7 sm:p-8">
                <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-accent-500/12 text-accent-400 shadow-glow">
                  <GraduationCap className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <div>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                    Bachelor&apos;s Degree
                  </span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-100">
                    {education.degree}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                    <School className="h-4 w-4 text-accent-400" strokeWidth={1.7} />
                    {education.institution}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{education.note}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-surface h-full rounded-3xl p-7 sm:p-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent-400">
                Areas of Study
              </h3>
              <ul className="mt-5 space-y-3.5">
                {education.focus.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl bg-white/[0.03] p-4 text-sm leading-relaxed text-slate-500">
                Continuous self-study in offensive security keeps this foundation sharp and current —
                from OWASP Top 10 to emerging attack surfaces.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
