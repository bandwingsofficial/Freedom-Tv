
import React from 'react';
import { NewsItem, NewsCategory } from '../types';

interface NewsSectionProps {
  title: string;
  kannadaTitle: string;
  category: NewsCategory;
  items: NewsItem[];
  onArticleClick: (article: NewsItem) => void;
  onViewAll?: (category: NewsCategory) => void;
  layout?: 'grid' | 'list' | 'featured';
  color?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ 
  title, 
  kannadaTitle, 
  category, 
  items, 
  onArticleClick, 
  onViewAll,
  layout = 'grid',
  color = 'red-600'
}) => {
  if (items.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-2">
        <div className="flex items-center">
          <div className={`w-2 h-8 bg-${color} mr-3 rounded-full`}></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 leading-none">{kannadaTitle}</h2>
            <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest block mt-1">{title}</span>
          </div>
        </div>
        {onViewAll && (
          <button 
            onClick={() => onViewAll(category)}
            className={`text-xs font-bold text-${color} hover:underline uppercase tracking-tighter`}
          >
            ಎಲ್ಲವನ್ನೂ ನೋಡಿ (View All) →
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.slice(0, 4).map((item) => (
          <div 
            key={item.id} 
            onClick={() => onArticleClick(item)}
            className="group cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all border border-gray-50"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-sm md:text-base kannada-font group-hover:text-red-700 transition-colors line-clamp-2 leading-snug mb-3">
                {item.kannadaTitle}
              </h3>
              <div className="mt-auto flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                <span>{item.author}</span>
                <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
