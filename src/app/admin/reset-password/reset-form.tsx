"use client";
import { useState, type FormEvent } from 'react';
import { authClient } from '@/lib/auth-client';
const field = 'mt-2 w-full rounded-lg border border-white/10 bg-[#0b0b13] px-4 py-3 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20';
const button = 'w-full rounded-lg bg-violet-500 px-4 py-3 font-semibold text-white transition hover:bg-violet-400 disabled:opacity-50';
export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      setMessage("This reset link is invalid.");
      return;
    }
    try {
      const result = await authClient.resetPassword({
        newPassword: password,
        token,
      });
      setPassword("");
      setMessage(
        result.error
          ? "Unable to reset password. Request a new link."
          : "Password reset. You can now sign in.",
      );
    } catch {
      setMessage("Unable to reset password.");
    }
  }
  return (
    <>
      <form onSubmit={submit} className="space-y-4">
        <input
          className={field}
          aria-label="New password"
          type="password"
          minLength={12}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={button}>Reset password</button>
      </form>
      {message && <p role="status">{message}</p>}
      <a className="underline" href="/admin/login">
        Back to sign in
      </a>
    </>
  );
}
