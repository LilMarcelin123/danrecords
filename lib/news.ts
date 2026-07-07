export type NewsItem = {
  id: string;
  image: string; // ruta local o URL de Instagram
  palette: [string, string];
  date: string;
  title: string;
  summary: string;
  permalink: string;
};

/**
 * NOTICIAS — contenido oficial de @dancreative___newws.
 * Cuando IG_USER_ID + IG_ACCESS_TOKEN esten configurados, estas se reemplazan
 * automaticamente por los posts en vivo de Instagram (fetchInstagramNews).
 */
export const news: NewsItem[] = [
  {
    id: "katy-perry",
    image: "/news/katy-perry.jpg",
    palette: ["#2b3a4f", "#0a0e14"],
    date: "2026-07-01",
    title: "Katy Perry vuelve con un sencillo cargado de energía y empoderamiento",
    summary:
      "La cantante marca una nueva etapa musical antes de anunciar más proyectos.",
    permalink: "https://www.instagram.com/p/DaQZcStNE6U/",
  },
  {
    id: "madonna",
    image: "/news/madonna.jpg",
    palette: ["#3d2b4f", "#0f0a14"],
    date: "2026-06-29",
    title: "Madonna prepara un gran regreso",
    summary:
      "Anunció que su nuevo álbum “Confessions It” llega el 3 de julio y adelantó que tiene algo grande planeado para este verano.",
    permalink: "https://www.instagram.com/p/DaLLQWwxL27/",
  },
  {
    id: "lirico-labs",
    image: "/news/lirico-firma.jpg",
    palette: ["#173b8f", "#0a0e14"],
    date: "2026-06-28",
    title: "Dan Creative firma con Lírico Labs",
    summary:
      "De cero a Lírico Labs: proyecto encabezado por Julián Gutiérrez Gaytán y Music VIP.",
    permalink: "https://www.instagram.com/p/DaI5RI-NyuC/",
  },
  {
    id: "menudo-50",
    image: "/news/menudo.jpg",
    palette: ["#4f3a2b", "#140e0a"],
    date: "2026-06-28",
    title: "Menudo celebra su 50 aniversario",
    summary:
      "Uno de los fenómenos juveniles más grandes de la música latina en los 80s y 90s, en el Teatro Metropólitan.",
    permalink: "https://www.instagram.com/p/DaJbt5HNm0T/",
  },
];
