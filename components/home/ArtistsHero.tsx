"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { artists, type Artist } from "@/lib/artists";
import ArtistPhoto from "@/components/ArtistPhoto";
import BrandMark from "@/components/BrandMark";

/**
 * HERO — mosaico editorial full-bleed estilo Warner Records:
 * fotografias de pared a pared ocupando todo el viewport y el logotipo
 * de DanRecords fijo al centro (el mismo disco de la intro "aterriza" aqui).
 * Hover: zoom + overlay + nombre + "Explorar". Click: expansion cinematografica.
 */
export default function ArtistsHero() {
  const router = useRouter();
  const [expanding, setExpanding] = useState<Artist | null>(null);
  const heroArtists = artists.slice(0, 5);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Parallax cinematografico al hacer scroll (GSAP ScrollTrigger, scrub)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, {
        yPercent: 55,
        scale: 0.82,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.fromTo(
        gridRef.current,
        { scale: 1 },
        {
          scale: 1.05,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function openArtist(artist: Artist) {
    setExpanding(artist);
    setTimeout(() => router.push(`/artists/${artist.slug}`), 750);
  }

  return (
    <section ref={sectionRef} id="artists" className="relative h-screen w-full overflow-hidden">
      {/* Mosaico de pared a pared: 5 columnas en desktop, 2x3 en movil */}
      <div ref={gridRef} className="grid h-full grid-cols-2 grid-rows-3 md:grid-cols-5 md:grid-rows-1">
        {heroArtists.map((artist, i) => (
          <button
            key={artist.slug}
            onClick={() => openArtist(artist)}
            className={`group relative overflow-hidden text-left ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
            aria-label={`Explorar ${artist.name}`}
          >
            <ArtistPhoto
              artist={artist}
              eager
              className="h-full w-full transition-transform duration-700 ease-cine group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/55" />
            <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-all duration-500 ease-cine group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-display text-2xl font-bold text-white">{artist.name}</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-white/90">
                Explorar <ArrowUpRight size={15} />
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Logotipo central persistente (misma posicion que el vinilo de la intro) */}
      <div ref={logoRef} className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <BrandMark size={220} className="shadow-[0_0_80px_rgba(0,0,0,0.6)]" />
      </div>

      {/* Expansion cinematografica hacia la landing */}
      <AnimatePresence>
        {expanding && (
          <motion.div
            key="expand"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] overflow-hidden"
            style={{ background: `linear-gradient(160deg, ${expanding.palette[0]}, ${expanding.palette[1]})` }}
          >
            <ArtistPhoto artist={expanding} eager className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="relative flex h-full items-end p-10">
              <p className="font-display text-4xl font-bold text-white md:text-6xl">{expanding.name}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
