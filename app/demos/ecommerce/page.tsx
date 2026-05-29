"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  tag: "novedades" | "essentials" | "accesorios";
  img: string;
  rating: number;
}

interface CartItem extends Product {
  quantity: number;
}

export default function EcommerceDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);
  const [videoEnded, setVideoEnded] = useState<boolean>(false);

  // Set page document title dynamically on client
  useEffect(() => {
    document.title = "Demo de E-commerce - ImperioDev";
  }, []);

  // Time update handler to freeze video 1.0s before actual end to bypass unwanted trailing transition
  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration && !videoEnded) {
      if (video.currentTime >= video.duration - 1.0) {
        video.pause();
        setVideoEnded(true);
      }
    }
  };

  // Product database (Streetwear Ficticio)
  const products: Product[] = [
    {
      id: 1,
      name: "Oversized Heavy Hoodie",
      price: 1899,
      category: "sudaderas",
      tag: "novedades",
      img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80",
      rating: 4.9
    },
    {
      id: 2,
      name: "Cargo Tech Utility Pants",
      price: 2199,
      category: "pantalones",
      tag: "novedades",
      img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80",
      rating: 4.7
    },
    {
      id: 3,
      name: "Studio Boxy Graphic Tee",
      price: 890,
      category: "camisetas",
      tag: "novedades",
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
      rating: 4.8
    },
    {
      id: 4,
      name: "Distressed Denim Jacket",
      price: 2499,
      category: "chaquetas",
      tag: "novedades",
      img: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=600&auto=format&fit=crop&q=80",
      rating: 4.6
    },
    {
      id: 5,
      name: "Retro Low-Top Sneakers",
      price: 3200,
      category: "calzado",
      tag: "essentials",
      img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&auto=format&fit=crop&q=80",
      rating: 4.9
    },
    {
      id: 6,
      name: "Reflective Utility Chest Bag",
      price: 1150,
      category: "accesorios",
      tag: "accesorios",
      img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80",
      rating: 4.5
    },
    {
      id: 7,
      name: "Heavy Knit Studio Beanie",
      price: 550,
      category: "accesorios",
      tag: "accesorios",
      img: "https://images.unsplash.com/photo-1608748010899-18f300247112?w=600&auto=format&fit=crop&q=80",
      rating: 4.7
    },
    {
      id: 8,
      name: "Minimalist Puffer Jacket",
      price: 3899,
      category: "chaquetas",
      tag: "essentials",
      img: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&auto=format&fit=crop&q=80",
      rating: 4.8
    }
  ];

  // Sliders References
  const newsSliderRef = useRef<HTMLDivElement>(null);
  const essentialsSliderRef = useRef<HTMLDivElement>(null);
  const accessoriesSliderRef = useRef<HTMLDivElement>(null);

  // Slider scroll handler
  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollAmount = clientWidth * 0.75;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      ref.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setCart([]);
  };

  return (
    <div data-bs-theme="light" className="min-vh-100 bg-white text-dark d-flex flex-column position-relative" style={{ fontFamily: "var(--font-sans)" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Overrides to ensure pure light styling under dark theme layout */
        [data-bs-theme="light"] {
          --bs-body-bg: #ffffff !important;
          --bs-body-bg-rgb: 255, 255, 255 !important;
          --bs-body-color: #111111 !important;
          --bs-body-color-rgb: 17, 17, 17 !important;
          --bs-secondary-color: #555555 !important;
          --bs-secondary-color-rgb: 85, 85, 85 !important;
          --bs-tertiary-bg: #f9fafb !important;
          --bs-tertiary-bg-rgb: 249, 250, 251 !important;
          --bs-border-color: #e5e7eb !important;
          --bs-border-color-translucent: rgba(0, 0, 0, 0.08) !important;
        }

        body {
          background-color: #ffffff !important;
          color: #111111 !important;
        }

        /* Minimal Streetwear Navbar */
        .streetwear-nav {
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #e5e7eb !important;
        }

        /* Streetwear Hero Video Container */
        .hero-video-container {
          height: 80vh !important;
          background-color: #f3f4f6;
          border-bottom: 1px solid #e5e7eb;
        }

        .hero-media {
          object-fit: cover !important;
          object-position: center top !important;
        }

        /* Fictive streetwear card */
        .streetwear-card {
          background-color: #ffffff !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 0px !important; /* Sharp corners for minimalist tech wear style */
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .streetwear-card:hover {
          border-color: #111111 !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.02) !important;
        }

        /* Horizontal Carousel layouts */
        .slider-container {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          padding: 0.5rem 0;
        }
        .slider-container::-webkit-scrollbar {
          display: none;
        }
        
        .slider-item {
          flex: 0 0 280px;
          scroll-snap-align: start;
        }

        /* Cart Sidebar minimalist */
        .cart-sidebar-streetwear {
          position: fixed;
          top: 0;
          right: -400px;
          width: 400px;
          height: 100vh;
          background: #ffffff;
          border-left: 1px solid #e5e7eb;
          box-shadow: -10px 0 35px rgba(0, 0, 0, 0.05);
          z-index: 1050;
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cart-sidebar-streetwear.open {
          right: 0;
        }

        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.25);
          z-index: 1040;
          backdrop-filter: blur(5px);
        }

        .btn-black-streetwear {
          background-color: #111111 !important;
          border: 1px solid #111111 !important;
          color: #ffffff !important;
          border-radius: 0px !important;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .btn-black-streetwear:hover {
          background-color: #333333 !important;
          border-color: #333333 !important;
        }

        .btn-outline-black-streetwear {
          background-color: transparent !important;
          border: 1px solid #111111 !important;
          color: #111111 !important;
          border-radius: 0px !important;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 700;
          transition: all 0.2s ease;
        }
        .btn-outline-black-streetwear:hover {
          background-color: #111111 !important;
          color: #ffffff !important;
        }

        /* Demo Bar styling */
        .demo-bar-light {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        @media (max-width: 575.98px) {
          .slider-item {
            flex: 0 0 230px;
          }
          .cart-sidebar-streetwear {
            width: 100%;
            right: -100%;
          }
          .hero-video-container {
            height: 60vh !important;
          }
        }

        .hero-text-shadow {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.25) !important;
        }
      `}} />

      {/* Floating Demo Control Bar */}
      <div className="demo-bar-light px-4 py-2 d-flex align-items-center gap-3">
        <span className="text-black small fw-bold d-none d-sm-inline">Demo de E-commerce</span>
        <Link href="/demos" className="btn btn-dark btn-sm fw-bold rounded-pill px-3 py-1.5 d-flex align-items-center gap-1">
          <i className="bi bi-grid-fill"></i> Salir de la Demo
        </Link>
      </div>

      {/* Minimal Navbar */}
      <nav className="navbar border-bottom py-3 sticky-top streetwear-nav z-10">
        <div className="container-xl px-4 d-flex justify-content-between align-items-center">
          <span className="navbar-brand fw-bold tracking-widest text-dark m-0 d-flex align-items-center gap-2" style={{ letterSpacing: "0.15em", fontSize: "1.1rem" }}>
            <span>IMPERIO STUDIO</span>
          </span>

          <div className="d-flex align-items-center gap-3">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="btn btn-link text-decoration-none text-dark position-relative p-1"
              id="cart-trigger"
              style={{ fontSize: "1.25rem" }}
            >
              <i className="bi bi-bag"></i>
              {cartTotalItems > 0 && (
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-dark text-white d-flex align-items-center justify-content-center" 
                  style={{ fontSize: "0.6rem", width: "16px", height: "16px", padding: 0 }}
                >
                  {cartTotalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Video Banner */}
      <div className="position-relative w-100 overflow-hidden hero-video-container">
        {/* Static Frame (Rendered behind) */}
        <img
          src="/demos/ecommerce/assets/lastframe.jpeg"
          alt="Hero Streetwear Last Frame"
          className="position-absolute top-0 start-0 w-100 h-100 hero-media"
          style={{ zIndex: 1 }}
        />
        {/* Video Player (Fades out when ended/freeze-triggered to reveal static last frame background) */}
        <video
          className="position-absolute top-0 start-0 w-100 h-100 hero-media"
          src="/demos/ecommerce/assets/videobanner.mp4"
          muted
          autoPlay
          playsInline
          onTimeUpdate={handleVideoTimeUpdate}
          onEnded={() => setVideoEnded(true)}
          style={{ 
            zIndex: 2, 
            opacity: videoEnded ? 0 : 1, 
            transition: "opacity 0.6s ease-in-out" 
          }}
        />
        
        {/* Dark subtle shade layer */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "rgba(0, 0, 0, 0.2)", zIndex: 3 }}></div>

        {/* Content Overlay - Fades in once the last frame is static */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center px-4" 
          style={{ 
            zIndex: 4,
            opacity: videoEnded ? 1 : 0,
            transform: `translate3d(0, ${videoEnded ? '0' : '15px'}, 0)`,
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          <span className="text-white text-uppercase tracking-widest small mb-2 fw-semibold hero-text-shadow" style={{ letterSpacing: "0.2em", fontSize: "0.75rem" }}>CÁPSULA 01 / STREETWEAR</span>
          <h1 className="display-4 fw-bold text-white mb-3 tracking-widest font-display hero-text-shadow" style={{ letterSpacing: "0.15em" }}>RAW SILHOUETTES</h1>
          <p className="text-white-50 mx-auto mb-4 hero-text-shadow" style={{ fontSize: "0.95rem", maxWidth: "450px", lineHeight: "1.6", fontWeight: 500 }}>
            Piezas oversized concebidas con tejidos de alto gramaje y costuras caídas. Estética minimalista monocromática.
          </p>
          <a href="#novedades" className="btn btn-light rounded-0 px-4 py-2.5 fw-bold text-uppercase tracking-widest" style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>
            Explorar Colección
          </a>
        </div>
      </div>

      {/* Products Carousels Sections */}
      <div className="py-5" id="catalogo">
        
        {/* SECTION 1: NOVEDADES */}
        <section className="container-xl px-4 py-4" id="novedades">
          <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-2">
            <div>
              <span className="text-muted text-uppercase tracking-widest font-monospace" style={{ fontSize: "0.65rem" }}>Colección Invierno</span>
              <h2 className="h4 fw-bold text-dark m-0 text-uppercase tracking-wider font-display">Novedades</h2>
            </div>
            <div className="d-flex gap-2">
              <button 
                onClick={() => scrollSlider(newsSliderRef, "left")} 
                className="btn btn-outline-dark rounded-circle p-0 d-flex align-items-center justify-content-center" 
                style={{ width: "36px", height: "36px" }}
                aria-label="Anterior"
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button 
                onClick={() => scrollSlider(newsSliderRef, "right")} 
                className="btn btn-outline-dark rounded-circle p-0 d-flex align-items-center justify-content-center" 
                style={{ width: "36px", height: "36px" }}
                aria-label="Siguiente"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

          <div ref={newsSliderRef} className="slider-container">
            {products.filter(p => p.tag === "novedades").map(product => (
              <div key={product.id} className="slider-item">
                <div className="streetwear-card p-3 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="position-relative overflow-hidden mb-3" style={{ height: "240px", backgroundColor: "#f3f4f6" }}>
                      <img src={product.img} alt={product.name} className="w-100 h-100 object-fit-cover" />
                      <span className="position-absolute bottom-0 start-0 bg-white text-dark small px-2 py-1 m-2 fw-semibold" style={{ fontSize: "0.7rem" }}>
                        ⭐ {product.rating}
                      </span>
                    </div>
                    <span className="text-muted text-uppercase font-monospace" style={{ fontSize: "0.65rem" }}>{product.category}</span>
                    <h3 className="h6 fw-bold text-dark mt-1 mb-2">{product.name}</h3>
                  </div>
                  <div className="mt-3">
                    <span className="d-block fw-bold mb-3">${product.price.toLocaleString("es-MX")} MXN</span>
                    <button onClick={() => addToCart(product)} className="btn btn-black-streetwear w-100 py-2">
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: ESSENTIALS */}
        <section className="container-xl px-4 py-5" id="essentials">
          <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-2">
            <div>
              <span className="text-muted text-uppercase tracking-widest font-monospace" style={{ fontSize: "0.65rem" }}>Estética Atemporal</span>
              <h2 className="h4 fw-bold text-dark m-0 text-uppercase tracking-wider font-display">Essentials</h2>
            </div>
            <div className="d-flex gap-2">
              <button 
                onClick={() => scrollSlider(essentialsSliderRef, "left")} 
                className="btn btn-outline-dark rounded-circle p-0 d-flex align-items-center justify-content-center" 
                style={{ width: "36px", height: "36px" }}
                aria-label="Anterior"
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button 
                onClick={() => scrollSlider(essentialsSliderRef, "right")} 
                className="btn btn-outline-dark rounded-circle p-0 d-flex align-items-center justify-content-center" 
                style={{ width: "36px", height: "36px" }}
                aria-label="Siguiente"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

          <div ref={essentialsSliderRef} className="slider-container">
            {products.filter(p => p.tag === "essentials").map(product => (
              <div key={product.id} className="slider-item">
                <div className="streetwear-card p-3 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="position-relative overflow-hidden mb-3" style={{ height: "240px", backgroundColor: "#f3f4f6" }}>
                      <img src={product.img} alt={product.name} className="w-100 h-100 object-fit-cover" />
                      <span className="position-absolute bottom-0 start-0 bg-white text-dark small px-2 py-1 m-2 fw-semibold" style={{ fontSize: "0.7rem" }}>
                        ⭐ {product.rating}
                      </span>
                    </div>
                    <span className="text-muted text-uppercase font-monospace" style={{ fontSize: "0.65rem" }}>{product.category}</span>
                    <h3 className="h6 fw-bold text-dark mt-1 mb-2">{product.name}</h3>
                  </div>
                  <div className="mt-3">
                    <span className="d-block fw-bold mb-3">${product.price.toLocaleString("es-MX")} MXN</span>
                    <button onClick={() => addToCart(product)} className="btn btn-black-streetwear w-100 py-2">
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: ACCESORIOS */}
        <section className="container-xl px-4 py-4" id="accesorios">
          <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-2">
            <div>
              <span className="text-muted text-uppercase tracking-widest font-monospace" style={{ fontSize: "0.65rem" }}>Detalles Clave</span>
              <h2 className="h4 fw-bold text-dark m-0 text-uppercase tracking-wider font-display">Accesorios</h2>
            </div>
            <div className="d-flex gap-2">
              <button 
                onClick={() => scrollSlider(accessoriesSliderRef, "left")} 
                className="btn btn-outline-dark rounded-circle p-0 d-flex align-items-center justify-content-center" 
                style={{ width: "36px", height: "36px" }}
                aria-label="Anterior"
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button 
                onClick={() => scrollSlider(accessoriesSliderRef, "right")} 
                className="btn btn-outline-dark rounded-circle p-0 d-flex align-items-center justify-content-center" 
                style={{ width: "36px", height: "36px" }}
                aria-label="Siguiente"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

          <div ref={accessoriesSliderRef} className="slider-container">
            {products.filter(p => p.tag === "accesorios").map(product => (
              <div key={product.id} className="slider-item">
                <div className="streetwear-card p-3 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="position-relative overflow-hidden mb-3" style={{ height: "240px", backgroundColor: "#f3f4f6" }}>
                      <img src={product.img} alt={product.name} className="w-100 h-100 object-fit-cover" />
                      <span className="position-absolute bottom-0 start-0 bg-white text-dark small px-2 py-1 m-2 fw-semibold" style={{ fontSize: "0.7rem" }}>
                        ⭐ {product.rating}
                      </span>
                    </div>
                    <span className="text-muted text-uppercase font-monospace" style={{ fontSize: "0.65rem" }}>{product.category}</span>
                    <h3 className="h6 fw-bold text-dark mt-1 mb-2">{product.name}</h3>
                  </div>
                  <div className="mt-3">
                    <span className="d-block fw-bold mb-3">${product.price.toLocaleString("es-MX")} MXN</span>
                    <button onClick={() => addToCart(product)} className="btn btn-black-streetwear w-100 py-2">
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: TODOS LOS PRODUCTOS & BUSCADOR */}
        <section className="container-xl px-4 py-5 border-top mt-5" id="buscador">
          <div className="row g-3 mb-5 align-items-center justify-content-between">
            <div className="col-12 col-md-5">
              <h2 className="h4 fw-bold text-dark text-uppercase tracking-wider font-display mb-3">Catálogo Completo</h2>
              <div className="input-group" style={{ borderRadius: "0px" }}>
                <span className="input-group-text bg-transparent border-end-0 border-dark rounded-0"><i className="bi bi-search"></i></span>
                <input 
                  type="text" 
                  className="form-control border-start-0 border-dark rounded-0 py-2.5" 
                  placeholder="Buscar sudaderas, camisetas..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
            </div>
            
            <div className="col-12 col-md-7 d-flex gap-2 justify-content-md-end overflow-x-auto pb-2 pb-md-0 align-self-end">
              {["todos", "sudaderas", "camisetas", "chaquetas", "calzado", "accesorios"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn btn-sm text-capitalize px-3 py-2 rounded-0 fw-semibold tracking-wide ${selectedCategory === cat ? "btn-dark" : "btn-outline-dark"}`}
                  style={{ fontSize: "0.75rem" }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="row g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="streetwear-card p-3 h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="position-relative overflow-hidden mb-3" style={{ height: "240px", backgroundColor: "#f3f4f6" }}>
                        <img src={product.img} alt={product.name} className="w-100 h-100 object-fit-cover" />
                        <span className="position-absolute bottom-0 start-0 bg-white text-dark small px-2 py-1 m-2 fw-semibold" style={{ fontSize: "0.7rem" }}>
                          ⭐ {product.rating}
                        </span>
                      </div>
                      <span className="text-muted text-uppercase font-monospace" style={{ fontSize: "0.65rem" }}>{product.category}</span>
                      <h3 className="h6 fw-bold text-dark mt-1 mb-2" style={{ minHeight: "38px" }}>{product.name}</h3>
                    </div>

                    <div className="mt-3">
                      <span className="d-block fw-bold mb-3">${product.price.toLocaleString("es-MX")} MXN</span>
                      <button onClick={() => addToCart(product)} className="btn btn-black-streetwear w-100 py-2">
                        Añadir al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <i className="bi bi-search-heart text-secondary fs-1 mb-3"></i>
                <p className="lead text-secondary">No encontramos prendas en esa búsqueda.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Shopping Cart Sidebar Overlay */}
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />}
      
      {/* Minimal Cart Sidebar */}
      <div className={`cart-sidebar-streetwear p-4 d-flex flex-column justify-content-between ${isCartOpen ? "open" : ""}`}>
        <div>
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between pb-3 border-bottom mb-4">
            <h4 className="fw-bold text-dark m-0 d-flex align-items-center gap-2 text-uppercase tracking-wider font-display" style={{ fontSize: "1.1rem" }}>
              <i className="bi bi-bag"></i> Bolsa de Compra
            </h4>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="btn btn-close shadow-none border-0"
              aria-label="Cerrar bolsa"
            />
          </div>

          {/* Cart items list */}
          <div className="d-flex flex-column gap-3 overflow-y-auto" style={{ maxHeight: "calc(100vh - 280px)" }}>
            {cart && cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="d-flex gap-3 align-items-center p-2 border-bottom">
                  <img src={item.img} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                  <div className="flex-grow-1 min-w-0">
                    <h5 className="h6 fw-bold text-truncate text-dark m-0">{item.name}</h5>
                    <span className="small text-muted font-monospace">${item.price.toLocaleString("es-MX")} MXN</span>
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="btn btn-sm btn-light border py-0 px-2" style={{ borderRadius: "0px" }}>-</button>
                      <span className="small text-dark fw-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="btn btn-sm btn-light border py-0 px-2" style={{ borderRadius: "0px" }}>+</button>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-sm text-danger border-0 bg-transparent p-1"
                    title="Eliminar prenda"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-bag-x text-muted fs-1 mb-2"></i>
                <p className="small text-muted">Tu bolsa de compra está vacía.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Summary */}
        <div>
          {cart && cart.length > 0 && (
            <div className="border-top pt-4">
              <div className="d-flex justify-content-between mb-4">
                <span className="text-uppercase tracking-wider small fw-bold">Total:</span>
                <span className="h5 fw-bold text-dark font-monospace">${cartTotalPrice.toLocaleString("es-MX")} MXN</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="btn btn-black-streetwear w-100 py-3 text-uppercase"
              >
                Proceder a Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Success Modal Dialog */}
      {checkoutSuccess && (
        <div className="position-fixed top-50 start-50 translate-middle p-4 text-center z-10 bg-white border border-dark" style={{ maxWidth: "380px", width: "90%", boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}>
          <div className="text-dark fs-1 mb-2">
            <i className="bi bi-check2-square"></i>
          </div>
          <h4 className="fw-bold text-dark text-uppercase tracking-wider font-display">Pedido Ficticio</h4>
          <p className="text-muted small mt-2 mb-4">
            Tu compra ha sido procesada como simulación. Esto valida los flujos de interacción e integración que realizamos en ImperioDev.
          </p>
          <button 
            onClick={() => setCheckoutSuccess(false)}
            className="btn btn-black-streetwear w-100 py-2.5"
          >
            Entendido
          </button>
        </div>
      )}
    </div>
  );
}
