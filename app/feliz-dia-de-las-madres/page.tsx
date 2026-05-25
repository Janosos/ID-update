"use client";

export default function MothersDayPage() {
  return (
    <div className="mothers-day-wrapper">
      {/* Hero Section */}
      <section 
        className="position-relative w-100 min-vh-100 d-flex align-items-center justify-content-center px-4 py-5" 
        style={{ 
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKns0ZekGDrUafrAhbgPH9N7FikPG2_Xq7jVXGFWlYugobwjK2o5BgRlkeHPAm183S6ZMzw1GMoHONc1drxjkjgVcHWD-ZIr9JLOIO10Ctf08Qk8MQuuEkdErKkzaQrT0DNRJkIxgdCMVaHOjpNmUVGBErJjTORI_RZfsGH-9xSZ0tuhY9_dc7uSvCyL0qWWuU6p4LuLrJJjexGA6XMLvyB1HV5WbaDc3arYVKm3R650xgImi4q0HA3Mlea_op-6tEUvKSujmi1GI')", 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundAttachment: "fixed" 
        }}
      >
        {/* Soft overlay */}
        <div 
          className="position-absolute inset-0 bg-gradient"
          style={{ 
            background: "linear-gradient(to bottom, rgba(255,248,246,0.4) 10%, rgba(255,248,246,0.6) 50%, rgba(255,248,246,0.9) 100%)",
            top: 0, left: 0, right: 0, bottom: 0, zIndex: 1
          }}
        ></div>
        
        {/* Hero Card */}
        <div 
          className="position-relative z-2 max-w-4xl mx-auto text-center d-flex flex-column align-items-center gap-4 p-4 p-md-5 rounded-5 border border-white shadow-lg fade-in-up"
          style={{ background: "rgba(255, 248, 246, 0.85)", backdropFilter: "blur(10px)" }}
        >
          <div 
            className="d-flex align-items-center justify-content-center rounded-circle bg-danger bg-opacity-10 mb-2"
            style={{ width: "64px", height: "64px" }}
          >
            <i className="bi bi-heart-fill text-danger fs-2"></i>
          </div>
          
          <p className="font-display fw-bold text-uppercase tracking-wider text-danger small mb-0">Celebramos tu vida</p>
          <h1 className="font-display display-3 fw-bold text-danger mb-2 lh-sm text-gradient-rose">
            ¡Feliz 10 de Mayo,<br />
            <span className="fst-italic opacity-75">Mamá!</span>
          </h1>
          
          <p className="lead text-secondary max-w-2xl px-2">
            Hoy celebramos la magia de tu existencia, la calidez infinita de tus abrazos y la fuerza inquebrantable de tu amor. Gracias por ser el pilar de nuestra vida, nuestro refugio más seguro y nuestra luz más brillante.
          </p>
          
          <div className="w-50 mx-auto border-bottom border-danger border-opacity-25 pt-3"></div>
        </div>
      </section>

      {/* Quotes Section (Bento Grid) */}
      <section className="py-5 my-5 px-4" style={{ backgroundColor: "#fff8f6" }}>
        <div className="container-xl max-w-6xl">
          <div className="text-center mb-5">
            <h2 className="display-6 font-display text-danger fst-italic mb-2">Palabras del Corazón</h2>
            <div className="mx-auto bg-warning bg-opacity-50" style={{ width: "60px", height: "2px" }}></div>
            <p className="text-secondary small mt-3 max-w-md mx-auto">
              Porque a veces las palabras no alcanzan para describir la inmensidad de lo que significas para nosotros.
            </p>
          </div>
          
          <div className="row g-4 align-items-stretch">
            {/* Quote 1 */}
            <div className="col-12 col-md-4">
              <div 
                className="p-4 p-md-5 rounded-4 h-100 border border-warning border-opacity-25 position-relative overflow-hidden shadow-sm hover-translate bg-white"
                style={{ transition: "all 0.3s ease" }}
              >
                <div 
                  className="position-absolute bg-danger bg-opacity-10 rounded-circle"
                  style={{ width: "128px", height: "128px", top: "-32px", right: "-32px", zIndex: 0 }}
                ></div>
                <i className="bi bi-quote text-danger text-opacity-25 display-1 position-absolute top-0 start-0 m-3" style={{ pointerEvents: "none" }}></i>
                
                <p className="fs-5 text-body fst-italic position-relative z-1 mb-0 pt-4 leading-normal">
                  "Tus brazos siempre se abrían cuando necesitaba un abrazo. Tu corazón comprendía cuando necesitaba una amiga."
                </p>
              </div>
            </div>
            
            {/* Quote 2 - Center Highlight */}
            <div className="col-12 col-md-4">
              <div 
                className="p-4 p-md-5 rounded-4 h-100 border border-danger border-opacity-25 position-relative overflow-hidden shadow d-flex flex-col justify-content-center align-items-center text-center"
                style={{ background: "linear-gradient(135deg, rgba(255, 218, 217, 0.3) 0%, rgba(255, 248, 246, 0.9) 100%)" }}
              >
                <i className="bi bi-flower1 text-danger display-4 mb-3"></i>
                <p className="fs-5 text-body fw-medium m-0 leading-relaxed">
                  Para el mundo eres una madre, pero para tu familia, eres absolutamente todo nuestro mundo.
                </p>
              </div>
            </div>
            
            {/* Quote 3 */}
            <div className="col-12 col-md-4">
              <div 
                className="p-4 p-md-5 rounded-4 h-100 border border-warning border-opacity-25 position-relative overflow-hidden shadow-sm hover-translate bg-white"
                style={{ transition: "all 0.3s ease" }}
              >
                <div 
                  className="position-absolute bg-warning bg-opacity-20 rounded-circle"
                  style={{ width: "128px", height: "128px", bottom: "-32px", left: "-32px", zIndex: 0 }}
                ></div>
                <i className="bi bi-quote text-danger text-opacity-25 display-1 position-absolute top-0 start-0 m-3" style={{ pointerEvents: "none" }}></i>
                
                <p className="fs-5 text-body fst-italic position-relative z-1 mb-0 pt-4 leading-normal">
                  "Un millón de gracias no son suficientes para devolverte todo lo que has hecho por mí."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-5 px-4" style={{ background: "linear-gradient(to bottom, #fff1ec, #fff8f6)" }}>
        <div className="container-xl max-w-6xl">
          <div className="text-center mb-5 d-flex flex-column align-items-center">
            <i className="bi bi-magic text-warning display-6 mb-2"></i>
            <h2 className="display-6 font-display text-danger mb-1">Instantes Invaluables</h2>
            <p className="text-secondary max-w-md mx-auto">
              Cada recuerdo a tu lado es un tesoro bordado con hilo de oro en la memoria de nuestro corazón.
            </p>
          </div>
          
          <div className="row g-4 align-items-stretch">
            {/* Image 1 */}
            <div className="col-12 col-md-3">
              <div className="card border-0 rounded-4 overflow-hidden shadow-sm hover-grow h-100" style={{ border: "5px solid #fff" }}>
                <div className="position-relative h-100" style={{ minHeight: "250px" }}>
                  <img 
                    src="https://www.imperiodev.com/wp-content/uploads/2026/05/incondicional4.avif" 
                    alt="Retrato maternal" 
                    className="position-absolute w-100 h-100 object-fit-cover"
                  />
                  <div className="position-absolute bottom-0 w-100 bg-dark bg-opacity-25 text-white text-center py-2">
                    <span className="small tracking-wider uppercase font-display fw-bold">Ternura</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image 2 (Wide center) */}
            <div className="col-12 col-md-6">
              <div className="card border-0 rounded-4 overflow-hidden shadow-sm hover-grow h-100" style={{ border: "5px solid #fff" }}>
                <div className="position-relative h-100" style={{ minHeight: "250px" }}>
                  <img 
                    src="https://www.imperiodev.com/wp-content/uploads/2026/05/ternura.avif" 
                    alt="Madre e hijo" 
                    className="position-absolute w-100 h-100 object-fit-cover"
                  />
                  <div className="position-absolute bottom-0 w-100 bg-dark bg-opacity-25 text-white text-center py-2">
                    <span className="small tracking-wider uppercase font-display fw-bold">Amor Incondicional</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image 3 */}
            <div className="col-12 col-md-3">
              <div className="card border-0 rounded-4 overflow-hidden shadow-sm hover-grow h-100" style={{ border: "5px solid #fff" }}>
                <div className="position-relative h-100" style={{ minHeight: "250px" }}>
                  <img 
                    src="https://images.unsplash.com/photo-1769288884665-61351d4387ff?q=80&w=846&auto=format&fit=crop" 
                    alt="Sonrisa de mamá" 
                    className="position-absolute w-100 h-100 object-fit-cover"
                  />
                  <div className="position-absolute bottom-0 w-100 bg-dark bg-opacity-25 text-white text-center py-2">
                    <span className="small tracking-wider uppercase font-display fw-bold">Alegría</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Dedication Section */}
      <section className="py-5 px-4 text-center bg-white">
        <div className="container-xl max-w-4xl">
          <div 
            className="rounded-5 p-4 p-md-5 border shadow relative overflow-hidden"
            style={{ background: "#fff8f6", borderColor: "rgba(217, 139, 139, 0.3)" }}
          >
            {/* Decorative corner elements */}
            <div 
              className="position-absolute bg-danger bg-opacity-10 rounded-circle"
              style={{ width: "128px", height: "128px", top: "-64px", left: "-64px" }}
            ></div>
            <div 
              className="position-absolute bg-warning bg-opacity-10 rounded-circle"
              style={{ width: "128px", height: "128px", bottom: "-64px", right: "-64px" }}
            ></div>
            
            <div 
              className="position-absolute w-100 top-0 start-0"
              style={{ height: "4px", background: "linear-gradient(to right, #ffdad9, #d98b8b, #ffdea5)" }}
            ></div>
            
            <div className="position-relative z-1">
              <i className="bi bi-suit-heart-fill text-danger display-4 mb-3 animate-pulse"></i>
              
              <h2 className="font-display display-6 text-danger mb-4">Nuestra Mayor Bendición</h2>
              
              <p className="fs-5 text-secondary fst-italic mb-4 px-2 max-w-2xl mx-auto">
                "No hay regalo en el mundo que pueda igualar el milagro de tenerte como madre. Que hoy y siempre la vida te devuelva toda la paz, la alegría y el amor infinito que tú nos entregas todos los días."
              </p>
              
              <div className="d-inline-flex align-items-center gap-2 text-danger fw-bold uppercase border-bottom border-danger pb-1 tracking-wider small mt-3">
                <i className="bi bi-sparkles"></i>
                Te Amamos
                <i className="bi bi-sparkles"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Gradient Bar */}
      <div 
        className="w-100" 
        style={{ height: "16px", background: "linear-gradient(to right, #8d4b4c, #ffdea5, #8d4b4c)" }}
      ></div>

      <style jsx>{`
        .mothers-day-wrapper {
          background-color: #fff8f6;
          min-height: 100vh;
        }
        .text-gradient-rose {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-image: linear-gradient(135deg, #8d4b4c, #d98b8b);
        }
        .hover-translate:hover {
          transform: translateY(-5px);
        }
        .hover-grow:hover {
          transform: scale(1.02);
          box-shadow: 0 1rem 3rem rgba(141, 75, 76, 0.175) !important;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
