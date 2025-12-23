
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Wand2, ArrowRight, Gift, Sparkles, ShoppingBag, Lightbulb, ExternalLink, Share2, Heart, ShieldCheck, Lock, Info, Crown, Check, Filter, Scissors, Palette, Sparkle, UserCheck, ChevronDown, Navigation, Target, Globe, AlertTriangle } from 'lucide-react';
import { MOCK_SALONS } from '../constants';
import { smartSearchBeauty } from '../services/geminiService';
import { db } from '../services/database';
import ImageEditor from './ImageEditor';
import BookingModal from './BookingModal';

interface ClientViewProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onNavStatic?: (type: 'ABOUT') => void;
}

const CATEGORIES = [
  { id: 'Tous', label: 'Tous', icon: <Sparkles size={18} /> },
  { id: 'Coiffure', label: 'Coiffure', icon: <Scissors size={18} /> },
  { id: 'Barbier', label: 'Barbier', icon: <UserCheck size={18} /> },
  { id: 'Ongles', label: 'Ongles', icon: <Palette size={18} /> },
  { id: 'Spa', label: 'Spa & Bien-être', icon: <Sparkle size={18} /> },
];

const ClientView: React.FC<ClientViewProps> = ({ onOpenAuth, onNavStatic }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [locationQuery, setLocationQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'none'>('none');
  const [aiAnalysis, setAiAnalysis] = useState<{ data?: any; sources?: any[]; error?: boolean; message?: string } | null>(null);
  const [isSearchingAi, setIsSearchingAi] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<typeof MOCK_SALONS[0] | null>(null);
  const [hasAccessToAi, setHasAccessToAi] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const checkAiAccess = () => {
      const bookings = db.getBookings();
      setHasAccessToAi(bookings.length > 0);
    };
    const savedFavs = localStorage.getItem('glameo_favorites');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    
    checkAiAccess();
    window.addEventListener('storage', checkAiAccess);
    return () => window.removeEventListener('storage', checkAiAccess);
  }, []);

  const handleDetectLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationQuery("Ma position actuelle");
          setIsLocating(false);
        },
        (error) => {
          console.error("Erreur géo:", error);
          setIsLocating(false);
        }
      );
    }
  };

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newFavs = favorites.includes(id) 
      ? favorites.filter(f => f !== id) 
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('glameo_favorites', JSON.stringify(newFavs));
  };

  const handleAiSearch = async () => {
    if (!hasAccessToAi) return;
    if (!searchQuery.trim()) return;
    
    setIsSearchingAi(true);
    setAiAnalysis(null);
    
    const result = await smartSearchBeauty(searchQuery, locationQuery);
    setAiAnalysis(result);
    setIsSearchingAi(false);
    
    // Défilement fluide vers le résultat
    setTimeout(() => {
      const el = document.getElementById('ai-result-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const filteredSalons = MOCK_SALONS
    .filter(salon => {
      const matchesCategory = selectedCategory === 'Tous' || salon.category === selectedCategory;
      const matchesSearch = salon.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            salon.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const cleanLoc = locationQuery.toLowerCase().replace('(ma position)', '').trim();
      const matchesLocation = !cleanLoc || salon.address.toLowerCase().includes(cleanLoc);
      
      return matchesCategory && matchesSearch && matchesLocation;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.services[0].price - b.services[0].price;
      return 0;
    });

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden relative min-h-[700px] flex items-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-white space-y-10 animate-in fade-in slide-in-from-left duration-700">
            <div className="space-y-6">
              <h2 className="uppercase text-xs font-black tracking-[0.3em] text-orange-500">
                L'INNOVATION BEAUTÉ LOCALE
              </h2>
              <h1 className="text-5xl md:text-8xl font-black leading-[1] tracking-tight">
                Facilitez vos <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">rendez-vous</span>
              </h1>
              <p className="text-xl md:text-2xl font-medium text-slate-400 leading-relaxed max-w-xl">
                Réservez vos soins <span className="text-white font-black underline decoration-orange-500 underline-offset-8">en un instant</span> avec l'IA Glameo dans les meilleurs établissements au pays.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => onOpenAuth('signup')}
                className="bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-orange-900/40 transition-all flex items-center gap-3 active:scale-95"
              >
                Découvrir Glameo
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
          
          <div className="relative flex flex-col items-end justify-center animate-in fade-in slide-in-from-right duration-1000">
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

            <div className="relative z-20 w-full max-w-[550px]">
              <div className="relative rounded-[3.5rem] bg-slate-800 p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-4 border-slate-700/50 rotate-2">
                 <div className="relative rounded-[3rem] overflow-hidden aspect-[4/3] bg-slate-900">
                   <img 
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop" 
                    alt="Interface Glameo" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Simple Search Bar */}
        <div className="relative -mt-28 mb-8 z-40">
          <div className="flex flex-col md:flex-row gap-3 bg-white p-5 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-5xl mx-auto relative overflow-hidden">
            {!hasAccessToAi && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                <div className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl animate-bounce border border-white/10">
                  <Lock size={18} className="text-orange-500" />
                  <span className="text-sm font-black">Réservez un soin pour débloquer l'Assistant IA</span>
                </div>
              </div>
            )}
            <div className="flex-1 flex items-center gap-3 px-4 border-b md:border-b-0 md:border-r border-slate-100">
              <Search className="text-slate-400" size={24} />
              <input 
                type="text" 
                placeholder="Quel style pour un visage rond ?" 
                className="w-full py-3 bg-transparent focus:outline-none text-slate-700 font-bold text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAiSearch()}
                disabled={isSearchingAi}
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 relative group">
              <MapPin className="text-slate-400" size={24} />
              <input 
                type="text" 
                placeholder="Ville ou adresse..." 
                className="w-full py-3 bg-transparent focus:outline-none text-slate-700 font-bold text-lg"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                disabled={isSearchingAi}
              />
              <button 
                onClick={handleDetectLocation}
                disabled={isLocating || isSearchingAi}
                className={`p-2 rounded-xl transition-all ${isLocating ? 'text-orange-600 animate-pulse' : 'text-slate-300 hover:text-orange-600'}`}
                title="Me géolocaliser"
              >
                <Target size={20} />
              </button>
            </div>
            <button 
              onClick={handleAiSearch}
              disabled={isSearchingAi || !searchQuery.trim()}
              className="bg-slate-900 hover:bg-black text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 active:scale-95 disabled:opacity-50"
            >
              {isSearchingAi ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Wand2 size={24} />
                  <span>Conseil IA</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* LOADING SKELETON FOR AI */}
        {isSearchingAi && (
          <div className="mb-20 animate-pulse space-y-8">
            <div className="h-40 bg-slate-100 rounded-[3rem]"></div>
            <div className="grid md:grid-cols-3 gap-8">
               <div className="h-48 bg-slate-50 rounded-[2.5rem]"></div>
               <div className="h-48 bg-slate-50 rounded-[2.5rem]"></div>
               <div className="h-48 bg-slate-50 rounded-[2.5rem]"></div>
            </div>
          </div>
        )}

        {/* AI Analysis Display */}
        {aiAnalysis && (
          <section id="ai-result-section" className="mb-20 animate-in fade-in slide-in-from-bottom duration-700">
            {aiAnalysis.error ? (
              <div className="bg-rose-50 border border-rose-100 p-10 rounded-[3rem] text-center space-y-4">
                 <AlertTriangle className="text-rose-500 mx-auto" size={48} />
                 <h3 className="text-2xl font-black text-rose-900">{aiAnalysis.message}</h3>
                 <p className="text-rose-700 font-bold">Vérifiez votre connexion ou réessayez dans quelques instants.</p>
              </div>
            ) : aiAnalysis.data && (
              <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/10 blur-[120px]"></div>
                <div className="relative z-10 space-y-12">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="space-y-4 max-w-2xl">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-600 p-2 rounded-xl">
                          <Wand2 size={24} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-orange-400">Analyse de l'expert IA Glameo</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black leading-tight">
                        {searchQuery}
                      </h2>
                      <p className="text-xl text-slate-300 font-medium leading-relaxed">
                        {aiAnalysis.data.summary}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {aiAnalysis.data.trends?.map((trend: any, idx: number) => (
                      <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all group">
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2 block">{trend.vibe}</span>
                        <h3 className="text-xl font-black mb-4 group-hover:text-orange-500 transition-colors">{trend.name}</h3>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed">{trend.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-orange-600/10 border border-orange-600/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Lightbulb size={32} />
                    </div>
                    <div className="flex-grow grid md:grid-cols-3 gap-6">
                      {aiAnalysis.data.advice?.map((adv: string, i: number) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-orange-500 font-black">0{i+1}.</span>
                          <p className="text-sm font-bold text-slate-200">{adv}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {aiAnalysis.sources && aiAnalysis.sources.length > 0 && (
                    <div className="pt-8 border-t border-white/10 space-y-4">
                      <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Sources & Inspirations</p>
                      <div className="flex flex-wrap gap-4">
                        {aiAnalysis.sources.map((source: any, i: number) => (
                          <a key={i} href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-bold transition-all">
                            <ExternalLink size={14} />
                            {source.title || "Voir la source"}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Salon Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-end justify-between">
               <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                {selectedCategory === 'Tous' ? 'Salons à proximité' : `${selectedCategory} à proximité`}
               </h2>
               <span className="text-slate-400 font-bold text-sm">{filteredSalons.length} résultats</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {filteredSalons.map(salon => (
                <div 
                  key={salon.id}
                  className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer relative"
                  onClick={() => setSelectedSalon(salon)}
                >
                  <button 
                    onClick={(e) => toggleFavorite(e, salon.id)}
                    className={`absolute top-5 right-16 z-30 p-3 rounded-2xl backdrop-blur-md transition-all shadow-xl border ${favorites.includes(salon.id) ? 'bg-orange-600 text-white border-orange-500 scale-110' : 'bg-white/90 text-slate-400 border-white/20 hover:text-orange-600'}`}
                  >
                    <Heart size={20} fill={favorites.includes(salon.id) ? "currentColor" : "none"} />
                  </button>

                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img src={salon.imageUrl} alt={salon.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-5 left-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-black shadow-xl">
                      <ShieldCheck size={16} />
                      Verified
                    </div>
                    <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-sm font-black shadow-xl">
                      <Star className="text-yellow-400 fill-yellow-400" size={18} />
                      {salon.rating}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-black text-slate-900 line-clamp-1">{salon.name}</h3>
                    </div>
                    <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-2">{salon.description}</p>
                    <p className="text-slate-400 text-xs font-bold flex items-center gap-1 mb-6">
                      <MapPin size={12} /> {salon.address}
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Dès</span>
                        <span className="text-2xl font-black text-slate-900">{salon.services[0].price}$</span>
                      </div>
                      <button className="bg-orange-50 text-orange-600 px-6 py-3 rounded-2xl font-black text-md hover:bg-orange-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm">
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* SIDEBAR */}
          <div className="lg:sticky lg:top-24 space-y-8 self-start">
            <div className={`rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden transition-all duration-700 ${!hasAccessToAi ? 'bg-slate-900 border-2 border-orange-500/30' : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700'}`}>
              {!hasAccessToAi && (
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000">
                  <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl animate-bounce">
                    <Lock size={32} />
                  </div>
                  <h4 className="text-2xl font-black mb-3">Expérience VIP</h4>
                  <p className="text-sm font-bold opacity-80 leading-relaxed mb-6">
                    L'essai virtuel Glameo Vision est débloqué automatiquement après votre première réservation.
                  </p>
                  <button 
                    onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                    className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black text-sm hover:scale-105 transition-transform"
                  >
                    Réserver un salon
                  </button>
                </div>
              )}
              <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                <Wand2 size={32} className={!hasAccessToAi ? 'text-orange-500' : 'text-white'} />
                Vision AI
              </h3>
              <ImageEditor />
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-8 text-white relative overflow-hidden border-2 border-amber-500/20 shadow-xl transition-all hover:scale-[1.02] group">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full"></div>
               <div className="relative z-10 text-center">
                  <Crown size={40} className="text-amber-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-black mb-2">Glameo Pass</h4>
                  <p className="text-slate-400 font-bold text-sm mb-6">Accès illimité à l'IA Vision & -10% sur tous vos soins.</p>
                  <button className="w-full bg-amber-500 text-slate-950 py-4 rounded-2xl font-black hover:bg-amber-400 transition-all">S'abonner</button>
               </div>
            </div>
          </div>
        </div>
      </div>

      {selectedSalon && (
        <BookingModal 
          salon={selectedSalon} 
          onClose={() => {
            setSelectedSalon(null);
            const bookings = db.getBookings();
            setHasAccessToAi(bookings.length > 0);
          }} 
        />
      )}
    </div>
  );
};

export default ClientView;
