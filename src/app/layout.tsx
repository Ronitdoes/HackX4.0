import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FluidShaderBackground from "@/components/FluidShaderBackground/FluidShaderBackground";
import LenisProvider from "@/components/LenisProvider";
import ViewportFix from "@/components/ViewportFix";
import PageTransitionProvider from "@/components/PageTransitionProvider";
import { NavTransitionProvider } from "@/context/NavTransitionContext";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-montserrat",
});

const oskariG2Sans = localFont({
  src: "../../public/assets/fonts/OskariG2Medium.otf",
  variable: "--font-sans",
});

const instrumentSerifItalic = localFont({
  src: "../../public/assets/fonts/InstrumentSerif-Italic.ttf",
  variable: "--font-serif",
});

const antonFallback = localFont({
  src: "../../public/assets/fonts/OskariG2Medium.otf",
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "HackX 4.0 — MUJ's Largest Hackathon",
  description: "HackX 4.0 — Join MUJ's biggest hackathon and ignite innovation.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon-192.ico", sizes: "192x192", type: "image/x-icon" },
      { url: "/icon-512.ico", sizes: "512x512", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oskariG2Sans.variable} ${instrumentSerifItalic.variable} ${antonFallback.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="32x32" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased flex flex-col min-h-screen-stable justify-between bg-transparent text-white relative">
        <ViewportFix />
        <LenisProvider>
          <NavTransitionProvider>
            <PageTransitionProvider>
              <FluidShaderBackground />
              <Navbar />
              <main className="flex-grow relative z-10">
                {children}
              </main>
              <Footer />
            </PageTransitionProvider>
          </NavTransitionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
