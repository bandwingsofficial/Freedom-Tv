
import React from 'react';
import AdSlot from '../components/AdSlot';
import { DUMMY_NEWS } from '../constants';
import { NewsItem } from '../types';

interface LiveTVProps {
  onArticleClick: (article: NewsItem) => void;
}

const LiveTV: React.FC<LiveTVProps> = ({ onArticleClick }) => {
  return (
    <main className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Player */}
          <div className="lg:col-span-2 flex-1">
            <div className="bg-black aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
              {/* Dynamic Live Stream Embed via Channel ID */}
              <iframe 
                width="100%" 
                height="100%"
                src="https://www.youtube.com/embed/live_stream?channel=UCZbv414BvWWuAklH7k3QKag&autoplay=1&mute=0&rel=0"
                title="Freedom TV Live Streaming" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-black flex items-center">
                  <span className="w-3 h-3 bg-red-600 rounded-full mr-4 animate-pulse"></span>
                  Freedom TV Kannada Digital ಲೈವ್ ಸುದ್ದಿ
                </h1>
                <p className="text-gray-400 text-sm mt-2 font-medium">Official Digital Stream. Stay connected for real-time Karnataka regional updates.</p>
              </div>
              <div className="flex space-x-3">
                <a 
                  href="https://www.youtube.com/@freedomtvkannadadigital" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-red-900/20"
                >
                  YouTube Channel
                </a>
                <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest border border-gray-700">Share</button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-black text-xs uppercase tracking-widest text-gray-500">Current Schedule</h3>
                <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-800 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-red-500 font-bold mr-4 text-xs">NOW</span>
                    <div>
                      <p className="font-bold text-sm">Pradhana Varadi (Lead Report)</p>
                      <p className="text-[10px] text-gray-400">Digital Desk: Freedom TV</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Live</span>
                </div>
                <div className="bg-gray-800/20 p-4 rounded-2xl border border-gray-800/50 flex items-center justify-between opacity-60">
                  <div className="flex items-center">
                    <span className="text-gray-500 font-bold mr-4 text-xs">NEXT</span>
                    <div>
                      <p className="font-bold text-sm">Digital Exclusive Interview</p>
                      <p className="text-[10px] text-gray-400">Special Correspondent</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-black text-xs uppercase tracking-widest text-gray-500">Digital Pulse</h3>
                <div className="bg-red-900/20 p-6 rounded-3xl border border-red-900/30 flex items-center space-x-6">
                   <div className="text-3xl">📱</div>
                   <div>
                      <p className="text-xs font-black text-red-500 uppercase mb-1 tracking-widest">Digital First</p>
                      <p className="text-sm font-bold leading-tight">Freedom TV Kannada Digital is now your primary source for non-stop regional updates on the go.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Chat Simulation */}
          <aside className="w-full lg:w-80 space-y-8">
            <div className="bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 flex flex-col h-[500px] lg:h-[600px]">
              <div className="p-4 bg-gray-900 border-b border-gray-800 flex justify-between items-center">
                <h3 className="font-black text-xs uppercase tracking-widest">Live Viewer Interactions</h3>
                <span className="bg-red-600 text-[8px] font-black px-2 py-0.5 rounded-full animate-pulse">4.2K LIVE</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {[
                  { user: 'Suresh B', msg: 'Great coverage of the rural issues.', time: '1m ago' },
                  { user: 'Manjula K', msg: 'Is there any update on the rain in Mysore?', time: '3m ago' },
                  { user: 'Kiran Nayak', msg: 'Freedom TV provides the most unbiased news.', time: '5m ago' },
                  { user: 'Rahul_77', msg: 'Bengaluru traffic is unbearable today!', time: '7m ago' },
                  { user: 'Farmer_Connect', msg: 'Thanks for discussing the MSP issues.', time: '10m ago' },
                ].map((chat, i) => (
                  <div key={i} className="flex flex-col space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-red-500 uppercase">{chat.user}</span>
                      <span className="text-[8px] text-gray-500 uppercase">{chat.time}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed bg-white/5 p-3 rounded-xl">{chat.msg}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-900 border-t border-gray-800">
                <input 
                  type="text" 
                  placeholder="Join the conversation..." 
                  className="w-full bg-gray-800 border-none rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-red-600 outline-none" 
                />
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <h4 className="font-black text-xs uppercase tracking-widest text-gray-500 mb-6">Related Stories</h4>
              <div className="space-y-6">
                 {DUMMY_NEWS.slice(0, 3).map(news => (
                   <div key={news.id} onClick={() => onArticleClick(news)} className="flex items-start gap-4 group cursor-pointer">
                      <div className="w-16 h-12 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                         <img src={news.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h5 className="text-[11px] font-bold leading-snug kannada-font group-hover:text-red-500 transition-colors line-clamp-2">
                        {news.kannadaTitle}
                      </h5>
                   </div>
                 ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
      `}</style>
    </main>
  );
};

export default LiveTV;
