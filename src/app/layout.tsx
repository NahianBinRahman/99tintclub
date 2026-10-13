import type { Metadata } from "next";
import { Bebas_Neue, Anton, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "99 TINT CLUB | Premium Automotive Studio",
  description:
    "Luxury window tint, paint protection film, ceramic coating, color change wraps, and detailing studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${anton.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-white text-black font-sans antialiased selection:bg-[#FF1A1A] selection:text-white">
        {children}
      </body>
    </html>
  );
}
