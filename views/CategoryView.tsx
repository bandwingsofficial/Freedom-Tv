
import React from 'react';
import { DUMMY_NEWS } from '../constants';
import { NewsItem, NewsCategory } from '../types';
import AdSlot from '../components/AdSlot';

interface CategoryViewProps {
  category: NewsCategory;
  onArticleClick: (article: NewsItem) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ category, onArticleClick }) => {
  const filteredNews = DUMMY_NEWS.filter(news => news.category === category);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[60vh] fade-in">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-4xl font-black flex items-center mb-2">
            <span className="w-3 h-12 bg-red-600 mr-4 rounded-full"></span>
            {category === 'Karnataka' ? 'ಕರ್ನಾಟಕ (Karnataka)' : 
             category === 'Bengaluru' ? 'ಬೆಂಗಳೂರು (Bengaluru)' : 
             category === 'Politics' ? 'ರಾಜಕೀಯ (Politics)' : 
             category === 'Elections' ? 'ಚುನಾವಣಾ ವರದಿ (Elections)' :
             category}
          </h1>
          <p className="text-gray-500 font-medium">Browse the latest stories and analytical reports in {category}.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <select className="bg-white border rounded-lg px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-red-600">
            <option>Latest First</option>
            <option>Most Popular</option>
            <option>Oldest First</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredNews.map(news => (
                <div 
                  key={news.id} 
                  onClick={() => onArticleClick(news)}
                  className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden group cursor-pointer hover:shadow-xl transition-all flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={news.imageUrl} 
                      alt={news.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg md:text-xl mb-3 kannada-font group-hover:text-red-700 transition-colors line-clamp-3 leading-snug">
                      {news.kannadaTitle}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">{news.summary}</p>
                    <div className="mt-auto flex justify-between items-center text-[10px] text-gray-400 font-black uppercase tracking-widest pt-4 border-t border-gray-50">
                      <span>{news.author}</span>
                      <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-20 rounded-3xl text-center border-2 border-dashed border-gray-200">
              <h3 className="text-xl font-bold text-gray-400">No articles found in this category.</h3>
            </div>
          )}
          
          <AdSlot type="feed" />
        </div>

        <aside className="space-y-8">
          <AdSlot type="sidebar" />
          
          <div className="bg-white p-8 rounded-3xl border shadow-sm sticky top-24">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-6 border-b pb-2">More Categories</h3>
            <div className="flex flex-wrap gap-2">
              {['Politics', 'Karnataka', 'Business', 'Sports', 'Entertainment', 'Crime', 'Agriculture', 'Elections', 'Technology'].map(cat => (
                <button 
                  key={cat} 
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${cat === category ? 'bg-red-600 text-white' : 'bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-700'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-12 bg-gray-50 p-6 rounded-2xl">
              <h4 className="font-bold text-sm mb-2">Subscribe to {category} Alerts</h4>
              <p className="text-xs text-gray-500 mb-4">Get the latest {category} news directly in your inbox.</p>
              <input type="email" placeholder="Your email" className="w-full bg-white border-none rounded-lg px-4 py-2 text-xs mb-2 outline-none" />
              <button className="w-full bg-red-600 text-white font-bold py-2 rounded-lg text-[10px] uppercase">Subscribe</button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CategoryView;
