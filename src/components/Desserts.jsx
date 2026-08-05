import React, { useState } from 'react';
import { ShoppingBag, Star, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdminData } from '../context/AdminDataContext';

const Desserts = () => {
  const { addToCart } = useCart();
  const { data } = useAdminData();
  const [addedItem, setAddedItem] = useState(null);

  // Read desserts from admin data, show up to 4 on homepage
  const items = (data.menuItems.desserts || [])
    .filter(i => i.active !== false)
    .slice(0, 4)
    .map(i => ({
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

  return (
    <section className="py-24 bg-[#fdfaf5] relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#ffd700]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#92141f]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

        {/* Animated Subtitle & Title Header */}
        <div className="animate-fade-up">
          <span className="text-[#3a1e26] font-bold tracking-[0.25em] text-xs uppercase mb-3 inline-block px-4 py-1.5 bg-[#3a1e26]/5 rounded-full border border-[#3a1e26]/10">
            Find A New Favorite
          </span>
          <h2 className="font-serif text-[#3a1e26] text-5xl md:text-6xl font-bold mb-4 drop-shadow-sm">
            Cheesecakes &amp; Specialty Desserts
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base mb-14 font-medium">
            Over 30 legendary flavors of world-famous cheesecakes and decadent specialty dessert creations.
          </p>
        </div>

        {/* Card Grid with Professional Hover Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col group relative"
            >
              {/* Image Container with Zoom Animation & Badges */}
              <div className="relative overflow-hidden h-64 bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Gradient Overlay for Contrast */}
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
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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

        {/* Explore Full Menu Button */}
        <button
          onClick={(e) => navigateTo(e, '/BrowseMenu')}
          className="bg-[#92141f] hover:bg-[#92141f] text-white font-bold tracking-[0.2em] uppercase px-10 py-4 text-xs transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-3 rounded-none group"
        >
          <span>EXPLORE ALL DESSERTS</span>
          <ShoppingBag size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </section>
  );
};

export default Desserts;
