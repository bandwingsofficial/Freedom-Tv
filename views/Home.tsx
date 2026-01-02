
import React from 'react';
import { DUMMY_NEWS } from '../constants';
import { NewsItem, NewsCategory } from '../types';
import AdSlot from '../components/AdSlot';
import NewsSection from '../components/NewsSection';

interface HomeProps {
  onArticleClick: (article: NewsItem) => void;
  onCategoryClick?: (category: NewsCategory) => void;
  onLiveClick?: () => void;
}

const Home: React.FC<HomeProps> = ({ onArticleClick, onCategoryClick, onLiveClick }) => {
  // Logic to group news by major categories for the hub view
  const getCategoryItems = (cat: NewsCategory) => DUMMY_NEWS.filter(n => n.category === cat);

  const featured = DUMMY_NEWS[0];
  const politicsItems = getCategoryItems('Politics');
  const bengaluruItems = getCategoryItems('Bengaluru');
  const karnatakaItems = getCategoryItems('Karnataka');
  const agricultureItems = getCategoryItems('Agriculture');
  const electionsItems = getCategoryItems('Elections');
  const sportsItems = getCategoryItems('Sports');
  const entertainmentItems = getCategoryItems('Entertainment');

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <AdSlot type="banner" />

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div 
            onClick={() => onArticleClick(featured)}
            className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-2xl aspect-video md:aspect-[21/9] lg:aspect-auto lg:h-[450px]"
          >
            <img 
              src={featured.imageUrl} 
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
              <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4">
                {featured.category}
              </span>
              <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-4 kannada-font leading-tight">
                {featured.kannadaTitle}
              </h1>
              <p className="text-gray-200 text-sm md:text-lg line-clamp-2 max-w-3xl font-medium opacity-90">
                {featured.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar - Live TV Integration */}
        <aside className="space-y-8">
          <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl">
            <h3 className="text-red-500 font-black mb-4 flex items-center uppercase text-xs tracking-widest">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping mr-2"></span>
              LIVE STREAMING
            </h3>
            <div className="bg-black aspect-video rounded-2xl flex items-center justify-center border border-gray-800 relative overflow-hidden group">
              {/* Correctly embedding the live stream from the channel ID to avoid Error 153 */}
              <iframe 
                width="100%" 
                height="100%"
                src="https://www.youtube.com/embed/live_stream?channel=UCZbv414BvWWuAklH7k3QKag&autoplay=0&mute=1&rel=0"
                title="Freedom TV Live" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full rounded-2xl"
              ></iframe>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Freedom TV Kannada Digital</p>
              <div className="flex items-center justify-between">
                <a 
                  href="https://www.youtube.com/@freedomtvkannadadigital" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-red-500 font-black hover:underline uppercase tracking-tighter"
                >
                  Visit Channel
                </a>
                <button 
                  onClick={onLiveClick}
                  className="text-[10px] text-gray-400 hover:text-white font-bold uppercase tracking-widest transition-colors"
                >
                  Expand Player
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6 border-b pb-2">ಪ್ರಮುಖ ಮುಖ್ಯಾಂಶಗಳು (Top Briefs)</h3>
            <div className="space-y-6">
              {DUMMY_NEWS.slice(5, 9).map((news, i) => (
                <div key={news.id} onClick={() => onArticleClick(news)} className="flex gap-4 group cursor-pointer items-start">
                  <span className="text-2xl font-black text-gray-100 italic">0{i+1}</span>
                  <div>
                    <h4 className="font-bold text-sm leading-snug kannada-font group-hover:text-red-700 transition-colors">
                      {news.kannadaTitle}
                    </h4>
                    <span className="text-[9px] text-gray-400 uppercase font-bold mt-1 block">{news.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Elections Special Section */}
      <NewsSection 
        title="Election 2024" 
        kannadaTitle="ಚುನಾವಣಾ ವಿಶೇಷ (Election Special)" 
        category="Elections" 
        items={electionsItems} 
        onArticleClick={onArticleClick}
        onViewAll={onCategoryClick}
        color="orange-600"
      />

      <AdSlot type="feed" />

      {/* Regional Focus Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
        <NewsSection 
          title="Karnataka News" 
          kannadaTitle="ಕರ್ನಾಟಕದ ಸುದ್ದಿಗಳು" 
          category="Karnataka" 
          items={karnatakaItems} 
          onArticleClick={onArticleClick}
          onViewAll={onCategoryClick}
        />
        <NewsSection 
          title="Bengaluru City" 
          kannadaTitle="ಬೆಂಗಳೂರು ಮಹಾನಗರ" 
          category="Bengaluru" 
          items={bengaluruItems} 
          onArticleClick={onArticleClick}
          onViewAll={onCategoryClick}
        />
      </div>

      <NewsSection 
        title="Politics" 
        kannadaTitle="ರಾಜಕೀಯ ವಿದ್ಯಮಾನಗಳು" 
        category="Politics" 
        items={politicsItems} 
        onArticleClick={onArticleClick}
        onViewAll={onCategoryClick}
        color="indigo-700"
      />

      <AdSlot type="banner" />

      {/* Rural & Business Focus */}
      <NewsSection 
        title="Agriculture & Rural" 
        kannadaTitle="ಕೃಷಿ ಮತ್ತು ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ" 
        category="Agriculture" 
        items={agricultureItems} 
        onArticleClick={onArticleClick}
        onViewAll={onCategoryClick}
        color="green-600"
      />

      {/* Lifestyle & Entertainment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
        <NewsSection 
          title="Entertainment" 
          kannadaTitle="ಸಿನಿಮಾ ಮತ್ತು ಮನರಂಜನೆ" 
          category="Entertainment" 
          items={entertainmentItems} 
          onArticleClick={onArticleClick}
          onViewAll={onCategoryClick}
          color="pink-600"
        />
        <NewsSection 
          title="Sports" 
          kannadaTitle="ಕ್ರೀಡಾ ಲೋಕ" 
          category="Sports" 
          items={sportsItems} 
          onArticleClick={onArticleClick}
          onViewAll={onCategoryClick}
          color="blue-600"
        />
      </div>

      <AdSlot type="feed" />
    </main>
  );
};

export default Home;
