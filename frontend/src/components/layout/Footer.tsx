export default function Footer() {
  return (
    <footer className="bg-[#1A2B4B] px-8 py-12 text-white">
      <div className="mx-auto flex max-w-container-max flex-col justify-between gap-8 md:flex-row">
        <div>
          <h2 className="text-lg font-bold text-teal-400">TalentRenew</h2>
          <p className="mt-2 max-w-sm text-sm text-slate-400">
            © 2026 TalentRenew. Impulsando la autoridad experiencial y el crecimiento continuo.
          </p>
        </div>

        <div className="flex gap-8 text-sm uppercase tracking-widest">
          <a className="text-slate-400 hover:text-white" href="#">
            Institucional
          </a>
          <a className="text-slate-400 hover:text-white" href="#">
            Carreras
          </a>
          <a className="text-slate-400 hover:text-white" href="#">
            Privacidad
          </a>
          <a className="text-slate-400 hover:text-white" href="#">
            Soporte
          </a>
        </div>
      </div>
    </footer>
  );
}
