
import { Salon, Booking, UserRole, Message } from '../types';
import { MOCK_SALONS } from '../constants';

const DB_KEYS = {
  SALONS: 'glameo_salons',
  BOOKINGS: 'glameo_bookings',
  USER: 'glameo_current_user',
  MESSAGES: 'glameo_messages'
};

export const db = {
  init: () => {
    if (!localStorage.getItem(DB_KEYS.SALONS)) {
      localStorage.setItem(DB_KEYS.SALONS, JSON.stringify(MOCK_SALONS));
    }
    if (!localStorage.getItem(DB_KEYS.BOOKINGS)) {
      localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify([]));
    }
    if (!localStorage.getItem(DB_KEYS.MESSAGES)) {
      localStorage.setItem(DB_KEYS.MESSAGES, JSON.stringify([]));
    }
  },

  getSalons: (): Salon[] => {
    return JSON.parse(localStorage.getItem(DB_KEYS.SALONS) || '[]');
  },

  getSalonById: (id: string): Salon | undefined => {
    return db.getSalons().find(s => s.id === id);
  },

  getBookings: (): Booking[] => {
    return JSON.parse(localStorage.getItem(DB_KEYS.BOOKINGS) || '[]');
  },

  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const bookings = db.getBookings();
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify(bookings));
    return newBooking;
  },

  updateBookingStatus: (id: string, status: Booking['status']): void => {
    const bookings = db.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index].status = status;
      localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify(bookings));
    }
  },

  // MESSAGING
  getMessages: (userId1: string, userId2: string): Message[] => {
    const all = JSON.parse(localStorage.getItem(DB_KEYS.MESSAGES) || '[]');
    return all.filter((m: Message) => 
      (m.senderId === userId1 && m.receiverId === userId2) ||
      (m.senderId === userId2 && m.receiverId === userId1)
    ).sort((a: Message, b: Message) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  },

  sendMessage: (msg: Omit<Message, 'id' | 'timestamp' | 'isRead'>): Message => {
    const all = JSON.parse(localStorage.getItem(DB_KEYS.MESSAGES) || '[]');
    const newMsg: Message = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    all.push(newMsg);
    localStorage.setItem(DB_KEYS.MESSAGES, JSON.stringify(all));
    return newMsg;
  },

  getAllConversationsForUser: (userId: string) => {
    const all = JSON.parse(localStorage.getItem(DB_KEYS.MESSAGES) || '[]');
    const userMessages = all.filter((m: Message) => m.senderId === userId || m.receiverId === userId);
    const partners = new Set<string>();
    userMessages.forEach((m: Message) => partners.add(m.senderId === userId ? m.receiverId : m.senderId));
    return Array.from(partners);
  },

  setCurrentUser: (user: any) => {
    localStorage.setItem(DB_KEYS.USER, JSON.stringify(user));
  },

  getCurrentUser: () => {
    const user = localStorage.getItem(DB_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  logout: () => {
    localStorage.removeItem(DB_KEYS.USER);
  }
};
