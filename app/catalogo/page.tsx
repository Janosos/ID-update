"use client";

import { useState } from "react";

interface Product {
  id: string;
  title: string;
  price: string;
  category: "web" | "mockups";
  description: string;
  features: string[];
  icon: string;
  whatsappMessage: string;
}

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<"all" | "web" | "mockups">("all");

  const products: Product[] = [
    {
      id: "web-sencilla",
      title: "Pagina Web Sencilla",
      price: "$6,000 MXN",
      category: "web",
      description: "Ideal para comenzar tu presencia online de forma rápida.",
      icon: "bi-feather",
      features: [
        "Página principal + Tienda",
        "Conexión básica de paquetería",
        "2 Subpáginas internas",
        "Integración básica de WhatsApp"
      ],
      whatsappMessage: "Me interesa el servicio: Pagina Web Sencilla",
    },
    {
      id: "web-estandar",
      title: "Pagina Web Estándar",
      price: "$7,000 MXN",
      category: "web",
      description: "La opción de diseño equilibrada para pequeñas empresas.",
      icon: "bi-layers",
      features: [
        "Todo lo del plan Sencillo",
        "Estructura web estándar completa",
        "4 Subpáginas internas",
        "Optimización de velocidad y SEO"
      ],
      whatsappMessage: "Me interesa el servicio: Pagina Web Estándar",
    },
    {
      id: "web-pro",
      title: "Pagina Web PRO",
      price: "$8,000 MXN",
      category: "web",
      description: "Solución completa y robusta con integraciones avanzadas.",
      icon: "bi-gem",
      features: [
        "Todo lo del plan Estándar",
        "Más de 4 Subpáginas internas",
        "Conexión a redes sociales (FB, IG, WA)",
        "Mantenimiento técnico por 3 meses"
      ],
      whatsappMessage: "Me interesa el servicio: Pagina Web PRO",
    },
    {
      id: "mockup-sencillo",
      title: "Mockup Sencillo",
      price: "$60 MXN",
      category: "mockups",
      description: "Recurso digital de mockup individual listo para editar.",
      icon: "bi-file-earmark-image",
      features: [
        "Archivo PSD editable de alta calidad",
        "Capas organizadas y objetos inteligentes",
        "Resolución ultra-nítida",
        "Descarga inmediata tras confirmación"
      ],
      whatsappMessage: "Me interesa comprar: Mockup Sencillo",
    },
    {
      id: "mockup-10",
      title: "Paquete 10 Mockups",
      price: "$160 MXN",
      category: "mockups",
      description: "Colección básica de 10 mockups de alta calidad.",
      icon: "bi-images",
      features: [
        "10 archivos PSD editables",
        "Licencia de uso comercial",
        "Variedad de formatos y ángulos",
        "Soporte de descarga en línea"
      ],
      whatsappMessage: "Me interesa comprar: Paquete 10 Mockups",
    },
    {
      id: "mockup-20",
      title: "Paquete 20 Mockups",
      price: "$320 MXN",
      category: "mockups",
      description: "Colección intermedia de 20 mockups profesionales.",
      icon: "bi-collection-play-fill",
      features: [
        "20 archivos PSD editables premium",
        "Licencia de uso comercial completa",
        "Optimizado para redes y portafolio",
        "Entrega por carpeta compartida"
      ],
      whatsappMessage: "Me interesa comprar: Paquete 20 Mockups",
    },
    {
      id: "mockup-50",
      title: "Paquete 50 Mockups",
      price: "$1,000 MXN",
      category: "mockups",
      description: "Colección profesional completa de 50 mockups.",
      icon: "bi-stars",
      features: [
        "50 archivos PSD editables de la más alta calidad",
        "Acceso preferente y actualizaciones",
        "Todos los formatos comerciales incluidos",
        "Soporte directo ImperioDev"
      ],
      whatsappMessage: "Me interesa comprar: Paquete 50 Mockups",
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) || 
                          product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "all" ? true : product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-grid py-5 min-vh-100 d-flex flex-column align-items-center position-relative overflow-hidden">
      <div 
        className="absolute position-absolute bg-info rounded-circle blur-3xl opacity-10 animate-pulse-slow parallax-blob"
        style={{ width: "350px", height: "350px", top: "10%", left: "10%", filter: "blur(100px)", zIndex: -1 }}
      ></div>

      <div className="container-xl px-4 py-5 z-1">
        {/* Header Section */}
        <header className="text-center mb-5 max-w-2xl mx-auto">
          <span className="text-info fw-bold tracking-wider text-uppercase small">Tienda Oficial</span>
          <h1 className="display-4 fw-bold text-body mt-2 mb-3">Catálogo de Productos</h1>
          <p className="lead text-secondary">
            Adquiere nuestros paquetes web a medida o descarga recursos digitales de diseño optimizados para tus proyectos.
          </p>
        </header>

        {/* Filter and Search Controls */}
        <div className="row g-3 mb-5 align-items-center justify-content-between glass-panel p-4">
          <div className="col-12 col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-body border-end-0">
                <i className="bi bi-search text-secondary"></i>
              </span>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control bg-body border-start-0 ps-0 shadow-none text-body"
              />
            </div>
          </div>
          
          <div className="col-12 col-md-6 d-flex gap-2 justify-content-md-end">
            <button
              onClick={() => setFilterCategory("all")}
              className={`btn btn-sm px-4 py-2 fw-semibold rounded-pill ${
                filterCategory === "all" ? "btn-info text-white" : "btn-premium-outline-theme"
              }`}
              style={filterCategory === "all" ? { background: "#14b8a6", borderColor: "#14b8a6" } : {}}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterCategory("web")}
              className={`btn btn-sm px-4 py-2 fw-semibold rounded-pill ${
                filterCategory === "web" ? "btn-info text-white" : "btn-premium-outline-theme"
              }`}
              style={filterCategory === "web" ? { background: "#14b8a6", borderColor: "#14b8a6" } : {}}
            >
              Sitios Web
            </button>
            <button
              onClick={() => setFilterCategory("mockups")}
              className={`btn btn-sm px-4 py-2 fw-semibold rounded-pill ${
                filterCategory === "mockups" ? "btn-info text-white" : "btn-premium-outline-theme"
              }`}
              style={filterCategory === "mockups" ? { background: "#14b8a6", borderColor: "#14b8a6" } : {}}
            >
              Mockups
            </button>
          </div>
        </div>

        {/* Product List Grid */}
        <div className="row g-4 align-items-stretch">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="col-12 col-md-6 col-lg-4" key={product.id}>
                <div className="glass-panel p-4 h-100 d-flex flex-column justify-content-between card-hover">
                  <div>
                    {/* Icon banner */}
                    <div 
                      className="rounded-4 text-info d-flex align-items-center justify-content-center mb-4 border"
                      style={{ width: "50px", height: "50px", background: "rgba(20, 184, 166, 0.08)", borderColor: "rgba(20, 184, 166, 0.25)" }}
                    >
                      <i className={`bi ${product.icon} fs-4`}></i>
                    </div>

                    <h3 className="h4 fw-bold text-body mb-2 font-display">{product.title}</h3>
                    <p className="text-secondary small mb-4" style={{ minHeight: "44px" }}>
                      {product.description}
                    </p>

                    <div className="d-flex align-items-baseline gap-1 mb-4">
                      <span className="fs-3 fw-bold text-body">{product.price}</span>
                    </div>

                    <hr className="my-3 opacity-10" />

                    <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary mb-4">
                      {product.features.map((feature, idx) => (
                        <li className="d-flex align-items-start gap-2" key={idx}>
                          <i className="bi bi-check2 text-info"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`https://wa.me/526623440716?text=${encodeURIComponent(product.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-info text-white w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 mt-auto"
                    style={{ background: "#14b8a6", borderColor: "#14b8a6" }}
                  >
                    <i className="bi bi-whatsapp"></i> Adquirir Ahora
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <i className="bi bi-search display-1 text-muted d-block mb-3"></i>
              <h3 className="fw-bold text-body">No se encontraron productos</h3>
              <p className="text-secondary">Prueba con otra búsqueda o filtro de categoría.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
