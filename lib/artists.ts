export type Release = { title: string; year: number; type: "single" | "album" };
export type EventItem = { date: string; city: string; venue: string };

export type Artist = {
  slug: string;
  name: string;
  genre: string;
  bio: string;
  lastRelease: string;
  /** Colores del gradiente que se ve mientras carga la foto */
  palette: [string, string];
  photo?: string;
  /** Punto focal del recorte (object-position) — evita cortar la cara del artista */
  focus?: string;
  links: { spotify: string; appleMusic: string; youtube: string; instagram: string };
  discography: Release[];
  videos: { title: string; youtubeId: string }[];
  /** Rutas de fotos adicionales para la galeria de la landing */
  gallery?: string[];
  events: EventItem[];
  featured?: boolean;
};

/**
 * ROSTER OFICIAL DAN CREATIVE (jul 2026).
 * TODO con Dan: confirmar genero, bio, ultimo lanzamiento y links de
 * Spotify / Apple Music / YouTube de cada artista (hoy van placeholders "#").
 */
export const artists: Artist[] = [
  {
    slug: "el-dope",
    name: "El Dope",
    genre: "Urbano", // TODO confirmar
    bio: "Artista del roster de Dan Creative. Biografía oficial próximamente.",
    lastRelease: "Próximamente",
    palette: ["#1c2436", "#0a0d14"],
    photo: "/artists/el-dope.jpg",
    focus: "50% 12%",
    links: { spotify: "#", appleMusic: "#", youtube: "#", instagram: "https://www.instagram.com/el_dope_of/" },
    discography: [],
    videos: [],
    events: [],
    featured: true,
  },
  {
    slug: "vcomando",
    name: "Vcomando",
    genre: "Urbano", // TODO confirmar
    bio: "Artista del roster de Dan Creative. Biografía oficial próximamente.",
    lastRelease: "Próximamente",
    palette: ["#5c4a1f", "#14100a"],
    photo: "/artists/vcomando.jpg",
    focus: "50% 18%",
    links: { spotify: "#", appleMusic: "#", youtube: "#", instagram: "https://www.instagram.com/vcomando_/" },
    discography: [],
    videos: [],
    events: [],
    featured: true,
  },
  {
    slug: "ritoru-kai",
    name: "Ritoru Kai",
    genre: "Alternativo", // TODO confirmar
    bio: "Artista del roster de Dan Creative. Biografía oficial próximamente.",
    lastRelease: "Próximamente",
    palette: ["#3c5c1f", "#0f140a"],
    photo: "/artists/ritoru-kai.jpg",
    focus: "50% 30%",
    links: { spotify: "#", appleMusic: "#", youtube: "#", instagram: "https://www.instagram.com/_ritorukai_/" },
    discography: [],
    videos: [],
    events: [],
    featured: true,
  },
  {
    slug: "rayben",
    name: "Rayben",
    genre: "Pop alternativo", // TODO confirmar
    bio: "Artista del roster de Dan Creative. Biografía oficial próximamente.",
    lastRelease: "Próximamente",
    palette: ["#8f94a3", "#2a2d38"],
    photo: "/artists/rayben.jpg",
    focus: "42% 42%",
    links: { spotify: "#", appleMusic: "#", youtube: "#", instagram: "https://www.instagram.com/rayben_music/" },
    discography: [],
    videos: [],
    events: [],
    featured: true,
  },
  {
    slug: "el-burger",
    name: "El Burger",
    genre: "Urbano", // TODO confirmar
    bio: "Artista del roster de Dan Creative. Biografía oficial próximamente.",
    lastRelease: "Próximamente",
    palette: ["#3a3f4a", "#0d0f14"],
    photo: "/artists/el-burger.jpg",
    focus: "50% 10%",
    links: { spotify: "#", appleMusic: "#", youtube: "#", instagram: "https://www.instagram.com/elburger._/" },
    discography: [],
    videos: [],
    events: [],
    featured: true,
  },
];

export const featuredArtists = artists.filter((a) => a.featured);

export function artistBySlug(slug: string) {
  return artists.find((a) => a.slug === slug);
}

/** Agrupa artistas alfabeticamente para el buscador estilo Warner. */
export function artistsByLetter() {
  const groups = new Map<string, Artist[]>();
  for (const a of [...artists].sort((x, y) => x.name.localeCompare(y.name, "es"))) {
    const letter = a.name[0].toUpperCase();
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter)!.push(a);
  }
  return groups;
}
