"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import limonImg from "../bebidas/limon.avif";
import naranjaImg from "../bebidas/naranja.avif";
import uvaImg from "../bebidas/uva.avif";
import limonBgImg from "../bebidas/limonbg.avif";
import naranjaBgImg from "../bebidas/naranjasbg.avif";
import uvaBgImg from "../bebidas/uvasbg.avif";
import limonBgImgMobile from "../bebidas/limonbg_mobile.avif";
import naranjaBgImgMobile from "../bebidas/naranjasbg_mobile.avif";
import uvaBgImgMobile from "../bebidas/uvasbg_mobile.avif";

interface LiquidBackgroundProps {
  imageUrl: string;
  metalness?: number;
  roughness?: number;
  displacementScale?: number;
  className?: string;
}

const LiquidBackground = ({
  imageUrl,
  metalness = 0.75,
  roughness = 0.25,
  displacementScale = 5,
  className = ""
}: LiquidBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const propsRef = useRef({ imageUrl, displacementScale, metalness, roughness });
  useEffect(() => {
    propsRef.current = { imageUrl, displacementScale, metalness, roughness };
  }, [imageUrl, displacementScale, metalness, roughness]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      powerPreference: "high-performance"
    });
    if (!gl) {
      console.warn("WebGL not supported, falling back to static background image.");
      canvas.style.backgroundImage = `url(${imageUrl})`;
      canvas.style.backgroundSize = "cover";
      canvas.style.backgroundPosition = "center";
      return;
    }

    // Vertex Shader Source
    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Optimized single-pass Fragment Shader with analytical gradient computation
    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform vec3 uRipples[24]; // array of vec3 [x, y, age]
      uniform float uTime;
      uniform float uDisplacementScale;
      uniform float uAspect;
      uniform vec2 uUvMapScale;
      uniform float uMetalness;
      uniform float uRoughness;

      vec3 getWaveAndSlope(vec2 aspectUv, float time) {
        // Ambient waves
        float w1_x = aspectUv.x * 4.0 + time * 0.4;
        float w1_y = aspectUv.y * 4.0 + time * 0.3;
        float wave1 = sin(w1_x) * cos(w1_y) * 0.003;
        float wave1_dx = 4.0 * cos(w1_x) * cos(w1_y) * 0.003;
        float wave1_dy = -4.0 * sin(w1_x) * sin(w1_y) * 0.003;
        
        float w2_y = aspectUv.y * 8.0 - time * 0.6;
        float w2_x = aspectUv.x * 6.0 + time * 0.5;
        float wave2 = sin(w2_y) * cos(w2_x) * 0.0015;
        float wave2_dx = -6.0 * sin(w2_y) * sin(w2_x) * 0.0015;
        float wave2_dy = 8.0 * cos(w2_y) * cos(w2_x) * 0.0015;
        
        float h = wave1 + wave2;
        vec2 slope = vec2(wave1_dx + wave2_dx, wave1_dy + wave2_dy);
        
        for (int i = 0; i < 24; i++) {
          vec3 r = uRipples[i];
          float age = r.z;
          if (age < 0.99) {
            vec2 rPos = r.xy; // Aspect pre-scaled in JS
            vec2 diff = aspectUv - rPos;
            float dist = length(diff);
            if (dist > 0.0001) {
              vec2 dir = diff / dist;
              float waveSpeed = 1.8; // Slower wave expansion speed
              float front = age * waveSpeed;
              
              float distFromFront = dist - front;
              float absDistFromFront = abs(distFromFront);
              
              float envelope = exp(-absDistFromFront * 28.0);
              float force = pow(1.0 - age, 1.2);
              
              float phase = distFromFront * 38.0;
              float s = sin(phase);
              float c = cos(phase);
              
              float amp = 0.16 * force * envelope;
              h += s * amp;
              
              float signFactor = sign(distFromFront);
              float dRipple_dDist = amp * (38.0 * c - 28.0 * s * signFactor);
              
              slope += dRipple_dDist * dir;
            }
          }
        }
        
        return vec3(h, slope.x, slope.y);
      }

      void main() {
        vec2 aspectUv = vec2(vUv.x * uAspect, vUv.y);
        
        vec3 waveData = getWaveAndSlope(aspectUv, uTime);
        float h = waveData.x;
        vec2 slope = waveData.yz;
        
        // Calculate normal from height gradient (slope) - steeper for 3D look
        float totalBump = uDisplacementScale * 0.0018;
        vec3 normal = normalize(vec3(-slope.x * totalBump, -slope.y * totalBump, 0.045));
        
        // Chromatic aberration offsets
        float redOffset   = 0.006;
        float greenOffset = 0.012;
        float blueOffset  = 0.018;
        
        vec2 dUv = normal.xy * uDisplacementScale * 0.035;
        
        // Apply cover texture coordinates
        vec2 coverUv = (vUv - 0.5) * uUvMapScale + 0.5;
        
        float st = smoothstep(0.0, 0.08, length(dUv));
        vec4 texColor = vec4(0.0);
        texColor.r = texture2D(uTexture, clamp(coverUv + dUv + redOffset * st, 0.001, 0.999)).r;
        texColor.g = texture2D(uTexture, clamp(coverUv + dUv + greenOffset * st, 0.001, 0.999)).g;
        texColor.b = texture2D(uTexture, clamp(coverUv + dUv + blueOffset * st, 0.001, 0.999)).b;
        texColor.a = 1.0;
        
        // Specular & Fresnel highlights for metallic chrome reflection (matching mercury/glass)
        vec3 lightDir = normalize(vec3(0.3, 0.5, 0.8));
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfDir = normalize(lightDir + viewDir);
        
        float spec = pow(max(dot(normal, halfDir), 0.0), 64.0);
        float fresnel = pow(1.0 - normal.z, 3.0);
        
        float shine = spec * (1.0 - uRoughness) * 2.0 + fresnel * uMetalness * 0.8;
        vec3 specular = vec3(shine);
        
        gl_FragColor = vec4(texColor.rgb + specular, 1.0);
      }
    `;

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Shader program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionLoc = gl.getAttribLocation(program, "position");
    const uTextureLoc = gl.getUniformLocation(program, "uTexture");
    const uRipplesLoc = gl.getUniformLocation(program, "uRipples");
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uDisplacementScaleLoc = gl.getUniformLocation(program, "uDisplacementScale");
    const uAspectLoc = gl.getUniformLocation(program, "uAspect");
    const uUvMapScaleLoc = gl.getUniformLocation(program, "uUvMapScale");
    const uMetalnessLoc = gl.getUniformLocation(program, "uMetalness");
    const uRoughnessLoc = gl.getUniformLocation(program, "uRoughness");

    const vertices = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));

    let imageLoaded = false;
    let imageWidth = 1;
    let imageHeight = 1;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!gl) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      imageWidth = img.naturalWidth || img.width;
      imageHeight = img.naturalHeight || img.height;
      imageLoaded = true;
    };
    img.src = imageUrl;

    // Maintain JavaScript ripple states for motion and collision simulation
    const ripples = Array.from({ length: 24 }, () => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      age: 1.0
    }));

    // Buffer for 24 active ripples [x, y, age] (initialized to 1.0 = dead)
    const ripplesData = new Float32Array(24 * 3);
    for (let i = 0; i < 24; i++) {
      ripplesData[i * 3 + 2] = 1.0;
    }
    let rippleIndex = 0;
    let lastRippleX = -1;
    let lastRippleY = -1;

    const addRipple = (x: number, y: number) => {
      // Distance check to only add ripple if cursor moves a meaningful distance (prevents overwhelming buffer)
      const dx = x - lastRippleX;
      const dy = y - lastRippleY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Increased threshold to 0.035 to leave distinct, spaced-out independent touches along the drag path
      if (lastRippleX === -1 || dist > 0.035) {
        const r = ripples[rippleIndex];
        r.x = x;
        r.y = y;
        r.vx = 0.0;
        r.vy = 0.0;
        r.age = 0.0; // brand new

        rippleIndex = (rippleIndex + 1) % 24;
        lastRippleX = x;
        lastRippleY = y;
      }
    };

    const updateMousePos = (clientX: number, clientY: number, forceAdd = false) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (clientX - rect.left) / rect.width;
      const y = 1.0 - (clientY - rect.top) / rect.height;

      // Only register ripples if the cursor is within the viewport bounds of the canvas
      if (x >= 0.0 && x <= 1.0 && y >= 0.0 && y <= 1.0) {
        if (forceAdd) {
          const r = ripples[rippleIndex];
          r.x = x;
          r.y = y;
          r.vx = 0.0;
          r.vy = 0.0;
          r.age = 0.0;

          rippleIndex = (rippleIndex + 1) % 24;
          lastRippleX = x;
          lastRippleY = y;
        } else {
          addRipple(x, y);
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      updateMousePos(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMousePos(e.touches[0].clientX, e.touches[0].clientY, true);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      updateMousePos(e.clientX, e.clientY, true);
    };

    // Attach to window globally so movements over text, cans, and overlays trigger ripples
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });

    let animationFrameId = 0;
    let isDisposed = false;
    let time = 0.0;

    // Use reduced ratio on mobile for ultra performance
    const dpr = typeof window !== 'undefined' ? (window.innerWidth < 992 ? 1.0 : Math.min(window.devicePixelRatio, 2)) : 1;

    const resizeCanvas = () => {
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const render = () => {
      if (isDisposed || !gl) return;

      resizeCanvas();

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Compute aspect ratio for coordinate adjustments
      const aspect = canvas.width / canvas.height;

      // 1. Advance age of each ripple
      for (let i = 0; i < 24; i++) {
        const ripple = ripples[i];
        if (ripple.age < 1.0) {
          ripple.age += 0.002; // slow age increment
          if (ripple.age >= 1.0) {
            ripple.age = 1.0;
          }
        }
      }

      // 2. Ripple-to-Ripple Overlap Resolution (Pushing overlapping waves apart)
      for (let i = 0; i < 24; i++) {
        const r1 = ripples[i];
        if (r1.age >= 1.0) continue;

        // Radius grows as the wavefront spreads
        const rad1 = 0.035 + r1.age * 0.08;

        for (let j = i + 1; j < 24; j++) {
          const r2 = ripples[j];
          if (r2.age >= 1.0) continue;

          const rad2 = 0.035 + r2.age * 0.08;

          // Calculate distance in aspect ratio space so collision zones are perfectly circular
          const dx = (r2.x - r1.x) * aspect;
          const dy = r2.y - r1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = rad1 + rad2;

          if (dist < minDist && dist > 0.001) {
            // Collision normal unit vector
            const nx = dx / dist;
            const ny = dy / dist;

            // Resolve overlap (penetration separation)
            const overlap = minDist - dist;
            const shiftX = (overlap * 0.5 * nx) / aspect;
            const shiftY = overlap * 0.5 * ny;

            r1.x -= shiftX;
            r1.y -= shiftY;
            r2.x += shiftX;
            r2.y += shiftY;

            // Clamp coordinates to keep ripple centers inside canvas bounds [0, 1]
            r1.x = Math.max(0.0, Math.min(1.0, r1.x));
            r1.y = Math.max(0.0, Math.min(1.0, r1.y));
            r2.x = Math.max(0.0, Math.min(1.0, r2.x));
            r2.y = Math.max(0.0, Math.min(1.0, r2.y));
          }
        }
      }

      // 3. Write JavaScript state back to ripplesData array for GPU consumption
      for (let i = 0; i < 24; i++) {
        ripplesData[i * 3] = ripples[i].x;
        ripplesData[i * 3 + 1] = ripples[i].y;
        ripplesData[i * 3 + 2] = ripples[i].age;
      }

      time += 0.015;

      // Compute cover sizing uv scale
      const imgAspect = imageWidth / imageHeight;
      let uvMapScale = [1.0, 1.0];
      if (aspect > imgAspect) {
        uvMapScale = [imgAspect / aspect, 1.0];
      } else {
        uvMapScale = [1.0, aspect / imgAspect];
      }

      // Pre-scale x by aspect ratio in JS to avoid computing aspect division inside loop in fragment shader
      const gpuRipplesData = new Float32Array(24 * 3);
      for (let i = 0; i < 24; i++) {
        gpuRipplesData[i * 3] = ripplesData[i * 3] * aspect;
        gpuRipplesData[i * 3 + 1] = ripplesData[i * 3 + 1];
        gpuRipplesData[i * 3 + 2] = ripplesData[i * 3 + 2];
      }

      gl.useProgram(program);

      // Bind buffer and enable attributes
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      // Bind background image texture to TEXTURE0
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uTextureLoc, 0);

      gl.uniform3fv(uRipplesLoc, gpuRipplesData);
      gl.uniform1f(uTimeLoc, time);
      gl.uniform1f(uDisplacementScaleLoc, propsRef.current.displacementScale);
      gl.uniform1f(uAspectLoc, aspect);
      gl.uniform2f(uUvMapScaleLoc, uvMapScale[0], uvMapScale[1]);
      gl.uniform1f(uMetalnessLoc, propsRef.current.metalness);
      gl.uniform1f(uRoughnessLoc, propsRef.current.roughness);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const tick = () => {
      if (isDisposed) return;

      // Zero-GPU performance check: only draw when active/visible
      if (canvas.offsetParent !== null && canvas.clientWidth > 0 && canvas.clientHeight > 0 && imageLoaded) {
        render();
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mousedown', onMouseDown);

      if (gl) {
        gl.deleteBuffer(buffer);
        gl.deleteTexture(texture);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      }
    };
  }, [imageUrl]);

  return (
    <canvas
      ref={canvasRef}
      className={`d-block w-100 h-100 ${className}`}
      style={{ touchAction: 'pan-y' }}
    />
  );
};

interface JuiceSection {
  title: string;
  subtitle: string;
  leftMessage: {
    label: string;
    title: string;
    description: string;
  };
  rightMessage: {
    label: string;
    title: string;
    description: string;
  };
  start: number;
  end: number;
}

export default function JuiceScrollDemo() {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState("limon");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState("quincenal");
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Refs for the 3 bottles
  const bottleLimonRef = useRef<HTMLDivElement>(null);
  const bottleNaranjaRef = useRef<HTMLDivElement>(null);
  const bottleUvaRef = useRef<HTMLDivElement>(null);

  const isMobileRef = useRef(false);

  // Refs for background cards
  const bgLimonRef = useRef<HTMLDivElement>(null);
  const bgNaranjaRef = useRef<HTMLDivElement>(null);
  const bgUvaRef = useRef<HTMLDivElement>(null);

  // Refs for text sections
  const textLimonLeftRef = useRef<HTMLDivElement>(null);
  const textLimonRightRef = useRef<HTMLDivElement>(null);
  const textNaranjaLeftRef = useRef<HTMLDivElement>(null);
  const textNaranjaRightRef = useRef<HTMLDivElement>(null);
  const textUvaLeftRef = useRef<HTMLDivElement>(null);
  const textUvaRightRef = useRef<HTMLDivElement>(null);

  // Floating elements refs
  const floatsRef = useRef<(HTMLDivElement | null)[]>([]);

  const scrollInfoRef = useRef({
    targetProgress: 0,
    currentProgress: 0,
    animationFrameId: 0,
  });

  const lastStatesRef = useRef({
    bgLimonOpacity: -1,
    bgNaranjaOpacity: -1,
    bgUvaOpacity: -1,
    limonOpacity: -1,
    limonTransform: "",
    limonPointerEvents: "",
    naranjaOpacity: -1,
    naranjaTransform: "",
    naranjaPointerEvents: "",
    uvaOpacity: -1,
    uvaTransform: "",
    uvaPointerEvents: "",
    textLimonLeftOpacity: -1,
    textLimonLeftTransform: "",
    textLimonLeftPointerEvents: "",
    textLimonRightOpacity: -1,
    textLimonRightTransform: "",
    textLimonRightFilter: "",
    textLimonRightPointerEvents: "",
    textNaranjaLeftOpacity: -1,
    textNaranjaLeftTransform: "",
    textNaranjaLeftPointerEvents: "",
    textNaranjaRightOpacity: -1,
    textNaranjaRightTransform: "",
    textNaranjaRightPointerEvents: "",
    textUvaLeftOpacity: -1,
    textUvaLeftTransform: "",
    textUvaLeftPointerEvents: "",
    textUvaRightOpacity: -1,
    textUvaRightTransform: "",
    textUvaRightLetterSpacing: "",
    textUvaRightPointerEvents: "",
    brandAccentColor: "",
    floatOpacity: [] as number[],
    floatTransform: [] as string[]
  });

  // 12 Floating decorative elements for a parallax 3D effect (emojis with blur filters for depth of field)
  // 12 Floating decorative elements for a parallax 3D effect (emojis with high blur filters for a deep bokeh depth of field)
  const floatingItems = [
    // Lemon phase (0.0 to 0.35)
    { emoji: "🍋", left: "8%", top: "15%", speed: 1.2, rotateSpeed: 0.3, blur: 7, scale: 1.4, phase: "limon" },
    { emoji: "🌿", left: "85%", top: "18%", speed: -0.8, rotateSpeed: -0.2, blur: 6, scale: 1.2, phase: "limon" },
    { emoji: "🍃", left: "12%", top: "65%", speed: 0.9, rotateSpeed: 0.4, blur: 8, scale: 1.3, phase: "limon" },
    { emoji: "🍋", left: "80%", top: "60%", speed: -1.1, rotateSpeed: -0.3, blur: 9, scale: 1.1, phase: "limon" },

    // Orange phase (0.3 to 0.7)
    { emoji: "🍊", left: "86%", top: "14%", speed: 1.3, rotateSpeed: -0.4, blur: 7, scale: 1.4, phase: "naranja" },
    { emoji: "🌿", left: "10%", top: "25%", speed: -0.7, rotateSpeed: 0.3, blur: 6, scale: 1.3, phase: "naranja" },
    { emoji: "🍃", left: "82%", top: "68%", speed: 0.8, rotateSpeed: -0.2, blur: 8, scale: 1.5, phase: "naranja" },
    { emoji: "🍊", left: "15%", top: "62%", speed: -1.0, rotateSpeed: 0.5, blur: 9, scale: 1.2, phase: "naranja" },

    // Grape phase (0.65 to 1.0)
    { emoji: "🍇", left: "9%", top: "16%", speed: 1.2, rotateSpeed: 0.3, blur: 7, scale: 1.5, phase: "uva" },
    { emoji: "🌿", left: "88%", top: "20%", speed: -0.9, rotateSpeed: -0.3, blur: 6, scale: 1.3, phase: "uva" },
    { emoji: "🍃", left: "80%", top: "63%", speed: 0.8, rotateSpeed: 0.4, blur: 8, scale: 1.4, phase: "uva" },
    { emoji: "🫐", left: "14%", top: "70%", speed: -1.2, rotateSpeed: 0.5, blur: 7, scale: 1.2, phase: "uva" }
  ];

  // Set document title and check mobile status
  useEffect(() => {
    document.title = "Oasis Natura - Demos ImperioDev";
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Force scroll to top on mount
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imagesToLoad = [
      limonImg.src, naranjaImg.src, uvaImg.src,
      limonBgImg.src, naranjaBgImg.src, uvaBgImg.src,
      limonBgImgMobile.src, naranjaBgImgMobile.src, uvaBgImgMobile.src
    ];

    const checkLoad = () => {
      loadedCount++;
      if (loadedCount === imagesToLoad.length) {
        setIsPreloaded(true);
      }
    };

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    });
  }, []);

  // Handle sticky scroll styling fixes in parent layout
  useEffect(() => {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const wrapperEl = document.getElementById("id-global-wrapper");
    const mainEl = document.querySelector("main");

    const originalHtmlOverflow = htmlEl.style.overflow;
    const originalHtmlOverflowX = htmlEl.style.overflowX;
    const originalHtmlHeight = htmlEl.style.height;

    const originalBodyOverflow = bodyEl.style.overflow;
    const originalBodyOverflowX = bodyEl.style.overflowX;
    const originalBodyHeight = bodyEl.style.height;

    const originalWrapperOverflow = wrapperEl ? wrapperEl.style.overflow : "";
    const originalWrapperOverflowX = wrapperEl ? wrapperEl.style.overflowX : "";
    const originalWrapperHeight = wrapperEl ? wrapperEl.style.height : "";

    const originalMainOverflow = mainEl ? mainEl.style.overflow : "";
    const originalMainOverflowX = mainEl ? mainEl.style.overflowX : "";
    const originalMainHeight = mainEl ? mainEl.style.height : "";

    htmlEl.style.setProperty("overflow", "visible", "important");
    htmlEl.style.setProperty("overflow-x", "visible", "important");
    htmlEl.style.setProperty("height", "auto", "important");

    bodyEl.style.setProperty("overflow", "visible", "important");
    bodyEl.style.setProperty("overflow-x", "visible", "important");
    bodyEl.style.setProperty("height", "auto", "important");

    if (wrapperEl) {
      wrapperEl.style.setProperty("overflow", "visible", "important");
      wrapperEl.style.setProperty("overflow-x", "visible", "important");
      wrapperEl.style.setProperty("height", "auto", "important");
    }

    if (mainEl) {
      mainEl.style.setProperty("overflow", "visible", "important");
      mainEl.style.setProperty("overflow-x", "visible", "important");
      mainEl.style.setProperty("height", "auto", "important");
    }

    return () => {
      htmlEl.style.overflow = originalHtmlOverflow;
      htmlEl.style.overflowX = originalHtmlOverflowX;
      htmlEl.style.height = originalHtmlHeight;

      bodyEl.style.overflow = originalBodyOverflow;
      bodyEl.style.overflowX = originalBodyOverflowX;
      bodyEl.style.height = originalBodyHeight;

      if (wrapperEl) {
        wrapperEl.style.overflow = originalWrapperOverflow;
        wrapperEl.style.overflowX = originalWrapperOverflowX;
        wrapperEl.style.height = originalWrapperHeight;
      }

      if (mainEl) {
        mainEl.style.overflow = originalMainOverflow;
        mainEl.style.overflowX = originalMainOverflowX;
        mainEl.style.height = originalMainHeight;
      }
    };
  }, []);

  // Fading curves calculation helper
  const getProgressOpacity = (progress: number, start: number, end: number, fadeLen: number = 0.08) => {
    if (progress < start - fadeLen || progress > end + fadeLen) return 0;
    if (progress >= start && progress <= end) return 1;
    if (progress < start) {
      return (progress - (start - fadeLen)) / fadeLen;
    }
    return ((end + fadeLen) - progress) / fadeLen;
  };

  const getProgressTranslateY = (opacity: number) => {
    return (1 - opacity) * 50; // Translate up/down by 50px
  };

  // Performant scroll loop (LERP + direct DOM modifications + idle loop suspension)
  useEffect(() => {
    if (!isPreloaded) return;

    let active = true;
    let loopRunning = false;
    let lastTime = typeof window !== 'undefined' ? performance.now() : 0;

    const handleScroll = () => {
      isMobileRef.current = window.innerWidth < 992;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = window.pageYOffset + rect.top;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      const scrollStart = containerTop;
      const scrollRange = container.offsetHeight - window.innerHeight;

      if (scrollRange <= 0) return;

      const progress = Math.min(1, Math.max(0, (scrollTop - scrollStart) / scrollRange));
      scrollInfoRef.current.targetProgress = progress;

      // Wake up the rendering loop if it was suspended
      startLoop();
    };

    const startLoop = () => {
      if (loopRunning || !active) return;
      loopRunning = true;
      lastTime = performance.now();
      scrollInfoRef.current.animationFrameId = requestAnimationFrame(renderLoop);
    };

    const renderLoop = () => {
      if (!active) {
        loopRunning = false;
        return;
      }

      const info = scrollInfoRef.current;
      const diff = info.targetProgress - info.currentProgress;

      // Calculate time-delta for frame-rate independence (normalized to 60fps)
      const now = performance.now();
      const dt = Math.min(50, now - lastTime) / 16.666;
      lastTime = now;

      // Snappier LERP on mobile so scroll matches finger tracking instantly
      const isMobile = isMobileRef.current;
      const baseLerp = isMobile ? 0.35 : 0.15;
      const lerpFactor = 1.0 - Math.pow(1.0 - baseLerp, dt);

      if (Math.abs(diff) > 0.0001) {
        info.currentProgress += diff * lerpFactor;
      } else {
        info.currentProgress = info.targetProgress;
      }

      const p = info.currentProgress;

      // 1. Backgrounds crossfade opacities
      const oLimonBg = getProgressOpacity(p, 0.0, 0.23, 0.12);
      const oNaranjaBg = getProgressOpacity(p, 0.35, 0.58, 0.12);
      const oUvaBg = getProgressOpacity(p, 0.70, 1.0, 0.12);

      const cache = lastStatesRef.current;

      if (Math.abs(cache.bgLimonOpacity - oLimonBg) > 0.001) {
        cache.bgLimonOpacity = oLimonBg;
        if (bgLimonRef.current) {
          bgLimonRef.current.style.opacity = oLimonBg.toFixed(3);
          bgLimonRef.current.style.display = oLimonBg > 0.001 ? "block" : "none";
        }
      }
      if (Math.abs(cache.bgNaranjaOpacity - oNaranjaBg) > 0.001) {
        cache.bgNaranjaOpacity = oNaranjaBg;
        if (bgNaranjaRef.current) {
          bgNaranjaRef.current.style.opacity = oNaranjaBg.toFixed(3);
          bgNaranjaRef.current.style.display = oNaranjaBg > 0.001 ? "block" : "none";
        }
      }
      if (Math.abs(cache.bgUvaOpacity - oUvaBg) > 0.001) {
        cache.bgUvaOpacity = oUvaBg;
        if (bgUvaRef.current) {
          bgUvaRef.current.style.opacity = oUvaBg.toFixed(3);
          bgUvaRef.current.style.display = oUvaBg > 0.001 ? "block" : "none";
        }
      }

      // 2. Bottle animations (scale, translation, rotation)
      let limScale = 1;
      let limRot = 0;
      let limTransX = 0;
      let limTransY = 0;
      let limOpacity = 1;

      if (p > 0.23) {
        const t = Math.min(1, (p - 0.23) / 0.12);
        limOpacity = 1 - t;
        limScale = 1 - t * 0.35;
        limRot = -t * 60;
        limTransX = -t * 400;
        limTransY = t * 60;
      }

      let narScale = 0.65;
      let narRot = 60;
      let narTransX = 400;
      let narTransY = -60;
      let narOpacity = 0;

      if (p >= 0.23 && p <= 0.35) {
        const t = (p - 0.23) / 0.12;
        narOpacity = t;
        narScale = 0.65 + t * 0.35;
        narRot = 60 - t * 60;
        narTransX = 400 - t * 400;
        narTransY = -60 + t * 60;
      } else if (p > 0.35 && p <= 0.58) {
        narOpacity = 1;
        narScale = 1;
        narRot = 0;
        narTransX = 0;
        narTransY = 0;
      } else if (p > 0.58 && p <= 0.70) {
        const t = (p - 0.58) / 0.12;
        narOpacity = 1 - t;
        narScale = 1 - t * 0.35;
        narRot = -t * 60;
        narTransX = -t * 400;
        narTransY = t * 60;
      }

      let uvaScale = 0.65;
      let uvaRot = 60;
      let uvaTransX = 400;
      let uvaTransY = -60;
      let uvaOpacity = 0;

      if (p >= 0.58 && p <= 0.70) {
        const t = (p - 0.58) / 0.12;
        uvaOpacity = t;
        uvaScale = 0.65 + t * 0.35;
        uvaRot = 60 - t * 60;
        uvaTransX = 400 - t * 400;
        uvaTransY = -60 + t * 60;
      } else if (p > 0.70) {
        uvaOpacity = 1;
        uvaScale = 1;
        uvaRot = 0;
        uvaTransX = 0;
        uvaTransY = 0;
      }

      const limTransformStr = `translate3d(${limTransX.toFixed(1)}px, ${(limTransY + (isMobile ? 30 : 0)).toFixed(1)}px, 0) scale3d(${limScale.toFixed(3)}, ${limScale.toFixed(3)}, 1) rotate3d(0, 0, 1, ${limRot.toFixed(1)}deg)`;
      const limPointerStr = limOpacity > 0.5 ? "auto" : "none";
      if (Math.abs(cache.limonOpacity - limOpacity) > 0.001 || cache.limonTransform !== limTransformStr || cache.limonPointerEvents !== limPointerStr) {
        cache.limonOpacity = limOpacity;
        cache.limonTransform = limTransformStr;
        cache.limonPointerEvents = limPointerStr;
        if (bottleLimonRef.current) {
          bottleLimonRef.current.style.opacity = limOpacity.toFixed(3);
          bottleLimonRef.current.style.transform = limTransformStr;
          bottleLimonRef.current.style.pointerEvents = limPointerStr;
        }
      }

      const narTransformStr = `translate3d(${narTransX.toFixed(1)}px, ${(narTransY + (isMobile ? 30 : 0)).toFixed(1)}px, 0) scale3d(${narScale.toFixed(3)}, ${narScale.toFixed(3)}, 1) rotate3d(0, 0, 1, ${narRot.toFixed(1)}deg)`;
      const narPointerStr = narOpacity > 0.5 ? "auto" : "none";
      if (Math.abs(cache.naranjaOpacity - narOpacity) > 0.001 || cache.naranjaTransform !== narTransformStr || cache.naranjaPointerEvents !== narPointerStr) {
        cache.naranjaOpacity = narOpacity;
        cache.naranjaTransform = narTransformStr;
        cache.naranjaPointerEvents = narPointerStr;
        if (bottleNaranjaRef.current) {
          bottleNaranjaRef.current.style.opacity = narOpacity.toFixed(3);
          bottleNaranjaRef.current.style.transform = narTransformStr;
          bottleNaranjaRef.current.style.pointerEvents = narPointerStr;
        }
      }

      const uvaTransformStr = `translate3d(${uvaTransX.toFixed(1)}px, ${(uvaTransY + (isMobile ? 30 : 0)).toFixed(1)}px, 0) scale3d(${uvaScale.toFixed(3)}, ${uvaScale.toFixed(3)}, 1) rotate3d(0, 0, 1, ${uvaRot.toFixed(1)}deg)`;
      const uvaPointerStr = uvaOpacity > 0.5 ? "auto" : "none";
      if (Math.abs(cache.uvaOpacity - uvaOpacity) > 0.001 || cache.uvaTransform !== uvaTransformStr || cache.uvaPointerEvents !== uvaPointerStr) {
        cache.uvaOpacity = uvaOpacity;
        cache.uvaTransform = uvaTransformStr;
        cache.uvaPointerEvents = uvaPointerStr;
        if (bottleUvaRef.current) {
          bottleUvaRef.current.style.opacity = uvaOpacity.toFixed(3);
          bottleUvaRef.current.style.transform = uvaTransformStr;
          bottleUvaRef.current.style.pointerEvents = uvaPointerStr;
        }
      }

      // 3. Side Text opacities and sliding transitions
      const oLimText = getProgressOpacity(p, 0.0, 0.20, 0.08);
      const tyLimText = getProgressTranslateY(oLimText);

      const limLeftTransStr = `translate3d(0, ${tyLimText.toFixed(1)}px, 0)`;
      const limLeftPointerStr = oLimText > 0.5 ? "auto" : "none";
      if (Math.abs(cache.textLimonLeftOpacity - oLimText) > 0.001 || cache.textLimonLeftTransform !== limLeftTransStr || cache.textLimonLeftPointerEvents !== limLeftPointerStr) {
        cache.textLimonLeftOpacity = oLimText;
        cache.textLimonLeftTransform = limLeftTransStr;
        cache.textLimonLeftPointerEvents = limLeftPointerStr;
        if (textLimonLeftRef.current) {
          textLimonLeftRef.current.style.opacity = oLimText.toFixed(3);
          textLimonLeftRef.current.style.transform = limLeftTransStr;
          textLimonLeftRef.current.style.pointerEvents = limLeftPointerStr;
        }
      }

      const limRightTransStr = isMobile ? `translate3d(0, ${tyLimText.toFixed(1)}px, 0)` : `translate3d(0, ${(1 - oLimText) * 40}px, 0)`;
      const limRightFilterStr = isMobile ? "none" : `blur(${(1 - oLimText) * 8}px)`;
      const limRightPointerStr = oLimText > 0.5 ? "auto" : "none";
      if (Math.abs(cache.textLimonRightOpacity - oLimText) > 0.001 || cache.textLimonRightTransform !== limRightTransStr || cache.textLimonRightFilter !== limRightFilterStr || cache.textLimonRightPointerEvents !== limRightPointerStr) {
        cache.textLimonRightOpacity = oLimText;
        cache.textLimonRightTransform = limRightTransStr;
        cache.textLimonRightFilter = limRightFilterStr;
        cache.textLimonRightPointerEvents = limRightPointerStr;
        if (textLimonRightRef.current) {
          textLimonRightRef.current.style.opacity = oLimText.toFixed(3);
          textLimonRightRef.current.style.transform = limRightTransStr;
          textLimonRightRef.current.style.filter = limRightFilterStr;
          textLimonRightRef.current.style.pointerEvents = limRightPointerStr;
        }
      }

      const oNarText = getProgressOpacity(p, 0.38, 0.55, 0.08);
      const tyNarText = getProgressTranslateY(oNarText);

      const narLeftTransStr = `translate3d(0, ${tyNarText.toFixed(1)}px, 0)`;
      const narLeftPointerStr = oNarText > 0.5 ? "auto" : "none";
      if (Math.abs(cache.textNaranjaLeftOpacity - oNarText) > 0.001 || cache.textNaranjaLeftTransform !== narLeftTransStr || cache.textNaranjaLeftPointerEvents !== narLeftPointerStr) {
        cache.textNaranjaLeftOpacity = oNarText;
        cache.textNaranjaLeftTransform = narLeftTransStr;
        cache.textNaranjaLeftPointerEvents = narLeftPointerStr;
        if (textNaranjaLeftRef.current) {
          textNaranjaLeftRef.current.style.opacity = oNarText.toFixed(3);
          textNaranjaLeftRef.current.style.transform = narLeftTransStr;
          textNaranjaLeftRef.current.style.pointerEvents = narLeftPointerStr;
        }
      }

      const narRightTransStr = isMobile ? `translate3d(0, ${tyNarText.toFixed(1)}px, 0)` : `translate3d(${(1 - oNarText) * 50}px, ${(1 - oNarText) * 20}px, 0) rotate(${(1 - oNarText) * -4}deg)`;
      const narRightPointerStr = oNarText > 0.5 ? "auto" : "none";
      if (Math.abs(cache.textNaranjaRightOpacity - oNarText) > 0.001 || cache.textNaranjaRightTransform !== narRightTransStr || cache.textNaranjaRightPointerEvents !== narRightPointerStr) {
        cache.textNaranjaRightOpacity = oNarText;
        cache.textNaranjaRightTransform = narRightTransStr;
        cache.textNaranjaRightPointerEvents = narRightPointerStr;
        if (textNaranjaRightRef.current) {
          textNaranjaRightRef.current.style.opacity = oNarText.toFixed(3);
          textNaranjaRightRef.current.style.transform = narRightTransStr;
          textNaranjaRightRef.current.style.pointerEvents = narRightPointerStr;
        }
      }

      const oUvaText = getProgressOpacity(p, 0.73, 0.95, 0.08);
      const tyUvaText = getProgressTranslateY(oUvaText);

      const uvaLeftTransStr = `translate3d(0, ${tyUvaText.toFixed(1)}px, 0)`;
      const uvaLeftPointerStr = oUvaText > 0.5 ? "auto" : "none";
      if (Math.abs(cache.textUvaLeftOpacity - oUvaText) > 0.001 || cache.textUvaLeftTransform !== uvaLeftTransStr || cache.textUvaLeftPointerEvents !== uvaLeftPointerStr) {
        cache.textUvaLeftOpacity = oUvaText;
        cache.textUvaLeftTransform = uvaLeftTransStr;
        cache.textUvaLeftPointerEvents = uvaLeftPointerStr;
        if (textUvaLeftRef.current) {
          textUvaLeftRef.current.style.opacity = oUvaText.toFixed(3);
          textUvaLeftRef.current.style.transform = uvaLeftTransStr;
          textUvaLeftRef.current.style.pointerEvents = uvaLeftPointerStr;
        }
      }

      const uvaRightTransStr = isMobile ? `translate3d(0, ${tyUvaText.toFixed(1)}px, 0)` : `translate3d(0, ${(1 - oUvaText) * -30}px, 0) scale(${0.9 + oUvaText * 0.1})`;
      const uvaRightSpacingStr = isMobile ? "normal" : `${(1 - oUvaText) * 0.06}em`;
      const uvaRightPointerStr = oUvaText > 0.5 ? "auto" : "none";
      if (Math.abs(cache.textUvaRightOpacity - oUvaText) > 0.001 || cache.textUvaRightTransform !== uvaRightTransStr || cache.textUvaRightLetterSpacing !== uvaRightSpacingStr || cache.textUvaRightPointerEvents !== uvaRightPointerStr) {
        cache.textUvaRightOpacity = oUvaText;
        cache.textUvaRightTransform = uvaRightTransStr;
        cache.textUvaRightLetterSpacing = uvaRightSpacingStr;
        cache.textUvaRightPointerEvents = uvaRightPointerStr;
        if (textUvaRightRef.current) {
          textUvaRightRef.current.style.opacity = oUvaText.toFixed(3);
          textUvaRightRef.current.style.transform = uvaRightTransStr;
          textUvaRightRef.current.style.letterSpacing = uvaRightSpacingStr;
          textUvaRightRef.current.style.pointerEvents = uvaRightPointerStr;
        }
      }

      // 4. Parallax Decorative Float Elements
      floatingItems.forEach((item, idx) => {
        const floatEl = floatsRef.current[idx];
        if (!floatEl) return;

        let floatOpacity = 0;
        if (item.phase === "limon") floatOpacity = oLimonBg;
        else if (item.phase === "naranja") floatOpacity = oNaranjaBg;
        else if (item.phase === "uva") floatOpacity = oUvaBg;

        const travel = p * item.speed * 180;
        const rotate = p * item.rotateSpeed * 360;

        const finalOpacity = floatOpacity * 0.85;
        const finalTransform = `translate3d(0, ${travel.toFixed(1)}px, 0) rotate(${rotate.toFixed(1)}deg) scale(${item.scale})`;

        const lastOpacity = cache.floatOpacity[idx] || -1;
        const lastTransform = cache.floatTransform[idx] || "";

        if (Math.abs(lastOpacity - finalOpacity) > 0.005 || lastTransform !== finalTransform) {
          cache.floatOpacity[idx] = finalOpacity;
          cache.floatTransform[idx] = finalTransform;
          floatEl.style.opacity = finalOpacity.toFixed(3);
          floatEl.style.transform = finalTransform;
        }
      });

      // Calculate brand accent color based on active section
      let targetColor = "";
      if (p < 0.29) {
        targetColor = "#5c8b05";
      } else if (p >= 0.29 && p < 0.64) {
        targetColor = "#d95d14";
      } else {
        targetColor = "#692fb8";
      }

      if (cache.brandAccentColor !== targetColor) {
        cache.brandAccentColor = targetColor;
        const brandAccentEl = document.querySelector(".brand-accent") as HTMLElement;
        if (brandAccentEl) {
          brandAccentEl.style.color = targetColor;
        }
      }

      // Suspend render loop when target is reached to free CPU/GPU resources
      const finalDiff = info.targetProgress - info.currentProgress;
      if (Math.abs(finalDiff) > 0.0001 && active) {
        info.animationFrameId = requestAnimationFrame(renderLoop);
      } else {
        info.currentProgress = info.targetProgress;
        loopRunning = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    handleScroll();

    return () => {
      active = false;
      cancelAnimationFrame(scrollInfoRef.current.animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isPreloaded]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 4500);
  };

  // Theme styling configurations based on selected flavor
  const themeColors = {
    limon: {
      primary: "#8ade28",
      dark: "#5c8b05",
      border: "rgba(138, 222, 40, 0.4)",
      shadow: "rgba(138, 222, 40, 0.15)",
      bgLight: "rgba(138, 222, 40, 0.08)",
      text: "#3e6302"
    },
    naranja: {
      primary: "#ff9559",
      dark: "#d95d14",
      border: "rgba(255, 149, 89, 0.4)",
      shadow: "rgba(255, 149, 89, 0.15)",
      bgLight: "rgba(255, 149, 89, 0.08)",
      text: "#a84203"
    },
    uva: {
      primary: "#a275e3",
      dark: "#692fb8",
      border: "rgba(162, 117, 227, 0.4)",
      shadow: "rgba(162, 117, 227, 0.15)",
      bgLight: "rgba(162, 117, 227, 0.08)",
      text: "#4e199c"
    }
  }[selectedFlavor as "limon" | "naranja" | "uva"] || {
    primary: "#8ade28",
    dark: "#5c8b05",
    border: "rgba(138, 222, 40, 0.4)",
    shadow: "rgba(138, 222, 40, 0.15)",
    bgLight: "rgba(138, 222, 40, 0.08)",
    text: "#3e6302"
  };

  const planPrices = {
    semanal: { price: "$39.99", desc: "4 botellas por semana (Envío cada Lunes)" },
    quincenal: { price: "$29.99", desc: "8 botellas quincenales (Envío Lunes por medio)" },
    mensual: { price: "$19.99", desc: "12 botellas mensuales (Envío primer Lunes)" }
  }[subscriptionPlan as "semanal" | "quincenal" | "mensual"] || { price: "$29.99", desc: "8 botellas quincenales" };

  const flavorDetails = {
    limon: { name: "Oasis Limón", blend: "Limón Eureka + Menta Silvestre", desc: "Prensado en frío con menta fresca orgánica." },
    naranja: { name: "Oasis Naranja", blend: "Naranja Valencia + Mandarina", desc: "Vitamina C e hidratación cítrica natural." },
    uva: { name: "Oasis Uva", blend: "Uva Isabela + Arándanos", desc: "Súper antioxidantes para tu salud cardiovascular." }
  }[selectedFlavor as "limon" | "naranja" | "uva"] || { name: "Oasis Limón", blend: "Limón Eureka + Menta Silvestre", desc: "Prensado en frío con menta fresca orgánica." };

  return (
    <div data-bs-theme="light" className="bg-white text-black min-vh-100 position-relative" style={{ fontFamily: "'Outfit', var(--font-sans)", overflow: "visible" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{
        __html: `
        /* Overrides to ensure CSS position: sticky works perfectly */
        html, body, #id-global-wrapper, main {
          overflow: visible !important;
          overflow-x: visible !important;
          height: auto !important;
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(195, 200, 193, 0.4);
          box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.04);
        }
        .organic-shadow {
          box-shadow: 0 20px 40px -10px rgba(27, 48, 34, 0.06);
        }
        .hover-translate-up {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
        }
        .hover-translate-up:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 15px 35px -5px rgba(27, 48, 34, 0.08) !important;
        }
        .font-headline-lg-mobile {
          font-family: 'Playfair Display', serif;
          font-size: 32px !important;
          line-height: 40px !important;
          font-weight: 600 !important;
        }
        .font-display-lg {
          font-family: 'Playfair Display', serif;
          font-size: 64px !important;
          line-height: 72px !important;
          font-weight: 700 !important;
        }
        .font-label-caps {
          font-family: 'Inter', sans-serif;
          font-size: 12px !important;
          line-height: 16px !important;
          letter-spacing: 0.1em !important;
          font-weight: 600 !important;
        }
        .font-headline-md {
          font-family: 'Playfair Display', serif;
          font-size: 28px !important;
          line-height: 36px !important;
          font-weight: 500 !important;
        }
        .font-body-md {
          font-family: 'Inter', sans-serif;
          font-size: 16px !important;
          line-height: 24px !important;
          font-weight: 400 !important;
        }
        .font-body-lg {
          font-family: 'Inter', sans-serif;
          font-size: 18px !important;
          line-height: 28px !important;
          font-weight: 400 !important;
        }


        [data-bs-theme="light"] {
          --bs-body-bg: #ffffff !important;
          --bs-body-bg-rgb: 255, 255, 255 !important;
          --bs-body-color: #1a1a1a !important;
          --bs-body-color-rgb: 26, 26, 26 !important;
        }

        .juice-nav {
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
          z-index: 1000;
        }

        .sticky-viewport-juice {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background-color: #ffffff;
        }

        /* 3 Layered Background Images */
        .bg-layer-juice {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: 0;
          background-size: cover !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
        }

        .bg-layer-juice canvas {
          touch-action: pan-y !important;
        }
        
        .bg-limon {
          background-color: #f3ffeb;
        }
        .bg-naranja {
          background-color: #fff3e6;
        }
        .bg-uva {
          background-color: #f6efff;
        }

        /* Central Bottles Area */
        .bottles-center-container {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          pointer-events: none;
        }

        .juice-bottle-wrapper {
          position: absolute;
          width: 950px;
          height: 1100px;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform, opacity;
          opacity: 0;
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
        }

        @media (min-width: 992px) and (max-width: 1199.98px) {
          .juice-bottle-wrapper {
            width: 650px;
            height: 850px;
          }
          .juice-bottle-img {
            max-height: 800px;
          }
          .bottle-glow {
            width: 500px;
            height: 500px;
          }
        }

        @keyframes bottle-float {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(0, -18px, 0) rotate(1deg); }
        }

        .bottle-inner-floating {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bottle-float 6s ease-in-out infinite;
        }

        .bottle-glow {
          position: absolute;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.5;
          z-index: -1;
          pointer-events: none;
        }

        .juice-bottle-wrapper.bottle-limon .bottle-glow {
          background: radial-gradient(circle, rgba(138, 222, 40, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
        }
        .juice-bottle-wrapper.bottle-naranja .bottle-glow {
          background: radial-gradient(circle, rgba(255, 121, 42, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
        }
        .juice-bottle-wrapper.bottle-uva .bottle-glow {
          background: radial-gradient(circle, rgba(135, 56, 250, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .juice-bottle-img {
          max-height: 1050px;
          max-width: 100%;
          object-fit: contain;
          /* Color-glowing drop-shadow refraction */
          filter: drop-shadow(0 25px 45px rgba(0, 0, 0, 0.16));
          transition: filter 0.3s ease;
        }

        .juice-bottle-wrapper.bottle-limon .juice-bottle-img {
          filter: drop-shadow(0 30px 60px rgba(138, 222, 40, 0.35)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
        }
        .juice-bottle-wrapper.bottle-naranja .juice-bottle-img {
          filter: drop-shadow(0 30px 60px rgba(255, 121, 42, 0.35)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
        }
        .juice-bottle-wrapper.bottle-uva .juice-bottle-img {
          filter: drop-shadow(0 30px 60px rgba(135, 56, 250, 0.35)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
        }

        /* Side Messages Layout */
        .message-overlay-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 3;
          pointer-events: none;
        }

        .message-column-left {
          position: relative;
          height: 100%;
        }

        .message-column-right {
          position: relative;
          height: 100%;
        }

        .stacked-card-wrapper {
          position: absolute !important;
          width: 100%;
          max-width: 380px;
          height: auto;
          opacity: 0;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .message-column-left .stacked-card-wrapper {
          top: 30% !important;
          left: 0 !important;
        }

        .stacked-card-bg-1 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 2.5rem 7.5rem 2.5rem 2.5rem;
          transform: rotate(4deg) scale(0.98);
          z-index: 1;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
        }

        .stacked-card-bg-2 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 2.5rem 7.5rem 2.5rem 2.5rem;
          transform: rotate(-3deg) scale(0.99);
          z-index: 2;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
        }

        .stacked-card-front {
          position: relative;
          background: #ffffff;
          border-radius: 2.5rem 7.5rem 2.5rem 2.5rem;
          padding: 2.5rem 2.25rem !important;
          z-index: 3;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.03);
          text-align: left !important;
        }

        .plain-juice-desc {
          position: absolute !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          width: 100%;
          max-width: 400px;
          opacity: 0;
          pointer-events: none;
          will-change: transform, opacity, filter;
          color: #1e293b !important;
          font-size: 1.15rem;
          line-height: 1.75;
          font-weight: 600;
        }

        .message-column-right .plain-juice-desc {
          top: 35% !important;
          right: 0 !important;
        }

        .accent-label {
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 0.85rem;
        }

        /* Decorative Floating Particles */
        .decorations-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-element {
          position: absolute;
          will-change: transform, opacity;
          pointer-events: none;
          opacity: 0;
          user-select: none;
        }

        /* Typography & Coloring */
        .juice-label {
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.75rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .text-limon-accent { color: #1b4d0c !important; }
        .text-naranja-accent { color: #6e2502 !important; }
        .text-uva-accent { color: #290a54 !important; }

        .grape-desc-theme h2 {
          color: #d6bdfa !important; /* Light lilac */
        }
        .grape-desc-theme .highlight {
          color: #ffffff !important;
        }
        .grape-desc-theme .desc {
          color: #cbb3f5 !important; /* Soft lavender-grey */
        }

        .label-limon { color: #5c8b05 !important; }
        .label-naranja { color: #d95d14 !important; }
        .label-uva { color: #692fb8 !important; }

        .juice-title {
          font-weight: 800;
          color: #0f172a !important;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .juice-desc {
          font-size: 0.92rem;
          color: #333333;
          line-height: 1.6;
          font-weight: 500;
        }

        /* Footer card specs */
        .specs-card-juice {
          background: #fcfdf9;
          border: 1px solid #eef2e7;
          border-radius: 1.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .specs-card-juice:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.03);
        }

        /* Flavor Selector Button Simulation */
        .flavor-selector-btn {
          border: 2px solid transparent;
          border-radius: 1rem;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .flavor-selector-btn.active-limon {
          border-color: #b2e662;
          background: rgba(178, 230, 98, 0.08);
        }
        .flavor-selector-btn.active-naranja {
          border-color: #ff9559;
          background: rgba(255, 149, 89, 0.08);
        }
        .flavor-selector-btn.active-uva {
          border-color: #a275e3;
          background: rgba(162, 117, 227, 0.08);
        }

        /* Exit control bar */
        .juice-demo-bar {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 50px;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.06);
        }

        /* Responsive adaptations */
        @media (max-width: 991.98px) {
          .juice-bottle-wrapper {
            width: 440px;
            height: 520px;
            top: 14vh !important; /* Shift bottle container down to 14vh to avoid card overlap */
            pointer-events: none !important;
          }
          .juice-bottle-img {
            max-height: 480px !important;
            /* Disable heavy multiple drop shadows on mobile to prevent rendering lag */
            filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.15)) !important;
          }
          .bottle-glow {
            width: 320px;
            height: 320px;
            /* Reduce blur filter intensity to prevent layout rendering stutter */
            filter: blur(25px) !important;
            opacity: 0.25 !important;
          }
          .message-column-left .stacked-card-wrapper {
            width: 90% !important;
            max-width: none !important;
            left: 5% !important;
            right: 5% !important;
            top: 8vh !important;
          }
          .stacked-card-front {
            padding: 1.75rem 1.5rem !important;
            border-radius: 1.75rem 4.5rem 1.75rem 1.75rem !important;
            text-align: left !important;
          }
          .stacked-card-bg-1, .stacked-card-bg-2 {
            border-radius: 1.75rem 4.5rem 1.75rem 1.75rem !important;
          }
          .stacked-card-front h2 {
            font-size: 1.8rem !important;
            margin-bottom: 0.5rem !important;
          }
          .stacked-card-front p {
            font-size: 0.95rem !important;
          }
          .message-column-right .plain-juice-desc {
            width: 90% !important;
            max-width: none !important;
            left: 5% !important;
            right: 5% !important;
            text-align: center !important;
            top: 74vh !important;
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            padding: 0 !important;
            border-radius: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          .plain-juice-desc h2 {
            font-size: 1.8rem !important;
            line-height: 1.0 !important;
            margin-bottom: 0.75rem !important;
          }
          .plain-juice-desc p.highlight {
            font-size: 0.95rem !important;
            margin-bottom: 0.5rem !important;
          }
          .plain-juice-desc p.desc {
            font-size: 0.85rem !important;
            line-height: 1.4 !important;
          }
          .message-column-left, .message-column-right {
            position: static !important;
            height: auto !important;
            display: block !important;
          }
          .juice-title {
            font-size: 1.5rem !important;
          }
          .juice-desc {
            font-size: 0.82rem !important;
            line-height: 1.4 !important;
          }
          .floating-element {
            font-size: 1.6rem !important;
          }
          .juice-demo-bar {
            bottom: 8px !important;
            padding: 4px 8px !important;
            gap: 6px !important;
          }
          .juice-demo-bar a {
            padding: 5px 12px !important;
            font-size: 0.72rem !important;
          }
        }

        @keyframes float-subtle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .logo-juice {
          animation: float-subtle 4s ease-in-out infinite;
        }

        /* Preloader */
        .juice-preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }
      `}} />

      {/* Preloading Screen */}
      {!isPreloaded && (
        <div className="juice-preloader">
          <div className="text-center">
            <div className="logo-juice mb-3">
              <span className="fs-1">🍹</span>
            </div>
            <h3 className="h6 fw-bold text-black font-display mb-1">Preparando Sabores Orgánicos</h3>
            <p className="small text-muted mb-3">Cargando experiencia sensorial 3D...</p>
            <div className="spinner-border text-success spinner-border-sm" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Demo Control Bar */}
      <div className="juice-demo-bar px-4 py-2 d-flex align-items-center gap-3">
        <span className="text-black small fw-bold d-none d-sm-inline">Demo Oasis Natura</span>
        <Link href="/demos" className="btn btn-dark btn-sm fw-bold rounded-pill px-3 py-1.5 d-flex align-items-center gap-1">
          <i className="bi bi-grid-fill"></i> Salir de la Demo
        </Link>
      </div>

      {/* Sticky Main Header Navigation (Removed to meet request) */}

      {/* Giant Hero Scrollable Section (350vh height) */}
      <div ref={containerRef} style={{ height: "350vh", overflow: "visible" }} className="position-relative">

        {/* Sticky Viewport */}
        <div className="sticky-viewport-juice">

          {/* Brand Title (Top Center) */}
          <div className="position-absolute top-0 start-0 w-100 py-4 d-flex justify-content-center pointer-events-none" style={{ zIndex: 10 }}>
            <h1 className="text-black text-uppercase font-display text-center m-0" style={{ fontSize: "1.65rem", fontWeight: 900, letterSpacing: "0.25em", opacity: 0.95 }}>
              Oasis <span style={{ transition: "color 0.4s ease" }} className="brand-accent">Natura</span>
            </h1>
          </div>

          {/* Background Layers */}
          <div ref={bgLimonRef} className="bg-layer-juice bg-limon">
            {isPreloaded && (
              <LiquidBackground
                imageUrl={isMobile ? limonBgImgMobile.src : limonBgImg.src}
                metalness={0.7}
                roughness={0.3}
                displacementScale={5}
              />
            )}
          </div>
          <div ref={bgNaranjaRef} className="bg-layer-juice bg-naranja">
            {isPreloaded && (
              <LiquidBackground
                imageUrl={isMobile ? naranjaBgImgMobile.src : naranjaBgImg.src}
                metalness={0.7}
                roughness={0.3}
                displacementScale={5}
              />
            )}
          </div>
          <div ref={bgUvaRef} className="bg-layer-juice bg-uva">
            {isPreloaded && (
              <LiquidBackground
                imageUrl={isMobile ? uvaBgImgMobile.src : uvaBgImg.src}
                metalness={0.7}
                roughness={0.3}
                displacementScale={5}
              />
            )}
          </div>

          {/* Floating Parallax Decorative Particles */}
          <div className="decorations-container">
            {floatingItems.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => { floatsRef.current[idx] = el; }}
                className="floating-element"
                style={{
                  left: item.left,
                  top: item.top,
                  filter: `blur(${item.blur}px)`,
                  fontSize: `${item.scale * 1.8}rem`,
                  opacity: 0
                }}
              >
                {item.emoji}
              </div>
            ))}
          </div>

          {/* Central Bottles Layout */}
          <div ref={canvasContainerRef} className="bottles-center-container">

            {/* Lemon Juice Bottle */}
            <div ref={bottleLimonRef} className="juice-bottle-wrapper bottle-limon">
              <div className="bottle-inner-floating">
                <div className="bottle-glow" />
                <img
                  src={limonImg.src}
                  alt="Oasis Limón"
                  className="juice-bottle-img"
                />
              </div>
            </div>

            {/* Orange Juice Bottle */}
            <div ref={bottleNaranjaRef} className="juice-bottle-wrapper bottle-naranja">
              <div className="bottle-inner-floating">
                <div className="bottle-glow" />
                <img
                  src={naranjaImg.src}
                  alt="Oasis Naranja"
                  className="juice-bottle-img"
                />
              </div>
            </div>

            {/* Grape Juice Bottle */}
            <div ref={bottleUvaRef} className="juice-bottle-wrapper bottle-uva">
              <div className="bottle-inner-floating">
                <div className="bottle-glow" />
                <img
                  src={uvaImg.src}
                  alt="Oasis Uva"
                  className="juice-bottle-img"
                />
              </div>
            </div>

          </div>

          {/* Scrolling Text Overlays */}
          <div className="message-overlay-container">
            <div className="container-fluid h-100 px-3 px-lg-5">
              <div className="row h-100 align-items-center">

                {/* Left Column (Stacked Cards) */}
                <div className="col-12 col-lg-3 position-relative h-100 d-flex align-items-center justify-content-start message-column-left">
                  {/* Lemon Left Text */}
                  <div ref={textLimonLeftRef} className="stacked-card-wrapper">
                    <div className="stacked-card-bg-1" style={{ backgroundColor: "#4c9c1b" }}></div>
                    <div className="stacked-card-bg-2" style={{ backgroundColor: "#8ade28" }}></div>
                    <div className="stacked-card-front">
                      <span className="juice-label label-limon">Sabor 01</span>
                      <h2 className="juice-title mb-2 text-limon-accent font-display" style={{ fontSize: "2.8rem", fontWeight: 800, lineHeight: 1.05 }}>
                        Oasis<br />Limón
                      </h2>
                      <p className="mb-0 text-slate-800 fw-bold" style={{ fontSize: "1.05rem", color: "#1e293b" }}>La frescura más ácida y natural.</p>
                    </div>
                  </div>

                  {/* Orange Left Text */}
                  <div ref={textNaranjaLeftRef} className="stacked-card-wrapper">
                    <div className="stacked-card-bg-1" style={{ backgroundColor: "#c24f0c" }}></div>
                    <div className="stacked-card-bg-2" style={{ backgroundColor: "#ffa366" }}></div>
                    <div className="stacked-card-front">
                      <span className="juice-label label-naranja">Sabor 02</span>
                      <h2 className="juice-title mb-2 text-naranja-accent font-display" style={{ fontSize: "2.8rem", fontWeight: 800, lineHeight: 1.05 }}>
                        Oasis<br />Naranja
                      </h2>
                      <p className="mb-0 text-slate-800 fw-bold" style={{ fontSize: "1.05rem", color: "#1e293b" }}>Vibrante dulzura cítrica.</p>
                    </div>
                  </div>

                  {/* Grape Left Text */}
                  <div ref={textUvaLeftRef} className="stacked-card-wrapper">
                    <div className="stacked-card-bg-1" style={{ backgroundColor: "#5925a3" }}></div>
                    <div className="stacked-card-bg-2" style={{ backgroundColor: "#b996f5" }}></div>
                    <div className="stacked-card-front">
                      <span className="juice-label label-uva">Sabor 03</span>
                      <h2 className="juice-title mb-2 text-uva-accent font-display" style={{ fontSize: "2.8rem", fontWeight: 800, lineHeight: 1.05 }}>
                        Oasis<br />Uva
                      </h2>
                      <p className="mb-0 text-slate-800 fw-bold" style={{ fontSize: "1.05rem", color: "#1e293b" }}>Dulzura exótica de la selva.</p>
                    </div>
                  </div>
                </div>

                {/* Middle Column (Spacer for bottle) */}
                <div className="col-12 col-lg-6 d-none d-lg-block"></div>

                {/* Right Column (Plain descriptions) */}
                <div className="col-12 col-lg-3 position-relative h-100 d-flex align-items-center justify-content-end message-column-right">
                  {/* Lemon Right Text */}
                  <div ref={textLimonRightRef} className="plain-juice-desc">
                    <h2 className="text-limon-accent mb-3 text-uppercase font-display" style={{ fontSize: "2.8rem", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.02em" }}>
                      EXTRACTO<br />FRESCO
                    </h2>
                    <p className="highlight mb-2 text-dark fw-bold" style={{ fontSize: "1.2rem", lineHeight: 1.35 }}>
                      Prensado en frío con limones reales seleccionados a mano.
                    </p>
                    <p className="desc m-0 text-secondary" style={{ fontSize: "1rem", lineHeight: 1.55 }}>
                      Un estallido revitalizante que limpia tu organismo y despierta tu energía matutina con un toque sutil de menta silvestre.
                    </p>
                  </div>

                  {/* Orange Right Text */}
                  <div ref={textNaranjaRightRef} className="plain-juice-desc">
                    <h2 className="text-naranja-accent mb-3 text-uppercase font-display" style={{ fontSize: "2.8rem", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.02em" }}>
                      ENERGÍA<br />PURA
                    </h2>
                    <p className="highlight mb-2 text-dark fw-bold" style={{ fontSize: "1.2rem", lineHeight: 1.35 }}>
                      Elaborado con las naranjas más dulces y jugosas de la temporada.
                    </p>
                    <p className="desc m-0 text-secondary" style={{ fontSize: "1rem", lineHeight: 1.55 }}>
                      Maduradas bajo el sol y llenas de fibra soluble para nutrir tu cuerpo con hidratación natural y vitaminas al instante.
                    </p>
                  </div>

                  {/* Grape Right Text */}
                  <div ref={textUvaRightRef} className="plain-juice-desc grape-desc-theme">
                    <h2 className="text-uva-accent mb-3 text-uppercase font-display" style={{ fontSize: "2.8rem", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.02em" }}>
                      SÚPER<br />ANTIOXIDANTE
                    </h2>
                    <p className="highlight mb-2 text-dark fw-bold" style={{ fontSize: "1.2rem", lineHeight: 1.35 }}>
                      Un néctar puro de uvas tintas silvestres seleccionadas.
                    </p>
                    <p className="desc m-0 text-secondary" style={{ fontSize: "1rem", lineHeight: 1.55 }}>
                      Rápida absorción de polifenoles activos que cuidan tu salud cardiovascular y deleitan tu paladar con notas silvestres profundas.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Specs Grid & Booking Section */}
      <section className="position-relative overflow-hidden py-5 px-2 px-md-4" id="comprar" style={{ zIndex: 10, minHeight: "100vh" }}>

        {/* Atmospheric Background */}
        <div className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none" style={{ zIndex: 0 }}>
          <img
            alt="Atmospheric background image"
            className="w-100 h-100"
            style={{ objectFit: "cover", opacity: 0.7 }}
            src="https://lh3.googleusercontent.com/aida/ADBb0ui-W34_45ae33Iz02Hw0agNvzx8-CtekX3bu_hDatPnMd8O5hmHIdgwYQZMI-I1Bz8E3jLAmtO6ziUgNQhz5OK00UFp9HG8bmh2bH9pfEqXnkTjWoGc4fX8_Xck4BcYpmTEVkXgt_CR9or7LRPONZXaaP1T6o5pgyBv1ptdj_lekMGA_dux4ligj5bNq5P18BLzMFj4rb4LHcd6mQ7OLOHKLWSpmK3MrsijlUH0QElD6woi-LkRVOMSpx7y"
          />
          <div
            className="position-absolute w-100 h-100"
            style={{
              top: 0, left: 0,
              background: "linear-gradient(to bottom, rgba(250, 249, 244, 0.4) 0%, transparent 50%, rgba(250, 249, 244, 0.8) 100%)"
            }}
          />
        </div>

        <div className="container-xl position-relative py-5" style={{ zIndex: 10 }}>
          <div className="row g-4 g-lg-5 align-items-start">

            {/* Left Column: Quality Section (7 cols) */}
            <div className="col-12 col-lg-7 d-flex flex-column justify-content-center">
              <header className="mb-5">
                <p className="font-label-caps text-on-surface-variant text-uppercase mb-2" style={{ color: "#434843" }}>
                  EL SECRETO DE NUESTRA CALIDAD
                </p>
                <h2 className="fw-bold mb-0 text-black" style={{ fontFamily: "'Outfit', var(--font-sans)", fontSize: "2.5rem", color: "#1b1c19", fontWeight: 800 }}>
                  Bebidas vivas y nutritivas.
                </h2>
              </header>

              <div className="row g-4">
                {/* Feature 1 */}
                <div className="col-12 col-md-6">
                  <div className="glass-panel p-4 rounded-4 hover-translate-up h-100" style={{ borderRadius: "16px" }}>
                    <div className="rounded-circle flex items-center justify-center mb-4 text-on-primary-container d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px", backgroundColor: "#efeee9", border: "1px solid rgba(195, 200, 193, 0.3)" }}>
                      <span className="material-symbols-outlined fs-4" style={{ fontVariationSettings: "'wght' 300", color: "#1b3022" }}>ac_unit</span>
                    </div>
                    <h3 className="font-body-lg fw-bold text-black mb-3" style={{ fontFamily: "'Outfit', var(--font-sans)", fontSize: "18px", color: "#1b1c19", fontWeight: 700 }}>Cold Pressed (Prensado en frío)</h3>
                    <p className="font-body-md text-on-surface-variant mb-0" style={{ fontSize: "16px", color: "#434843" }}>Evitamos la fricción y el calor de las licuadoras tradicionales para preservar el 100% de las enzimas vivas, vitaminas y minerales de las frutas.</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="col-12 col-md-6">
                  <div className="glass-panel p-4 rounded-4 hover-translate-up h-100" style={{ borderRadius: "16px" }}>
                    <div className="rounded-circle flex items-center justify-center mb-4 text-on-primary-container d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px", backgroundColor: "#efeee9", border: "1px solid rgba(195, 200, 193, 0.3)" }}>
                      <span className="material-symbols-outlined fs-4" style={{ fontVariationSettings: "'wght' 300", color: "#1b3022" }}>agriculture</span>
                    </div>
                    <h3 className="font-body-lg fw-bold text-black mb-3" style={{ fontFamily: "'Outfit', var(--font-sans)", fontSize: "18px", color: "#1b1c19", fontWeight: 700 }}>Agricultura Local</h3>
                    <p className="font-body-md text-on-surface-variant mb-0" style={{ fontSize: "16px", color: "#434843" }}>Apoyamos a agricultores locales que practican la agricultura regenerativa libre de pesticidas químicos. Directo del campo a tu botella.</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="col-12 col-md-6">
                  <div className="glass-panel p-4 rounded-4 hover-translate-up h-100" style={{ borderRadius: "16px" }}>
                    <div className="rounded-circle flex items-center justify-center mb-4 text-on-primary-container d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px", backgroundColor: "#efeee9", border: "1px solid rgba(195, 200, 193, 0.3)" }}>
                      <span className="material-symbols-outlined fs-4" style={{ fontVariationSettings: "'wght' 300", color: "#1b3022" }}>health_and_safety</span>
                    </div>
                    <h3 className="font-body-lg fw-bold text-black mb-3" style={{ fontFamily: "'Outfit', var(--font-sans)", fontSize: "18px", color: "#1b1c19", fontWeight: 700 }}>Sin Pasteurizar / HPP</h3>
                    <p className="font-body-md text-on-surface-variant mb-0" style={{ fontSize: "16px", color: "#434843" }}>Utilizamos procesamiento por alta presión (HPP) para garantizar la seguridad alimentaria sin someter el jugo a calor, manteniendo el sabor original fresco.</p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="col-12 col-md-6">
                  <div className="glass-panel p-4 rounded-4 hover-translate-up h-100" style={{ borderRadius: "16px" }}>
                    <div className="rounded-circle flex items-center justify-center mb-4 text-on-primary-container d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px", backgroundColor: "#efeee9", border: "1px solid rgba(195, 200, 193, 0.3)" }}>
                      <span className="material-symbols-outlined fs-4" style={{ fontVariationSettings: "'wght' 300", color: "#1b3022" }}>recycling</span>
                    </div>
                    <h3 className="font-body-lg fw-bold text-black mb-3" style={{ fontFamily: "'Outfit', var(--font-sans)", fontSize: "18px", color: "#1b1c19", fontWeight: 700 }}>Empaques Biodegradables</h3>
                    <p className="font-body-md text-on-surface-variant mb-0" style={{ fontSize: "16px", color: "#434843" }}>Nuestras botellas están hechas de PET 100% reciclado y son completamente compostables. Cuidamos de tu salud y también de nuestro planeta.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Reservation Form (5 cols) */}
            <div className="col-12 col-lg-5 position-relative mt-5 mt-lg-0">
              <div className="glass-panel rounded-4 p-4 p-md-5 organic-shadow position-sticky" style={{ top: "120px", borderRadius: "24px" }}>

                {/* Price Badge */}
                <div className="position-absolute font-label-caps px-4 py-2 rounded-pill shadow-sm" style={{
                  top: "-16px",
                  right: "32px",
                  backgroundColor: "#d4e9c4",
                  color: "#101f09",
                  border: "1px solid rgba(184, 205, 170, 0.5)",
                  fontSize: "12px",
                  fontWeight: 600,
                  zIndex: 15
                }}>
                  {planPrices.price} / {subscriptionPlan === 'semanal' ? 'semana' : subscriptionPlan === 'quincenal' ? 'quincena' : 'mes'}
                </div>

                <div className="mb-4">
                  <p className="font-label-caps text-uppercase mb-2" style={{ color: "#819986" }}>DEGUSTACIÓN PREMIUM</p>
                  <h3 className="fw-bold text-black mb-3" style={{ fontFamily: "'Outfit', var(--font-sans)", fontSize: "1.75rem", color: "#1b1c19", fontWeight: 700 }}>Reserva tu Experiencia</h3>
                  <p className="font-body-md text-on-surface-variant mb-0" style={{ fontSize: "14px", color: "#434843" }}>Garantiza tu suscripción especial con entrega semanal refrigerada directamente desde nuestros huertos locales.</p>
                </div>

                {formSubmitted ? (
                  <div className="p-4 rounded-4 d-flex flex-column align-items-center text-center gap-3" style={{ backgroundColor: "rgba(34, 197, 94, 0.05)", border: "1px solid rgba(34, 197, 94, 0.15)" }}>
                    <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center shadow-sm" style={{ width: "56px", height: "56px", fontSize: "1.5rem" }}>
                      ✓
                    </div>
                    <div>
                      <h5 className="fw-bold text-success mb-1 font-headline-md" style={{ fontSize: "1.25rem" }}>¡Suscripción Reservada!</h5>
                      <p className="small text-secondary mb-0">Hemos registrado tu solicitud de preventa especial con éxito.</p>
                    </div>

                    <div className="w-100 bg-white p-3 rounded-3 text-start border d-flex flex-column gap-2" style={{ fontSize: "0.82rem" }}>
                      <div className="d-flex justify-content-between"><span className="text-muted">Pedido ID:</span><span className="fw-bold text-black font-monospace">#ON-2026-{Math.floor(1000 + Math.random() * 9000)}</span></div>
                      <div className="d-flex justify-content-between"><span className="text-muted">Frecuencia:</span><span className="fw-bold text-black text-capitalize">{subscriptionPlan}</span></div>
                      <div className="d-flex justify-content-between"><span className="text-muted">Sabor Inicial:</span><span className="fw-bold text-black">{flavorDetails.name}</span></div>
                      <div className="d-flex justify-content-between"><span className="text-muted">Precio:</span><span className="fw-bold text-black">{planPrices.price} / mes</span></div>
                      <hr className="my-1" />
                      <div className="d-flex align-items-center gap-2 text-success font-semibold" style={{ fontSize: "0.78rem" }}>
                        <span>🚚 Est. primer envío:</span>
                        <span>Próximo Martes (Refrigerado)</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="btn btn-sm btn-outline-secondary rounded-pill px-4 mt-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Modificar Reserva
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="d-flex flex-column gap-4">

                    {/* Flavour Selection */}
                    <fieldset className="border-0 p-0 m-0">
                      <legend className="font-body-md text-black fw-semibold mb-3" style={{ fontFamily: "'Outfit', var(--font-sans)", color: "#1b1c19", fontWeight: 600 }}>1. Selecciona tu sabor inicial</legend>
                      <div className="row g-2">
                        {[
                          { id: "limon", emoji: "🍋", label: "Limón", desc: "Eureka+Menta" },
                          { id: "naranja", emoji: "🍊", label: "Naranja", desc: "Valencia+Mand." },
                          { id: "uva", emoji: "🍇", label: "Uva", desc: "Isabela+Aránd." }
                        ].map((item) => {
                          const isChecked = selectedFlavor === item.id;
                          return (
                            <div key={item.id} className="col-4">
                              <div
                                onClick={() => setSelectedFlavor(item.id)}
                                className="p-3 text-center border rounded-3 cursor-pointer d-flex flex-column align-items-center justify-content-center h-100"
                                style={{
                                  backgroundColor: isChecked ? "rgba(212, 233, 196, 0.3)" : "#faf9f4",
                                  borderColor: isChecked ? "#1b3022" : "rgba(195, 200, 193, 0.4)",
                                  borderWidth: isChecked ? "2px" : "1px",
                                  transition: "all 0.3s ease",
                                  borderRadius: "12px"
                                }}
                              >
                                <span className="fs-3 mb-2">{item.emoji}</span>
                                <span className="font-body-md fw-bold d-block text-black" style={{ fontSize: "14px", color: "#1b1c19" }}>{item.label}</span>
                                <span className="font-body-md text-on-surface-variant d-block leading-tight" style={{ fontSize: "11px", color: "#434843" }}>{item.desc}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </fieldset>

                    {/* Frequency Selection */}
                    <fieldset className="border-0 p-0 m-0">
                      <legend className="font-body-md text-black fw-semibold mb-3" style={{ fontFamily: "'Outfit', var(--font-sans)", color: "#1b1c19", fontWeight: 600 }}>2. Frecuencia de entrega</legend>
                      <div className="row g-2">
                        {[
                          { id: "semanal", label: "Semanal", price: "$39.99/mes" },
                          { id: "quincenal", label: "Quincenal", price: "$29.99/mes" },
                          { id: "mensual", label: "Mensual", price: "$19.99/mes" }
                        ].map((item) => {
                          const isChecked = subscriptionPlan === item.id;
                          return (
                            <div key={item.id} className="col-4">
                              <div
                                onClick={() => setSubscriptionPlan(item.id)}
                                className="p-3 text-center border rounded-3 cursor-pointer d-flex flex-column align-items-center justify-content-center h-100"
                                style={{
                                  backgroundColor: isChecked ? "rgba(212, 233, 196, 0.3)" : "#faf9f4",
                                  borderColor: isChecked ? "#1b3022" : "rgba(195, 200, 193, 0.4)",
                                  borderWidth: isChecked ? "2px" : "1px",
                                  transition: "all 0.3s ease",
                                  borderRadius: "12px"
                                }}
                              >
                                <span className="font-body-md fw-bold d-block text-black" style={{ fontSize: "13px", color: "#1b1c19" }}>{item.label}</span>
                                <span className="font-body-md text-on-surface-variant d-block" style={{ fontSize: "11px", color: "#434843" }}>{item.price}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Included Benefits Box */}
                      <div className="mt-4 p-4 rounded-3 border" style={{ backgroundColor: "#f5f4ef", borderColor: "rgba(195, 200, 193, 0.2)" }}>
                        <div className="d-flex align-items-center gap-2 mb-2" style={{ color: "#819986" }}>
                          <span className="material-symbols-outlined text-[18px]">bolt</span>
                          <span className="font-body-md fw-semibold" style={{ fontSize: "14px" }}>Incluido en tu Plan:</span>
                        </div>
                        <ul className="list-unstyled space-y-2 font-body-md m-0 d-flex flex-column gap-2 text-on-surface-variant" style={{ fontSize: "14px", color: "#434843" }}>
                          <li className="d-flex align-items-start gap-2">
                            <span className="material-symbols-outlined fs-6 text-success" style={{ fontWeight: "bold" }}>check</span>
                            <span>{planPrices.desc}</span>
                          </li>
                          <li className="d-flex align-items-start gap-2">
                            <span className="material-symbols-outlined fs-6 text-success" style={{ fontWeight: "bold" }}>check</span>
                            <span>Envío express refrigerado sin costo adicional</span>
                          </li>
                          <li className="d-flex align-items-start gap-2">
                            <span className="material-symbols-outlined fs-6 text-success" style={{ fontWeight: "bold" }}>check</span>
                            <span>Regalo: Botella térmica de acero inoxidable Oasis</span>
                          </li>
                        </ul>
                      </div>
                    </fieldset>

                    {/* User Info */}
                    <div className="d-flex flex-column gap-3">
                      <div>
                        <label className="font-body-md fw-semibold text-black mb-2 d-block" htmlFor="fullName" style={{ fontFamily: "'Outfit', var(--font-sans)", color: "#1b1c19", fontWeight: 600 }}>3. Nombre Completo</label>
                        <div className="position-relative">
                          <div className="position-absolute start-0 top-50 translate-middle-y ps-3 text-secondary pointer-events-none d-flex align-items-center" style={{ color: "#434843" }}>
                            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>person</span>
                          </div>
                          <input
                            type="text"
                            id="fullName"
                            placeholder="Ej. Alejandra Gómez"
                            className="w-100 py-3 bg-white font-body-md text-black"
                            required
                            style={{
                              paddingLeft: "44px",
                              paddingRight: "16px",
                              border: "1px solid rgba(195, 200, 193, 0.5)",
                              borderRadius: "12px",
                              fontSize: "16px",
                              outline: "none",
                              backgroundColor: "#faf9f4",
                              color: "#1b1c19",
                              transition: "box-shadow 0.2s ease"
                            }}
                            onFocus={(e) => {
                              e.target.style.boxShadow = "0 0 0 1px #1b3022";
                              e.target.style.borderColor = "#1b3022";
                            }}
                            onBlur={(e) => {
                              e.target.style.boxShadow = "none";
                              e.target.style.borderColor = "rgba(195, 200, 193, 0.5)";
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-body-md fw-semibold text-black mb-2 d-block" htmlFor="email" style={{ fontFamily: "'Outfit', var(--font-sans)", color: "#1b1c19", fontWeight: 600 }}>4. Correo Electrónico</label>
                        <div className="position-relative">
                          <div className="position-absolute start-0 top-50 translate-middle-y ps-3 text-secondary pointer-events-none d-flex align-items-center" style={{ color: "#434843" }}>
                            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>mail</span>
                          </div>
                          <input
                            type="email"
                            id="email"
                            placeholder="ejemplo@correo.com"
                            className="w-100 py-3 bg-white font-body-md text-black"
                            required
                            style={{
                              paddingLeft: "44px",
                              paddingRight: "16px",
                              border: "1px solid rgba(195, 200, 193, 0.5)",
                              borderRadius: "12px",
                              fontSize: "16px",
                              outline: "none",
                              backgroundColor: "#faf9f4",
                              color: "#1b1c19",
                              transition: "box-shadow 0.2s ease"
                            }}
                            onFocus={(e) => {
                              e.target.style.boxShadow = "0 0 0 1px #1b3022";
                              e.target.style.borderColor = "#1b3022";
                            }}
                            onBlur={(e) => {
                              e.target.style.boxShadow = "none";
                              e.target.style.borderColor = "rgba(195, 200, 193, 0.5)";
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-100 text-white py-3 font-body-md fw-medium shadow-md border-0 d-flex align-items-center justify-content-center gap-2"
                      style={{
                        backgroundColor: "#1b3022",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        borderRadius: "12px"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#1f3017";
                        const arrow = e.currentTarget.querySelector('.arrow-icon') as HTMLElement;
                        if (arrow) arrow.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#1b3022";
                        const arrow = e.currentTarget.querySelector('.arrow-icon') as HTMLElement;
                        if (arrow) arrow.style.transform = "translateX(0px)";
                      }}
                    >
                      Completar Pre-Reserva
                      <span className="material-symbols-outlined arrow-icon" style={{ fontSize: "20px", transition: "transform 0.3s ease" }}>arrow_forward</span>
                    </button>

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
