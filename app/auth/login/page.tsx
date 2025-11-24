"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { SocialSignIn } from "@/components/auth/SocialSignIn";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialBusy, setSocialBusy] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  if (loading || socialBusy) return;
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    if (!email || !password) { toast.error("Email & password required"); return; }
    let tid: string | number | undefined;
    setLoading(true);
    const { error } = await authClient.signIn.email(
      { email, password, callbackURL: "/profile", rememberMe: true },
      {
        onRequest: () => { tid = toast.loading("Signing you in..."); },
        onSuccess: () => {
          toast.success(<span className="flex items-center gap-1"><Sparkles className="size-4 text-fuchsia-400" /> You are IN!</span>, { id: tid });
          router.push("/profile");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message, { id: tid });
        },
      }
    );
    setLoading(false);
    if (error) return;
  };

  return (
    <main className="relative min-h-dvh w-full px-4 py-10 grid place-items-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(35rem_35rem_at_15%_20%,hsl(262_83%_60%_/.25),transparent_70%),radial-gradient(45rem_45rem_at_85%_60%,hsl(182_75%_55%_/.15),transparent_70%)]" />

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-md backdrop-blur-sm">
        <h1 className="text-lg font-semibold text-zinc-100">Welcome back</h1>
        {/* Social sign-in */}
        <div className="space-y-2">
          <SocialSignIn disabled={loading} onBusyChange={setSocialBusy} />
          <div className="flex items-center gap-3 text-[10px] text-zinc-500">
            <span className="h-px flex-1 bg-zinc-700" />
            <span>or email</span>
            <span className="h-px flex-1 bg-zinc-700" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs uppercase tracking-wide text-zinc-400">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" disabled={loading || socialBusy} className="bg-zinc-800/60 border-zinc-700 focus:border-violet-500 text-zinc-100 placeholder:text-zinc-500 caret-violet-400 focus:bg-zinc-800/70" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs uppercase tracking-wide text-zinc-400">Password</Label>
          <div className="relative">
            <Input id="password" name="password" type={show ? "text" : "password"} placeholder="••••••••" autoComplete="current-password" disabled={loading || socialBusy} className="bg-zinc-800/60 border-zinc-700 pr-10 focus:border-violet-500 text-zinc-100 placeholder:text-zinc-500 caret-violet-400 focus:bg-zinc-800/70" />
            <button type="button" disabled={loading || socialBusy} onClick={() => setShow(!show)} aria-label="Toggle password" className="absolute inset-y-0 right-0 grid w-10 place-items-center text-zinc-500 hover:text-red-400 hover:cursor-pointer disabled:opacity-50">
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>
        <Button disabled={loading || socialBusy} type="submit" className="w-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-cyan-500 font-medium text-white shadow-sm hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:opacity-60 cursor-pointer">
          {loading ? "Working..." : "Sign in"}
        </Button>
        <p className="text-xs text-zinc-500 text-center">No account? <a href="/auth/register" className="text-violet-400 hover:underline">Create one</a></p>
      </form>
      <style jsx>{`
        form input:-webkit-autofill,
        form input:-webkit-autofill:hover,
        form input:-webkit-autofill:focus {
          -webkit-text-fill-color: #f5f5f5;
          box-shadow: 0 0 0px 1000px #27272a inset; /* zinc-800 approx */
          caret-color: #7c3aed; /* violet-600 */
        }
        form input:-moz-autofill {
          box-shadow: 0 0 0px 1000px #27272a inset;
          color: #f5f5f5 !important;
          caret-color: #7c3aed;
        }
      `}</style>
    </main>
  );
}