"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import styles from "../auth.module.css";

export function Login({ initialForgot = false }: { initialForgot?: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgot, setForgot] = useState(initialForgot);
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
      <h1 id="auth-heading" className={styles.heading}>
        <LockKeyhole size={26} aria-hidden="true" />
        {forgot ? "Forgot password" : "Owner Sign In"}
      </h1>
      {forgot && <p className={styles.description}>Enter your email to request a password reset.</p>}
      <form onSubmit={submit} className={styles.form}>
        <div>
          <label htmlFor="owner-email" className={styles.labelRow}>Email</label>
          <div className={styles.inputWrap}>
            <Mail size={17} className={styles.inputIcon} aria-hidden="true" />
            <input
              id="owner-email"
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </div>
        </div>
        {!forgot && (
          <div>
            <div className={styles.labelRow}>
              <label htmlFor="owner-password">Password</label>
              <button
                type="button"
                className={styles.link}
                disabled={busy}
                onClick={() => {
                  setForgot(true);
                  setPassword("");
                  setShowPassword(false);
                  setMessage("");
                }}
              >
                Forgot password?
              </button>
            </div>
            <div className={styles.inputWrap}>
              <LockKeyhole size={17} className={styles.inputIcon} aria-hidden="true" />
              <input
                id="owner-password"
                className={styles.input}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
              <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className={styles.toggle}>
                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>
        )}
        <button className={styles.submit} disabled={busy}>
          {busy ? "Please wait…" : forgot ? "Send reset link" : "Sign In"}
          {!busy && <ArrowRight size={18} aria-hidden="true" />}
        </button>
      </form>
      {forgot && (
        <div className={styles.footerLinks}>
          <button type="button" className={styles.link} disabled={busy} onClick={() => { setForgot(false); setMessage(""); }}>
            Back to sign in
          </button>
        </div>
      )}
      {message && <p role="status" className={styles.feedback}>{message}</p>}
    </>
  );
}
