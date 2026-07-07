import { timeline, team } from "@/lib/history";
import Reveal from "@/components/Reveal";

/**
 * HISTORY — el lado humano de DanRecords (estilo editorial):
 * carta del fundador con su foto, linea de tiempo con años en outline gigante
 * y filas alternadas foto/texto, y finalmente el equipo.
 */
export default function HistorySection() {
  return (
    <section id="history" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="mb-2 font-display text-xs uppercase tracking-[0.4em] text-accent">History</p>
          <h2 className="mb-16 font-display text-4xl font-bold md:text-6xl">
            No es un “acerca de”. Es nuestra historia.
          </h2>
        </Reveal>

        {/* Carta del fundador */}
        <div className="mb-24 grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <p className="mb-2 font-display text-xs uppercase tracking-[0.3em] text-accent">
              Carta del fundador
            </p>
            <p className="leading-relaxed text-mute">
              DanRecords empezó como una idea terca: que un artista independiente no tenía por qué
              elegir entre libertad creativa y una estructura que lo respaldara. Construimos la casa
              que nos hubiera gustado tener — tecnología, comunidad y transparencia en partes iguales.
            </p>
            <p className="mt-4 leading-relaxed text-mute">
              Cada artista que se suma escribe un capítulo nuevo. Esto no es una empresa que firma
              talento; es una familia que crece con él.
            </p>
            <p className="mt-6 font-display text-lg font-semibold text-navy">Dan</p>
            <p className="text-sm text-mute">Fundador &amp; Director Creativo</p>
            {/* Firma */}
            <svg viewBox="0 0 200 60" className="mt-3 h-12 w-40" aria-hidden="true">
              <path
                d="M8 42 C 24 10, 34 10, 40 34 C 44 50, 52 50, 60 30 C 66 16, 74 20, 78 38 C 96 30, 120 26, 150 22 M120 34 C 140 30, 168 28, 192 26"
                fill="none"
                stroke="#173B8F"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </Reveal>

          <Reveal delay={0.1}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/history/dan-founder.jpg"
              alt="Dan, fundador de DanRecords"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full rounded-xl2"
            />
          </Reveal>
        </div>

        {/* Divisor */}
        <div className="mx-auto mb-20 h-px w-full max-w-3xl bg-line" />

        {/* Linea de tiempo editorial */}
        <div className="space-y-24">
          {timeline.map((t, i) => {
            const hasVisual = Boolean(t.image || t.logo);
            const flip = i % 2 === 1;

            // Hito solo-texto: centrado, sin recuadro vacio
            if (!hasVisual) {
              return (
                <Reveal key={t.year}>
                  <div className="mx-auto max-w-2xl text-center">
                    <h3 className="font-display text-2xl font-bold md:text-3xl">{t.title}</h3>
                    <p className="mt-3 leading-relaxed text-mute">{t.text}</p>
                  </div>
                </Reveal>
              );
            }

            return (
              <Reveal key={t.year}>
                <div className="grid items-center gap-10 md:grid-cols-2">
                  {/* Visual: foto puesta natural, o logo sobre su color */}
                  <div className={flip ? "md:order-2" : ""}>
                    {t.logo ? (
                      <div
                        className="flex h-72 w-full items-center justify-center rounded-xl2"
                        style={{ background: t.logo === "silver" ? "#000000" : "#173B8F" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={t.logo === "silver" ? "/brand/dan-records-silver.png" : "/brand/creative-dan-blue.png"}
                          alt="DanRecords"
                          loading="lazy"
                          className="max-h-[55%] max-w-[70%] object-contain"
                        />
                      </div>
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={t.image}
                        alt={t.title}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full rounded-xl2"
                      />
                    )}
                  </div>

                  {/* Texto */}
                  <div className={flip ? "md:order-1" : ""}>
                    <h3 className="font-display text-2xl font-bold md:text-3xl">{t.title}</h3>
                    <p className="mt-2 max-w-lg leading-relaxed text-mute">{t.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Equipo */}
        <Reveal>
          <h3 className="mb-8 mt-24 font-display text-2xl font-bold md:text-3xl">El equipo</h3>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <article className="group h-full overflow-hidden rounded-xl2 border border-line bg-white transition-all duration-500 ease-cine hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(16,26,56,0.08)]">
                {m.photo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                ) : (
                  <div
                    className="h-56 w-full"
                    style={{ background: `linear-gradient(160deg, ${m.palette[0]}, ${m.palette[1]})` }}
                  />
                )}
                <div className="p-5">
                  <h4 className="font-display text-lg font-bold">{m.name}</h4>
                  <p className="text-sm text-accent">{m.role}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-mute">{m.specialty}</p>
                  <p className="mt-3 text-sm leading-relaxed text-mute">{m.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
