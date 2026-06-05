"use client";

import React, { useEffect, useRef } from 'react';

// Interfaz para el objeto del ratón
interface MouseState {
  x: number | null;
  y: number | null;
  radius: number;
}

// Clase que representa cada punto individual (Partícula)
class Particle {
  x: number;
  y: number;
  vx: number; // Velocidad en X
  vy: number; // Velocidad en Y
  size: number;
  baseX: number;
  baseY: number;
  density: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.baseX = this.x;
    this.baseY = this.y;
    this.size = Math.random() * 3 + 1; // Tamaño aleatorio entre 1 y 4
    this.vx = (Math.random() - 0.5) * 1.5; // Velocidad base aleatoria
    this.vy = (Math.random() - 0.5) * 1.5;
    this.density = (Math.random() * 30) + 1;
  }

  // Método para dibujar el punto
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = '#000000'; // Color negro
    ctx.fill();
  }

  // Método para actualizar la posición y la interacción con el ratón
  update(canvasWidth: number, canvasHeight: number, mouse: MouseState) {
    // Interacción de "Antigravedad" (repulsión del ratón)
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      
      const maxDistance = mouse.radius;
      const force = (maxDistance - distance) / maxDistance;
      
      const directionX = forceDirectionX * force * this.density;
      const directionY = forceDirectionY * force * this.density;

      if (distance < mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      }
    }

    // Movimiento natural
    this.x += this.vx;
    this.y += this.vy;

    // Rebote en las paredes
    if (this.x < 0 || this.x > canvasWidth) this.vx = -this.vx;
    if (this.y < 0 || this.y > canvasHeight) this.vy = -this.vy;
  }
}

// Componente principal del fondo
const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const mouse: MouseState = {
      x: null,
      y: null,
      radius: 150 // Radio de acción de la antigravedad
    };

    // Ajustar el canvas al tamaño de la ventana
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(); // Reiniciamos las partículas para evitar que se queden fuera de la pantalla
    };

    // Eventos del ratón
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Inicializar los puntos
    const init = () => {
      particlesArray = [];
      // Cantidad de puntos dependiendo del tamaño de la pantalla
      const numberOfParticles = (canvas.width * canvas.height) / 8000; 
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle(canvas.width, canvas.height));
      }
    };

    // Conectar puntos cercanos con una línea
    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = dx * dx + dy * dy;

          // Si están lo suficientemente cerca, dibuja una línea
          if (distance < 15000) {
            const opacityValue = 1 - (distance / 15000);
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacityValue * 0.15})`; // Línea negra con opacidad dinámica atenuada
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Bucle de animación principal
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el frame anterior
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(canvas.width, canvas.height, mouse);
        particlesArray[i].draw(ctx);
      }
      
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Iniciar configuración inicial
    handleResize();
    animate();

    // Limpieza de eventos (Cleanup) al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Se coloca detrás del contenido pero encima de la etiqueta body
        background: '#f8f9fa', // Fondo muy claro para contrastar con los puntos negros
        pointerEvents: 'none' // Evita que el canvas bloquee los clicks de los elementos encima
      }}
    />
  );
};

export default InteractiveBackground;
