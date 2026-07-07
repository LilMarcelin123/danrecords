import { ArrowRight } from "lucide-react";
import { news as fallbackNews } from "@/lib/news";
import { fetchInstagramNews } from "@/lib/instagram";
import Reveal from "@/components/Reveal";

/**
 * NEWS — centro oficial de noticias de DanRecords.
 * Fuente principal: Instagram (@dancreative___newws) via fetchInstagramNews;
 * mientras no haya token, se muestra el contenido curado de lib/news.ts.
 * Tarjetas: imagen completa + badge de fecha azul montado + "Leer más".
 */
export default async function NewsSection() {
  const ig = await fetchInstagramNews();
  const items = ig.length > 0 ? ig : fallbackNews;

  return (
    <section id="news" className="border-t border-line bg-panel/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="mb-2 font-display text-xs uppercase tracking-[0.4em] text-accent">
            News
          </p>
          <h2 className="mb-3 font-display text-4xl font-bold md:text-6xl">
            Lo que está pasando en DanRecords
          </h2>
          <p className="mb-12 max-w-xl text-mute">
            Sincronizado con nuestra cuenta oficial de noticias en Instagram.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl2 border border-line bg-white transition-all duration-500 ease-cine hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(16,26,56,0.10)]">
                {/* Imagen completa + badge de fecha montado */}
                <div className="relative">
                  {n.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={n.image}
                      alt={n.title}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full"
                    />
                  ) : (
                    <div
                      className="h-44 w-full"
                      style={{ background: `linear-gradient(160deg, ${n.palette[0]}, ${n.palette[1]})` }}
                    />
                  )}
                  <time className="absolute -bottom-3 left-4 rounded-full bg-brand px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white shadow-[0_6px_16px_rgba(23,59,143,0.35)]">
                    {new Date(n.date + "T12:00:00").toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>

                <div className="flex flex-1 flex-col p-5 pt-7">
                  <h3 className="font-display text-lg font-semibold leading-snug">{n.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{n.summary}</p>
                  <a
                    href={n.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium uppercase tracking-wide text-accent"
                  >
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    Leer más
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
