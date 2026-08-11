import React from 'react';
import { Utensils, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdminData } from '../context/AdminDataContext';

const FriedMacCheesePromo = () => {
  const { data } = useAdminData();
  const promo = data?.promos?.find(p => p.name === 'FriedMacCheesePromo') || {};
  const { addToCart } = useCart();

  const navigateTo = (e, path) => {
    if (e) e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  const handleQuickOrder = (e) => {
    e.stopPropagation();
    const itemName = promo.title || "Aesthetic Penne Pasta";
    const itemPrice = promo.price ? `AED${parseFloat(promo.price).toFixed(2)}` : "AED16.50";
    const itemNumPrice = promo.price ? parseFloat(promo.price) : 16.50;

    addToCart({
      name: itemName,
      price: itemPrice,
      numPrice: itemNumPrice,
      img: promo.imageUrl || "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=600&auto=format&fit=crop",
      desc: promo.description || "Fresh penne pasta tossed in a creamy aesthetic tomato basil sauce, garnished with parmesan and fresh herbs."
    });
    alert(`🎉 ${itemName} added to your bag!`);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--theme-light)] relative overflow-hidden">

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200/80 grid grid-cols-1 lg:grid-cols-12 items-stretch">

          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 relative min-h-[350px] sm:min-h-[450px] lg:min-h-[550px] overflow-hidden bg-gray-100 group order-2 lg:order-1">
            <img
              src={promo.imageUrl || "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=600&auto=format&fit=crop"}
              alt={promo.title || "Aesthetic Penne Pasta"}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>

            {/* Floating Quality Badge */}
            <div className="absolute top-6 left-6 z-20 bg-white/95 backdrop-blur-md text-[var(--theme-primary)] px-4 py-2 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
              <Sparkles size={14} className="text-[var(--theme-accent)]" />
              <span>Signature Appetizer</span>
            </div>
          </div>

          {/* Right Column: Content Showcase */}
          <div className="lg:col-span-6 p-8 sm:p-12 md:p-16 flex flex-col justify-between order-1 lg:order-2">

            <div>
              <div className="inline-flex items-center gap-2 text-[var(--theme-accent)] font-extrabold tracking-[0.2em] uppercase text-xs mb-4">
                {promo.subtitle ? <span>{promo.subtitle}</span> : <>
                  <span>TIMELESS CLASSIC</span>
                  <span>•</span>
                  <span>SINCE 1978</span>
                </>}
              </div>

              <h2 className="font-serif text-[var(--theme-primary)] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6" dangerouslySetInnerHTML={{
                __html: promo.title || `Aesthetic Penne <br />
                <span className="text-[var(--theme-accent)] italic font-normal">&amp; Pasta</span>` }}>
              </h2>

              <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed mb-8">
                {promo.description || 'Fresh penne pasta tossed in a creamy aesthetic tomato basil sauce, garnished with parmesan and fresh herbs. A beautiful and delicious Italian classic!'}
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 mb-10">
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  <span>Creamy Tomato Basil Sauce</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  <span>Freshly Grated Parmesan</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  <span>Aesthetic Presentation</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleQuickOrder}
                className="flex-1 bg-[var(--theme-accent)] hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-3"
              >
                <Utensils size={18} />
                <span>{promo.buttonText || `Order Now ($${promo.price || '16.50'})`}</span>
              </button>

              <button
                onClick={(e) => navigateTo(e, '/menu/bites/aesthetic-penne-pasta')}
                className="bg-gray-100 hover:bg-gray-200 text-[var(--theme-primary)] px-6 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 group"
              >
                <span>Details</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FriedMacCheesePromo;
