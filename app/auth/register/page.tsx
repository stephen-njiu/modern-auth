import RegisterForm from "@/components/auth/RegisterForm";
import { Shield, Zap, Cpu, Sparkles } from "lucide-react";

export default function RegisterPage() {
  return (
  <main className="relative min-h-dvh w-full px-4 py-8 lg:py-0">
      {/* Layered background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(35rem_35rem_at_15%_20%,hsl(262_83%_60%_/.25),transparent_70%),radial-gradient(45rem_45rem_at_85%_60%,hsl(182_75%_55%_/.15),transparent_70%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-zinc-200/[0.04] dark:bg-grid-zinc-800/[0.08]" />

      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-12">
        {/* Showcase / marketing panel (hidden on small screens) */}
        <section className="hidden lg:flex lg:flex-col space-y-8 text-left">
          <div className="flex flex-col items-center gap-6 lg:items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700/50 bg-zinc-800/40 px-4 py-1 text-xs font-medium text-zinc-300 backdrop-blur">
              <Zap className="size-3 text-violet-400" /> Accelerate your launch
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
              Auth that feels <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">invisible</span>.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
              Lightning-fast, secure, and built for scale. No legacy baggage—just clean primitives ready for your SaaS.
            </p>
          </div>

          {/* Two marketing cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="group relative overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-900/60 p-5 shadow-sm backdrop-blur transition hover:border-violet-500/60 hover:shadow-violet-500/10">
              <div aria-hidden className="pointer-events-none absolute -inset-px rounded-xl bg-linear-to-br from-violet-500/20 via-fuchsia-500/10 to-cyan-500/20 opacity-0 blur-lg transition group-hover:opacity-40" />
              <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                <Shield className="size-3 text-violet-400" /> Security
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">Zero-compromise sessions, hardened adapters, and evolving threat mitigations built in.</p>
            </div>
            <div className="group relative overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-900/60 p-5 shadow-sm backdrop-blur transition hover:border-cyan-500/60 hover:shadow-cyan-500/10">
              <div aria-hidden className="pointer-events-none absolute -inset-px rounded-xl bg-linear-to-br from-cyan-500/20 via-fuchsia-500/10 to-violet-500/20 opacity-0 blur-lg transition group-hover:opacity-40" />
              <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                <Cpu className="size-3 text-cyan-400" /> Performance
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">Edge-ready architecture, smart caching & minimal latency across global regions.</p>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-6 text-xs text-zinc-500 lg:justify-start">
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-emerald-500" /> Live</span>
            <span className="flex items-center gap-1"><Sparkles className="size-3 text-fuchsia-400" /> Iterating fast</span>
          </div>
        </section>

        {/* Form panel (suspended, always visible) */}
        <section className="w-full flex justify-center lg:min-h-dvh lg:items-center py-8 lg:py-0">
          <div className="relative w-full max-w-sm self-center">
            {/* Suspended aura */}
            <div aria-hidden className="absolute -inset-4 -z-10 animate-pulse rounded-2xl bg-linear-to-r from-violet-500/20 via-fuchsia-500/10 to-cyan-500/20 blur-2xl" />
            <div aria-hidden className="absolute inset-0 -z-10 rounded-xl bg-zinc-950/40 backdrop-blur-sm" />
            <RegisterForm />
          </div>
        </section>
      </div>
    </main>
  );
}
