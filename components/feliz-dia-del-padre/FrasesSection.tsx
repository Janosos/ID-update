import React from 'react';
import FraseCard from './FraseCard';

const frases = [
  {
    id: 1,
    text: "Por tu sacrificio silencioso, ese que nunca pides que sea reconocido, pero que ha construido los cimientos de mi vida. Gracias.",
    author: "Amor Infinito"
  },
  {
    id: 2,
    text: "Tus enseñanzas de vida valen más que mil libros. Eres mi maestro más paciente y sabio.",
    author: "Admiración Eterna"
  },
  {
    id: 3,
    text: "En tus abrazos encuentro la fortaleza que a veces me falta, y en tu ejemplo, el camino que quiero seguir.",
    author: "Tu mayor fan"
  },
  {
    id: 4,
    text: "Un amor que no necesita palabras; lo siento en cada mirada de orgullo y en cada acto de protección hacia mí.",
    author: "Gratitud Profunda"
  },
  {
    id: 5,
    text: "Gracias por estar siempre presente en los momentos difíciles, sosteniendo mi mano cuando el mundo parecía tambalearse.",
    author: "Con mucho amor"
  },
  {
    id: 6,
    text: "Creíste en mí incluso en los momentos en que yo dudaba de mí mismo. Tu fe ha sido mis alas.",
    author: "Para mi héroe"
  },
  {
    id: 7,
    text: "No hay regalo más grande en esta vida que poder decir con orgullo que soy tu hijo.",
    author: "Orgullo filial"
  },
  {
    id: 8,
    text: "El tiempo pasa, pero mi admiración por ti solo crece. Eres la brújula que siempre me guía a casa.",
    author: "Para ti, papá"
  }
];

export default function FrasesSection() {
  return (
    <section id="frases" className="feliz-section">
      <div className="container">
        <div className="feliz-fade-up text-center">
          <h2 className="feliz-title feliz-section-title">Palabras del Corazón</h2>
          <div className="feliz-divider"></div>
        </div>

        <div className="row g-4 mt-4">
          {frases.map((frase, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={frase.id}>
              <FraseCard 
                text={frase.text} 
                author={frase.author} 
                delay={0.1 * (index + 1)} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
