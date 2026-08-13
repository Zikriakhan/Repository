import React, { useState } from 'react';
import { Search, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdminData } from '../context/AdminDataContext';

export default function MenuShowcase() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState(null);

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    
    // Redirect to detail page if product has variations
    if (item.hasVariations) {
      const itemSlug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      window.history.pushState({ id: item.id || item._id, image: item.image, description: item.desc || item.description, price: item.price }, '', `/menu/all/${itemSlug}`);
      window.dispatchEvent(new Event('popstate'));
      return;
    }

    addToCart({
      name: item.name,
      price: item.price || "AED14.95",
      numPrice: item.numPrice || 14.95,
      img: item.image,
      desc: item.description || item.desc
    });
    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const { data } = useAdminData();

  const activeCategoriesList = (data.categories && data.categories.length > 0)
    ? data.categories.filter(c => c.active !== false)
    : Object.keys(data.menuItems || {}).map(slug => ({ slug, name: slug.charAt(0).toUpperCase() + slug.slice(1), icon: '🍽️' }));

  const categoryTabs = ["ALL", ...activeCategoriesList.map(c => c.slug.toUpperCase())];

  const filterBySearch = (items) => {
    if (!searchQuery) return items;
    return items.filter(i =>
      (i.name && i.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (i.desc && i.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (i.description && i.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-[#1F2937] pt-20 pb-28">

      {/* Hero Banner */}
      <div className="relative bg-[#1a0a10] py-20 px-6 md:px-12 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-[#c69214] font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-4 block animate-fade-in">Legendary Taste</span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-xl mb-4">
              Our Menu
            </h1>
            <p className="text-gray-300 max-w-xl text-base sm:text-lg font-light leading-relaxed">
              Explore our extensive selection of handcrafted dishes, prepared fresh daily from scratch.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Horizontal Category Filter Bar */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-[65px] z-30 shadow-sm transition-all">
        <div className="max-w-[1440px] mx-auto px-6 overflow-x-auto no-scrollbar flex items-center gap-8 py-3 md:py-4 text-[11px] md:text-[12px] font-bold tracking-[0.15em] uppercase text-gray-500">
          {categoryTabs.map((catTab, idx) => {
            const catObj = activeCategoriesList.find(c => c.slug.toUpperCase() === catTab);
            return (
              <button
                key={idx}
                onClick={() => setActiveCategory(catTab)}
                className={`whitespace-nowrap transition-all py-2 border-b-2 flex items-center gap-1.5 ${activeCategory === catTab
                  ? 'text-[#9e2a4b] border-[#9e2a4b] scale-105'
                  : 'border-transparent hover:text-[#9e2a4b] hover:border-gray-300'
                  }`}
              >
                {catObj && <span>{catObj.icon}</span>}
                <span>{catObj ? catObj.name.toUpperCase() : catTab}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-16">

        {/* Explore Our Menu Search Bar */}
        <div className="text-center mb-20 animate-fade-up">
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#9e2a4b] to-[#c69214] rounded-full blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for your favorite dishes..."
              className="relative w-full bg-white border border-gray-200 text-[#1F2937] text-base md:text-lg p-5 pl-8 pr-16 focus:outline-none focus:ring-2 focus:ring-[#9e2a4b] focus:border-transparent shadow-lg rounded-full placeholder:text-gray-400 font-medium transition-all"
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-[#c69214] group-hover:scale-110 transition-transform" size={24} />
          </div>
        </div>

        {/* Dynamic Sections based on activeCategoriesList */}
        {activeCategoriesList.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-serif text-gray-500">No menu items found.</p>
          </div>
        ) : (
          activeCategoriesList.map(catObj => {
            const cat = catObj.slug;
            const categoryItems = data.menuItems[cat]?.filter(i => i.active) || [];
            const filteredItems = filterBySearch(categoryItems);
            const isCategoryActive = activeCategory === "ALL" || activeCategory === cat.toUpperCase();

            if (!isCategoryActive) return null;

            return (
              <div className="mb-24 animate-fade-in" key={cat}>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-gray-200/60 pb-4 mb-10">
                  <div>
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1a0a10] capitalize tracking-tight flex items-center gap-3">
                      <span>{catObj.icon}</span>
                      <span>{catObj.name}</span>
                    </h2>
                    {catObj.desc && <p className="text-sm text-gray-500 font-normal mt-1">{catObj.desc}</p>}
                  </div>
                  <button
                    onClick={() => setActiveCategory(cat.toUpperCase())}
                    className="text-[10px] md:text-[11px] font-bold text-[#c69214] hover:text-[#9e2a4b] uppercase tracking-[0.2em] transition-colors mt-4 sm:mt-0 group flex items-center gap-2"
                  >
                    View All {categoryItems.length} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {filteredItems.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                    <p className="text-[#1a0a10] font-serif text-xl font-bold mb-2">No items listed in {catObj.name} yet</p>
                    <p className="text-gray-500 text-sm">Dishes added to this category in the Admin Dashboard will appear here live.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredItems.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          const itemSlug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                          window.history.pushState({ id: item.id || item._id, image: item.image, description: item.desc || item.description, price: item.price }, '', `/menu/${cat}/${itemSlug}`);
                          window.dispatchEvent(new Event('popstate'));
                        }}
                        className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-500 cursor-pointer flex flex-col h-full transform hover:-translate-y-2"
                      >
                        <div className="relative h-56 md:h-64 overflow-hidden bg-gray-50">
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                          <img
                            src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop'}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop';
                            }}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute top-4 right-4 z-20 text-right flex flex-col gap-1 items-end">
                            <span className="bg-white/95 backdrop-blur-md text-[#1a0a10] font-serif font-bold px-4 py-2 rounded-full shadow-lg text-sm border border-gray-100/50">
                              {item.hasVariations ? 'From ' : ''}AED{item.hasVariations && item.minVariationPrice ? item.minVariationPrice.toFixed(2) : (item.numPrice !== undefined ? item.numPrice.toFixed(2) : parseFloat(String(item.price).replace(/[^0-9.-]/g, '') || '0').toFixed(2))}
                            </span>
                            {item.hasVariations && item.variationCount > 0 && (
                              <span className="bg-[var(--theme-accent,#92141f)] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                                {item.variationCount} sizes available
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow justify-between bg-white relative z-20">
                          <div>
                            <h3 className="font-serif font-bold text-xl md:text-2xl text-[#1a0a10] mb-3 group-hover:text-[#9e2a4b] transition-colors line-clamp-2 leading-snug">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 font-light mb-6">
                              {item.desc || item.description}
                            </p>
                          </div>

                          <button
                            onClick={(e) => handleAddToCart(e, item)}
                            className={`w-full flex items-center justify-center gap-2 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-3 md:py-4 rounded-xl transition-all duration-300 ${addedItem === item.name
                              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                              : 'bg-gray-50 text-[#1a0a10] hover:bg-[#9e2a4b] hover:text-white hover:shadow-xl hover:shadow-[#9e2a4b]/20 border border-gray-100 group-hover:border-transparent'
                              }`}
                          >
                            {addedItem === item.name ? (
                              <>Added to Cart</>
                            ) : item.hasVariations ? (
                              <>Choose Size</>
                            ) : (
                              <><Plus size={14} /> Add to Order</>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  );
}
