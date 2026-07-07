"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import type { Artist } from "@/lib/artists";

/**
 * Fotografia del artista con fade-in al cargar.
 * Importante: si la imagen termino de cargar ANTES de la hidratacion de React
 * (caso tipico en produccion), el evento onLoad nunca llega — por eso al montar
 * verificamos img.complete y marcamos loaded manualmente.
 */
export default function ArtistPhoto({
  artist,
  className = "",
  eager = false,
  fit = "cover",
}: {
  artist: Pick<Artist, "name" | "slug" | "palette" | "photo" | "focus">;
  className?: string;
  /** true en el hero: la imagen carga de inmediato (durante la intro) */
  eager?: boolean;
  /** "cover" llena el contenedor (con punto focal); "natural" muestra la imagen completa a su proporcion */
  fit?: "cover" | "natural";
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const src = artist.photo ?? `/artists/${artist.slug}.jpg`;

  // Si la imagen ya estaba completa al hidratar, onLoad no se dispara: cubrirlo aqui.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  if (fit === "natural") {
    return (
      <img
        ref={imgRef}
        src={src}
        alt={artist.name}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`block h-auto w-full transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(160deg, ${artist.palette[0]}, ${artist.palette[1]})` }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={artist.name}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{ objectPosition: artist.focus ?? "50% 25%" }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
