export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 h-16 w-full border-b border-slate-100 bg-white/90 shadow-[0_4px_20px_rgba(26,43,75,0.08)] backdrop-blur-md">
      <div className="app-container flex h-full items-center justify-between">
        <a className="text-xl font-black tracking-tight text-[#1A2B4B]" href="#inicio">
          TalentRenew
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            className="border-b-2 border-secondary pb-1 text-sm font-bold text-[#1A2B4B]"
            href="#inicio"
          >
            Inicio
          </a>
          <a className="text-sm font-medium text-slate-600 hover:text-secondary" href="#como-funciona">
            Cómo funciona
          </a>
          <a className="text-sm font-medium text-slate-600 hover:text-secondary" href="#profesionales">
            Para profesionales
          </a>
          <a className="text-sm font-medium text-slate-600 hover:text-secondary" href="#empresas">
            Para empresas
          </a>
        </nav>

        <button className="btn-primary !h-10 !px-6">Iniciar sesión</button>
      </div>
    </header>
  );
}
