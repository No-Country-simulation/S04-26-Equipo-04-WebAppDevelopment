export default function Footer() {
  return (
    <footer className="bg-ring px-8 py-12 text-primary-foreground">
      <div className="mx-auto flex max-w-container-max flex-col justify-between gap-8 md:flex-row">
        <div>
          <h2 className="text-lg font-bold text-secondary-200">TalentRenew</h2>
          <p className="mt-2 max-w-sm text-sm text-primary-foreground/70">
            © 2026 TalentRenew. Impulsando la autoridad experiencial y el crecimiento continuo.
          </p>
        </div>

        <div className="flex gap-8 text-sm uppercase tracking-widest">
          <a className="text-primary-foreground/70 transition hover:text-primary-foreground" href="#">
            Institucional
          </a>
          <a className="text-primary-foreground/70 transition hover:text-primary-foreground" href="#">
            Carreras
          </a>
          <a className="text-primary-foreground/70 transition hover:text-primary-foreground" href="#">
            Privacidad
          </a>
          <a className="text-primary-foreground/70 transition hover:text-primary-foreground" href="#">
            Soporte
          </a>
        </div>
      </div>
    </footer>
  );
}
