export const revalidate = 900; // News se refresca desde Instagram cada 15 min

import CinematicIntro from "@/components/CinematicIntro";
import Navbar from "@/components/Navbar";
import ArtistsHero from "@/components/home/ArtistsHero";
import ArtistCatalog from "@/components/home/ArtistCatalog";
import NewsSection from "@/components/home/NewsSection";
import Footer from "@/components/Footer";

/**
 * Experiencia continua — una sola pagina, cada seccion es un capitulo:
 * Intro → Artists → News → Footer. (History y Platform tienen ruta propia.)
 */
export default function Home() {
  return (
    <main>
      <CinematicIntro />
      <Navbar />
      <ArtistsHero />
      <ArtistCatalog />
      <NewsSection />
      <Footer />
    </main>
  );
}
