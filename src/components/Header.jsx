import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, Mail, Lock, CheckCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logoImg from '../assets/logo12-removebg-preview_preview_rev_1.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReservationsDrawerOpen, setIsReservationsDrawerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isAdminRedirect, setIsAdminRedirect] = useState(false);
  const [isAdminAuthed, setIsAdminAuthed] = useState(() => sessionStorage.getItem('ccf_admin_auth') === 'true');

  const { getCartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        // Calculate based on the Hero section's height:
        // When hero bottom reaches header (~80px), the next section ("DEBUTS 7/30 • SIGNATURE PIZZA") is showing
        const heroRect = heroSection.getBoundingClientRect();
        if (heroRect.bottom <= 80) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } else {
        // On pages without hero section, default to white header for legibility
        const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
        setIsScrolled(!isHomePage || window.scrollY > 20);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('popstate', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('popstate', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isReservationsDrawerOpen || isLoginModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isReservationsDrawerOpen, isLoginModalOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const openReservationsDrawer = () => { setIsReservationsDrawerOpen(true); setIsMobileMenuOpen(false); };
  const closeReservationsDrawer = () => setIsReservationsDrawerOpen(false);

  const openLoginModal = (e) => {
    if (e) e.preventDefault();
    setIsLoginModalOpen(true);
    setIsMobileMenuOpen(false);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginSuccess(false);
    setIsAdminRedirect(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Check if user entered admin credentials or keyword
    if (loginEmail.toLowerCase().includes('admin') || loginPassword.toLowerCase().includes('admin')) {
      sessionStorage.setItem('ccf_admin_auth', 'true');
      setIsAdminAuthed(true);
      setLoginSuccess(true);
      setIsAdminRedirect(true);
      setTimeout(() => {
        closeLoginModal();
        navigateTo(null, '/admin');
      }, 1200);
      return;
    }

    setLoginSuccess(true);
    setIsLoggedIn(true);
    setTimeout(() => {
      closeLoginModal();
    }, 1500);
  };

  const navigateTo = (e, path) => {
    if (e) e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'BROWSE MENU', path: '/BrowseMenu' },
    { name: 'LOCATIONS', path: '/locations' },
    { name: 'loyalty cards', path: '/loyalty-cards' },
    { name: 'CAREERS', path: '/careers' },
    { name: 'RESERVATIONS', path: '/reservations' },
    { name: 'Partys & Evetes', path: '/rewards' }
  ];

  const cartCount = getCartCount();

  return (
    <>
      <header
        className={`fixed w-full z-40 transition-all duration-300 border-b ${isScrolled
          ? 'shadow-lg py-1 border-black/10'
          : 'shadow-sm py-2 border-white/15'
          }`}
        style={{
          backgroundColor: isScrolled
            ? 'rgba(255, 255, 255, 0.96)'
            : 'rgba(0, 0, 0, 0.25)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'blur(8px)',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'blur(8px)',
          borderBottom: isScrolled
            ? '1px solid rgba(0, 0, 0, 0.08)'
            : '1px solid rgba(255, 255, 255, 0.15)'
        }}
      >
        <div className="max-w-[1440px] mx-auto  flex items-center justify-between w-full">

          {/* Mobile Menu Toggle Button */}
          <button
            className={`lg:hidden transition-colors p-2 ${isScrolled ? 'text-[var(--theme-primary)] hover:opacity-80' : 'text-white hover:text-amber-300'
              }`}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>

          {/* Logo - Increased Size */}
          <div className="flex-shrink-0 cursor-pointer flex items-center py-1" onClick={(e) => navigateTo(e, '/')}>
            <img
              src={logoImg}
              alt="Italian Pizza Kawkab Logo"
              className="h-16 sm:h-20 md:h-28 lg:h-32 w-auto object-contain transition-transform duration-200 hover:scale-105 drop-shadow-md"
            />
          </div>

          {/* Desktop Navigation Links - Professional Adaptive RGBA Colors */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-sans text-[13px] xl:text-[15px] font-extrabold tracking-[0.13em] uppercase">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.path}
                onClick={(e) => link.onClick ? (e.preventDefault(), link.onClick()) : navigateTo(e, link.path)}
                className={`transition-colors duration-200 relative group  ${isScrolled
                  ? 'text-[var(--theme-primary)] hover:text-[var(--theme-accent)]'
                  : 'text-white hover:text-amber-300 drop-shadow-sm'
                  }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-[var(--theme-accent)]' : 'bg-amber-400'
                  }`}></span>
              </a>
            ))}
          </nav>

          {/* Right Section: Admin portal, User Login, Bag, Order Now Button - Increased Sizes */}
          <div className="flex items-center space-x-4 md:space-x-6">

            {/* Quick Admin Dashboard Link */}
            {isAdminAuthed && (
              <button
                onClick={(e) => navigateTo(e, '/admin')}
                className={`hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-extrabold tracking-wider uppercase transition-all shadow-sm ${isScrolled
                  ? 'bg-[#fdfaf5] hover:bg-[#faebd7] text-[#3a1e26] border border-[#3a1e26]/20'
                  : 'bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md'
                  }`}
                title="Access Admin Dashboard Portal"
              >
                <ShieldCheck size={18} className={isScrolled ? 'text-[#3a1e26]' : 'text-amber-300'} />
                <span>Admin Portal</span>
              </button>
            )}

            {/* User / LOGIN Button - Increased Size */}
            <button
              onClick={openLoginModal}
              className={`flex items-center gap-2 transition-colors font-sans text-xs md:text-sm font-extrabold tracking-wider uppercase group py-1 ${isScrolled
                ? 'text-[var(--theme-primary)] hover:text-[var(--theme-accent)]'
                : 'text-white hover:text-amber-300 drop-shadow-sm'
                }`}
              title="Member & Admin Login"
            >
              <User
                size={24}
                strokeWidth={2}
                className={`transition-colors ${isScrolled
                  ? 'text-[var(--theme-primary)] group-hover:text-[var(--theme-accent)]'
                  : 'text-white group-hover:text-amber-300'
                  }`}
              />
              <span className="hidden sm:inline">{isLoggedIn ? "MY ACCOUNT" : "LOGIN"}</span>
            </button>

            {/* Shopping Bag / Cart - Increased Size */}
            <button
              onClick={(e) => navigateTo(e, '/order')}
              className={`transition-colors relative p-1.5 ${isScrolled
                ? 'text-[var(--theme-primary)] hover:text-[var(--theme-accent)]'
                : 'text-white hover:text-amber-300 drop-shadow-sm'
                }`}
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={24} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--theme-accent)] text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* ORDER NOW Button - Increased Size */}
            <button
              onClick={(e) => navigateTo(e, '/order')}
              className="bg-[var(--theme-accent)] hover:opacity-95 hover:shadow-xl text-white px-6 md:px-8 py-3 md:py-3.5 text-xs md:text-sm font-black tracking-[0.18em] uppercase transition-all shadow-md rounded-xl transform hover:scale-105 active:scale-95"
            >
              ORDER NOW
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[78px] sm:top-[88px] z-40 flex flex-col p-6 overflow-y-auto animate-smooth-reveal border-t border-gray-100"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          <nav className="flex flex-col space-y-4 font-sans text-sm font-bold tracking-widest uppercase text-[var(--theme-primary)]">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.path}
                onClick={(e) => link.onClick ? (e.preventDefault(), link.onClick()) : navigateTo(e, link.path)}
                className="hover:text-[var(--theme-accent)] transition-colors py-2.5 border-b border-gray-100"
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Admin Link */}
            {isAdminAuthed && (
              <button
                onClick={(e) => { setIsMobileMenuOpen(false); navigateTo(e, '/admin'); }}
                className="flex items-center justify-center gap-2 bg-[#3a1e26] text-white py-3.5 font-bold tracking-[0.2em] uppercase mt-4 hover:bg-[#4a2e36] transition-colors text-center w-full rounded-sm shadow-md"
              >
                <ShieldCheck size={18} />
                <span>👑 ADMIN DASHBOARD PORTAL</span>
              </button>
            )}

            <button
              onClick={openLoginModal}
              className="flex items-center justify-center gap-2 border-2 border-[var(--theme-primary)] text-[var(--theme-primary)] py-3.5 font-bold tracking-[0.2em] uppercase mt-2 hover:bg-[var(--theme-primary)] hover:text-white transition-colors text-center w-full"
            >
              <User size={18} />
              {isLoggedIn ? "MY ACCOUNT" : "MEMBER & ADMIN LOGIN"}
            </button>

            <button
              onClick={(e) => navigateTo(e, '/order')}
              className="bg-[var(--theme-accent)] text-white py-4 font-bold tracking-[0.2em] uppercase mt-2 hover:opacity-90 transition-colors shadow-md text-center w-full"
            >
              ORDER NOW
            </button>
          </nav>
        </div>
      )}

      {/* LOGIN Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-up">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeLoginModal}></div>

          <div className="bg-white max-w-md w-full m-4 relative z-10 shadow-2xl overflow-hidden rounded-2xl border border-gray-100">
            <button onClick={closeLoginModal} className="absolute top-4 right-4 text-gray-400 hover:text-[var(--theme-accent)] transition-colors z-20">
              <X size={24} />
            </button>

            <div className="bg-[var(--theme-primary)] p-6 md:p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
              <div className="inline-block bg-white px-4 py-1.5 rounded-md shadow-md mb-2">
                <img
                  src={logoImg}
                  alt="Italian Pizza Kawkab Logo"
                  className="h-10 w-auto object-contain mx-auto"
                />
              </div>
              <p className="text-white/90 font-sans text-xs uppercase tracking-[0.2em] font-semibold">Member &amp; Admin Login Portal</p>
            </div>

            <div className="p-6 md:p-8">
              {loginSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle className="mx-auto text-[var(--theme-accent)]" size={56} strokeWidth={1.5} />
                  <h3 className="font-serif text-2xl font-bold text-[var(--theme-primary)]">
                    {isAdminRedirect ? "Admin Portal Authenticated!" : "Welcome Back!"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isAdminRedirect ? "Redirecting to your Admin Dashboard..." : "You are now logged in to Italian pizza kawkabRewards®."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleLoginSubmit} className="space-y-5">

                  <div className="flex items-center gap-3 my-2">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">OR MEMBER LOGIN</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-2 uppercase tracking-wide">Email or Username</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="your.email@example.com or admin"
                        className="w-full border border-gray-300 p-3 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] text-gray-700 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wide">Password</label>
                      <a href="#" className="text-[11px] text-[var(--theme-accent)] hover:underline font-semibold">Forgot Password?</a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full border border-gray-300 p-3 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] text-gray-700 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[var(--theme-accent)] hover:opacity-90 text-white py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs transition-colors shadow-lg mt-2 flex items-center justify-center"
                  >
                    SIGN IN
                  </button>

                  <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 font-medium mb-1">Tip: typing &ldquo;admin&rdquo; logs you into dashboard</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reservations Modal/Drawer */}
      {isReservationsDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-up">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeReservationsDrawer}></div>

          <div className="bg-white max-w-lg w-full m-4 relative z-10 shadow-2xl overflow-hidden rounded-xl border border-gray-100">
            <button onClick={closeReservationsDrawer} className="absolute top-4 right-4 text-gray-400 hover:text-[var(--theme-accent)] transition-colors z-20">
              <X size={24} />
            </button>

            <div className="bg-[var(--theme-primary)] p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
              <div className="inline-block bg-white px-4 py-1.5 rounded-md shadow-md mb-2">
                <img
                  src={logoImg}
                  alt="Italian Pizza Kawkab Logo"
                  className="h-10 w-auto object-contain mx-auto"
                />
              </div>
              <p className="text-white font-sans text-sm uppercase tracking-widest font-semibold">Reserve Your Table</p>
            </div>

            <div className="p-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#1F2937] mb-2 uppercase tracking-wide">Date</label>
                  <input type="date" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] text-gray-700" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-2 uppercase tracking-wide">Time</label>
                    <select className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] text-gray-700 bg-white">
                      <option>17:00</option>
                      <option>18:00</option>
                      <option>19:00</option>
                      <option>20:00</option>
                      <option>21:00</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-2 uppercase tracking-wide">Guests</label>
                    <select className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] text-gray-700 bg-white">
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>5+ Guests</option>
                    </select>
                  </div>
                </div>
                <button onClick={closeReservationsDrawer} className="w-full bg-[var(--theme-accent)] hover:opacity-90 text-white py-4 rounded-md font-bold tracking-widest uppercase transition-colors shadow-lg mt-4 flex items-center justify-center">
                  Confirm Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
