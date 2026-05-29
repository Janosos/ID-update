import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo de Landing Page Premium",
  description: "Explora nuestra demostración inmersiva e interactiva de landing page premium al estilo Apple, con animaciones fluidas de scroll sincronizadas por GPU.",
};

export default function LandingDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
