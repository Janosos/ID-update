"use client";
import React from 'react';
import Image from 'next/image';

const razones = [
  "Por amarme incondicionalmente, con todos mis defectos y virtudes.",
  "Por cada sacrificio que hiciste para darme lo mejor.",
  "Por ser mi refugio seguro cuando sentía miedo.",
  "Por impulsarme a perseguir mis sueños más locos.",
  "Por tu sentido del humor que siempre alegra mis días."
];

export default function GraciasSection() {
  return (
    <section className="feliz-section">
      <div className="container">
        <div className="row align-items-center">
          
          <div className="col-lg-5 mb-5 mb-lg-0 feliz-fade-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="feliz-title feliz-section-title text-start">Gracias por...</h2>
            <div className="feliz-divider mx-0 mb-5" style={{ width: '60px' }}></div>
            
            <div className="d-flex flex-column">
              {razones.map((razon, index) => (
                <div key={index} className="feliz-list-item">
                  <p className="feliz-list-text" style={{ fontSize: '1.3rem', fontWeight: 500 }}>
                    {razon}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-7 feliz-fade-up" style={{ animationDelay: '0.4s' }}>
            <div 
              className="feliz-img-wrapper protected-image-wrapper" 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--card-bg)', height: 'auto', padding: '1rem', borderRadius: '30px' }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="protected-image-overlay" />
              <Image
                className="protected-image"
                src="/feliz-dia-del-padre/hero-bg.png"
                alt="Día del Padre"
                width={800}
                height={800}
                style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                onDragStart={(e) => e.preventDefault()}
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
