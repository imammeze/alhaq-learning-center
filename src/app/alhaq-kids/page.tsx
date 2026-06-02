import type { Metadata } from "next";
import AlhaqKidsLanding from "@/components/programs/AlhaqKidsLanding";

export const metadata: Metadata = {
  title: "Alhaq Kids Center - Belajar Mengaji Anak",
  description:
    "Program bimbingan belajar mengaji yang menyenangkan untuk anak usia TK dan SD di Masjid Al Haq Bata Merah Purwokerto.",
};

export default function AlhaqKidsPage() {
  return <AlhaqKidsLanding />;
}
