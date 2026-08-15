import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./auth.module.css";

export function Frame({ children }: { children: ReactNode }) {
  return (
    <main className={styles.frame}>
      <div className={styles.landscape} aria-hidden="true" />
      <div className={styles.layout}>
        <header className={styles.header}>
          <Link href="/" className={styles.brand}>
            <span className={styles.mark} aria-hidden="true">A</span>
            Portfolio
          </Link>
          <nav className={styles.navigation} aria-label="Portfolio">
            <Link href="/">Home</Link>
            <Link href="/#portfolio">Projects</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </header>

        <div className={styles.hero}>
          <p className={styles.welcome}>Welcome <span>Back</span></p>
          <p className={styles.intro}>Sign in to manage your portfolio content.</p>
        </div>
        <section className={styles.card} aria-labelledby="auth-heading">
          {children}
        </section>
      </div>
    </main>
  );
}
