
import React, { useState } from 'react';
import { UserRole, User, NewsItem, NewsCategory, CustomRole, Permission, AdSlot } from '../../types';
import { DUMMY_NEWS, MOCK_USERS } from '../../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'users' | 'roles' | 'ads'>('overview');
  
  // Data State
  const [articles, setArticles] = useState<NewsItem[]>(DUMMY_NEWS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [roles, setRoles] = useState<CustomRole[]>([
    { id: '1', name: 'Admin', permissions: ['VIEW_DASHBOARD', 'MANAGE_CONTENT', 'MANAGE_USERS', 'MANAGE_ROLES', 'MANAGE_ADS', 'VIEW_ANALYTICS'] },
    { id: '2', name: 'Editor', permissions: ['VIEW_DASHBOARD', 'MANAGE_CONTENT', 'VIEW_ANALYTICS'] },
    { id: '3', name: 'Reporter', permissions: ['VIEW_DASHBOARD', 'MANAGE_CONTENT'] },
    { id: '4', name: 'Ad Manager', permissions: ['VIEW_DASHBOARD', 'MANAGE_ADS', 'VIEW_ANALYTICS'] },
  ]);

  // Ad Slots State
  const [adSlots, setAdSlots] = useState<AdSlot[]>([
    { id: 'ad-1', name: 'Homepage Top Leaderboard', position: 'TOP_BANNER', active: true, provider: 'ADSENSE' },
    { id: 'ad-2', name: 'Sidebar Sticky Square', position: 'SIDEBAR', active: true, provider: 'DIRECT' },
    { id: 'ad-3', name: 'Article Body Native', position: 'IN_FEED', active: false, provider: 'SPONSORED' },
    { id: 'ad-4', name: 'Live TV Pre-roll', position: 'VIDEO_OVERLAY', active: true, provider: 'DIRECT' },
  ]);

  // Form States
  const [editingArticle, setEditingArticle] = useState<NewsItem | null>(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddingAd, setIsAddingAd] = useState(false);
  const [editingAd, setEditingAd] = useState<AdSlot | null>(null);

  // Permission Check Helper
  const hasPermission = (permission: Permission) => {
    if (user.role === UserRole.ADMIN) return true;
    
    const normalizedUserRole = user.role.toString().replace(/_/g, ' ').toUpperCase();
    const userRoleObj = roles.find(r => 
      r.id === user.customRoleId || 
      r.name.toUpperCase() === normalizedUserRole
    );

    return userRoleObj?.permissions.includes(permission) ?? false;
  };

  const stats = [
    { name: 'Jan', traffic: 4000, revenue: 2400 },
    { name: 'Feb', traffic: 3000, revenue: 1398 },
    { name: 'Mar', traffic: 2000, revenue: 9800 },
    { name: 'Apr', traffic: 2780, revenue: 3908 },
    { name: 'May', traffic: 1890, revenue: 4800 },
    { name: 'Jun', traffic: 2390, revenue: 3800 },
  ];

  // News CRUD Handlers
  const handleSaveArticle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = editingArticle?.id || Math.random().toString(36).substr(2, 9);
    
    const newArticle: NewsItem = {
      id,
      title: formData.get('title') as string,
      kannadaTitle: formData.get('kannadaTitle') as string,
      summary: formData.get('summary') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as NewsCategory,
      author: editingArticle?.author || user.name,
      publishedAt: editingArticle?.publishedAt || new Date().toISOString(),
      imageUrl: (formData.get('imageUrl') as string) || `https://picsum.photos/seed/${id}/800/450`,
      isBreaking: formData.get('isBreaking') === 'on',
      views: editingArticle?.views || 0,
    };

    if (editingArticle) {
      setArticles(articles.map(a => a.id === editingArticle.id ? newArticle : a));
    } else {
      setArticles([newArticle, ...articles]);
    }
    setEditingArticle(null);
    setIsAddingArticle(false);
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  // Role Creation Handler
  const handleCreateRole = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedPermissions: Permission[] = [];
    if (formData.get('p_content')) selectedPermissions.push('MANAGE_CONTENT');
    if (formData.get('p_users')) selectedPermissions.push('MANAGE_USERS');
    if (formData.get('p_roles')) selectedPermissions.push('MANAGE_ROLES');
    if (formData.get('p_ads')) selectedPermissions.push('MANAGE_ADS');
    if (formData.get('p_analytics')) selectedPermissions.push('VIEW_ANALYTICS');

    const newRole: CustomRole = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.get('roleName') as string,
      permissions: ['VIEW_DASHBOARD', ...selectedPermissions],
    };

    setRoles([...roles, newRole]);
    setIsAddingRole(false);
  };

  // User Role Edit Handler
  const handleUpdateUserRole = (userId: string, newRoleId: string) => {
    const selectedRole = roles.find(r => r.id === newRoleId);
    if (!selectedRole) return;
    
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { 
          ...u, 
          customRoleId: selectedRole.id,
          role: (Object.values(UserRole).includes(selectedRole.name.toUpperCase().replace(/\s+/g, '_') as UserRole)) 
            ? selectedRole.name.toUpperCase().replace(/\s+/g, '_') as UserRole 
            : u.role
        };
      }
      return u;
    }));
    setEditingUser(null);
  };

  // Ad Management Handlers
  const handleSaveAdSlot = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = editingAd?.id || `ad-${Math.random().toString(36).substr(2, 9)}`;
    
    const newAd: AdSlot = {
      id,
      name: formData.get('name') as string,
      position: formData.get('position') as any,
      active: formData.get('active') === 'on',
      provider: formData.get('provider') as any,
    };

    if (editingAd) {
      setAdSlots(adSlots.map(a => a.id === editingAd.id ? newAd : a));
    } else {
      setAdSlots([...adSlots, newAd]);
    }
    setEditingAd(null);
    setIsAddingAd(false);
  };

  const toggleAdActive = (id: string) => {
    setAdSlots(adSlots.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const handleDeleteAdSlot = (id: string) => {
    if (window.confirm('Delete this ad inventory slot?')) {
      setAdSlots(adSlots.filter(a => a.id !== id));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        if (!hasPermission('VIEW_ANALYTICS')) return <div className="p-8 text-center text-gray-500">Access Restricted: Missing VIEW_ANALYTICS permission.</div>;
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Live Traffic', val: 'Active', change: 'High', color: 'red' },
                { label: 'Published News', val: articles.length, change: '+5 today', color: 'green' },
                { label: 'Estimated Revenue', val: '₹45k', change: '+12%', color: 'purple' },
                { label: 'Active Staff', val: users.length, change: 'Online', color: 'blue' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                  <div className="flex items-end justify-between mt-2">
                    <h4 className="text-2xl font-bold text-gray-800">{stat.val}</h4>
                    <span className="text-[10px] font-black text-green-500 uppercase">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-8">Traffic Analytics</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                      <Tooltip cursor={{fill: '#fef2f2'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                      <Bar dataKey="traffic" fill="#b91c1c" radius={[6, 6, 0, 0]} barSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-8">CPM & Revenue</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                      <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                      <Line type="monotone" dataKey="revenue" stroke="#b91c1c" strokeWidth={4} dot={{r: 4, fill: '#b91c1c', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );
      case 'content':
        if (!hasPermission('MANAGE_CONTENT')) return <div className="p-8 text-center text-gray-500">Access Restricted: Missing MANAGE_CONTENT permission.</div>;
        return (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 animate-fade-in overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <div>
                <h3 className="font-black text-lg tracking-tight text-gray-900">Article CMS</h3>
                <p className="text-xs text-gray-400 font-medium">Manage news feed, categories, and breaking updates.</p>
              </div>
              {!isAddingArticle && !editingArticle && (
                <button 
                  onClick={() => setIsAddingArticle(true)}
                  className="bg-red-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center hover:bg-red-700 transition-all shadow-lg active:scale-95"
                >
                  + Post News
                </button>
              )}
            </div>

            {(isAddingArticle || editingArticle) ? (
              <form onSubmit={handleSaveArticle} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Title (English)</label>
                    <input name="title" defaultValue={editingArticle?.title} required className="w-full border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-100 border text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Title (Kannada)</label>
                    <input name="kannadaTitle" defaultValue={editingArticle?.kannadaTitle} required className="w-full border-gray-200 bg-gray-50 rounded-xl p-3 kannada-font outline-none focus:ring-2 focus:ring-red-100 border text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Short Summary</label>
                  <textarea name="summary" defaultValue={editingArticle?.summary} className="w-full border-gray-200 bg-gray-50 rounded-xl p-3 h-20 outline-none focus:ring-2 focus:ring-red-100 border text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Detailed News Body</label>
                  <textarea name="content" defaultValue={editingArticle?.content} className="w-full border-gray-200 bg-gray-50 rounded-xl p-3 h-48 outline-none focus:ring-2 focus:ring-red-100 border text-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
                    <select name="category" defaultValue={editingArticle?.category} className="w-full border-gray-200 bg-gray-50 rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-100 border text-sm font-bold">
                      {['Karnataka', 'Bengaluru', 'Politics', 'Crime', 'Business', 'Agriculture', 'Education', 'Sports', 'Entertainment', 'Elections', 'Health', 'Technology', 'Culture'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Thumbnail URL</label>
                    <input name="imageUrl" defaultValue={editingArticle?.imageUrl} placeholder="https://..." className="w-full border-gray-200 bg-gray-50 rounded-xl p-3 border text-sm" />
                  </div>
                  <div className="flex items-center pt-8">
                    <input type="checkbox" name="isBreaking" id="isBreaking" defaultChecked={editingArticle?.isBreaking} className="mr-3 h-5 w-5 accent-red-600 rounded" />
                    <label htmlFor="isBreaking" className="text-xs font-black uppercase tracking-widest text-gray-600">Flash News</label>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 pt-8 border-t border-gray-50">
                  <button type="button" onClick={() => { setIsAddingArticle(false); setEditingArticle(null); }} className="px-6 py-3 text-xs font-black uppercase text-gray-400 hover:text-gray-600 transition-colors">Dismiss</button>
                  <button type="submit" className="bg-red-600 text-white px-10 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-red-700 transition-all">Publish</button>
                </div>
              </form>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">
                    <tr>
                      <th className="px-8 py-5">Article Identity</th>
                      <th className="px-8 py-5">Beat/Category</th>
                      <th className="px-8 py-5">Engagement</th>
                      <th className="px-8 py-5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {articles.map(article => (
                      <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center space-x-4">
                            <img src={article.imageUrl} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                               <p className="text-sm font-bold text-gray-900 kannada-font line-clamp-1">{article.kannadaTitle}</p>
                               <p className="text-[10px] text-gray-400 font-bold uppercase">{article.author} • {new Date(article.publishedAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter ${article.isBreaking ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                            {article.category} {article.isBreaking && '• FLASH'}
                          </span>
                        </td>
                        <td className="px-8 py-5 font-mono text-xs font-bold text-gray-500">{article.views.toLocaleString()}</td>
                        <td className="px-8 py-5">
                          <div className="flex space-x-4">
                            <button onClick={() => setEditingArticle(article)} className="text-xs font-black text-blue-600 hover:underline uppercase tracking-widest">Update</button>
                            <button onClick={() => handleDeleteArticle(article.id)} className="text-xs font-black text-red-600 hover:underline uppercase tracking-widest">Retract</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case 'users':
        if (!hasPermission('MANAGE_USERS')) return <div className="p-8 text-center text-gray-500">Access Restricted: Missing MANAGE_USERS permission.</div>;
        return (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 animate-fade-in overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <h3 className="font-black text-lg tracking-tight text-gray-900">Newsroom Staff</h3>
                <p className="text-xs text-gray-400 font-medium">Control access levels for journalists and staff.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">
                  <tr>
                    <th className="px-8 py-5">Personnel</th>
                    <th className="px-8 py-5">Access Level</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50/50">
                      <td className="px-8 py-5">
                        <div>
                          <p className="text-sm font-bold text-gray-800">{u.name}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{u.email}</p>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        {editingUser?.id === u.id ? (
                          <select 
                            onChange={(e) => handleUpdateUserRole(u.id, e.target.value)}
                            className="text-xs font-bold bg-white border border-gray-200 rounded-lg p-1 outline-none"
                            defaultValue={u.customRoleId || roles.find(r => r.name.toUpperCase().replace(/\s+/g, '_') === u.role.toString())?.id}
                          >
                            {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                          </select>
                        ) : (
                          <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-red-100">
                            {roles.find(r => r.id === u.customRoleId)?.name || u.role.replace(/_/g, ' ')}
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center text-[10px] font-bold text-green-500">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span> Verified
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        {editingUser?.id === u.id ? (
                           <button onClick={() => setEditingUser(null)} className="text-[10px] font-black text-gray-400 uppercase">Cancel</button>
                        ) : (
                           <button onClick={() => setEditingUser(u)} className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">Change Role</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'roles':
        if (!hasPermission('MANAGE_ROLES')) return <div className="p-8 text-center text-gray-500">Access Restricted: Missing MANAGE_ROLES permission.</div>;
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <h3 className="font-black text-lg tracking-tight text-gray-900">Permissions Matrix</h3>
                {!isAddingRole && (
                  <button 
                    onClick={() => setIsAddingRole(true)}
                    className="bg-black text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                  >
                    + Define New Role
                  </button>
                )}
              </div>

              {isAddingRole && (
                <form onSubmit={handleCreateRole} className="p-8 bg-red-50/30 border-b border-red-50">
                  <div className="max-w-2xl">
                    <h4 className="font-black text-xs uppercase tracking-widest text-red-700 mb-6">New Role Profile</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Role Name</label>
                        <input name="roleName" required className="w-full border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500 border text-sm" placeholder="e.g. Video Team" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Permissions</label>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { id: 'p_content', label: 'Article Operations' },
                            { id: 'p_users', label: 'User Management' },
                            { id: 'p_roles', label: 'Role Management' },
                            { id: 'p_ads', label: 'Ad Operations' },
                            { id: 'p_analytics', label: 'Analytics Access' },
                          ].map(p => (
                            <div key={p.id} className="flex items-center p-3 bg-white rounded-xl border border-gray-100">
                              <input type="checkbox" name={p.id} id={p.id} className="mr-3 h-4 w-4 accent-red-600 rounded" />
                              <label htmlFor={p.id} className="text-xs font-bold text-gray-600">{p.label}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-end space-x-4">
                      <button type="button" onClick={() => setIsAddingRole(false)} className="px-6 py-3 text-xs font-black uppercase text-gray-400">Cancel</button>
                      <button type="submit" className="bg-red-600 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg">Save Role</button>
                    </div>
                  </div>
                </form>
              )}

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map(r => (
                  <div key={r.id} className="p-6 border border-gray-100 rounded-3xl hover:shadow-xl transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="font-black text-lg text-gray-800">{r.name}</h4>
                      <span className="text-[8px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-400 font-black uppercase">Active</span>
                    </div>
                    <div className="space-y-2">
                      {r.permissions.map(p => (
                        <div key={p} className="text-[10px] font-bold text-gray-500 flex items-center">
                          <span className="text-red-500 mr-2 text-xs">●</span> {p.replace(/_/g, ' ')}
                        </div>
                      ))}
                    </div>
                    <button className="mt-8 w-full py-3 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:bg-red-600 group-hover:text-white transition-all">Config</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'ads':
        if (!hasPermission('MANAGE_ADS')) return <div className="p-8 text-center text-gray-500">Access Restricted: Missing MANAGE_ADS permission.</div>;
        return (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 animate-fade-in overflow-hidden">
             <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <div>
                  <h3 className="font-black text-lg text-gray-900">Ad Inventory CMS</h3>
                  <p className="text-xs text-gray-400 font-medium">Control ad placements, formats, and providers.</p>
                </div>
                {!isAddingAd && !editingAd && (
                  <button 
                    onClick={() => setIsAddingAd(true)}
                    className="bg-red-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                  >
                    + Add Ad Slot
                  </button>
                )}
             </div>

             {(isAddingAd || editingAd) ? (
                <form onSubmit={handleSaveAdSlot} className="p-8 space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Slot Name</label>
                        <input name="name" defaultValue={editingAd?.name} required className="w-full border-gray-200 bg-gray-50 rounded-xl p-3 border text-sm" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Placement Position</label>
                        <select name="position" defaultValue={editingAd?.position} className="w-full border-gray-200 bg-gray-50 rounded-xl p-3 border text-sm">
                           <option value="TOP_BANNER">Top Header Banner</option>
                           <option value="SIDEBAR">Sidebar Rectangle</option>
                           <option value="IN_FEED">Article In-feed</option>
                           <option value="VIDEO_OVERLAY">Live TV Overlay</option>
                        </select>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Ad Provider</label>
                        <select name="provider" defaultValue={editingAd?.provider} className="w-full border-gray-200 bg-gray-50 rounded-xl p-3 border text-sm">
                           <option value="ADSENSE">Google AdSense</option>
                           <option value="DIRECT">Direct Brand Ad</option>
                           <option value="SPONSORED">Sponsored Content</option>
                        </select>
                      </div>
                      <div className="flex items-center pt-8">
                        <input type="checkbox" name="active" id="ad_active" defaultChecked={editingAd?.active} className="mr-3 h-5 w-5 accent-red-600 rounded" />
                        <label htmlFor="ad_active" className="text-xs font-black uppercase tracking-widest text-gray-600">Active/Visible</label>
                      </div>
                   </div>
                   <div className="flex justify-end space-x-4 pt-8 border-t border-gray-50">
                      <button type="button" onClick={() => { setIsAddingAd(false); setEditingAd(null); }} className="px-6 py-3 text-xs font-black uppercase text-gray-400">Cancel</button>
                      <button type="submit" className="bg-red-600 text-white px-10 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg">Save Slot</button>
                   </div>
                </form>
             ) : (
                <div className="p-8 space-y-4">
                  {adSlots.map(slot => (
                    <div key={slot.id} className={`flex items-center justify-between p-6 bg-white border rounded-3xl transition-all hover:shadow-xl ${slot.active ? 'border-gray-50' : 'border-gray-200 bg-gray-50 opacity-70'}`}>
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-6 text-xl shadow-inner ${slot.active ? 'bg-red-50 text-red-600' : 'bg-gray-200 text-gray-400'}`}>
                            {slot.provider === 'ADSENSE' ? '🎯' : slot.provider === 'DIRECT' ? '🏷️' : '🗞️'}
                          </div>
                          <div>
                            <p className="text-sm font-black text-gray-800 flex items-center">
                              {slot.name}
                              {!slot.active && <span className="ml-3 text-[8px] bg-gray-200 px-1.5 py-0.5 rounded uppercase font-black tracking-widest">Paused</span>}
                            </p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                              {slot.position.replace('_', ' ')} • {slot.provider}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <button 
                            onClick={() => toggleAdActive(slot.id)} 
                            className={`text-[10px] font-black uppercase tracking-widest ${slot.active ? 'text-orange-500' : 'text-green-500'}`}
                          >
                            {slot.active ? 'Disable' : 'Activate'}
                          </button>
                          <button 
                            onClick={() => setEditingAd(slot)} 
                            className="text-[10px] font-black uppercase tracking-widest text-blue-600"
                          >
                            Modify
                          </button>
                          <button 
                            onClick={() => handleDeleteAdSlot(slot.id)} 
                            className="text-[10px] font-black uppercase tracking-widest text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                    </div>
                  ))}
                </div>
             )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#fafafa]">
      {/* Admin Sidebar */}
      <div className="w-full lg:w-72 bg-gray-900 text-gray-300 p-8 flex flex-col h-screen sticky top-0 overflow-hidden">
        <div className="pb-8 mb-8 border-b border-gray-800 shrink-0">
          <div className="flex items-center mb-8">
            <div className="bg-red-600 w-10 h-10 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <span className="text-white font-black text-2xl">F</span>
            </div>
            <div>
              <h2 className="text-white font-black text-lg tracking-tighter">FREEDOM TV</h2>
              <p className="text-[8px] text-red-500 font-black uppercase tracking-[0.3em] mt-1">Command Center</p>
            </div>
          </div>
          <div className="bg-gray-800/40 p-5 rounded-3xl border border-gray-800/50">
             <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2">Current Session</p>
             <p className="text-sm text-white font-bold truncate mb-1">{user.name}</p>
             <div className="inline-block bg-red-600/10 px-2 py-0.5 rounded text-[8px] text-red-500 font-black uppercase">
               {user.role.replace(/_/g, ' ')}
             </div>
          </div>
        </div>
        
        <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2 mb-8">
          {[
            { id: 'overview', label: 'Intelligence', icon: '📊', permission: 'VIEW_ANALYTICS' },
            { id: 'content', label: 'CMS Hub', icon: '📰', permission: 'MANAGE_CONTENT' },
            { id: 'users', label: 'Newsroom', icon: '👥', permission: 'MANAGE_USERS' },
            { id: 'roles', label: 'Security', icon: '🛡️', permission: 'MANAGE_ROLES' },
            { id: 'ads', label: 'Ad Manager', icon: '💰', permission: 'MANAGE_ADS' },
          ].map((item) => {
            if (!hasPermission(item.permission as Permission)) return null;
            return (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full text-left px-5 py-4 rounded-2xl transition-all flex items-center text-xs font-black uppercase tracking-widest ${activeTab === item.id ? 'bg-red-600 text-white shadow-xl' : 'hover:bg-gray-800 text-gray-400'}`}
              >
                <span className="mr-4 text-xl opacity-70">{item.icon}</span> {item.label}
              </button>
            );
          })}
        </div>
        
        <div className="pt-8 border-t border-gray-800 shrink-0">
          <button 
            onClick={onLogout} 
            className="w-full text-left px-5 py-4 text-gray-500 hover:text-red-500 hover:bg-red-500/5 rounded-2xl flex items-center transition-all text-xs font-black uppercase tracking-widest"
          >
            <span className="mr-4 text-xl">🚪</span> Exit Admin
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-6 lg:p-12 overflow-y-auto h-screen">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end space-y-6 md:space-y-0">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3">
               <span>Freedom TV</span>
               <span>/</span>
               <span className="text-red-600">{activeTab}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black capitalize text-gray-900 tracking-tight">{activeTab} Interface</h1>
          </div>
          <div className="flex space-x-4 items-center">
            <div className="text-[10px] bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm font-black uppercase tracking-widest flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
              System Live
            </div>
          </div>
        </div>

        {renderContent()}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Dashboard;
