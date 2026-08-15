"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import styles from "../auth.module.css";

export function ResetPassword({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"ready" | "invalid" | "done">("ready");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const result = await authClient.resetPassword({ newPassword: password, token });
      if (result.error?.code === "INVALID_TOKEN") {
        setPassword("");
        setStatus("invalid");
        setMessage("This reset link is invalid or has expired. Request a new link to continue.");
      } else if (result.error) {
        setMessage("Unable to reset your password. Try again or request a new link.");
      } else {
        setPassword("");
        setStatus("done");
        setMessage("Password reset. You can now sign in.");
      }
    } catch {
      setMessage("Unable to reset your password. Try again or request a new link.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {status === "ready" && (
        <form onSubmit={submit} className={styles.form}>
          <div>
            <label htmlFor="new-password" className={styles.labelRow}>New password</label>
            <div className={styles.inputWrap}>
              <LockKeyhole size={17} className={styles.inputIcon} aria-hidden="true" />
              <input
                id="new-password"
                type={showPassword ? "text" : "password"}
                className={styles.input}
                autoComplete="new-password"
                aria-describedby="password-requirements"
                minLength={12}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button type="button" className={styles.toggle} aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>
            <p id="password-requirements" className="mt-2 text-xs text-slate-300">At least 12 characters.</p>
          </div>
          <button className={styles.submit} disabled={busy}>
            {busy ? "Resetting…" : "Reset password"}
            {!busy && <ArrowRight size={18} aria-hidden="true" />}
          </button>
        </form>
      )}
      {message && <p role="status" className={styles.feedback}>{message}</p>}
      <div className={styles.footerLinks}>
        {status !== "done" && <Link href="/admin/login?mode=reset" className={styles.link}>Request a new link</Link>}
        <Link href="/admin/login" className={styles.link}>Back to sign in</Link>
      </div>
    </>
  );
}
