
import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MoreVertical, CheckCheck } from 'lucide-react';
import { db } from '../services/database';
import { Message } from '../types';

interface ChatWindowProps {
  currentUserId: string;
  partnerId: string;
  partnerName: string;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ currentUserId, partnerId, partnerName, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessages = () => {
      const msgs = db.getMessages(currentUserId, partnerId);
      setMessages(msgs);
    };
    loadMessages();
    const interval = setInterval(loadMessages, 3000); // Simulate polling
    return () => clearInterval(interval);
  }, [currentUserId, partnerId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    db.sendMessage({
      senderId: currentUserId,
      receiverId: partnerId,
      text: inputText.trim()
    });
    setInputText('');
    setMessages(db.getMessages(currentUserId, partnerId));
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-bottom duration-300">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-black">
            {partnerName.charAt(0)}
          </div>
          <div>
            <h4 className="font-black text-slate-900 leading-tight">{partnerName}</h4>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">En ligne</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
          <X size={20} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/30">
        {messages.map((m) => {
          const isMe = m.senderId === currentUserId;
          return (
            <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium shadow-sm ${
                isMe ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-900 border border-slate-100 rounded-tl-none'
              }`}>
                {m.text}
                <div className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${isMe ? 'text-white/50' : 'text-slate-400'}`}>
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {isMe && <CheckCheck size={12} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Votre message..." 
          className="flex-grow bg-slate-100 border-none rounded-2xl px-5 py-3 text-sm font-bold focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
        <button 
          type="submit" 
          disabled={!inputText.trim()}
          className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center hover:bg-orange-700 transition-all disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
