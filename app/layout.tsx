import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { SmoothScroll } from "./components/smooth-scroll"; // Mantendo sua importação correta
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

// --- CONFIGURAÇÃO DE METADADOS E OG ---
export const metadata: Metadata = {
  // 1. URL Base (IMPORTANTE: Substitua pela URL final do seu site na Vercel)
  // Sem isso, a imagem do WhatsApp/LinkedIn pode não aparecer.
  metadataBase: new URL("https://drafranciskoller.com.br"), 

  title: {
    default: "Dra. Francis Koller | Terapia Integrativa",
    template: "%s | Dra. Francis Koller",
  },
  description: "Ortopedia e Terapia Integrativa com abordagem holística. Restaurando a harmonia natural do corpo através de tratamentos personalizados.",
  
  keywords: ["Ortopedia", "Terapia Integrativa", "Dra Francis Koller", "Saúde Holística", "Dor Crônica", "Tratamento Natural"],
  
  authors: [{ name: "Dra. Francis Koller" }, { name: "AboveDigital", url: "https://abovedigital.com.br" }],
  
  // 2. Open Graph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Dra. Francis Koller | Terapia Integrativa",
    description: "Ortopedia e Terapia Integrativa com abordagem holística.",
    siteName: "Dra. Francis Koller",
    images: [
      {
        url: "/og.jpg", // O arquivo deve estar na pasta public
        width: 1200,
        height: 630,
        alt: "Dra. Francis Koller - Terapia Integrativa",
      },
    ],
  },

  // 3. Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Dra. Francis Koller | Terapia Integrativa",
    description: "Ortopedia e Terapia Integrativa com abordagem holística.",
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
        
        {/* Envolvendo tudo com o Smooth Scroll Global */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}