import type { Metadata } from "next";
import { Syne, Instrument_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const display = Syne({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700", "800"] });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL("https://danrecords.com"), // TODO: dominio final
  title: {
    default: "DanRecords — Música, tecnología y creatividad",
    template: "%s · DanRecords",
  },
  description:
    "DanRecords es una disquera moderna: artistas, noticias, historia y la plataforma que conecta todo el ecosistema.",
  openGraph: {
    title: "DanRecords",
    description: "Música, tecnología y creatividad trabajando conectadas.",
    type: "website",
    locale: "es_MX",
  },
};

export const viewport = {
  themeColor: "#173B8F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${body.variable} font-body grain`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
