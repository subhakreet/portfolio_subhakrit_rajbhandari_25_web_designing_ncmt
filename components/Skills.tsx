"use client";

import { motion } from "framer-motion";
import { BookOpen, Crosshair, Search, Shield } from "lucide-react";
import skills from "@/data/skills.json";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const iconMap = {
  crosshair: Crosshair,
  shield: Shield,
  search: Search,
  book: BookOpen,
} as const;

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Technical capabilities"
          description="Categorized skill areas with confidence levels shaped by hands-on enterprise engagements, rather than coursework alone."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.categories.map((category, c) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] ?? Crosshair;

            return (
              <Reveal key={category.title} delay={c * 0.08}>
                <div className="card-surface h-full rounded-2xl p-6 transition-all duration-300 hover:border-accent-400/20 hover:shadow-glow">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500/12 text-accent-400">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
                    </span>
                    <h3 className="text-sm font-semibold tracking-tight text-slate-100">
                      {category.title}
                    </h3>
                  </div>

                  <ul className="mt-6 space-y-4">
                    {category.skills.map((skill) => (
                      <li key={skill.name}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300">{skill.name}</span>
                          <span className="font-mono text-slate-500">{skill.level}%</span>
                        </div>
                        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-accent-600 via-accent-400 to-glow"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 1.1, delay: 0.15 + c * 0.05, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
