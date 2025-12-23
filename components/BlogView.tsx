
import React, { useState } from 'react';
import { MOCK_BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';
import { Clock, ArrowRight, ArrowLeft, Share2, MessageCircle } from 'lucide-react';

const CATEGORIES = ['Tous', 'Tendances', 'Conseils', 'Styles', 'Produits', 'Interviews'];

const BlogView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (!MOCK_BLOG_POSTS || MOCK_BLOG_POSTS.length === 0) {
    return <div className="p-20 text-center font-bold">Chargement du magazine...</div>;
  }

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredPosts = activeCategory === 'Tous' 
    ? MOCK_BLOG_POSTS 
    : MOCK_BLOG_POSTS.filter(post => post.category === activeCategory);

  const featured = filteredPosts[0] || MOCK_BLOG_POSTS[0];
  const listPosts = activeCategory === 'Tous' ? filteredPosts.slice(1) : filteredPosts;

  // Render Full Article View
  if (selectedPost) {
    return (
      <div className="bg-white min-h-screen animate-in fade-in slide-in-from-bottom duration-500">
        <article className="max-w-4xl mx-auto px-4 py-12 md:py-20">
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-pink-600 font-bold mb-10 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Retour au magazine
          </button>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                {selectedPost.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                {selectedPost.title}
              </h1>
              <div className="flex items-center gap-6 text-slate-400 font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 text-xs font-black">
                    {selectedPost.author.charAt(0)}
                  </div>
                  <span className="text-slate-900">{selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  <span>{selectedPost.readTime}</span>
                </div>
                <span>{selectedPost.date}</span>
              </div>
            </div>

            <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-slate-100 shadow-2xl">
              <img 
                src={selectedPost.imageUrl} 
                alt={selectedPost.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-pink prose-xl max-w-none">
              <p className="text-2xl text-slate-500 font-medium italic border-l-4 border-pink-200 pl-6 my-10 leading-relaxed">
                {selectedPost.excerpt}
              </p>
              
              <div className="text-slate-800 leading-[1.8] font-medium whitespace-pre-line space-y-6">
                {selectedPost.content}
              </div>
            </div>

            <div className="pt-12 border-t border-slate-100 flex items-center justify-between">
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-6 py-3 rounded-2xl font-bold text-slate-600 transition-all">
                  <Share2 size={18} /> Partager
                </button>
                <button className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-6 py-3 rounded-2xl font-bold text-slate-600 transition-all">
                  <MessageCircle size={18} /> 12 commentaires
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Blog Hero */}
      <section className="bg-slate-900 py-24 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-pink-600/10 blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Le Magazine <span className="text-pink-500">Beauté</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Tendances, conseils d'experts et inspirations pour sublimer votre style au quotidien.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        {/* Featured Post */}
        {activeCategory === 'Tous' && (
          <div 
            className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 mb-20 flex flex-col lg:flex-row items-stretch min-h-[500px] cursor-pointer group"
            onClick={() => handlePostClick(featured)}
          >
            <div className="lg:w-1/2 h-80 lg:h-auto relative bg-slate-200 overflow-hidden">
              <img 
                src={featured.imageUrl} 
                alt={featured.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            
            <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-white">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">À la une</span>
                <span className="text-slate-400 font-bold text-sm flex items-center gap-1"><Clock size={14} /> {featured.readTime}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight group-hover:text-pink-600 transition-colors">{featured.title}</h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">{featured.excerpt}</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center font-black text-pink-600">{featured.author.charAt(0)}</div>
                  <div className="text-sm">
                    <div className="font-black text-slate-900">{featured.author}</div>
                    <div className="text-slate-400 font-bold">{featured.date}</div>
                  </div>
                </div>
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 transition-all shadow-lg shadow-pink-200">
                  Lire l'article <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-black whitespace-nowrap transition-all border-2 ${activeCategory === cat ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-600 border-slate-100 hover:border-pink-200 hover:text-pink-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {listPosts.length > 0 ? (
            listPosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col animate-in fade-in duration-500 cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                <div className="relative h-64 w-full bg-slate-200 overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-pink-600 shadow-lg">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 line-clamp-2 group-hover:text-pink-600 transition-colors">{post.title}</h3>
                  <p className="text-slate-500 font-medium mb-8 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <button className="text-slate-900 font-black flex items-center gap-2 group/btn hover:text-pink-600 transition-colors mt-auto">
                    Lire la suite <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-400 font-bold italic">Aucun article trouvé dans cette rubrique pour le moment.</p>
            </div>
          )}

          {/* Newsletter Box */}
          {activeCategory === 'Tous' && (
            <div className="bg-gradient-to-br from-pink-600 to-rose-500 rounded-[2.5rem] p-10 text-white flex flex-col justify-center shadow-xl shadow-pink-200">
              <h3 className="text-3xl font-black mb-4">Restez inspiré(e)</h3>
              <p className="text-pink-50 font-bold mb-8 opacity-90 leading-relaxed">Recevez nos meilleurs conseils directement dans votre boîte mail.</p>
              <div className="space-y-3">
                <input type="email" placeholder="Votre courriel" className="w-full bg-white/20 border border-white/30 rounded-2xl p-4 placeholder:text-pink-100 font-bold focus:outline-none focus:ring-2 focus:ring-white/50" />
                <button className="w-full bg-white text-pink-600 py-4 rounded-2xl font-black text-lg hover:bg-slate-900 hover:text-white transition-all shadow-lg">S'abonner</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogView;
