import React from 'react';

interface FraseCardProps {
  text: string;
  author?: string;
  delay?: number;
}

export default function FraseCard({ text, author, delay = 0 }: FraseCardProps) {
  return (
    <div 
      className="feliz-card feliz-fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="feliz-quote-mark">&ldquo;</div>
      <p className="feliz-card-text">
        {text}
      </p>
      {author && (
        <div className="feliz-card-author">
          — {author}
        </div>
      )}
    </div>
  );
}
