import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Footer() {
  return (
    <footer className="bg-brand">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark size={38} />
              <span className="font-display text-sm font-bold tracking-[0.25em] text-white">DANRECORDS</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Música, tecnología y creatividad trabajando conectadas.
            </p>
          </div>
          <nav aria-label="Navegación">
            <p className="mb-3 font-display text-xs uppercase tracking-[0.3em] text-white/65">Explora</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/#artists", label: "Artists" },
                { href: "/#news", label: "News" },
                { href: "/history", label: "History" },
                { href: "/platform", label: "Platform" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/65 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-3 font-display text-xs uppercase tracking-[0.3em] text-white/65">Síguenos</p>
            <ul className="space-y-2 text-sm">
              {["Instagram", "YouTube", "Spotify", "TikTok"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/65 transition-colors hover:text-white">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-display text-xs uppercase tracking-[0.3em] text-white/65">Contacto</p>
            <p className="text-sm text-white/65">hola@danrecords.com</p>
            <p className="mt-1 text-sm text-white/65">Ciudad de México</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/65 md:flex-row">
          <p>© {new Date().getFullYear()} DanRecords. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-white">Aviso de privacidad</a>
            <a href="#" className="transition-colors hover:text-white">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
