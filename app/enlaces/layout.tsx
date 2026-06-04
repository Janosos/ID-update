import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enlaces Oficiales",
  description: "Conoce todos los canales de contacto de ImperioDev, explora nuestras demos interactivas en vivo y utiliza nuestra aplicación de cotizaciones.",
};

export default function EnlacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
