"use client";

import Link from "next/link";
import { useTranslation, useLanguage } from "@/context/LanguageContext";

export default function PrivacyPolicyPage() {
  const t = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="bg-grid py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden">
      <div 
        className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
        style={{ width: "350px", height: "350px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
      ></div>

      <div className="container-xl px-4 py-5 z-1">
        <header className="mb-5 border-bottom pb-4">
          <h1 className="display-4 fw-bold text-body mb-3 tracking-tight">{t.privacy.title}</h1>
          <p className="lead text-secondary max-w-3xl">
            {t.privacy.intro}
          </p>
        </header>

        <div className="row g-4 align-items-start">
          {/* Left Column: Sidebar Summary */}
          <div className="col-12 col-lg-4 position-sticky" style={{ top: "100px" }}>
            <div className="glass-panel p-4">
              <h3 className="h6 fw-bold text-info text-uppercase font-display mb-3 tracking-wider">{t.privacy.sidebarTitle}</h3>
              <p className="text-secondary small mb-4">
                {t.privacy.sidebarDesc}
              </p>
              <ul className="list-unstyled d-flex flex-column gap-3 small text-body m-0">
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-info"></i>
                  <span>{t.privacy.sidebarL1}</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-info"></i>
                  <span>{t.privacy.sidebarL2}</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-info"></i>
                  <span>{t.privacy.sidebarL3}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Policy Content */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-5">
            {/* Section 1 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">{t.privacy.sec1Title}</h2>
              <p className="text-secondary mb-3 leading-relaxed">
                {t.privacy.sec1Desc}
              </p>
              <div className="d-flex flex-wrap gap-2 pt-2">
                <span className="badge inner-panel text-body px-3 py-2 rounded">{t.privacy.sec1Badge1}</span>
                <span className="badge inner-panel text-body px-3 py-2 rounded">{t.privacy.sec1Badge2}</span>
                <span className="badge inner-panel text-body px-3 py-2 rounded">{t.privacy.sec1Badge3}</span>
                <span className="badge inner-panel text-body px-3 py-2 rounded">{t.privacy.sec1Badge4}</span>
              </div>
            </section>

            {/* Section 2 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">{t.privacy.sec2Title}</h2>
              <p className="text-secondary mb-4 leading-relaxed">
                {t.privacy.sec2Desc}
              </p>
              
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <div className="p-4 inner-panel h-100">
                    <i className="bi bi-code-square text-info fs-3 mb-3 d-block"></i>
                    <h4 className="h6 fw-bold text-body mb-2">{t.privacy.sec2Card1Title}</h4>
                    <p className="small text-secondary m-0">{t.privacy.sec2Card1Desc}</p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="p-4 inner-panel h-100">
                    <i className="bi bi-megaphone-fill text-info fs-3 mb-3 d-block"></i>
                    <h4 className="h6 fw-bold text-body mb-2">{t.privacy.sec2Card2Title}</h4>
                    <p className="small text-secondary m-0">{t.privacy.sec2Card2Desc}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 inner-panel">
                <p className="small text-secondary m-0">
                  <strong>{language === "en" ? "Note:" : "Nota:"}</strong> {t.privacy.sec2Note}
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">{t.privacy.sec3Title}</h2>
              <p className="text-secondary leading-relaxed">
                {t.privacy.sec3Desc}
              </p>
            </section>

            {/* Section 4 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">{t.privacy.sec4Title}</h2>
              <p className="text-secondary mb-4 leading-relaxed">
                {t.privacy.sec4Desc}
              </p>
              <div className="p-4 inner-panel">
                <p className="text-secondary small mb-3">{t.privacy.sec4Request}</p>
                <code className="bg-body text-info px-3 py-2 rounded border font-monospace">soporte@imperiodev.com</code>
              </div>
            </section>

            {/* Section 5 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">{t.privacy.sec5Title}</h2>
              <p className="text-secondary leading-relaxed">
                {t.privacy.sec5Desc}
              </p>
            </section>

            {/* Section 6 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">{t.privacy.sec6Title}</h2>
              <p className="text-secondary leading-relaxed">
                {t.privacy.sec6Desc}
              </p>
            </section>

            {/* Section 7 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">{t.privacy.sec7Title}</h2>
              <p className="text-secondary leading-relaxed">
                {t.privacy.sec7Desc}
              </p>
            </section>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-border-info {
          transition: border-color 0.2s ease;
        }
        .hover-border-info:hover {
          border-color: #14b8a6 !important;
        }
      `}</style>
    </div>
  );
}
