
import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import Header from './components/Header';
import ClientView from './components/ClientView';
import ProviderDashboard from './components/ProviderDashboard';
import ProviderLanding from './components/ProviderLanding';
import AdminDashboard from './components/AdminDashboard';
import BlogView from './components/BlogView';
import StaticView from './components/StaticView';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import SimulationPanel from './components/SimulationPanel';
import { db } from './services/database';
import { Scissors, LayoutDashboard, BookOpen, Bell, ShieldCheck, Calendar, User, XCircle, CheckCircle2, Info } from 'lucide-react';

interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole | 'BLOG' | 'STATIC' | 'PROFILE'>(UserRole.CLIENT);
  const [staticPageType, setStaticPageType] = useState<'HOW_IT_WORKS' | 'TERMS' | 'PRIVACY' | 'COOKIES' | 'HELP' | 'SALONS_INFO' | 'PRIVILEGES' | 'ABOUT' | null>(null);
  const [isProviderLoggedIn, setIsProviderLoggedIn] = useState(false);
  const [isClientLoggedIn, setIsClientLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    db.init();
    const user = db.getCurrentUser();
    if (user) {
      if (user.role === UserRole.ADMIN) setIsAdminLoggedIn(true);
      if (user.role === UserRole.PROVIDER) setIsProviderLoggedIn(true);
      if (user.role === UserRole.CLIENT) setIsClientLoggedIn(true);
    }

    const handleOnline = () => {
      setIsOffline(false);
      triggerNotification("Connexion rétablie ✨", "success");
    };
    const handleOffline = () => {
      setIsOffline(true);
      triggerNotification("Mode hors-ligne activé. Certaines fonctions IA seront limitées.", "error");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSubmit = (email: string, pass: string) => {
    const cleanEmail = email.toLowerCase().trim();
    
    if (cleanEmail === 'admin@glameo.ca' && pass === 'Admin2025') {
      setIsAdminLoggedIn(true);
      setCurrentRole(UserRole.ADMIN);
      db.setCurrentUser({ email, role: UserRole.ADMIN });
      triggerNotification("🛡️ Session Admin Glameo active", "info");
      setShowAuthModal(false);
      return;
    }

    setIsClientLoggedIn(true);
    setCurrentRole(UserRole.CLIENT);
    db.setCurrentUser({ email, role: UserRole.CLIENT });
    triggerNotification("✨ Bienvenue sur Glameo !", "success");
    setShowAuthModal(false);
  };

  const triggerNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSimulateBooking = () => {
    triggerNotification("🔔 Nouvelle demande de réservation !", "success");
  };

  const handleSimulateHairstyle = () => {
    setCurrentRole(UserRole.CLIENT);
    triggerNotification("✨ Glameo Vision : Essayez vos styles", "info");
  };

  const handleOpenStatic = (type: any) => {
    setStaticPageType(type);
    setCurrentRole('STATIC');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    db.logout();
    setIsClientLoggedIn(false);
    setIsProviderLoggedIn(false);
    setIsAdminLoggedIn(false);
    setCurrentRole(UserRole.CLIENT);
    triggerNotification("👋 Déconnexion réussie", "info");
  };

  const renderContent = () => {
    if (currentRole === 'BLOG') return <BlogView />;
    if (currentRole === 'PROFILE') return <UserProfile onBack={() => setCurrentRole(UserRole.CLIENT)} />;
    if (currentRole === 'STATIC' && staticPageType) {
      return <StaticView type={staticPageType} onBack={() => setCurrentRole(UserRole.CLIENT)} />;
    }

    switch (currentRole) {
      case UserRole.CLIENT:
        return <ClientView onOpenAuth={openAuth} onNavStatic={handleOpenStatic} />;
      case UserRole.PROVIDER:
        return isProviderLoggedIn ? (
          <ProviderDashboard onNavStatic={handleOpenStatic} />
        ) : (
          <ProviderLanding onLogin={() => {
            setIsProviderLoggedIn(true);
            db.setCurrentUser({ role: UserRole.PROVIDER });
          }} onNavStatic={handleOpenStatic} />
        );
      case UserRole.ADMIN:
        return isAdminLoggedIn ? <AdminDashboard /> : <ClientView onOpenAuth={openAuth} onNavStatic={handleOpenStatic} />;
      default:
        return <ClientView onOpenAuth={openAuth} onNavStatic={handleOpenStatic} />;
    }
  };

  const handleSetRole = (role: any) => {
    setCurrentRole(role);
    setStaticPageType(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50">
      {/* GLOBAL TOAST NOTIFICATION */}
      {notification && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[200] px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 border animate-in slide-in-from-top-10 duration-500 ${
          notification.type === 'error' ? 'bg-rose-600 text-white border-rose-400' :
          notification.type === 'success' ? 'bg-emerald-600 text-white border-emerald-400' :
          'bg-slate-900 text-white border-white/10'
        }`}>
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            {notification.type === 'error' ? <XCircle size={20} /> :
             notification.type === 'success' ? <CheckCircle2 size={20} /> :
             <Bell size={20} className="animate-ring" />}
          </div>
          <p className="font-black text-sm">{notification.message}</p>
          <button onClick={() => setNotification(null)} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">
            <XCircle size={16} />
          </button>
        </div>
      )}

      {/* OFFLINE BAR */}
      {isOffline && (
        <div className="bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest py-2 text-center sticky top-0 z-[150] flex items-center justify-center gap-2">
           <Info size={12} /> Connexion interrompue - Glameo est en mode dégradé
        </div>
      )}

      <Header 
        currentRole={currentRole === 'BLOG' || currentRole === 'STATIC' || currentRole === 'PROFILE' ? UserRole.CLIENT : (currentRole as UserRole)} 
        isBlogActive={currentRole === 'BLOG'}
        setRole={handleSetRole} 
        isLoggedIn={isClientLoggedIn || isProviderLoggedIn || isAdminLoggedIn}
        onOpenAuth={openAuth}
        onOpenProfile={() => setCurrentRole('PROFILE')}
        onLogout={handleLogout}
        isAdmin={isAdminLoggedIn}
      />
      
      <main className="flex-grow pb-20 md:pb-0">
        {renderContent()}
      </main>

      <Footer 
        onNavBlog={() => handleSetRole('BLOG')} 
        onNavStatic={handleOpenStatic}
      />

      <SimulationPanel 
        onSimulateBooking={handleSimulateBooking}
        onSimulateHairstyle={handleSimulateHairstyle}
        onSwitchRole={(role) => {
          handleSetRole(role);
          if (role === UserRole.PROVIDER) setIsProviderLoggedIn(true);
          if (role === UserRole.ADMIN) setIsAdminLoggedIn(true);
        }}
      />

      {/* Navigation Mobile Opti */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 p-2 flex justify-around md:hidden z-50">
        <NavIcon icon={<Calendar size={20} />} label="Réserver" active={currentRole === UserRole.CLIENT} onClick={() => handleSetRole(UserRole.CLIENT)} />
        <NavIcon icon={<User size={20} />} label="Profil" active={currentRole === 'PROFILE'} onClick={() => isClientLoggedIn ? setCurrentRole('PROFILE') : openAuth('login')} />
        <NavIcon icon={<BookOpen size={20} />} label="Magazine" active={currentRole === 'BLOG'} onClick={() => handleSetRole('BLOG')} />
        <NavIcon icon={isAdminLoggedIn ? <ShieldCheck size={20} /> : <LayoutDashboard size={20} />} label={isAdminLoggedIn ? "Admin" : "Salon"} active={currentRole === UserRole.PROVIDER || currentRole === UserRole.ADMIN} onClick={() => handleSetRole(isAdminLoggedIn ? UserRole.ADMIN : UserRole.PROVIDER)} />
      </nav>

      {showAuthModal && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setShowAuthModal(false)} 
          onSubmit={handleAuthSubmit} 
        />
      )}

      <style>{`
        @keyframes ring { 0% { transform: rotate(0); } 10% { transform: rotate(15deg); } 20% { transform: rotate(-15deg); } 30% { transform: rotate(10deg); } 40% { transform: rotate(-10deg); } 50% { transform: rotate(0); } }
        .animate-ring { animation: ring 2s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

const NavIcon = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center p-2 rounded-2xl transition-all ${active ? 'text-orange-600 bg-orange-50 font-black' : 'text-slate-400 font-bold'}`}>
    {icon}
    <span className="text-[10px] mt-1">{label}</span>
  </button>
);

export default App;
