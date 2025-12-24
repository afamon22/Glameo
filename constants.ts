
import { Salon, Service, BlogPost, Review } from './types';

export const MOCK_SERVICES: Service[] = [
  { id: 's1', name: 'Coupe Femme', duration: 45, bufferTime: 15, price: 45, description: 'Shampoing, coupe et mise en plis.' },
  { id: 's2', name: 'Coupe Homme', duration: 30, bufferTime: 10, price: 25, description: 'Coupe classique aux ciseaux ou tondeuse.' },
  { id: 's3', name: 'Coloration complète', duration: 120, bufferTime: 20, price: 85, description: 'Coloration racines et pointes.' },
  { id: 's4', name: 'Balayage', duration: 150, bufferTime: 20, price: 110, description: 'Éclaircissement naturel pour un effet soleil.' },
];

const DEFAULT_POLICY = {    
  freeUntilHours: 24,
  lateCancelFeePercent: 50,
  noShowFeePercent: 100
};

export const MOCK_SALONS: Salon[] = [
  {
    id: '1',
    name: 'L’Atelier Coiffure Montréal',
    description: 'Un salon moderne au cœur du Plateau, spécialisé dans les techniques de coloration avant-gardistes.',
    address: '1234 Rue Mont-Royal, Montréal',
    rating: 4.8,
    reviewCount: 154,
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=800&q=80'
    ],
    services: MOCK_SERVICES,
    ownerId: 'p1',
    specialties: ['Coloration', 'Balayage'],
    isVerified: true,
    category: 'Coiffure',
    cancellationPolicy: DEFAULT_POLICY
  },
  {
    id: '2',
    name: 'Le Barbier du Mile-End',
    description: 'Le rendez-vous incontournable pour une barbe parfaite et une coupe précise.',
    address: '5678 Boulevard Saint-Laurent, Montréal',
    rating: 4.9,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512690196252-7c762506e23b?auto=format&fit=crop&w=800&q=80'
    ],
    services: [MOCK_SERVICES[1]],
    ownerId: 'p2',
    specialties: ['Barbe', 'Taille de précision'],
    category: 'Barbier',
    cancellationPolicy: { ...DEFAULT_POLICY, lateCancelFeePercent: 30 }
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Les 5 tendances coloration du printemps 2025',
    excerpt: 'Du "Peach Fuzz" au blond polaire, découvrez les nuances qui feront vibrer Montréal cette saison.',
    content: 'Le printemps 2025 s\'annonce coloré et audacieux. Les experts Glameo ont parcouru les défilés et les salons les plus branchés pour vous dénicher les pépites de la saison.\n\nEn tête de liste, le "Peach Fuzz", couleur de l\'année, se décline en reflets subtils pour réchauffer le teint. Pour les plus audacieuses, le blond polaire reste une valeur sûre, tandis que le "brun chocolat profond" apporte une touche de sophistication bienvenue.',
    author: 'Sophie L.',
    category: 'Tendances',
    imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
    date: '15 Mars 2025',
    readTime: '5 min'
  },
  {
    id: 'b2',
    title: 'Comment prendre soin de sa barbe en hiver ?',
    excerpt: 'Le froid montréalais n\'épargne pas votre barbe. Voici nos conseils pour la garder douce et brillante.',
    content: 'L\'hiver au Québec peut être rude pour les poils du visage. Le froid et le chauffage assèchent la peau et la barbe.\n\nL\'astuce numéro 1 : l\'hydratation. Utilisez une huile à barbe riche quotidiennement. N\'oubliez pas de brosser votre barbe pour répartir le sébum naturel et les huiles appliquées.',
    author: 'Marc B.',
    category: 'Conseils',
    imageUrl: 'https://images.unsplash.com/photo-1590540179852-2110a54f813a?auto=format&fit=crop&w=800&q=80',
    date: '10 Mars 2025',
    readTime: '4 min'
  },
  {
    id: 'b3',
    title: 'Pourquoi Glameo change la donne pour les salons',
    excerpt: 'Découvrez comment notre modèle sans commission soutient l\'artisanat local au Canada.',
    content: 'Chez Glameo, notre mission est simple : redonner le pouvoir aux artisans de la beauté. Contrairement aux plateformes traditionnelles qui prélèvent jusqu\'à 20% de commission, nous avons opté pour un modèle SaaS par abonnement.\n\nCela signifie que chaque dollar que vous payez pour votre soin va directement dans la poche de votre styliste. C\'est notre façon de soutenir l\'économie locale et de garantir des prix justes pour tous.',
    author: 'L\'équipe Glameo',
    category: 'Styles',
    imageUrl: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80',
    date: '01 Mars 2025',
    readTime: '3 min'
  }
];
