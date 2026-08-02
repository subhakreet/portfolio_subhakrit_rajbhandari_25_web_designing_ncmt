import {
  FileCode2,
  Globe,
  Monitor,
  Network,
  Plug,
  Radar,
  Search,
  Smartphone,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const areas = [
  {
    icon: Radar,
    title: "Vulnerability Assessment & Penetration Testing",
    text: "End-to-end VAPT engagements combining automated scans with deep manual validation and business-logic analysis.",
  },
  {
    icon: Globe,
    title: "Web Application Security",
    text: "Testing enterprise web platforms against OWASP Top 10 with realistic exploit paths and proof-of-concept development.",
  },
  {
    icon: Plug,
    title: "API Security Testing",
    text: "Assessing authentication, authorization, and logic flaws in REST and GraphQL APIs that power critical services.",
  },
  {
    icon: Smartphone,
    title: "Mobile Application Security",
    text: "iOS and Android security testing including traffic interception, storage analysis, and binary inspection.",
  },
  {
    icon: Network,
    title: "Network Penetration Testing",
    text: "External and internal infrastructure assessments covering segmentation, services, and lateral movement.",
  },
  {
    icon: Monitor,
    title: "Thick Client Security Testing",
    text: "Desktop application testing including decompilation, insecure storage, and transport-level weaknesses.",
  },
  {
    icon: Search,
    title: "Vulnerability Assessment",
    text: "Structured discovery and risk-ranked findings mapped to real business impact and remediation priority.",
  },
  {
    icon: FileCode2,
    title: "Source Code Review",
    text: "Auditing application code for injection, auth, and cryptographic flaws with actionable, fix-level guidance.",
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Core Expertise"
          title="What I bring to every engagement"
          description="A focused offensive security practice built on manual testing rigor, deep vulnerability knowledge, and remediation-first reporting."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.07}>
              <div className="card-surface group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-400/25 hover:shadow-glow">
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent-500/0 blur-2xl transition-all duration-500 group-hover:bg-accent-500/15" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-accent-400 transition-all duration-300 group-hover:scale-110 group-hover:border-accent-400/35 group-hover:bg-accent-500/12">
                  <Icon className="h-5.5 w-5.5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 text-base font-semibold leading-snug tracking-tight text-slate-100">
                  {title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
