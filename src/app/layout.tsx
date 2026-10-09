import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteProvider } from "@/context/site-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1A1B1B",
};

export const metadata = {
  title: "$99 TINT CLUB | Bespoke Automotive Detailing & Ceramic Protection",
  description:
    "Luxury automotive studio specializing in self-healing paint protection film (PPF), advanced ceramic coatings, and precision multi-stage paint restoration.",
  keywords: [
    "Car Detailing",
    "Ceramic Coating",
    "Paint Protection Film",
    "PPF",
    "Paint Correction",
    "Hypercar Detailing",
    "Porsche Detailing",
    "$99tintclub",
    "$99 Tint Club",
  ],
  authors: [{ name: "$99 Tint Club" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#1A1B1B] text-white">
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
