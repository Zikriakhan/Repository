import React from 'react';
import { ArrowRight, Award, UtensilsCrossed, Star } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

const Hero = () => {
  const { data } = useAdminData();
  const promo = data?.promos?.find(p => p.name === 'Hero') || {};

  const navigateTo = (e, path) => {
    e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-gradient-to-br from-[var(--theme-light)] via-white to-[#f5ebd7] overflow-hidden flex items-center pt-24 pb-16 md:py-32">

      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-[var(--theme-accent)]/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--theme-primary)]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Premium Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            {/* Top Trending Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6 animate-fade-down">
              <span className="flex h-2 w-2 rounded-full bg-[var(--theme-accent)] animate-ping" />
              <span className="text-[11px] md:text-xs font-extrabold tracking-[0.2em] uppercase text-[var(--theme-primary)]">
                National Cheesecake Day Special • 7/30
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold text-[var(--theme-primary)] leading-[1.05] tracking-tight mb-6" dangerouslySetInnerHTML={{ __html: promo.title || `Any Slice, <br />
              <span className="italic font-normal text-[var(--theme-accent)] relative inline-block">
                Half Price*
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[var(--theme-accent)]/40" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 9.5C50 2.5 150 2.5 198 9.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>`}}>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-700 text-lg sm:text-xl md:text-2xl font-normal mb-8 max-w-xl leading-relaxed">
              {promo.description || <>Dine In And Get Any Slice, Half Price*! Choose From Over <strong className="font-extrabold text-[var(--theme-primary)]">30 Legendary Cheesecakes</strong> and specialty scratch-made desserts.</>}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
              <button
                onClick={(e) => navigateTo(e, '/BrowseMenu')}
                className="bg-[var(--theme-accent)] hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs md:text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group"
              >
                <span>Explore Over 30 Flavors</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={(e) => navigateTo(e, '/order')}
                className="bg-white hover:bg-gray-50 text-[var(--theme-primary)] border-2 border-[var(--theme-primary)] px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs md:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <UtensilsCrossed size={18} className="text-[var(--theme-accent)]" />
                <span>Order Online Now</span>
              </button>
            </div>

            {/* Key Feature Stats Bar */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-6 border-t border-gray-200/80 w-full max-w-lg">
              <div>
                <div className="font-serif text-2xl md:text-3xl font-extrabold text-[var(--theme-primary)]">30+</div>
                <div className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-500 mt-0.5">Legendary Flavors</div>
              </div>
              <div className="border-l border-gray-200 pl-4 md:pl-8">
                <div className="font-serif text-2xl md:text-3xl font-extrabold text-[var(--theme-primary)]">250+</div>
                <div className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-500 mt-0.5">Scratch Dishes</div>
              </div>
              <div className="border-l border-gray-200 pl-4 md:pl-8">
                <div className="font-serif text-2xl md:text-3xl font-extrabold text-[var(--theme-accent)]">4.9★</div>
                <div className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-500 mt-0.5">Guest Favorite</div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] text-gray-400 mt-8 max-w-lg leading-normal italic">
              *Offer valid July 30, 2026 for dine-in guests only. One slice of cheesecake per guest. Must be present. Available at participating restaurants across the U.S.A.
            </p>
          </div>

          {/* Right Column: Dynamic Visual Showcase Card */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Main Glowing Frame */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src={promo.imageUrl || "https://i.pinimg.com/1200x/03/4e/90/034e90d4c5772884ac25bd668599f50e.jpg"}
                  alt="Legendary Strawberry Cheesecake Slice"
                  className="w-full h-[380px] sm:h-[450px] lg:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay Gradient on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                  {promo.subtitle && (
                    <div className="inline-block bg-[var(--theme-accent)] text-white text-[10px] font-extrabold tracking-[0.2em] uppercase px-3 py-1 rounded-sm w-max mb-2 shadow-md">
                      {promo.subtitle}
                    </div>
                  )}
                  {!promo.subtitle && (
                    <div className="inline-block bg-[var(--theme-accent)] text-white text-[10px] font-extrabold tracking-[0.2em] uppercase px-3 py-1 rounded-sm w-max mb-2 shadow-md">
                      MOST POPULAR SLICE
                    </div>
                  )}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                    Fresh Strawberry Cheesecake
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 mt-1 font-medium">
                    The original legendary cheesecake topped with glazed fresh strawberries.
                  </p>
                </div>
              </div>

              {/* Floating Glassmorphism Review Badge */}
              <div className="absolute -bottom-6 -left-6 sm:-left-10 z-20 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 max-w-[260px] sm:max-w-[300px] animate-bounce-subtle">
                <div className="w-12 h-12 rounded-full bg-[#fdfaf5] flex items-center justify-center text-[var(--theme-accent)] shrink-0 shadow-inner">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <div className="flex items-center text-amber-500 text-xs mb-0.5">
                    ★★★★★
                  </div>
                  <div className="text-xs font-extrabold text-[var(--theme-primary)]">
                    &ldquo;Best slice in America!&rdquo;
                  </div>
                  <div className="text-[10px] text-gray-500 font-semibold">
                    Over 40 Years of Tradition
                  </div>
                </div>
              </div>

              {/* Floating Quality Seal */}
              <div className="absolute -top-6 -right-6 sm:-right-8 z-20 bg-[var(--theme-primary)] text-white p-4 rounded-2xl shadow-2xl border-2 border-white flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 text-center transform rotate-6 hover:rotate-0 transition-transform">
                <Award size={26} className="text-[var(--theme-accent)] mb-1" />
                <span className="text-[9px] font-extrabold tracking-wider uppercase leading-none">
                  Scratch Made
                </span>
                <span className="text-[11px] font-serif font-bold text-amber-300 mt-0.5">
                  Daily
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
