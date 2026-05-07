import { Button } from "@/components/ui/button";
import Link from "next/link";

const data = {
  navMain: [
    { name: "Home", href: "#", active: true },
    { name: "How it works", href: "#" },
    { name: "For Professionals", href: "#" },
    { name: "For Companies", href: "#" },
  ],
};

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white/90 backdrop-blur-sm border-b border-slate-100 z-50 shadow-[0px_4px_20px_rgba(26,43,75,0.08)]">
      <div className="max-w-container-max mx-auto px-8 h-full flex items-center justify-between">
        <div className="text-xl font-extrabold text-primary tracking-tight font-heading">TalentRenew</div>
        <nav className="hidden md:flex items-center gap-8">
          {data.navMain.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-base font-semibold transition ${
                item.active
                  ? "text-primary border-b-3 border-[#156967] pb-1"
                  : "text-[#475569] hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <Button>Login</Button>
      </div>
    </header>
  );
}
