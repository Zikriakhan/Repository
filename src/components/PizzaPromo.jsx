import React from 'react';
import { Heart, ArrowRight, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdminData } from '../context/AdminDataContext';

const PizzaPromo = () => {
  const { data } = useAdminData();
  const promo = data?.promos?.find(p => p.name === 'PizzaPromo') || {};
  const { addToCart } = useCart();

  const navigateTo = (e, path) => {
    if (e) e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const itemName = promo.title || "Specialty Strawberry Cheesecake & Sundae";
    const itemPrice = promo.price ? `AED ${parseFloat(promo.price).toFixed(2)}` : "AED 34.00";
    const itemNumPrice = promo.price ? parseFloat(promo.price) : 34;

    addToCart({
      name: itemName,
      price: itemPrice,
      numPrice: itemNumPrice,
      img: promo.imageUrl || "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop",
      desc: promo.description || "Velvety smooth cream cheese baked over our legendary buttery graham crust, crowned with glazed fresh strawberries, rich Belgian chocolate swirls, and freshly whipped sweet cream."
    });
    alert(`🎉 ${itemName} added to your bag!`);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--theme-light)] relative overflow-hidden">

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200/80 grid grid-cols-1 lg:grid-cols-12 items-stretch">

          {/* Left Column: Content Showcase */}
          <div className="lg:col-span-6 p-8 sm:p-12 md:p-16 flex flex-col justify-between order-1 lg:order-1">

            <div>
              <div className="inline-flex items-center gap-2 text-[var(--theme-accent)] font-extrabold tracking-[0.2em] uppercase text-xs mb-4">
                {promo.subtitle ? <span>{promo.subtitle}</span> : <>
                  <span>SIGNATURE DESSERTS</span>
                  <span>•</span>
                  <span>BAKED FROM SCRATCH</span>
                </>}
              </div>

              <h2 className="font-serif text-[var(--theme-primary)] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6" dangerouslySetInnerHTML={{
                __html: promo.title || `Specialty Italian <br />
                <span className="text-[var(--theme-accent)] italic font-normal">Desserts &amp; Cheesecake</span>` }}>
              </h2>

              <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed mb-8">
                {promo.description || 'Velvety smooth cream cheese baked over our legendary buttery graham crust, crowned with glazed fresh strawberries, rich Belgian chocolate swirls, and freshly whipped sweet cream.'}
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 mb-10">
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <Star size={18} className="text-[var(--theme-accent)] shrink-0 fill-[var(--theme-accent)]" />
                  <span>Handcrafted daily from scratch with premium Philadelphia cream cheese</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <Star size={18} className="text-[var(--theme-accent)] shrink-0 fill-[var(--theme-accent)]" />
                  <span>Glazed fresh strawberries &amp; rich Belgian chocolate swirls</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <Star size={18} className="text-[var(--theme-accent)] shrink-0 fill-[var(--theme-accent)]" />
                  <span>Golden buttery graham cracker crust, baked fresh daily</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleQuickAdd}
                className="flex-1 bg-[var(--theme-accent)] hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-3"
              >
                <Heart size={18} className="fill-current" />
                <span>{promo.buttonText || `Order Dessert — AED 34.00`}</span>
              </button>

              <button
                onClick={(e) => navigateTo(e, promo.buttonLink || '/menu/desserts/classic-strawberry-cheesecake')}
                className="bg-gray-100 hover:bg-gray-200 text-[var(--theme-primary)] px-6 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 group"
              >
                <span>Details</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-6 relative min-h-[350px] sm:min-h-[450px] lg:min-h-[550px] overflow-hidden bg-gray-900 group order-2 lg:order-2">
            <img
              src={promo.imageUrl || "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop"}
              alt={promo.title || "Specialty Italian Desserts & Cheesecake"}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>

            {/* Floating Quality Badge */}
            <div className="absolute top-6 left-6 z-20 bg-white/95 backdrop-blur-md text-[var(--theme-primary)] px-4 py-2 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
              <Star size={14} className="text-[var(--theme-accent)] fill-current" />
              <span>Signature Dessert</span>
            </div>

            {/* Price floating pill */}
            <div className="absolute bottom-6 right-6 z-20 bg-[var(--theme-accent)] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 font-serif font-bold text-sm">
              <span>{promo.price ? ` AED. ${promo.price}` : ' AED. 34.00'}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PizzaPromo;
