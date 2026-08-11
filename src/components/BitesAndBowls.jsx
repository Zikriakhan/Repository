import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Star, Plus, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdminData } from '../context/AdminDataContext';

const BitesAndBowls = () => {
  const { addToCart } = useCart();
  const { data } = useAdminData();
  const [addedItem, setAddedItem] = useState(null);

  const allItems = [
    ...(data.menuItems?.bites || []),
    ...(data.menuItems?.bowls || [])
  ].filter(i => i.active !== false);

  // Map admin data shape to component shape
  const items = allItems.map(i => ({
    title: i.name,
    price: i.price,
    numPrice: i.numPrice,
    rating: i.rating,
    calories: i.calories,
    desc: i.desc,
    image: i.image
  }));

  const handleAddToCart = (item) => {
    addToCart({
      name: item.title,
      price: item.price,
      numPrice: item.numPrice,
      img: item.image,
      desc: item.desc
    });
    setAddedItem(item.title);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const navigateTo = (e, path) => {
    e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('.slider-card')?.offsetWidth || 300;
      container.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' }); // 32 is the 2rem gap
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const cardWidth = container.querySelector('.slider-card')?.offsetWidth || 300;

      // If we've reached the end, loop back to start
      if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth + 32, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (isPaused || items.length <= 4) return; // Don't auto-scroll if 4 or fewer items (desktop view)
    const interval = setInterval(scrollRight, 3500);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  return (
    <section className="py-24 bg-[#fdfaf5] relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#92141f]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ffd700]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

        {/* Animated Subtitle & Title Header */}
        <div className="animate-fade-up">
          <span className="text-[#3a1e26] font-bold tracking-[0.25em] text-xs uppercase mb-3 inline-block px-4 py-1.5 bg-[#3a1e26]/5 rounded-full border border-[#3a1e26]/10">
            Find A New Favorite
          </span>
          <h2 className="font-serif text-[#3a1e26] text-5xl md:text-6xl font-bold mb-4 drop-shadow-sm">
            Bites &amp; Bowls
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base mb-14 font-medium">
            Handcrafted small plates and nutrient-packed bowls prepared fresh from scratch every single day.
          </p>
        </div>

        {/* Slider Container with Professional Navigation & Hover Animations */}
        <div
          className="relative mb-14"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {items.length > 4 && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 p-3 rounded-full hover:bg-white text-[#92141f] transition-all hover:scale-110 hidden md:flex items-center justify-center"
                aria-label="Previous items"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={scrollRight}
                className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 p-3 rounded-full hover:bg-white text-[#92141f] transition-all hover:scale-110 hidden md:flex items-center justify-center"
                aria-label="Next items"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Hide scrollbar with custom CSS class 'no-scrollbar' (assuming it exists or using inline webkit styles) */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {/* Inject a quick style to hide scrollbar for webkit if not in global css */}
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

            {items.map((item, index) => (
              <div
                key={index}
                className="slider-card snap-start shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col group relative"
              >
                {/* Image Container with Zoom Animation & Badges */}
                <div className="relative overflow-hidden h-64 bg-gray-100">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop'}
                    alt={item.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop';
                    }}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Dark Gradient Overlay for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-40 group-hover:opacity-20 transition-opacity"></div>

                  {/* Price Tag Pill */}
                  <div className="absolute top-4 right-4 bg-[#92141f] text-white font-sans text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 transform group-hover:scale-105 transition-transform">
                    {item.price}
                  </div>

                  {/* Calorie Badge */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {item.calories}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-[#3a1e26] shadow-sm">
                    <Star size={12} className="text-[#ffd700] fill-[#ffd700]" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1 text-left justify-between bg-white">
                  <div>
                    <h3 className="font-serif text-[#3a1e26] font-bold text-lg mb-2 leading-tight group-hover:text-[#92141f] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  {/* Price & Add to Cart Interactive Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <span className="font-serif font-bold text-xl text-[#3a1e26]">{item.price}</span>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm ${addedItem === item.title
                        ? 'bg-emerald-600 text-white scale-105'
                        : 'bg-[#3a1e26] hover:bg-[#92141f] text-white hover:shadow-lg'
                        }`}
                    >
                      {addedItem === item.title ? (
                        <>
                          <Check size={14} />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <Plus size={14} />
                          <span>ADD</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Explore Full Menu Button with Ripple / Slide Animation */}
        <button
          onClick={(e) => navigateTo(e, '/BrowseMenu')}
          className="bg-[#92141f] hover:bg-[#09481f] text-white font-bold tracking-[0.2em] uppercase px-10 py-4 text-xs transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-3 rounded-none group"
        >
          <span>EXPLORE FULL MENU</span>
          <ShoppingBag size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </section>
  );
};

export default BitesAndBowls;
