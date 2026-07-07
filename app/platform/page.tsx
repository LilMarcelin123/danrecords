import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PlatformSection from "@/components/home/PlatformSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Platform — DanRecords" };

export default function PlatformPage() {
  return (
    <main className="pt-24">
      <Navbar />
      <PlatformSection />
      <Footer />
    </main>
  );
}
