"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // 1. Import Bootstrap JS dynamically on client
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    // 2. Initialize theme from localStorage or media query
    const savedTheme = localStorage.getItem("theme-id") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // 3. Parallax scroll effect for background gradient blobs
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const blobs = document.querySelectorAll(".parallax-blob");
          blobs.forEach((blob, idx) => {
            const speed = (idx + 1) * 0.08;
            const direction = idx % 2 === 0 ? 1 : -1;
            const yOffset = direction * (scrolled * speed);
            (blob as HTMLElement).style.transform = `translate3d(0, ${yOffset}px, 0)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initialize positions on load / route changes
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const applyTheme = (t: "light" | "dark") => {
    const html = document.documentElement;
    if (t === "dark") {
      html.classList.add("dark");
      html.setAttribute("data-bs-theme", "dark");
    } else {
      html.classList.remove("dark");
      html.setAttribute("data-bs-theme", "light");
    }
  };

  const toggleThemeGlobal = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem("theme-id", nextTheme);
  };

  // Helper to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Check if we are on Mother's Day page
  const isMothersDay = pathname === "/feliz-dia-de-las-madres" || pathname === "/feliz-dia-de-las-madres/";
  
  // Set specialized classes for special pages
  useEffect(() => {
    const html = document.documentElement;
    if (isMothersDay) {
      html.classList.add("mothers-day-theme");
      html.setAttribute("data-bs-theme", "light"); // Force light theme for Mother's Day
    } else {
      html.classList.remove("mothers-day-theme");
      applyTheme(theme);
    }
  }, [isMothersDay, theme]);

  return (
    <div id="id-global-wrapper" className="min-h-screen d-flex flex-column">
      {/* Hide navbar on Mothers Day */}
      {!isMothersDay && (
        <nav id="navbar-id" className="navbar navbar-expand-lg fixed-top py-3 glass-panel-nav">
          <div className="container-xl px-4 d-flex justify-content-between align-items-center">
            {/* Logo */}
            <Link href="/" className="navbar-brand d-flex align-items-center gap-2 group text-decoration-none">
              <img 
                src="https://www.imperiodev.com/wp-content/uploads/2025/02/9c7d6fb0-1eab-481e-a6da-6b37688eacef-e1739234268387-46x63.png" 
                alt="ImperioDev Logo" 
                className="transition-transform group-hover:scale-110" 
                style={{ height: "40px", width: "auto", objectFit: "contain" }}
              />
              <span className="fs-3 fw-bold tracking-tighter text-uppercase m-0">
                Imperio<span className="text-teal-600 dark:text-teal-500 text-info">Dev</span>
              </span>
            </Link>

            {/* Desktop Menu links */}
            <div className="d-none d-lg-flex align-items-center gap-4">
              <div className="d-flex gap-4 fw-semibold text-uppercase tracking-wider small">
                <Link href="/" className="nav-link text-body hover-text-teal">Inicio</Link>
                <Link href="/acerca-de-nosotros" className="nav-link text-body hover-text-teal">Acerca de nosotros</Link>
                <Link href="/why-us" className="nav-link text-body hover-text-teal">¿Por qué elegirnos?</Link>
                <Link href="/catalogo" className="nav-link text-body hover-text-teal">Catálogo</Link>
                <Link href="/tutoriales" className="nav-link text-body hover-text-teal">Tutoriales</Link>
              </div>

              <div className="vr bg-secondary opacity-25" style={{ height: "24px" }}></div>

              {/* Theme Switcher */}
              <button 
                onClick={toggleThemeGlobal} 
                className="toggle-btn" 
                title="Cambiar Tema"
              >
                {theme === "dark" ? (
                  <i className="bi bi-sun-fill text-warning"></i>
                ) : (
                  <i className="bi bi-moon-stars-fill text-primary"></i>
                )}
              </button>

              <Link 
                href="/#contacto" 
                className="btn btn-info text-white fw-bold px-4 py-2 rounded shadow-sm"
                style={{ background: "#14b8a6", borderColor: "#14b8a6" }}
              >
                INICIAR PROYECTO
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="d-flex align-items-center gap-3 d-lg-none">
              <button 
                onClick={toggleThemeGlobal} 
                className="toggle-btn" 
                title="Cambiar Tema"
              >
                {theme === "dark" ? (
                  <i className="bi bi-sun-fill text-warning"></i>
                ) : (
                  <i className="bi bi-moon-stars-fill text-primary"></i>
                )}
              </button>
              <button 
                onClick={toggleMobileMenu} 
                className="btn text-body border-0 p-1 fs-3"
              >
                <i className="bi bi-list"></i>
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Menu Overlay */}
      <div 
        id="mobile-menu-id" 
        className="fixed-top w-100 h-100 bg-body d-flex flex-column align-items-center justify-content-center gap-4"
        style={{ 
          zIndex: 10000, 
          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
          transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "all" : "none"
        }}
      >
        <button 
          onClick={toggleMobileMenu} 
          className="btn position-absolute top-0 end-0 m-4 fs-1 border-0"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="d-flex flex-column gap-4 text-center fs-2 fw-bold w-100 px-5">
          <Link href="/" className="text-body text-decoration-none" onClick={toggleMobileMenu}>Inicio</Link>
          <Link href="/acerca-de-nosotros" className="text-body text-decoration-none" onClick={toggleMobileMenu}>Acerca</Link>
          <Link href="/why-us" className="text-body text-decoration-none" onClick={toggleMobileMenu}>¿Por qué nosotros?</Link>
          <Link href="/catalogo" className="text-body text-decoration-none" onClick={toggleMobileMenu}>Catálogo</Link>
          <Link href="/tutoriales" className="text-body text-decoration-none" onClick={toggleMobileMenu}>Tutoriales</Link>

          <Link 
            href="/#contacto" 
            className="btn btn-info text-white fw-bold py-3 mt-3 rounded-pill shadow w-100 max-w-xs mx-auto fs-4"
            style={{ background: "#14b8a6", borderColor: "#14b8a6" }}
            onClick={toggleMobileMenu}
          >
            INICIAR PROYECTO
          </Link>
        </div>
      </div>

      {/* Page Content */}
      <main className={`flex-grow-1 ${!isMothersDay ? "pt-5 mt-4" : ""}`}>
        {children}
      </main>

      {/* Hide footer on Mothers Day */}
      {!isMothersDay && (
        <footer id="id-footer-content" className="py-5 bg-body border-top text-center text-secondary small">
          <div className="container-xl px-4">
            <div className="d-flex flex-column align-items-center gap-2">
              <p className="fw-semibold m-0 tracking-wider">
                &copy; {new Date().getFullYear()} IMPERIODEV. TODOS LOS DERECHOS RESERVADOS.
              </p>
              
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                <Link href="/aviso-de-privacidad" className="text-secondary text-decoration-none hover-text-teal">
                  Aviso de Privacidad
                </Link>
                <span className="text-muted d-none d-sm-inline">|</span>
                <Link href="/terminos-y-condiciones" className="text-secondary text-decoration-none hover-text-teal">
                  Términos y Condiciones
                </Link>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Custom Global Navigation Styles */}
      <style jsx global>{`
        .hover-text-teal:hover {
          color: #14b8a6 !important;
        }
        .nav-link:hover {
          color: #14b8a6 !important;
        }
      `}</style>
    </div>
  );
}
