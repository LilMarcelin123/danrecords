"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Music2 } from "lucide-react";
import { artists, artistsByLetter, type Artist } from "@/lib/artists";
import ArtistPhoto from "@/components/ArtistPhoto";
import Reveal from "@/components/Reveal";

/**
 * CATALOGO — dos columnas.
 * Izquierda: ficha dinamica del artista (sin recarga, con animaciones).
 * Derecha: buscador alfabetico inspirado en Warner Records.
 */
export default function ArtistCatalog() {
  const [selected, setSelected] = useState<Artist>(artists[0]);
  const groups = artistsByLetter();

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <p className="mb-2 font-display text-xs uppercase tracking-[0.4em] text-accent">Artists</p>
        <h2 className="mb-12 font-display text-4xl font-bold md:text-6xl">El corazón de DanRecords</h2>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* IZQUIERDA — informacion dinamica */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AnimatePresence mode="wait">
            <motion.article
              key={selected.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass overflow-hidden rounded-xl2"
            >
              <ArtistPhoto artist={selected} fit="natural" className="rounded-t-xl2" />
              <div className="p-7">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">{selected.genre}</p>
                <h3 className="mt-1 font-display text-3xl font-bold">{selected.name}</h3>
                <p className="mt-4 leading-relaxed text-mute">{selected.bio}</p>
                <p className="mt-4 flex items-center gap-2 text-sm">
                  <Music2 size={15} className="text-accent" />
                  Último lanzamiento: <span className="text-navy">{selected.lastRelease}</span>
                </p>
                <div className="mt-6 flex flex-wrap gap-2 text-sm">
                  {Object.entries({
                    Spotify: selected.links.spotify,
                    "Apple Music": selected.links.appleMusic,
                    YouTube: selected.links.youtube,
                    Instagram: selected.links.instagram,
                  }).map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      className="rounded-full border border-line px-3 py-1 text-mute transition-colors hover:border-accent hover:text-accent"
                    >
                      {label}
                    </a>
                  ))}
                </div>
                <Link
                  href={`/artists/${selected.slug}`}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
                >
                  Ver Perfil Completo <ArrowUpRight size={16} />
                </Link>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* DERECHA — buscador alfabetico */}
        <div>
          {Array.from(groups.entries()).map(([letter, list]) => (
            <Reveal key={letter} className="mb-8">
              <p className="mb-3 border-b border-line pb-2 font-display text-2xl font-bold text-accent">
                {letter}
              </p>
              <ul className="space-y-1">
                {list.map((a) => (
                  <li key={a.slug}>
                    <button
                      onClick={() => setSelected(a)}
                      className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors duration-300 ${
                        selected.slug === a.slug ? "bg-panel text-accent" : "hover:bg-panel"
                      }`}
                    >
                      <span className="font-display text-lg">{a.name}</span>
                      <span className="text-xs text-mute opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {a.genre}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
