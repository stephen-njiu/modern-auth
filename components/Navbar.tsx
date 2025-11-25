"use client";
import Link from "next/link";
import { Github } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-200 transition hover:text-white cursor-pointer"
        >
          Home
        </Link>
        <a
          href="https://github.com/stephen-njiu/modern-auth"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-neutral-200 transition hover:border-white/30 hover:bg-white/10 cursor-pointer"
        >
          <Github className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
