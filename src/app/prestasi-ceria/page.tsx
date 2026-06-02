import type { Metadata } from "next";
import PrestasiCeriaLanding from "@/components/programs/PrestasiCeriaLanding";

export const metadata: Metadata = {
  title: "Prestasi Ceria Academy - English Course",
  description:
    "Bimbingan belajar Bahasa Inggris interaktif untuk semua umur di Masjid Al Haq Bata Merah Purwokerto.",
};

export default function PrestasiCeriaPage() {
  return <PrestasiCeriaLanding />;
}
