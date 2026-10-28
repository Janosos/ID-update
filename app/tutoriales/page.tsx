"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation, useLanguage } from "@/context/LanguageContext";

export default function TutorialsPage() {
  const t = useTranslation();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"products" | "shipping">("products");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Safe helper to format "Label: Description" lines
  const renderColonText = (text: string) => {
    if (!text) return null;
    const colonIndex = text.indexOf(":");
    if (colonIndex === -1) {
      return <span>{text}</span>;
    }
    const label = text.slice(0, colonIndex);
    const rest = text.slice(colonIndex + 1);
    return (
      <>
        <strong className="text-body">{label}:</strong> {rest}
      </>
    );
  };

  // WooCommerce Tutorial Pro Tips
  const proTips = [
    {
      icon: "bi-file-earmark-image",
      color: "#3b82f6",
      title: t.tutorials.prodTip1Title,
      desc: t.tutorials.prodTip1Desc,
    },
    {
      icon: "bi-aspect-ratio",
      color: "#10b981",
      title: t.tutorials.prodTip2Title,
      desc: t.tutorials.prodTip2Desc,
    },
    {
      icon: "bi-search",
      color: "#f59e0b",
      title: t.tutorials.prodTip3Title,
      desc: t.tutorials.prodTip3Desc,
    },
    {
      icon: "bi-tags",
      color: "#8b5cf6",
      title: t.tutorials.prodTip4Title,
      desc: t.tutorials.prodTip4Desc,
    },
  ];

  // Envia.com Pre-requisites
  const shipPrereqs = [
    {
      icon: "bi-person-check",
      color: "#3b82f6",
      title: t.tutorials.shipBefore1Title,
      desc: t.tutorials.shipBefore1Desc,
    },
    {
      icon: "bi-box-seam",
      color: "#10b981",
      title: t.tutorials.shipBefore2Title,
      desc: t.tutorials.shipBefore2Desc,
    },
    {
      icon: "bi-wallet2",
      color: "#f59e0b",
      title: t.tutorials.shipBefore3Title,
      desc: t.tutorials.shipBefore3Desc,
    },
  ];

  return (
    <div className="bg-grid py-4 py-md-5 min-vh-100 d-flex flex-column align-items-center position-relative w-100 overflow-hidden">
      {/* Background Glow Blobs */}
      <div 
        className="position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob d-none d-sm-block"
        style={{ width: "min(400px, 80vw)", height: "min(400px, 80vw)", top: "5%", left: "5%", filter: "blur(120px)", zIndex: 0 }}
      ></div>
      <div 
        className="position-absolute bg-primary rounded-circle blur-3xl opacity-10 animate-pulse-slow delay-1000 parallax-blob d-none d-sm-block"
        style={{ width: "min(400px, 80vw)", height: "min(400px, 80vw)", bottom: "10%", right: "5%", filter: "blur(120px)", zIndex: 0 }}
      ></div>

      <div className="container-xl px-3 px-sm-4 py-2 py-md-4 position-relative z-1 w-100">
        {/* Page Header */}
        <header className="text-center mb-4 mb-md-5 mx-auto" style={{ maxWidth: "720px" }}>
          <h1 className="tutorials-title fw-bold text-body mt-2 mb-3 font-display">
            {language === "es" ? (
              <>Centro de <span className="text-gradient">Tutoriales</span></>
            ) : (
              <>Tutorials <span className="text-gradient">Center</span></>
            )}
          </h1>
          <p className="lead text-secondary mx-auto mb-0" style={{ maxWidth: "620px" }}>
            {t.tutorials.subtitle}
          </p>
        </header>

        {/* Tab Selector Controls */}
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-stretch gap-2 gap-sm-3 mb-4 mb-md-5 mx-auto w-100" style={{ maxWidth: "700px" }}>
          <button
            onClick={() => setActiveTab("products")}
            className={`tutorial-tab-btn transition-all ${
              activeTab === "products" 
                ? "tab-btn-active shadow-lg" 
                : "tab-btn-inactive"
            }`}
            id="tab-btn-products"
            type="button"
          >
            <i className="bi bi-box-seam-fill fs-5 flex-shrink-0"></i>
            <span className="tab-btn-text">{t.tutorials.tabProducts}</span>
          </button>
          
          <button
            onClick={() => setActiveTab("shipping")}
            className={`tutorial-tab-btn transition-all ${
              activeTab === "shipping" 
                ? "tab-btn-active shadow-lg" 
                : "tab-btn-inactive"
            }`}
            id="tab-btn-shipping"
            type="button"
          >
            <i className="bi bi-truck fs-5 flex-shrink-0"></i>
            <span className="tab-btn-text">{t.tutorials.tabShipping}</span>
          </button>
        </div>

        {/* Guides Content Section */}
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">

            {/* =========================================================================
                TAB 1: WOOCOMMERCE PRODUCT MANAGEMENT (13 STEPS + PRO TIPS)
            ========================================================================= */}
            {activeTab === "products" && (
              <div className="glass-panel p-3 p-sm-4 p-md-5 fade-in-up" style={{ background: "var(--card-bg)" }}>
                {/* Tutorial Header */}
                <div className="border-bottom border-secondary border-opacity-20 pb-3 pb-sm-4 mb-4 mb-md-5">
                  <div className="guide-header-box">
                    <div className="guide-icon-box bg-primary bg-opacity-10 text-primary shadow-sm">
                      <i className="bi bi-bag-plus-fill"></i>
                    </div>
                    <div className="min-w-0 flex-grow-1">
                      <span className="guide-badge guide-badge-primary">
                        WooCommerce Guide
                      </span>
                      <h2 className="guide-title font-display">{t.tutorials.prodTitle}</h2>
                    </div>
                  </div>
                  <p className="lead text-secondary m-0" style={{ fontSize: "clamp(0.95rem, 2.8vw, 1.15rem)" }}>
                    {t.tutorials.prodSubtitle}
                  </p>
                </div>

                {/* Pro Tips Banner */}
                <div className="mb-4 mb-md-5 p-3 p-sm-4 rounded-4 bg-body-tertiary border border-secondary border-opacity-20 shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <h3 className="h5 fw-bold text-body m-0 font-display tracking-tight">{t.tutorials.prodTipsTitle}</h3>
                  </div>
                  <div className="row g-3">
                    {proTips.map((tip, idx) => (
                      <div key={idx} className="col-12 col-md-6">
                        <div className="p-3 rounded-3 h-100 bg-body bg-opacity-50 border border-secondary border-opacity-10 d-flex gap-3 align-items-start">
                          <div 
                            className="rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{ backgroundColor: `${tip.color}15`, color: tip.color, width: "36px", height: "36px" }}
                          >
                            <i className={`bi ${tip.icon}`}></i>
                          </div>
                          <div>
                            <h4 className="h6 fw-bold text-body mb-1">{tip.title}</h4>
                            <p className="small text-secondary m-0 leading-relaxed">{tip.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phase 1: Lo Básico */}
                <div className="mb-4 mb-md-5">
                  <div className="d-flex align-items-center gap-2 mb-4 pb-2 border-bottom border-secondary border-opacity-15">
                    <span className="phase-badge phase-badge-1">Fase 1</span>
                    <h3 className="h5 fw-bold text-body m-0 font-display">Lo Básico</h3>
                  </div>

                  {/* Step 1 */}
                  <div className="step-card position-relative p-3 p-sm-4 rounded-4 mb-4 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                    <div className="step-watermark font-display">01</div>
                    <div className="position-relative z-1">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="step-badge">01</div>
                        <h4 className="h5 fw-bold text-body m-0 font-display">{t.tutorials.prodStep1Title}</h4>
                      </div>
                      <p className="text-secondary mb-3">{t.tutorials.prodStep1Desc1}</p>
                      <ul className="d-flex flex-column gap-2 text-secondary ps-3 mb-4">
                        <li>{t.tutorials.prodStep1L1}</li>
                        <li>{t.tutorials.prodStep1L2}</li>
                      </ul>

                      {/* Screenshot 1 */}
                      <div 
                        className="image-container rounded-3 overflow-hidden border border-secondary border-opacity-20 shadow-sm cursor-pointer position-relative group"
                        onClick={() => setSelectedImage("https://www.imperiodev.com/wp-content/uploads/2026/05/1.png")}
                      >
                        <img 
                          src="https://www.imperiodev.com/wp-content/uploads/2026/05/1.png" 
                          alt="Acceso al menú de WordPress" 
                          className="img-fluid w-100 object-fit-contain transition-all"
                          style={{ maxHeight: "380px" }}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="image-overlay d-flex align-items-center justify-content-center">
                          <span className="badge bg-dark bg-opacity-75 text-white px-3 py-2 rounded-pill shadow d-flex align-items-center gap-2">
                            <i className="bi bi-zoom-in"></i> Clic para ampliar
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="step-card position-relative p-3 p-sm-4 rounded-4 mb-4 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                    <div className="step-watermark font-display">02</div>
                    <div className="position-relative z-1">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="step-badge">02</div>
                        <h4 className="h5 fw-bold text-body m-0 font-display">{t.tutorials.prodStep2Title}</h4>
                      </div>
                      <p className="text-secondary mb-4">{t.tutorials.prodStep2Desc1}</p>

                      {/* Screenshot 2 */}
                      <div 
                        className="image-container rounded-3 overflow-hidden border border-secondary border-opacity-20 shadow-sm cursor-pointer position-relative group"
                        onClick={() => setSelectedImage("https://www.imperiodev.com/wp-content/uploads/2026/05/3.png")}
                      >
                        <img 
                          src="https://www.imperiodev.com/wp-content/uploads/2026/05/3.png" 
                          alt="Botón Añadir Nuevo Producto" 
                          className="img-fluid w-100 object-fit-contain transition-all"
                          style={{ maxHeight: "380px" }}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="image-overlay d-flex align-items-center justify-content-center">
                          <span className="badge bg-dark bg-opacity-75 text-white px-3 py-2 rounded-pill shadow d-flex align-items-center gap-2">
                            <i className="bi bi-zoom-in"></i> Clic para ampliar
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="step-card position-relative p-3 p-sm-4 rounded-4 mb-4 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                    <div className="step-watermark font-display">03</div>
                    <div className="position-relative z-1">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="step-badge">03</div>
                        <h4 className="h5 fw-bold text-body m-0 font-display">{t.tutorials.prodStep3Title}</h4>
                      </div>
                      <p className="text-secondary mb-3">{t.tutorials.prodStep3Desc1}</p>
                      <ul className="d-flex flex-column gap-2 text-secondary ps-3 mb-4">
                        <li>{t.tutorials.prodStep3L1}</li>
                        <li>{t.tutorials.prodStep3L2}</li>
                      </ul>

                      {/* Screenshot 3 */}
                      <div 
                        className="image-container rounded-3 overflow-hidden border border-secondary border-opacity-20 shadow-sm cursor-pointer position-relative group mb-4"
                        onClick={() => setSelectedImage("https://www.imperiodev.com/wp-content/uploads/2026/05/4.png")}
                      >
                        <img 
                          src="https://www.imperiodev.com/wp-content/uploads/2026/05/4.png" 
                          alt="Campo de título y descripción" 
                          className="img-fluid w-100 object-fit-contain transition-all"
                          style={{ maxHeight: "380px" }}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="image-overlay d-flex align-items-center justify-content-center">
                          <span className="badge bg-dark bg-opacity-75 text-white px-3 py-2 rounded-pill shadow d-flex align-items-center gap-2">
                            <i className="bi bi-zoom-in"></i> Clic para ampliar
                          </span>
                        </div>
                      </div>

                      {/* Callout: Descripción Corta */}
                      <div className="alert alert-info border-info-subtle bg-info bg-opacity-10 text-info-emphasis p-3 rounded-3 d-flex gap-3 align-items-start m-0">
                        <i className="bi bi-info-circle-fill fs-4 flex-shrink-0 text-info mt-0.5"></i>
                        <div>
                          <h5 className="h6 fw-bold mb-1 text-body">{t.tutorials.prodShortDescTitle}</h5>
                          <p className="small m-0 text-secondary leading-relaxed">
                            {t.tutorials.prodShortDescText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 2: Datos del Producto */}
                <div className="mb-4 mb-md-5">
                  <div className="d-flex align-items-center gap-2 mb-4 pb-2 border-bottom border-secondary border-opacity-15">
                    <span className="phase-badge phase-badge-2">Fase 2</span>
                    <h3 className="h5 fw-bold text-body m-0 font-display">Datos del Producto</h3>
                  </div>

                  {/* Step 4 */}
                  <div className="step-card position-relative p-3 p-sm-4 rounded-4 mb-4 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                    <div className="step-watermark font-display">04</div>
                    <div className="position-relative z-1">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="step-badge">04</div>
                        <h4 className="h5 fw-bold text-body m-0 font-display">{t.tutorials.prodStep4Title}</h4>
                      </div>
                      <p className="text-secondary mb-3">{t.tutorials.prodStep4Desc1}</p>
                      <ul className="d-flex flex-column gap-2 text-secondary ps-3 mb-4">
                        <li>{t.tutorials.prodStep4L1}</li>
                        <li>{t.tutorials.prodStep4L2}</li>
                      </ul>

                      {/* Screenshot 4 */}
                      <div 
                        className="image-container rounded-3 overflow-hidden border border-secondary border-opacity-20 shadow-sm cursor-pointer position-relative group mb-4"
                        onClick={() => setSelectedImage("https://www.imperiodev.com/wp-content/uploads/2026/05/5.png")}
                      >
                        <img 
                          src="https://www.imperiodev.com/wp-content/uploads/2026/05/5.png" 
                          alt="Caja de Datos del producto" 
                          className="img-fluid w-100 object-fit-contain transition-all"
                          style={{ maxHeight: "380px" }}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="image-overlay d-flex align-items-center justify-content-center">
                          <span className="badge bg-dark bg-opacity-75 text-white px-3 py-2 rounded-pill shadow d-flex align-items-center gap-2">
                            <i className="bi bi-zoom-in"></i> Clic para ampliar
                          </span>
                        </div>
                      </div>

                      {/* Callout: Producto Variable */}
                      <div className="alert alert-warning border-warning-subtle bg-warning bg-opacity-10 text-warning-emphasis p-3 rounded-3 d-flex gap-3 align-items-start m-0">
                        <i className="bi bi-palette-fill fs-4 flex-shrink-0 text-warning mt-0.5"></i>
                        <div>
                          <h5 className="h6 fw-bold mb-1 text-body">{t.tutorials.prodVariableTitle}</h5>
                          <p className="small m-0 text-secondary leading-relaxed">
                            {t.tutorials.prodVariableText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 3: Variaciones (Tallas/Colores) */}
                <div className="mb-4 mb-md-5">
                  <div className="d-flex align-items-center gap-2 mb-4 pb-2 border-bottom border-secondary border-opacity-15">
                    <span className="phase-badge phase-badge-3">Fase 3</span>
                    <h3 className="h5 fw-bold text-body m-0 font-display">Variaciones (Tallas y Colores)</h3>
                  </div>

                  <div className="row g-3">
                    {/* Step 5 */}
                    <div className="col-12 col-md-6">
                      <div className="step-card position-relative p-3 p-sm-4 rounded-4 h-100 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                        <div className="step-watermark font-display">05</div>
                        <div className="position-relative z-1">
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <div className="step-badge">05</div>
                            <h4 className="h6 fw-bold text-body m-0 font-display">{t.tutorials.prodStep5Title}</h4>
                          </div>
                          <p className="small text-secondary m-0 leading-relaxed">{t.tutorials.prodStep5Desc1}</p>
                        </div>
                      </div>
                    </div>

                    {/* Step 6 */}
                    <div className="col-12 col-md-6">
                      <div className="step-card position-relative p-3 p-sm-4 rounded-4 h-100 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                        <div className="step-watermark font-display">06</div>
                        <div className="position-relative z-1">
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <div className="step-badge">06</div>
                            <h4 className="h6 fw-bold text-body m-0 font-display">{t.tutorials.prodStep6Title}</h4>
                          </div>
                          <p className="small text-secondary m-0 leading-relaxed">{t.tutorials.prodStep6Desc1}</p>
                        </div>
                      </div>
                    </div>

                    {/* Step 7 */}
                    <div className="col-12 col-md-6">
                      <div className="step-card position-relative p-3 p-sm-4 rounded-4 h-100 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                        <div className="step-watermark font-display">07</div>
                        <div className="position-relative z-1">
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <div className="step-badge">07</div>
                            <h4 className="h6 fw-bold text-body m-0 font-display">{t.tutorials.prodStep7Title}</h4>
                          </div>
                          <p className="small text-secondary m-0 leading-relaxed">{t.tutorials.prodStep7Desc1}</p>
                        </div>
                      </div>
                    </div>

                    {/* Step 8 */}
                    <div className="col-12 col-md-6">
                      <div className="step-card position-relative p-3 p-sm-4 rounded-4 h-100 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                        <div className="step-watermark font-display">08</div>
                        <div className="position-relative z-1">
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <div className="step-badge">08</div>
                            <h4 className="h6 fw-bold text-body m-0 font-display">{t.tutorials.prodStep8Title}</h4>
                          </div>
                          <p className="small text-secondary m-0 leading-relaxed">{t.tutorials.prodStep8Desc1}</p>
                        </div>
                      </div>
                    </div>

                    {/* Step 9 */}
                    <div className="col-12 col-md-6">
                      <div className="step-card position-relative p-3 p-sm-4 rounded-4 h-100 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                        <div className="step-watermark font-display">09</div>
                        <div className="position-relative z-1">
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <div className="step-badge">09</div>
                            <h4 className="h6 fw-bold text-body m-0 font-display">{t.tutorials.prodStep9Title}</h4>
                          </div>
                          <p className="small text-secondary m-0 leading-relaxed">{t.tutorials.prodStep9Desc1}</p>
                        </div>
                      </div>
                    </div>

                    {/* Step 10 */}
                    <div className="col-12 col-md-6">
                      <div className="step-card position-relative p-3 p-sm-4 rounded-4 h-100 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                        <div className="step-watermark font-display">10</div>
                        <div className="position-relative z-1">
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <div className="step-badge">10</div>
                            <h4 className="h6 fw-bold text-body m-0 font-display">{t.tutorials.prodStep10Title}</h4>
                          </div>
                          <p className="small text-secondary m-0 leading-relaxed">{t.tutorials.prodStep10Desc1}</p>
                        </div>
                      </div>
                    </div>

                    {/* Step 11 */}
                    <div className="col-12">
                      <div className="step-card position-relative p-3 p-sm-4 rounded-4 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                        <div className="step-watermark font-display">11</div>
                        <div className="position-relative z-1">
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <div className="step-badge">11</div>
                            <h4 className="h6 fw-bold text-body m-0 font-display">{t.tutorials.prodStep11Title}</h4>
                          </div>
                          <p className="small text-secondary m-0 leading-relaxed">{t.tutorials.prodStep11Desc1}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 4: Detalles Finales y Publicar */}
                <div>
                  <div className="d-flex align-items-center gap-2 mb-4 pb-2 border-bottom border-secondary border-opacity-15">
                    <span className="phase-badge phase-badge-4">Fase 4</span>
                    <h3 className="h5 fw-bold text-body m-0 font-display">Detalles Finales y Publicación</h3>
                  </div>

                  {/* Step 12 */}
                  <div className="step-card position-relative p-3 p-sm-4 rounded-4 mb-4 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                    <div className="step-watermark font-display">12</div>
                    <div className="position-relative z-1">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="step-badge">12</div>
                        <h4 className="h5 fw-bold text-body m-0 font-display">{t.tutorials.prodStep12Title}</h4>
                      </div>
                      <p className="text-secondary mb-3">{t.tutorials.prodStep12Desc1}</p>
                      <ul className="d-flex flex-column gap-2 text-secondary ps-3 m-0">
                        <li>{renderColonText(t.tutorials.prodStep12L1)}</li>
                        <li>{renderColonText(t.tutorials.prodStep12L2)}</li>
                        <li>{renderColonText(t.tutorials.prodStep12L3)}</li>
                      </ul>
                    </div>
                  </div>

                  {/* Step 13 */}
                  <div className="step-card position-relative p-3 p-sm-4 rounded-4 border border-success border-opacity-30 bg-success bg-opacity-5">
                    <div className="step-watermark font-display text-success">13</div>
                    <div className="position-relative z-1">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="step-badge" style={{ background: "#10b981" }}>13</div>
                        <h4 className="h5 fw-bold text-body m-0 font-display">{t.tutorials.prodStep13Title}</h4>
                      </div>
                      <p className="text-secondary m-0 leading-relaxed">{t.tutorials.prodStep13Desc1}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 2: ENVIA.COM SHIPPING CONFIGURATION (6 STEPS + LOGISTICS RULES)
            ========================================================================= */}
            {activeTab === "shipping" && (
              <div className="glass-panel p-3 p-sm-4 p-md-5 fade-in-up" style={{ background: "var(--card-bg)" }}>
                {/* Tutorial Header */}
                <div className="border-bottom border-secondary border-opacity-20 pb-3 pb-sm-4 mb-4 mb-md-5">
                  <div className="guide-header-box">
                    <div className="guide-icon-box bg-info bg-opacity-10 text-info shadow-sm">
                      <i className="bi bi-truck-flatbed"></i>
                    </div>
                    <div className="min-w-0 flex-grow-1">
                      <span className="guide-badge guide-badge-info">
                        Shipping & Logistics Guide
                      </span>
                      <h2 className="guide-title font-display">{t.tutorials.shipTitle}</h2>
                    </div>
                  </div>
                  <p className="lead text-secondary m-0" style={{ fontSize: "clamp(0.95rem, 2.8vw, 1.15rem)" }}>
                    {t.tutorials.shipSubtitle}
                  </p>
                </div>

                {/* Pre-requisites Banner */}
                <div className="mb-4 mb-md-5 p-3 p-sm-4 rounded-4 bg-body-tertiary border border-secondary border-opacity-20 shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-clipboard-check text-info fs-4"></i>
                    <h3 className="h5 fw-bold text-body m-0 font-display tracking-tight">{t.tutorials.shipBeforeTitle}</h3>
                  </div>
                  <div className="row g-3">
                    {shipPrereqs.map((item, idx) => (
                      <div key={idx} className="col-12 col-md-4">
                        <div className="p-3 rounded-3 h-100 bg-body bg-opacity-50 border border-secondary border-opacity-10 d-flex gap-3 align-items-start">
                          <div 
                            className="rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{ backgroundColor: `${item.color}15`, color: item.color, width: "36px", height: "36px" }}
                          >
                            <i className={`bi ${item.icon}`}></i>
                          </div>
                          <div>
                            <h4 className="h6 fw-bold text-body mb-1">{item.title}</h4>
                            <p className="small text-secondary m-0 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 1 */}
                <div className="step-card position-relative p-3 p-sm-4 rounded-4 mb-4 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                  <div className="step-watermark font-display">01</div>
                  <div className="position-relative z-1">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="step-badge">01</div>
                      <h4 className="h5 fw-bold text-body m-0 font-display">{t.tutorials.shipStep1Title}</h4>
                    </div>
                    <p className="text-secondary mb-3">{t.tutorials.shipStep1Desc1}</p>
                    <ul className="d-flex flex-column gap-2 text-secondary ps-3 m-0">
                      <li>{t.tutorials.shipStep1L1}</li>
                      <li>{t.tutorials.shipStep1L2}</li>
                      <li>{t.tutorials.shipStep1L3}</li>
                      <li>{t.tutorials.shipStep1L4}</li>
                    </ul>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="step-card position-relative p-3 p-sm-4 rounded-4 mb-4 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                  <div className="step-watermark font-display">02</div>
                  <div className="position-relative z-1">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="step-badge">02</div>
                      <h4 className="h5 fw-bold text-body m-0 font-display">{t.tutorials.shipStep2Title}</h4>
                    </div>
                    <p className="text-secondary mb-3">{t.tutorials.shipStep2Desc1}</p>
                    <ul className="d-flex flex-column gap-2 text-secondary ps-3 m-0">
                      <li>{t.tutorials.shipStep2L1}</li>
                      <li>{t.tutorials.shipStep2L2}</li>
                      <li>{t.tutorials.shipStep2L3}</li>
                      <li>{t.tutorials.shipStep2L4}</li>
                    </ul>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="step-card position-relative p-3 p-sm-4 rounded-4 mb-4 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                  <div className="step-watermark font-display">03</div>
                  <div className="position-relative z-1">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="step-badge">03</div>
                      <h4 className="h5 fw-bold text-body m-0 font-display">{t.tutorials.shipStep3Title}</h4>
                    </div>
                    <p className="text-secondary mb-3">{t.tutorials.shipStep3Desc1}</p>
                    <ul className="d-flex flex-column gap-2 text-secondary ps-3 mb-3">
                      <li>{t.tutorials.shipStep3L1}</li>
                      <li>{t.tutorials.shipStep3L2}</li>
                      <li>{t.tutorials.shipStep3L3}</li>
                    </ul>
                    <div className="alert alert-info border-info-subtle bg-info bg-opacity-10 text-info-emphasis p-3 rounded-3 m-0 small">
                      <i className="bi bi-lightbulb-fill text-info me-2"></i>
                      {t.tutorials.shipStep3Tip}
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="step-card position-relative p-3 p-sm-4 rounded-4 mb-4 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                  <div className="step-watermark font-display">04</div>
                  <div className="position-relative z-1">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="step-badge">04</div>
                      <h4 className="h5 fw-bold text-body m-0 font-display">{t.tutorials.shipStep4Title}</h4>
                    </div>
                    <p className="text-secondary mb-3">{t.tutorials.shipStep4Desc1}</p>
                    <ul className="d-flex flex-column gap-2 text-secondary ps-3 mb-4">
                      <li>{t.tutorials.shipStep4L1}</li>
                      <li>{t.tutorials.shipStep4L2}</li>
                      <li>{t.tutorials.shipStep4L3}</li>
                    </ul>

                    {/* Callout: WooCommerce Shipping Settings */}
                    <div className="alert alert-primary border-primary-subtle bg-primary bg-opacity-10 text-primary-emphasis p-3 rounded-3 d-flex gap-3 align-items-start m-0">
                      <i className="bi bi-sliders fs-4 flex-shrink-0 text-primary mt-0.5"></i>
                      <div>
                        <h5 className="h6 fw-bold mb-1 text-body">{t.tutorials.shipWooSettingsTitle}</h5>
                        <p className="small m-0 text-secondary leading-relaxed">
                          {t.tutorials.shipWooSettingsText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="step-card position-relative p-3 p-sm-4 rounded-4 mb-4 border border-secondary border-opacity-15 bg-body bg-opacity-40">
                  <div className="step-watermark font-display">05</div>
                  <div className="position-relative z-1">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="step-badge">05</div>
                      <h4 className="h5 fw-bold text-body m-0 font-display">{t.tutorials.shipStep5Title}</h4>
                    </div>
                    <p className="text-secondary mb-3">{t.tutorials.shipStep5Desc1}</p>
                    <ul className="d-flex flex-column gap-2 text-secondary ps-3 mb-4">
                      <li>{t.tutorials.shipStep5L1}</li>
                      <li>{t.tutorials.shipStep5L2}</li>
                      <li>{t.tutorials.shipStep5L3}</li>
                      <li>{t.tutorials.shipStep5L4}</li>
                      <li>{t.tutorials.shipStep5L5}</li>
                      <li>{t.tutorials.shipStep5L6}</li>
                    </ul>

                    {/* Golden Rule Alert */}
                    <div className="alert alert-warning border-warning-subtle bg-warning bg-opacity-10 text-warning-emphasis p-3 p-sm-4 rounded-3 d-flex gap-3 align-items-start m-0 shadow-sm">
                      <i className="bi bi-exclamation-triangle-fill fs-3 flex-shrink-0 text-warning mt-1"></i>
                      <div>
                        <h5 className="h6 fw-bold mb-1 text-body">{t.tutorials.shipGoldRuleTitle}</h5>
                        <p className="small m-0 text-secondary leading-relaxed">
                          {t.tutorials.shipGoldRuleDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 6: International Shipping */}
                <div className="step-card position-relative p-3 p-sm-4 rounded-4 border border-info border-opacity-25 bg-body bg-opacity-40">
                  <div className="step-watermark font-display">06</div>
                  <div className="position-relative z-1">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="step-badge">06</div>
                      <h4 className="h5 fw-bold text-body m-0 font-display">{t.tutorials.shipStep6Title}</h4>
                    </div>
                    <p className="text-secondary mb-3">{t.tutorials.shipStep6Desc1}</p>
                    <ul className="d-flex flex-column gap-2 text-secondary ps-3 m-0">
                      <li>{renderColonText(t.tutorials.shipStep6L1)}</li>
                      <li>{renderColonText(t.tutorials.shipStep6L2)}</li>
                      <li>{renderColonText(t.tutorials.shipStep6L3)}</li>
                      <li>{renderColonText(t.tutorials.shipStep6L4)}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Support CTA */}
            <div className="glass-panel p-4 p-md-5 mt-4 mt-md-5 text-center rounded-4 border border-secondary border-opacity-20 d-flex flex-column align-items-center justify-content-center">
              <div className="rounded-circle bg-info bg-opacity-10 text-info p-3 mb-3 fs-3">
                <i className="bi bi-headset"></i>
              </div>
              <h3 className="h4 fw-bold text-body mb-2 font-display">
                {language === "es" ? "¿Necesitas ayuda personalizada?" : "Need personalized assistance?"}
              </h3>
              <p className="text-secondary small mb-4 mx-auto" style={{ maxWidth: "540px" }}>
                {language === "es" 
                  ? "Si tienes dudas con alguna configuración de tu tienda o necesitas soporte adicional, nuestro equipo está listo para ayudarte."
                  : "If you have questions about any configuration or need additional support, our team is ready to assist you."}
              </p>
              <Link 
                href="/enlaces" 
                className="btn btn-info text-white fw-bold px-4 py-2.5 rounded-3 d-inline-flex align-items-center justify-content-center gap-2 shadow w-100 w-sm-auto"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #2563eb)", borderColor: "#2563eb", maxWidth: "320px" }}
              >
                <i className="bi bi-whatsapp"></i>
                <span>{language === "es" ? "Contactar a Soporte" : "Contact Support"}</span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Image Lightbox / Modal */}
      {selectedImage && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-2 p-sm-4 p-md-5"
          style={{ backgroundColor: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)", zIndex: 99999 }}
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="btn btn-dark position-absolute top-0 end-0 m-3 m-sm-4 rounded-circle p-2 d-flex align-items-center justify-content-center shadow-lg border border-secondary border-opacity-30"
            style={{ width: "42px", height: "42px", zIndex: 100000 }}
            onClick={() => setSelectedImage(null)}
            aria-label="Cerrar vista previa"
          >
            <i className="bi bi-x-lg fs-5"></i>
          </button>
          <div 
            className="position-relative overflow-hidden rounded-4 shadow-2xl border border-secondary border-opacity-30 bg-body p-2"
            style={{ maxWidth: "min(1100px, 95vw)", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Screenshot Preview" 
              className="img-fluid rounded-3 object-fit-contain w-100"
              style={{ maxHeight: "calc(90vh - 20px)" }}
            />
          </div>
        </div>
      )}

      {/* Custom Styles for Tutorials */}
      <style jsx>{`
        .tutorials-title {
          font-size: clamp(2rem, 5vw, 3.25rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .guide-header-box {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 0.85rem;
        }

        .guide-icon-box {
          width: 48px;
          height: 48px;
          min-width: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
          flex-shrink: 0;
        }

        @media (min-width: 576px) {
          .guide-header-box {
            gap: 1.15rem;
            margin-bottom: 1rem;
          }
          .guide-icon-box {
            width: 58px;
            height: 58px;
            min-width: 58px;
            border-radius: 16px;
            font-size: 1.75rem;
          }
        }

        .guide-title {
          font-size: clamp(1.2rem, 4.5vw, 1.85rem);
          font-weight: 800;
          line-height: 1.15;
          margin: 0;
          color: var(--bs-body-color);
          word-break: break-word;
        }

        .guide-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          margin-bottom: 0.25rem;
          line-height: 1.2;
        }

        .guide-badge-primary {
          background-color: rgba(37, 99, 235, 0.12) !important;
          color: #2563eb !important;
          border: 1px solid rgba(37, 99, 235, 0.25) !important;
        }
        :global(html.dark) .guide-badge-primary {
          background-color: rgba(59, 130, 246, 0.2) !important;
          color: #60a5fa !important;
          border-color: rgba(96, 165, 250, 0.35) !important;
        }

        .guide-badge-info {
          background-color: rgba(14, 165, 233, 0.12) !important;
          color: #0284c7 !important;
          border: 1px solid rgba(14, 165, 233, 0.25) !important;
        }
        :global(html.dark) .guide-badge-info {
          background-color: rgba(14, 165, 233, 0.2) !important;
          color: #38bdf8 !important;
          border-color: rgba(56, 189, 248, 0.35) !important;
        }

        .phase-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.35rem 0.9rem;
          font-size: 0.8rem;
          font-weight: 800;
          border-radius: 50rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          line-height: 1;
        }

        .phase-badge-1 {
          background-color: rgba(14, 165, 233, 0.15) !important;
          color: #0284c7 !important;
          border: 1px solid rgba(14, 165, 233, 0.35) !important;
        }
        :global(html.dark) .phase-badge-1 {
          background-color: rgba(14, 165, 233, 0.22) !important;
          color: #38bdf8 !important;
          border-color: rgba(56, 189, 248, 0.4) !important;
        }

        .phase-badge-2 {
          background-color: rgba(16, 185, 129, 0.15) !important;
          color: #059669 !important;
          border: 1px solid rgba(16, 185, 129, 0.35) !important;
        }
        :global(html.dark) .phase-badge-2 {
          background-color: rgba(16, 185, 129, 0.22) !important;
          color: #34d399 !important;
          border-color: rgba(52, 211, 153, 0.4) !important;
        }

        .phase-badge-3 {
          background-color: rgba(245, 158, 11, 0.15) !important;
          color: #d97706 !important;
          border: 1px solid rgba(245, 158, 11, 0.35) !important;
        }
        :global(html.dark) .phase-badge-3 {
          background-color: rgba(245, 158, 11, 0.22) !important;
          color: #fbbf24 !important;
          border-color: rgba(251, 191, 36, 0.4) !important;
        }

        .phase-badge-4 {
          background-color: rgba(99, 102, 241, 0.15) !important;
          color: #4f46e5 !important;
          border: 1px solid rgba(99, 102, 241, 0.35) !important;
        }
        :global(html.dark) .phase-badge-4 {
          background-color: rgba(99, 102, 241, 0.22) !important;
          color: #818cf8 !important;
          border-color: rgba(129, 140, 248, 0.4) !important;
        }

        .step-card {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .step-card:hover {
          border-color: rgba(14, 165, 233, 0.4) !important;
          transform: translateY(-2px);
        }

        .step-watermark {
          position: absolute;
          top: 0.25rem;
          right: 0.85rem;
          font-size: clamp(2.5rem, 6vw, 3.6rem);
          font-weight: 900;
          line-height: 1;
          opacity: 0.05;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        :global(html.dark) .step-watermark {
          opacity: 0.08;
        }

        .step-badge {
          width: 36px;
          height: 36px;
          min-width: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #0ea5e9, #2563eb);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.9rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.25);
        }

        .tutorial-tab-btn {
          width: 100%;
          padding: 0.85rem 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          border-radius: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          box-sizing: border-box;
          text-align: center;
          border: 1px solid transparent;
          text-decoration: none;
        }

        .tab-btn-text {
          font-size: clamp(0.82rem, 3.4vw, 0.98rem);
          line-height: 1.25;
          word-break: normal;
          display: inline-block;
        }

        .tab-btn-active {
          background: linear-gradient(135deg, #0ea5e9, #2563eb) !important;
          color: #ffffff !important;
          border: 1px solid #2563eb !important;
          box-shadow: 0 4px 18px rgba(14, 165, 233, 0.35);
        }

        .tab-btn-inactive {
          background: rgba(15, 23, 42, 0.04) !important;
          color: #0f172a !important;
          border: 1px solid rgba(15, 23, 42, 0.12) !important;
        }
        :global(html.dark) .tab-btn-inactive {
          background: rgba(255, 255, 255, 0.04) !important;
          color: #f8fafc !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
        }

        .tab-btn-inactive:hover {
          background: rgba(15, 23, 42, 0.08) !important;
          border-color: rgba(14, 165, 233, 0.4) !important;
        }
        :global(html.dark) .tab-btn-inactive:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(56, 189, 248, 0.4) !important;
        }

        @media (min-width: 576px) {
          .tutorial-tab-btn {
            flex: 1 1 0px;
            padding: 0.9rem 1.25rem;
          }
        }

        .image-container {
          background-color: var(--bs-body-bg);
          transition: all 0.3s ease;
        }

        .image-container:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.3) !important;
        }

        .image-container .image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .image-container:hover .image-overlay {
          opacity: 1;
        }

        .cursor-pointer {
          cursor: pointer;
        }

        .leading-relaxed {
          line-height: 1.7;
        }

        @media (max-width: 576px) {
          .step-card {
            padding: 1rem !important;
          }
          .step-badge {
            width: 32px;
            height: 32px;
            min-width: 32px;
            font-size: 0.8rem;
          }
          .image-container img {
            max-height: 240px !important;
          }
        }

        @media (max-width: 380px) {
          .tutorial-tab-btn {
            padding: 0.7rem 0.75rem;
            gap: 0.45rem;
          }
          .tab-btn-text {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
