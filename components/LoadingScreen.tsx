"use client";

import React, { useState, useEffect } from 'react';

// Lista de frases divertidas estilo desarrollador mexicano
const frasesMexicanas = [
  "Poniendo aguacate al código",
  "Rezando para que compile",
  "Buscando el punto y coma",
  "Bugs por los sodas",
  "Poniendo cumbias de fondo",
  "Acomodando bits con cinta",
  "Su respectiva reiniciada",
  "Server sobornado con tacos",
  "Commit con 'jalando al 100'",
  "Que Telmex no falle hoy",
  "Sacando el fua en prod",
  "Haciendo patos un rato",
  "Caché limpio a escobazos",
  "Preguntando a ChatGPT",
  "Echándole ganas"
];

export default function LoadingScreen() {
  const [phrases, setPhrases] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleHide = () => {
      setVisible(false);
    };
    window.addEventListener("hide-loading-screen", handleHide);
    return () => window.removeEventListener("hide-loading-screen", handleHide);
  }, []);

  useEffect(() => {
    // Barajar el array al montar el componente (Orden aleatorio)
    const shuffled = [...frasesMexicanas].sort(() => Math.random() - 0.5);
    setPhrases(shuffled);
  }, []);

  useEffect(() => {
    if (phrases.length === 0) return;
    
    // Avanzar a la siguiente frase cada 1.2 segundos
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        // Nos aseguramos de no pasarnos del límite del array
        if (prev < phrases.length - 1) return prev + 1;
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [phrases]);

  useEffect(() => {
    // Desaparecer después de 3.0 segundos (experiencia más rápida)
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      const removeTimer = setTimeout(() => {
        setVisible(false);
      }, 500); // Duración de la transición de opacidad
      return () => clearTimeout(removeTimer);
    }, 3000);
    return () => clearTimeout(fadeTimer);
  }, []);

  if (!visible) return null;

  return (
    <div className={`loading-screen-overlay ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-screen-content">
        {/* Efecto de resplandor (Glow) detrás del logotipo */}
        <div className="loading-screen-glow animate-pulse"></div>

        {/* Logotipo de Imperio Dev */}
        <img
          src="https://www.imperiodev.com/wp-content/uploads/2026/01/LOGOIMPERIO.webp"
          alt="Imperio Dev Logo"
          className="loading-screen-logo animate-fade-in"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/400x150/1e293b/ffffff?text=IMPERIO+DEV';
          }}
        />

        {/* Contenedor de las frases animadas (Scroll tipo créditos) */}
        <div className="loading-screen-scroll-container">
          <div 
            className="loading-screen-mask"
          >
            <div 
              className="loading-screen-track"
              style={{ transform: `translateY(calc(55px - ${currentIndex * 40}px))` }}
            >
              {phrases.map((phrase, idx) => {
                const isCompleted = idx < currentIndex;
                const isActive = idx === currentIndex;
                const isPending = idx > currentIndex;

                return (
                  <div key={idx} className="loading-screen-item">
                    {/* Iconos de estado */}
                    <div className="loading-screen-icon-wrap">
                      {isCompleted && (
                        // Palomita verde si ya pasó
                        <svg className="loading-screen-svg text-success animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                      {isActive && (
                        // Spinner azul si es la actual
                        <svg className="loading-screen-svg text-primary animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="loading-screen-circle-bg" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="loading-screen-circle-fg" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      {isPending && (
                        // Círculo vacío si está en espera
                        <svg className="loading-screen-svg text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" strokeWidth="2" />
                        </svg>
                      )}
                    </div>
                    
                    {/* Texto de la frase */}
                    <span className={`loading-screen-text ${
                      isActive ? 'active' : 
                      isCompleted ? 'completed' : 'pending'
                    }`}>
                      {phrase}...
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .loading-screen-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #0f172a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          transition: opacity 0.5s ease-in-out;
          overflow: hidden;
          opacity: 1;
          pointer-events: all;
        }
        .loading-screen-overlay.fade-out {
          opacity: 0;
          pointer-events: none;
        }
        .loading-screen-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 448px;
          padding: 0 1.5rem;
        }
        .loading-screen-glow {
          position: absolute;
          top: 0;
          background-color: #3b82f6;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.2;
          width: 256px;
          height: 256px;
          pointer-events: none;
        }
        .loading-screen-logo {
          width: 280px;
          max-width: 85vw;
          height: auto;
          z-index: 10;
          filter: drop-shadow(0 20px 13px rgba(0, 0, 0, 0.3)) drop-shadow(0 8px 5px rgba(0, 0, 0, 0.08));
          margin-bottom: 3rem;
        }
        .loading-screen-scroll-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
          width: 100%;
          margin-top: 1rem;
        }
        .loading-screen-mask {
          position: relative;
          height: 150px;
          width: 100%;
          overflow: hidden;
          user-select: none;
          display: flex;
          justify-content: center;
          mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
        }
        .loading-screen-track {
          position: absolute;
          width: 100%;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .loading-screen-item {
          height: 40px;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 320px;
        }
        @media (max-width: 576px) {
          .loading-screen-item {
            max-width: 310px;
          }
        }
        .loading-screen-icon-wrap {
          width: 32px;
          height: 32px;
          margin-right: 0.75rem;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .loading-screen-svg {
          width: 24px;
          height: 24px;
        }
        .loading-screen-svg.text-success {
          color: #10b981;
        }
        .loading-screen-svg.text-primary {
          color: #3b82f6;
        }
        .loading-screen-svg.text-muted {
          color: #475569;
          width: 20px;
          height: 20px;
        }
        .loading-screen-circle-bg {
          opacity: 0.25;
        }
        .loading-screen-circle-fg {
          opacity: 0.75;
        }
        .loading-screen-text {
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: all 0.5s ease;
        }
        .loading-screen-text.active {
          color: #ffffff;
          font-size: 1.125rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
        }
        .loading-screen-text.completed {
          color: #64748b;
          font-size: 1rem;
        }
        .loading-screen-text.pending {
          color: #475569;
          font-size: 1rem;
        }
        @media (max-width: 576px) {
          .loading-screen-text.active {
            font-size: 0.95rem;
          }
          .loading-screen-text.completed {
            font-size: 0.85rem;
          }
          .loading-screen-text.pending {
            font-size: 0.85rem;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.25; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}} />
    </div>
  );
}
