import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumAI Studio - Gold Standard 2026",
  description: "Creador de CV Local-First",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}