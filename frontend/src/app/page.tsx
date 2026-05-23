import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";

/**
 * Landing basada en el prototipo del equipo (`public/prototipo/prototipo.html`).
 * Vista HTML completa del diseño: abrir /prototipo/prototipo.html en el navegador.
 */
export default function Home() {
  return (
    <div className="p-8">
      <HeroSection />
      <ProblemSection />
    </div>
  );
}
