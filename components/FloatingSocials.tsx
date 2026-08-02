"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import profile from "@/data/profile.json";
import { DiscordIcon, GitHubIcon, LinkedInIcon } from "./icons";

const items = [
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: profile.github, Icon: GitHubIcon },
  { label: "Discord", href: profile.discord, Icon: DiscordIcon },
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
];

export function FloatingSocials() {
  return (
    <div className="fixed bottom-0 left-7 z-40 hidden flex-col items-center gap-4 lg:flex">
      {items.map(({ label, href, Icon }, i) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + i * 0.08, duration: 0.5 }}
          className="group flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:text-accent-400"
        >
          <Icon className="h-[19px] w-[19px]" />
        </motion.a>
      ))}
      <div className="mt-2 h-24 w-px bg-gradient-to-b from-slate-600/60 to-transparent" />
    </div>
  );
}
