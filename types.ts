
export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  REPORTER = 'REPORTER',
  VIDEO_TEAM = 'VIDEO_TEAM',
  AD_MANAGER = 'AD_MANAGER',
  VIEWER = 'VIEWER'
}

export type Permission = 
  | 'VIEW_DASHBOARD'
  | 'MANAGE_CONTENT'
  | 'MANAGE_USERS'
  | 'MANAGE_ROLES'
  | 'MANAGE_ADS'
  | 'VIEW_ANALYTICS';

export interface CustomRole {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  customRoleId?: string; // For dynamic roles created by admin
}

export type NewsCategory = 
  | 'Karnataka' 
  | 'Bengaluru' 
  | 'Politics' 
  | 'Crime' 
  | 'Business' 
  | 'Agriculture' 
  | 'Education' 
  | 'Sports' 
  | 'Entertainment'
  | 'Elections'
  | 'Health'
  | 'Technology'
  | 'Culture';

export interface NewsItem {
  id: string;
  title: string;
  kannadaTitle: string;
  summary: string;
  content: string;
  category: NewsCategory;
  author: string;
  publishedAt: string;
  imageUrl: string;
  isBreaking: boolean;
  views: number;
}

export interface AdSlot {
  id: string;
  name: string;
  position: 'TOP_BANNER' | 'SIDEBAR' | 'IN_FEED' | 'VIDEO_OVERLAY';
  active: boolean;
  provider: 'ADSENSE' | 'DIRECT' | 'SPONSORED';
}
