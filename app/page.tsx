import Image from "next/image";
import { Navigation } from "./components/navigation";
import { Hero } from "./components/hero";
import { Services } from "./components/services";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div className="relative min-h-[200vh] bg-[#f4f4f0] overflow-hidden">

      {/* Static Background Texture (Server-Side Component) */}
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

      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content Sections */}
      <Hero />
      <Services />

      {/* Static Footer Component */}
      <Footer />

    </div>
  );
}