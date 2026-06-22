"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FourDotLogo } from "@/components/shared/FourDotLogo";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "sticky top-9 z-40 border-b border-white/5 bg-[#0a0f1a]/90 backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-lg shadow-black/30",
        )}
      >
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-16 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <FourDotLogo size={22} />
            <span className="text-lg font-bold text-white">Ddotsmedia</span>
          </Link>

          {/* Center links (desktop) */}
          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "relative py-1 text-sm font-medium transition-colors",
                    isActive(l.href) ? "text-[var(--brand-teal)]" : "text-white/60 hover:text-white",
                  )}
                >
                  {l.label}
                  {isActive(l.href) && (
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-[var(--brand-teal)]" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA (desktop) */}
          <Link
            href="/contact"
            className="hidden rounded-full bg-[var(--brand-teal)] px-5 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Get a Quote
          </Link>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="text-white md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay (sibling of the blurred header so `fixed`
          is viewport-relative, not trapped by backdrop-filter's containing block) */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0f1a] duration-300 animate-in fade-in slide-in-from-top-4 md:hidden">
          <div className="flex h-14 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <FourDotLogo size={22} />
              <span className="text-lg font-bold text-white">Ddotsmedia</span>
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <ul className="flex flex-col gap-1 px-4 pt-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-lg font-medium transition-colors",
                    isActive(l.href) ? "bg-white/5 text-[var(--brand-teal)]" : "text-white/80 hover:bg-white/5",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-4 pt-6">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-[var(--brand-teal)] px-5 py-3 text-center font-semibold text-white"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
