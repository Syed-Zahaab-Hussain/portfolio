import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { ResetPassword } from "./reset-form";
import { Frame } from "../frame";
import styles from "../auth.module.css";

export default async function ResetPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[]; error?: string | string[] }>;
}) {
  const { token, error } = await searchParams;
  return (
    <Frame>
      <h1 id="auth-heading" className={styles.heading}>
        <LockKeyhole size={26} aria-hidden="true" />
        Reset password
      </h1>
      {!error && typeof token === "string" && token.trim() ? (
        <ResetPassword token={token} />
      ) : (
        <>
          <p className={styles.description}>This reset link is invalid or has expired. Request a new link to continue.</p>
          <div className={styles.footerLinks}>
            <Link href="/admin/login?mode=reset" className={styles.link}>Request a new link</Link>
            <Link href="/admin/login" className={styles.link}>Back to sign in</Link>
          </div>
        </>
      )}
    </Frame>
  );
}
