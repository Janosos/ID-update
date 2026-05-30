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

  useEffect(() => {
    let appInstance: any;
    
    // Store original functions to restore on unmount
    const originalWindowAdd = window.addEventListener;
    const originalDocAdd = document.addEventListener;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const originalCanvasAdd = canvas.addEventListener;

    // Helper to make touch events passive, preventing scroll blocking
    const makePassive = (type: string, listener: any, options: any) => {
      if (type && typeof type === "string" && type.startsWith("touch")) {
        let passiveOptions = typeof options === "object" ? { ...options, passive: true } : { passive: true };
        if (typeof options === "boolean") passiveOptions.capture = options;
        return passiveOptions;
      }
      return options;
    };

    // Override addEventListener
    window.addEventListener = function(type: string, listener: any, options?: any) {
      return originalWindowAdd.call(window, type, listener, makePassive(type, listener, options));
    };
    document.addEventListener = function(type: string, listener: any, options?: any) {
      return originalDocAdd.call(document, type, listener, makePassive(type, listener, options));
    };
    canvas.addEventListener = function(type: string, listener: any, options?: any) {
      return originalCanvasAdd.call(canvas, type, listener, makePassive(type, listener, options));
    };

    const loadEffect = async () => {
      try {
        // Import dynamic library using eval to bypass static bundler checking for remote CDN URLs
        // @ts-ignore
        const module = await eval("import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.27/build/backgrounds/liquid1.min.js')");
        const LiquidEffect = module.default || module;

        appInstance = LiquidEffect(canvas);
        appInstance.loadImage(imageUrl);
        
        if (appInstance.liquidPlane) {
          appInstance.liquidPlane.material.metalness = metalness;
          appInstance.liquidPlane.material.roughness = roughness;
          if (appInstance.liquidPlane.uniforms?.displacementScale) {
            appInstance.liquidPlane.uniforms.displacementScale.value = displacementScale;
          }
        }
        
        appInstance.setRain(false);
      } catch (error) {
        console.error("Error loading liquid background effect:", error);
      }
    };

    loadEffect();

    return () => {
      // Restore original functions
      window.addEventListener = originalWindowAdd;
      document.addEventListener = originalDocAdd;
      canvas.addEventListener = originalCanvasAdd;

      if (appInstance && typeof appInstance.destroy === 'function') {
        try {
          appInstance.destroy();
        } catch (e) {
          console.error("Error destroying liquid background instance:", e);
        }
      }
    };
  }, [imageUrl, metalness, roughness, displacementScale]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`d-block w-100 h-100 ${className}`}
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

  // Performant scroll loop (LERP + direct DOM modifications)
  useEffect(() => {
    if (!isPreloaded) return;

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
    };

    let active = true;
    const renderLoop = () => {
      if (!active) return;

      const info = scrollInfoRef.current;
      const diff = info.targetProgress - info.currentProgress;
      
      if (Math.abs(diff) > 0.0001) {
        info.currentProgress += diff * 0.15; // Smooth LERP matching Aeropods
      } else {
        info.currentProgress = info.targetProgress;
      }

      const p = info.currentProgress;
      const isMobile = isMobileRef.current;

      // 1. Backgrounds crossfade opacities
      const oLimonBg = getProgressOpacity(p, 0.0, 0.23, 0.12);
      const oNaranjaBg = getProgressOpacity(p, 0.35, 0.58, 0.12);
      const oUvaBg = getProgressOpacity(p, 0.70, 1.0, 0.12);

      const cache = lastStatesRef.current;

      if (Math.abs(cache.bgLimonOpacity - oLimonBg) > 0.001) {
        cache.bgLimonOpacity = oLimonBg;
        if (bgLimonRef.current) bgLimonRef.current.style.opacity = oLimonBg.toFixed(3);
      }
      if (Math.abs(cache.bgNaranjaOpacity - oNaranjaBg) > 0.001) {
        cache.bgNaranjaOpacity = oNaranjaBg;
        if (bgNaranjaRef.current) bgNaranjaRef.current.style.opacity = oNaranjaBg.toFixed(3);
      }
      if (Math.abs(cache.bgUvaOpacity - oUvaBg) > 0.001) {
        cache.bgUvaOpacity = oUvaBg;
        if (bgUvaRef.current) bgUvaRef.current.style.opacity = oUvaBg.toFixed(3);
      }

      // 2. Bottle animations (scale, translation, rotation)
      // Lemon bottle (transitions out between 0.23 and 0.35)
      let limScale = 1;
      let limRot = 0;
      let limTransX = 0;
      let limTransY = 0;
      let limOpacity = 1;

      if (p > 0.23) {
        const t = Math.min(1, (p - 0.23) / 0.12);
        limOpacity = 1 - t;
        limScale = 1 - t * 0.35;
        limRot = -t * 60; // Gira hacia la izquierda
        limTransX = -t * 400; // Se va a la izquierda
        limTransY = t * 60;
      }

      // Orange bottle (transitions in between 0.23 and 0.35, transitions out between 0.58 and 0.70)
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

      // Grape bottle (transitions in between 0.58 and 0.70)
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

      // Apply style values to bottle containers using GPU layers
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
      // Lemon Texts
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

      // Orange Texts
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

      // Grape Texts
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
        targetColor = "#5c8b05"; // Lemon Green
      } else if (p >= 0.29 && p < 0.64) {
        targetColor = "#d95d14"; // Orange
      } else {
        targetColor = "#692fb8"; // Grape Purple
      }

      if (cache.brandAccentColor !== targetColor) {
        cache.brandAccentColor = targetColor;
        const brandAccentEl = document.querySelector(".brand-accent") as HTMLElement;
        if (brandAccentEl) {
          brandAccentEl.style.color = targetColor;
        }
      }

      info.animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    handleScroll();
    renderLoop();

    return () => {
      active = false;
      cancelAnimationFrame(scrollInfoRef.current.animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
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
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        /* Overrides to ensure CSS position: sticky works perfectly */
        html, body, #id-global-wrapper, main {
          overflow: visible !important;
          overflow-x: visible !important;
          height: auto !important;
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
          transition: opacity 0.05s linear;
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
          <div 
            ref={bgLimonRef} 
            className="bg-layer-juice bg-limon"
            style={isMobile ? { backgroundImage: `url(${limonBgImgMobile.src})` } : undefined}
          >
            {isPreloaded && !isMobile && (
              <LiquidBackground 
                imageUrl={limonBgImg.src} 
                metalness={0.7}
                roughness={0.3}
                displacementScale={5}
              />
            )}
          </div>
          <div 
            ref={bgNaranjaRef} 
            className="bg-layer-juice bg-naranja"
            style={isMobile ? { backgroundImage: `url(${naranjaBgImgMobile.src})` } : undefined}
          >
            {isPreloaded && !isMobile && (
              <LiquidBackground 
                imageUrl={naranjaBgImg.src} 
                metalness={0.7}
                roughness={0.3}
                displacementScale={5}
              />
            )}
          </div>
          <div 
            ref={bgUvaRef} 
            className="bg-layer-juice bg-uva"
            style={isMobile ? { backgroundImage: `url(${uvaBgImgMobile.src})` } : undefined}
          >
            {isPreloaded && !isMobile && (
              <LiquidBackground 
                imageUrl={uvaBgImg.src} 
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
                  <div ref={textUvaRightRef} className="plain-juice-desc">
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
      <section className="py-5 bg-white border-top border-bottom position-relative" id="comprar" style={{ zIndex: 10 }}>
        <div className="container-xl px-4 py-5">
          <div className="row g-5 align-items-center">
            
            {/* Left Column: Benefits Specs */}
            <div className="col-12 col-lg-6">
              <span className="text-success fw-bold uppercase tracking-wider small d-block mb-2 text-uppercase">El Secreto de Nuestra Calidad</span>
              <h2 className="display-5 fw-extrabold text-black mb-4 font-display">Bebidas vivas y nutritivas.</h2>
              
              <div className="row g-4 mt-2">
                <div className="col-12 col-sm-6">
                  <div className="p-4 h-100 specs-card-juice">
                    <span className="fs-3 mb-2 d-block">❄️</span>
                    <h4 className="h6 fw-bold text-black mb-2">Cold Pressed (Prensado en frío)</h4>
                    <p className="small text-secondary mb-0">Evitamos la fricción y el calor de las licuadoras tradicionales para preservar el 100% de las enzimas vivas, vitaminas y minerales de las frutas.</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-4 h-100 specs-card-juice">
                    <span className="fs-3 mb-2 d-block">🚜</span>
                    <h4 className="h6 fw-bold text-black mb-2">Agricultura Local</h4>
                    <p className="small text-secondary mb-0">Apoyamos a agricultores locales que practican la agricultura regenerativa libre de pesticidas químicos. Directo del campo a tu botella.</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-4 h-100 specs-card-juice">
                    <span className="fs-3 mb-2 d-block">🛡️</span>
                    <h4 className="h6 fw-bold text-black mb-2">Sin Pasteurizar / HPP</h4>
                    <p className="small text-secondary mb-0">Utilizamos procesamiento por alta presión (HPP) para garantizar la seguridad alimentaria sin someter el jugo a calor, manteniendo el sabor original fresco.</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-4 h-100 specs-card-juice">
                    <span className="fs-3 mb-2 d-block">♻️</span>
                    <h4 className="h6 fw-bold text-black mb-2">Empaques Biodegradables</h4>
                    <p className="small text-secondary mb-0">Nuestras botellas están hechas de PET 100% reciclado y son completamente compostables. Cuidamos de tu salud y también de nuestro planeta.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Pre-order Simulator form */}
            <div className="col-12 col-lg-5 offset-lg-1">
              <div className="p-4 p-md-5 position-relative specs-card-juice" style={{ 
                backgroundColor: "#ffffff", 
                border: `1px solid ${themeColors.border}`, 
                borderRadius: "2.25rem",
                boxShadow: `0 30px 60px ${themeColors.shadow}, 0 4px 15px rgba(0,0,0,0.01)`,
                transition: "all 0.4s ease"
              }}>
                {/* Price Badge */}
                <div className="position-absolute top-0 end-0 translate-middle-y me-4 me-md-5 px-3 py-1.5 rounded-pill text-white fw-bold shadow-sm" style={{
                  fontSize: "0.85rem",
                  background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.dark})`,
                  transition: "all 0.4s ease",
                  zIndex: 15
                }}>
                  {planPrices.price} / {subscriptionPlan === 'semanal' ? 'semana' : subscriptionPlan === 'quincenal' ? 'quincena' : 'mes'}
                </div>

                <span className="fw-bold uppercase tracking-wider small d-block mb-1 text-uppercase" style={{ color: themeColors.dark, transition: "color 0.4s ease" }}>Degustación Premium</span>
                <h3 className="h4 fw-extrabold text-black mb-2 font-display">Reserva tu Experiencia</h3>
                <p className="small text-secondary mb-4">Garantiza tu suscripción especial con entrega semanal refrigerada directamente desde nuestros huertos locales.</p>
                
                {formSubmitted ? (
                  <div className="p-4 rounded-3 d-flex flex-column align-items-center text-center gap-3" style={{ backgroundColor: "rgba(34, 197, 94, 0.05)", border: "1px solid rgba(34, 197, 94, 0.15)" }}>
                    <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center shadow-sm" style={{ width: "56px", height: "56px", fontSize: "1.5rem" }}>
                      ✓
                    </div>
                    <div>
                      <h5 className="fw-extrabold text-success mb-1">¡Suscripción Reservada!</h5>
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
                  <form onSubmit={handleBookingSubmit} className="d-flex flex-column gap-3">
                    
                    {/* Flavor Selection Cards */}
                    <div className="mb-1">
                      <label className="form-label small fw-bold text-black mb-2">1. Selecciona tu sabor inicial</label>
                      <div className="row g-2">
                        
                        <div className="col-4">
                          <div 
                            className={`text-center p-2.5 h-100 d-flex flex-column align-items-center justify-content-center gap-1.5`}
                            style={{ 
                              background: "#ffffff", 
                              border: selectedFlavor === 'limon' ? `2px solid #8ade28` : '1px solid #eef2e7',
                              boxShadow: selectedFlavor === 'limon' ? '0 8px 15px rgba(138, 222, 40, 0.15)' : 'none',
                              borderRadius: "1.25rem",
                              cursor: "pointer",
                              transition: "all 0.3s ease"
                            }}
                            onClick={() => setSelectedFlavor("limon")}
                          >
                            <span className="fs-3">🍋</span>
                            <span className="fw-bold d-block" style={{ fontSize: "0.78rem", color: selectedFlavor === 'limon' ? '#3e6302' : '#6c757d' }}>Limón</span>
                            <span className="text-muted d-block" style={{ fontSize: "0.58rem" }}>Eureka+Menta</span>
                          </div>
                        </div>

                        <div className="col-4">
                          <div 
                            className={`text-center p-2.5 h-100 d-flex flex-column align-items-center justify-content-center gap-1.5`}
                            style={{ 
                              background: "#ffffff", 
                              border: selectedFlavor === 'naranja' ? '2px solid #ff7c33' : '1px solid #eef2e7',
                              boxShadow: selectedFlavor === 'naranja' ? '0 8px 15px rgba(255, 124, 51, 0.15)' : 'none',
                              borderRadius: "1.25rem",
                              cursor: "pointer",
                              transition: "all 0.3s ease"
                            }}
                            onClick={() => setSelectedFlavor("naranja")}
                          >
                            <span className="fs-3">🍊</span>
                            <span className="fw-bold d-block" style={{ fontSize: "0.78rem", color: selectedFlavor === 'naranja' ? '#a84203' : '#6c757d' }}>Naranja</span>
                            <span className="text-muted d-block" style={{ fontSize: "0.58rem" }}>Valencia+Mand.</span>
                          </div>
                        </div>

                        <div className="col-4">
                          <div 
                            className={`text-center p-2.5 h-100 d-flex flex-column align-items-center justify-content-center gap-1.5`}
                            style={{ 
                              background: "#ffffff", 
                              border: selectedFlavor === 'uva' ? '2px solid #a275e3' : '1px solid #eef2e7',
                              boxShadow: selectedFlavor === 'uva' ? '0 8px 15px rgba(162, 117, 227, 0.15)' : 'none',
                              borderRadius: "1.25rem",
                              cursor: "pointer",
                              transition: "all 0.3s ease"
                            }}
                            onClick={() => setSelectedFlavor("uva")}
                          >
                            <span className="fs-3">🍇</span>
                            <span className="fw-bold d-block" style={{ fontSize: "0.78rem", color: selectedFlavor === 'uva' ? '#4e199c' : '#6c757d' }}>Uva</span>
                            <span className="text-muted d-block" style={{ fontSize: "0.58rem" }}>Isabela+Aránd.</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Subscription Plan Cards */}
                    <div className="mb-1">
                      <label className="form-label small fw-bold text-black mb-2">2. Frecuencia de entrega</label>
                      <div className="row g-2">
                        
                        <div className="col-4">
                          <button
                            type="button"
                            onClick={() => setSubscriptionPlan("semanal")}
                            className="btn w-100 p-2.5 d-flex flex-column align-items-center justify-content-center border"
                            style={{
                              border: subscriptionPlan === 'semanal' ? `2px solid ${themeColors.dark}` : '1px solid #eef2e7',
                              background: subscriptionPlan === 'semanal' ? themeColors.bgLight : '#ffffff',
                              borderRadius: "0.95rem",
                              transition: "all 0.25s ease"
                            }}
                          >
                            <span className="fw-bold" style={{ fontSize: "0.8rem", color: subscriptionPlan === 'semanal' ? themeColors.text : '#4a5568' }}>Semanal</span>
                            <span className="text-muted" style={{ fontSize: "0.62rem" }}>$39.99/mes</span>
                          </button>
                        </div>

                        <div className="col-4">
                          <button
                            type="button"
                            onClick={() => setSubscriptionPlan("quincenal")}
                            className="btn w-100 p-2.5 d-flex flex-column align-items-center justify-content-center border"
                            style={{
                              border: subscriptionPlan === 'quincenal' ? `2px solid ${themeColors.dark}` : '1px solid #eef2e7',
                              background: subscriptionPlan === 'quincenal' ? themeColors.bgLight : '#ffffff',
                              borderRadius: "0.95rem",
                              transition: "all 0.25s ease"
                            }}
                          >
                            <span className="fw-bold" style={{ fontSize: "0.8rem", color: subscriptionPlan === 'quincenal' ? themeColors.text : '#4a5568' }}>Quincenal</span>
                            <span className="text-muted" style={{ fontSize: "0.62rem" }}>$29.99/mes</span>
                          </button>
                        </div>

                        <div className="col-4">
                          <button
                            type="button"
                            onClick={() => setSubscriptionPlan("mensual")}
                            className="btn w-100 p-2.5 d-flex flex-column align-items-center justify-content-center border"
                            style={{
                              border: subscriptionPlan === 'mensual' ? `2px solid ${themeColors.dark}` : '1px solid #eef2e7',
                              background: subscriptionPlan === 'mensual' ? themeColors.bgLight : '#ffffff',
                              borderRadius: "0.95rem",
                              transition: "all 0.25s ease"
                            }}
                          >
                            <span className="fw-bold" style={{ fontSize: "0.8rem", color: subscriptionPlan === 'mensual' ? themeColors.text : '#4a5568' }}>Mensual</span>
                            <span className="text-muted" style={{ fontSize: "0.62rem" }}>$19.99/mes</span>
                          </button>
                        </div>

                      </div>
                    </div>

                    {/* Included Plan Info */}
                    <div className="bg-light p-3 rounded-3 mb-1" style={{ border: "1px solid #f1f5f9" }}>
                      <div className="d-flex align-items-center gap-2 mb-1.5">
                        <span style={{ color: themeColors.dark, fontSize: "0.82rem", transition: "color 0.4s ease" }} className="fw-bold">⚡ Incluido en tu Plan:</span>
                      </div>
                      <ul className="list-unstyled m-0 d-flex flex-column gap-1" style={{ fontSize: "0.78rem" }}>
                        <li className="d-flex align-items-center gap-2 text-secondary">
                          <span className="text-success fw-bold">✓</span> {planPrices.desc}
                        </li>
                        <li className="d-flex align-items-center gap-2 text-secondary">
                          <span className="text-success fw-bold">✓</span> Envío express refrigerado sin costo adicional
                        </li>
                        <li className="d-flex align-items-center gap-2 text-secondary">
                          <span className="text-success fw-bold">✓</span> Regalo: Botella térmica de acero inoxidable Oasis
                        </li>
                      </ul>
                    </div>

                    {/* Personal Information */}
                    <div>
                      <label className="form-label small fw-bold text-black" htmlFor="juice-client-name">3. Nombre Completo</label>
                      <div className="input-group">
                        <span 
                          className="input-group-text bg-white text-muted" 
                          style={{ 
                            borderTopLeftRadius: "1rem", 
                            borderBottomLeftRadius: "1rem", 
                            border: nameFocused ? `1px solid ${themeColors.dark}` : "1px solid #eef2e7",
                            borderRight: "none",
                            transition: "all 0.2s ease" 
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                          </svg>
                        </span>
                        <input 
                          type="text" 
                          id="juice-client-name" 
                          className="form-control" 
                          placeholder="Ej. Alejandra Gómez" 
                          required 
                          onFocus={() => setNameFocused(true)}
                          onBlur={() => setNameFocused(false)}
                          style={{ 
                            borderTopRightRadius: "1rem", 
                            borderBottomRightRadius: "1rem", 
                            border: nameFocused ? `1px solid ${themeColors.dark}` : "1px solid #eef2e7", 
                            borderLeft: "none",
                            boxShadow: nameFocused ? `0 0 0 3px ${themeColors.shadow}` : "none",
                            padding: "0.85rem 1rem",
                            fontSize: "0.92rem",
                            fontWeight: 500,
                            transition: "all 0.2s ease"
                          }} 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="form-label small fw-bold text-black" htmlFor="juice-client-email">4. Correo Electrónico</label>
                      <div className="input-group">
                        <span 
                          className="input-group-text bg-white text-muted" 
                          style={{ 
                            borderTopLeftRadius: "1rem", 
                            borderBottomLeftRadius: "1rem", 
                            border: emailFocused ? `1px solid ${themeColors.dark}` : "1px solid #eef2e7",
                            borderRight: "none",
                            transition: "all 0.2s ease" 
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zM15 11.801V4.697l-5.803 3.546z"/>
                          </svg>
                        </span>
                        <input 
                          type="email" 
                          id="juice-client-email" 
                          className="form-control" 
                          placeholder="ejemplo@correo.com" 
                          required 
                          onFocus={() => setEmailFocused(true)}
                          onBlur={() => setEmailFocused(false)}
                          style={{ 
                            borderTopRightRadius: "1rem", 
                            borderBottomRightRadius: "1rem", 
                            border: emailFocused ? `1px solid ${themeColors.dark}` : "1px solid #eef2e7", 
                            borderLeft: "none",
                            boxShadow: emailFocused ? `0 0 0 3px ${themeColors.shadow}` : "none",
                            padding: "0.85rem 1rem",
                            fontSize: "0.92rem",
                            fontWeight: 500,
                            transition: "all 0.2s ease"
                          }} 
                        />
                      </div>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn w-100 py-3 mt-2 fw-bold text-white border-0 shadow-sm" 
                      style={{ 
                        background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.dark})`,
                        borderRadius: "50px",
                        transition: "all 0.3s ease",
                        boxShadow: `0 8px 20px ${themeColors.shadow}`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
                        e.currentTarget.style.boxShadow = `0 12px 25px ${themeColors.shadow}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = `0 8px 20px ${themeColors.shadow}`;
                      }}
                    >
                      Completar Pre-Reserva
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
