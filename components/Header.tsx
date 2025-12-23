
import React from 'react';
import { UserRole } from '../types';
import { Calendar, User, LogOut, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  isBlogActive?: boolean;
  setRole: (role: UserRole | 'BLOG') => void;
  isLoggedIn: boolean;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenProfile: () => void;
  onLogout: () => void;
  isAdmin?: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentRole, isBlogActive, setRole, isLoggedIn, onOpenAuth, onOpenProfile, onLogout, isAdmin }) => {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setRole(UserRole.CLIENT)}>
          <div className="text-orange-600">
            <Calendar size={28} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            Glameo
          </span>
        </div>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setRole(UserRole.CLIENT)}
              className={`text-sm font-semibold transition-colors ${currentRole === UserRole.CLIENT && !isBlogActive ? 'text-orange-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Découvrir
            </button>
            <button 
              onClick={() => setRole('BLOG')}
              className={`text-sm font-semibold transition-colors ${isBlogActive ? 'text-orange-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Magazine
            </button>
            <button 
              onClick={() => setRole(UserRole.PROVIDER)}
              className={`text-sm font-semibold transition-colors ${currentRole === UserRole.PROVIDER ? 'text-orange-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Espace Pro
            </button>
            
            {isAdmin && (
              <button 
                onClick={() => setRole(UserRole.ADMIN)}
                className={`flex items-center gap-2 text-sm font-black transition-colors px-3 py-1.5 rounded-lg ${currentRole === UserRole.ADMIN ? 'text-white bg-slate-900' : 'text-orange-600 hover:bg-orange-50'}`}
              >
                <ShieldCheck size={16} />
                Console Admin
              </button>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={onOpenProfile}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all"
                >
                  <User size={18} className="text-slate-600" />
                  <span className="text-sm font-black text-slate-900">
                    {isAdmin ? 'Administrateur' : 'Mon Compte'}
                  </span>
                </button>
                <button 
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-orange-600 transition-colors" 
                  title="Déconnexion"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => onOpenAuth('login')}
                  className="hidden sm:block text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors"
                >
                  Connexion
                </button>
                <button 
                  onClick={() => onOpenAuth('signup')}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md"
                >
                  S'inscrire
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
