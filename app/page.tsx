"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeroMonitor from "@/components/HeroMonitor";
import { useTranslation, useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const t = useTranslation();
  const { language } = useLanguage();
  const [visibleItems, setVisibleItems] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPromo, setShowPromo] = useState(false);
  const [promoDismissed, setPromoDismissed] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (showPromo) {
      html.setAttribute("data-promo-toast", "visible");
    } else {
      html.removeAttribute("data-promo-toast");
    }
    return () => html.removeAttribute("data-promo-toast");
  }, [showPromo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isMobileOrTablet = window.innerWidth < 992;
      const hasCookieConsent = (() => {
        try {
          return Boolean(localStorage.getItem("imperiodev-cookie-consent"));
        } catch {
          return false;
        }
      })();
      const isCookieBannerActive = document.documentElement.hasAttribute("data-cookie-banner");
      if (!isMobileOrTablet || (hasCookieConsent && !isCookieBannerActive)) {
        setShowPromo(true);
      }
    }, 4000);
    const handleCookieClosed = () => {
      if (!promoDismissed) {
        setTimeout(() => {
          setShowPromo(true);
        }, 450);
      }
    };
    const handleCookieOpened = () => {
      if (window.innerWidth < 992) {
        setShowPromo(false);
      }
    };
    window.addEventListener("cookie-banner-closed", handleCookieClosed);
    window.addEventListener("cookie-banner-opened", handleCookieOpened);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("cookie-banner-closed", handleCookieClosed);
      window.removeEventListener("cookie-banner-opened", handleCookieOpened);
    };
  }, []);

  const dismissPromo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPromoDismissed(true);
    const html = document.documentElement;
    html.removeAttribute("data-promo-toast");
    setShowPromo(false);
  };

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else if (window.innerWidth < 992) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const projects = [
    {
      title: "Tzaira Villegas Boutique",
      type: "E-commerce",
      desc: language === "en" 
        ? "Physical and online dress and women's fashion store with integrated payments." 
        : "Tienda física y online de vestidos y moda femenina, con cobros integrados.",
      seoImage: "https://www.tzairaboutique.com/wp-content/plugins/cmp-coming-soon-maintenance/themes/hardwork/img/hardwork_banner_large.jpg",
      url: "https://www.tzairaboutique.com/",
      badgeBg: "bg-danger bg-opacity-10 text-danger",
      textClass: "text-danger"
    },
    {
      title: "Nakama Bordados",
      type: "E-commerce",
      desc: language === "en"
        ? "Sale and shipping of anime-inspired embroidered clothing with integrated gateway."
        : "Venta y envío de ropa bordada inspirada en anime con pasarela integrada.",
      seoImage: "https://nakamabordados.com/og-banner.png",
      url: "https://nakamabordados.com/",
      badgeBg: "bg-info bg-opacity-10 text-info",
      textClass: "text-info"
    },
    {
      title: "Nakama Embroidery",
      type: language === "en" ? "Digital Products" : "Productos Digitales",
      desc: language === "en"
        ? "Marketplace for purchasing, downloading, and distributing embroidery designs and grids."
        : "Marketplace para compra, descarga y distribución de matrices y diseños bordados.",
      // The .com.mx site currently returns a maintenance response without og:image;
      // keep the existing branded asset as a safe fallback until its SEO image is published.
      seoImage: "https://www.imperiodev.com/wp-content/uploads/2026/01/nakamaemb.png",
      url: "https://nakamaemb.com.mx/",
      badgeBg: "bg-primary bg-opacity-10 text-primary",
      textClass: "text-primary"
    },
    {
      title: "SIRO",
      type: language === "en" ? "Design Studio" : "Estudio de Diseño",
      desc: language === "en"
        ? "Branding, brand identity studio, and digital layout with high visual level."
        : "Estudio de branding, imagen de marca y maquetación digital de alto nivel visual.",
      seoImage: "https://www.siro.com.mx/wp-content/uploads/2026/02/siro1.avif",
      url: "https://www.siro.com.mx/",
      badgeBg: "bg-purple bg-opacity-10 text-purple-600 dark:text-purple-400",
      textClass: "text-purple-600 dark:text-purple-400"
    }
  ];

  const maxIndex = Math.max(0, projects.length - visibleItems);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleItems, maxIndex, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="bg-grid pb-4 pb-md-5 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Responsive Hero & Section Typography */
        .home-hero-title {
          font-size: clamp(1.9rem, 6.5vw, 3.75rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .home-hero-lead {
          font-size: clamp(0.95rem, 3.2vw, 1.22rem);
          line-height: 1.6;
          max-width: 600px;
          word-break: break-word;
        }

        .home-section-title {
          font-size: clamp(1.6rem, 5.5vw, 2.75rem);
          line-height: 1.18;
          letter-spacing: -0.02em;
          word-break: break-word;
        }

        .home-cta-title {
          font-size: clamp(1.75rem, 6vw, 3.25rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          word-break: break-word;
        }

        .home-service-main-title {
          font-size: clamp(1.3rem, 4.2vw, 1.85rem);
          line-height: 1.22;
        }

        .home-service-sub-title {
          font-size: clamp(1.15rem, 3.6vw, 1.4rem);
          line-height: 1.25;
        }

        .home-plan-price {
          font-size: clamp(1.65rem, 5vw, 2.15rem);
        }

        .plan-card-popular {
          z-index: 2;
        }

        @media (min-width: 992px) {
          .plan-card-popular {
            transform: scale(1.02);
          }
        }

        /* Custom transitions and premium classes */
        .btn-premium-cta {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-premium-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4) !important;
        }

        .btn-premium-outline-info {
          border: 2px solid #14b8a6 !important;
          color: #14b8a6 !important;
          background: transparent !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-premium-outline-info:hover {
          background: #14b8a6 !important;
          color: #fff !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(20, 184, 166, 0.3) !important;
        }

        .btn-premium-outline-primary {
          border: 2px solid #3b82f6 !important;
          color: #3b82f6 !important;
          background: transparent !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-premium-outline-primary:hover {
          background: #3b82f6 !important;
          color: #fff !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3) !important;
        }

        .card-hover-premium {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-hover-premium:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: var(--card-shadow);
        }

        .social-icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          color: var(--text-color);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--card-shadow);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .social-icon-btn:hover {
          transform: translateY(-3px) scale(1.1);
          color: #ffffff !important;
        }
        .facebook-btn:hover {
          background: #1877f2 !important;
          border-color: #1877f2 !important;
          box-shadow: 0 8px 20px rgba(24, 119, 242, 0.3) !important;
        }
        .instagram-btn:hover {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important;
          border-color: #dc2743 !important;
          box-shadow: 0 8px 20px rgba(220, 39, 67, 0.3) !important;
        }
        .whatsapp-btn:hover {
          background: #25d366 !important;
          border-color: #25d366 !important;
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3) !important;
        }

        .portfolio-slider-item {
          padding: 0 12px;
        }

        .portfolio-nav-btn {
          width: 42px;
          height: 42px;
        }
        .portfolio-nav-prev {
          left: -10px;
        }
        .portfolio-nav-next {
          right: -10px;
        }

        @media (max-width: 576px) {
          .home-hero-header {
            min-height: auto !important;
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
          }
          .home-hero-btn {
            padding: 0.75rem 1.25rem !important;
            font-size: 0.95rem !important;
          }
          .portfolio-slider-item {
            padding: 0 4px;
          }
          .portfolio-nav-btn {
            width: 36px;
            height: 36px;
          }
          .portfolio-nav-prev {
            left: 2px;
          }
          .portfolio-nav-next {
            right: 2px;
          }
          .portfolio-card img {
            height: 185px !important;
          }
        }

        @media (max-width: 360px) {
          .home-card-compact {
            padding: 1.15rem 0.9rem !important;
          }
          .social-icon-btn {
            width: 40px;
            height: 40px;
          }
          .portfolio-card img {
            height: 165px !important;
          }
        }

        /* Promo Toast Slide-In Animation */
        @keyframes slide-up-in {
          0% { transform: translateY(100px) scale(0.9); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
        .animate-wiggle {
          animation: wiggle 2s infinite ease-in-out;
        }
        .promo-toast-wrapper {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1050;
          max-width: 360px;
          width: calc(100vw - 48px);
          animation: slide-up-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1), right 0.3s ease;
        }
        @media (min-width: 992px) {
          .promo-toast-wrapper {
            right: 116px;
          }
        }
        .promo-toast {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          background: rgba(255, 255, 255, 0.97) !important;
          border: 1px solid rgba(20, 184, 166, 0.32) !important;
          box-shadow: 0 15px 35px -5px rgba(15, 23, 42, 0.14), 0 4px 12px rgba(20, 184, 166, 0.08) !important;
          backdrop-filter: blur(20px);
          border-left: 4px solid #14b8a6 !important;
        }
        .promo-toast:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(20, 184, 166, 0.25) !important;
          border-color: #14b8a6 !important;
        }
        .btn-close-promo {
          color: #94a3b8;
          transition: color 0.2s ease, background-color 0.2s ease;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .btn-close-promo:hover {
          color: #14b8a6;
          background: rgba(15, 23, 42, 0.06);
        }
        html.dark .promo-toast {
          background: rgba(15, 23, 42, 0.97) !important;
          border: 1px solid rgba(20, 184, 166, 0.35) !important;
          border-left: 4px solid #14b8a6 !important;
          box-shadow: 0 18px 40px -5px rgba(0, 0, 0, 0.6), 0 4px 15px rgba(20, 184, 166, 0.15) !important;
        }
        html.dark .promo-toast:hover {
          box-shadow: 0 18px 40px -5px rgba(20, 184, 166, 0.3), 0 6px 20px rgba(0, 0, 0, 0.65) !important;
          border-color: #14b8a6 !important;
        }
        .promo-icon-container {
          background: rgba(20, 184, 166, 0.12) !important;
          border: 1px solid rgba(20, 184, 166, 0.25);
          color: #0d9488 !important;
          width: 48px;
          height: 48px;
        }
        html.dark .promo-icon-container {
          background: rgba(20, 184, 166, 0.15) !important;
          border-color: rgba(45, 212, 191, 0.25);
          color: #2dd4bf !important;
        }
        .promo-toast .promo-accent {
          color: #0d9488 !important;
        }
        html.dark .promo-toast .promo-accent {
          color: #2dd4bf !important;
        }
        .promo-toast .promo-title {
          color: #0f172a !important;
        }
        html.dark .promo-toast .promo-title {
          color: #f8fafc !important;
        }
        .promo-toast .promo-desc {
          color: #475569 !important;
        }
        html.dark .promo-toast .promo-desc {
          color: #cbd5e1 !important;
        }
        html.dark .btn-close-promo {
          color: #94a3b8;
        }
        html.dark .btn-close-promo:hover {
          color: #2dd4bf;
          background: rgba(255, 255, 255, 0.1);
        }
        @media (max-width: 991.98px) {
          html[data-cookie-banner] .promo-toast-wrapper {
            display: none !important;
          }
          html[data-promo-toast="visible"]:not([data-cookie-banner]) #cac-chat-container {
            bottom: 130px !important;
            transition: bottom 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }
        @media (max-width: 576px) {
          .promo-toast-wrapper {
            left: 12px;
            right: 12px;
            bottom: 12px;
            width: auto;
            max-width: none;
          }
          .promo-toast {
            padding: 0.75rem 0.85rem !important;
            gap: 0.65rem !important;
            border-radius: 0.9rem !important;
          }
          .promo-icon-container {
            width: 38px;
            height: 38px;
          }
          .promo-icon-container i {
            font-size: 1.2rem !important;
          }
          .promo-toast .promo-accent {
            font-size: 0.72rem !important;
          }
          .promo-toast .promo-title {
            font-size: 0.88rem !important;
            line-height: 1.25 !important;
          }
          .promo-toast .promo-desc {
            font-size: 0.75rem !important;
            line-height: 1.35 !important;
          }
        }
        @media (max-width: 350px) {
          .promo-icon-container {
            width: 32px;
            height: 32px;
          }
          .promo-icon-container i {
            font-size: 1rem !important;
          }
          .promo-toast {
            padding: 0.65rem 0.75rem !important;
            gap: 0.5rem !important;
          }
        }
      ` }} />

      {/* 1. Hero / Header Section */}
      <header className="home-hero-header position-relative min-vh-100 d-flex align-items-center justify-content-center pt-3 pt-md-5 overflow-hidden">
        <div 
          className="position-absolute bg-info rounded-circle blur-3xl opacity-20 animate-pulse-slow parallax-blob d-none d-sm-block"
          style={{ width: "min(400px, 80vw)", height: "min(400px, 80vw)", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
        ></div>
        <div 
          className="position-absolute bg-primary rounded-circle blur-3xl opacity-10 animate-pulse-slow delay-1000 parallax-blob d-none d-sm-block"
          style={{ width: "min(400px, 80vw)", height: "min(400px, 80vw)", bottom: "10%", right: "10%", filter: "blur(100px)", zIndex: -1 }}
        ></div>

        <div className="container-xl px-3 px-sm-4 py-3 py-md-5 z-1">
          <div className="row align-items-center g-4 g-lg-5 text-center text-lg-start">
            <div className="col-12 col-lg-6 d-flex flex-column gap-3 gap-sm-4">
              <h1 className="home-hero-title fw-bold tracking-tight text-body font-display mb-0">
                {t.home.heroTitle1} <br />
                <span className="text-gradient">{t.home.heroTitle2}</span>
              </h1>
              <p className="home-hero-lead text-secondary mx-auto mx-lg-0 mb-0">
                {t.home.heroSubtitle}
              </p>
              <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3 pt-1 pt-sm-2 justify-content-center justify-content-lg-start">
                <Link 
                  href="#catalogo" 
                  className="btn btn-info home-hero-btn text-white fw-bold px-4 py-3 rounded shadow-sm btn-premium-cta d-flex align-items-center justify-content-center gap-2"
                  style={{ background: "#14b8a6", borderColor: "#14b8a6" }}
                >
                  {t.home.btnPlans} <i className="bi bi-arrow-right"></i>
                </Link>
                <Link 
                  href="/enlaces" 
                  className="btn btn-premium-outline-theme home-hero-btn btn-shimmer fw-bold px-4 py-3 rounded d-flex align-items-center justify-content-center gap-2"
                  style={{ "--shimmer-delay": "0s" } as React.CSSProperties}
                >
                  {t.home.btnLinks} <i className="bi bi-link-45deg fs-5"></i>
                </Link>
                <Link 
                  href="#portfolio" 
                  className="btn btn-premium-outline-theme home-hero-btn btn-shimmer fw-bold px-4 py-3 rounded d-flex align-items-center justify-content-center"
                  style={{ "--shimmer-delay": "0.6s" } as React.CSSProperties}
                >
                  {t.home.btnPortfolio}
                </Link>
              </div>

              {/* Quick Social Links */}
              <div className="d-flex justify-content-center justify-content-lg-start gap-3 mt-2 mt-sm-3">
                <a 
                  href="https://www.facebook.com/ImperioDev" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon-btn facebook-btn"
                  title="Facebook"
                >
                  <i className="bi bi-facebook fs-5"></i>
                </a>
                <a 
                  href="https://www.instagram.com/imperiodev_" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon-btn instagram-btn"
                  title="Instagram"
                >
                  <i className="bi bi-instagram fs-5"></i>
                </a>
                <a 
                  href="https://wa.me/526623440716" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon-btn whatsapp-btn"
                  title="WhatsApp"
                >
                  <i className="bi bi-whatsapp fs-5"></i>
                </a>
              </div>
            </div>

            {/* Monitor Animation Component Column */}
            <div className="col-12 col-lg-6 d-none d-lg-block">
              <HeroMonitor />
            </div>
          </div>
        </div>
      </header>

      {/* 2. Services Section */}
      <section className="py-4 py-md-5 my-3 my-md-5" id="servicios">
        <div className="container-xl px-3 px-sm-4">
          <div className="text-center mb-4 mb-md-5">
            <h2 className="home-section-title fw-bold text-body mb-2 mb-sm-3 font-display">
              {t.home.servicesTitle}
            </h2>
            <p className="text-secondary mx-auto mb-0" style={{ maxWidth: "600px", fontSize: "clamp(0.9rem, 2.8vw, 1.05rem)" }}>
              {t.home.servicesSubtitle}
            </p>
          </div>

          <div className="row g-3 g-md-4">
            {/* Main Service Card */}
            <div className="col-12 col-lg-8">
              <div className="glass-panel home-card-compact p-3 p-sm-4 p-md-5 h-100 d-flex flex-column justify-content-between position-relative overflow-hidden card-hover-premium">
                <div 
                  className="position-absolute bg-info rounded-circle blur-3xl opacity-10"
                  style={{ width: "250px", height: "250px", top: "-50px", right: "-50px", filter: "blur(80px)" }}
                ></div>
                <div className="position-relative z-1">
                  <div 
                    className="rounded-4 bg-info text-white d-flex align-items-center justify-content-center mb-3 mb-sm-4 shadow-sm"
                    style={{ width: "48px", height: "48px", background: "#14b8a6" }}
                  >
                    <i className="bi bi-rocket-takeoff-fill fs-4"></i>
                  </div>
                  <h3 className="home-service-main-title fw-bold text-body mb-2 mb-sm-3 font-display">{t.home.servicesWebTitle}</h3>
                  <p className="text-secondary mb-3 mb-sm-4" style={{ fontSize: "clamp(0.9rem, 2.8vw, 1rem)", lineHeight: 1.6 }}>
                    {t.home.servicesWebDesc}
                  </p>
                </div>
                <div className="mt-2 mt-sm-4">
                  <ul className="list-unstyled row g-2 g-sm-3 text-secondary mb-0" style={{ fontSize: "clamp(0.86rem, 2.7vw, 0.96rem)" }}>
                    <li className="col-12 col-md-6 d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill text-info flex-shrink-0"></i> <span>{t.home.servicesWebF1}</span>
                    </li>
                    <li className="col-12 col-md-6 d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill text-info flex-shrink-0"></i> <span>{t.home.servicesWebF2}</span>
                    </li>
                    <li className="col-12 col-md-6 d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill text-info flex-shrink-0"></i> <span>{t.home.servicesWebF3}</span>
                    </li>
                    <li className="col-12 col-md-6 d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill text-info flex-shrink-0"></i> <span>{t.home.servicesWebF4}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Side Services Column */}
            <div className="col-12 col-lg-4 d-flex flex-column gap-3 gap-md-4">
              {/* E-commerce Card */}
              <div className="glass-panel home-card-compact p-3 p-sm-4 flex-grow-1 card-hover-premium bg-body">
                <div className="rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center mb-3" style={{ width: "40px", height: "40px" }}>
                  <i className="bi bi-cart-fill fs-5"></i>
                </div>
                <h3 className="home-service-sub-title fw-bold text-body mb-2 font-display">{t.home.servicesEcommerceTitle}</h3>
                <p className="small text-secondary m-0" style={{ lineHeight: 1.55 }}>
                  {t.home.servicesEcommerceDesc}
                </p>
              </div>

              {/* Maintenance Card */}
              <div className="glass-panel home-card-compact p-3 p-sm-4 flex-grow-1 card-hover-premium bg-body">
                <div className="rounded-3 bg-warning bg-opacity-10 text-warning d-flex align-items-center justify-content-center mb-3" style={{ width: "40px", height: "40px" }}>
                  <i className="bi bi-shield-fill-check fs-5"></i>
                </div>
                <h3 className="home-service-sub-title fw-bold text-body mb-2 font-display">{t.home.servicesMaintTitle}</h3>
                <p className="small text-secondary m-0" style={{ lineHeight: 1.55 }}>
                  {t.home.servicesMaintDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pricing Section */}
      <section className="py-4 py-md-5 my-3 my-md-5 bg-transparent" id="catalogo">
        <div className="container-xl px-3 px-sm-4">
          <div className="row mb-4 mb-md-5 align-items-end g-3 g-md-4">
            <div className="col-12 col-md-8">
              <span className="text-info fw-bold tracking-wider text-uppercase small">{t.home.pricingTag}</span>
              <h2 className="home-section-title fw-bold text-body mt-2 mb-0 font-display">{t.home.pricingTitle}</h2>
              <div className="mt-3 mt-sm-4 p-3 p-sm-4 rounded-3 border d-flex gap-3 bg-info bg-opacity-10 border-info border-opacity-25" style={{ maxWidth: "650px" }}>
                <i className="bi bi-info-circle-fill text-info fs-5 mt-1 flex-shrink-0"></i>
                <p className="small text-secondary m-0 leading-relaxed">
                  <strong>{language === "en" ? "Note:" : "Nota:"}</strong> {t.home.pricingNote}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 text-md-end">
              <Link href="/catalogo" className="text-secondary fw-bold text-decoration-none hover-text-teal d-inline-flex align-items-center gap-1">
                <span>{t.home.pricingLink}</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>

          <div className="row g-3 g-md-4 pt-2 pt-md-3 align-items-stretch">
            {/* Plan 1 */}
            <div className="col-12 col-lg-4">
              <div className="glass-panel home-card-compact p-3 p-sm-4 h-100 d-flex flex-column justify-content-between card-hover-premium">
                <div>
                  <div 
                    className="py-3 py-sm-4 rounded-3 text-center mb-3 mb-sm-4 border" 
                    style={{ background: "rgba(15, 23, 42, 0.4)", borderColor: "rgba(255, 255, 255, 0.06)" }}
                  >
                    <i className="bi bi-feather text-info fs-1"></i>
                  </div>
                  <h3 className="h4 fw-bold text-body mb-1 font-display">{t.home.planSimpleTitle}</h3>
                  <p className="text-muted small mb-3 mb-sm-4" style={{ minHeight: "40px" }}>
                    {t.home.planSimpleDesc}
                  </p>
                  <div className="d-flex align-items-baseline gap-1 mb-3 mb-sm-4">
                    <span className="home-plan-price fw-bold text-body">{t.home.planSimplePrice}</span>
                    <span className="small text-muted">MXN</span>
                  </div>
                  <hr className="my-3 my-sm-4 opacity-10" />
                  <ul className="list-unstyled text-secondary small d-flex flex-column gap-3 mb-4 mb-sm-5">
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle text-info flex-shrink-0 mt-1"></i> <span>{t.home.planSimpleF1}</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle text-info flex-shrink-0"></i> <span>{t.home.planSimpleF2}</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle text-info flex-shrink-0"></i> <span>{t.home.planSimpleF3}</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle text-info flex-shrink-0"></i> <span>{t.home.planSimpleF4}</span>
                    </li>
                  </ul>
                </div>
                <a 
                  href="https://wa.me/526623440716?text=Me%20interesa%20el%20paquete%20sencillo" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-premium-outline-info w-100 py-2 py-sm-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-chat-left-text-fill"></i> {t.home.btnHire}
                </a>
              </div>
            </div>

            {/* Plan 2 - Highlighted */}
            <div className="col-12 col-lg-4">
              <div 
                className="glass-panel home-card-compact plan-card-popular p-3 p-sm-4 h-100 d-flex flex-column justify-content-between border-info border-2 shadow-lg position-relative"
              >
                <div 
                  className="position-absolute text-white text-center py-1 fw-bold uppercase tracking-wider small w-100 top-0 start-0"
                  style={{ background: "#14b8a6", borderRadius: "10px 10px 0 0", fontSize: "0.75rem" }}
                >
                  {t.home.planEstandarPopular}
                </div>
                <div className="pt-3">
                  <div 
                    className="py-3 py-sm-4 rounded-3 text-center mb-3 mb-sm-4 border" 
                    style={{ background: "rgba(15, 23, 42, 0.4)", borderColor: "rgba(255, 255, 255, 0.06)" }}
                  >
                    <i className="bi bi-stack text-info fs-1"></i>
                  </div>
                  <h3 className="h4 fw-bold text-body mb-1 font-display">{t.home.planEstandarTitle}</h3>
                  <p className="text-muted small mb-3 mb-sm-4" style={{ minHeight: "40px" }}>
                    {t.home.planEstandarDesc}
                  </p>
                  <div className="d-flex align-items-baseline gap-1 mb-3 mb-sm-4">
                    <span className="home-plan-price fw-bold text-body">{t.home.planEstandarPrice}</span>
                    <span className="small text-muted">MXN</span>
                  </div>
                  <hr className="my-3 my-sm-4 opacity-10" />
                  <ul className="list-unstyled text-secondary small d-flex flex-column gap-3 mb-4 mb-sm-5">
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle-fill text-info flex-shrink-0"></i> <strong>{t.home.planEstandarF1}</strong>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle-fill text-info flex-shrink-0"></i> <span>{t.home.planEstandarF2}</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-plus-circle text-info flex-shrink-0"></i> <span>{t.home.planEstandarF3}</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle-fill text-info flex-shrink-0"></i> <span>{t.home.planEstandarF4}</span>
                    </li>
                  </ul>
                </div>
                <a 
                  href="https://wa.me/526623440716?text=Me%20interesa%20el%20paquete%20estandar" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-info text-white w-100 py-2 py-sm-3 fw-bold btn-premium-cta d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  style={{ background: "#14b8a6", borderColor: "#14b8a6" }}
                >
                  <i className="bi bi-chat-left-text-fill"></i> {t.home.btnHire}
                </a>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="col-12 col-lg-4">
              <div className="glass-panel home-card-compact p-3 p-sm-4 h-100 d-flex flex-column justify-content-between card-hover-premium">
                <div>
                  <div 
                    className="py-3 py-sm-4 rounded-3 text-center mb-3 mb-sm-4 border" 
                    style={{ background: "rgba(15, 23, 42, 0.4)", borderColor: "rgba(255, 255, 255, 0.06)" }}
                  >
                    <i className="bi bi-gem text-info fs-1"></i>
                  </div>
                  <h3 className="h4 fw-bold text-body mb-1 font-display">{t.home.planProTitle}</h3>
                  <p className="text-muted small mb-3 mb-sm-4" style={{ minHeight: "40px" }}>
                    {t.home.planProDesc}
                  </p>
                  <div className="d-flex align-items-baseline gap-1 mb-3 mb-sm-4">
                    <span className="home-plan-price fw-bold text-body">{t.home.planProPrice}</span>
                    <span className="small text-muted">MXN</span>
                  </div>
                  <hr className="my-3 my-sm-4 opacity-10" />
                  <ul className="list-unstyled text-secondary small d-flex flex-column gap-3 mb-4 mb-sm-5">
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle text-info flex-shrink-0"></i> <strong>{t.home.planProF1}</strong>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-plus-circle text-info flex-shrink-0"></i> <span>{t.home.planProF2}</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-share text-info flex-shrink-0"></i> <span>{t.home.planProF3}</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <i className="bi bi-shield text-info flex-shrink-0"></i> <span>{t.home.planProF4}</span>
                    </li>
                  </ul>
                </div>
                <a 
                  href="https://wa.me/526623440716?text=Me%20interesa%20el%20paquete%20pro" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-premium-outline-primary w-100 py-2 py-sm-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-chat-left-text-fill"></i> {t.home.btnHire}
                </a>
              </div>
            </div>
          </div>

          {/* Details Row */}
          <div className="row g-4 g-lg-5 mt-3 mt-md-5 pt-2 pt-md-3">
            <div className="col-12 col-lg-6">
              <h3 className="h5 fw-bold text-body mb-3 mb-sm-4 pb-2 border-bottom d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-info flex-shrink-0"></i> <span>{t.home.includeTitle}</span>
              </h3>
              <div className="d-flex flex-column gap-3 gap-sm-4">
                <div className="d-flex gap-3 align-items-start">
                  <div className="rounded-3 bg-info bg-opacity-10 text-info d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "42px", height: "42px" }}>
                    <i className="bi bi-database-fill fs-5"></i>
                  </div>
                  <div className="min-w-0">
                    <h4 className="h6 fw-bold text-body mb-1">{t.home.includeDbTitle}</h4>
                    <p className="text-secondary small mb-0" style={{ lineHeight: 1.55 }}>
                      {t.home.includeDbDesc}
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-3 align-items-start">
                  <div className="rounded-3 bg-info bg-opacity-10 text-info d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "42px", height: "42px" }}>
                    <i className="bi bi-hdd-network-fill fs-5"></i>
                  </div>
                  <div className="min-w-0">
                    <h4 className="h6 fw-bold text-body mb-1">{t.home.includeHostingTitle}</h4>
                    <p className="text-secondary small mb-0" style={{ lineHeight: 1.55 }}>
                      {t.home.includeHostingDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <h3 className="h5 fw-bold text-body mb-3 mb-sm-4 pb-2 border-bottom d-flex align-items-center gap-2">
                <i className="bi bi-exclamation-triangle-fill text-danger flex-shrink-0"></i> <span>{t.home.excludeTitle}</span>
              </h3>
              <div className="d-flex flex-column gap-3 gap-sm-4">
                <div className="d-flex gap-3 align-items-start">
                  <div className="rounded-3 bg-danger bg-opacity-10 text-danger d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "42px", height: "42px" }}>
                    <i className="bi bi-box-fill fs-5"></i>
                  </div>
                  <div className="min-w-0">
                    <h4 className="h6 fw-bold text-body mb-1">{t.home.excludeCatTitle}</h4>
                    <p className="text-secondary small mb-0" style={{ lineHeight: 1.55 }}>
                      {t.home.excludeCatDesc}
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-3 align-items-start">
                  <div className="rounded-3 bg-danger bg-opacity-10 text-danger d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "42px", height: "42px" }}>
                    <i className="bi bi-wrench-adjustable-circle-fill fs-5"></i>
                  </div>
                  <div className="min-w-0">
                    <h4 className="h6 fw-bold text-body mb-1">{t.home.excludeSupportTitle}</h4>
                    <p className="text-secondary small mb-0" style={{ lineHeight: 1.55 }}>
                      {t.home.excludeSupportDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Portfolio Section (Rebuilt as a fully responsive client-side slider) */}
      <section className="py-4 py-md-5 overflow-hidden" id="portfolio">
        <div className="container-xl px-3 px-sm-4">
          <h2 className="home-section-title fw-bold text-center text-body mb-4 mb-md-5 font-display">{t.home.portfolioTitle}</h2>

          <div className="position-relative px-1 px-sm-3 px-md-5">
            {/* Slider Container */}
            <div 
              className="slider-container" 
              style={{ overflow: "hidden" }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div 
                className="slider-track d-flex"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
                  transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                {projects.map((project, idx) => (
                  <div 
                    key={idx}
                    className="slider-item portfolio-slider-item"
                    style={{
                      flex: `0 0 ${100 / visibleItems}%`
                    }}
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-body d-block h-100 card-hover-premium">
                      <div className="glass-panel overflow-hidden portfolio-card h-100 d-flex flex-column justify-content-between">
                        <div className="overflow-hidden">
                          <img 
                            src={project.seoImage}
                            alt={project.title} 
                            className="w-100 img-fluid"
                            style={{ height: "220px", objectFit: "cover" }}
                          />
                        </div>
                        <div className="p-3 p-sm-4 d-flex flex-column justify-content-between flex-grow-1">
                          <div>
                            <span className={`badge ${project.badgeBg} text-uppercase mb-2`} style={{ fontSize: "0.7rem" }}>{project.type}</span>
                            <h4 className="h5 fw-bold mb-2 font-display">{project.title}</h4>
                            <p className="text-secondary small mb-3" style={{ lineHeight: 1.55 }}>
                              {project.desc}
                            </p>
                          </div>
                          <span className={`${project.textClass} fw-bold small`}>{t.home.portfolioVisit} <i className="bi bi-arrow-right ms-1"></i></span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Controls */}
            {maxIndex > 0 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="btn btn-light portfolio-nav-btn portfolio-nav-prev rounded-circle shadow border position-absolute top-50 translate-middle-y z-3 d-flex align-items-center justify-content-center"
                  title={language === "en" ? "Previous" : "Anterior"}
                >
                  <i className="bi bi-chevron-left fs-6 fs-sm-5"></i>
                </button>
                <button 
                  onClick={nextSlide}
                  className="btn btn-light portfolio-nav-btn portfolio-nav-next rounded-circle shadow border position-absolute top-50 translate-middle-y z-3 d-flex align-items-center justify-content-center"
                  title={language === "en" ? "Next" : "Siguiente"}
                >
                  <i className="bi bi-chevron-right fs-6 fs-sm-5"></i>
                </button>
              </>
            )}

            {/* Indicators */}
            <div className="d-flex justify-content-center gap-2 mt-3 mt-sm-4">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="rounded-circle border-0 p-0"
                  style={{ 
                    width: "10px", 
                    height: "10px", 
                    background: currentIndex === idx ? "#14b8a6" : "rgba(0,0,0,0.2)",
                    transition: "background 0.3s ease"
                  }}
                  title={language === "en" ? `Go to slide ${idx + 1}` : `Ir al slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <section className="py-4 py-md-5 my-3 my-md-5 position-relative overflow-hidden" id="contacto">
        <div className="container-xl px-3 px-sm-4 py-3 py-md-5 z-1 text-center">
          <h2 className="home-cta-title fw-bold mb-2 mb-sm-3 text-body font-display">{t.home.ctaTitle}</h2>
          <p className="home-hero-lead text-secondary mb-4 mb-md-5 mx-auto">
            {t.home.ctaSubtitle}
          </p>
          <div className="mx-auto p-3 p-sm-4 p-md-5 rounded-4 shadow-lg border glass-panel home-card-compact" style={{ maxWidth: "520px" }}>
            <p className="text-secondary mb-3 mb-sm-4 small fw-bold">
              {t.home.ctaBoxTitle}
            </p>
            <a 
              href="https://wa.me/526623440716?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n%20o%20informaci%C3%B3n" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-whatsapp-cta"
            >
              <i className="bi bi-whatsapp"></i> {t.home.ctaBtn}
            </a>
            <p className="text-muted small mt-3 mb-0">
              {t.home.ctaBoxNote}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Promotional Floating Toast */}
      {showPromo && (
        <div className="promo-toast-wrapper">
          <Link href="/notes-app" className="text-decoration-none">
            <div className="promo-toast glass-panel p-3 border-info border-opacity-50 shadow-lg d-flex gap-3 align-items-center position-relative">
              <button 
                onClick={dismissPromo} 
                className="btn-close-promo position-absolute top-0 end-0 m-2 border-0 bg-transparent"
                aria-label={t.home.promoClose}
              >
                <i className="bi bi-x fs-5"></i>
              </button>
              
              <div className="promo-icon-container rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                <i className="bi bi-phone-vibrate fs-3 animate-wiggle"></i>
              </div>
              
              <div className="pe-3">
                <span className="promo-accent text-xs fw-bold uppercase tracking-wider d-block mb-1">✨ {language === "en" ? "Launch!" : "¡Lanzamiento!"}</span>
                <h4 className="promo-title h6 fw-bold mb-1">{language === "en" ? "Start looking professional" : "Empieza a verte profesional"}</h4>
                <p className="promo-desc small m-0 leading-sm">
                  {t.home.promoDesc}
                </p>
                <span className="promo-accent small fw-bold mt-1 d-inline-block">{t.home.promoBtn} <i className="bi bi-arrow-right"></i></span>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
