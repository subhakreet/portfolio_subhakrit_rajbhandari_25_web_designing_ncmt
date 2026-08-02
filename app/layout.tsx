import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import profile from "@/data/profile.json";
import { BackToTop, Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingSocials } from "@/components/FloatingSocials";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { ParticleField } from "@/components/ParticleField";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const title = `${profile.name} — ${profile.headline}`;
const description = profile.intro;

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: profile.name, url: profile.linkedin }],
  keywords: [
    "Cybersecurity",
    "Penetration Tester",
    "VAPT",
    "Web Application Security",
    "API Security",
    "Ethical Hacking",
    "OWASP Top 10",
    "Subhakrit Rajbhandari",
  ],
  metadataBase: new URL("https://subhakrit-portfolio.vercel.app"),
  openGraph: {
    title,
    description,
    type: "website",
    siteName: `${profile.name} — Portfolio`,
    locale: "en_US",
    images: [{ url: "/images/profile/avatar.svg", width: 512, height: 512, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${geistMono.variable}`}>
      <body className="relative min-h-screen bg-ink-900 font-sans antialiased">
        <ParticleField />
        <ScrollProgress />
        <LoadingScreen />
        <CustomCursor />
        <Navbar />

        <main className="relative z-10">{children}</main>

        <Footer />
        <FloatingSocials />
        <BackToTop />
      </body>
    </html>
  );
}
