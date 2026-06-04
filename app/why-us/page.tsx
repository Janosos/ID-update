"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation, useLanguage } from "@/context/LanguageContext";

export default function WhyUsPage() {
  const t = useTranslation();
  const { language } = useLanguage();
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    // Start progress bar animation after a brief mount delay
    const timer = setTimeout(() => {
      setAnimateProgress(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-5 mt-4 min-vh-100 d-flex flex-column justify-content-between position-relative">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Animaciones de Fondo */
        @keyframes pulse-slow { 
          0%, 100% { opacity: 1; transform: scale(1); } 
          50% { opacity: 0.5; transform: scale(1.05); } 
        }
        .animate-pulse-slow { 
          animation: pulse-slow 6s infinite; 
        }

        /* Tarjetas de Características */
        .feature-card { 
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
          border: 1px solid transparent; 
        }
        .feature-card:hover { 
          transform: translateY(-5px); 
          border-color: rgba(20, 184, 166, 0.3) !important; 
          box-shadow: 0 10px 30px -10px rgba(20, 184, 166, 0.15) !important;
        }
        
        /* Bar glows */
        .glow-cyan {
          box-shadow: 0 0 10px rgba(20, 184, 166, 0.5);
        }
        .glow-blue {
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        .glow-purple {
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }

        /* Progress bars transition */
        .progress-bar-fill {
          height: 100%;
          transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .hover-grow-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-grow-btn:hover {
          transform: scale(1.02);
        }
      ` }} />

      {/* Header & Digital Impact Section */}
      <header className="position-relative py-5 overflow-hidden bg-grid border-bottom">
        <div 
          className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
          style={{ width: "350px", height: "350px", top: "10%", right: "10%", filter: "blur(100px)", zIndex: -1 }}
        ></div>
        
        <div className="container-xl px-4 py-5 z-10 position-relative">
          <div className="row align-items-center g-5 text-center text-lg-start">
            {/* Left side: Heading */}
            <div className="col-12 col-lg-7 d-flex flex-column gap-3">
              <span className="text-info text-sm font-bold uppercase tracking-wider">{t.whyUs.tag}</span>
              <h1 className="display-4 fw-bold text-body mt-2 leading-tight">
                {language === "es" ? (
                  <>Más que diseño, <br /><span className="text-gradient">Creamos Resultados</span></>
                ) : (
                  <>More than design, <br /><span className="text-gradient">We Create Results</span></>
                )}
              </h1>
              <p className="lead text-secondary mt-3 max-w-lg mx-auto mx-lg-0 leading-relaxed font-medium">
                {t.whyUs.subtitle}
              </p>
              <div className="mt-4 d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                <Link 
                  href="/#contacto" 
                  className="btn btn-info text-white font-bold px-4 py-3 rounded-3 hover-grow-btn shadow-sm"
                  style={{ background: "#14b8a6", borderColor: "#14b8a6" }}
                >
                  {t.whyUs.btnStart}
                </Link>
              </div>
            </div>
            
            {/* Right side: Digital Impact Graph card */}
            <div className="col-12 col-lg-5">
              <div className="glass-panel p-4 p-md-5 border border-info border-opacity-25 shadow-lg">
                <h3 className="h5 fw-bold text-body mb-4 d-flex align-items-center justify-content-center justify-content-lg-start gap-2">
                  <i className="bi bi-graph-up-arrow text-info"></i> {t.whyUs.impactTitle}
                </h3>
                
                <div className="d-flex flex-column gap-4">
                  {/* Metric 1 */}
                  <div>
                    <div className="d-flex justify-content-between text-sm mb-2 text-secondary fw-bold">
                      <span>{t.whyUs.metricLoad}</span>
                      <span className="text-info">99%</span>
                    </div>
                    <div className="inner-panel rounded-pill overflow-hidden border-0" style={{ height: "10px" }}>
                      <div 
                        className="progress-bar-fill bg-info rounded-pill glow-cyan" 
                        style={{ width: animateProgress ? "99%" : "0%" }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Metric 2 */}
                  <div>
                    <div className="d-flex justify-content-between text-sm mb-2 text-secondary fw-bold">
                      <span>{t.whyUs.metricSeo}</span>
                      <span className="text-primary">100%</span>
                    </div>
                    <div className="inner-panel rounded-pill overflow-hidden border-0" style={{ height: "10px" }}>
                      <div 
                        className="progress-bar-fill bg-primary rounded-pill glow-blue" 
                        style={{ width: animateProgress ? "100%" : "0%" }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Metric 3 */}
                  <div>
                    <div className="d-flex justify-content-between text-sm mb-2 text-secondary fw-bold">
                      <span>{t.whyUs.metricSatisf}</span>
                      <span className="text-purple-600 dark:text-purple-400">5.0 / 5</span>
                    </div>
                    <div className="inner-panel rounded-pill overflow-hidden border-0" style={{ height: "10px" }}>
                      <div 
                        className="progress-bar-fill bg-purple rounded-pill glow-purple" 
                        style={{ width: animateProgress ? "100%" : "0%", background: "#a855f7" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Grid Features Section */}
      <section className="py-5 my-5">
        <div className="container-xl px-4">
          <div className="text-center mb-5 max-w-2xl mx-auto">
            <h2 className="display-5 font-display fw-bold text-body mb-3">{t.whyUs.differentTitle}</h2>
            <p className="text-secondary font-medium">{t.whyUs.differentSubtitle}</p>
          </div>

          <div className="row g-4 pt-3">
            {/* Feature 1 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="glass-panel p-4 p-md-5 h-100 feature-card">
                <div 
                  className="rounded-4 bg-info bg-opacity-10 text-info d-flex align-items-center justify-content-center mb-4 border border-info border-opacity-10 shadow-sm"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="bi bi-brush fs-4"></i>
                </div>
                <h3 className="h5 fw-bold text-body mb-3">{t.whyUs.feat1Title}</h3>
                <p className="text-secondary small leading-relaxed font-medium m-0">
                  {t.whyUs.feat1Desc}
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="glass-panel p-4 p-md-5 h-100 feature-card">
                <div 
                  className="rounded-4 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center mb-4 border border-primary border-opacity-10 shadow-sm"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="bi bi-hand-index-thumb fs-4"></i>
                </div>
                <h3 className="h5 fw-bold text-body mb-3">{t.whyUs.feat2Title}</h3>
                <p className="text-secondary small leading-relaxed font-medium m-0">
                  {t.whyUs.feat2Desc}
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="glass-panel p-4 p-md-5 h-100 feature-card">
                <div 
                  className="rounded-4 bg-purple-100 text-purple d-flex align-items-center justify-content-center mb-4 border shadow-sm"
                  style={{ width: "50px", height: "50px", background: "rgba(168, 85, 247, 0.1)", color: "#a855f7" }}
                >
                  <i className="bi bi-search fs-4" style={{ color: "#a855f7" }}></i>
                </div>
                <h3 className="h5 fw-bold text-body mb-3">{t.whyUs.feat3Title}</h3>
                <p className="text-secondary small leading-relaxed font-medium m-0">
                  {t.whyUs.feat3Desc}
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="glass-panel p-4 p-md-5 h-100 feature-card">
                <div 
                  className="rounded-4 bg-danger bg-opacity-10 text-danger d-flex align-items-center justify-content-center mb-4 border border-danger border-opacity-10 shadow-sm"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="bi bi-phone fs-4"></i>
                </div>
                <h3 className="h5 fw-bold text-body mb-3">{t.whyUs.feat4Title}</h3>
                <p className="text-secondary small leading-relaxed font-medium m-0">
                  {t.whyUs.feat4Desc}
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="glass-panel p-4 p-md-5 h-100 feature-card">
                <div 
                  className="rounded-4 bg-warning bg-opacity-10 text-warning d-flex align-items-center justify-content-center mb-4 border border-warning border-opacity-10 shadow-sm"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="bi bi-lightning-charge fs-4"></i>
                </div>
                <h3 className="h5 fw-bold text-body mb-3">{t.whyUs.feat5Title}</h3>
                <p className="text-secondary small leading-relaxed font-medium m-0">
                  {t.whyUs.feat5Desc}
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="glass-panel p-4 p-md-5 h-100 feature-card">
                <div 
                  className="rounded-4 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center mb-4 border border-success border-opacity-10 shadow-sm"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="bi bi-headset fs-4"></i>
                </div>
                <h3 className="h5 fw-bold text-body mb-3">{t.whyUs.feat6Title}</h3>
                <p className="text-secondary small leading-relaxed font-medium m-0">
                  {t.whyUs.feat6Desc}
                </p>
              </div>
            </div>

            {/* Feature 7 - Double column */}
            <div className="col-12 col-lg-8">
              <div className="glass-panel p-4 p-md-5 h-100 feature-card">
                <div 
                  className="rounded-4 bg-warning bg-opacity-10 text-warning-emphasis d-flex align-items-center justify-content-center mb-4 border border-warning border-opacity-10 shadow-sm"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="bi bi-tags fs-4"></i>
                </div>
                <h3 className="h5 fw-bold text-body mb-3">{t.whyUs.feat7Title}</h3>
                <p className="text-secondary small leading-relaxed font-medium m-0">
                  {t.whyUs.feat7Desc}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="py-5 my-5 position-relative overflow-hidden" id="contacto">
        <div 
          className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 parallax-blob"
          style={{ width: "300px", height: "300px", top: "0", left: "calc(50% - 150px)", filter: "blur(100px)", zIndex: -1 }}
        ></div>
        
        <div className="container-xl px-4 text-center py-4 z-10 position-relative">
          <h2 className="display-5 font-display fw-bold mb-4">{t.whyUs.ctaTitle}</h2>
          <p className="lead text-secondary mb-5 max-w-xl mx-auto font-medium">
            {t.whyUs.ctaSubtitle}
          </p>
          
          <div className="max-w-md mx-auto p-4 p-md-5 rounded-4 shadow-lg border glass-panel">
            <p className="text-secondary mb-4 small fw-bold">
              {t.whyUs.ctaBoxTitle}
            </p>
            
            <a 
              href="https://wa.me/526623440716?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n%20o%20informaci%C3%B3n" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-whatsapp-cta"
            >
              <i className="bi bi-whatsapp"></i> {t.whyUs.ctaBtn}
            </a>
            
            <p className="text-muted small mt-3 mb-0">{t.whyUs.ctaBoxNote}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
