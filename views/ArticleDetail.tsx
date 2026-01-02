
import React, { useEffect } from 'react';
import { NewsItem } from '../types';
import { DUMMY_NEWS } from '../constants';
import AdSlot from '../components/AdSlot';

interface ArticleDetailProps {
  article: NewsItem;
  onArticleClick: (article: NewsItem) => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onArticleClick }) => {
  // Scroll to top on load or when article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  const relatedArticles = DUMMY_NEWS
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 4);

  const shareButtons = [
    { label: 'Facebook', color: 'bg-[#1877F2]', icon: 'FB' },
    { label: 'Twitter', color: 'bg-[#1DA1F2]', icon: 'TW' },
    { label: 'WhatsApp', color: 'bg-[#25D366]', icon: 'WA' },
    { label: 'Share', color: 'bg-gray-700', icon: '🔗' },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 fade-in">
      <AdSlot type="banner" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 space-x-2">
            <span 
              onClick={() => window.location.href = '/'}
              className="hover:text-red-600 cursor-pointer transition-colors"
            >
              Home
            </span>
            <span className="text-gray-300">/</span>
            <span className="text-red-600">{article.category}</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 kannada-font leading-[1.2] text-gray-900 tracking-tight">
            {article.kannadaTitle}
          </h1>

          {/* Author & Meta Data */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-y border-gray-100 py-6 mb-8 space-y-6 sm:space-y-0">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full mr-4 overflow-hidden ring-2 ring-gray-50">
                <img 
                  src={`https://ui-avatars.com/api/?name=${article.author}&background=random&bold=true`} 
                  alt={article.author} 
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{article.author}</p>
                <div className="flex items-center text-[11px] text-gray-500 font-medium space-x-2 mt-0.5">
                  <span className="bg-gray-100 px-1.5 py-0.5 rounded">{new Date(article.publishedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {shareButtons.map(btn => (
                <button 
                  key={btn.label}
                  className={`${btn.color} text-white text-[11px] font-bold px-4 py-2 rounded-full hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center shadow-sm`}
                >
                  <span className="mr-1.5">{btn.icon}</span>
                  <span className="hidden sm:inline">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <figure className="mb-10 overflow-hidden rounded-2xl shadow-2xl bg-gray-200">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full object-cover max-h-[550px] transition-transform hover:scale-[1.01] duration-700"
            />
            <figcaption className="p-4 text-xs md:text-sm text-gray-500 bg-gray-50/50 border-t border-gray-100 italic">
              ಚಿತ್ರ ಕೃಪೆ: Freedom TV - {article.title}
            </figcaption>
          </figure>

          {/* Article Text Content Wrapper with Reading Container */}
          <article className="max-w-none article-body">
            <div className="reading-container">
              {/* Summary/Lead Paragraph - High Visibility */}
              <div className="relative mb-12">
                <div className="absolute -left-4 top-0 bottom-0 w-2 bg-red-600 rounded-full"></div>
                <p className="kannada-readable font-bold text-gray-900 bg-red-50/80 pl-8 pr-8 py-10 rounded-2xl border-2 border-red-100 shadow-md leading-[2.2]">
                  {article.summary}
                </p>
              </div>
              
              <div className="kannada-readable">
                <p>{article.content}</p>
                
                <p>
                  <strong>ಬೆಂಗಳೂರು:</strong> ಕರ್ನಾಟಕದ ರಾಜಕೀಯ ವಲಯದಲ್ಲಿ ಈ ಬೆಳವಣಿಗೆಯು ಪ್ರಮುಖ ಚರ್ಚಾ ವಿಷಯವಾಗಿದೆ. ಮುಂದಿನ ಚುನಾವಣಾ ದೃಷ್ಟಿಯಿಂದ ಈ ಬದಲಾವಣೆಗಳು ಮಹತ್ವ ಪಡೆದುಕೊಳ್ಳಲಿವೆ ಎಂದು ತಜ್ಞರು ಅಭಿಪ್ರಾಯಪಟ್ಟಿದ್ದಾರೆ. ರಾಜ್ಯದ ವಿವಿಧ ಜಿಲ್ಲೆಗಳಿಂದ ಈ ಕುರಿತು ಮಿಶ್ರ ಪ್ರತಿಕ್ರಿಯೆಗಳು ವ್ಯಕ್ತವಾಗುತ್ತಿವೆ. 
                </p>

                {/* Reporter's Field Note / Editorial Insights - ENHANCED VISIBILITY */}
                <div className="bg-yellow-100/90 p-8 md:p-14 rounded-[2.5rem] border-[6px] border-yellow-400 shadow-2xl my-24 relative overflow-hidden group">
                  <div className="absolute top-0 left-10 -translate-y-1/2 bg-yellow-600 text-white px-8 py-3 rounded-full text-[13px] font-black uppercase tracking-widest shadow-xl flex items-center z-20 border-2 border-white">
                    <span className="mr-3 text-lg">📝</span> ವರದಿಗಾರರ ವಿಶೇಷ ಸೂಚನೆ
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-xl md:text-3xl italic text-gray-900 leading-[1.8] font-black kannada-font">
                      "ಬೆಂಗಳೂರಿನ ಸ್ಥಳೀಯ ಮೂಲಗಳ ಪ್ರಕಾರ, ಈ ವಿಷಯವು ಕೇವಲ ರಾಜಕೀಯವಲ್ಲ, ಬದಲಾಗಿ ಜನಸಾಮಾನ್ಯರ ಜೀವನದ ಮೇಲೂ ಗಾಢ ಪರಿಣಾಮ ಬೀರಲಿದೆ. ನಮ್ಮ ತಂಡವು ಕಳೆದ ೪೮ ಗಂಟೆಗಳಲ್ಲಿ ಹತ್ತಕ್ಕೂ ಹೆಚ್ಚು ಹಳ್ಳಿಗಳಲ್ಲಿ ಈ ಕುರಿತು ಸಂಶೋಧನೆ ನಡೆಸಿದ್ದು, ಜನರ ಆತಂಕಗಳು ಈಗ ಬಹಿರಂಗವಾಗುತ್ತಿವೆ."
                    </p>
                    <div className="mt-8 flex items-center bg-white/40 w-fit px-5 py-2 rounded-2xl border border-yellow-200">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-xs mr-4 shadow-lg ring-4 ring-white">FTV</div>
                      <div>
                        <p className="text-gray-900 font-black text-sm uppercase tracking-widest">Ground Intelligence Bureau</p>
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">Verified Regional Insights</p>
                      </div>
                    </div>
                  </div>

                  {/* High contrast visual indicator */}
                  <div className="absolute -right-12 -bottom-12 opacity-10 text-yellow-600 text-[20rem] font-black transition-transform group-hover:scale-110 select-none leading-none pointer-events-none">
                    “
                  </div>
                </div>

                <p>
                  ಸರ್ಕಾರವು ಕೈಗೊಂಡಿರುವ ಈ ನಿರ್ಧಾರಕ್ಕೆ ಪರ-ವಿರೋಧ ಚರ್ಚೆಗಳು ನಡೆಯುತ್ತಿವೆ. ಈ ಕುರಿತು ಹೆಚ್ಚಿನ ಅಪ್‌ಡೇಟ್‌ಗಳಿಗಾಗಿ ಫ್ರೀಡಂ ಟಿವಿಯನ್ನು ವೀಕ್ಷಿಸುತ್ತಿರಿ. ನಾವು ಪ್ರತಿಯೊಂದು ಹಂತದ ಬೆಳವಣಿಗೆಯನ್ನು ನಿಮಗೆ ತಲುಪಿಸುತ್ತೇವೆ. ಮುಂಬರುವ ದಿನಗಳಲ್ಲಿ ಇದು ಯಾವ ರೂಪ ಪಡೆಯಲಿದೆ ಎಂಬುದು ಕುತೂಹಲ ಕೆರಳಿಸಿದೆ.
                </p>
              </div>
            </div>
          </article>

          {/* Author Bio Card */}
          <div className="mt-20 bg-white p-6 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-8 md:space-y-0 md:space-x-10">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 md:w-32 md:h-32 bg-red-50 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl rotate-3 transition-transform hover:rotate-0">
                 <img 
                   src={`https://ui-avatars.com/api/?name=${article.author}&size=128&background=b91c1c&color=fff&bold=true`} 
                   alt={article.author} 
                   className="-rotate-3 scale-110"
                 />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-2xl mb-1 text-gray-900">{article.author}</h4>
              <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.25em] mb-4">Senior Regional Correspondent</p>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
                With over a decade of specialized experience in state politics and rural economy, {article.author} leads our regional desk, focusing on the intersection of policy and people's lives.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <button className="text-[10px] font-black text-gray-400 hover:text-red-600 border-b-2 border-transparent hover:border-red-600 transition-all pb-1 uppercase tracking-widest">Follow Author</button>
                <button className="text-[10px] font-black text-gray-400 hover:text-red-600 border-b-2 border-transparent hover:border-red-600 transition-all pb-1 uppercase tracking-widest">Article Archive</button>
              </div>
            </div>
          </div>

          <AdSlot type="feed" />

          {/* Related Articles Grid */}
          <section className="mt-24 border-t border-gray-100 pt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
              <div>
                <h3 className="text-2xl md:text-3xl font-black flex items-center mb-2 tracking-tight">
                  <span className="w-2 h-10 bg-red-600 mr-5 rounded-full"></span>
                  ಸಂಬಂಧಿತ ಸುದ್ದಿಗಳು
                </h3>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Recommended from {article.category}</p>
              </div>
              <button 
                className="bg-gray-100 hover:bg-red-600 hover:text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all"
              >
                View All {article.category} →
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedArticles.map(rel => (
                <div 
                  key={rel.id} 
                  onClick={() => onArticleClick(rel)}
                  className="group cursor-pointer flex flex-col bg-white rounded-3xl p-2 transition-all hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-gray-50"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-5 shadow-sm">
                    <img 
                      src={rel.imageUrl} 
                      alt={rel.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="px-2 pb-4">
                    <h4 className="font-bold text-sm md:text-base kannada-font group-hover:text-red-700 transition-colors line-clamp-2 leading-snug mb-4">
                      {rel.kannadaTitle}
                    </h4>
                    <div className="flex items-center text-[9px] text-gray-400 font-black uppercase tracking-[0.15em]">
                      <span>{rel.author}</span>
                      <span className="mx-2 opacity-30">•</span>
                      <span>{new Date(rel.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-12">
          <div className="sticky top-28">
            <AdSlot type="sidebar" />
            
            {/* Membership/Subscription Widget */}
            <div className="bg-gradient-to-br from-red-600 to-red-900 p-10 rounded-[2.5rem] text-white shadow-2xl overflow-hidden relative group">
              <div className="relative z-10">
                <span className="bg-white/20 text-[10px] font-black uppercase tracking-[0.4em] px-3 py-1.5 rounded-lg mb-6 inline-block">Freedom Access</span>
                <h3 className="font-black text-2xl mb-6 tracking-tight uppercase leading-tight">Support Regional Journalism</h3>
                <p className="text-sm opacity-90 mb-10 leading-relaxed font-medium">
                  Invest in news that matters. Get deep regional analysis, zero ads, and early access to documentaries.
                </p>
                <button className="w-full bg-white text-red-800 font-black py-5 rounded-2xl hover:bg-gray-100 active:scale-95 transition-all shadow-xl text-xs uppercase tracking-[0.2em]">
                  Get Membership
                </button>
              </div>
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-56 h-56 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
            </div>

            {/* Trending Sidebar Section */}
            <div className="mt-12 bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl">
              <h4 className="font-black mb-10 uppercase text-[10px] tracking-[0.3em] text-gray-400 border-b border-gray-50 pb-5 flex justify-between items-center">
                <span>Trending Feed</span>
                <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
              </h4>
              <div className="space-y-8">
                {DUMMY_NEWS.slice(10, 14).map((item, i) => (
                  <div key={i} onClick={() => onArticleClick(item)} className="flex items-start space-x-5 group cursor-pointer">
                    <div className="w-24 h-18 bg-gray-50 rounded-2xl flex-shrink-0 overflow-hidden shadow-inner-sm">
                       <img src={item.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110" loading="lazy" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-[13px] font-bold leading-[1.5] group-hover:text-red-700 kannada-font line-clamp-2 transition-colors">
                        {item.kannadaTitle}
                      </h5>
                      <span className="text-[9px] text-red-600 font-black uppercase mt-2 inline-block tracking-widest">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-12 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-red-600 bg-gray-50 rounded-2xl transition-all">Explore Trending →</button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default ArticleDetail;
