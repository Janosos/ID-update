"use client";

import { useState, useEffect, useRef } from "react";

interface Option {
  label: string;
  next?: string;
  url?: string;
}

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
  options?: Option[];
  optionsDisabled?: boolean;
  selectedOptionLabel?: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- CONFIGURACIÓN DE IMPI (ÁRBOL DE DECISIONES) ---
  const chatFlow: Record<string, { text: string; options: Option[] }> = {
    'start': {
      text: "¡Hola! Qué onda, soy Impi, tu asistente inteligente en ImperioDev. 🚀 Estoy aquí para ayudarte a que tu proyecto digital despegue hoy mismo.<br><br>Dime, ¿en qué puedo apoyarte hoy? (Elige una opción):",
      options: [
        { label: "🌐 Sitio Web", next: 'web_intro' },
        { label: "🛒 Tienda Online (E-commerce)", next: 'ecommerce_intro' },
        { label: "📱 App Móvil / Escritorio", next: 'app_intro' },
        { label: "❓ Preguntas Frecuentes", next: 'faq_menu' },
        { label: "📩 Hablar con humano", next: 'human_contact' }
      ]
    },
    'web_intro': {
      text: "¡Súper! Un sitio web es el centro de mando de tu marca. 🚀 Para darte la mejor recomendación, ¿cuál es el objetivo principal?",
      options: [
        { label: "Vender (Landing Page)", next: 'web_status' },
        { label: "Presencia Corporativa", next: 'web_status' },
        { label: "Portafolio", next: 'web_status' },
        { label: "Blog / Contenido", next: 'web_status' },
        { label: "🏠 Volver al Inicio", next: 'start' }
      ]
    },
    'web_status': {
      text: "¿Ya tienes un sitio que quieras renovar o empezamos este viaje desde cero? 📄✨",
      options: [
        { label: "Empezamos desde cero", next: 'web_trans_new' },
        { label: "Rediseño (Glow up)", next: 'web_trans_redesign' },
        { label: "⬅️ Regresar", next: 'web_intro' }
      ]
    },
    'web_trans_new': {
      text: "¡Me encanta la visión! Para aterrizar los detalles técnicos y darte un presupuesto, haz clic aquí: 👇",
      options: [
        {
          label: "📲 Chatear por WhatsApp",
          url: "https://wa.me/526623440716?text=%C2%A1Hola%21%20Vengo%20de%20parte%20de%20Impi.%20%F0%9F%9A%80%20Me%20interesa%20crear%20o%20mejorar%20un%20sitio%20web%20con%20ImperioDev.%20%C2%BFMe%20podr%C3%ADan%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
        },
        { label: "✅ Finalizar chat", next: 'goodbye' },
        { label: "🏠 Volver al Inicio", next: 'start' }
      ]
    },
    'web_trans_redesign': {
      text: "¡Me encanta la visión! Para aterrizar los detalles técnicos y darte un presupuesto, haz clic aquí: 👇",
      options: [
        {
          label: "📲 Chatear por WhatsApp",
          url: "https://wa.me/526623440716?text=%C2%A1Hola%21%20Vengo%20de%20parte%20de%20Impi.%20%F0%9F%9A%80%20Me%20interesa%20crear%20o%20mejorar%20un%20sitio%20web%20con%20ImperioDev.%20%C2%BFMe%20podr%C3%ADan%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
        },
        { label: "✅ Finalizar chat", next: 'goodbye' },
        { label: "🏠 Volver al Inicio", next: 'start' }
      ]
    },
    'ecommerce_intro': {
      text: "¡Excelente visión! 💰 Una tienda online es como una sucursal que nunca duerme. ¿En qué etapa está tu negocio?",
      options: [
        { label: "Voy a empezar", next: 'ecommerce_size' },
        { label: "Ya vendo, quiero plataforma", next: 'ecommerce_size' },
        { label: "Necesito arreglos", next: 'ecommerce_size' },
        { label: "🏠 Volver al Inicio", next: 'start' }
      ]
    },
    'ecommerce_size': {
      text: "¿Cuántos productos planeas manejar aproximadamente?",
      options: [
        { label: "Menos de 20", next: 'ecommerce_final' },
        { label: "De 20 a 100", next: 'ecommerce_final' },
        { label: "¡Más de 100!", next: 'ecommerce_final' },
        { label: "⬅️ Regresar", next: 'ecommerce_intro' }
      ]
    },
    'ecommerce_final': {
      text: "¡Entendido! Tenemos las herramientas exactas para que empieces a facturar. Hablemos por WhatsApp para los detalles: 👇",
      options: [
        {
          label: "📲 Chatear por WhatsApp",
          url: "https://wa.me/526623440716?text=%C2%A1Qu%C3%A9%20tal%21%20Me%20gustar%C3%ADa%20platicar%20con%20un%20experto%20sobre%20una%20tienda%20en%20l%C3%ADnea%20para%20mi%20negocio.%20Vengo%20de%20platicar%20con%20Impi."
        },
        { label: "✅ Finalizar chat", next: 'goodbye' },
        { label: "🏠 Volver al Inicio", next: 'start' }
      ]
    },
    'app_intro': {
      text: "¡Wow, eso suena a un proyecto de alto nivel! 🚀 ¿Qué tipo de software tienes en mente?",
      options: [
        { label: "App Móvil (iOS/Android)", next: 'app_feature' },
        { label: "Software de Escritorio", next: 'app_feature' },
        { label: "Ambos (Híbrido)", next: 'app_feature' },
        { label: "🏠 Volver al Inicio", next: 'start' }
      ]
    },
    'app_feature': {
      text: "¿Y cuál sería la función estrella de tu app? (Ej: Inventarios, pedidos, red social...)",
      options: [
        { label: "Gestión / Admin", next: 'app_final' },
        { label: "Ventas / Pedidos", next: 'app_final' },
        { label: "Social / Comunidad", next: 'app_final' },
        { label: "Otra", next: 'app_final' },
        { label: "⬅️ Regresar", next: 'app_intro' }
      ]
    },
    'app_final': {
      text: "¡Ese proyecto tiene mucho potencial! 🛠️ Para definir la arquitectura y tiempos, mándanos un mensaje: 👇",
      options: [
        {
          label: "📲 Chatear por WhatsApp",
          url: "https://wa.me/526623440716?text=%C2%A1Hola%21%20Estoy%20interesado%20en%20desarrollar%20una%20App%20con%20ImperioDev.%20Vengo%20del%20chatbot%20y%20me%20gustar%C3%ADa%20aterrizar%20los%20detalles%20t%C3%A9cnicos."
        },
        { label: "✅ Finalizar chat", next: 'goodbye' },
        { label: "🏠 Volver al Inicio", next: 'start' }
      ]
    },
    'faq_menu': {
      text: "¡Claro! Aquí te respondo lo que más nos preguntan:",
      options: [
        { label: "¿Qué hacen?", next: 'faq_what' },
        { label: "¿Tiempos?", next: 'faq_time' },
        { label: "¿Mantenimiento?", next: 'faq_maint' },
        { label: "¿Ubicación?", next: 'faq_loc' },
        { label: "¿Costos?", next: 'faq_cost' },
        { label: "🏠 Volver al Inicio", next: 'start' }
      ]
    },
    'faq_what': {
      text: "Hacemos de todo: Web (WordPress/WooCommerce), Apps móviles y de escritorio con Flutter. ¡Si tiene código, lo hacemos!",
      options: [{ label: "⬅️ Otra duda", next: 'faq_menu' }, { label: "🏠 Inicio", next: 'start' }]
    },
    'faq_time': {
      text: "Landing pages en 1-2 semanas; proyectos grandes dependen de la complejidad. ¡Pero siempre volamos! ⏱️",
      options: [{ label: "⬅️ Otra duda", next: 'faq_menu' }, { label: "🏠 Inicio", next: 'start' }]
    },
    'faq_maint': {
      text: "¡Claro! No te soltamos la mano. Cuidamos que todo esté rápido y seguro. 🤝",
      options: [{ label: "⬅️ Otra duda", next: 'faq_menu' }, { label: "🏠 Inicio", next: 'start' }]
    },
    'faq_loc': {
      text: "Orgullosamente de Hermosillo, Sonora 🌵, pero trabajamos con clientes de todo el mundo.",
      options: [{ label: "⬅️ Otra duda", next: 'faq_menu' }, { label: "🏠 Inicio", next: 'start' }]
    },
    'faq_cost': {
      text: "¡Cada proyecto es único! Generalmente, nuestras webs van de los $4,000 a los $12,000. ¿Qué te parece si hablamos 5 minutos para darte un presupuesto a tu medida?",
      options: [{ label: "⬅️ Otra duda", next: 'faq_menu' }, { label: "📩 Cotizar", next: 'human_contact' }, { label: "🏠 Inicio", next: 'start' }]
    },
    'human_contact': {
      text: "¡Entendido! A veces nada supera el toque humano. Haz clic abajo para hablar directamente con el equipo:",
      options: [
        {
          label: "📲 Iniciar chat en WhatsApp",
          url: "https://wa.me/526623440716?text=%C2%A1Hola%21%20Necesito%20ayuda%20t%C3%A9cnica%20o%20tengo%20una%20duda%20general%20sobre%20los%20servicios%20de%20ImperioDev."
        },
        { label: "🏠 Volver al Inicio", next: 'start' },
        { label: "⬅️ Volver", next: 'start' }
      ]
    },
    'inactivity': {
      text: "¡Psst! ¿Sigues por ahí? 🤔 No quisiera que tu proyecto se quede en pausa. Si estás listo para seguir, solo elige una opción o escribe 'Hola'. ¡Aquí sigo pendiente! ✨",
      options: [
        { label: "🙋‍♂️ Aquí sigo", next: 'start' },
        { label: "👋 Finalizar", next: 'goodbye' }
      ]
    },
    'goodbye': {
      text: "¡Fue un gusto saludarte! Estaré por aquí si decides iniciar un nuevo proyecto. ¡Nos vemos pronto en el mundo digital! 🌐👋",
      options: [
        { label: "Reiniciar Impi", next: 'start' }
      ]
    }
  };

  // --- LOGIC FUNCTIONS ---
  const triggerStep = (stepKey: string) => {
    const step = chatFlow[stepKey];
    if (!step) return;

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `${stepKey}-${Date.now()}`,
          type: "bot",
          text: step.text,
          options: step.options,
        },
      ]);
    }, 600);
  };

  const handleOptionClick = (msgId: string, option: Option) => {
    // Disable options for this bubble
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId
          ? { ...m, optionsDisabled: true, selectedOptionLabel: option.label }
          : m
      )
    );

    // Reset inactivity
    resetInactivityTimer();

    // Trigger action
    if (option.url) {
      window.open(option.url, "_blank");
      
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-wa-${Date.now()}`,
            type: "bot",
            text: "Abriendo WhatsApp... 🚀",
          },
        ]);
        
        setTimeout(() => {
          triggerStep("goodbye");
        }, 1500);
      }, 600);
    } else if (option.next) {
      triggerStep(option.next);
    }
  };

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    if (isOpen) {
      inactivityTimerRef.current = setTimeout(() => {
        triggerStep("inactivity");
      }, 300000); // 5 minutes
    }
  };

  // Auto-start chat when open
  useEffect(() => {
    if (isOpen && !hasInitialized) {
      setHasInitialized(true);
      triggerStep("start");
    }
  }, [isOpen, hasInitialized]);

  // Monitor inactivity timer
  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [isOpen, messages]);

  // Scroll to bottom on updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div id="cac-chat-container">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Main Container */
        #cac-chat-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        /* Toggle Button */
        #cac-toggle-btn svg {
          display: none !important;
        }

        #cac-toggle-btn {
          background-image: url('https://www.imperiodev.com/wp-content/uploads/2026/01/ImpiGif.gif');
          background-size: 80px 80px;
          background-repeat: no-repeat;
          background-position: center center;
          width: 80px !important;
          height: 80px !important;
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
          border-radius: 35%;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          outline: none;
        }
        #cac-toggle-btn:hover {
          transform: scale(1.1);
        }

        /* Chat Window */
        #cac-chat-window {
          position: absolute;
          bottom: 90px;
          right: 0;
          width: 350px;
          height: 550px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform-origin: bottom right;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
          opacity: 1;
          transform: scale(1);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        #cac-chat-window.hidden {
          opacity: 0;
          transform: scale(0.9);
          pointer-events: none;
          visibility: hidden;
        }

        /* Header */
        .cac-header {
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          padding: 18px 20px;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .cac-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cac-title h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: white;
        }
        .cac-status-dot {
          width: 8px;
          height: 8px;
          background-color: #4ade80;
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(74, 222, 128, 0.5);
        }
        #cac-close-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          font-size: 24px;
          cursor: pointer;
          line-height: 1;
          padding: 0;
        }
        #cac-close-btn:hover {
          color: white;
        }

        /* Messages Body */
        #cac-messages-body {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background-color: #f8f9fa;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        #cac-messages-body::-webkit-scrollbar {
          width: 6px;
        }
        #cac-messages-body::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }

        /* Message Bubbles */
        .cac-message {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 14px;
          font-size: 14px;
          line-height: 1.5;
          position: relative;
          word-wrap: break-word;
          animation: slideIn 0.3s ease forwards;
        }
        .bot-message {
          background: white;
          color: #1f2937;
          align-self: flex-start;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }
        .user-message {
          background: #14b8a6;
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
          box-shadow: 0 2px 5px rgba(20, 184, 166, 0.3);
        }

        /* Options / Buttons Area */
        .cac-options-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 5px;
          animation: fadeIn 0.5s ease;
        }
        .cac-option-btn {
          background: white;
          border: 1px solid #14b8a6;
          color: #14b8a6;
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }
        .cac-option-btn:hover {
          background: #14b8a6;
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 2px 5px rgba(20, 184, 166, 0.2);
        }

        /* Typing Dots Bubble */
        .typing-bubble {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 12px 18px;
          width: fit-content;
        }
        .typing-bubble .dot {
          width: 6px;
          height: 6px;
          background-color: #94a3b8;
          border-radius: 50%;
          animation: wave 1.3s linear infinite;
        }
        .typing-bubble .dot:nth-child(2) {
          animation-delay: -1.1s;
        }
        .typing-bubble .dot:nth-child(3) {
          animation-delay: -0.9s;
        }
        @keyframes wave {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* --- DARK MODE OVERRIDES --- */
        .dark #cac-chat-window {
          background: #1e293b;
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }
        .dark #cac-messages-body {
          background-color: #0f172a;
        }
        .dark .bot-message {
          background: #1e293b;
          color: #f1f5f9;
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        .dark .cac-option-btn {
          background: #1e293b;
          border-color: #14b8a6;
          color: #14b8a6;
        }
        .dark .cac-option-btn:hover {
          background: #14b8a6;
          color: white;
        }

        /* --- RESPONSIVE MEDIA QUERIES --- */
        @media (max-width: 576px) {
          #cac-chat-container {
            bottom: 20px;
            right: 20px;
          }
          #cac-chat-window {
            width: calc(100vw - 40px);
            height: 70vh;
            max-height: 480px;
            bottom: 70px;
          }
        }
      ` }} />

      {/* Chat Toggle Button */}
      <button 
        id="cac-toggle-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar Chat" : "Abrir Chat"}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div id="cac-chat-window" className={isOpen ? "" : "hidden"}>
        <div className="cac-header">
          <div className="cac-title">
            <span className="cac-status-dot"></span>
            <h3>Atención al Cliente</h3>
          </div>
          <button id="cac-close-btn" onClick={() => setIsOpen(false)}>&times;</button>
        </div>

        <div id="cac-messages-body">
          {messages.map((msg) => (
            <div key={msg.id} className="d-flex flex-column gap-2 align-items-stretch">
              <div 
                className={`cac-message ${msg.type === "bot" ? "bot-message" : "user-message"}`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
              
              {msg.options && msg.options.length > 0 && (
                <div className="cac-options-container">
                  {msg.options.map((opt, optIdx) => {
                    const isSelected = msg.selectedOptionLabel === opt.label;
                    const hasSelectedAny = msg.optionsDisabled;
                    
                    return (
                      <button
                        key={optIdx}
                        disabled={hasSelectedAny}
                        onClick={() => handleOptionClick(msg.id, opt)}
                        className="cac-option-btn"
                        style={{
                          opacity: hasSelectedAny ? (isSelected ? 1 : 0.4) : 1,
                          background: isSelected ? "#14b8a6" : undefined,
                          borderColor: isSelected ? "#14b8a6" : undefined,
                          color: isSelected ? "white" : undefined,
                          cursor: hasSelectedAny ? "default" : "pointer"
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="cac-message bot-message typing-bubble">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
