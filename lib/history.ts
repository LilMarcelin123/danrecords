export type Milestone = { year: string; title: string; text: string; image?: string; logo?: "silver" | "blue" };

export const timeline: Milestone[] = [
  {
    year: "2021",
    title: "El origen",
    text: "DanRecords nace en un estudio casero, con la convicción de que el talento independiente merecía una casa disquera que lo tratara como socio, no como producto.",
    image: "/history/studio-1.jpg",
  },
  {
    year: "2022",
    title: "La inspiración",
    text: "Los primeros lanzamientos demuestran la tesis: artistas con control creativo total y una disquera que aporta tecnología, estrategia y comunidad.",
    logo: "silver",
  },
  {
    year: "2024",
    title: "La visión",
    text: "Convertirnos en el ecosistema musical independiente de referencia en Latinoamérica.",
    image: "/history/lirico-signing.jpg",
  },
  {
    year: "2026",
    title: "La evolución",
    text: "Hoy DanRecords es una disquera, un medio de noticias y una plataforma tecnológica. Y esto apenas comienza.",
    logo: "blue",
  },
];

export type Member = {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  palette: [string, string];
  photo?: string;
};

export const team: Member[] = [
  {
    name: "Dan",
    role: "Fundador & Director Creativo",
    specialty: "Visión, A&R y dirección artística",
    bio: "La mente detrás del universo DanRecords. Productor y emprendedor.",
    palette: ["#eef1f9", "#dfe4f3"],
    photo: "/history/dan-founder.jpg",
  },
  {
    name: "María Torres",
    role: "Directora de Operaciones",
    specialty: "Gestión de proyectos y booking",
    bio: "Convierte ideas en giras, lanzamientos y resultados.",
    palette: ["#2b3a4f", "#0a0e14"] as [string, string],
  },
  {
    name: "Luis Herrera",
    role: "Head de Tecnología",
    specialty: "Plataforma y datos",
    bio: "Construye la infraestructura que conecta todo el ecosistema.",
    palette: ["#2b4f3a", "#0a140e"] as [string, string],
  },
  {
    name: "Sofía Reyes",
    role: "Editora en Jefe",
    specialty: "Contenido y noticias",
    bio: "Lidera el equipo editorial y la voz pública de DanRecords.",
    palette: ["#3d2b4f", "#0f0a14"] as [string, string],
  },
];
