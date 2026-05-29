import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description: "Conoce a las mentes creativas detrás de ImperioDev. Somos un equipo apasionado de ingenieros de software, diseñadores y estrategas digitales dedicados a potenciar marcas.",
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
