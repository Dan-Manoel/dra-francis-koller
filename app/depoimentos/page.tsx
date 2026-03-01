import Image from "next/image";
import { Reviews } from "../components/reviews";
import { MessageCircleHeart } from "lucide-react";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";

export const metadata = {
    title: "Depoimentos | Dra. Francis Koller",
    description: "Leia os depoimentos e experiências de quem já passou pelos tratamentos humanizados e integrativos da Dra. Francis Koller.",
};

export default function DepoimentosPage() {
    return (
        <div className="relative min-h-screen bg-[#f4f4f0] overflow-hidden">
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

            {/* Decorative Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#d4a373]/10 blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#1a2e22]/5 blur-3xl" />

            {/* Main Content */}
            <div className="relative z-10 pt-40 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col items-center justify-center text-center mb-20">
                        <div className="w-16 h-16 rounded-full bg-[#1a2e22]/5 flex items-center justify-center mb-8">
                            <MessageCircleHeart className="text-[#1a2e22]/40" size={32} />
                        </div>

                        <h1 className="text-5xl md:text-7xl font-serif text-[#1a2e22] tracking-tighter mb-8 leading-[1.1]">
                            Histórias Que <br className="hidden md:block" />
                            <span className="italic text-[#1a2e22]/50">Inspiram</span>
                        </h1>

                        <p className="text-[#1a2e22]/60 text-lg md:text-xl max-w-2xl leading-relaxed">
                            Cada paciente carrega uma história única. Mais do que tratamentos, construímos jornadas
                            de cuidado, recuperação e reencontro com a qualidade de vida e com a própria essência.
                        </p>
                    </div>

                    {/* Integration with Google Places API component */}
                    <div className="relative z-20">
                        <Reviews />
                    </div>
                </div>
            </div>

            {/* Static Footer Component */}
            <Footer />
        </div>
    );
}
