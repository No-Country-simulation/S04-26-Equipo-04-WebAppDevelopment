import Link from 'next/link';
import { Logo } from '@/components/Logo';
import {  MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-base">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-start justify-between">
          <div className="text-white">
            <Logo />
          </div>
          <div className="flex gap-8">
            <Link href="/como-funciona" className="text-[12px] text-text-muted-dark hover:text-text-secondary-dark transition-colors">
              Cómo funciona
            </Link>
            <Link href="/empresas" className="text-[12px] text-text-muted-dark hover:text-text-secondary-dark transition-colors">
              Para empresas
            </Link>
            <Link href="/terminos" className="text-[12px] text-text-muted-dark hover:text-text-secondary-dark transition-colors">
              Términos
            </Link>
            <Link href="/privacidad" className="text-[12px] text-text-muted-dark hover:text-text-secondary-dark transition-colors">
              Privacidad
            </Link>
          </div>
        </div>

        <div className="border-t border-white/8 mt-8 pt-6 flex items-center justify-between">
          <p className="text-[12px] text-text-muted-dark">
            © 2026 TalentRenew · Red de Bienestar Laboral
          </p>
          <div className="flex gap-4">
            {/* <a href="#" className="text-[#4A6480] hover:text-text-secondary-dark transition-colors">
              <Linkedin size={16} />
            </a>
            <a href="#" className="text-[#4A6480] hover:text-text-secondary-dark transition-colors">
              <Instagram size={16} />
            </a> */}
            <a href="#" className="text-[#4A6480] hover:text-text-secondary-dark transition-colors">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}