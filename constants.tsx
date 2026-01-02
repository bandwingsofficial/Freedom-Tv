
import React from 'react';
import { NewsItem, UserRole, User } from './types';

const generateMockNews = (): NewsItem[] => {
  const categories: NewsItem['category'][] = [
    'Politics', 'Karnataka', 'Bengaluru', 'Agriculture', 'Crime', 
    'Business', 'Education', 'Sports', 'Entertainment', 'Elections',
    'Health', 'Technology', 'Culture'
  ];
  
  const news: NewsItem[] = [];
  
  categories.forEach((cat, idx) => {
    // Add 3-4 items per category
    for(let i = 1; i <= 4; i++) {
      news.push({
        id: `${cat}-${i}`,
        title: `${cat} News Title ${i}`,
        kannadaTitle: `${cat} ವಿಭಾಗದ ಪ್ರಮುಖ ಸುದ್ದಿ ${i}`,
        summary: `This is a summary for the ${cat} news item number ${i}. It covers the latest developments in this sector.`,
        content: `ಪೂರ್ಣ ಮಾಹಿತಿ: ${cat} ಕ್ಷೇತ್ರದಲ್ಲಿ ಇತ್ತೀಚೆಗೆ ಮಹತ್ವದ ಬದಲಾವಣೆಗಳು ಸಂಭವಿಸಿವೆ. ಈ ಕುರಿತು ಹೆಚ್ಚಿನ ವಿವರಗಳು ಇಲ್ಲಿವೆ...`,
        category: cat,
        author: i % 2 === 0 ? 'Reporter A' : 'Reporter B',
        publishedAt: new Date(Date.now() - (idx * 3600000) - (i * 1800000)).toISOString(),
        imageUrl: `https://picsum.photos/seed/${cat}${i}/800/450`,
        isBreaking: i === 1 && idx === 0,
        views: Math.floor(Math.random() * 20000)
      });
    }
  });
  
  return news;
};

export const DUMMY_NEWS: NewsItem[] = generateMockNews();

export const MOCK_USERS: User[] = [
  { id: '1', email: 'admin@freedomtv.in', name: 'Super Admin', role: UserRole.ADMIN },
  { id: '2', email: 'editor@freedomtv.in', name: 'Lead Editor', role: UserRole.EDITOR },
  { id: '3', email: 'reporter@freedomtv.in', name: 'Field Reporter', role: UserRole.REPORTER },
  { id: '4', email: 'ads@freedomtv.in', name: 'Ad Manager', role: UserRole.AD_MANAGER },
];
