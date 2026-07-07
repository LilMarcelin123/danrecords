import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HistorySection from "@/components/home/HistorySection";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "History — DanRecords" };

export default function HistoryPage() {
  return (
    <main className="pt-24">
      <Navbar />
      <HistorySection />
      <Footer />
    </main>
  );
}
