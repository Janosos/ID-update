import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo de Tienda Online (Streetwear)",
  description: "Explora nuestra demostración de tienda e-commerce con diseño minimalista de ropa urbana, reproducción fluida de video y sliders interactivos.",
};

export default function EcommerceDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
