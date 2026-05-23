export default function Footer() {
  return (
    <footer className="bg-[#1A2B4B] text-white py-12 px-8">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between gap-8">
        
        <div>
          <h2 className="text-lg font-bold text-teal-400">
            TalentRenew
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-sm">
            © 2026 TalentRenew. Empowering experienced authority and continuous growth.
          </p>
        </div>

        <div className="flex gap-8 text-sm uppercase tracking-widest">
          <a className="text-slate-400 hover:text-white" href="#">Institutional</a>
          <a className="text-slate-400 hover:text-white" href="#">Careers</a>
          <a className="text-slate-400 hover:text-white" href="#">Privacy</a>
          <a className="text-slate-400 hover:text-white" href="#">Support</a>
        </div>

      </div>
    </footer>
  );
}