import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centro de Tutoriales",
  description: "Aprende a gestionar tu tienda virtual y catálogo en WooCommerce y a configurar envíos automatizados con envia.com.",
};

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
