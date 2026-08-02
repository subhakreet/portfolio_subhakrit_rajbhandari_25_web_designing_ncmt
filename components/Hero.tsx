"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bug, Download, MousePointerClick, ShieldCheck } from "lucide-react";
import profile from "@/data/profile.json";
import { AnimatedCounter } from "./AnimatedCounter";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 1.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-24 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10 lg:pt-40">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-slate-400">
              {profile.role}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-slate-50 sm:text-5xl lg:text-6xl"
          >
            {profile.name.split(" ")[0]}{" "}
            <span className="text-gradient">{profile.name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 font-mono text-sm tracking-wide text-accent-400 sm:text-base"
          >
            {"< "}Cybersecurity Penetration Tester{" />"}
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#experience"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              <ShieldCheck className="h-4.5 w-4.5" strokeWidth={1.8} />
              View Experience
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
            </a>
            <a
              href="/files/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400/40 hover:text-white"
            >
              <Download className="h-4.5 w-4.5" strokeWidth={1.8} />
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:text-accent-400"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-4"
          >
            {profile.stats.map((stat) => (
              <div key={stat.label} className="bg-ink-900/90 px-5 py-6">
                <dd className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-1.5 text-xs leading-snug text-slate-500">{stat.label}</dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-fit"
        >
          <div className="absolute -inset-8 rounded-full bg-accent-500/10 blur-3xl" />

          <div className="relative">
            <div className="border-gradient rounded-[2rem] p-2 shadow-glow">
              <div className="overflow-hidden rounded-3xl bg-ink-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/profile/avatar.svg"
                  alt="Subhakrit Rajbhandari"
                  width={420}
                  height={420}
                  className="h-[300px] w-[300px] sm:h-[380px] sm:w-[380px]"
                  draggable={false}
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              className="glass absolute -right-3 top-8 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 sm:-right-6"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400">
                <Bug className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-100">VAPT Specialist</p>
                <p className="text-[10px] text-slate-500">Web · API · Mobile</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              className="glass absolute -left-3 bottom-10 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 sm:-left-6"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400">
                <ShieldCheck className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-100">{profile.availability}</p>
                <p className="text-[10px] text-slate-500">Responsible Disclosure</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1, duration: 0.8 }}
              className="pointer-events-none absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-ink-850/80 px-4 py-1.5 backdrop-blur"
            >
              <MousePointerClick className="h-3.5 w-3.5 text-accent-400" strokeWidth={1.8} />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Manual · <span className="text-accent-400">0-day ready</span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
