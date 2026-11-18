import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",        // negro profundo — intro y overlays
        paper: "#07080C",      // fondo base oscuro (continua la intro)
        panel: "#0E111A",      // superficies / tarjetas
        line: "#1C2131",       // bordes sutiles
        navy: "#EEF1F8",       // texto principal (claro sobre oscuro)
        mute: "#8C94AA",       // texto secundario
        brand: "#173B8F",   // azul Dan Creative (del logo oficial)
        accent: "#7C9CF2", // azul claro para links y acentos sobre oscuro
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
