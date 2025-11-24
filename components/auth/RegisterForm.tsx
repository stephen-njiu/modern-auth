"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { SocialSignIn } from "@/components/auth/SocialSignIn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";


export default function RegisterForm() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialBusy, setSocialBusy] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || socialBusy) return;
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirm = (form.elements.namedItem("confirm") as HTMLInputElement).value;
    if (!name || !email || !password) { toast.error("All fields required"); return; }
    if (password !== confirm) { toast.error("Passwords do not match"); return; }
    if (password.length < 8) { toast.error("Password too short (min 8)"); return; }
    let tid: string | number | undefined;
    setLoading(true);
    const { error } = await authClient.signUp.email(
      { email, password, name, callbackURL: "/profile" },
      {
        onRequest: () => { tid = toast.loading("Creating account..."); },
        onSuccess: () => {
          toast.success(<span className="flex items-center gap-1"><Sparkles className="size-4 text-fuchsia-400" /> You are IN!</span>, { id: tid });
          router.push("/profile");
        },
        onError: (ctx) => { toast.error(ctx.error.message, { id: tid }); },
      }
    );
    setLoading(false);
    if (error) return; // already toasted
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-md backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-100">Create account</h2>
        <span className="flex items-center gap-1 text-[10px] text-emerald-400"><span className="size-2 rounded-full bg-emerald-500" /> Sign-Up</span>
      </div>
      {/* Social providers */}
      <div className="space-y-2">
        <SocialSignIn disabled={loading} onBusyChange={setSocialBusy} />
        <div className="flex items-center gap-3 text-[10px] text-zinc-500">
          <span className="h-px flex-1 bg-zinc-700" />
          <span>or continue with email</span>
          <span className="h-px flex-1 bg-zinc-700" />
        </div>
      </div>
      <div className="grid gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs uppercase tracking-wide text-zinc-400">Name</Label>
          <Input id="name" name="name" placeholder="Ada Lovelace" autoComplete="name" disabled={loading || socialBusy} className="bg-zinc-800/60 border-zinc-700 focus:border-violet-500 text-zinc-100 placeholder:text-zinc-500 caret-violet-400 focus:bg-zinc-800/70" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs uppercase tracking-wide text-zinc-400">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" disabled={loading || socialBusy} className="bg-zinc-800/60 border-zinc-700 focus:border-violet-500 text-zinc-100 placeholder:text-zinc-500 caret-violet-400 focus:bg-zinc-800/70" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs uppercase tracking-wide text-zinc-400">Password</Label>
          <div className="relative">
            <Input id="password" name="password" type={show ? "text" : "password"} placeholder="••••••••" autoComplete="new-password" disabled={loading || socialBusy} className="bg-zinc-800/60 border-zinc-700 pr-10 focus:border-violet-500 text-zinc-100 placeholder:text-zinc-500 caret-violet-400 focus:bg-zinc-800/70" />
            <button type="button" disabled={loading || socialBusy} onClick={() => setShow(!show)} aria-label="Toggle password" className="absolute inset-y-0 right-0 grid w-10 place-items-center text-zinc-500 hover:text-red-400 hover:cursor-pointer disabled:opacity-50">
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm" className="text-xs uppercase tracking-wide text-zinc-400">Confirm</Label>
          <div className="relative">
            <Input id="confirm" name="confirm" type={show2 ? "text" : "password"} placeholder="••••••••" autoComplete="new-password" disabled={loading || socialBusy} className="bg-zinc-800/60 border-zinc-700 pr-10 focus:border-violet-500 text-zinc-100 placeholder:text-zinc-500 caret-violet-400 focus:bg-zinc-800/70" />
            <button type="button" disabled={loading || socialBusy} onClick={() => setShow2(!show2)} aria-label="Toggle confirm password" className="absolute inset-y-0 right-0 grid w-10 place-items-center text-zinc-500 hover:text-red-400 hover:cursor-pointer disabled:opacity-50">
              {show2 ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-zinc-500">8+ chars incl. number & symbol.</p>
      <Button disabled={loading || socialBusy} type="submit" className="w-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-cyan-500 font-medium text-white shadow-sm hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:opacity-60 cursor-pointer">
        {loading ? "Working..." : "Create account"}
      </Button>
      <p className="text-xs text-zinc-500 text-center">Have an account? <a href="/auth/login" className="text-violet-400 hover:underline">Sign in</a></p>
      <style jsx>{`
        form input:-webkit-autofill,
        form input:-webkit-autofill:hover,
        form input:-webkit-autofill:focus {
          -webkit-text-fill-color: #f5f5f5;
          box-shadow: 0 0 0px 1000px #27272a inset;
          caret-color: #7c3aed;
        }
        form input:-moz-autofill {
          box-shadow: 0 0 0px 1000px #27272a inset;
          color: #f5f5f5 !important;
          caret-color: #7c3aed;
        }
      `}</style>
    </form>
  );
}