import { Crosshair, Fingerprint, HeartHandshake, ShieldCheck } from "lucide-react";
import education from "@/data/education.json";
import profile from "@/data/profile.json";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const highlights = [
  {
    icon: Crosshair,
    title: "Offensive Security Focus",
    text: "Passion for ethical hacking and application security, driven by a strong analytical mindset and an offensive-first approach.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible Disclosure",
    text: "Committed to responsible disclosure and secure software development awareness — delivering practical remediation, not just findings.",
  },
  {
    icon: HeartHandshake,
    title: "Client Impact",
    text: "Translating deep technical findings into actionable remediation recommendations that strengthen enterprise security posture.",
  },
  {
    icon: Fingerprint,
    title: "Continuous Learning",
    text: "Relentless pursuit of professional growth within offensive security through ongoing research, labs, and real-world engagements.",
  },
];

const facts = [
  { label: "Role", value: profile.role },
  { label: "Location", value: profile.location },
  { label: "Focus", value: "VAPT · Web · API · Mobile · Network" },
  { label: "Approach", value: "Manual-first, business-aware" },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="About Me"
              title="A security professional who thinks like an attacker — and builds like a defender."
            />
            <Reveal delay={0.2}>
              <p className="mt-6 text-base leading-relaxed text-slate-400 sm:text-lg">
                I am a full-time <span className="text-slate-200">Cybersecurity Penetration Tester</span> with a
                genuine passion for offensive security and application security. My work blends rigorous manual
                testing with industry-standard methodologies to uncover vulnerabilities that automated tools
                often miss.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
                With a strong analytical mindset and an unwavering focus on ethical hacking, I help fintech
                companies, banking institutions, and international organizations validate their security
                controls and remediate risk. I believe security findings are only as valuable as the remediation
                that follows — so every assessment I deliver is paired with clear, actionable guidance aligned
                with industry best practices.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map(({ icon: Icon, title, text }, i) => (
                <Reveal key={title} delay={0.08 * i}>
                  <div className="card-surface group h-full rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/25 hover:shadow-glow">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/12 text-accent-400 transition-colors duration-300 group-hover:bg-accent-500/20">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-slate-100">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15} className="lg:sticky lg:top-28 lg:self-start">
            <div className="border-gradient rounded-3xl p-[1px]">
              <div className="rounded-3xl bg-ink-850/80 p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent-400">
                    Profile Snapshot
                  </h3>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-medium text-emerald-300">
                    Available
                  </span>
                </div>

                <div className="mt-7 space-y-6">
                  {facts.map((fact) => (
                    <div key={fact.label} className="border-b border-white/5 pb-5 last:border-0 last:pb-0">
                      <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500">
                        {fact.label}
                      </p>
                      <p className="mt-1.5 text-sm font-medium text-slate-200">{fact.value}</p>
                    </div>
                  ))}
                </div>

                <blockquote className="mt-8 rounded-2xl bg-white/[0.03] p-5">
                  <p className="text-sm italic leading-relaxed text-slate-300">
                    “Security is not a product — it is an ongoing discipline of understanding risk and
                    reducing it, responsibly and with precision.”
                  </p>
                </blockquote>

                <div className="mt-6 flex flex-wrap gap-2">
                  {education.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
