"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { artists } from "@/lib/artists";
import ArtistPhoto from "@/components/ArtistPhoto";
import Reveal from "@/components/Reveal";

/**
 * ROSTER — cuadricula editorial de artistas.
 * Fotos grandes a sangre, nombre y genero sobre degradado, zoom + flecha al pasar el mouse.
 * Desktop: 2 tarjetas grandes arriba y 3 abajo (grid de 6 columnas).
 */
export default function ArtistCatalog() {
  return (
    <section id="roster" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:py-32">
      <Reveal>
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-display text-xs uppercase tracking-[0.45em] text-accent">Artists</p>
            <h2 className="font-display text-5xl font-extrabold leading-none tracking-tight md:text-7xl">
              El corazón
              <br />
              <span className="text-white/40">de DanRecords</span>
            </h2>
          </div>
          <p className="max-w-sm text-mute">
            {artists.length} artistas, un mismo ecosistema. Conoce su música, sus videos y lo que viene.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {artists.map((a, i) => {
          const big = i < 2;
          return (
            <Reveal
              key={a.slug}
              delay={(i % 3) * 0.08}
              className={`${big ? "lg:col-span-3" : "lg:col-span-2"} ${i === artists.length - 1 && artists.length % 2 === 1 ? "sm:col-span-2 lg:col-span-2" : ""}`}
            >
              <Link
                href={`/artists/${a.slug}`}
                className={`group relative block overflow-hidden rounded-xl2 bg-panel ${
                  big ? "aspect-[4/5] lg:aspect-[6/5]" : "aspect-[4/5]"
                }`}
              >
                <ArtistPhoto
                  artist={a}
                  className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-cine group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/5 transition-all duration-500 group-hover:ring-accent/40" />

                <span className="absolute right-5 top-5 flex h-11 w-11 -translate-y-2 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-cine group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={20} />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.35em] text-accent">{a.genre}</p>
                  <h3
                    className={`font-display font-extrabold leading-none tracking-tight text-white transition-transform duration-500 ease-cine group-hover:-translate-y-1 ${
                      big ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"
                    }`}
                  >
                    {a.name}
                  </h3>
                  <p className="mt-3 flex items-center gap-1.5 text-sm text-white/0 transition-colors duration-500 group-hover:text-white/80">
                    Ver perfil <ArrowUpRight size={14} />
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
