import Image from "next/image";
import { Navigation } from "./components/navigation";
import { Hero } from "./components/hero";
import { Services } from "./components/services"; // Nova importação
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div className="relative min-h-[200vh] bg-[#f4f4f0] overflow-hidden">
      
      {/* Background Estático (Server Side Rendered) */}
      <div className="fixed inset-0 z-0 pointer-events-none md:opacity-40">
        <Image 
          src="/palm-fan.png" 
          alt="Background Texture" 
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Navegação e Cursor (Client Side - Interativo) */}
      <Navigation />

      {/* Conteúdo Principal Dividido em Blocos */}
      <Hero />
      <Services />

      {/* Footer (Server Side - Estático e Rápido) */}
      <Footer />

    </div>
  );
}