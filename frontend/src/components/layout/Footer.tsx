export default function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-primary py-10 text-on-primary">
      <div className="app-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-bold text-secondary-fixed">TalentRenew</p>
          <p className="mt-2 max-w-md text-sm text-white/70">
            © 2026 TalentRenew. Plataforma para potenciar talento senior y
            conectar experiencia con oportunidades reales.
          </p>
        </div>

        <nav className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider text-white/70">
          <a className="hover:text-white" href="#">
            Institucional
          </a>
          <a className="hover:text-white" href="#">
            Carreras
          </a>
          <a className="hover:text-white" href="#">
            Privacidad
          </a>
          <a className="hover:text-white" href="#">
            Soporte
          </a>
        </nav>
      </div>
    </footer>
  );
}
