"use client";

import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function TermsAndConditionsPage() {
  const t = useTranslation();

  return (
    <div className="bg-grid py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden">
      <div 
        className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
        style={{ width: "350px", height: "350px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
      ></div>

      <div className="container-xl px-4 py-5 z-1">
        <header className="mb-5 border-bottom pb-4">
          <h1 className="display-4 fw-bold text-body mb-3 tracking-tight">{t.terms.title}</h1>
          <p className="lead text-secondary max-w-3xl">
            {t.terms.intro}
          </p>
        </header>

        <div className="row g-4 align-items-start">
          {/* Left Column: Sidebar Summary */}
          <div className="col-12 col-lg-4 position-sticky" style={{ top: "100px" }}>
            <div className="glass-panel p-4">
              <h3 className="h6 fw-bold text-info text-uppercase font-display mb-3 tracking-wider">{t.terms.sidebarTitle}</h3>
              <p className="text-secondary small mb-4">
                {t.terms.sidebarDesc}
              </p>
              <ul className="list-unstyled d-flex flex-column gap-3 small text-body m-0">
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-info"></i>
                  <span>{t.terms.sidebarL1}</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-info"></i>
                  <span>{t.terms.sidebarL2}</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-check-circle-fill text-info"></i>
                  <span>{t.terms.sidebarL3}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Policy Content */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-5">
            {/* Section 1 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">{t.terms.sec1Title}</h2>
              <p className="text-secondary mb-3 leading-relaxed">
                {t.terms.sec1Desc}
              </p>
              <div className="alert alert-danger border-danger-subtle bg-danger bg-opacity-10 text-danger-emphasis p-4 rounded-3 mt-3">
                <h4 className="h6 fw-bold text-danger mb-2">{t.terms.sec1AlertTitle}</h4>
                <ul className="list-unstyled d-flex flex-column gap-2 small m-0">
                  <li className="d-flex align-items-start gap-2">
                    <i className="bi bi-x-circle-fill"></i>
                    <span>{t.terms.sec1AlertL1}</span>
                  </li>
                  <li className="d-flex align-items-start gap-2">
                    <i className="bi bi-x-circle-fill"></i>
                    <span>{t.terms.sec1AlertL2}</span>
                  </li>
                  <li className="d-flex align-items-start gap-2">
                    <i className="bi bi-x-circle-fill"></i>
                    <span>{t.terms.sec1AlertL3}</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">{t.terms.sec2Title}</h2>
              <p className="text-secondary mb-4 leading-relaxed">
                {t.terms.sec2Desc}
              </p>
              
              <div className="d-flex flex-column gap-3 mb-4">
                <div className="p-3 inner-panel d-flex gap-3">
                  <i className="bi bi-credit-card-2-back-fill text-info fs-3"></i>
                  <div>
                    <h4 className="h6 fw-bold text-body mb-1">{t.terms.sec2Card1Title}</h4>
                    <p className="small text-secondary m-0">{t.terms.sec2Card1Desc}</p>
                  </div>
                </div>
                <div className="p-3 inner-panel d-flex gap-3">
                  <i className="bi bi-truck text-info fs-3"></i>
                  <div>
                    <h4 className="h6 fw-bold text-body mb-1">{t.terms.sec2Card2Title}</h4>
                    <p className="small text-secondary m-0">{t.terms.sec2Card2Desc}</p>
                  </div>
                </div>
                <div className="p-3 inner-panel d-flex gap-3">
                  <i className="bi bi-box-seam-fill text-info fs-3"></i>
                  <div>
                    <h4 className="h6 fw-bold text-body mb-1">{t.terms.sec2Card3Title}</h4>
                    <p className="small text-secondary m-0">{t.terms.sec2Card3Desc}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">{t.terms.sec3Title}</h2>
              <p className="text-secondary mb-4 leading-relaxed">
                {t.terms.sec3Desc}
              </p>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="p-4 inner-panel h-100">
                    <i className="bi bi-shield-slash-fill text-warning fs-3 mb-3 d-block"></i>
                    <h4 className="h6 fw-bold text-body mb-2">{t.terms.sec3Card1Title}</h4>
                    <p className="small text-secondary m-0">{t.terms.sec3Card1Desc}</p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="p-4 inner-panel h-100">
                    <i className="bi bi-arrow-repeat text-info fs-3 mb-3 d-block"></i>
                    <h4 className="h6 fw-bold text-body mb-2">{t.terms.sec3Card2Title}</h4>
                    <p className="small text-secondary m-0">{t.terms.sec3Card2Desc}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">{t.terms.sec4Title}</h2>
              <p className="text-secondary leading-relaxed">
                {t.terms.sec4Desc}
              </p>
            </section>

            {/* Section 5 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">{t.terms.sec5Title}</h2>
              <ul className="list-unstyled d-flex flex-column gap-3 mt-3">
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-chevron-right text-info"></i>
                  <span className="text-secondary">{t.terms.sec5L1}</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-chevron-right text-info"></i>
                  <span className="text-secondary">{t.terms.sec5L2}</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-chevron-right text-info"></i>
                  <span className="text-secondary">{t.terms.sec5L3}</span>
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="ps-4 border-start border-2 border-secondary border-opacity-25 hover-border-info transition-all duration-300">
              <h2 className="h4 fw-bold text-body mb-3 font-display">{t.terms.sec6Title}</h2>
              <p className="text-secondary leading-relaxed">
                {t.terms.sec6Desc}
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
