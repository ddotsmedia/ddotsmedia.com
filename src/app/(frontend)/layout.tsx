import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { OrganizationJsonLd } from "@/components/shared/OrganizationJsonLd";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ddotsmedia IT Solutions — Software, Web & Mobile Development in the UAE",
    template: "%s — Ddotsmedia",
  },
  description:
    "Ddotsmedia builds high-performance web apps, mobile apps, and custom ERP software for businesses across the UAE.",
  openGraph: {
    siteName: "Ddotsmedia",
    type: "website",
    url: siteUrl,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${display.variable} grain bg-navy text-white antialiased`}>
        <TopBar />
        <Navbar />
        {children}
        <Footer />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
