
import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  mode: 'login' | 'signup';
  onClose: () => void;
  onSubmit: (email: string, password: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSubmit }) => {
  const [currentMode, setCurrentMode] = useState<'login' | 'signup'>(mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Simulation d'un délai réseau
    setTimeout(() => {
      setLoading(false);
      onSubmit(email, password);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-slate-900">
                {currentMode === 'login' ? 'Connexion' : 'Bienvenue !'}
              </h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Espace Glameo Canada</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {currentMode === 'signup' && (
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <User size={14} /> Nom complet
                </label>
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Marie Tremblay" 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-orange-500 focus:outline-none transition-all"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Mail size={14} /> Courriel
              </label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com" 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-orange-500 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Lock size={14} /> Mot de passe
              </label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-orange-500 focus:outline-none transition-all"
              />
            </div>

            {currentMode === 'login' && (
              <div className="text-right">
                <button type="button" className="text-xs font-bold text-orange-600 hover:underline">Mot de passe oublié ?</button>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xl shadow-xl shadow-slate-200 hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{currentMode === 'login' ? 'Se connecter' : 'Créer mon compte'}</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center space-y-4">
            <p className="text-sm font-bold text-slate-500">
              {currentMode === 'login' ? "Pas encore de compte ?" : "Déjà membre ?"}
              <button 
                onClick={() => setCurrentMode(currentMode === 'login' ? 'signup' : 'login')}
                className="ml-2 text-orange-600 font-black hover:underline"
              >
                {currentMode === 'login' ? "S'inscrire" : "Se connecter"}
              </button>
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 inline-flex items-center gap-3">
              <ShieldCheck size={16} className="text-slate-400" />
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Identifiants Admin Test</p>
                <p className="text-[10px] font-bold text-slate-600">admin@glameo.ca / Admin2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
