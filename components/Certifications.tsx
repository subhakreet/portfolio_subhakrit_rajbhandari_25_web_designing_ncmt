import { ArrowUpRight, Award, BadgeCheck, GraduationCap } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const recognition = [
  {
    icon: Award,
    title: "Responsible Disclosure Hall of Fame",
    org: "WebSec · Netherlands",
    text: "Reported a medium-severity vulnerability through the public Responsible Disclosure Program, contributed to its remediation, and earned recognition in WebSec's Hall of Fame.",
    link: {
      label: "Visit Hall of Fame",
      href: "https://www.websec.nl/",
    },
  },
  {
    icon: GraduationCap,
    title: "Continuous Security Education",
    org: "Ongoing Training & Research",
    text: "Consistent investment in offensive security knowledge — hands-on labs, capture-the-flag challenges, and security training aligned with industry-recognized learning paths.",
    link: null,
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Certifications & Recognition"
          title="Credentials and recognition"
          description="Public recognition for responsible security research, alongside a commitment to continuous learning."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {recognition.map(({ icon: Icon, title, org, text, link }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="card-surface group flex h-full flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/25 hover:shadow-glow sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500/12 text-accent-400 shadow-glow">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold tracking-tight text-slate-100 sm:text-lg">
                        {title}
                      </h3>
                      <BadgeCheck className="h-4 w-4 text-accent-400" strokeWidth={1.8} />
                    </div>
                    <p className="mt-0.5 font-mono text-[11px] tracking-wide text-accent-400">{org}</p>
                  </div>
                </div>

                <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-400">{text}</p>

                {link ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl border border-accent-400/25 bg-accent-500/10 px-5 py-2.5 text-sm font-medium text-accent-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-500/20 hover:text-accent-200"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                  </a>
                ) : (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Hands-on Labs", "CTF Challenges", "Security Research"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
