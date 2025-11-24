"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Radar, Sparkles, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="relative grid min-h-dvh place-items-center px-4 py-16">
      {/* Layered background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(35rem_35rem_at_15%_20%,hsl(262_83%_60%_/.25),transparent_70%),radial-gradient(45rem_45rem_at_85%_60%,hsl(182_75%_55%_/.15),transparent_70%)]" />

      <section className="relative w-full max-w-md">
        {/* Suspended aura */}
        <div aria-hidden className="absolute -inset-4 -z-10 animate-pulse rounded-2xl bg-linear-to-r from-violet-500/20 via-fuchsia-500/10 to-cyan-500/20 blur-2xl" />
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/70 p-8 shadow-md backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3 text-zinc-300">
            <span className="grid size-10 place-items-center rounded-lg border border-zinc-700/60 bg-zinc-800/60">
              <Radar className="size-5 text-cyan-400" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-400">Error 404</p>
              <h1 className="text-lg font-semibold text-zinc-100">Page not found</h1>
            </div>
          </div>

          <p className="mb-6 text-sm leading-relaxed text-zinc-400">
            The page you’re looking for doesn’t exist or may have moved.
            Redirecting you to the home page…
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => router.push("/")} className="cursor-pointer">
              <Home className="mr-2 size-4" /> Go home now
            </Button>
            {/* <Button variant="outline" asChild>
              <Link href="/">
                Explore <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button> */}
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500">
            <Sparkles className="size-3 text-fuchsia-400" />
            <span>Auto redirect in ~3s</span>
          </div>
        </div>
      </section>
    </main>
  );
}
