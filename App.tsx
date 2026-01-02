
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BreakingNewsTicker from './components/BreakingNewsTicker';
import Home from './views/Home';
import Login from './views/Login';
import Dashboard from './views/Admin/Dashboard';
import SearchResults from './views/SearchResults';
import ArticleDetail from './views/ArticleDetail';
import CategoryView from './views/CategoryView';
import LiveTV from './views/LiveTV';
import { User, UserRole, NewsItem, NewsCategory } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentPage('admin');
  };

  const handleLogout = () => {
    setCurrentPage('home');
    // Keep user logged in for session demo purposes, or clear it if full logout is needed
    // setUser(null); 
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('search');
    setSelectedArticle(null);
    setSelectedCategory(null);
  };

  const handleArticleClick = (article: NewsItem) => {
    setSelectedArticle(article);
    setCurrentPage('article');
  };

  const handleCategoryClick = (category: NewsCategory) => {
    setSelectedCategory(category);
    setCurrentPage('category');
    setSelectedArticle(null);
  };

  const navigateTo = (page: string) => {
    setSearchQuery('');
    setSelectedArticle(null);
    
    // Map specific nav IDs to NewsCategory where applicable
    const categoryMap: Record<string, NewsCategory> = {
      'karnataka': 'Karnataka',
      'bengaluru': 'Bengaluru',
      'politics': 'Politics'
    };

    if (categoryMap[page]) {
      setSelectedCategory(categoryMap[page]);
      setCurrentPage('category');
    } else {
      setSelectedCategory(null);
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onArticleClick={handleArticleClick} onCategoryClick={handleCategoryClick} onLiveClick={() => navigateTo('live')} />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'admin':
        return user ? <Dashboard user={user} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />;
      case 'search':
        return <SearchResults query={searchQuery} onArticleClick={handleArticleClick} />;
      case 'article':
        return selectedArticle ? <ArticleDetail article={selectedArticle} onArticleClick={handleArticleClick} /> : <Home onArticleClick={handleArticleClick} onCategoryClick={handleCategoryClick} />;
      case 'category':
        return selectedCategory ? <CategoryView category={selectedCategory} onArticleClick={handleArticleClick} /> : <Home onArticleClick={handleArticleClick} onCategoryClick={handleCategoryClick} />;
      case 'live':
        return <LiveTV onArticleClick={handleArticleClick} />;
      default:
        return <Home onArticleClick={handleArticleClick} onCategoryClick={handleCategoryClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== 'admin' && (
        <>
          <Navbar 
            activeTab={currentPage} 
            onNavigate={navigateTo} 
            onSearch={handleSearch} 
            userRole={user?.role} 
          />
          <BreakingNewsTicker />
        </>
      )}
      
      {renderPage()}
      
      {currentPage !== 'admin' && (
        <footer className="bg-gray-900 text-white py-16 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex flex-col items-center justify-center mb-8">
               <img 
                 src="https://i.ibb.co/L9Y0YpZ/freedom-logo.png" 
                 alt="Freedom TV Footer Logo" 
                 className="h-20 w-auto object-contain mb-4 grayscale brightness-200"
               />
               <span className="text-gray-400 font-black text-sm tracking-widest uppercase">Freedom TV Digital Media Network</span>
            </div>
            <div className="flex justify-center space-x-6 mb-8 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-red-500 transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-red-500 transition-colors">Contact Us</a>
            </div>
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-black">
              © {new Date().getFullYear()} Freedom TV. Karnataka's Most Trusted Digital News Platform.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
