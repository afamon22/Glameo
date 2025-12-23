
import React, { useState } from 'react';
import { Play, User, Scissors, Wand2, Bell, Zap, X, Terminal, CheckCircle2, Calendar, ShieldCheck } from 'lucide-react';

interface SimulationPanelProps {
  onSimulateBooking: () => void;
  onSimulateHairstyle: () => void;
  onSwitchRole: (role: any) => void;
}

const SimulationPanel: React.FC<SimulationPanelProps> = ({ 
  onSimulateBooking, 
  onSimulateHairstyle,
  onSwitchRole
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const triggerAction = (label: string, action: () => void) => {
    action();
    setLastAction(label);
    setTimeout(() => setLastAction(null), 3000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-[60] bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all border border-white/20 group"
      >
        <Terminal size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2 bg-orange-600 text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">DEV</span>
      </button>

      {/* Side Panel Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-600 rounded-xl">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="font-black text-lg">Simulation Lab</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contrôle de scénarios</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-8">
              {/* Scénario 1: Réservation */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Flux Client/Pro</h4>
                <button 
                  onClick={() => triggerAction("Réservation créée", onSimulateBooking)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all group text-left"
                >
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-xl group-hover:scale-110 transition-transform">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <div className="font-black text-slate-900">Simuler une Réservation</div>
                    <div className="text-xs text-slate-500 font-medium">Envoie un nouveau RDV au pro</div>
                  </div>
                </button>
              </div>

              {/* Scénario 2: IA */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Intelligence Artificielle</h4>
                <button 
                  onClick={() => triggerAction("Look IA prêt", onSimulateHairstyle)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-left"
                >
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform">
                    <Wand2 size={20} />
                  </div>
                  <div>
                    <div className="font-black text-slate-900">Simuler un Look IA</div>
                    <div className="text-xs text-slate-500 font-medium">Active l'éditeur de style</div>
                  </div>
                </button>
              </div>

              {/* Navigation Rapide */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Accès aux Plateformes</h4>
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={() => { onSwitchRole('CLIENT'); setIsOpen(false); }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all font-bold text-slate-600 text-sm"
                  >
                    <User size={18} /> Interface Client
                  </button>
                  <button 
                    onClick={() => { onSwitchRole('PROVIDER'); setIsOpen(false); }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all font-bold text-slate-600 text-sm"
                  >
                    <Scissors size={18} /> Interface Prestataire
                  </button>
                  <button 
                    onClick={() => { onSwitchRole('ADMIN'); setIsOpen(false); }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 text-white hover:bg-black transition-all font-black text-sm shadow-xl shadow-slate-200"
                  >
                    <ShieldCheck size={18} className="text-orange-500" /> Console Administrateur
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Toast in Lab */}
            {lastAction && (
              <div className="m-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-300">
                <CheckCircle2 className="text-emerald-600" size={20} />
                <span className="text-sm font-black text-emerald-900">{lastAction}</span>
              </div>
            )}

            <div className="p-6 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-400 font-bold text-center">
              GLAMEO SIMULATOR V1.1
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimulationPanel;
