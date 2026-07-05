"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#browse", label: "Search" },
  { href: "/insights", label: "Insights" },
  { href: "/guide", label: "Safety Guide" },
  { href: "/stories", label: "Stories" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/10 bg-bg/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl gold-gradient text-[#1a1204]">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 21s-7-4.35-7-10a7 7 0 0114 0c0 5.65-7 10-7 10z" strokeLinejoin="round" />
              <circle cx="12" cy="11" r="2.5" />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Reunite</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#act"
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-ink backdrop-blur transition-colors hover:bg-white/10"
        >
          Report a case
        </Link>
      </nav>
    </header>
  );
}
