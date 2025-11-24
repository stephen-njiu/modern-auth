"use client";
import { authClient } from "@/app/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    const tid = toast.loading("Signing out...");
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out", { id: tid });
          router.push("/auth/login");
        },
        onError: () => {
          toast.error("Sign out failed", { id: tid });
        },
      },
    });
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Profile</h1>
        {session ? (
          <Button className="cursor-pointer" variant="outline" onClick={handleSignOut}>Sign out</Button>
        ) : (
          <Button onClick={() => router.push("/auth/login")}>Sign in</Button>
        )}
      </header>

      <section className="rounded-xl border border-zinc-200/10 bg-zinc-950/40 p-4 text-sm shadow-sm dark:border-zinc-800/60">
        <h2 className="mb-2 font-medium text-zinc-200">Session</h2>
        <pre className="overflow-auto rounded-md bg-zinc-900 p-3 text-zinc-300">
{JSON.stringify(session ?? (isPending ? { loading: true } : null), null, 2)}
        </pre>
      </section>
    </main>
  );
}