"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { Artist } from "@/lib/artists";

/**
 * Fotografia del artista. Mientras no exista public/artists/{slug}.jpg,
 * se muestra el gradiente propio del artista (la imagen solo aparece cuando carga,
 * asi nunca se ve el texto alt de una imagen rota).
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
  const src = artist.photo ?? `/artists/${artist.slug}.jpg`;

  if (fit === "natural") {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
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
