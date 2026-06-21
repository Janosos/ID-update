'use client';

import React from 'react';

export default function Footer() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Feliz Día del Padre',
          text: 'Una dedicatoria muy especial para el Día del Padre.',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error compartiendo:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  return (
    <footer className="feliz-footer">
      <div className="container feliz-fade-up">
        <h3 className="feliz-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
          Feliz Día del Padre
        </h3>
        <p style={{ color: '#bdc3c7', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          Gracias por ser mi ancla en las tormentas y mi viento a favor en los días despejados. Te quiero muchísimo.
        </p>
        
        <button 
          onClick={handleShare}
          className="btn btn-light rounded-pill px-5 py-3 shadow-sm"
          style={{ fontWeight: 600, color: '#2c3e50', transition: 'all 0.3s' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <i className="bi bi-share-fill me-2"></i>
          Compartir esta dedicatoria
        </button>
        
        <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ color: '#95a5a6', fontSize: '0.9rem', margin: 0 }}>
            Con cariño, creado especialmente para ti.
          </p>
        </div>
      </div>
    </footer>
  );
}
