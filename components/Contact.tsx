"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import profile from "@/data/profile.json";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { DiscordIcon, GitHubIcon, LinkedInIcon } from "./icons";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail, note: "Best for professional inquiries" },
  { label: "LinkedIn", value: "subhakrit-rajbhandari", href: profile.linkedin, Icon: LinkedInIcon, note: "Connect & message" },
  { label: "GitHub", value: "subhakreet", href: profile.github, Icon: GitHubIcon, note: "Code & security research" },
  { label: "Discord", value: "subhakrit", href: profile.discord, Icon: DiscordIcon, note: "Open to security chat" },
];

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-accent-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-accent-500/20";

type Status = "idle" | "sending" | "sent";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4200);
    }, 1400);
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's secure something together"
          description="Have a security assessment in mind, a research question, or a professional opportunity? Reach out — I usually respond quickly."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="space-y-4">
            {channels.map(({ label, value, href, Icon, note }, i) => (
              <Reveal key={label} delay={i * 0.07}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="card-surface group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400/25 hover:shadow-glow"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-500/12 text-accent-400 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="truncate text-sm font-medium text-slate-100">{value}</p>
                    <p className="text-[11px] text-slate-500">{note}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="border-gradient rounded-3xl p-[1px]">
              <div className="relative overflow-hidden rounded-3xl bg-ink-850/80 p-7 sm:p-9">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-500/10 blur-3xl" />

                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="flex min-h-[340px] flex-col items-center justify-center text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/12 text-emerald-400 shadow-glow"
                      >
                        <CheckCircle2 className="h-10 w-10" strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-100">
                        Message sent
                      </h3>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
                        Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative space-y-5"
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="mb-2 block text-xs font-medium text-slate-400">
                            Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={set("name")}
                            placeholder="Your name"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-2 block text-xs font-medium text-slate-400">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={set("email")}
                            placeholder="you@example.com"
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="mb-2 block text-xs font-medium text-slate-400">
                          Subject
                        </label>
                        <input
                          id="subject"
                          type="text"
                          required
                          value={form.subject}
                          onChange={set("subject")}
                          placeholder="How can I help?"
                          className={inputCls}
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="mb-2 block text-xs font-medium text-slate-400">
                          Message
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={set("message")}
                          placeholder="Tell me about your engagement or inquiry..."
                          className={`${inputCls} resize-none`}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:brightness-110 disabled:opacity-70 sm:w-auto"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 className="h-4.5 w-4.5 animate-spin" strokeWidth={1.8} />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
                            Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
