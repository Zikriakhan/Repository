import React, { useState } from 'react';
import { ShieldCheck, Lock, User, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      // Accept standard admin credentials or demo shortcuts
      if (
        username.toLowerCase() === 'admin' ||
        username.toLowerCase() === 'manager' ||
        password === 'admin123' ||
        password === 'admin'
      ) {
        sessionStorage.setItem('ccf_admin_auth', 'true');
        onLogin();
      } else {
        setError('Invalid credentials. Hint: use username "admin" and password "admin123".');
      }
      setLoading(false);
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem('ccf_admin_auth', 'true');
      onLogin();
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 font-sans relative overflow-hidden bg-[#3a1e26]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* Elegant Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Ambient Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3a1e26]/90 via-[#3a1e26]/80 to-black/90 z-0 pointer-events-none"></div>

      <div className="bg-white/95 backdrop-blur-xl border border-[#92141f]/20 rounded-sm p-8 sm:p-12 w-full max-w-md shadow-2xl relative z-10 text-gray-800 animate-fade-up">

        {/* Brand Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white px-6 py-3 rounded-sm shadow-lg border border-gray-100 mb-6 transform hover:scale-105 transition-transform">
            <img
              src="/logo.png"
              alt="The Cheesecake Factory Logo"
              className="h-12 sm:h-14 w-auto object-contain mx-auto"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#fdfaf5] text-[#3a1e26] border border-[#3a1e26]/20 px-3 py-1 rounded-sm text-[11px] font-extrabold tracking-widest uppercase mb-3 shadow-sm">
            <ShieldCheck size={14} className="text-[#92141f]" />
            <span>Secure Management Portal</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#3a1e26] tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 font-medium">
            Sign in to customize theme colors &amp; manage restaurant
          </p>
        </div>

        {/* Quick Demo Login Button (1-Click) */}
        <div className="mb-6">
          <button
            onClick={handleQuickDemoLogin}
            disabled={loading}
            className="w-full bg-[#3a1e26] hover:bg-[#4a2e36] text-[#ffd700] p-4 rounded-sm font-bold text-xs tracking-[0.15em] uppercase shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95 border border-[#ffd700]/30"
          >
            <Sparkles size={16} />
            <span>⚡ One-Click Demo Admin Sign In</span>
          </button>
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">OR SIGN IN WITH CREDENTIALS</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#3a1e26] uppercase tracking-[0.1em] mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-[#fdfaf5] border border-gray-200 rounded-sm text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#3a1e26] focus:border-[#3a1e26] transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3a1e26] uppercase tracking-[0.1em] mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-[#fdfaf5] border border-gray-200 rounded-sm text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#3a1e26] focus:border-[#3a1e26] transition-all font-medium"
              />
            </div>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-sm font-semibold text-center animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#92141f] hover:bg-[#92141f] text-white p-4 rounded-sm font-bold text-xs tracking-[0.15em] uppercase shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95 mt-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In To Portal'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Footer Hint */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <CheckCircle2 size={14} className="text-[#3a1e26]" />
            <span>Default Credentials: <strong className="text-gray-800">admin / admin123</strong></span>
          </div>
          <div className="mt-4">
            <a href="/" className="text-xs font-bold text-[#92141f] hover:text-[#92141f] hover:underline tracking-[0.1em] uppercase transition-colors">
              ← Return to Main Website
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
