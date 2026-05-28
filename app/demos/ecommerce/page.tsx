"use client";

import { useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
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

  const products: Product[] = [
    {
      id: 1,
      name: "Teclado Mecánico RGB",
      price: 1850,
      category: "perifericos",
      img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80",
      rating: 4.8
    },
    {
      id: 2,
      name: "Mouse Ergonómico Inalámbrico",
      price: 950,
      category: "perifericos",
      img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80",
      rating: 4.5
    },
    {
      id: 3,
      name: "Lámpara de Escritorio LED Inteligente",
      price: 1200,
      category: "iluminacion",
      img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=80",
      rating: 4.7
    },
    {
      id: 4,
      name: "Hub USB-C 8 en 1 Aluminio",
      price: 1450,
      category: "accesorios",
      img: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=500&auto=format&fit=crop&q=80",
      rating: 4.6
    }
  ];

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
    <div className="min-vh-100 bg-body d-flex flex-column position-relative" style={{ fontFamily: "var(--font-sans)" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(139, 92, 246, 0.1) !important;
        }

        .cart-sidebar {
          position: fixed;
          top: 0;
          right: -400px;
          width: 400px;
          height: 100vh;
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border-left: 1px solid var(--card-border);
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);
          z-index: 1050;
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cart-sidebar.open {
          right: 0;
        }

        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1040;
          backdrop-filter: blur(4px);
        }

        .demo-bar {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
      `}} />

      {/* Floating Demo Controller */}
      <div className="demo-bar px-4 py-2 d-flex align-items-center gap-3">
        <span className="text-white small fw-bold d-none d-sm-inline">⚡ Modo Demo: E-commerce Store</span>
        <Link href="/demos" className="btn btn-purple btn-sm text-white fw-bold rounded-pill px-3 py-1.5 d-flex align-items-center gap-1" style={{ background: "#8b5cf6" }}>
          <i className="bi bi-grid-fill"></i> Salir al Panel
        </Link>
      </div>

      {/* Store Header */}
      <nav className="navbar border-bottom py-3 sticky-top bg-body bg-opacity-75 backdrop-blur z-10">
        <div className="container-xl px-4">
          <span className="navbar-brand fw-bold tracking-tight text-body d-flex align-items-center gap-2">
            <span className="bg-primary text-white rounded px-2 py-0.5" style={{ fontSize: "0.85rem", backgroundColor: "#8b5cf6" }}>STORE</span>
            <span>Imperio Gadgets</span>
          </span>

          <div className="d-flex align-items-center gap-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="btn btn-outline-secondary position-relative d-flex align-items-center gap-2 px-3 py-2"
              id="cart-trigger"
            >
              <i className="bi bi-cart3"></i>
              <span className="d-none d-md-inline small fw-bold">Carrito</span>
              {cartTotalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.7rem" }}>
                  {cartTotalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Store Catalog */}
      <section className="py-5 flex-grow-1">
        <div className="container-xl px-4">
          {/* Filter Bar */}
          <div className="row g-3 mb-5 align-items-center justify-content-between">
            <div className="col-12 col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0"><i className="bi bi-search"></i></span>
                <input 
                  type="text" 
                  className="form-control border-start-0" 
                  placeholder="Buscar periféricos o accesorios..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 d-flex gap-2 justify-content-md-end overflow-x-auto pb-2 pb-md-0">
              {["todos", "perifericos", "iluminacion", "accesorios"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn btn-sm text-capitalize px-3 py-1.5 rounded-pill ${selectedCategory === cat ? "btn-primary" : "btn-outline-secondary"}`}
                  style={selectedCategory === cat ? { backgroundColor: "#8b5cf6", borderColor: "#8b5cf6" } : {}}
                >
                  {cat === "perifericos" ? "Periféricos" : cat === "iluminacion" ? "Iluminación" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="row g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="glass-panel overflow-hidden product-card h-100 d-flex flex-column justify-content-between p-3">
                    <div>
                      {/* Product Image */}
                      <div className="position-relative overflow-hidden rounded-3 mb-3" style={{ height: "180px" }}>
                        <img 
                          src={product.img} 
                          alt={product.name} 
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                        />
                        <span className="position-absolute top-0 end-0 bg-dark bg-opacity-75 text-white small px-2 py-1 m-2 rounded fw-bold" style={{ fontSize: "0.75rem" }}>
                          ⭐ {product.rating}
                        </span>
                      </div>

                      {/* Product details */}
                      <span className="text-secondary text-uppercase small font-monospace" style={{ fontSize: "0.7rem" }}>{product.category}</span>
                      <h3 className="h6 fw-bold text-body mt-1 mb-2" style={{ minHeight: "40px" }}>{product.name}</h3>
                    </div>

                    <div className="mt-3">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span className="h5 fw-bold text-body mb-0">${product.price.toLocaleString("es-MX")} MXN</span>
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="btn btn-outline-primary btn-sm w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                        style={{ color: "#8b5cf6", borderColor: "#8b5cf6" }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#8b5cf6"; e.currentTarget.style.color = "#ffffff"; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#8b5cf6"; }}
                      >
                        <i className="bi bi-cart-plus"></i> Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <i className="bi bi-search-heart text-secondary fs-1 mb-3"></i>
                <p className="lead text-secondary">No encontramos productos que coincidan con tu búsqueda.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />}
      
      <div className={`cart-sidebar p-4 d-flex flex-column justify-content-between ${isCartOpen ? "open" : ""}`}>
        <div>
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between pb-3 border-bottom mb-4">
            <h4 className="fw-bold text-body m-0 d-flex align-items-center gap-2">
              <i className="bi bi-cart3"></i> Tu Carrito
            </h4>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="btn btn-close shadow-none border-0"
              aria-label="Cerrar carrito"
            />
          </div>

          {/* Cart items list */}
          <div className="d-flex flex-column gap-3 overflow-y-auto" style={{ maxHeight: "calc(100vh - 280px)" }}>
            {cart && cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="d-flex gap-3 align-items-center p-2 rounded border bg-body-tertiary">
                  <img src={item.img} alt={item.name} className="rounded" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                  <div className="flex-grow-1 min-w-0">
                    <h5 className="h6 fw-bold text-truncate text-body m-0">{item.name}</h5>
                    <span className="small text-secondary">${item.price.toLocaleString("es-MX")} MXN</span>
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="btn btn-sm btn-light border py-0 px-2" aria-label="Disminuir cantidad">-</button>
                      <span className="small text-body fw-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="btn btn-sm btn-light border py-0 px-2" aria-label="Aumentar cantidad">+</button>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-sm text-danger border-0 bg-transparent"
                    title="Eliminar del carrito"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-cart-x text-secondary fs-1 mb-2"></i>
                <p className="small text-secondary">El carrito está vacío.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Summary */}
        <div>
          {cart && cart.length > 0 && (
            <div className="border-top pt-4 mt-4">
              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">Subtotal:</span>
                <span className="h5 fw-bold text-body">${cartTotalPrice.toLocaleString("es-MX")} MXN</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="btn btn-primary w-100 py-2.5 fw-bold"
                style={{ backgroundColor: "#8b5cf6", borderColor: "#8b5cf6" }}
              >
                Simular Pago (Checkout)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Success Modal Dialog */}
      {checkoutSuccess && (
        <div className="position-fixed top-50 start-50 translate-middle glass-panel p-4 text-center z-10 shadow-lg bg-body" style={{ maxWidth: "380px", width: "90%" }}>
          <div className="text-success fs-1 mb-2">
            <i className="bi bi-check-circle-fill"></i>
          </div>
          <h4 className="fw-bold text-body">¡Pedido Simulado!</h4>
          <p className="text-secondary small mt-2 mb-4">
            Tu compra ficticia ha sido procesada con éxito. Esto demuestra la interactividad de nuestras pasarelas y flujos de e-commerce.
          </p>
          <button 
            onClick={() => setCheckoutSuccess(false)}
            className="btn btn-primary w-100 fw-bold"
            style={{ backgroundColor: "#8b5cf6", borderColor: "#8b5cf6" }}
          >
            Aceptar
          </button>
        </div>
      )}
    </div>
  );
}
