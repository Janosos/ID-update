"use client";
import React from 'react';
import Image from 'next/image';

export default function GallerySection2() {
  return (
    <section className="feliz-section">
      <div className="container">
        <div className="feliz-fade-up text-center">
          <h2 className="feliz-title feliz-section-title">Momentos Inolvidables</h2>
          <div className="feliz-divider"></div>
        </div>

        <div className="row g-4 mt-4 justify-content-center">
          <div className="col-12 col-md-6 feliz-fade-up" style={{ animationDelay: '0.2s' }}>
            <div 
              className="feliz-img-wrapper protected-image-wrapper" 
              style={{ padding: '0.5rem', backgroundColor: 'var(--card-bg)' }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="protected-image-overlay" />
              <Image
                className="protected-image"
                src="/feliz-dia-del-padre/whatsapp1.jpeg"
                alt="Momentos con papá"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'contain' }}
                onDragStart={(e) => e.preventDefault()}
                loading="lazy"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 feliz-fade-up" style={{ animationDelay: '0.4s' }}>
            <div 
              className="feliz-img-wrapper protected-image-wrapper" 
              style={{ padding: '0.5rem', backgroundColor: 'var(--card-bg)' }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="protected-image-overlay" />
              <Image
                className="protected-image"
                src="/feliz-dia-del-padre/whatsapp2.jpeg"
                alt="Enseñanzas de papá"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'contain' }}
                onDragStart={(e) => e.preventDefault()}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
