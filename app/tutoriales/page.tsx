"use client";

import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";

export default function TutorialsPage() {
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState<"products" | "shipping">("products");

  return (
    <div className="bg-grid py-5 min-vh-100 d-flex flex-column align-items-center position-relative overflow-hidden">
      <div 
        className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
        style={{ width: "350px", height: "350px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
      ></div>

      <div className="container-xl px-4 py-5 z-1">
        {/* Page Header */}
        <header className="text-center mb-5 max-w-2xl mx-auto">
          <span className="text-info fw-bold tracking-wider text-uppercase small">{t.tutorials.tag}</span>
          <h1 className="display-4 fw-bold text-body mt-2 mb-3">{t.tutorials.title}</h1>
          <p className="lead text-secondary">
            {t.tutorials.subtitle}
          </p>
        </header>

        {/* Tab Controls */}
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-stretch align-items-sm-center gap-3 mb-5">
          <button
            onClick={() => setActiveTab("products")}
            className={`btn btn-lg px-4 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-3 ${
              activeTab === "products" ? "btn-info text-white shadow" : "btn-premium-outline-theme"
            }`}
            style={activeTab === "products" ? { background: "#14b8a6", borderColor: "#14b8a6" } : {}}
          >
            <i className="bi bi-box-seam-fill"></i>
            {t.tutorials.tabProducts}
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`btn btn-lg px-4 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-3 ${
              activeTab === "shipping" ? "btn-info text-white shadow" : "btn-premium-outline-theme"
            }`}
            style={activeTab === "shipping" ? { background: "#14b8a6", borderColor: "#14b8a6" } : {}}
          >
            <i className="bi bi-truck"></i>
            {t.tutorials.tabShipping}
          </button>
        </div>

        {/* Guides Content */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            {activeTab === "products" ? (
              <div className="glass-panel p-3 p-sm-4 p-md-5 fade-in-up">
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3 mb-4">
                  <div className="rounded-3 bg-info bg-opacity-10 text-info p-3 fs-3"><i className="bi bi-tag-fill"></i></div>
                  <h2 className="h2 fw-bold text-body m-0 font-display">{t.tutorials.prodTitle}</h2>
                </div>
                <p className="text-secondary mb-5">
                  {t.tutorials.prodSubtitle}
                </p>

                {/* Steps Accordion */}
                <div className="accordion" id="wooSteps">
                  
                  {/* Step 1 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#step1">
                        {t.tutorials.prodStep1Title}
                      </button>
                    </h3>
                    <div id="step1" className="accordion-collapse collapse show" data-bs-parent="#wooSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>{t.tutorials.prodStep1Desc1}</p>
                        <ol className="d-flex flex-column gap-2 ps-3">
                          <li>{t.tutorials.prodStep1L1}</li>
                          <li>{t.tutorials.prodStep1L2}</li>
                          <li>{t.tutorials.prodStep1L3}</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button collapsed fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#step2">
                        {t.tutorials.prodStep2Title}
                      </button>
                    </h3>
                    <div id="step2" className="accordion-collapse collapse" data-bs-parent="#wooSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>{t.tutorials.prodStep2Desc1}</p>
                        <ul className="d-flex flex-column gap-2 ps-3">
                          <li>{t.tutorials.prodStep2L1}</li>
                          <li>{t.tutorials.prodStep2L2}</li>
                          <li>{t.tutorials.prodStep2L3}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button collapsed fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#step3">
                        {t.tutorials.prodStep3Title}
                      </button>
                    </h3>
                    <div id="step3" className="accordion-collapse collapse" data-bs-parent="#wooSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>{t.tutorials.prodStep3Desc1}</p>
                        <ul className="d-flex flex-column gap-2 ps-3">
                          <li>{t.tutorials.prodStep3L1}</li>
                          <li>{t.tutorials.prodStep3L2}</li>
                          <li>{t.tutorials.prodStep3L3}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button collapsed fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#step4">
                        {t.tutorials.prodStep4Title}
                      </button>
                    </h3>
                    <div id="step4" className="accordion-collapse collapse" data-bs-parent="#wooSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>{t.tutorials.prodStep4Desc1}</p>
                        <ol className="d-flex flex-column gap-3 ps-3">
                          <li>{t.tutorials.prodStep4L1}</li>
                          <li>{t.tutorials.prodStep4L2}</li>
                          <li>{t.tutorials.prodStep4L3}</li>
                          <li>{t.tutorials.prodStep4L4}</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button collapsed fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#step5">
                        {t.tutorials.prodStep5Title}
                      </button>
                    </h3>
                    <div id="step5" className="accordion-collapse collapse" data-bs-parent="#wooSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>{t.tutorials.prodStep5Desc1}</p>
                        <ul className="d-flex flex-column gap-2 ps-3">
                          <li>{t.tutorials.prodStep5L1}</li>
                          <li>{t.tutorials.prodStep5L2}</li>
                          <li>{t.tutorials.prodStep5L3}</li>
                          <li>{t.tutorials.prodStep5L4}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="glass-panel p-3 p-sm-4 p-md-5 fade-in-up">
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3 mb-4">
                  <div className="rounded-3 bg-info bg-opacity-10 text-info p-3 fs-3"><i className="bi bi-truck-flatbed"></i></div>
                  <h2 className="h2 fw-bold text-body m-0 font-display">{t.tutorials.shipTitle}</h2>
                </div>
                <p className="text-secondary mb-5">
                  {t.tutorials.shipSubtitle}
                </p>

                <div className="accordion" id="shipSteps">
                  
                  {/* Step 1 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#ship1">
                        {t.tutorials.shipStep1Title}
                      </button>
                    </h3>
                    <div id="ship1" className="accordion-collapse collapse show" data-bs-parent="#shipSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>{t.tutorials.shipStep1Desc1}</p>
                        <ul className="d-flex flex-column gap-2 ps-3">
                          <li>
                            {t.tutorials.shipStep1L1.split("envia.com")[0]}
                            <a href="https://envia.com/" target="_blank" className="text-info font-bold underline">envia.com</a>
                            {t.tutorials.shipStep1L1.split("envia.com")[1] || "."}
                          </li>
                          <li>{t.tutorials.shipStep1L2}</li>
                          <li>{t.tutorials.shipStep1L3}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button collapsed fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#ship2">
                        {t.tutorials.shipStep2Title}
                      </button>
                    </h3>
                    <div id="ship2" className="accordion-collapse collapse" data-bs-parent="#shipSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>{t.tutorials.shipStep2Desc1}</p>
                        <ol className="d-flex flex-column gap-2 ps-3">
                          <li>{t.tutorials.shipStep2L1}</li>
                          <li>{t.tutorials.shipStep2L2}</li>
                          <li>{t.tutorials.shipStep2L3}</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button collapsed fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#ship3">
                        {t.tutorials.shipStep3Title}
                      </button>
                    </h3>
                    <div id="ship3" className="accordion-collapse collapse" data-bs-parent="#shipSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>{t.tutorials.shipStep3Desc1}</p>
                        <ol className="d-flex flex-column gap-2 ps-3">
                          <li>{t.tutorials.shipStep3L1}</li>
                          <li>{t.tutorials.shipStep3L2}</li>
                          <li>{t.tutorials.shipStep3L3}</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="accordion-item bg-transparent border-0 mb-4">
                    <h3 className="accordion-header">
                      <button className="accordion-button collapsed fs-5 fw-bold text-body bg-body rounded border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#ship4">
                        {t.tutorials.shipStep4Title}
                      </button>
                    </h3>
                    <div id="ship4" className="accordion-collapse collapse" data-bs-parent="#shipSteps">
                      <div className="accordion-body text-secondary lh-relaxed">
                        <p>{t.tutorials.shipStep4Desc1}</p>
                        <ul className="d-flex flex-column gap-2 ps-3">
                          <li>{t.tutorials.shipStep4L1}</li>
                          <li>{t.tutorials.shipStep4L2}</li>
                          <li>{t.tutorials.shipStep4L3}</li>
                        </ul>
                        
                        <div className="alert alert-warning mt-3 border-warning-subtle bg-warning bg-opacity-10 text-warning-emphasis">
                          <h5 className="h6 fw-bold mb-1">⚠️ {t.tutorials.shipGoldRuleTitle}</h5>
                          <p className="small m-0">
                            {t.tutorials.shipGoldRuleDesc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
