import { About } from "@/components/About";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Expertise } from "@/components/Expertise";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Skills } from "@/components/Skills";

function Divider() {
  return (
    <div aria-hidden="true" className="mx-auto w-px max-w-6xl px-5 sm:px-8">
      <div className="mx-auto h-20 w-px bg-gradient-to-b from-transparent via-accent-500/30 to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Divider />
      <Education />
      <Experience />
      <Expertise />
      <Divider />
      <Highlights />
      <Skills />
      <Certifications />
      <Contact />
    </>
  );
}
