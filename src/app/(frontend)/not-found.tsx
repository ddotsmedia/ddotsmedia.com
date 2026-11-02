import Link from "next/link";
import { FourDotLogo } from "@/components/shared/FourDotLogo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
      <FourDotLogo size={48} />
      <p className="mt-8 text-6xl font-bold text-white md:text-8xl">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-white">Page not found</h1>
      <p className="mt-2 max-w-md text-white/50">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[var(--brand-teal)] px-6 py-2.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        Back home
      </Link>
    </main>
  );
}
