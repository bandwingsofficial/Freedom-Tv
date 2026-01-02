
import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = MOCK_USERS.find(u => u.email === email);
    if (user && password === '123') { // Simple mock auth
      onLogin(user);
    } else {
      setError('Invalid credentials. Hint: admin@freedomtv.in / 123');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Freedom TV CMS</h2>
          <p className="text-gray-500 mt-2">Sign in to manage news and content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
              placeholder="e.g. admin@freedomtv.in"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg"
          >
            Log In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-center text-gray-400 uppercase tracking-widest font-bold mb-4">Demo Credentials</p>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-gray-50 p-2 rounded">Admin: admin@freedomtv.in</div>
            <div className="bg-gray-50 p-2 rounded">Editor: editor@freedomtv.in</div>
            <div className="bg-gray-50 p-2 rounded">Reporter: reporter@freedomtv.in</div>
            <div className="bg-gray-50 p-2 rounded">Ads: ads@freedomtv.in</div>
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-2">(Password for all: 123)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
