
import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, TrendingUp, DollarSign, 
  Settings, Scissors, Clock, Plus, LayoutDashboard, 
  MapPin, ImageIcon, Check, Trash2, Edit3, Save,
  ChevronLeft, ChevronRight, MoreVertical, X, Lock, User,
  Phone, Mail, CheckCircle2, AlertCircle, Bell, MessageSquare,
  Sparkles, Globe, ShieldAlert, AlignLeft, Info, Layout, FileText, Download, HeartHandshake
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { db } from '../services/database';
import { Booking, Service, Salon } from '../types';
import ChatWindow from './ChatWindow';
import { generateReceiptPDF } from '../services/pdfService';

const DATA_CHART = [
  { name: 'Lun', revenue: 450 },
  { name: 'Mar', revenue: 680 },
  { name: 'Mer', revenue: 520 },
  { name: 'Jeu', revenue: 890 },
  { name: 'Ven', revenue: 1200 },
  { name: 'Sam', revenue: 1800 },
  { name: 'Dim', revenue: 200 },
];

const HOURS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

type DashboardTab = 'overview' | 'services' | 'schedule' | 'messages' | 'settings';

interface ProviderDashboardProps {
  onNavStatic?: (type: 'ABOUT') => void;
}

const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ onNavStatic }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [conversations, setConversations] = useState<string[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [salon, setSalon] = useState<Salon | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [newService, setNewService] = useState<Partial<Service>>({
    name: '', duration: 30, bufferTime: 10, price: 0, description: ''
  });

  const salonId = "1"; 

  useEffect(() => {
    db.init();
    setBookings(db.getBookings());
    setConversations(db.getAllConversationsForUser(salonId));
    const currentSalon = db.getSalonById(salonId);
    if (currentSalon) {
      setSalon(currentSalon);
      setServices(currentSalon.services);
    }
  }, []);

  const handleUpdateStatus = (id: string, status: Booking['status']) => {
    db.updateBookingStatus(id, status);
    setBookings(db.getBookings());
    setSelectedBooking(null);
  };

  const handleDownloadReceipt = (booking: Booking) => {
    if (!salon) return;
    const service = salon.services.find(s => s.id === booking.serviceId) || salon.services[0];
    generateReceiptPDF(booking, salon, service);
  };

  const handleSaveSettings = async () => {
    if (!salon) return;
    setIsSaving(true);
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert("Configuration mise à jour avec succès ! ✨");
  };

  const handleAddService = () => {
    if (!newService.name || !newService.price) return;
    const service: Service = {
      id: `s-${Date.now()}`,
      name: newService.name || '',
      duration: newService.duration || 30,
      bufferTime: newService.bufferTime || 10,
      price: newService.price || 0,
      description: newService.description || ''
    };
    const updatedServices = [...services, service];
    setServices(updatedServices);
    setIsAddingService(false);
    setNewService({ name: '', duration: 30, bufferTime: 10, price: 0, description: '' });
  };

  const updateGalleryImage = (index: number, url: string) => {
    if (!salon) return;
    const newGallery = [...salon.galleryImages];
    newGallery[index] = url;
    setSalon({ ...salon, galleryImages: newGallery });
  };

  const renderServices = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Carte des Services</h2>
          <p className="text-slate-500 font-bold">Gérez vos prestations et temps de préparation.</p>
        </div>
        <button 
          onClick={() => setIsAddingService(true)}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-orange-600 transition-all shadow-xl"
        >
          <Plus size={20} /> Nouveau Service
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-slate-50 rounded-2xl text-slate-900 group-hover:bg-orange-600 group-hover:text-white transition-all">
                <Scissors size={24} />
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><Edit3 size={18} /></button>
                <button className="p-2 text-slate-300 hover:text-rose-600 transition-colors"><Trash2 size={18} /></button>
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{service.name}</h3>
            <p className="text-slate-400 text-xs font-bold mb-6 line-clamp-2">{service.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-3 rounded-xl">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Durée</p>
                 <p className="text-sm font-black text-slate-900 flex items-center gap-1.5"><Clock size={14} /> {service.duration} min</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                 <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Buffer/Nettoyage</p>
                 <p className="text-sm font-black text-orange-600 flex items-center gap-1.5"><Sparkles size={14} /> +{service.bufferTime} min</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Prix public</span>
               <span className="text-2xl font-black text-slate-900">{service.price}$</span>
            </div>
          </div>
        ))}
      </div>

      {isAddingService && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddingService(false)} />
           <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl p-10 animate-in zoom-in duration-300 space-y-6">
              <h3 className="text-3xl font-black">Ajouter un service</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom de la prestation</label>
                  <input 
                    type="text" 
                    value={newService.name}
                    onChange={e => setNewService({...newService, name: e.target.value})}
                    placeholder="Ex: Coupe Transformative" 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-orange-500 focus:outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Durée (min)</label>
                    <input 
                      type="number" 
                      value={newService.duration}
                      onChange={e => setNewService({...newService, duration: parseInt(e.target.value)})}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nettoyage (min)</label>
                    <input 
                      type="number" 
                      value={newService.bufferTime}
                      onChange={e => setNewService({...newService, bufferTime: parseInt(e.target.value)})}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prix ($)</label>
                  <input 
                    type="number" 
                    value={newService.price}
                    onChange={e => setNewService({...newService, price: parseInt(e.target.value)})}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold"
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={handleAddService}
                  className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-600 transition-all shadow-xl"
                >
                  Créer le service
                </button>
                <button 
                  onClick={() => setIsAddingService(false)}
                  className="px-8 bg-slate-100 text-slate-400 py-5 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all"
                >
                  Annuler
                </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Revenus Mensuels" value={`${bookings.reduce((acc, b) => acc + (b.paymentStatus === 'paid' ? b.totalPrice : 0), 0)} $`} trend="+12.5%" icon={<DollarSign className="text-green-600" />} />
        <StatCard title="Réservations" value={bookings.length.toString()} trend="+5.2%" icon={<Calendar className="text-blue-600" />} />
        <StatCard title="Nouveaux Clients" value="28" trend="+18%" icon={<Users className="text-purple-600" />} />
        <StatCard title="Taux d'Occupation" value="84%" trend="-2.1%" icon={<TrendingUp className="text-orange-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-8">Performance financière</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA_CHART}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-900">Demandes en attente</h2>
            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-black text-xs">
              {bookings.filter(b => b.status === 'pending').length}
            </div>
          </div>
          <div className="space-y-6">
            {bookings.filter(b => b.status === 'pending').length > 0 ? (
              bookings.filter(b => b.status === 'pending').map(b => (
                <div key={b.id} onClick={() => {setSelectedBooking(b); setActiveTab('schedule');}} className="p-5 bg-orange-50 border border-orange-100 rounded-3xl cursor-pointer hover:bg-orange-100 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-black text-slate-900">{b.clientName}</span>
                    <span className="text-[10px] font-black bg-white px-2 py-1 rounded-lg text-orange-600 shadow-sm">À VALIDER</span>
                  </div>
                  <div className="text-xs font-bold text-slate-500">
                    Aujourd'hui à {b.dateTime.split('T')[1].substr(0,5)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-slate-300" size={32} />
                </div>
                <p className="text-slate-400 font-bold text-sm">Tout est à jour !</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900">Agenda Glameo Live</h2>
        <div className="flex bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <button className="px-6 py-2 bg-slate-900 text-white rounded-xl font-black text-sm">Aujourd'hui</button>
          <button className="px-6 py-2 text-slate-400 font-black text-sm hover:text-slate-900">Semaine</button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        {HOURS.map(hour => {
          const b = bookings.find(booking => booking.dateTime.includes(`T${hour}`));
          return (
            <div key={hour} className="flex border-b border-slate-50 min-h-[100px] group">
              <div className="w-24 shrink-0 flex items-center justify-center border-r border-slate-50 bg-slate-50/30">
                <span className="text-sm font-black text-slate-400">{hour}</span>
              </div>
              <div className="flex-grow p-4 relative">
                {b ? (
                  <div 
                    onClick={() => setSelectedBooking(b)}
                    className={`h-full rounded-2xl p-4 border-l-4 transition-all hover:scale-[1.01] cursor-pointer shadow-sm flex items-center justify-between ${
                    b.status === 'confirmed' ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 
                    b.status === 'pending' ? 'bg-orange-50 border-orange-500 text-orange-900 animate-pulse' :
                    b.status === 'completed' ? 'bg-blue-50 border-blue-500 text-blue-900' :
                    'bg-slate-100 border-slate-400 text-slate-600'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black">
                        {b.clientName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-black text-sm">{b.clientName}</h4>
                        <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Prestation Payée ({b.totalPrice}$)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       {b.status === 'pending' && <span className="bg-orange-600 text-white text-[8px] font-black px-2 py-1 rounded-full">ACTION REQUISE</span>}
                       <MoreVertical size={18} className="opacity-40" />
                    </div>
                  </div>
                ) : (
                  <div className="h-full border-2 border-dashed border-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
                    <Plus size={20} className="text-slate-200" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedBooking(null)} />
           <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 p-8">
              <h3 className="text-2xl font-black mb-6">Détails de la réservation</h3>
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Client</p>
                  <p className="text-xl font-black">{selectedBooking.clientName}</p>
                </div>
                <div className="flex flex-col gap-3">
                   {selectedBooking.status === 'pending' && (
                     <button 
                      onClick={() => handleUpdateStatus(selectedBooking.id, 'confirmed')}
                      className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                     >
                      <Check size={20} /> Confirmer la réservation
                     </button>
                   )}
                   {selectedBooking.status === 'confirmed' && (
                     <button 
                      onClick={() => handleUpdateStatus(selectedBooking.id, 'completed')}
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                     >
                      <CheckCircle2 size={20} /> Marquer comme terminé
                     </button>
                   )}
                   {selectedBooking.status === 'completed' && (
                     <button 
                      onClick={() => handleDownloadReceipt(selectedBooking)}
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
                     >
                      <Download size={20} /> Télécharger le Reçu PDF
                     </button>
                   )}
                   <button 
                    onClick={() => handleUpdateStatus(selectedBooking.id, 'cancelled')}
                    className="w-full bg-rose-50 text-rose-600 py-4 rounded-2xl font-black hover:bg-rose-100 transition-all flex items-center justify-center gap-2"
                   >
                    <X size={20} /> Annuler / Refuser
                   </button>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  const renderMessages = () => (
    <div className="animate-in fade-in duration-500 h-[600px] bg-white rounded-[3rem] border border-slate-100 shadow-sm flex overflow-hidden">
       <div className="w-80 border-r border-slate-100 flex flex-col">
          <div className="p-8 border-b border-slate-50">
             <h2 className="text-xl font-black text-slate-900">Centre de Messages</h2>
          </div>
          <div className="flex-grow overflow-y-auto">
             {conversations.length > 0 ? conversations.map(partnerId => (
               <button 
                key={partnerId}
                onClick={() => setActiveChatId(partnerId)}
                className={`w-full p-6 text-left border-b border-slate-50 transition-all flex items-center gap-4 ${activeChatId === partnerId ? 'bg-orange-50 border-r-4 border-r-orange-600' : 'hover:bg-slate-50'}`}
               >
                 <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400">
                    {partnerId.charAt(0).toUpperCase()}
                 </div>
                 <div className="flex-grow">
                   <p className="font-black text-slate-900">Client {partnerId.substr(0, 5)}</p>
                   <p className="text-xs text-slate-400 font-medium truncate">Dernière activité...</p>
                 </div>
               </button>
             )) : (
               <div className="p-8 text-center text-slate-400 italic text-sm">Aucune conversation.</div>
             )}
          </div>
       </div>
       <div className="flex-grow">
          {activeChatId ? (
            <ChatWindow 
              currentUserId={salonId}
              partnerId={activeChatId}
              partnerName={`Client ${activeChatId.substr(0, 5)}`}
              onClose={() => setActiveChatId(null)}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300">
               <MessageSquare size={64} strokeWidth={1} className="mb-4" />
               <p className="font-black text-xl">Sélectionnez une conversation</p>
            </div>
          )}
       </div>
    </div>
  );

  const renderSettings = () => {
    if (!salon) return null;
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-right duration-500 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-900">Configuration Salon</h2>
            <p className="text-slate-500 font-bold italic">Personnalisez votre vitrine et vos politiques de gestion.</p>
          </div>
          <button 
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-orange-600 transition-all shadow-xl disabled:opacity-50"
          >
            {isSaving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={20} />}
            {isSaving ? 'Sauvegarde...' : 'Enregistrer les modifications'}
          </button>
        </div>

        {/* SECTION 1: PROFIL PUBLIC & PHOTOS */}
        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
           <div className="flex items-center gap-4 text-slate-900">
              <div className="p-3 bg-slate-100 rounded-2xl"><Globe size={24} /></div>
              <h3 className="text-xl font-black uppercase tracking-tight">Profil Public & Galerie</h3>
           </div>
           
           <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom commercial</label>
                <input 
                  type="text" 
                  value={salon.name}
                  onChange={(e) => setSalon({...salon, name: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-orange-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Adresse complète</label>
                <input 
                  type="text" 
                  value={salon.address}
                  onChange={(e) => setSalon({...salon, address: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-orange-500 transition-all"
                />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description du salon</label>
              <textarea 
                value={salon.description}
                onChange={(e) => setSalon({...salon, description: e.target.value})}
                rows={3}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-orange-500 transition-all"
              />
           </div>

           <div className="space-y-6 pt-4 border-t border-slate-50">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2"><ImageIcon size={18} className="text-orange-600" /> Galerie Photos du Salon</h4>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Couverture (Principale)</label>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-100 group">
                    <img src={salon.imageUrl} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <input 
                        type="text" 
                        placeholder="URL de l'image"
                        value={salon.imageUrl}
                        onChange={(e) => setSalon({...salon, imageUrl: e.target.value})}
                        className="bg-white text-xs p-2 rounded-lg w-4/5 border-none focus:ring-0 font-bold"
                       />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Galerie Photo 1</label>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-100 group">
                    <img src={salon.galleryImages[0] || 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop'} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <input 
                        type="text" 
                        placeholder="URL Image 1"
                        value={salon.galleryImages[0] || ''}
                        onChange={(e) => updateGalleryImage(0, e.target.value)}
                        className="bg-white text-xs p-2 rounded-lg w-4/5 border-none focus:ring-0 font-bold"
                       />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Galerie Photo 2</label>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-100 group">
                    <img src={salon.galleryImages[1] || 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop'} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <input 
                        type="text" 
                        placeholder="URL Image 2"
                        value={salon.galleryImages[1] || ''}
                        onChange={(e) => updateGalleryImage(1, e.target.value)}
                        className="bg-white text-xs p-2 rounded-lg w-4/5 border-none focus:ring-0 font-bold"
                       />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-bold flex items-center gap-2 italic">
                <Info size={12} /> Survolez un emplacement pour modifier l'URL de l'image.
              </p>
           </div>
        </section>

        {/* SECTION 2: POLITIQUES D'ANNULATION */}
        <section className="bg-amber-50 p-10 rounded-[2.5rem] border border-amber-100 shadow-sm space-y-8">
           <div className="flex items-center gap-4 text-amber-900">
              <div className="p-3 bg-white rounded-2xl text-amber-600"><ShieldAlert size={24} /></div>
              <h3 className="text-xl font-black uppercase tracking-tight">Politique de Ponctualité</h3>
           </div>

           <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Délai Gratuit (Heures)</label>
                <input 
                  type="number" 
                  value={salon.cancellationPolicy.freeUntilHours}
                  onChange={(e) => setSalon({...salon, cancellationPolicy: {...salon.cancellationPolicy, freeUntilHours: parseInt(e.target.value)}})}
                  className="w-full bg-white border-2 border-amber-200 rounded-2xl p-4 font-bold focus:border-orange-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Frais Annul. Tardive (%)</label>
                <input 
                  type="number" 
                  value={salon.cancellationPolicy.lateCancelFeePercent}
                  onChange={(e) => setSalon({...salon, cancellationPolicy: {...salon.cancellationPolicy, lateCancelFeePercent: parseInt(e.target.value)}})}
                  className="w-full bg-white border-2 border-amber-200 rounded-2xl p-4 font-bold focus:border-orange-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Frais No-Show (%)</label>
                <input 
                  type="number" 
                  value={salon.cancellationPolicy.noShowFeePercent}
                  onChange={(e) => setSalon({...salon, cancellationPolicy: {...salon.cancellationPolicy, noShowFeePercent: parseInt(e.target.value)}})}
                  className="w-full bg-white border-2 border-amber-200 rounded-2xl p-4 font-bold focus:border-orange-500 transition-all"
                />
              </div>
           </div>
           <p className="text-xs text-amber-800 font-bold bg-white/50 p-4 rounded-xl border border-amber-200/50 flex items-start gap-3">
              <Info size={16} className="shrink-0 mt-0.5" />
              Ces frais seront automatiquement communiqués aux clients lors de leur réservation. Ils assurent le respect de votre temps et la stabilité de vos revenus.
           </p>
        </section>

        {/* SECTION 3: HORAIRES */}
        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
           <div className="flex items-center gap-4 text-slate-900">
              <div className="p-3 bg-slate-100 rounded-2xl"><Clock size={24} /></div>
              <h3 className="text-xl font-black uppercase tracking-tight">Horaires de Travail</h3>
           </div>
           
           <div className="space-y-4">
              {DAYS.map(day => (
                <div key={day} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
                   <div className="flex items-center gap-4 w-32">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-xs border border-slate-200">{day.substring(0, 2)}</div>
                      <span className="font-black text-slate-900">{day}</span>
                   </div>
                   <div className="flex items-center gap-4 flex-grow justify-end">
                      <select className="bg-white border-2 border-slate-200 rounded-xl px-4 py-2 font-bold focus:border-orange-500 transition-all">
                         <option>09:00</option>
                         <option>08:00</option>
                      </select>
                      <span className="font-black text-slate-400">à</span>
                      <select className="bg-white border-2 border-slate-200 rounded-xl px-4 py-2 font-bold focus:border-orange-500 transition-all">
                         <option>18:00</option>
                         <option>19:00</option>
                         <option>20:00</option>
                      </select>
                      <button className="ml-4 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100">Ouvert</button>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0 flex flex-col justify-between min-h-[calc(100vh-160px)] sticky top-24">
          <div className="space-y-2">
            <NavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<LayoutDashboard size={20} />} label="Overview" />
            <NavButton active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} icon={<Calendar size={20} />} label="Agenda" />
            <NavButton active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} icon={<MessageSquare size={20} />} label="Messages" />
            <NavButton active={activeTab === 'services'} onClick={() => setActiveTab('services')} icon={<Scissors size={20} />} label="Services" />
            <div className="h-px bg-slate-200 my-6" />
            <NavButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={20} />} label="Mon Salon" />
          </div>

          {/* Rappel Fierté Canadienne - TRÈS VISIBLE */}
          <div className="mt-auto pt-10">
            <div className="p-6 bg-slate-900 rounded-[2.5rem] shadow-2xl space-y-4 border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-16 h-16 bg-orange-600/10 blur-xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
               
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-orange-500">
                    <Globe size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Plateforme Locale</span>
                    <span className="text-xs font-black text-white">Canada Edition</span>
                  </div>
               </div>

               <p className="text-[11px] font-bold text-slate-300 leading-relaxed italic">
                 Fièrement développé au Canada. 🇨🇦
               </p>

               <button 
                onClick={() => onNavStatic?.('ABOUT')}
                className="w-full flex items-center justify-between group/link text-[10px] font-black text-orange-500 border-t border-white/5 pt-4 hover:text-orange-400 transition-colors"
               >
                  À propos de Glameo
                  <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        </aside>

        <main className="flex-grow">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'schedule' && renderSchedule()}
          {activeTab === 'messages' && renderMessages()}
          {activeTab === 'services' && renderServices()}
          {activeTab === 'settings' && renderSettings()}
          
          {activeTab === 'overview' && (
            <div className="mt-8 bg-orange-600 p-8 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-orange-900/20">
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black mb-2">Besoin d'aide pour vos horaires ?</h3>
                  <p className="font-bold text-orange-100 opacity-90">Glameo AI peut analyser vos pics d'affluence.</p>
                </div>
                <button className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform">Lancer l'analyse</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm transition-all ${active ? 'bg-slate-900 text-white shadow-xl translate-x-1' : 'text-slate-500 hover:bg-slate-100'}`}>
    {icon}
    {label}
  </button>
);

const StatCard = ({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) => (
  <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{title}</p>
      <h3 className="text-3xl font-black text-slate-900">{value}</h3>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-lg">{trend}</span>
      </div>
    </div>
    <div className="bg-slate-50 p-4 rounded-2xl">{icon}</div>
  </div>
);

export default ProviderDashboard;
