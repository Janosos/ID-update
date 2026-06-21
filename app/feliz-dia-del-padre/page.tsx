import React from 'react';
import './feliz.css';
import Hero from '../../components/feliz-dia-del-padre/Hero';
import FrasesSection from '../../components/feliz-dia-del-padre/FrasesSection';
import GraciasSection from '../../components/feliz-dia-del-padre/GraciasSection';
import GallerySection from '../../components/feliz-dia-del-padre/GallerySection';
import Footer from '../../components/feliz-dia-del-padre/Footer';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feliz Día del Padre | Una Dedicatoria Especial',
  description: 'Explora esta dedicatoria especial llena de momentos inolvidables para celebrar el Día del Padre.',
  keywords: ['día del padre', 'dedicatoria', 'feliz día del padre', 'regalo', 'papá', 'momentos', 'padre e hijo'],
  openGraph: {
    title: 'Feliz Día del Padre',
    description: 'Una dedicatoria única y especial para agradecer a papá por todos los momentos inolvidables.',
    url: 'https://tusitio.com/feliz-dia-del-padre',
    siteName: 'Dedicatoria Día del Padre',
    images: [
      {
        url: '/feliz-dia-del-padre/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Imagen de portada del Día del Padre',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Feliz Día del Padre',
    description: 'Una dedicatoria única y especial para agradecer a papá.',
    images: ['/feliz-dia-del-padre/hero-bg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function FelizDiaDelPadrePage() {
  return (
    <div className="feliz-page">
      <Hero />
      <FrasesSection />
      <GraciasSection />
      <GallerySection />
      <Footer />
    </div>
  );
}
