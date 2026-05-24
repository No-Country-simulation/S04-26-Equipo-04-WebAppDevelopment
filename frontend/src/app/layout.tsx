import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TalentRenew",
  description: "Plataforma de empleabilidad para talento senior",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interSans.variable}  h-full antialiased`}>
      <body className="min-h-full bg-background text-on-background">{children}</body>
    </html>
  );
}
