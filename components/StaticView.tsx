
import React from 'react';
import { ArrowLeft, CheckCircle2, Search, Calendar, Sparkles, ShieldCheck, HelpCircle, FileText, Cookie, Scale, ShieldAlert, Fingerprint, Store, Crown, Star, Gift, Info, HeartHandshake } from 'lucide-react';

const StaticView: React.FC<{ type: string; onBack: () => void }> = ({ type, onBack }) => {
  const renderHowItWorks = () => (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">
          Comment ça <span className="text-orange-600">marche</span> ?
        </h1>
        <p className="text-xl text-slate-500 font-medium">
          Une expérience de réservation simplifiée, propulsée par l'innovation Glameo.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {[
          { icon: <Search className="text-indigo-600" size={32} />, step: "01", title: "Inspiration IA", desc: "Laissez l'IA Glameo vous suggérer les styles qui mettront votre visage en valeur." },
          { icon: <Calendar className="text-orange-600" size={32} />, step: "02", title: "Réservation Directe", desc: "Choisissez votre créneau préféré et réservez instantanément, sans attente." },
          { icon: <Sparkles className="text-emerald-600" size={32} />, step: "03", title: "Sublimez-vous", desc: "Rendez-vous au salon, vivez l'expérience Glameo et rayonnez !" }
        ].map((item, idx) => (
          <div key={idx} className="relative bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <span className="absolute -top-6 -right-6 text-8xl font-black text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">{item.step}</span>
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8">{item.icon}</div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-black">Prêt(e) pour le grand saut ?</h2>
          <p className="text-slate-400 text-lg font-medium">Rejoignez la communauté Glameo pour des soins d'exception.</p>
          <button onClick={onBack} className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-orange-900/20">Explorer les Salons Glameo</button>
        </div>
      </div>
    </div>
  );

  const renderTextContent = () => {
    const contents: any = {
      ABOUT: {
        title: "À propos de Glameo",
        icon: <HeartHandshake className="text-orange-600" />,
        sections: [
          {
            h: "Notre ADN : L'Artisanat Local d'abord",
            p: "Glameo est née à Montréal d'un constat simple : les plateformes de réservation traditionnelles étranglent les commerces locaux avec des commissions allant jusqu'à 20%.\n\nNous avons choisi un modèle différent. Glameo est un logiciel SaaS (Software as a Service) canadien. Nous facturons un abonnement fixe, transparent, et nous ne prélevons JAMAIS de commission sur vos soins. 100% de votre argent reste dans l'économie locale."
          },
          {
            h: "Innovation Made in Canada",
            p: "Notre technologie, y compris nos moteurs d'intelligence artificielle 'Glameo Vision', est fièrement développée ici même. Nous croyons que l'innovation doit servir à rapprocher les humains, pas à les remplacer. Nos outils IA sont conçus pour aider les clients à se projeter et à valoriser le talent de nos experts partenaires."
          },
          {
            h: "Engagement Éthique",
            p: "En choisissant Glameo, vous soutenez une entreprise qui valorise le respect du temps des prestataires (via nos politiques d'annulation strictes) et la simplification administrative (via notre facturation automatique)."
          }
        ]
      },
      SALONS_INFO: {
        title: "Nos Salons Partenaires",
        icon: <Store className="text-pink-600" />,
        sections: [
          {
            h: "Une Sélection de Qualité",
            p: "Chez Glameo, nous ne référençons pas tous les salons. Chaque établissement présent sur notre plateforme a été rigoureusement sélectionné par nos experts selon des critères stricts de qualité, d'hygiène et de savoir-faire."
          },
          {
            h: "Le Badge 'Glameo Verified'",
            p: "Les salons arborant ce badge ont passé notre audit de satisfaction client avec une note supérieure à 4.7/5. C'est votre garantie d'un service d'excellence et d'une écoute personnalisée."
          },
          {
            h: "Engagement Éco-responsable",
            p: "Nous encourageons et mettons en avant les salons utilisant des produits biologiques, recyclant les cheveux et optimisant leur consommation d'eau et d'énergie."
          },
          {
            h: "Diversité des Spécialités",
            p: "Que vous cherchiez un maître barbier, un expert en coloration végétale ou un spécialiste des boucles, Glameo regroupe les meilleurs talents du Québec pour chaque besoin spécifique."
          }
        ]
      },
      PRIVILEGES: {
        title: "Privilèges & Fidélité",
        icon: <Crown className="text-amber-500" />,
        sections: [
          {
            h: "Le Programme Glameo Gold",
            p: "Chaque réservation effectuée sur Glameo vous rapporte des points de fidélité. Cumulez 500 points pour obtenir une réduction de 15$ sur votre prochaine prestation, valable dans tout notre réseau."
          },
          {
            h: "Cadeau d'Anniversaire",
            p: "Parce que vous méritez d'être célébré(e), Glameo vous offre un soin bonus ou une réduction exclusive de 25% lors de votre mois d'anniversaire dans votre salon favori."
          },
          {
            h: "Parrainage Éclatant",
            p: "Partagez votre amour pour Glameo. Pour chaque ami(e) qui effectue sa première réservation, recevez 10$ de crédit et offrez-lui également 10$."
          },
          {
            h: "Accès Prioritaire aux Tendances",
            p: "Nos membres Privilèges reçoivent en avant-première les dossiers de tendances de notre Magazine et bénéficient de créneaux réservés lors des périodes de forte affluence (Fêtes, Grands événements)."
          }
        ]
      },
      TERMS: { 
        title: "Conditions Générales d'Utilisation", 
        icon: <Scale className="text-orange-600" />, 
        sections: [
          {
            h: "1. Nature de la Plateforme",
            p: "Glameo exploite une plateforme de mise en relation entre des professionnels de la beauté (ci-après les « Partenaires ») et des utilisateurs (ci-après les « Clients »). Glameo agit exclusivement en tant qu'intermédiaire et n'est pas partie au contrat de prestation de soins conclu entre le Partenaire et le Client."
          },
          {
            h: "2. Réservations et Annulations",
            p: "Conformément à la Loi sur la protection du consommateur du Québec, chaque Partenaire définit sa propre politique d'annulation. En validant une réservation sur Glameo, vous acceptez les modalités spécifiques du salon sélectionné. Glameo se réserve le droit de restreindre l'accès à la plateforme en cas de « no-shows » répétés."
          },
          {
            h: "3. Tarification et Paiements",
            p: "Les prix affichés incluent les taxes applicables (TPS/TVQ) sauf indication contraire. Les paiements s'effectuent généralement au salon. Glameo ne perçoit aucun frais de réservation direct auprès des Clients."
          },
          {
            h: "4. Droit Applicable",
            p: "Les présentes conditions sont régies par les lois en vigueur dans la province de Québec et les lois fédérales du Canada qui s'y appliquent."
          }
        ]
      },
      PRIVACY: { 
        title: "Politique de Confidentialité (Loi 25)", 
        icon: <ShieldCheck className="text-indigo-600" />, 
        sections: [
          {
            h: "1. Engagement de Conformité",
            p: "Glameo s'engage à respecter la Loi sur la protection des renseignements personnels dans le secteur privé (Loi 25 du Québec) ainsi que la LPRPDE (PIPEDA) au niveau fédéral canadien."
          },
          {
            h: "2. Renseignements Collectés",
            p: "Nous collectons : vos informations d'identité (nom, prénom), vos coordonnées (courriel, téléphone), votre historique de réservations et, avec votre consentement, vos photos pour l'assistant virtuel IA."
          },
          {
            h: "3. Sécurité et Hébergement",
            p: "Vos renseignements personnels sont hébergés sur des serveurs sécurisés situés au Canada. Nous utilisons des protocoles de chiffrement de pointe pour prévenir tout accès non autorisé."
          },
          {
            h: "4. Vos Droits",
            p: "Vous disposez d'un droit d'accès, de rectification et de retrait de votre consentement. Pour exercer ces droits, contactez notre responsable de la protection des données à dpo@glameo.ca."
          }
        ]
      },
      COOKIES: { 
        title: "Gestion des Témoins (Cookies)", 
        icon: <Fingerprint className="text-amber-600" />, 
        sections: [
          {
            h: "1. Qu'est-ce qu'un témoin ?",
            p: "Un témoin est un petit fichier texte déposé sur votre appareil pour faciliter votre navigation et personnaliser votre expérience Glameo."
          },
          {
            h: "2. Catégories de témoins utilisés",
            p: "• Témoins Essentiels : Nécessaires à la connexion et à la réservation.\n• Témoins de Performance : Analysent l'utilisation de la plateforme via Google Analytics (anonymisé).\n• Témoins de Personnalisation : Mémorisent vos préférences de salon et vos recherches IA."
          },
          {
            h: "3. Consentement",
            p: "Lors de votre première visite, nous sollicitons votre consentement explicite pour l'utilisation des témoins non essentiels. Vous pouvez modifier ces préférences à tout moment dans les réglages de votre navigateur."
          }
        ]
      },
      HELP: { 
        title: "Centre d'Assistance Glameo", 
        icon: <HelpCircle className="text-emerald-600" />, 
        sections: [
          {
            h: "Support Client",
            p: "Besoin d'aide pour une réservation ? Notre équipe basée à Montréal vous répond du lundi au samedi de 9h à 18h EST."
          },
          {
            h: "Contact Rapide",
            p: "Courriel : support@glameo.ca\nTéléphone : +1 (514) 123-4567"
          }
        ]
      }
    };

    const content = contents[type] || contents.TERMS;

    return (
      <div className="max-w-4xl mx-auto py-12 space-y-12 animate-in fade-in duration-500">
        <div className="flex items-center gap-6">
          <div className="p-5 bg-slate-50 rounded-3xl">
            {content.icon}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">{content.title}</h1>
        </div>

        <div className="space-y-12">
          {content.sections.map((section: any, idx: number) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xl font-black text-slate-900 border-l-4 border-orange-500 pl-4">{section.h}</h3>
              <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-line text-lg">
                {section.p}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-slate-100">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <ShieldAlert className="text-slate-400" size={24} />
              <p className="text-sm font-bold text-slate-500">
                Dernière mise à jour : 28 février 2025 • Conforme Loi 25 (Québec)
              </p>
            </div>
            <a href="mailto:bonjour@glameo.ca" className="font-black text-orange-600 hover:text-orange-700 transition-colors">
              bonjour@glameo.ca
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-slate-400 hover:text-orange-600 font-bold mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Retour
        </button>
        {type === 'HOW_IT_WORKS' ? renderHowItWorks() : renderTextContent()}
      </div>
    </div>
  );
};

export default StaticView;
