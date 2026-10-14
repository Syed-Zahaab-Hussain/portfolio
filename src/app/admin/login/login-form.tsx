"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const field = "mt-2 w-full rounded-lg border border-white/10 bg-[#0b0b13] px-4 py-3 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20";
const button = "w-full rounded-lg bg-violet-500 px-4 py-3 font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50";

export function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgot, setForgot] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setBusy(true);
    try {
      if (forgot) {
        const result = await authClient.requestPasswordReset({ email, redirectTo: "/admin/reset-password" });
        setMessage(result.error ? "Unable to request a reset. Try again later." : "If the account exists, a reset email will be sent.");
      } else {
        const result = await authClient.signIn.email({ email, password });
        setPassword("");
        if (result.error) {
          setMessage("Sign-in failed. Check your details and try again.");
        } else {
          router.replace("/admin");
          router.refresh();
        }
      }
    } catch {
      setMessage("Unable to complete the request. Try again later.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <p className="text-sm text-slate-400">{forgot ? "Enter your email to request a password reset." : "Enter your details to access your workspace."}</p>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm font-medium text-slate-300">
          Email
          <input className={field} type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" required />
        </label>
        {!forgot && (
          <label className="block text-sm font-medium text-slate-300">
            Password
            <span className="relative block">
              <input className={`${field} pr-12`} type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
              <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-slate-400 hover:text-white">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>
        )}
        <button className={button} disabled={busy}>{busy ? "Please wait..." : forgot ? "Send reset link" : "Sign in"}</button>
      </form>
      <button type="button" className="block text-sm text-violet-300 hover:text-violet-200" onClick={() => { setForgot(!forgot); setMessage(""); }}>
        {forgot ? "Back to sign in" : "Forgot password?"}
      </button>
      {message && <p role="status" className="rounded-lg border border-violet-400/20 bg-violet-400/5 p-3 text-sm text-slate-200">{message}</p>}
    </>
  );
}
