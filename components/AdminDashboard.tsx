
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Store, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Ban,
  Calendar,
  CheckCircle2,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Download,
  Clock,
  Zap
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

const SUBS_GROWTH = [
  { name: 'Jan', revenue: 3200 },
  { name: 'Fév', revenue: 4100 },
  { name: 'Mar', revenue: 5200 },
  { name: 'Avr', revenue: 6800 },
  { name: 'Mai', revenue: 8400 },
];

const MOCK_SUBSCRIPTIONS = [
  { id: 'sub1', salon: "L'Atelier Coiffure Montréal", plan: 'Annuel', status: 'Actif', amount: '24$', start: '12 Jan 2025', nextBilling: '12 Jan 2026', owner: 'Alex T.' },
  { id: 'sub2', salon: "Le Barbier du Mile-End", plan: 'Mensuel', status: 'Actif', amount: '29$', start: '02 Fév 2025', nextBilling: '02 Mars 2025', owner: 'David K.' },
  { id: 'sub3', salon: "Éclat & Beauté Québec", plan: 'Essai', status: 'Trial', amount: '0$', start: '15 Fév 2025', nextBilling: '01 Mars 2025', owner: 'Julie R.' },
  { id: 'sub4', salon: "Maison de Beauté Westmount", plan: 'Annuel', status: 'Impayé', amount: '24$', start: '10 Déc 2024', nextBilling: 'Expiré', owner: 'Marc-André' },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'subscriptions'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="MRR (SaaS)" value="8 420$" trend="+24%" icon={<Zap size={24} />} color="orange" />
        <StatCard title="Abonnés Totaux" value="310" trend="+15%" icon={<Users size={24} />} color="blue" />
        <StatCard title="Frais Services Extra" value="1 240$" trend="+8%" icon={<TrendingUp size={24} />} color="emerald" />
        <StatCard title="Churn SaaS" value="2.4%" trend="-0.5%" icon={<Ban size={24} />} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-8">Revenus par Abonnements</h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SUBS_GROWTH}>
                <defs>
                  <linearGradient id="colorAdminRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorAdminRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[3rem] text-white flex flex-col justify-center">
          <ShieldCheck className="text-orange-500 mb-6" size={48} />
          <h3 className="text-2xl font-black mb-4">Modèle SaaS Pur</h3>
          <p className="text-slate-400 font-bold mb-8">Glameo ne prélève aucune commission sur les salons. Les revenus proviennent exclusivement des abonnements et des services premium activés par les prestataires.</p>
          <div className="space-y-4">
            <div className="flex justify-between text-sm border-b border-white/10 pb-2">
              <span className="text-slate-500">Commissions Services</span>
              <span className="font-black text-emerald-500">0.00$</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Frais d'adhésion</span>
              <span className="font-black text-white">8 420.00$</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900">Abonnés Professionnels</h2>
        <div className="flex gap-4">
           <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input type="text" placeholder="Rechercher salon..." className="pl-12 pr-6 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 font-bold" />
           </div>
           <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"><Filter size={20} /></button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Salon</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Plan</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Statut</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">MRR</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {MOCK_SUBSCRIPTIONS.map(sub => (
              <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-6">
                  <div className="font-black text-slate-900">{sub.salon}</div>
                  <div className="text-xs text-slate-400 font-bold">{sub.owner}</div>
                </td>
                <td className="px-8 py-6">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black">{sub.plan}</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-xs font-black">
                    <div className={`w-2 h-2 rounded-full ${sub.status === 'Actif' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    {sub.status}
                  </div>
                </td>
                <td className="px-8 py-6 font-black text-orange-600">{sub.amount}</td>
                <td className="px-8 py-6">
                   <div className="flex gap-2">
                     <button className="p-2 text-slate-400 hover:text-slate-900"><Mail size={18} /></button>
                     <button className="p-2 text-slate-400 hover:text-slate-900"><MoreHorizontal size={18} /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 text-white pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-orange-600 rounded-[1.5rem] shadow-xl shadow-orange-900/40">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Console Glameo Business</h1>
              <p className="text-orange-400 font-bold flex items-center gap-2">
                <CheckCircle2 size={16} /> Modèle SaaS Opérationnel
              </p>
            </div>
          </div>
          <div className="flex bg-white/10 p-1.5 rounded-2xl backdrop-blur-md">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'overview' ? 'bg-white text-slate-900 shadow-xl' : 'text-white hover:bg-white/5'}`}
            >
              Finances
            </button>
            <button 
              onClick={() => setActiveTab('subscriptions')}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'subscriptions' ? 'bg-white text-slate-900 shadow-xl' : 'text-white hover:bg-white/5'}`}
            >
              Abonnements
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12">
        {activeTab === 'overview' ? renderOverview() : renderSubscriptions()}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon, color }: any) => {
  const colorMap: any = {
    orange: 'bg-orange-50 text-orange-600',
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    rose: 'bg-rose-50 text-rose-600',
  };
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{title}</p>
        <h3 className="text-3xl font-black text-slate-900">{value}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className={`text-[10px] font-black ${trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'} bg-slate-50 px-2 py-0.5 rounded-lg`}>{trend}</span>
        </div>
      </div>
      <div className={`p-4 rounded-2xl ${colorMap[color]}`}>{icon}</div>
    </div>
  );
};

export default AdminDashboard;
