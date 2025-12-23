
import React, { useState } from 'react';
import { Store, User, Mail, Phone, MapPin, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface RegistrationFormProps {
  onBack: () => void;
  onSubmit: () => void;
  initialPlan?: 'monthly' | 'yearly';
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onBack, onSubmit, initialPlan = 'monthly' }) => {
  const [plan, setPlan] = useState(initialPlan);

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 font-bold transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Retour à Glameo
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Inscrire mon salon</h2>
              <p className="text-slate-500 font-bold italic">Propulsez votre succès avec Glameo Canada</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Store size={14} /> Salon</label>
                  <input required type="text" placeholder="Le Studio Glameo" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-orange-500 focus:outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User size={14} /> Propriétaire</label>
                  <input required type="text" placeholder="Alex Tremblay" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-orange-500 focus:outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Mail size={14} /> Courriel pro</label>
                <input required type="email" placeholder="salon@glameo.ca" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-orange-500 focus:outline-none transition-all" />
              </div>

              <div className="pt-8 text-center space-y-4">
                <button type="submit" className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all active:scale-95">
                  Lancer mon salon sur Glameo
                </button>
                <p className="text-xs font-bold text-slate-400 italic">Essai gratuit de 14 jours inclus.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
