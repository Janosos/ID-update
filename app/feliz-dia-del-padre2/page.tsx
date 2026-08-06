import React from 'react';
import '../feliz-dia-del-padre/feliz.css';

import Hero from '../../components/feliz-dia-del-padre/Hero';
import FrasesSection from '../../components/feliz-dia-del-padre/FrasesSection';
import GraciasSection from '../../components/feliz-dia-del-padre/GraciasSection';
import GallerySection2 from '../../components/feliz-dia-del-padre/GallerySection2';
import Footer from '../../components/feliz-dia-del-padre/Footer';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feliz Día del Padre | Momentos Inolvidables',
  description: 'Explora esta dedicatoria especial llena de recuerdos y enseñanzas invaluables para celebrar a papá.',
  keywords: ['día del padre', 'dedicatoria', 'recuerdos', 'feliz día del padre', 'regalo familiar', 'papá', 'momentos'],
  openGraph: {
    title: 'Feliz Día del Padre | Momentos',
    description: 'Una dedicatoria única y especial llena de fotografías y momentos con papá.',
    url: 'https://www.imperiodev.com/feliz-dia-del-padre2',
    siteName: 'ImperioDev',
    images: [
      {
        url: '/feliz-dia-del-padre/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Imagen de portada del Día del Padre',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Feliz Día del Padre | Momentos',
    description: 'Una dedicatoria única y especial llena de fotografías con papá.',
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

export default function FelizDiaDelPadrePage2() {
  return (
    <div className="feliz-page">
      <Hero />
      <FrasesSection />
      <GraciasSection />
      <GallerySection2 />
      <Footer />
    </div>
  );
}
