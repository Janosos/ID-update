import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo de Tarjeta de Presentación Digital",
  description: "Explora nuestra demostración de tarjeta digital premium para negocios y profesionales, con descarga de contacto vCard, enlaces interactivos y video de fondo.",
};

export default function TarjetaDigitalDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
