import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "¿Por Qué Elegirnos?",
  description: "Descubre nuestra filosofía de diseño y desarrollo de software. Creamos soluciones y productos digitales rápidos, estéticos y orientados a resultados.",
};

export default function WhyUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
