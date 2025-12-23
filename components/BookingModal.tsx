
import React, { useState } from 'react';
import { X, Calendar, Clock, ChevronRight, CheckCircle2, CreditCard, ShieldCheck, Lock, Star, Quote, Gift, Ticket, AlertTriangle, ShieldAlert, ImageIcon, Sparkles, MapPin, Navigation, ExternalLink } from 'lucide-react';
import { Salon, Service } from '../types';
import { db } from '../services/database';

interface BookingModalProps {
  salon: Salon;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ salon, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);

  const timeSlots = ['09:00', '10:00', '11:00', '13:30', '14:30', '15:45', '17:00'];

  const handleApplyPromo = () => {
    if (promoCode.trim().length > 3) {
      setIsPromoApplied(true);
    }
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    return isPromoApplied ? Math.max(0, selectedService.price - 10) : selectedService.price;
  };

  const handleOpenMaps = () => {
    const encodedAddress = encodeURIComponent(salon.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handlePayment = async () => {
    if (!selectedService || !selectedTime || !acceptPolicy) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    db.createBooking({
      salonId: salon.id,
      serviceId: selectedService.id,
      clientId: 'user-123',
      clientName: 'Client Démo',
      dateTime: `2025-10-12T${selectedTime}:00`,
      status: 'confirmed',
      totalPrice: calculateTotal(),
      paymentStatus: 'paid'
    });
    setIsProcessing(false);
    setStep(4);
    setTimeout(() => onClose(), 4000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-300">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900">{salon.name}</h2>
            <div className="flex gap-2 mt-1">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-8 bg-orange-600' : 'w-4 bg-slate-200'}`} />
              ))}
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Galerie Preview Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={14} className="text-orange-600" /> Ambiance & Portfolio
                  </h4>
                  <span className="text-[10px] font-bold text-slate-300">3 Photos</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 aspect-video rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                    <img src={salon.imageUrl} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Cover" />
                  </div>
                  <div className="grid grid-rows-2 gap-2">
                    {salon.galleryImages.map((img, i) => (
                      <div key={i} className="rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                        <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={`Gallery ${i+1}`} />
                      </div>
                    ))}
                    {salon.galleryImages.length < 2 && Array(2 - salon.galleryImages.length).fill(0).map((_, i) => (
                      <div key={`empty-${i}`} className="bg-slate-50 rounded-xl flex items-center justify-center border border-dashed border-slate-200">
                        <ImageIcon className="text-slate-200" size={16} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Géolocalisation Section Simple */}
              <div className="bg-slate-50 rounded-[2.5rem] p-6 border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-white rounded-xl text-orange-600 shadow-sm">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900">Localisation</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{salon.address}</p>
                      </div>
                   </div>
                   <button 
                    onClick={handleOpenMaps}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg"
                   >
                     <Navigation size={12} /> Itinéraire
                   </button>
                </div>
                {/* Carte statique simulée */}
                <div className="relative h-24 rounded-2xl overflow-hidden bg-slate-200 cursor-pointer group" onClick={handleOpenMaps}>
                   <img 
                    src={`https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop`} 
                    className="w-full h-full object-cover opacity-60 grayscale" 
                    alt="Map Preview" 
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-2xl animate-bounce">
                        <MapPin size={24} />
                      </div>
                   </div>
                   <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all"></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900">Nos Prestations</h3>
                <div className="grid gap-3">
                  {salon.services.map(service => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        setStep(2);
                      }}
                      className="w-full text-left p-6 rounded-3xl border-2 border-slate-50 hover:border-orange-200 hover:bg-orange-50/50 transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-1">
                        <div className="font-black text-lg text-slate-900 group-hover:text-orange-600 transition-colors">{service.name}</div>
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                          <span className="flex items-center gap-1"><Clock size={14} /> {service.duration} min</span>
                          <span className="text-orange-600 font-black">{service.price}$</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
                        <ChevronRight size={20} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
              <button onClick={() => setStep(1)} className="text-orange-600 font-black flex items-center gap-2 text-sm uppercase tracking-widest">← Retour</button>
              <h3 className="text-2xl font-black text-slate-900">Choisir le créneau</h3>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map(time => (
                  <button key={time} onClick={() => { setSelectedTime(time); setStep(3); }} className="py-4 rounded-2xl border-2 border-slate-50 font-black text-slate-700 hover:bg-orange-600 hover:text-white transition-all shadow-sm">{time}</button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 py-2 animate-in fade-in slide-in-from-right duration-500">
              <h3 className="text-2xl font-black text-slate-900">Paiement sécurisé</h3>
              
              <div className="bg-slate-900 rounded-[2rem] p-6 text-white space-y-4 shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service</p>
                    <p className="text-lg font-black">{selectedService?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</p>
                    <div className="flex flex-col items-end">
                      {isPromoApplied && <span className="text-xs line-through text-slate-500">{selectedService?.price}$</span>}
                      <p className="text-2xl font-black text-orange-500">{calculateTotal()}$</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-white/10">
                   <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 mb-1">
                     <ShieldCheck size={14} className="text-emerald-500" />
                     Paiement crypté SSL
                   </div>
                  <input type="text" placeholder="Numéro de carte" defaultValue="4242 4242 4242 4242" className="w-full bg-white/10 border border-white/10 rounded-xl p-3 font-bold text-white text-sm" />
                </div>
              </div>

              {/* Penalty Awareness Card */}
              <div className="bg-amber-50 border border-amber-100 rounded-[2rem] p-5 space-y-3">
                 <div className="flex items-center gap-2 text-amber-700 font-black text-xs uppercase tracking-widest">
                    <ShieldAlert size={16} /> Engagement Ponctualité
                 </div>
                 <p className="text-xs text-amber-900 leading-relaxed font-medium">
                    Annulation gratuite jusqu'à <span className="font-black">{salon.cancellationPolicy.freeUntilHours}h</span> avant. Passé ce délai, des frais de <span className="font-black">{salon.cancellationPolicy.lateCancelFeePercent}%</span> s'appliquent. Les no-shows sont facturés à <span className="font-black">{salon.noShowFeePercent || 100}%</span>.
                 </p>
                 <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${acceptPolicy ? 'bg-orange-600 border-orange-600' : 'bg-white border-amber-200 group-hover:border-orange-400'}`}>
                       {acceptPolicy && <CheckCircle2 size={16} className="text-white" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={acceptPolicy} 
                      onChange={() => setAcceptPolicy(!acceptPolicy)} 
                    />
                    <span className="text-xs font-black text-amber-900">J'accepte la politique d'annulation</span>
                 </label>
              </div>

              {/* Promo Section */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Code parrainage ou promo" 
                    className="flex-grow bg-slate-50 border-2 border-slate-100 rounded-xl p-3 font-bold text-slate-900 text-sm focus:border-orange-500 focus:outline-none transition-all"
                  />
                  <button 
                    onClick={handleApplyPromo}
                    disabled={isPromoApplied || !promoCode}
                    className="bg-slate-900 text-white px-5 rounded-xl font-black text-[10px] hover:bg-orange-600 transition-all disabled:opacity-50"
                  >
                    {isPromoApplied ? 'OK' : 'Appliquer'}
                  </button>
                </div>
              </div>

              <button 
                onClick={handlePayment} 
                disabled={isProcessing || !acceptPolicy} 
                className={`w-full py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl ${acceptPolicy ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
              >
                {isProcessing ? <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" /> : <>Confirmer & Payer {calculateTotal()}$</>}
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-16 flex flex-col items-center animate-in fade-in zoom-in duration-700">
              <CheckCircle2 size={56} className="text-emerald-600 mb-6" />
              <h3 className="text-4xl font-black text-slate-900 mb-4">Confirmé !</h3>
              <p className="text-lg text-slate-500 mb-10 font-medium text-center">Votre rendez-vous est validé.<br/>Retrouvez les détails dans votre espace client.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
