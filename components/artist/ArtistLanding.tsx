"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CalendarDays, Disc3, PlayCircle } from "lucide-react";
import type { Artist } from "@/lib/artists";
import ArtistPhoto from "@/components/ArtistPhoto";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { useState } from "react";

/** LANDING DEL ARTISTA — hero, bio, discografia, videos, galeria, eventos, links y contrataciones. */
export default function ArtistLanding({ artist }: { artist: Artist }) {
  const singles = artist.discography.filter((r) => r.type === "single");
  const albums = artist.discography.filter((r) => r.type === "album");
  const [sent, setSent] = useState(false);

  return (
    <main>
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[85vh] overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${artist.palette[0]}, ${artist.palette[1]} 75%)` }}
      >
        {/* Fotografia del artista a pantalla completa */}
        <ArtistPhoto artist={artist} eager className="absolute inset-0 h-full w-full" />
        {/* Velo para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />
        <div className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/#artists"
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-transform duration-300 hover:-translate-x-1"
          >
            <ArrowLeft size={15} /> Regresar al catálogo
          </Link>
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-14">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-xs uppercase tracking-[0.4em] text-accent"
            >
              {artist.genre}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 font-display text-5xl font-bold text-white md:text-8xl"
            >
              {artist.name}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-6 flex flex-wrap gap-2 text-sm"
            >
              {Object.entries({
                Spotify: artist.links.spotify,
                "Apple Music": artist.links.appleMusic,
                YouTube: artist.links.youtube,
                Instagram: artist.links.instagram,
              }).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="glass rounded-full px-4 py-1.5 transition-colors hover:text-accent"
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="mx-auto max-w-7xl px-6">
        {/* Biografia */}
        <Reveal className="py-20">
          <h2 className="mb-4 font-display text-2xl font-bold">Biografía</h2>
          <p className="max-w-3xl text-lg leading-relaxed text-mute">{artist.bio}</p>
        </Reveal>

        {/* Discografia */}
        <Reveal className="pb-20">
          <h2 className="mb-8 flex items-center gap-2 font-display text-2xl font-bold">
            <Disc3 size={22} className="text-accent" /> Discografía
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            <ReleaseList title="Álbumes" items={albums} />
            <ReleaseList title="Singles" items={singles} />
          </div>
        </Reveal>

        {/* Videos */}
        <Reveal className="pb-20">
          <h2 className="mb-8 flex items-center gap-2 font-display text-2xl font-bold">
            <PlayCircle size={22} className="text-accent" /> Videos
          </h2>
          {artist.videos.length === 0 && (
            <p className="text-mute">Próximamente.</p>
          )}
          <div className="grid gap-5 md:grid-cols-2">
            {artist.videos.map((v) => (
              <div key={v.youtubeId} className="overflow-hidden rounded-xl2 border border-line">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${v.youtubeId}`}
                    title={v.title}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
                <p className="p-4 text-sm text-mute">{v.title}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Galeria */}
        <Reveal className="pb-20">
          <h2 className="mb-8 font-display text-2xl font-bold">Galería</h2>
          {artist.gallery && artist.gallery.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {artist.gallery.map((src) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={src}
                  src={src}
                  alt={artist.name}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full rounded-xl2"
                />
              ))}
            </div>
          ) : (
            <p className="text-mute">Próximamente.</p>
          )}
        </Reveal>

        {/* Eventos */}
        <Reveal className="pb-20">
          <h2 className="mb-8 flex items-center gap-2 font-display text-2xl font-bold">
            <CalendarDays size={22} className="text-accent" /> Próximos eventos
          </h2>
          {artist.events.length === 0 ? (
            <p className="text-mute">Sin fechas anunciadas por ahora. Muy pronto habrá noticias.</p>
          ) : (
            <ul className="divide-y divide-line rounded-xl2 border border-line">
              {artist.events.map((ev) => (
                <li key={ev.date + ev.venue} className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <p className="font-display text-lg font-semibold">{ev.venue}</p>
                    <p className="text-sm text-mute">{ev.city}</p>
                  </div>
                  <time className="text-sm text-accent">
                    {new Date(ev.date + "T12:00:00").toLocaleDateString("es-MX", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        {/* Contrataciones */}
        <Reveal className="pb-24">
          <div className="glass mx-auto max-w-2xl rounded-xl2 p-8">
            <h2 className="font-display text-2xl font-bold">Contrataciones</h2>
            <p className="mt-2 text-sm text-mute">
              ¿Quieres a {artist.name} en tu evento? Escríbenos.
            </p>
            {sent ? (
              <p className="mt-6 flex items-center gap-2 text-accent">
                Recibimos tu solicitud. Te contactaremos pronto. <ArrowUpRight size={15} />
              </p>
            ) : (
              <form
                className="mt-6 grid gap-4 sm:grid-cols-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const data = Object.fromEntries(new FormData(e.currentTarget).entries());
                  const res = await fetch("/api/leads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ role: "booking", artist: artist.name, ...data }),
                  });
                  if (res.ok) setSent(true);
                }}
              >
                <input name="nombre" required placeholder="Nombre" className="rounded-lg border border-line bg-white px-4 py-3 text-sm placeholder:text-mute" />
                <input name="correo" required type="email" placeholder="Correo" className="rounded-lg border border-line bg-white px-4 py-3 text-sm placeholder:text-mute" />
                <textarea name="mensaje" required rows={4} placeholder="Cuéntanos sobre el evento" className="rounded-lg border border-line bg-white px-4 py-3 text-sm placeholder:text-mute sm:col-span-2" />
                <button className="rounded-full bg-brand py-3 font-medium text-white transition-transform duration-300 hover:scale-[1.01] sm:col-span-2">
                  Enviar solicitud
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      <Footer />
    </main>
  );
}

function ReleaseList({ title, items }: { title: string; items: { title: string; year: number }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-mute">{title}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-mute">Próximamente.</p>
      ) : (
        <ul className="divide-y divide-line rounded-xl2 border border-line">
          {items.map((r) => (
            <li key={r.title} className="flex items-center justify-between p-4">
              <span className="font-display font-semibold">{r.title}</span>
              <span className="text-sm text-mute">{r.year}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
