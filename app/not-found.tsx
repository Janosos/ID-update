"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const [powerOn, setPowerOn] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const malePlugRef = useRef<HTMLDivElement>(null);
  const femaleSocketRef = useRef<HTMLDivElement>(null);
  const arcCanvasRef = useRef<SVGSVGElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  const isDraggingRef = useRef(false);
  const isConnectedRef = useRef(false);
  const transformRef = useRef({ x: 0, y: 0 });
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const floatTimeRef = useRef(0);

  useEffect(() => {
    const malePlug = malePlugRef.current;
    const femaleSocket = femaleSocketRef.current;
    const arcCanvas = arcCanvasRef.current;
    const flash = flashRef.current;

    if (!malePlug || !femaleSocket || !arcCanvas) return;

    const startDrag = (e: MouseEvent | TouchEvent) => {
      if (isConnectedRef.current) return;
      isDraggingRef.current = true;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      startXRef.current = clientX - transformRef.current.x;
      startYRef.current = clientY - transformRef.current.y;

      malePlug.style.cursor = "grabbing";
      sparksLoop();
    };

    const drag = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || isConnectedRef.current) return;

      // Prevent default scrolling on mobile touch to improve interaction
      if (e.cancelable) {
        e.preventDefault();
      }

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const x = clientX - startXRef.current;
      const y = clientY - startYRef.current;

      transformRef.current = { x, y };
      malePlug.style.transform = `translate(${x}px, ${y}px)`;

      if (Math.random() > 0.92) {
        createArc();
      }
    };

    const endDrag = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      malePlug.style.cursor = "grab";

      const plugRect = malePlug.getBoundingClientRect();
      const socketRect = femaleSocket.getBoundingClientRect();

      const plugProngsX = plugRect.right;
      const plugProngsY = plugRect.top + plugRect.height / 2;
      const socketFaceX = socketRect.left;
      const socketFaceY = socketRect.top + socketRect.height / 2;

      const distance = Math.hypot(socketFaceX - plugProngsX, socketFaceY - plugProngsY);

      if (distance < 50) {
        connectCables();
      } else {
        malePlug.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        malePlug.style.transform = "translate(0px, 0px)";
        transformRef.current = { x: 0, y: 0 };
        setTimeout(() => {
          if (malePlug) malePlug.style.transition = "";
        }, 500);
      }
    };

    const connectCables = () => {
      isConnectedRef.current = true;
      setIsConnected(true);

      const rectMale = malePlug.getBoundingClientRect();
      const rectFemale = femaleSocket.getBoundingClientRect();

      const deltaX = rectFemale.left - rectMale.right;
      const deltaY = rectFemale.top + rectFemale.height / 2 - (rectMale.top + rectMale.height / 2);

      const overlap = 12;
      const finalX = transformRef.current.x + deltaX + overlap;
      const finalY = transformRef.current.y + deltaY;

      transformRef.current = { x: finalX, y: finalY };
      malePlug.style.transition = "transform 0.15s ease-in";
      malePlug.style.transform = `translate(${finalX}px, ${finalY}px)`;

      setTimeout(() => {
        triggerSuccess();
      }, 150);
    };

    const triggerSuccess = () => {
      if (flash) {
        flash.style.opacity = "1";
        setTimeout(() => {
          flash.style.opacity = "0";
        }, 500);
      }

      setPowerOn(true);

      setTimeout(() => {
        router.push("/");
      }, 4000);
    };

    const createSpark = (x: number, y: number) => {
      if (!wrapperRef.current) return;
      const spark = document.createElement("div");
      spark.classList.add("spark");
      wrapperRef.current.appendChild(spark);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 50 + Math.random() * 100;
      const tx = Math.cos(angle) * velocity + "px";
      const ty = Math.sin(angle) * velocity + "px";

      spark.style.left = x + "px";
      spark.style.top = y + "px";
      spark.style.setProperty("--tx", tx);
      spark.style.setProperty("--ty", ty);

      spark.style.animation = "flySpark 0.5s ease-out forwards";
      setTimeout(() => {
        spark.remove();
      }, 500);
    };

    const sparksLoop = () => {
      if (!isDraggingRef.current || isConnectedRef.current) return;

      const rect = malePlug.getBoundingClientRect();
      const x = rect.right;
      const y = rect.top + rect.height / 2;

      if (Math.random() > 0.8) {
        createSpark(x, y + (Math.random() * 10 - 5));
      }
      requestAnimationFrame(sparksLoop);
    };

    const createArc = () => {
      if (isConnectedRef.current) {
        arcCanvas.innerHTML = "";
        return;
      }

      const rectMale = malePlug.getBoundingClientRect();
      const rectFemale = femaleSocket.getBoundingClientRect();

      const x1 = rectMale.right;
      const y1 = rectMale.top + rectMale.height / 2;
      const x2 = rectFemale.left;
      const y2 = rectFemale.top + rectFemale.height / 2;

      const dist = Math.hypot(x2 - x1, y2 - y1);
      if (dist > 150) {
        arcCanvas.innerHTML = "";
        return;
      }

      let path = `M ${x1} ${y1} `;
      const steps = 5;
      for (let i = 1; i < steps; i++) {
        const tx = x1 + (x2 - x1) * (i / steps);
        const ty = y1 + (y2 - y1) * (i / steps) + (Math.random() * 20 - 10);
        path += `L ${tx} ${ty} `;
      }
      path += `L ${x2} ${y2}`;

      const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathEl.setAttribute("d", path);
      pathEl.setAttribute("stroke", "var(--neon-on)");
      pathEl.setAttribute("stroke-width", "2");
      pathEl.setAttribute("fill", "none");
      pathEl.style.filter = "drop-shadow(0 0 5px var(--neon-on))";

      arcCanvas.innerHTML = "";
      arcCanvas.appendChild(pathEl);
      setTimeout(() => {
        arcCanvas.innerHTML = "";
      }, 50);
    };

    // Add listeners
    malePlug.addEventListener("mousedown", startDrag);
    malePlug.addEventListener("touchstart", startDrag, { passive: false });

    window.addEventListener("mousemove", drag);
    window.addEventListener("touchmove", drag, { passive: false });

    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchend", endDrag);

    // Float Plug animation loop
    let floatFrameId: number;
    const floatPlug = () => {
      if (!isDraggingRef.current && !isConnectedRef.current && malePlug) {
        floatTimeRef.current += 0.05;
        const offset = Math.sin(floatTimeRef.current) * 5;
        malePlug.style.transform = `translate(0px, ${offset}px)`;
      }
      floatFrameId = requestAnimationFrame(floatPlug);
    };
    floatPlug();

    return () => {
      malePlug.removeEventListener("mousedown", startDrag);
      malePlug.removeEventListener("touchstart", startDrag);
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("touchmove", drag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchend", endDrag);
      cancelAnimationFrame(floatFrameId);
    };
  }, [router]);

  return (
    <div
      ref={wrapperRef}
      className={`not-found-page-wrapper ${powerOn ? "power-on" : ""}`}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

        :root {
          --neon-off: #333;
          --neon-on: #27F52E; 
          --lamp-light: #ffeb3b;
          --bg-off: #050505;
          --bg-on: #2a2a2a;
          --wall-color: #111;
        }

        .not-found-page-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 99999;
          background-color: var(--bg-off);
          color: #fff;
          font-family: 'Share Tech Mono', monospace;
          overflow: hidden;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: background-color 1.5s ease;
          cursor: default;
          user-select: none;
          perspective: 1000px;
          touch-action: none;
        }

        /* --- ROOM BACKGROUND --- */
        .not-found-page-wrapper #room {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
          background: linear-gradient(to bottom, #0a0a0a 70%, #151515 70%);
          transition: all 1s;
        }

        .not-found-page-wrapper .floor-shadow {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30%;
          background: rgba(0,0,0,0.5);
          z-index: 2;
        }

        /* TABLE */
        .not-found-page-wrapper .table {
          position: absolute;
          bottom: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          height: 15px;
          background: #2a2a2a;
          border-radius: 4px;
          z-index: 5;
          box-shadow: 0 10px 20px rgba(0,0,0,0.8);
          transition: background 1s;
        }
        .not-found-page-wrapper .table-leg {
          position: absolute;
          top: 15px;
          width: 10px;
          height: 120px;
          background: #222;
        }
        .not-found-page-wrapper .leg-left { left: 40px; transform: rotate(5deg); }
        .not-found-page-wrapper .leg-right { right: 40px; transform: rotate(-5deg); }

        /* TV SET */
        .not-found-page-wrapper .tv-set {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 240px;
          height: 180px;
          background: #1a1a1a;
          border-radius: 20px;
          padding: 15px;
          box-sizing: border-box;
          box-shadow: inset 0 0 10px #000, 0 5px 10px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: width 0.3s, height 0.3s;
        }
        
        .not-found-page-wrapper .tv-screen {
          width: 100%;
          height: 130px;
          background: #000;
          border-radius: 40% 40% 40% 40% / 30% 30% 30% 30%;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 0 20px rgba(0,0,0,1);
          transition: all 0.2s;
        }

        .not-found-page-wrapper .tv-static {
          width: 100%;
          height: 100%;
          opacity: 0;
          background-image: repeating-radial-gradient(#fff 0 0.0001%, #000 0 0.0002%);
          background-size: 100% 100%;
          transition: opacity 0.5s;
        }
        
        .not-found-page-wrapper .tv-reflection {
          position: absolute;
          top: 10%;
          right: 10%;
          width: 20px;
          height: 80%;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
          transform: rotate(10deg);
          filter: blur(2px);
        }

        .not-found-page-wrapper .antenna {
          position: absolute;
          top: -40px;
          width: 100px;
          height: 50px;
          z-index: -1;
        }
        .not-found-page-wrapper .ant-l, .not-found-page-wrapper .ant-r {
          position: absolute;
          bottom: 0;
          width: 4px;
          height: 60px;
          background: #333;
          transform-origin: bottom center;
        }
        .not-found-page-wrapper .ant-l { left: 40%; transform: rotate(-30deg); }
        .not-found-page-wrapper .ant-r { right: 40%; transform: rotate(30deg); }

        /* LAMP */
        .not-found-page-wrapper .lamp-container {
          position: absolute;
          bottom: 20%;
          left: 15%;
          width: 100px;
          height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          z-index: 4;
          transform-origin: bottom center;
        }
        .not-found-page-wrapper .lamp-shade {
          width: 80px;
          height: 60px;
          background: #222;
          border-radius: 10px 10px 0 0;
          position: relative;
          z-index: 2;
          transition: background 0.5s;
        }
        .not-found-page-wrapper .lamp-shade::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: -10px;
          width: 100px;
          height: 20px;
          background: #1a1a1a;
          border-radius: 50%;
          z-index: 1;
        }
        .not-found-page-wrapper .lamp-pole {
          width: 8px;
          height: 300px;
          background: #111;
        }
        .not-found-page-wrapper .lamp-base {
          width: 60px;
          height: 10px;
          background: #111;
          border-radius: 50%;
          margin-top: -5px;
        }
        
        /* Lighting Effects */
        .not-found-page-wrapper .light-glow {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 235, 59, 0.4) 0%, rgba(0,0,0,0) 70%);
          opacity: 0;
          transition: opacity 1s;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        /* --- UI OVERLAY --- */
        .not-found-page-wrapper .container-404 {
          position: relative;
          z-index: 10;
          text-align: center;
          pointer-events: none; 
          margin-bottom: 250px;
          width: 90%;
          max-width: 600px;
        }

        .not-found-page-wrapper h1 {
          font-size: 6rem;
          margin: 0;
          line-height: 1;
          color: var(--neon-off);
          text-shadow: none;
          transition: all 0.3s;
        }

        .not-found-page-wrapper p {
          font-size: 1.2rem;
          color: #333;
          margin-top: 10px;
          transition: color 0.3s;
        }

        .not-found-page-wrapper .instruction {
          font-size: 1rem;
          color: #444;
          margin-top: 20px;
          animation: pulse 2s infinite;
        }

        /* --- POWER ON STATES --- */
        .not-found-page-wrapper.power-on {
          background-color: #333;
        }
        
        .not-found-page-wrapper.power-on #room {
          background: linear-gradient(to bottom, #444 70%, #2a2a2a 70%);
        }

        .not-found-page-wrapper.power-on h1 {
          color: var(--neon-on);
          text-shadow: 0 0 20px var(--neon-on), 0 0 40px var(--neon-on);
          animation: none;
        }

        .not-found-page-wrapper.power-on p {
          color: #fff;
          text-shadow: 0 0 5px rgba(255,255,255,0.5);
        }
        
        .not-found-page-wrapper.power-on .instruction {
          color: #888;
        }

        /* Lamp On */
        .not-found-page-wrapper.power-on .lamp-shade {
          background: #ffd54f;
          box-shadow: 0 0 20px #ffd54f;
        }
        .not-found-page-wrapper.power-on .lamp-shade::after {
          background: #ffecb3;
        }
        .not-found-page-wrapper.power-on .light-glow {
          opacity: 1;
        }

        /* TV On */
        .not-found-page-wrapper.power-on .tv-screen {
          background: #111;
          box-shadow: 0 0 30px rgba(2, 116, 190, 0.5);
        }
        .not-found-page-wrapper.power-on .tv-static {
          opacity: 0.8;
          animation: staticAnim 0.2s steps(4) infinite;
        }

        @keyframes staticAnim {
          0% { transform: translate(0,0); }
          25% { transform: translate(-2px, 2px); }
          50% { transform: translate(2px, -2px); }
          75% { transform: translate(-2px, -2px); }
          100% { transform: translate(2px, 2px); }
        }

        /* Table/Room Brightening */
        .not-found-page-wrapper.power-on .table {
          background: #5d4037;
        }

        /* --- CABLES AREA --- */
        .not-found-page-wrapper #scene {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 50;
          overflow: hidden;
          touch-action: none;
        }

        .not-found-page-wrapper .plug-container {
          position: absolute;
          top: 75%;
          height: 60px;
          display: flex;
          align-items: center;
        }

        /* Male Plug */
        .not-found-page-wrapper #male-plug-container {
          left: 20%;
          width: 200px;
          transform-origin: left center;
          cursor: grab;
          z-index: 60;
          padding: 20px 0; 
          margin-top: -20px;
        }
        .not-found-page-wrapper #male-plug-container:active { cursor: grabbing; }

        .not-found-page-wrapper .cable {
          height: 12px;
          background: #222;
          border-top: 1px solid #333;
          border-bottom: 1px solid #000;
          position: absolute;
          left: -1000px;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 4px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.8);
        }

        .not-found-page-wrapper .plug-head {
          width: 40px;
          height: 50px;
          background: #1a1a1a;
          border-radius: 5px;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          box-shadow: inset 2px 2px 5px rgba(255,255,255,0.05);
          z-index: 2;
        }

        .not-found-page-wrapper .prongs {
          position: absolute;
          right: -12px;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .not-found-page-wrapper .prong {
          width: 100%;
          height: 6px;
          background: #666;
          border-radius: 0 2px 2px 0;
        }

        /* Socket */
        .not-found-page-wrapper #female-socket-container {
          right: 20%;
          width: 60px;
          height: 60px;
          z-index: 55;
        }
        .not-found-page-wrapper .socket-face {
          width: 50px;
          height: 60px;
          background: #ddd;
          border-radius: 5px;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          box-shadow: 0 0 5px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 12px;
          z-index: 60;
        }
        .not-found-page-wrapper .socket-hole {
          width: 10px;
          height: 6px;
          background: #000;
          border-radius: 2px;
        }

        /* Sparks */
        .not-found-page-wrapper .spark {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          box-shadow: 0 0 10px var(--neon-on);
          z-index: 100;
        }

        @keyframes flySpark {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }

        .not-found-page-wrapper #flash {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: white;
          opacity: 0;
          pointer-events: none;
          z-index: 200;
          transition: opacity 0.1s;
        }
        
        .not-found-page-wrapper .electric-arc {
          position: absolute;
          pointer-events: none;
          stroke: var(--neon-on);
          stroke-width: 2;
          fill: none;
          filter: drop-shadow(0 0 5px var(--neon-on));
          opacity: 0;
          z-index: 58;
        }
        
        .not-found-page-wrapper .flicker { animation: flickerAnimation 4s infinite; }
        @keyframes flickerAnimation {
          0%, 18%, 22%, 25%, 53%, 57%, 100% { color: var(--neon-off); text-shadow: none; }
          20%, 24%, 55% { color: var(--neon-on); text-shadow: 0 0 10px var(--neon-on); }
        }
        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }

        /* --- MEDIA QUERIES FOR MOBILE --- */
        @media (max-width: 768px) {
          .not-found-page-wrapper h1 { font-size: 4rem; }
          .not-found-page-wrapper p { font-size: 1rem; }
          .not-found-page-wrapper .container-404 { margin-bottom: 150px; }

          .not-found-page-wrapper .table { width: 280px; bottom: 25%; }
          .not-found-page-wrapper .table-leg { height: 80px; }
          .not-found-page-wrapper .tv-set { width: 160px; height: 120px; padding: 10px; }
          .not-found-page-wrapper .tv-screen { height: 90px; }
          .not-found-page-wrapper .antenna { top: -30px; transform: scale(0.8); }
          
          .not-found-page-wrapper .lamp-container { 
            left: 5%; 
            transform: scale(0.7); 
            bottom: 25%;
          }

          .not-found-page-wrapper .plug-container { top: 70%; }
          .not-found-page-wrapper #male-plug-container { left: 5%; width: 140px; }
          .not-found-page-wrapper #female-socket-container { right: 5%; }
        }

        @media (max-width: 400px) {
          .not-found-page-wrapper h1 { font-size: 3rem; }
          .not-found-page-wrapper .table { width: 220px; }
        }
      ` }} />

      <div ref={flashRef} id="flash"></div>

      <div id="room">
        <div className="floor-shadow"></div>
        
        <div className="lamp-container">
          <div className="light-glow"></div>
          <div className="lamp-shade"></div>
          <div className="lamp-pole"></div>
          <div className="lamp-base"></div>
        </div>

        <div className="table">
          <div className="table-leg leg-left"></div>
          <div className="table-leg leg-right"></div>
          
          <div className="tv-set">
            <div className="antenna">
              <div className="ant-l"></div>
              <div className="ant-r"></div>
            </div>
            <div className="tv-screen">
              <div className="tv-reflection"></div>
              <div className="tv-static"></div>
            </div>
            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <div style={{ width: "10px", height: "10px", background: "#333", borderRadius: "50%" }}></div>
              <div style={{ width: "10px", height: "10px", background: "#333", borderRadius: "50%" }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-404">
        <h1 className={powerOn ? "" : "flicker"}>
          {powerOn ? "200" : "ERROR 404"}
        </h1>
        <p style={{ color: powerOn ? "var(--neon-on)" : undefined }}>
          {powerOn ? "ENERGÍA RESTAURADA" : "PARECE QUE LA PÁGINA SINTONIZADA NO EXISTE"}
        </p>
        <div className="instruction">
          {powerOn ? "Sintonizando ImperioDev..." : "← Conecta el cable para restaurar la energía →"}
        </div>
      </div>

      <div id="scene">
        <svg ref={arcCanvasRef} className="electric-arc" width="100%" height="100%"></svg>

        <div ref={malePlugRef} id="male-plug-container" className="plug-container">
          <div className="cable"></div>
          <div className="plug-head">
            <div className="prongs">
              <div className="prong"></div>
              <div className="prong"></div>
            </div>
          </div>
        </div>

        <div ref={femaleSocketRef} id="female-socket-container" className="plug-container">
          <div className="socket-face">
            <div className="socket-hole"></div>
            <div className="socket-hole"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
