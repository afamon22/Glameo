
import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Smartphone, 
  Calendar, 
  BarChart3, 
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
  MousePointer2,
  ShieldAlert,
  FileText
} from 'lucide-react';
import RegistrationForm from './RegistrationForm';

interface ProviderLandingProps {
  onLogin: () => void;
  onNavStatic?: (type: 'ABOUT') => void;
}

const ProviderLanding: React.FC<ProviderLandingProps> = ({ onLogin, onNavStatic }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  if (showForm) {
    return (
      <RegistrationForm 
        initialPlan={selectedPlan} 
        onBack={() => setShowForm(false)} 
        onSubmit={onLogin} 
      />
    );
  }

  return (
    <div className="bg-white">
      <section className="bg-slate-900 py-20 md:py-32 relative overflow-hidden">
        {/* Decorative Canadian Flag Background Element */}
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none rotate-12">
            <span className="text-[300px]">🇨🇦</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-black uppercase tracking-widest">
                  <ShieldAlert size={14} /> 0% Commission - 100% Pour Vous
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-white leading-tight">
                  Gardez vos <br/>
                  <span className="text-orange-500">revenus</span>
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed font-medium max-w-xl">
                  Glameo n'est pas une place de marché qui ponctionne vos ventes. C'est votre logiciel de gestion local, sans frais cachés.
                </p>
              </div>

              <button 
                onClick={() => setShowForm(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-orange-900/40 transition-all flex items-center gap-3 active:scale-95"
              >
                Inscrire mon salon
                <ArrowRight size={24} />
              </button>
            </div>
            
            <div className="relative hidden lg:flex flex-col items-end">
              {/* CANADIAN PRIDE MESSAGE - EXTREME RIGHT - ABOVE IMAGE */}
              <div className="mb-6 flex flex-col items-end gap-1 w-full text-right">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
                  Fièrement développé au Canada
                </span>
                <button 
                  onClick={() => onNavStatic?.('ABOUT')}
                  className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:text-orange-400 transition-colors flex items-center gap-1 group"
                >
                  À propos <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="relative">
                <div className="bg-orange-500 w-full h-full absolute -top-10 -right-10 rounded-full blur-[120px] opacity-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop" 
                  className="rounded-[4rem] shadow-2xl border-8 border-slate-800 rotate-2 transition-all"
                  alt="Gestion Salon"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Un prix fixe, une liberté totale</h2>
            <p className="text-xl text-slate-500 font-medium">Glameo se rémunère par un abonnement transparent, pas sur votre travail.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Zap className="text-orange-600" size={32} />, title: "Commission 0%", desc: "Peu importe votre chiffre d'affaires, nous ne prélevons aucun pourcentage sur vos prestations." },
              { icon: <FileText className="text-emerald-600" size={32} />, title: "Facturation Auto", desc: "Générez des reçus PDF professionnels instantanément après chaque soin pour vos clients." },
              { icon: <Users className="text-purple-600" size={32} />, title: "Agent IA Inclus", desc: "Offrez à vos clients l'accès à notre assistant IA dès qu'ils réservent chez vous." }
            ].map((feat, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8">{feat.icon}</div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{feat.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-900 text-white rounded-[4rem] mx-4 mb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-20">Nos Forfaits Pro</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* PLAN MENSUEL */}
            <div className="bg-white text-slate-900 p-12 rounded-[3rem] shadow-xl relative flex flex-col">
              <h3 className="text-2xl font-black mb-8">Mensuel</h3>
              <div className="mb-10 flex items-end justify-center gap-2">
                <span className="text-6xl font-black">29$</span>
                <span className="text-xl font-bold text-slate-400 mb-2">/ mois</span>
              </div>
              <ul className="space-y-5 mb-12 text-left flex-grow">
                {[
                  "0% Commission sur vos soins", 
                  "Agenda & Réservations Illimités", 
                  "Rappels SMS & Emails auto", 
                  "Facturation auto (Reçus PDF)",
                  "Assistant IA Vision pour vos clients"
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 font-bold text-slate-600">
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0" /> 
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowForm(true)} className="w-full py-5 rounded-2xl border-2 border-slate-200 font-black text-xl hover:bg-slate-900 hover:text-white transition-all">S'abonner</button>
            </div>

            {/* PLAN ANNUEL */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-12 rounded-[3rem] relative flex flex-col">
              <div className="absolute -top-5 right-10 bg-orange-600 text-white px-6 py-2 rounded-full font-black text-sm uppercase shadow-lg shadow-orange-900/40">Meilleur Prix</div>
              <h3 className="text-2xl font-black mb-8 text-white">Annuel</h3>
              <div className="mb-10 flex items-end justify-center gap-2">
                <span className="text-6xl font-black text-orange-500">24$</span>
                <span className="text-xl font-bold text-slate-500 mb-2">/ mois</span>
              </div>
              <ul className="space-y-5 mb-12 text-left flex-grow">
                {[
                  "Économisez 60$ par an", 
                  "Tout ce qui est dans le Mensuel",
                  "Rapports financiers PDF exports",
                  "Support prioritaire 24/7", 
                  "Vitrine Web & SEO local inclus",
                  "Badges de certification 'Verified'"
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 font-bold text-slate-200">
                    <CheckCircle2 size={20} className="text-orange-500 shrink-0" /> 
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => { setSelectedPlan('yearly'); setShowForm(true); }} className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-orange-700 transition-all shadow-orange-900/20">Choisir l'annuel</button>
            </div>
          </div>
          
          <div className="mt-16 flex flex-col items-center gap-4">
             <p className="text-slate-500 font-bold italic">
               * Tarifs en Dollars Canadiens (CAD). Sans engagement pour le forfait mensuel.
             </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProviderLanding;
