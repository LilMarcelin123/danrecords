import { notFound } from "next/navigation";
import { artistBySlug, artists } from "@/lib/artists";
import ArtistLanding from "@/components/artist/ArtistLanding";

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const artist = artistBySlug(params.slug);
  return { title: artist ? `${artist.name} — DanRecords` : "DanRecords" };
}

export default function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = artistBySlug(params.slug);
  if (!artist) notFound();
  return <ArtistLanding artist={artist} />;
}
