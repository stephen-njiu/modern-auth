"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const HomePage = () => {
  return (
  <main className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Decorative background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-neutral-950" />
        <div className="absolute inset-0 bg-radial-at-t from-neutral-900 via-neutral-950 to-black opacity-90" />
  <div className="absolute inset-0 bg-grid-white/[0.04] mask-[radial-gradient(circle_at_center,black,transparent_70%)]" />
        <div className="absolute -inset-8 animate-pulse-slow bg-linear-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 blur-3xl" />
      </div>
      <section className="max-w-3xl w-full text-center space-y-7">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-fuchsia-400 to-pink-400">
          Identity Made Effortless
        </h1>
        <p className="mx-auto max-w-xl text-neutral-300 text-lg leading-relaxed">
          A modern authentication starter with email, password and slick social sign‑in. Fast to integrate, easy to extend, styled for dark mode from the ground up.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            className="cursor-pointer bg-linear-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-indigo-800/30 border border-white/10"
            onClick={() => (window.location.href = "/auth/login")}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer backdrop-blur border-neutral-700/60 hover:bg-neutral-800/70 hover:text-white"
            onClick={() => (window.location.href = "/auth/register")}
          >
            Create Account
          </Button>
        </div>
      </section>
      <footer className="mt-16 text-xs text-neutral-600">
        <span className="font-mono text-xl italic">/public • secure • scalable</span>
      </footer>
      <style jsx>{`
        .bg-grid-white\/\[0.04\] {
          background-image: linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px);
          background-size: 40px 40px;
        }
        @keyframes pulseSlow { 0%,100% { opacity:.55 } 50% { opacity:.35 } }
        .animate-pulse-slow { animation: pulseSlow 7s ease-in-out infinite; }
      `}</style>
    </main>
  );
};

export default HomePage;