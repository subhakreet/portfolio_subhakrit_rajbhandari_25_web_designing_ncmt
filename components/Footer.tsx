"use client";

import { ArrowUp, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import profile from "@/data/profile.json";
import { DiscordIcon, GitHubIcon, LinkedInIcon } from "./icons";

const socials = [
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: profile.github, Icon: GitHubIcon },
  { label: "Discord", href: profile.discord, Icon: DiscordIcon },
];

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-7 right-7 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink-850/80 text-slate-300 shadow-soft backdrop-blur transition-all duration-500 hover:border-accent-400/40 hover:text-accent-400 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={1.8} />
    </button>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 sm:px-8">
        <p className="font-mono text-center text-sm tracking-[0.25em] text-slate-300 uppercase sm:text-base">
          Securing Applications<span className="text-accent-400">.</span>{" "}
          <span className="text-slate-500">Strengthening Trust.</span>
        </p>

        <div className="flex items-center gap-3">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/40 hover:text-accent-400"
            >
              <Icon className="h-[17px] w-[17px]" />
            </a>
          ))}
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-3 border-t border-white/5 pt-7 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="h-3.5 w-3.5 fill-accent-400/70 text-accent-400" /> and a
            security-first mindset
          </p>
        </div>
      </div>
    </footer>
  );
}
