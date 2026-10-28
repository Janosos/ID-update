"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export const COOKIE_CONSENT_KEY = "imperiodev-cookie-consent";

export default function CookieBanner() {
  const t = useTranslation();
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    try {
      const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!savedConsent) {
        // Mark immediately that cookie consent is pending so mobile promo toast waits
        document.documentElement.setAttribute("data-cookie-banner", "pending");
        // Show right after the initial loading screen finishes (3.5s)
        timer = setTimeout(() => {
          setVisible(true);
        }, 3600);
      }
    } catch {
      document.documentElement.setAttribute("data-cookie-banner", "pending");
      timer = setTimeout(() => {
        setVisible(true);
      }, 3600);
    }

    const handleOpenCookieSettings = () => {
      setIsClosing(false);
      setVisible(true);
      window.dispatchEvent(new CustomEvent("cookie-banner-opened"));
    };

    window.addEventListener("open-cookie-settings", handleOpenCookieSettings);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("open-cookie-settings", handleOpenCookieSettings);
    };
  }, []);

  // Coordinate layout state and offset so floating elements never overlap
  useEffect(() => {
    const html = document.documentElement;
    if (!visible || isClosing) {
      if (isClosing) {
        html.removeAttribute("data-cookie-banner");
        html.style.setProperty("--cookie-banner-offset", "0px");
      }
      return;
    }

    html.setAttribute("data-cookie-banner", "visible");

    const updateOffset = () => {
      if (bannerRef.current) {
        const rect = bannerRef.current.getBoundingClientRect();
        html.style.setProperty("--cookie-banner-offset", `${Math.ceil(rect.height + 16)}px`);
      }
    };

    updateOffset();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && bannerRef.current) {
      observer = new ResizeObserver(updateOffset);
      observer.observe(bannerRef.current);
    }

    window.addEventListener("resize", updateOffset);
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("resize", updateOffset);
    };
  }, [visible, isClosing]);

  const handleConsent = (choice: "accepted" | "essential") => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    } catch {
      // Ignore storage errors in restricted environments
    }
    setIsClosing(true);
    document.documentElement.removeAttribute("data-cookie-banner");
    document.documentElement.style.setProperty("--cookie-banner-offset", "0px");

    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      window.dispatchEvent(new CustomEvent("cookie-banner-closed", { detail: choice }));
    }, 300);
  };

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      className={`cookie-banner-wrapper ${isClosing ? "cookie-banner-closing" : ""}`}
      role="dialog"
      aria-live="polite"
      aria-label={t.cookies.title}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cookie-slide-in {
          0% {
            transform: translateY(80px) scale(0.96);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes cookie-slide-out {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(40px) scale(0.96);
            opacity: 0;
          }
        }

        .cookie-banner-wrapper {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 1055;
          max-width: 390px;
          width: calc(100vw - 48px);
          animation: cookie-slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .cookie-banner-wrapper.cookie-banner-closing {
          animation: cookie-slide-out 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .cookie-banner-card {
          background: rgba(255, 255, 255, 0.97) !important;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(20, 184, 166, 0.32) !important;
          border-left: 4px solid #14b8a6 !important;
          border-radius: 1rem;
          padding: 1rem 1.1rem;
          box-shadow: 0 16px 36px -6px rgba(15, 23, 42, 0.14), 0 4px 14px rgba(20, 184, 166, 0.08) !important;
          transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        html.dark .cookie-banner-card {
          background: rgba(15, 23, 42, 0.97) !important;
          border: 1px solid rgba(20, 184, 166, 0.35) !important;
          border-left: 4px solid #14b8a6 !important;
          box-shadow: 0 18px 40px -6px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(20, 184, 166, 0.15) !important;
        }

        .cookie-header-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding-right: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .cookie-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 0.6rem;
          background: rgba(20, 184, 166, 0.12);
          border: 1px solid rgba(20, 184, 166, 0.25);
          color: #0d9488;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 1.1rem;
        }
        html.dark .cookie-icon-box {
          background: rgba(20, 184, 166, 0.15);
          border-color: rgba(45, 212, 191, 0.25);
          color: #2dd4bf;
        }

        .cookie-badge-text {
          color: #0d9488;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1.1;
          display: block;
          margin-bottom: 2px;
        }
        html.dark .cookie-badge-text {
          color: #2dd4bf;
        }

        .cookie-title-text {
          color: #0f172a;
          font-weight: 700;
          font-size: 0.95rem;
          line-height: 1.2;
          margin: 0;
        }
        html.dark .cookie-title-text {
          color: #f8fafc;
        }

        .cookie-desc-text {
          color: #475569;
          font-size: 0.8rem;
          line-height: 1.45;
          margin: 0 0 0.75rem 0;
        }
        html.dark .cookie-desc-text {
          color: #cbd5e1;
        }

        .cookie-privacy-link {
          color: #0d9488;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s ease;
        }
        .cookie-privacy-link:hover {
          color: #0f766e;
        }
        html.dark .cookie-privacy-link {
          color: #2dd4bf;
        }
        html.dark .cookie-privacy-link:hover {
          color: #5eead4;
        }

        .cookie-actions-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-cookie-accept {
          background: #14b8a6 !important;
          border: 1px solid #14b8a6 !important;
          color: #ffffff !important;
          font-weight: 700;
          font-size: 0.78rem;
          padding: 0.45rem 0.85rem;
          border-radius: 0.55rem;
          transition: all 0.2s ease;
          flex: 1;
          text-align: center;
          white-space: nowrap;
        }
        .btn-cookie-accept:hover {
          background: #0d9488 !important;
          border-color: #0d9488 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
        }

        .btn-cookie-essential {
          background: rgba(15, 23, 42, 0.04) !important;
          border: 1px solid rgba(15, 23, 42, 0.16) !important;
          color: #0f172a !important;
          font-weight: 600;
          font-size: 0.78rem;
          padding: 0.45rem 0.85rem;
          border-radius: 0.55rem;
          transition: all 0.2s ease;
          flex: 1;
          text-align: center;
          white-space: nowrap;
        }
        .btn-cookie-essential:hover {
          background: rgba(15, 23, 42, 0.09) !important;
          border-color: rgba(15, 23, 42, 0.28) !important;
        }
        html.dark .btn-cookie-essential {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.16) !important;
          color: #f8fafc !important;
        }
        html.dark .btn-cookie-essential:hover {
          background: rgba(255, 255, 255, 0.12) !important;
          border-color: rgba(255, 255, 255, 0.28) !important;
        }

        .btn-close-cookie {
          color: #64748b;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          transition: color 0.2s ease, background-color 0.2s ease;
          padding: 0;
        }
        .btn-close-cookie:hover {
          color: #0d9488;
          background: rgba(15, 23, 42, 0.06);
        }
        html.dark .btn-close-cookie {
          color: #94a3b8;
        }
        html.dark .btn-close-cookie:hover {
          color: #2dd4bf;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Elevate chatbot toggle button on mobile/tablet when cookie banner is visible */
        @media (max-width: 991.98px) {
          html[data-cookie-banner="visible"] #cac-chat-container {
            bottom: calc(16px + var(--cookie-banner-offset, 165px)) !important;
            transition: bottom 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }

        @media (max-width: 576px) {
          .cookie-banner-wrapper {
            left: 12px;
            right: 12px;
            bottom: 12px;
            width: auto;
            max-width: none;
          }
          .cookie-banner-card {
            padding: 0.85rem 0.9rem;
            border-radius: 0.9rem;
          }
          .cookie-header-row {
            gap: 0.55rem;
            margin-bottom: 0.4rem;
          }
          .cookie-icon-box {
            width: 32px;
            height: 32px;
            font-size: 0.95rem;
          }
          .cookie-badge-text {
            font-size: 0.64rem;
          }
          .cookie-title-text {
            font-size: 0.88rem;
          }
          .cookie-desc-text {
            font-size: 0.75rem;
            line-height: 1.4;
            margin-bottom: 0.65rem;
          }
          .btn-cookie-accept,
          .btn-cookie-essential {
            font-size: 0.74rem;
            padding: 0.4rem 0.6rem;
          }
        }

        @media (max-width: 340px) {
          .cookie-actions-row {
            flex-direction: column;
            align-items: stretch;
          }
        }
      ` }} />

      <div className="cookie-banner-card position-relative">
        <button
          type="button"
          onClick={() => handleConsent("essential")}
          className="btn-close-cookie position-absolute top-0 end-0 m-2"
          aria-label={t.cookies.closeLabel}
        >
          <i className="bi bi-x fs-5"></i>
        </button>

        <div className="cookie-header-row">
          <div className="cookie-icon-box">
            <i className="bi bi-cookie"></i>
          </div>
          <div>
            <span className="cookie-badge-text">
              🍪 {t.cookies.badge}
            </span>
            <h4 className="cookie-title-text">{t.cookies.title}</h4>
          </div>
        </div>

        <p className="cookie-desc-text">
          {t.cookies.description}{" "}
          <Link href="/aviso-de-privacidad" className="cookie-privacy-link">
            {t.cookies.privacyLink}
          </Link>
          .
        </p>

        <div className="cookie-actions-row">
          <button
            type="button"
            onClick={() => handleConsent("accepted")}
            className="btn-cookie-accept"
          >
            {t.cookies.acceptAll}
          </button>
          <button
            type="button"
            onClick={() => handleConsent("essential")}
            className="btn-cookie-essential"
          >
            {t.cookies.essentialOnly}
          </button>
        </div>
      </div>
    </div>
  );
}
