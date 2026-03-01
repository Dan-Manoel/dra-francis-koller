import { NextResponse } from 'next/server';

export async function GET() {
    const PLACE_ID = process.env.GOOGLE_PLACE_ID;
    const API_KEY = process.env.GOOGLE_API_KEY;

    if (!PLACE_ID || !API_KEY) {
        return NextResponse.json({ error: 'Configurações ausentes' }, { status: 500 });
    }

    try {
        // Usando a API de Places do Google para pegar detalhes (incluindo reviews)
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}&language=pt-BR`;

        const response = await fetch(url, {
            next: { revalidate: 86400 } // Cache de 24 horas (ISR)
        });

        const data = await response.json();

        if (data.status !== 'OK') {
            throw new Error(data.error_message || 'Erro ao buscar reviews');
        }

        return NextResponse.json(data.result);
    } catch (error) {
        return NextResponse.json({ error: 'Falha ao carregar depoimentos' }, { status: 500 });
    }
}
