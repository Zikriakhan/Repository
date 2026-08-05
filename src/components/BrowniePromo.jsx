import React from 'react';
import { Sparkles, ArrowRight, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BrowniePromo = () => {
  const { addToCart } = useCart();

  const navigateTo = (e, path) => {
    if (e) e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart({
      name: "Classic Italian Lasagna",
      price: "$18.95",
      numPrice: 18.95,
      img: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=600&auto=format&fit=crop",
      desc: "Layers of delicate pasta, rich slow-cooked meat sauce, creamy ricotta, and bubbling melted mozzarella cheese baked to aesthetic perfection."
    });
    alert("🎉 Classic Italian Lasagna added to your bag!");
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-3 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="bg-[var(--theme-primary)] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Rich Editorial Content */}
          <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-between text-white relative z-10">
            
            {/* Top Tag & Debut Date */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[var(--theme-accent)] text-white px-4 py-1.5 rounded-full text-xs font-extrabold tracking-[0.2em] uppercase mb-6 shadow-md">
                <Sparkles size={14} />
                DEBUTS 7/30 • NEW FLAVOR
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
                Classic Italian <br />
                <span className="text-amber-300 italic font-normal">Lasagna</span>
              </h2>

              <p className="text-gray-200 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-xl">
                Layers of delicate pasta, rich slow-cooked meat sauce, creamy ricotta, and bubbling melted mozzarella cheese baked to aesthetic perfection!
              </p>
            </div>

            {/* Bottom Action Section */}
            <div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <button
                  onClick={(e) => navigateTo(e, '/menu/bites/classic-italian-lasagna')}
                  className="bg-white hover:bg-gray-100 text-[var(--theme-primary)] px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs sm:text-sm shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
                >
                  <span>Explore Flavor Details</span>
                  <ArrowRight size={18} className="text-[var(--theme-accent)] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleQuickAdd}
                  className="bg-[var(--theme-accent)] hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>+ Quick Add ($18.95)</span>
                </button>
              </div>

              {/* Highlights pills */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/20 text-xs font-bold tracking-wider uppercase text-gray-300">
                <span className="flex items-center gap-1.5"><Star size={16} className="text-amber-400" /> Authentic Recipe</span>
                <span>•</span>
                <span>🍝 Rich Meat Sauce</span>
                <span>•</span>
                <span>🧀 Melted Mozzarella</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative min-h-[350px] sm:min-h-[450px] lg:min-h-full overflow-hidden bg-gray-900 group">
            <img
              src="https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=600&auto=format&fit=crop"
              alt="Classic Italian Lasagna"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Gradient Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:hidden"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-primary)]/80 via-transparent to-transparent hidden lg:block"></div>

            {/* Floating Pill on Image */}
            <div className="absolute bottom-6 right-6 z-20 bg-white/95 backdrop-blur-md text-[var(--theme-primary)] px-5 py-3 rounded-2xl shadow-2xl border border-white flex items-center gap-3 font-serif font-bold text-sm">
              <span className="w-3 h-3 rounded-full bg-[var(--theme-accent)] animate-ping"></span>
              <span>Limited Time Release</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrowniePromo;
