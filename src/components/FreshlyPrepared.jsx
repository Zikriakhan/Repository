import React from 'react';
import { ChefHat, ArrowRight, ShieldCheck, HeartHandshake, Sparkles, UtensilsCrossed } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

const FreshlyPrepared = () => {
  const { data } = useAdminData();
  const promo = data?.promos?.find(p => p.name === 'FreshlyPrepared') || {};

  const navigateTo = (e, path) => {
    if (e) e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden">

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="bg-[var(--theme-light)] rounded-3xl overflow-hidden shadow-xl border border-gray-200/60 grid grid-cols-1 lg:grid-cols-12 items-stretch">

          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-between">

            <div>
              <div className="inline-flex items-center gap-2 bg-white text-[var(--theme-primary)] px-4 py-1.5 rounded-full text-xs font-extrabold tracking-[0.2em] uppercase mb-6 shadow-sm border border-gray-200/60">
                <ChefHat size={16} className="text-[var(--theme-accent)]" />
                <span>{promo.subtitle || 'TASTE THE DIFFERENCE • OUR PHILOSOPHY'}</span>
              </div>

              <h2 className="font-serif text-[var(--theme-primary)] text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: promo.title || `Freshly Prepared <br />
                <span className="text-[var(--theme-accent)] italic font-normal">Every Day,</span> From Scratch` }}>
              </h2>

              <p className="text-gray-700 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-xl">
                {promo.description || <>Our menu features more than <strong className="font-extrabold text-[var(--theme-primary)]">250 dishes</strong>, freshly prepared from scratch every single day. We use only the finest ingredients, local dairy, and premium meats to ensure every bite is extraordinary.</>}
              </p>

              {/* 3 Pillar Stats Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col items-start">
                  <ShieldCheck size={24} className="text-emerald-600 mb-2" />
                  <div className="font-serif font-bold text-lg text-[var(--theme-primary)]">250+ Dishes</div>
                  <div className="text-[11px] text-gray-500 font-semibold">Made Fresh Daily</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col items-start">
                  <Sparkles size={24} className="text-[var(--theme-accent)] mb-2" />
                  <div className="font-serif font-bold text-lg text-[var(--theme-primary)]">Zero Shortcuts</div>
                  <div className="text-[11px] text-gray-500 font-semibold">No Pre-Made Sauces</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col items-start">
                  <HeartHandshake size={24} className="text-amber-500 mb-2" />
                  <div className="font-serif font-bold text-lg text-[var(--theme-primary)]">40+ Years</div>
                  <div className="text-[11px] text-gray-500 font-semibold">Uncompromising Quality</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={(e) => navigateTo(e, '/BrowseMenu')}
                className="bg-[var(--theme-primary)] hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs sm:text-sm shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
              >
                <span>Explore Full Menu</span>
                <ArrowRight size={18} className="text-[var(--theme-accent)] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={(e) => navigateTo(e, '/order')}
                className="bg-white hover:bg-gray-50 text-[var(--theme-accent)] border-2 border-[var(--theme-accent)] px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <UtensilsCrossed size={18} />
                <span>{promo.buttonText || 'Order Takeout Now'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative min-h-[350px] sm:min-h-[450px] lg:min-h-full overflow-hidden bg-gray-900 group">
            <img
              src={promo.imageUrl || "https://i.pinimg.com/736x/be/83/66/be836686c8d7a40b40a44f88c0c7550f.jpg"}
              alt={promo.title || "Freshly Prepared Sandwiches and Dishes"}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>

            {/* Floating Quality Pill on Image */}
            <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md text-[var(--theme-primary)] px-5 py-3 rounded-2xl shadow-2xl border border-white flex items-center gap-3 font-serif font-bold text-sm">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span>100% Scratch Kitchen</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FreshlyPrepared;
