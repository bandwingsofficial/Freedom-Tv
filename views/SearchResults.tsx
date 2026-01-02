
import React from 'react';
import { DUMMY_NEWS } from '../constants';
import { NewsItem } from '../types';
import AdSlot from '../components/AdSlot';

interface SearchResultsProps {
  query: string;
  onArticleClick: (article: NewsItem) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, onArticleClick }) => {
  const filteredNews = DUMMY_NEWS.filter(news => 
    news.title.toLowerCase().includes(query.toLowerCase()) ||
    news.kannadaTitle.toLowerCase().includes(query.toLowerCase()) ||
    news.summary.toLowerCase().includes(query.toLowerCase()) ||
    news.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[60vh]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <span className="w-2 h-10 bg-red-600 mr-4"></span>
          ನೋಡಿದ ಫಲಿತಾಂಶಗಳು (Search Results)
        </h1>
        <p className="mt-2 text-gray-500 italic">Showing results for: <span className="font-bold text-red-600">"{query}"</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNews.map(news => (
                <div 
                  key={news.id} 
                  onClick={() => onArticleClick(news)}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="relative h-48">
                    <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                      {news.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-2 kannada-font group-hover:text-red-700 transition-colors line-clamp-2">
                      {news.kannadaTitle}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{news.summary}</p>
                    <div className="mt-auto flex justify-between items-center text-xs text-gray-500 pt-4 border-t">
                      <span>{news.author}</span>
                      <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700">ಕ್ಷಮಿಸಿ, ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ</h3>
              <p className="text-gray-500 mt-2">No matching news articles found for "{query}". Try different keywords.</p>
              <button 
                onClick={() => window.location.href = '/'}
                className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700"
              >
                Go Back Home
              </button>
            </div>
          )}
          
          <AdSlot type="feed" />
        </div>

        <aside className="space-y-8">
          <AdSlot type="sidebar" />
          
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Top Categories</h3>
            <div className="flex flex-wrap gap-2">
              {['Politics', 'Karnataka', 'Business', 'Sports', 'Entertainment', 'Crime'].map(cat => (
                <button key={cat} className="px-3 py-1 bg-gray-100 hover:bg-red-50 hover:text-red-700 rounded-full text-xs font-medium transition-colors">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default SearchResults;
