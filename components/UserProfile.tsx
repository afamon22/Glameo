
import React, { useState, useEffect } from 'react';
import { db } from '../services/database';
import { MOCK_SALONS } from '../constants';
import { Calendar, Heart, ArrowLeft, Crown, Gift, MapPin, Clock, Star, Scissors, LayoutGrid, List, Share2, Copy, Check, Users, Sparkles, MessageSquare, AlertCircle, Info, StarHalf, MessageCircle, Send, CheckCircle2, Wand2, FileText, Download } from 'lucide-react';
import { Booking, Salon, Review } from '../types';
import ChatWindow from './ChatWindow';
import { generateReceiptPDF } from '../services/pdfService';

interface UserProfileProps {
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<Salon[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'favorites' | 'referral'>('bookings');
  const [copied, setCopied] = useState(false);
  const [activeChat, setActiveChat] = useState<{ id: string, name: string } | null>(null);
  const [showPolicyId, setShowPolicyId] = useState<string | null>(null);
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const referralCode = "JANE-GLAM-2025";
  const currentUserId = "user-123";

  useEffect(() => {
    const allBookings = db.getBookings();
    setBookings(allBookings.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()));

    const savedFavIds: string[] = JSON.parse(localStorage.getItem('glameo_favorites') || '[]');
    const favSalons = MOCK_SALONS.filter(s => savedFavIds.includes(s.id));
    setFavorites(favSalons);
  }, []);

  const handleDownloadReceipt = (booking: Booking) => {
    const salon = MOCK_SALONS.find(s => s.id === booking.salonId);
    if (!salon) return;
    const service = salon.services.find(s => s.id === booking.serviceId) || salon.services[0];
    generateReceiptPDF(booking, salon, service);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReviewSubmit = async () => {
    if (!reviewBooking) return;
    setIsSubmittingReview(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmittingReview(false);
    setReviewBooking(null);
    setReviewComment('');
    setReviewRating(5);
    alert("Merci pour votre avis ! Votre expérience aide la communauté Glameo.");
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getSalon = (id: string) => MOCK_SALONS.find(s => s.id === id);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 relative">
      <div className="bg-slate-900 text-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white font-bold mb-10 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Retour à la recherche
          </button>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-4xl font-black shadow-2xl border-4 border-white/10">
                JD
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-black">Jane Doe</h1>
                <div className="flex gap-3">
                  <span className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Crown size={14} className="text-amber-500" /> Glameo Gold
                  </span>
                  <span className="bg-orange-600/20 text-orange-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Gift size={14} /> 450 Points
                  </span>
                </div>
              </div>
            </div>

            <div className="flex bg-white/5 p-2 rounded-3xl backdrop-blur-md overflow-x-auto max-w-full">
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`px-6 md:px-8 py-4 rounded-2xl font-black text-sm transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === 'bookings' ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-white'}`}
              >
                <Calendar size={18} /> Mes RDV
              </button>
              <button 
                onClick={() => setActiveTab('favorites')}
                className={`px-6 md:px-8 py-4 rounded-2xl font-black text-sm transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === 'favorites' ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-white'}`}
              >
                <Heart size={18} /> Favoris
              </button>
              <button 
                onClick={() => setActiveTab('referral')}
                className={`px-6 md:px-8 py-4 rounded-2xl font-black text-sm transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === 'referral' ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-white'}`}
              >
                <Gift size={18} /> Cadeaux
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-16">
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {bookings.length > 0 ? bookings.map(booking => {
              const salon = getSalon(booking.salonId);
              const isCompleted = booking.status === 'completed';
              return (
                <div key={booking.id} className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-slate-200 border border-slate-100 flex flex-col md:flex-row gap-8 items-center group hover:shadow-2xl transition-all relative">
                  <div className="w-full md:w-32 h-32 rounded-[2rem] overflow-hidden shrink-0">
                    <img src={salon?.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Salon" />
                  </div>
                  <div className="flex-grow space-y-3 w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-black text-slate-900">{salon?.name}</h3>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 
                        booking.status === 'completed' ? 'bg-blue-50 text-blue-600' :
                        'bg-slate-50 text-slate-400'
                      }`}>
                        {booking.status === 'confirmed' ? 'Confirmé' : booking.status === 'completed' ? 'Soin Réalisé' : 'Terminé'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-500">
                      <span className="flex items-center gap-2 text-slate-900 font-black"><Scissors size={16} className="text-orange-600" /> {booking.serviceId === 's1' ? 'Coupe Femme' : 'Soin Beauté'}</span>
                      <span className="flex items-center gap-2"><Calendar size={16} /> {formatDate(booking.dateTime)}</span>
                      <span className="flex items-center gap-2"><Clock size={16} /> {booking.dateTime.split('T')[1].substr(0, 5)}</span>
                    </div>
                    
                    {booking.status === 'confirmed' && salon && (
                      <div className="pt-2">
                        <button 
                          onClick={() => setShowPolicyId(showPolicyId === booking.id ? null : booking.id)}
                          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors bg-amber-50 px-3 py-1.5 rounded-lg"
                        >
                          <AlertCircle size={12} /> Politique d'annulation & pénalités
                        </button>
                        {showPolicyId === booking.id && (
                          <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 animate-in slide-in-from-top-2 duration-300">
                             <p className="font-bold mb-2 text-slate-900">Engagement Ponctualité Glameo :</p>
                             <ul className="space-y-1.5">
                               <li>• Annulation gratuite jusqu'à <span className="font-black text-slate-900">{salon.cancellationPolicy.freeUntilHours}h</span> avant.</li>
                               <li>• Moins de {salon.cancellationPolicy.freeUntilHours}h : <span className="font-black text-rose-600">{salon.cancellationPolicy.lateCancelFeePercent}%</span> du montant.</li>
                               <li>• No-show : <span className="font-black text-rose-600">{salon.cancellationPolicy.noShowFeePercent}%</span> du montant.</li>
                             </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
                     <div className="text-2xl font-black text-slate-900 mb-2">{booking.totalPrice}$</div>
                     <div className="flex flex-wrap gap-2 w-full justify-center md:justify-end">
                        {isCompleted && (
                          <button 
                            onClick={() => handleDownloadReceipt(booking)}
                            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-xs hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
                          >
                            <FileText size={14} /> Reçu PDF
                          </button>
                        )}
                        <button 
                          onClick={() => setActiveChat({ id: booking.salonId, name: salon?.name || "" })}
                          className="px-6 py-3 bg-orange-50 text-orange-600 rounded-xl font-black text-xs hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          <MessageSquare size={14} /> Message
                        </button>
                     </div>
                  </div>
                </div>
              );
            }) : (
              <div className="bg-white rounded-[3rem] p-16 text-center shadow-xl border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-2">Aucun rendez-vous</h3>
                <p className="text-slate-400 font-bold mb-8">Vous n'avez pas encore réservé de soin avec Glameo.</p>
                <button onClick={onBack} className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-orange-700 transition-all shadow-lg">Trouver un salon</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="grid md:grid-cols-2 gap-8">
            {favorites.map(salon => (
              <div key={salon.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all group relative cursor-pointer" onClick={onBack}>
                <div className="relative h-48 overflow-hidden">
                   <img src={salon.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={salon.name} />
                   <div className="absolute top-4 right-4 p-3 bg-orange-600 text-white rounded-2xl shadow-xl">
                      <Heart size={20} fill="currentColor" />
                   </div>
                </div>
                <div className="p-6">
                   <h3 className="text-xl font-black text-slate-900 mb-2">{salon.name}</h3>
                   <div className="flex items-center gap-2 text-sm text-slate-400 font-bold mb-6">
                      <MapPin size={14} /> {salon.address.split(',')[1]}
                   </div>
                   <button className="w-full bg-slate-50 text-slate-900 py-3 rounded-xl font-black hover:bg-orange-600 hover:text-white transition-all">Réserver à nouveau</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {reviewBooking && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setReviewBooking(null)} />
           <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl p-10 animate-in zoom-in duration-300">
              <div className="text-center space-y-4 mb-8">
                <h3 className="text-3xl font-black text-slate-900">Votre avis sur {getSalon(reviewBooking.salonId)?.name}</h3>
              </div>
              <div className="space-y-8">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => setReviewRating(star)} className={`p-2 transition-all transform hover:scale-125 ${star <= reviewRating ? 'text-yellow-400' : 'text-slate-200'}`}>
                      <Star size={40} fill={star <= reviewRating ? "currentColor" : "none"} strokeWidth={2.5} />
                    </button>
                  ))}
                </div>
                <textarea 
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  placeholder="Écrivez ici vos impressions..."
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 font-bold text-slate-900 focus:border-blue-500 focus:outline-none transition-all min-h-[120px]"
                />
                <button 
                  onClick={handleReviewSubmit}
                  disabled={isSubmittingReview || reviewComment.length < 5}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50"
                >
                  {isSubmittingReview ? "Envoi..." : "Publier l'avis"}
                </button>
              </div>
           </div>
        </div>
      )}

      {activeChat && (
        <div className="fixed bottom-10 right-10 z-[100] w-full max-w-[400px] h-[550px] shadow-2xl rounded-[2.5rem] overflow-hidden border border-slate-200">
           <ChatWindow currentUserId={currentUserId} partnerId={activeChat.id} partnerName={activeChat.name} onClose={() => setActiveChat(null)} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
