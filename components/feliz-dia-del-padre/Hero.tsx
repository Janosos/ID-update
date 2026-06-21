import React from 'react';

export default function Hero() {
  return (
    <section className="feliz-hero">
      <div className="feliz-hero-content feliz-fade-up">
        <h1 className="feliz-title feliz-hero-h1">Feliz Día del Padre</h1>
        <p className="feliz-hero-p">
          Gracias por ser mi guía, mi ejemplo y mi mayor apoyo en cada paso del camino.
        </p>
        <div className="mt-4">
          <a href="#frases" className="feliz-btn">
            Leer dedicatoria <i className="bi bi-arrow-down-circle ms-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
