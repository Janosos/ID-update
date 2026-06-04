import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demos Interactivas - ImperioDev",
  description: "Explora las demostraciones interactivas de nuestros trabajos de diseño y desarrollo web: Landing Pages, Tiendas Online y Tarjetas de Presentación Digitales.",
};

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
