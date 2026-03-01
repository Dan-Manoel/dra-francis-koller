import Image from "next/image";
import { Navigation } from "./components/navigation";
import { Hero } from "./components/hero";
import { Services } from "./components/services";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div className="relative min-h-[200vh] bg-transparent overflow-hidden">

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