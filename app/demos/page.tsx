"use client";

import Link from "next/link";
import { useTranslation, useLanguage } from "@/context/LanguageContext";

interface DemoItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  features: string[];
  icon: string;
  href: string;
  glowColor: string;
  btnText: string;
}

export default function DemosPage() {
  const t = useTranslation();
  const { language } = useLanguage();

  const demos: DemoItem[] = [
    {
      id: "landing",
      title: t.demos.items[0].title,
      tag: t.demos.items[0].tag,
      description: t.demos.items[0].description,
      features: t.demos.items[0].features,
      icon: "bi-layout-text-sidebar-reverse",
      href: "/demos/landing",
      glowColor: "rgba(249, 115, 22, 0.15)", // Orange glow
      btnText: t.demos.items[0].btnText
    },
    {
      id: "ecommerce",
      title: t.demos.items[1].title,
      tag: t.demos.items[1].tag,
      description: t.demos.items[1].description,
      features: t.demos.items[1].features,
      icon: "bi-cart3",
      href: "/demos/ecommerce",
      glowColor: "rgba(139, 92, 246, 0.15)", // Violet glow
      btnText: t.demos.items[1].btnText
    },
    {
      id: "tarjeta",
      title: t.demos.items[2].title,
      tag: t.demos.items[2].tag,
      description: t.demos.items[2].description,
      features: t.demos.items[2].features,
      icon: "bi-person-badge",
      href: "/demos/tarjeta-digital",
      glowColor: "rgba(16, 185, 129, 0.15)", // Emerald glow
      btnText: t.demos.items[2].btnText
    },
    {
      id: "landing-jugos",
      title: t.demos.items[3].title,
      tag: t.demos.items[3].tag,
      description: t.demos.items[3].description,
      features: t.demos.items[3].features,
      icon: "bi-cup-straw",
      href: "/demos/landing/jugos",
      glowColor: "rgba(34, 197, 94, 0.15)", // Green glow
      btnText: t.demos.items[3].btnText
    }
  ];

  return (
    <div className="bg-grid py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        .demo-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .demo-card:hover {
          transform: translateY(-8px);
        }
        
        .landing-card:hover {
          border-color: rgba(249, 115, 22, 0.4) !important;
          box-shadow: 0 20px 40px -10px rgba(249, 115, 22, 0.25) !important;
        }
        .ecommerce-card:hover {
          border-color: rgba(139, 92, 246, 0.4) !important;
          box-shadow: 0 20px 40px -10px rgba(139, 92, 246, 0.25) !important;
        }
        .tarjeta-card:hover {
          border-color: rgba(16, 185, 129, 0.4) !important;
          box-shadow: 0 20px 40px -10px rgba(16, 185, 129, 0.25) !important;
        }
        .jugos-card:hover {
          border-color: rgba(34, 197, 94, 0.4) !important;
          box-shadow: 0 20px 40px -10px rgba(34, 197, 94, 0.25) !important;
        }

        .icon-box {
          width: 54px;
          height: 54px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
        .demo-card:hover .icon-box {
          transform: scale(1.1) rotate(3deg);
        }

        .badge-premium {
          font-size: 0.7rem;
          padding: 0.35rem 0.75rem;
          border-radius: 2rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}} />

      {/* Background Blobs */}
      <div 
        className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
        style={{ width: "400px", height: "400px", top: "-5%", left: "-5%", filter: "blur(120px)", zIndex: -1 }}
      ></div>
      <div 
        className="absolute position-absolute bg-primary rounded-circle blur-3xl opacity-10 animate-pulse-slow delay-1000 parallax-blob"
        style={{ width: "400px", height: "400px", bottom: "-5%", right: "-5%", filter: "blur(120px)", zIndex: -1 }}
      ></div>

      <div className="container-xl px-4 py-5 z-1">
        {/* Navigation & Header */}
        <div className="mb-5 text-center text-lg-start">
          <Link 
            href="/enlaces" 
            className="btn btn-premium-outline-theme fw-bold px-4 py-2.5 rounded d-inline-flex align-items-center gap-2 mb-4"
            id="back-to-links"
          >
            <i className="bi bi-arrow-left"></i> {t.demos.backBtn}
          </Link>
          <div className="max-w-2xl">
            <h1 className="display-4 fw-bold text-body mb-3 font-display">
              {language === "es" ? (
                <>Demos <span className="text-gradient">Interactivas</span></>
              ) : (
                <>Interactive <span className="text-gradient">Demos</span></>
              )}
            </h1>
            <p className="lead text-secondary m-0">
              {t.demos.subtitle}
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="row g-4">
          {demos.map((demo) => {
            const isLanding = demo.id === "landing";
            const isEcommerce = demo.id === "ecommerce";
            
            // Resolve classes and styles
            let cardHoverClass = "tarjeta-card";
            let badgeStyle = "bg-success bg-opacity-10 text-success border border-success border-opacity-25";
            let iconColor = "#10b981";
            let iconBg = "rgba(16, 185, 129, 0.08)";
            let btnClass = "btn-premium-outline-theme";
            
            if (isLanding) {
              cardHoverClass = "landing-card";
              badgeStyle = "bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25";
              iconColor = "#f97316";
              iconBg = "rgba(249, 115, 22, 0.08)";
            } else if (demo.id === "landing-jugos") {
              cardHoverClass = "jugos-card";
              badgeStyle = "bg-success bg-opacity-10 text-success border border-success border-opacity-25";
              iconColor = "#22c55e";
              iconBg = "rgba(34, 197, 94, 0.08)";
            } else if (isEcommerce) {
              cardHoverClass = "ecommerce-card";
              badgeStyle = "bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25";
              iconColor = "#8b5cf6";
              iconBg = "rgba(139, 92, 246, 0.08)";
              btnClass = "btn-premium-outline-theme";
            }

            return (
              <div key={demo.id} className="col-12 col-md-6 col-lg-3">
                <div 
                  className={`glass-panel p-4 h-100 d-flex flex-column justify-content-between demo-card ${cardHoverClass}`}
                  style={{ background: "var(--card-bg)" }}
                >
                  <div>
                    {/* Icon & Badge Header */}
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div 
                        className="icon-box"
                        style={{ backgroundColor: iconBg, color: iconColor }}
                      >
                        <i className={`bi ${demo.icon} fs-4`}></i>
                      </div>
                      <span className={`badge badge-premium ${badgeStyle}`}>
                        {demo.tag}
                      </span>
                    </div>

                    {/* Card Content */}
                    <h2 className="h4 fw-bold text-body mb-2 font-display">{demo.title}</h2>
                    <p className="text-secondary small mb-4" style={{ minHeight: "65px", lineHeight: "1.6" }}>
                      {demo.description}
                    </p>

                    <hr className="opacity-10 my-4" />

                    {/* Features List */}
                    <h3 className="h6 fw-bold text-body mb-3 uppercase tracking-wider small" style={{ fontSize: "0.7rem" }}>
                      {language === "en" ? "Key Features" : "Características Clave"}
                    </h3>
                    <ul className="list-unstyled d-flex flex-column gap-2 mb-4">
                      {demo.features.map((feature, i) => (
                        <li key={i} className="d-flex align-items-center gap-2 small text-secondary">
                          <i className="bi bi-check-circle-fill" style={{ color: iconColor, fontSize: "0.85rem" }}></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Link 
                    href={demo.href}
                    className={`btn ${btnClass} w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2`}
                    id={`btn-demo-${demo.id}`}
                  >
                    {demo.btnText} <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
