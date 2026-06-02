import type { Metadata } from "next";
import RumahQuranLanding from "@/components/programs/RumahQuranLanding";

export const metadata: Metadata = {
  title: "Rumah Quran Baitussalam - Tahsin & Tahfidz",
  description:
    "Program bimbingan belajar mengaji, tahsin, dan tahfidz khusus untuk SMA dan Mahasiswa di Purwokerto.",
};

export default function RumahQuranPage() {
  return <RumahQuranLanding />;
}
