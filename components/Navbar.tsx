"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border-gradient shadow-glow">
            <ShieldCheck className="h-4.5 w-4.5 text-accent-400" strokeWidth={1.8} />
          </span>
          <span className="font-mono text-sm font-medium tracking-wide text-slate-200">
            subhakrit<span className="text-accent-400">.</span>sec
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-lg px-3.5 py-2 text-sm transition-colors duration-300 ${
                active === link.href
                  ? "text-slate-100"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-lg bg-white/5 ring-1 ring-white/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </a>
          ))}
          <a
            href="/files/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group ml-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-2 text-sm font-medium text-white shadow-glow transition-all duration-300 hover:shadow-lg hover:brightness-110"
          >
            <Download className="h-4 w-4" strokeWidth={1.8} />
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 ring-1 ring-white/10 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/5 glass-strong md:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/files/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-2.5 text-sm font-medium text-white"
              >
                <Download className="h-4 w-4" strokeWidth={1.8} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
