import type { Metadata } from "next";
import Image from "next/image";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { SmoothScroll } from "./components/smooth-scroll";
import { WhatsAppFloat } from "./components/whatsapp-float";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// --- SEO AND OPEN GRAPH CONFIGURATION ---
export const metadata: Metadata = {
  metadataBase: new URL("https://drafranciskoller.com.br"),

  title: {
    default: "Dra. Francis Koller | Saúde Integrativa",
    template: "%s | Dra. Francis Koller",
  },
  description: "Fisioterapia e Saúde Integrativa com abordagem holística. Restaurando a harmonia natural do corpo através de tratamentos personalizados.",

  keywords: ["Fisioterapia", "Saúde Integrativa", "Dra Francis Koller", "Saúde Holística", "Dor Crônica", "Tratamento Natural"],

  authors: [{ name: "Dra. Francis Koller" }, { name: "AboveDigital", url: "https://abovedigital.com.br" }],

  // Social Media Open Graph Tags (Facebook / WhatsApp / LinkedIn)
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Dra. Francis Koller | Saúde Integrativa",
    description: "Fisioterapia e Saúde Integrativa com abordagem holística.",
    siteName: "Dra. Francis Koller",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Dra. Francis Koller - Saúde Integrativa",
      },
    ],
  },

  // Twitter Card Configuration
  twitter: {
    card: "summary_large_image",
    title: "Dra. Francis Koller | Saúde Integrativa",
    description: "Fisioterapia e Saúde Integrativa com abordagem holística.",
    images: ["/og.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground selection:bg-leaf/30`}
      >
        <div className="bg-noise" />

        {/* Universal Static Background Texture */}
        <div className="fixed top-0 left-0 w-full h-[100lvh] z-0 pointer-events-none md:opacity-40">
          <Image
            src="/palm-fan.png"
            alt="Background Texture"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Global Smooth Scroll Wrapper */}
        <SmoothScroll>
          {children}
        </SmoothScroll>

        {/* Floating WhatsApp Action Button */}
        <WhatsAppFloat />

      </body>
    </html>
  );
}