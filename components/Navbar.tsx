"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import BrandMark from "./BrandMark";

const links = [
  { id: "artists", href: "/#artists", label: "Artists", anchor: true },
  { id: "news", href: "/#news", label: "News", anchor: true },
  { id: "history", href: "/history", label: "History", anchor: false },
  { id: "platform", href: "/platform", label: "Platform", anchor: false },
];

/** Header flotante estilo liquid glass: pill despegada del borde, blur liquido. */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy (solo en home)
  useEffect(() => {
    if (!onHome) return;
    const sections = links
      .filter((l) => l.anchor)
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: onHome ? 4.4 : 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <div className="w-full max-w-4xl">
        <nav
          className={`liquid-glass flex items-center justify-between rounded-full py-2 pl-3 pr-2 transition-shadow duration-500 ${
            scrolled ? "shadow-[0_16px_44px_rgba(16,26,56,0.16)]" : ""
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2.5 pl-1">
            <BrandMark size={34} />
            <span className="font-display text-[13px] font-bold tracking-[0.22em] text-navy">
              DANRECORDS
            </span>
          </Link>

          {/* Desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const isActive = l.anchor ? onHome && active === l.id : pathname.startsWith(l.href);
              return (
                <li key={l.id}>
                  <Link
                    href={l.href}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? "bg-brand/10 text-brand"
                        : "text-navy/60 hover:bg-navy/[0.05] hover:text-navy"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/platform"
              className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-[0_6px_18px_rgba(23,59,143,0.35)] transition-all duration-300 ease-cine hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(23,59,143,0.45)] md:inline-block"
            >
              Join DanRecords
            </Link>
            {/* Movil */}
            <button
              className="rounded-full p-2 text-navy md:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Menu movil: panel flotante bajo la pill */}
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0, y: -8 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass mt-2 overflow-hidden rounded-3xl px-5 md:hidden"
            >
              {links.map((l) => (
                <li key={l.id}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-navy/5 py-3.5 font-display text-lg font-semibold text-navy last:border-0"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="py-4">
                <Link
                  href="/platform"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-brand py-3 text-center font-medium text-white"
                >
                  Join DanRecords
                </Link>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
