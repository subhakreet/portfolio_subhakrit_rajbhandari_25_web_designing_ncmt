import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const alignCls = align === "center" ? "mx-auto text-center" : "";
  const eyebrowCls = align === "center" ? "justify-center" : "";

  return (
    <div className={`max-w-2xl ${alignCls}`}>
      <Reveal>
        <div className={`flex items-center gap-3 ${eyebrowCls}`}>
          <span className="h-px w-8 bg-gradient-to-r from-accent-400 to-transparent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent-400">
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
