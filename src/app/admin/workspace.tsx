"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Layers, Menu, X, ExternalLink } from "lucide-react";
import { Logout } from "./logout";

export function Workspace({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLElement>("nav a")?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
      if (event.key === "Tab" && menu.current) {
        const elements = Array.from(menu.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter(item => item.offsetParent !== null);
        if (!elements.length) return;
        if (event.shiftKey && document.activeElement === elements[0]) { event.preventDefault(); elements[elements.length - 1].focus(); }
        else if (!event.shiftKey && document.activeElement === elements[elements.length - 1]) { event.preventDefault(); elements[0].focus(); }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);
  const links = [{ href: "/admin", label: "Overview", icon: LayoutDashboard }, { href: "/admin/projects", label: "Projects", icon: Layers }];
  return <div className="min-h-screen bg-[#09090f] text-white">
    <header className="flex h-16 items-center justify-between border-b border-white/10 px-5 md:hidden"><Link href="/admin" className="font-semibold">Portfolio workspace</Link><button ref={menuButton} type="button" aria-controls="admin-navigation" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></header>
    <aside id="admin-navigation" ref={menu} className={`${open ? "flex" : "hidden"} fixed inset-x-0 top-16 bottom-0 z-40 flex-col border-r border-white/10 bg-[#10101a] p-5 md:inset-y-0 md:right-auto md:flex md:w-64`}>
      <Link href="/admin" className="mb-10 hidden items-center gap-3 text-lg font-semibold md:flex"><span className="rounded-lg bg-gradient-to-br from-purple-500 to-teal-400 px-3 py-2">Z</span> Portfolio Admin</Link>
      <nav aria-label="Admin navigation" className="space-y-2">{links.map(({ href, label, icon: Icon }) => { const active = href === "/admin" ? pathname === href : pathname.startsWith(href); return <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${active ? "bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/30" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}><Icon size={19} />{label}</Link>; })}</nav>
      <div className="mt-auto space-y-4 border-t border-white/10 pt-5"><Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ExternalLink size={16} /> View portfolio</Link><Logout /></div>
    </aside><div className="md:pl-64"><div className="hidden h-16 items-center border-b border-white/10 px-8 text-sm font-medium text-slate-400 md:flex">Portfolio workspace <span className="mx-3 text-slate-600">/</span> {pathname.startsWith("/admin/projects") ? "Projects" : "Overview"}</div><main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">{children}</main></div>
  </div>;
}
