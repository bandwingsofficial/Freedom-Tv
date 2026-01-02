
import React, { useState } from 'react';
import { UserRole } from '../types';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onSearch: (query: string) => void;
  userRole?: UserRole;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate, onSearch, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const navItems = [
    { label: 'ಮುಖಪುಟ', id: 'home' },
    { label: 'ಕರ್ನಾಟಕ', id: 'karnataka' },
    { label: 'ಬೆಂಗಳೂರು', id: 'bengaluru' },
    { label: 'ರಾಜಕೀಯ', id: 'politics' },
    { label: 'ಲೈವ್ ಟಿವಿ', id: 'live', highlight: true },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setSearchInput('');
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-red-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 md:h-28">
          <div className="flex items-center space-x-4">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer py-2" 
              onClick={() => onNavigate('home')}
            >
              <img 
                src="https://i.ibb.co/L9Y0YpZ/freedom-logo.png" 
                alt="Freedom TV Kannada" 
                className="h-16 md:h-24 w-auto object-contain hover:scale-105 transition-transform drop-shadow-2xl"
                loading="eager"
              />
            </div>
            
            <div className="hidden lg:flex space-x-2 ml-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === item.id 
                      ? 'bg-red-900 text-white shadow-inner scale-95' 
                      : item.highlight ? 'bg-yellow-500 text-red-900 hover:bg-yellow-400' : 'hover:bg-red-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar Desktop */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex relative">
              <input
                type="text"
                placeholder="ಸುದ್ದಿ ಹುಡುಕಿ..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="bg-red-800 text-white placeholder-red-300 text-sm rounded-full py-2 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-48 lg:w-64 transition-all"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-red-300 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </form>

            {userRole ? (
              <button 
                onClick={() => onNavigate('admin')}
                className="bg-black text-white hover:bg-gray-800 text-[10px] px-3 py-1.5 rounded-lg uppercase tracking-widest font-black hidden sm:block border border-gray-700"
              >
                Admin
              </button>
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 rounded-full font-bold hidden sm:block transition-all"
              >
                Login
              </button>
            )}
            
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-red-600 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-red-800 pb-6 px-4 space-y-2 animate-fade-in shadow-2xl">
          <form onSubmit={handleSearchSubmit} className="py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="ಸುದ್ದಿ ಹುಡುಕಿ..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-red-900 text-white placeholder-red-400 text-sm rounded-xl py-3 px-5 pr-12 outline-none"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </form>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-5 py-4 text-base font-bold rounded-xl transition-colors ${
                item.highlight ? 'bg-yellow-500 text-red-900' : 'hover:bg-red-700'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => { onNavigate(userRole ? 'admin' : 'login'); setIsOpen(false); }}
            className="block w-full text-left px-5 py-4 text-base font-black uppercase tracking-widest bg-black/20 mt-4 rounded-xl"
          >
            {userRole ? 'ADMIN DASHBOARD' : 'STAFF LOGIN'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
