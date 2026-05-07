import type { Metadata } from "next";
import { Manrope, Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-body",
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
    <html
      lang="es"
      className={`${manrope.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-on-background">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
