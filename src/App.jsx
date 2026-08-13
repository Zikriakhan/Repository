import React, { useState, useEffect } from 'react';
import { useAdminData } from './context/AdminDataContext';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import MenuShowcase from './components/MenuShowcase';
import MenuItemDetail from './components/MenuItemDetail';
import Locations from './components/Locations';
import GiftCards from './components/GiftCards';
import Rewards from './components/Rewards';
import Careers from './components/Careers';
import Reservations from './components/Reservations';
import Order from './components/Order';

import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [adminAuthed, setAdminAuthed] = useState(() => sessionStorage.getItem('ccf_admin_auth') === 'true');

  const { data } = useAdminData();

  useEffect(() => {
    if (data && data.theme) {
      const { primary, accent, light } = data.theme;
      if (primary) document.documentElement.style.setProperty('--theme-primary', primary);
      if (accent) document.documentElement.style.setProperty('--theme-accent', accent);
      if (light) document.documentElement.style.setProperty('--theme-light', light);
    } else {
      // Fallback to local storage if API fails or no theme is active
      const saved = localStorage.getItem('ccf_theme_colors');
      if (saved) {
        try {
          const { primary, accent, light } = JSON.parse(saved);
          if (primary) document.documentElement.style.setProperty('--theme-primary', primary);
          if (accent) document.documentElement.style.setProperty('--theme-accent', accent);
          if (light) document.documentElement.style.setProperty('--theme-light', light);
        } catch (_e) {}
      }
    }

    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setAdminAuthed(sessionStorage.getItem('ccf_admin_auth') === 'true');
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, [data]);

  const handleLogin = () => {
    sessionStorage.setItem('ccf_admin_auth', 'true');
    setAdminAuthed(true);
    // Navigate to /admin/dashboard after login
    window.history.pushState({}, '', '/admin/dashboard');
    setCurrentPath('/admin/dashboard');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ccf_admin_auth');
    setAdminAuthed(false);
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
  };

  // --- Admin routes ---
  const isAdminRoute = currentPath === '/admin' || currentPath.startsWith('/admin/');

  if (isAdminRoute) {
    if (!adminAuthed) {
      // Show login page — do NOT redirect away
      return <AdminLogin onLogin={handleLogin} />;
    }
    // Authenticated — show the full admin dashboard
    return (
      <AdminDashboard
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
        onLogout={handleLogout}
      />
    );
  }

  // --- Public routes ---
  if (currentPath === '/BrowseMenu') {
    return (
      <div className="min-h-screen bg-[#FFFFFF] font-sans antialiased text-[#1F2937]">
        <Header />
        <MenuShowcase />
        <Footer />
      </div>
    );
  }

  if (currentPath === '/locations') {
    return (
      <div className="min-h-screen bg-[#FFFFFF] font-sans antialiased text-[#1F2937]">
        <Header />
        <Locations />
        <Footer />
      </div>
    );
  }

  if (currentPath === '/gift-cards') {
    return (
      <div className="min-h-screen bg-[#FFFFFF] font-sans antialiased text-[#1F2937]">
        <Header />
        <GiftCards />
        <Footer />
      </div>
    );
  }

  if (currentPath === '/rewards') {
    return (
      <div className="min-h-screen bg-[#FFFFFF] font-sans antialiased text-[#1F2937]">
        <Header />
        <Rewards />
        <Footer />
      </div>
    );
  }

  if (currentPath === '/careers') {
    return (
      <div className="min-h-screen bg-[#FFFFFF] font-sans antialiased text-[#1F2937]">
        <Header />
        <Careers />
        <Footer />
      </div>
    );
  }

  if (currentPath === '/reservations') {
    return (
      <div className="min-h-screen bg-[#FFFFFF] font-sans antialiased text-[#1F2937]">
        <Header />
        <Reservations />
        <Footer />
      </div>
    );
  }

  if (currentPath === '/order') {
    return (
      <div className="min-h-screen bg-[#FFFFFF] font-sans antialiased text-[#1F2937]">
        <Header />
        <Order />
        <Footer />
      </div>
    );
  }

  if (currentPath.startsWith('/menu/')) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] font-sans antialiased text-[#1F2937]">
        <Header />
        <MenuItemDetail />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans antialiased text-[#1F2937]">
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
