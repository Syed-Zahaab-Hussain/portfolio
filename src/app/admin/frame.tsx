import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
export function Frame({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#09090f] px-5 py-8 text-slate-100 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <Link href="/" className="inline-flex w-fit items-center gap-2 text-sm text-slate-400 transition hover:text-white"><ArrowLeft size={16} /> Back to portfolio</Link>
        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1fr_480px] lg:gap-20">
          <section className="max-w-lg">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-3 py-1.5 text-xs font-medium tracking-wide text-violet-300"><Sparkles size={14} /> SYED ZAHAAB HUSSAIN</div>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Your work,<br /><span className="text-violet-400">all in one place.</span></h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-slate-400">A private space to manage your portfolio and keep your work up to date.</p>
            <div className="mt-9 flex items-center gap-3 text-sm text-slate-500"><ShieldCheck size={18} className="text-violet-400" /> Secure owner access</div>
          </section>
          <section className="rounded-2xl border border-white/10 bg-[#12121c] p-6 shadow-2xl shadow-black/30 sm:p-9"><p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">Portfolio admin</p><div className="space-y-5">{children}</div></section>
        </div>
        <p className="text-xs text-slate-600">Private access · Portfolio administration</p>
      </div>
    </main>
  );
}
