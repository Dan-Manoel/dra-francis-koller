'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface Review {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
}

export function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/reviews')
            .then(res => res.json())
            .then(data => {
                if (data.reviews) setReviews(data.reviews);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="py-20 text-center flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-[#1a2e22]/20 border-t-[#d4a373] rounded-full animate-spin"></div>
        </div>
    );

    if (!reviews || reviews.length === 0) return (
        <div className="py-20 text-center text-[#1a2e22]/60">Nenhum depoimento encontrado no momento.</div>
    );

    return (
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-serif text-center mb-12 text-[#1a2e22]">
                    O que dizem os <span className="italic text-[#d4a373]">pacientes</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col justify-between transition-all duration-300"
                        >
                            <div>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill={i < review.rating ? "#d4a373" : "none"}
                                            className={i < review.rating ? "text-[#d4a373]" : "text-[#1a2e22]/20"}
                                        />
                                    ))}
                                </div>
                                <p className="text-[#1a2e22]/80 italic text-sm mb-6 leading-relaxed">
                                    "{review.text.substring(0, 200)}{review.text.length > 200 ? '...' : ''}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {review.profile_photo_url ? (
                                    <img
                                        src={review.profile_photo_url}
                                        alt={review.author_name}
                                        className="w-12 h-12 rounded-full border-2 border-[#d4a373]/20 object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-[#1a2e22]/10 flex items-center justify-center">
                                        <span className="text-[#1a2e22] font-bold text-lg">
                                            {review.author_name.charAt(0)}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <p className="font-bold text-[#1a2e22] text-sm">{review.author_name}</p>
                                    <p className="text-xs text-[#1a2e22]/60 mt-1">{review.relative_time_description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a
                        href="https://www.google.com/search?q=francis%20marione%20koller#lrd=0x94c58bdb0670309d:0x8c3dca98d2581068,1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a2e22] text-[#f4f4f0] rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#d4a373] transition-colors shadow-lg"
                    >
                        Ver todos no Google
                    </a>
                </div>
            </div>
        </section>
    );
}
