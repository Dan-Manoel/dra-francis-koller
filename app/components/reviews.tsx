"use client";

import { useEffect, useState, useRef } from "react";
import { Star, MessageCircle, ExternalLink } from "lucide-react";
import { motion, useMotionValue, useAnimationFrame, useMotionValueEvent } from "framer-motion";

interface Review {
    author_name: string;
    rating: number;
    text: string;
    profile_photo_url: string;
    relative_time_description: string;
}

interface PlaceData {
    reviews?: Review[];
    user_ratings_total?: number;
    rating?: number;
}

export function Reviews() {
    const [data, setData] = useState<PlaceData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch("/api/reviews");
                const json = await res.json();
                if (res.ok) {
                    setData(json);
                }
            } catch (err) {
                console.error("Failed to fetch reviews", err);
            } finally {
                setLoading(false);
            }
        }
        fetchReviews();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 min-h-[40vh]">
                <div className="w-12 h-12 border-4 border-[#1a2e22]/20 border-t-[#d4a373] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!data?.reviews || data.reviews.length === 0) {
        return (
            <div className="text-center py-20 min-h-[40vh]">
                <MessageCircle className="mx-auto h-12 w-12 text-[#1a2e22]/20 mb-4" />
                <p className="text-[#1a2e22]/60 font-medium">Nenhum depoimento encontrado no momento.</p>
            </div>
        );
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                size={16}
                className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}
            />
        ));
    };

    return (
        <div className="w-full">
            {/* Overview Head */}
            <div className="flex flex-col items-center justify-center text-center mb-16">
                <div className="text-5xl font-serif font-bold text-[#1a2e22] mb-4">
                    {data.rating?.toFixed(1) || "5.0"}
                </div>
                <div className="flex gap-1 mb-4">
                    {renderStars(data.rating ? Math.round(data.rating) : 5)}
                </div>
                <p className="text-sm font-bold tracking-widest text-[#1a2e22]/60 uppercase border border-[#1a2e22]/10 bg-white/50 px-4 py-2 rounded-full shadow-sm">
                    Baseado em {data.user_ratings_total || data.reviews.length} avaliações no Google
                </p>
            </div>

            {/* Reviews Carousel */}
            <div className="mb-20 -mx-6 md:-mx-20 overflow-visible">
                <ReviewsCarousel reviews={data.reviews} />
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
                <a
                    href="https://www.google.com/search?sca_esv=1ef01aa32e62b85d&sxsrf=ANbL-n4COH_JVCL2yL_2cVEdjvTE4RSvCQ:1772390733164&q=avalia%C3%A7%C3%B5es+sobre+dra.+francis+koller+%7C+acupuntura+cl%C3%ADnica,+ozonioterapia,+fisioterapia+regenerativa.+votorantim&uds=ALYpb_l_c6VAZZ_xpxiQMIrsixJBjuRc1WpJ2MXgM-63bbbM1gKtaYipHuR1mrpoVp8HUAdLLWJ7ohFT-BeHPcl4x3pQmX331cuJX6ONtKLWvQvgRXzRqXhcW33KZie_cL7RANa3f1Qe7NMK6FMQw_zq726rYP2HDIEJCuVfV7PF68JzV5zZcZ79uXsKcCPImUqYuFc_HdTub_SuHFuWJNVcbw4rWkzpHeErTi31PdZVamlpL-3hbOQMzvkdHVZoLoO8qSVUXNXnW_SWRdUrGuumikz4c7ofHlRRHapgvNI2HnOlJTq4TkbQlEbM2g0jPwMjZh1BNs2s0zYvn3TZfIfaMQyph5Ny0uB7g8z_9NzxIQaCwpPcBWcrqtkTIwgpGG-oE2J6afBp5ve4EPgXTeliMmcb7EcZpcviIDUXKzL0DoL1lAOEWCsEPGCHhg-0bjnPzQvISm5zhH0HP0CUblSbm7q_rgR3FgUzqBBkXB9st6Oqq77vX75us4kGE7sR2QSTNPwywVJWPcEojVJLV2GqB_pLungdqg&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOXCm86zKvH-H1VZa2APceqMKLEjwlGJdzae_5rLeThXH2jsZpa-UAYS17CtYUmHqSkheb5ii5awsAsYlSMaa8eaU55U2PIpd75AQwdtrKbFvcYi1jdC3J4gofkdJzpNnJeb36m4Re1MToNf18UjbX0M73seUCQZi9CidEAFbVopz7sQdfXyKHegVosoSe8QWrDczdZRJ5pjrA0OR2n0_cyByFHGw&sa=X&ved=2ahUKEwipu7aArv-SAxWJIbkGHfg7LmgQk8gLegQILRAB&ictx=1&biw=384&bih=698&dpr=3.75"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1a2e22] text-[#f4f4f0] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#d4a373] hover:scale-105 transition-all cursor-pointer shadow-lg"
                >
                    Ver todos no Google <ExternalLink size={16} />
                </a>
            </div>
        </div>
    );
}

function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);

    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const pointerDownPos = useRef({ x: 0, y: 0 });

    const x = useMotionValue(0);
    const isInitialized = useRef(false);

    useEffect(() => {
        const measure = () => {
            if (containerRef.current) {
                const measuredWidth = containerRef.current.scrollWidth / 2;
                setContentWidth(measuredWidth);

                if (!isInitialized.current && measuredWidth > 0) {
                    isInitialized.current = true;
                }
            }
        };
        measure();
        setTimeout(measure, 500);
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [reviews]);

    useMotionValueEvent(x, "change", (latest) => {
        if (contentWidth === 0) return;
        if (latest <= -contentWidth) {
            x.jump(latest + contentWidth);
        } else if (latest >= 0) {
            x.jump(latest - contentWidth);
        }
    });

    useAnimationFrame((time, delta) => {
        // Pause animation if dragging or hovered desktop
        if (isDragging || isHovered || contentWidth === 0) return;

        // Matched speed with the home carousel
        const speed = 0.3;
        const moveBy = -speed * (delta / 8);
        x.set(x.get() + moveBy);
    });

    const handleCardClick = (e: React.MouseEvent) => {
        const distX = Math.abs(e.clientX - pointerDownPos.current.x);
        const distY = Math.abs(e.clientY - pointerDownPos.current.y);
        // Ignore clicks if they were actually drags 
        if (distX > 5 || distY > 5) return;
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                size={16}
                className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}
            />
        ));
    };

    return (
        <div className="relative w-full overflow-hidden py-12 px-6 md:px-20 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] pointer-events-none">
            <div className="pointer-events-auto">

                <motion.div
                    ref={containerRef}
                    className="flex gap-8 w-max cursor-grab active:cursor-grabbing"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -10000, right: 10000 }}
                    dragElastic={0}
                    dragMomentum={false}
                    onPointerDown={(e) => {
                        pointerDownPos.current = { x: e.clientX, y: e.clientY };
                    }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {[0, 1].map((setIndex) => (
                        <div key={`set-${setIndex}`} className="flex gap-8 shrink-0 px-4 items-center">
                            {reviews.map((review, idx) => (
                                <div
                                    key={`${idx}-${setIndex}`}
                                    onClick={handleCardClick}
                                    className="flex flex-col flex-1 p-8 bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-[300px] md:w-[450px] min-h-[250px] shrink-0"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        {review.profile_photo_url ? (
                                            <img
                                                src={review.profile_photo_url}
                                                alt={review.author_name}
                                                className="w-12 h-12 rounded-full object-cover shadow-sm"
                                                referrerPolicy="no-referrer"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-[#1a2e22]/10 flex items-center justify-center shadow-sm">
                                                <span className="text-[#1a2e22] font-bold text-lg">
                                                    {review.author_name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="font-bold text-[#1a2e22]">{review.author_name}</h4>
                                            <div className="text-xs text-[#1a2e22]/50 mt-1 font-medium">{review.relative_time_description}</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 mb-4">
                                        {renderStars(review.rating)}
                                    </div>

                                    <p className="text-[#1a2e22]/80 leading-relaxed italic line-clamp-6">
                                        "{review.text}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
