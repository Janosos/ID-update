"use client";

import { useEffect, useRef, useState } from "react";

interface SequenceItem {
  targetId: string;
  color: string;
  delay: number;
}

export default function HeroMonitor() {
  const bezelRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  
  const [isBuilding, setIsBuilding] = useState(false);
  const [isBuilt, setIsBuilt] = useState(false);
  const [activeParts, setActiveParts] = useState<Record<string, boolean>>({
    "target-nav": false,
    "target-hero": false,
    "target-side": false,
    "target-main": false,
    "target-foot": false,
  });

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const sequence: SequenceItem[] = [
    { targetId: "target-nav", color: "tetris-cyan", delay: 100 },
    { targetId: "target-side", color: "tetris-yellow", delay: 800 },
    { targetId: "target-hero", color: "tetris-purple", delay: 1600 },
    { targetId: "target-main", color: "tetris-green", delay: 2400 },
    { targetId: "target-foot", color: "tetris-red", delay: 3200 },
  ];

  // Mouse move 3D tilt effect
  useEffect(() => {
    const bezel = bezelRef.current;
    if (!bezel) return;

    let isTicking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const xPct = clientX / innerWidth - 0.5;
          const yPct = clientY / innerHeight - 0.5;
          const rotateY = xPct * 15;
          const rotateX = -yPct * 15;
          bezel.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          isTicking = false;
        });
        isTicking = true;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const spawnBlock = (item: { targetId: string; color: string }, isRandomClick = false) => {
    const screen = screenRef.current;
    if (!screen) return;

    const targetEl = document.getElementById(item.targetId);
    if (!targetEl) return;

    // Use static layout metrics relative to offsetParent (which is screen)
    // to avoid distortion caused by 3D mouse rotation
    let finalTop = targetEl.offsetTop;
    let finalLeft = targetEl.offsetLeft;
    let finalWidth = targetEl.offsetWidth;
    let finalHeight = targetEl.offsetHeight;

    // Fallback calculation in case layout hasn't settled yet or container is temporarily hidden
    if (finalWidth === 0 || finalHeight === 0) {
      const screenWidth = screen.offsetWidth || 480;
      const screenHeight = screen.offsetHeight || 270;
      const gap = 6;
      const padding = 12;
      const innerW = screenWidth - padding * 2;
      const innerH = screenHeight - padding * 2;

      // grid-template-rows: 15% 35% 1fr 10%; 
      const r1 = innerH * 0.15;
      const r2 = innerH * 0.35;
      const r4 = innerH * 0.10;
      const r3 = innerH - r1 - r2 - r4 - gap * 3;

      // grid-template-columns: 1fr 2fr 1fr;
      const c1 = (innerW - gap * 2) * 0.25;
      const c23 = innerW - c1 - gap;

      if (item.targetId === "target-nav") {
        finalTop = padding;
        finalLeft = padding;
        finalWidth = innerW;
        finalHeight = r1;
      } else if (item.targetId === "target-hero") {
        finalTop = padding + r1 + gap;
        finalLeft = padding;
        finalWidth = innerW;
        finalHeight = r2;
      } else if (item.targetId === "target-side") {
        finalTop = padding + r1 + r2 + gap * 2;
        finalLeft = padding;
        finalWidth = c1;
        finalHeight = r3;
      } else if (item.targetId === "target-main") {
        finalTop = padding + r1 + r2 + gap * 2;
        finalLeft = padding + c1 + gap;
        finalWidth = c23;
        finalHeight = r3;
      } else if (item.targetId === "target-foot") {
        finalTop = padding + r1 + r2 + r3 + gap * 3;
        finalLeft = padding;
        finalWidth = innerW;
        finalHeight = r4;
      }
    }

    const block = document.createElement("div");
    block.className = `falling-block ${item.color}`;
    const size = isRandomClick ? 30 : 40;
    
    // Background color mapping to resolve invisible blocks
    const colorsMap: Record<string, string> = {
      "tetris-cyan": "#06b6d4",
      "tetris-yellow": "#eab308",
      "tetris-purple": "#a855f7",
      "tetris-green": "#22c55e",
      "tetris-red": "#ef4444",
      "tetris-orange": "#f97316"
    };
    
    // Apply styling
    block.style.position = "absolute";
    block.style.zIndex = "20";
    block.style.borderRadius = "4px";
    block.style.backgroundColor = colorsMap[item.color] || "#ffffff";
    block.style.border = "1px solid rgba(255,255,255,0.4)";
    block.style.boxShadow = "inset 2px 2px 0 rgba(255,255,255,0.3), inset -2px -2px 0 rgba(0,0,0,0.15), 0 0 10px rgba(255,255,255,0.2)";
    block.style.pointerEvents = "none";
    block.style.width = `${size}px`;
    block.style.height = `${size}px`;
    block.style.left = `${finalLeft + finalWidth / 2 - size / 2}px`;
    block.style.top = "-60px";

    const fallDuration = isRandomClick ? 0.5 : 0.8;
    block.style.transition = `top ${fallDuration}s cubic-bezier(0.5, 0, 0.7, 1.2), width 0.3s ease ${fallDuration}s, height 0.3s ease ${fallDuration}s, left 0.3s ease ${fallDuration}s, transform 0.5s linear`;
    block.style.transform = `rotate(${Math.random() > 0.5 ? 90 : -90}deg)`;

    screen.appendChild(block);

    // Force a reflow to guarantee the transition starts from the initial position (-60px)
    // and prevents the browser from batching layout modifications
    block.offsetHeight;

    // Trigger fall immediately in the same frame
    block.style.top = `${finalTop + finalHeight / 2 - size / 2}px`;
    
    if (!isRandomClick) {
      const t1 = setTimeout(() => {
        // Change transition style to be fast and uniform for the landing and expansion phase
        block.style.transition = "top 0.3s ease, left 0.3s ease, width 0.3s ease, height 0.3s ease, transform 0.3s ease, opacity 0.3s ease";
        block.style.transform = "rotate(0deg)";
        block.style.top = `${finalTop}px`;
        block.style.left = `${finalLeft}px`;
        block.style.width = `${finalWidth}px`;
        block.style.height = `${finalHeight}px`;
        
        const t2 = setTimeout(() => {
          block.style.opacity = "0";
          setActiveParts(prev => ({ ...prev, [item.targetId]: true }));
          
          const t3 = setTimeout(() => {
            block.remove();
          }, 500);
          timeoutsRef.current.push(t3);
        }, 300);
        timeoutsRef.current.push(t2);
      }, fallDuration * 1000);
      timeoutsRef.current.push(t1);
    } else {
      const t1 = setTimeout(() => {
        block.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        block.style.transform = `rotate(${Math.random() * 360}deg) scale(0)`;
        block.style.opacity = "0";
        
        const t2 = setTimeout(() => {
          block.remove();
        }, 500);
        timeoutsRef.current.push(t2);
      }, fallDuration * 1000);
      timeoutsRef.current.push(t1);
    }
  };

  const startBuild = () => {
    if (isBuilding || isBuilt) return;
    setIsBuilding(true);

    sequence.forEach(item => {
      const t = setTimeout(() => {
        spawnBlock(item);
      }, item.delay);
      timeoutsRef.current.push(t);
    });

    const finalT = setTimeout(() => {
      setIsBuilding(false);
      setIsBuilt(true);
    }, sequence[sequence.length - 1].delay + 1500);
    timeoutsRef.current.push(finalT);
  };

  const resetBuild = () => {
    // Clear timeouts
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
    
    setIsBuilding(false);
    setIsBuilt(false);
    setActiveParts({
      "target-nav": false,
      "target-hero": false,
      "target-side": false,
      "target-main": false,
      "target-foot": false,
    });

    // Remove any leftover blocks
    const screen = screenRef.current;
    if (screen) {
      screen.querySelectorAll(".falling-block").forEach(el => el.remove());
    }
  };

  const handleScreenClick = () => {
    if (!isBuilt && !isBuilding) {
      startBuild();
      return;
    }
    const colors = [
      "tetris-cyan",
      "tetris-yellow",
      "tetris-purple",
      "tetris-green",
      "tetris-red",
      "tetris-orange",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomTarget = sequence[Math.floor(Math.random() * sequence.length)];
    spawnBlock({ targetId: randomTarget.targetId, color: randomColor }, true);
  };

  // Auto start build on load
  useEffect(() => {
    const initialT = setTimeout(startBuild, 1000);
    return () => {
      clearTimeout(initialT);
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, []);

  return (
    <div className="monitor-wrapper position-relative text-center">
      <div 
        ref={bezelRef} 
        className="monitor-bezel" 
        style={{ transformStyle: "preserve-3d" }}
      >
        <div 
          ref={screenRef} 
          className="monitor-screen" 
          onClick={handleScreenClick}
          style={{ cursor: isBuilding ? "default" : "pointer" }}
        >
          {/* Navbar Part */}
          <div 
            id="target-nav" 
            className={`web-part area-nav ${activeParts["target-nav"] ? "active" : ""}`}
          >
            <span><i className="bi bi-list me-2"></i> Navbar</span>
          </div>

          {/* Hero Part */}
          <div 
            id="target-hero" 
            className={`web-part area-hero ${activeParts["target-hero"] ? "active" : ""}`}
          >
            <span>Banner Principal</span>
          </div>

          {/* Side Part */}
          <div 
            id="target-side" 
            className={`web-part area-side ${activeParts["target-side"] ? "active" : ""}`}
          >
            <span>Menú</span>
          </div>

          {/* Main Part */}
          <div 
            id="target-main" 
            className={`web-part area-main ${activeParts["target-main"] ? "active" : ""}`}
          >
            <div className="w-100">
              <div className="skeleton-text w-75"></div>
              <div className="skeleton-text w-100"></div>
              <div className="skeleton-text w-50"></div>
            </div>
          </div>

          {/* Footer Part */}
          <div 
            id="target-foot" 
            className={`web-part area-foot ${activeParts["target-foot"] ? "active" : ""}`}
          >
            <span>Footer &copy; ImperioDev 2026</span>
          </div>
        </div>
        {/* Led Power Indicator */}
        <div className={`power-light ${isBuilding || isBuilt ? "on" : ""}`}></div>
      </div>
      <div className="monitor-stand"></div>
      <div className="monitor-base"></div>

      <div className="controls-container mt-4 d-flex gap-3 justify-content-center">
        <button 
          onClick={startBuild} 
          disabled={isBuilding || isBuilt}
          className={`btn-control ${isBuilt ? "btn-secondary" : "btn-primary"}`}
        >
          {isBuilding ? (
            <>
              <i className="bi bi-gear-fill spin me-2"></i>
              Construyendo...
            </>
          ) : isBuilt ? (
            <>
              <i className="bi bi-check-lg me-2"></i>
              Completo
            </>
          ) : (
            <>
              <i className="bi bi-play-fill me-2"></i>
              Construir Sitio
            </>
          )}
        </button>
        <button 
          onClick={resetBuild} 
          className="btn-control btn-secondary"
        >
          <i className="bi bi-arrow-counterclockwise me-2"></i>
          Reiniciar
        </button>
      </div>

      <style jsx>{`
        .monitor-bezel {
          background: #1a1a1a; 
          border-radius: 12px; 
          padding: 12px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 2px rgba(255,255,255,0.05);
          position: relative; 
          transition: transform 0.1s ease-out;
          will-change: transform;
        }
        .monitor-bezel::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%);
          border-radius: 12px; pointer-events: none; z-index: 50;
        }
        .monitor-screen {
          background-color: #0f172a; 
          border-radius: 4px; 
          position: relative; 
          overflow: hidden; 
          aspect-ratio: 16/9;
          display: grid; 
          grid-template-areas: 
            "nav nav nav" 
            "hero hero hero" 
            "side main main" 
            "foot foot foot";
          grid-template-rows: 15% 35% 1fr 10%; 
          grid-template-columns: 1fr 2fr 1fr; 
          gap: 6px; 
          padding: 12px;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
          user-select: none;
        }
        .monitor-stand {
          background: linear-gradient(to bottom, #262626, #171717); 
          width: 120px; 
          height: 50px; 
          margin: 0 auto;
          position: relative; 
          z-index: -1; 
          clip-path: polygon(15% 0, 85% 0, 100% 100%, 0% 100%); 
          margin-top: -4px;
        }
        .monitor-base {
          background: linear-gradient(to right, #1a1a1a, #262626, #1a1a1a); 
          width: 180px; 
          height: 10px; 
          margin: 0 auto;
          border-radius: 4px 4px 0 0; 
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .web-part {
          opacity: 0.15; 
          border-radius: 4px; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          color: rgba(255,255,255,0.3); 
          font-size: 0.75rem; 
          text-transform: uppercase; 
          letter-spacing: 1px;
          position: relative; 
          background: rgba(255,255,255,0.03); 
          border: 1px dashed rgba(255,255,255,0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .web-part.active { 
          opacity: 1; 
          color: #333; 
          border: none; 
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); 
          transform: scale(1); 
        }
        .area-nav { grid-area: nav; } 
        .area-hero { grid-area: hero; } 
        .area-side { grid-area: side; } 
        .area-main { grid-area: main; } 
        .area-foot { grid-area: foot; }

        .area-nav.active { background: #3b82f6; color: white; }
        .area-hero.active { background: #8b5cf6; color: white; }
        .area-side.active { background: #10b981; color: white; }
        .area-main.active { 
          background: #f8fafc; 
          color: #475569; 
          justify-content: start; 
          padding: 10px; 
          font-size: 0.6rem; 
          text-transform: none; 
        }
        .area-foot.active { background: #1e293b; color: #94a3b8; font-size: 0.5rem; }
        
        .skeleton-text { 
          height: 6px; 
          background: #cbd5e1; 
          margin-bottom: 6px; 
          border-radius: 2px; 
          opacity: 0.7; 
        }
        
        .btn-control {
          padding: 10px 24px; 
          border-radius: 10px; 
          font-weight: 700; 
          cursor: pointer; 
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: none; 
          display: inline-flex; 
          align-items: center; 
          justify-content: center; 
          gap: 8px; 
          font-family: var(--font-sans); 
          text-transform: uppercase; 
          font-size: 0.8rem; 
          letter-spacing: 0.5px;
          min-width: 140px; 
          height: 44px; 
          white-space: nowrap; 
        }
        .btn-primary { 
          background-color: #14b8a6 !important; 
          color: #ffffff !important; 
          box-shadow: 0 4px 14px 0 rgba(20, 184, 166, 0.39); 
        }
        .btn-primary:hover { 
          background-color: #0d9488 !important; 
          transform: translateY(-2px); 
        }
        .btn-secondary { 
          background-color: #ffffff !important; 
          color: #475569 !important; 
          border: 1px solid #e2e8f0 !important; 
        }
        .btn-secondary:hover { 
          background-color: #f1f5f9 !important; 
          color: #1e293b !important; 
          border-color: #cbd5e1 !important; 
          transform: translateY(-2px); 
        }
        
        :global(html.dark) .btn-secondary { 
          background-color: #1e293b !important; 
          color: #e2e8f0 !important; 
          border-color: #334155 !important; 
        }
        :global(html.dark) .btn-secondary:hover { 
          background-color: #334155 !important; 
          color: #ffffff !important; 
        }

        .power-light {
          position: absolute; 
          bottom: 6px; 
          right: 20px; 
          width: 6px; 
          height: 6px; 
          background-color: #ef4444; 
          border-radius: 50%; 
          box-shadow: 0 0 8px #ef4444; 
          transition: all 0.3s ease;
        }
        .power-light.on { 
          background-color: #22c55e; 
          box-shadow: 0 0 8px #22c55e; 
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
