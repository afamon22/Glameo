
import React, { useState, useRef } from 'react';
import { Upload, Wand2, RefreshCcw, Download, Sparkles, AlertCircle } from 'lucide-react';
import { editHairstyleImage } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("L'image est trop lourde (max 5Mo).");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!image || !prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const edited = await editHairstyleImage(image, prompt);
      setResult(edited);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la modification de l'image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-white/10 rounded-3xl flex items-center justify-center overflow-hidden border border-white/20 backdrop-blur-sm shadow-inner">
        {!image ? (
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center gap-4 text-white/80 hover:text-white transition-all group"
          >
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
              <Upload size={32} />
            </div>
            <span className="text-sm font-black uppercase tracking-widest">Ma Photo</span>
          </button>
        ) : (
          <img src={result || image} alt="Hairstyle Preview" className="w-full h-full object-cover animate-in fade-in duration-500" />
        )}
        
        {loading && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center text-white p-6 text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-500" size={24} />
            </div>
            <p className="text-lg font-black italic">Glameo Vision</p>
            <p className="text-[10px] text-white/60 font-black mt-2 uppercase tracking-widest">Génération du style par IA...</p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 bg-rose-600/90 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center">
            <AlertCircle size={40} className="mb-4" />
            <p className="font-black text-sm">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-6 bg-white text-rose-600 px-6 py-2 rounded-xl text-xs font-black"
            >
              Réessayer
            </button>
          </div>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/png, image/jpeg" 
        onChange={handleFileChange} 
      />

      {image && !loading && !error && (
        <div className="space-y-3 animate-in slide-in-from-bottom duration-500">
          <textarea
            placeholder="Ex: 'Ajoute des reflets cuivrés' ou 'Coupe dégradée'..."
            className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px] font-bold"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleProcess}
              disabled={!prompt.trim() || loading}
              className="bg-orange-600 text-white py-4 rounded-2xl text-sm font-black flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg disabled:opacity-50"
            >
              <Wand2 size={18} />
              Appliquer
            </button>
            <button
              onClick={() => {
                setImage(null);
                setResult(null);
                setPrompt('');
                setError(null);
              }}
              className="bg-white/10 text-white py-4 rounded-2xl text-sm font-black flex items-center justify-center gap-2 hover:bg-white/20 transition-all border border-white/10"
            >
              <RefreshCcw size={18} />
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
