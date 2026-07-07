import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",        // negro — solo para la intro y overlays sobre fotos
        paper: "#FBFBFA",      // fondo base (blanco calido)
        panel: "#F3F5FB",      // superficies (azul palidisimo)
        line: "#E3E6EF",       // bordes
        navy: "#101A38",       // texto principal (azul muy oscuro)
        mute: "#5C6478",       // texto secundario
        brand: "#173B8F",   // azul Dan Creative (del logo oficial)
        accent: "#1E4AB8", // azul vivo para links, hovers y acentos sobre blanco
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      borderRadius: { xl2: "1.25rem" },
      transitionTimingFunction: { cine: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  },
  plugins: [],
};
export default config;
