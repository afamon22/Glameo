
import React from 'react';
import { Calendar, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface FooterProps {
  onNavBlog?: () => void;
  onNavStatic?: (type: 'HOW_IT_WORKS' | 'TERMS' | 'PRIVACY' | 'COOKIES' | 'HELP' | 'SALONS_INFO' | 'PRIVILEGES' | 'ABOUT') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavBlog, onNavStatic }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="text-orange-500">
                <Calendar size={32} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Glameo
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium">
              Sublimez votre quotidien. La plateforme préférée pour trouver et réserver les meilleurs experts beauté au Canada.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black text-lg mb-6">Glameo</h4>
            <ul className="space-y-4 font-bold">
              <li><button onClick={() => onNavStatic?.('SALONS_INFO')} className="hover:text-orange-500 transition-colors text-left">Les Salons</button></li>
              <li><button onClick={onNavBlog} className="hover:text-orange-500 transition-colors text-left">Le Magazine</button></li>
              <li><button onClick={() => onNavStatic?.('HOW_IT_WORKS')} className="hover:text-orange-500 transition-colors text-left">Concept</button></li>
              <li><button onClick={() => onNavStatic?.('PRIVILEGES')} className="hover:text-orange-500 transition-colors text-left">Privilèges</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-lg mb-6">Légal</h4>
            <ul className="space-y-4 font-bold">
              <li><button onClick={() => onNavStatic?.('TERMS')} className="hover:text-orange-500 transition-colors text-left">CGU</button></li>
              <li><button onClick={() => onNavStatic?.('PRIVACY')} className="hover:text-orange-500 transition-colors text-left">Confidentialité</button></li>
              <li><button onClick={() => onNavStatic?.('COOKIES')} className="hover:text-orange-500 transition-colors text-left">Cookies</button></li>
              <li><button onClick={() => onNavStatic?.('HELP')} className="hover:text-orange-500 transition-colors text-left">Assistance</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-lg mb-6">Contact</h4>
            <ul className="space-y-4 font-bold">
              <li className="flex items-start gap-3">
                <MapPin className="text-orange-500 shrink-0" size={20} />
                <span className="text-sm">1234 Rue Mont-Royal E, Montréal, QC</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-orange-500 shrink-0" size={20} />
                <span className="text-sm">+1 (514) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-orange-500 shrink-0" size={20} />
                <span className="text-sm">bonjour@glameo.ca</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold text-slate-500">
            © 2025 Glameo Canada. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
