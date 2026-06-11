import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Batamerah Learning Center",
  description: "Batamerah Learning Center adalah pusat pendidikan dan bimbingan belajar yang beralamat di Bata Merah, Purwokerto. Kami menyediakan berbagai program edukasi untuk kelompok usia dini hingga dewasa, dengan fokus pada pendidikan umum dan nilai-nilai spiritual Islam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
