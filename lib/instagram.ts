import type { NewsItem } from "./news";

/**
 * Sincronizacion con la cuenta oficial de noticias de DanRecords en Instagram.
 *
 * Requiere en .env.local:
 *   IG_USER_ID=...       (ID de la cuenta profesional)
 *   IG_ACCESS_TOKEN=...  (token de larga duracion de la Graph API)
 *
 * Uso recomendado: llamar desde un Server Component con
 *   export const revalidate = 900; // ISR cada 15 min
 */
export async function fetchInstagramNews(): Promise<NewsItem[]> {
  const userId = process.env.IG_USER_ID;
  const token = process.env.IG_ACCESS_TOKEN;
  if (!userId || !token) return [];

  const fields = "id,caption,media_url,thumbnail_url,permalink,timestamp";
  const url = `https://graph.instagram.com/v21.0/${userId}/media?fields=${fields}&access_token=${token}&limit=12`;

  const res = await fetch(url, { next: { revalidate: 900 } });
  if (!res.ok) return [];
  const data = await res.json();

  return (data.data ?? []).map((post: any) => {
    const caption: string = post.caption ?? "";
    const [firstLine, ...rest] = caption.split("\n").filter(Boolean);
    return {
      id: post.id,
      image: post.media_url ?? post.thumbnail_url ?? "",
      palette: ["#232326", "#0a0a0b"] as [string, string],
      date: (post.timestamp ?? "").slice(0, 10),
      title: firstLine ?? "Noticia",
      summary: rest.join(" ").slice(0, 140),
      permalink: post.permalink ?? "#",
    };
  });
}
