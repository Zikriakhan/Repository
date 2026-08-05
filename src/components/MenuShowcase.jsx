import React, { useState } from 'react';
import { Search, ChevronRight, ShoppingBag, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdminData } from '../context/AdminDataContext';

export default function MenuShowcase() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState(null);

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart({
      name: item.name,
      price: item.price || "$14.95",
      numPrice: item.numPrice || 14.95,
      img: item.image,
      desc: item.description
    });
    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const navigateTo = (path) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  const { data } = useAdminData();

  const bitesItems = data.menuItems.bites.filter(i => i.active);
  const bowlsItems = data.menuItems.bowls.filter(i => i.active);
  const dessertItems = data.menuItems.desserts.filter(i => i.active);

  const categoryTabs = [
    "NEW MENU - BITES",
    "NEW MENU - BOWLS",
    "SMALL PLATES & SNACKS",
    "APPETIZERS",
    "FLATBREAD PIZZAS",
    "GLAMBURGERS®",
    "SANDWICHES",
    "PASTAS",
    "SPECIALTIES",
    "CHEESECAKES & DESSERTS",
    "VIEW ALL CATEGORIES"
  ];

  const filterBySearch = (items) => {
    if (!searchQuery) return items;
    return items.filter(i =>
      (i.name && i.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (i.desc && i.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const filteredBites = filterBySearch(bitesItems);
  const filteredBowls = filterBySearch(bowlsItems);
  const filteredDesserts = filterBySearch(dessertItems);

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-[#1F2937] pt-20 pb-28">

      {/* Top Banner Header */}
      <div className="bg-white border-b border-gray-200 py-6 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#3a1e26] tracking-tight">
            Our Menu
          </h1>

          {/* <div className="flex flex-col sm:flex-row items-center gap-4 text-center md:text-right">
            <p className="text-xs md:text-sm text-gray-700 font-medium max-w-md">
              Ready to Order? Click <span className="font-bold text-[#3a1e26]">&ldquo;Start an Order&rdquo;</span> to place an order for pickup or delivery!
            </p>
            <button 
              onClick={() => navigateTo('/order')}
              className="bg-[#9e2a4b] hover:bg-[#800020] text-white px-7 py-3 text-xs font-bold tracking-[0.15em] uppercase transition-all shadow-md hover:shadow-lg rounded-sm whitespace-nowrap"
            >
              START AN ORDER
            </button>
          </div> */}
        </div>
      </div>

      {/* Sticky Horizontal Category Filter Bar */}
      <nav className="bg-[#f7f2e7] border-b border-gray-300 sticky top-[65px] z-30 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-6 overflow-x-auto no-scrollbar flex items-center gap-8 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase text-gray-700">
          {categoryTabs.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap transition-colors py-1 ${activeCategory === cat
                  ? 'text-[#9e2a4b] font-extrabold border-b-2 border-[#9e2a4b]'
                  : 'hover:text-[#9e2a4b]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-10">

        {/* Explore Our Menu Search Bar */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3a1e26] mb-6">
            Explore Our Menu
          </h2>
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Our Menu"
              className="w-full bg-white border border-[#c69214] text-[#1F2937] text-sm p-3.5 pl-5 pr-12 focus:outline-none focus:ring-1 focus:ring-[#c69214] shadow-sm rounded-none placeholder:text-gray-400 font-medium"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c69214]" size={20} />
          </div>
        </div>

        {/* SECTION 1: New Menu – Bites */}
        {(activeCategory === "ALL" || activeCategory === "NEW MENU - BITES" || activeCategory === "VIEW ALL CATEGORIES") && filteredBites.length > 0 && (
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-300 pb-3 mb-6">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3a1e26]">
                  New Menu – Bites
                </h2>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  Bite Size Beginnings to Start Your Meal
                </p>
              </div>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveCategory("NEW MENU - BITES"); }}
                className="text-xs font-bold text-[#9e2a4b] hover:underline uppercase tracking-wider mt-2 sm:mt-0"
              >
                VIEW ALL NEW MENU – BITES ({bitesItems.length})
              </a>
            </div>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBites.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const itemSlug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    window.history.pushState({ image: item.image, description: item.desc, price: item.price }, '', `/menu/bites/${itemSlug}`);
                    window.dispatchEvent(new Event('popstate'));
                  }}
                  className="bg-white border border-gray-200 shadow-xs rounded-none overflow-hidden flex flex-row group hover:shadow-md hover:border-[#c69214] transition-all duration-300 cursor-pointer min-h-[140px]"
                >
                  <div className="w-2/3 p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-[#3a1e26] text-base md:text-lg mb-1 group-hover:text-[#9e2a4b] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-600 leading-snug line-clamp-2 mb-3">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
                      <span className="font-serif font-bold text-sm md:text-base text-[#3a1e26]">{item.price}</span>
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-sm transition-all ${addedItem === item.name
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#3a1e26] hover:bg-[#9e2a4b] text-white'
                          }`}
                      >
                        {addedItem === item.name ? "ADDED" : "+ ADD"}
                      </button>
                    </div>
                  </div>

                  <div className="w-1/3 shrink-0 overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: New Menu – Bowls */}
        {(activeCategory === "ALL" || activeCategory === "NEW MENU - BOWLS" || activeCategory === "VIEW ALL CATEGORIES") && filteredBowls.length > 0 && (
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-300 pb-3 mb-6">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3a1e26]">
                  New Menu – Bowls
                </h2>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  Everything You Love – Perfect for a Meal
                </p>
              </div>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveCategory("NEW MENU - BOWLS"); }}
                className="text-xs font-bold text-[#9e2a4b] hover:underline uppercase tracking-wider mt-2 sm:mt-0"
              >
                VIEW ALL NEW MENU – BOWLS ({bowlsItems.length})
              </a>
            </div>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBowls.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const itemSlug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    window.history.pushState({ image: item.image, description: item.desc, price: item.price }, '', `/menu/bowls/${itemSlug}`);
                    window.dispatchEvent(new Event('popstate'));
                  }}
                  className="bg-white border border-gray-200 shadow-xs rounded-none overflow-hidden flex flex-row group hover:shadow-md hover:border-[#c69214] transition-all duration-300 cursor-pointer min-h-[140px]"
                >
                  <div className="w-2/3 p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-[#3a1e26] text-base md:text-lg mb-1 group-hover:text-[#9e2a4b] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-600 leading-snug line-clamp-2 mb-3">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
                      <span className="font-serif font-bold text-sm md:text-base text-[#3a1e26]">{item.price}</span>
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-sm transition-all ${addedItem === item.name
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#3a1e26] hover:bg-[#9e2a4b] text-white'
                          }`}
                      >
                        {addedItem === item.name ? "ADDED" : "+ ADD"}
                      </button>
                    </div>
                  </div>

                  <div className="w-1/3 shrink-0 overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: Cheesecakes & Specialty Desserts */}
        {(activeCategory === "ALL" || activeCategory === "CHEESECAKES & DESSERTS" || activeCategory === "VIEW ALL CATEGORIES") && filteredDesserts.length > 0 && (
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-300 pb-3 mb-6">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3a1e26]">
                  Cheesecakes &amp; Specialty Desserts
                </h2>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  Over 30 Legendary Cheesecakes and Specialty Desserts
                </p>
              </div>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveCategory("CHEESECAKES & DESSERTS"); }}
                className="text-xs font-bold text-[#9e2a4b] hover:underline uppercase tracking-wider mt-2 sm:mt-0"
              >
                VIEW ALL DESSERTS ({dessertItems.length})
              </a>
            </div>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDesserts.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const itemSlug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    window.history.pushState({ image: item.image, description: item.desc, price: item.price }, '', `/menu/desserts/${itemSlug}`);
                    window.dispatchEvent(new Event('popstate'));
                  }}
                  className="bg-white border border-gray-200 shadow-xs rounded-none overflow-hidden flex flex-row group hover:shadow-md hover:border-[#c69214] transition-all duration-300 cursor-pointer min-h-[140px]"
                >
                  <div className="w-2/3 p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-[#3a1e26] text-base md:text-lg mb-1 group-hover:text-[#9e2a4b] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-600 leading-snug line-clamp-2 mb-3">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
                      <span className="font-serif font-bold text-sm md:text-base text-[#3a1e26]">{item.price}</span>
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-sm transition-all ${addedItem === item.name
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#3a1e26] hover:bg-[#9e2a4b] text-white'
                          }`}
                      >
                        {addedItem === item.name ? "ADDED" : "+ ADD"}
                      </button>
                    </div>
                  </div>

                  <div className="w-1/3 shrink-0 overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
