"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import BrandMark from "@/components/BrandMark";

type Role = "cliente" | "editor" | null;

const platformFeatures = [
  "Artistas", "Noticias", "Contenido", "Clientes", "Publicaciones", "Equipo editorial", "Administración",
];

/**
 * PLATFORM — la plataforma tecnologica de DanRecords (showcase oscuro estilo
 * dashboard con capturas reales de Dan Creative Studio) + Join DanRecords.
 * Formulario inteligente que cambia segun el rol elegido.
 */
export default function PlatformSection() {
  const [role, setRole] = useState<Role>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(false);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, ...data }),
      });
      if (!res.ok) throw new Error("send failed");
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  const input =
    "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm placeholder:text-mute focus:border-accent";

  return (
    <section id="platform" className="border-t border-line bg-panel/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="mb-2 font-display text-xs uppercase tracking-[0.4em] text-accent">
            Platform
          </p>
          <h2 className="mb-3 font-display text-4xl font-bold md:text-6xl">
            La tecnología detrás de DanRecords
          </h2>
          <p className="mb-14 max-w-2xl text-mute">
            Una plataforma propia que administra todo el universo DanRecords, en cualquier dispositivo.
          </p>
        </Reveal>

        {/* Showcase oscuro estilo dashboard: la plataforma real */}
        <Reveal className="mb-20">
          <div className="overflow-hidden rounded-[1.75rem] bg-ink shadow-[0_30px_80px_rgba(10,10,11,0.35)]">
            {/* Barra superior del panel */}
            <div className="flex items-center justify-between px-6 py-5 md:px-8">
              <div className="flex items-center gap-3">
                <BrandMark size={34} />
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.35em] text-white/40">
                    Overview
                  </p>
                  <p className="font-display text-lg font-bold text-white">Dan Creative Studio</p>
                </div>
              </div>
              <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.25em] text-white/50">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                En vivo
              </span>
            </div>
            {/* Captura real del dashboard */}
            <div className="px-4 pb-4 md:px-6 md:pb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/platform/dashboard.jpg"
                alt="Dashboard de Dan Creative Studio"
                loading="lazy"
                decoding="async"
                className="block h-auto w-full rounded-2xl border border-white/10"
              />
            </div>
            {/* Modulos de la plataforma */}
            <ul className="flex flex-wrap justify-center gap-2 px-6 pb-7">
              {platformFeatures.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-white/60"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Join DanRecords */}
        <Reveal>
          <h3 className="mb-8 text-center font-display text-2xl font-bold md:text-3xl">
            Join DanRecords
          </h3>
        </Reveal>

        <div className="mx-auto mb-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <RoleCard
            active={role === "cliente"}
            title="Soy Cliente"
            desc="Artistas, bandas, productores, empresas y sellos."
            cta="Quiero trabajar con DanRecords"
            onClick={() => { setRole("cliente"); setSent(false); }}
          />
          <RoleCard
            active={role === "editor"}
            title="Quiero ser Editor"
            desc="Colabora publicando noticias o administrando contenido."
            cta="Aplicar como Editor"
            onClick={() => { setRole("editor"); setSent(false); }}
          />
        </div>

        {/* Formulario inteligente */}
        <AnimatePresence mode="wait">
          {role && !sent && (
            <motion.form
              key={role}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass mx-auto max-w-2xl rounded-xl2 p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="nombre" required placeholder="Nombre" className={input} />
                {role === "cliente" ? (
                  <input name="nombreArtistico" required placeholder="Nombre artístico o empresa" className={input} />
                ) : (
                  <input name="edad" required type="number" min={16} placeholder="Edad" className={input} />
                )}
                <input name="correo" required type="email" placeholder="Correo" className={input} />
                {role === "cliente" && (
                  <input name="telefono" required placeholder="Teléfono" className={input} />
                )}
                <input name="pais" required placeholder="País" className={input} />
                {role === "cliente" ? (
                  <>
                    <select name="tipoProyecto" required className={input} defaultValue="">
                      <option value="" disabled>Tipo de proyecto</option>
                      <option>Artista solista</option>
                      <option>Banda</option>
                      <option>Productor</option>
                      <option>Empresa</option>
                      <option>Sello</option>
                    </select>
                    <select name="servicios" required className={`${input} sm:col-span-2`} defaultValue="">
                      <option value="" disabled>Servicios requeridos</option>
                      <option>Producción musical</option>
                      <option>Distribución</option>
                      <option>Management</option>
                      <option>Marketing y contenido</option>
                      <option>Todo el ecosistema</option>
                    </select>
                    <textarea name="descripcion" required rows={4} placeholder="Cuéntanos sobre tu proyecto" className={`${input} sm:col-span-2`} />
                  </>
                ) : (
                  <>
                    <input name="redes" required placeholder="Redes sociales" className={input} />
                    <input name="portafolio" placeholder="Portafolio (URL)" className={input} />
                    <textarea name="experiencia" required rows={3} placeholder="Experiencia" className={`${input} sm:col-span-2`} />
                    <textarea name="motivacion" required rows={3} placeholder="¿Por qué quieres unirte a DanRecords?" className={`${input} sm:col-span-2`} />
                  </>
                )}
              </div>
              <button
                type="submit"
                disabled={sending}
                className="mt-6 w-full rounded-full bg-brand py-3 font-medium text-white transition-transform duration-300 hover:scale-[1.01] disabled:opacity-60"
              >
                {sending ? "Enviando…" : role === "cliente" ? "Quiero trabajar con DanRecords" : "Aplicar como Editor"}
              </button>
              {error && (
                <p className="mt-3 text-center text-sm text-red-600">
                  No pudimos enviar tu información. Intenta de nuevo en un momento.
                </p>
              )}
            </motion.form>
          )}

          {sent && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-xl2 p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
              >
                <CheckCircle2 size={56} className="text-accent" />
              </motion.div>
              <h4 className="font-display text-2xl font-bold">Recibimos tu información</h4>
              <p className="max-w-sm text-mute">
                Ya está en el panel administrativo de DanRecords. Te contactaremos muy pronto.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}


function RoleCard({
  active, title, desc, cta, onClick,
}: { active: boolean; title: string; desc: string; cta: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group rounded-xl2 border p-8 text-left transition-all duration-500 ease-cine ${
        active ? "border-accent bg-brand/25" : "border-line bg-white hover:border-accent/40"
      }`}
    >
      <h4 className="font-display text-2xl font-bold">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-mute">{desc}</p>
      <span className={`mt-6 inline-block rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${
        active ? "bg-brand text-white" : "border border-accent/50 text-accent group-hover:bg-brand group-hover:text-white"
      }`}>
        {cta}
      </span>
    </button>
  );
}
