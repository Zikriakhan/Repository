import React, { useState } from 'react';
import { MapPin, ShoppingBag, Truck, Search, Compass, Clock, Phone, MessageCircle, ExternalLink, Navigation, Sparkles } from 'lucide-react';
import { SHARJAH_LOCATIONS } from './FindRestaurant';

export default function Locations() {
  const [activeTab, setActiveTab] = useState('Near You');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(SHARJAH_LOCATIONS[0]);
  const [isSearching, setIsSearching] = useState(false);

  const filteredLocations = SHARJAH_LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 300);
  };

  const handleNearYou = () => {
    setActiveTab('Near You');
    setSearchQuery('');
    setSelectedLocation(SHARJAH_LOCATIONS[0]);
  };

  return (
    <div className="min-h-screen font-sans flex flex-col bg-[var(--theme-light)] pt-24 text-[#1F2937]">

      {/* Page Header */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 text-xs font-black tracking-widest uppercase mb-3 shadow-sm">
          <Sparkles size={13} className="text-amber-700" />
          <span>AUTHENTIC WOOD-FIRED PIZZERIAS IN SHARJAH</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--theme-primary)] mb-4">
          Find a Restaurant LOCATIONS
        </h1>
        <p className="text-gray-700 font-medium text-base sm:text-lg max-w-2xl leading-relaxed">
          Craving something extraordinary? Visit our authentic Italian pizzerias across Sharjah or contact us on WhatsApp for fast local delivery and takeaway!
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white shadow-md z-10 flex flex-col md:flex-row items-center w-full max-w-[1440px] mx-auto px-6 md:px-12 py-4 mb-8 rounded-2xl border border-gray-200">

        {/* Left Actions */}
        <div className="flex w-full md:w-auto h-12 md:h-14 border border-gray-200 rounded-xl overflow-hidden mb-4 md:mb-0 bg-gray-50">
          <button
            onClick={handleNearYou}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 font-bold text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'Near You' ? 'bg-[var(--theme-accent)] text-white shadow-md' : 'bg-transparent text-[var(--theme-primary)] hover:bg-gray-100'
            }`}
          >
            <MapPin size={16} />
            Near You
          </button>
          <button
            onClick={() => setActiveTab('Pickup')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 font-bold text-xs uppercase tracking-wider border-l border-gray-200 transition-colors ${
              activeTab === 'Pickup' ? 'bg-[var(--theme-accent)] text-white shadow-md' : 'bg-transparent text-[var(--theme-primary)] hover:bg-gray-100'
            }`}
          >
            <ShoppingBag size={16} />
            Pickup
          </button>
          <button
            onClick={() => setActiveTab('Delivery')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 font-bold text-xs uppercase tracking-wider border-l border-gray-200 transition-colors ${
              activeTab === 'Delivery' ? 'bg-[var(--theme-accent)] text-white shadow-md' : 'bg-transparent text-[var(--theme-primary)] hover:bg-gray-100'
            }`}
          >
            <Truck size={16} />
            Delivery
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex-1 flex h-12 md:h-14 w-full md:w-auto md:ml-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="flex-1 relative flex items-center bg-gray-50">
            <div className="absolute left-4 text-gray-400">
              <Compass size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search area (e.g. Corniche, Al Majaz, Al Taawun, Sharjah)..."
              className="w-full h-full pl-12 pr-4 bg-transparent text-[var(--theme-primary)] placeholder-gray-400 font-semibold text-xs sm:text-sm focus:outline-none focus:bg-white transition-colors"
            />
          </div>
          <button
            type="submit"
            className="bg-[var(--theme-accent)] hover:bg-[#a61723] text-white px-8 font-extrabold text-xs uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Search'
            )}
          </button>
        </form>
      </div>

      {/* Main Map + Locations Directory Section */}
      <div className="flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full px-6 md:px-12 gap-8 pb-20 flex-1 items-stretch">

        {/* Live Interactive Google Map */}
        <div className="w-full lg:w-7/12 min-h-[460px] lg:min-h-[640px] bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 flex flex-col relative">
          
          {/* Top Bar on Map */}
          <div className="bg-[var(--theme-primary)] px-6 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white z-10 shadow-md">
            <div className="flex items-center gap-2 font-bold">
              <MapPin size={16} className="text-amber-400" />
              <span>Google Maps: <strong className="text-amber-300">{selectedLocation.name}</strong></span>
            </div>
            <a
              href={selectedLocation.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-white font-extrabold flex items-center gap-1 uppercase tracking-wider text-[11px] transition-colors"
            >
              <span>Open in Google Maps App</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Embedded Google Map iframe */}
          <div className="relative flex-grow w-full min-h-[400px]">
            <iframe
              key={selectedLocation.id}
              title={`${selectedLocation.name} Google Map`}
              src={selectedLocation.embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter contrast-[1.05]"
            />

            {/* Floating Map Overlay Badge */}
            <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-md border border-gray-200 p-4 rounded-2xl shadow-2xl max-w-sm text-left hidden sm:block text-gray-900">
              <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 mb-1.5 inline-block">
                {selectedLocation.tag}
              </span>
              <p className="font-serif font-bold text-[var(--theme-primary)] text-base mb-1">
                {selectedLocation.name}
              </p>
              <p className="text-xs text-gray-600 leading-snug mb-3">
                {selectedLocation.address}, {selectedLocation.city}
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={selectedLocation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-white bg-[var(--theme-accent)] hover:opacity-90 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                >
                  <Navigation size={12} />
                  <span>Directions</span>
                </a>
                <a
                  href={`https://wa.me/${selectedLocation.whatsappNumber}?text=${encodeURIComponent(`Hello Italian Pizza Kawkab, I would like to order from ${selectedLocation.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                >
                  <MessageCircle size={12} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Results Sidebar Directory */}
        <div className="w-full lg:w-5/12 flex flex-col bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 bg-[var(--theme-primary)] text-white shrink-0 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold mb-1 text-amber-400">Sharjah Locations</h3>
                <p className="text-gray-300 text-xs uppercase tracking-widest">
                  Showing {filteredLocations.length} locations across Sharjah
                </p>
              </div>
              <span className="text-xs font-black bg-white/15 px-3 py-1 rounded-full text-amber-300">
                Sharjah, UAE
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[640px] bg-gray-50/50">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => {
                const isSelected = selectedLocation.id === location.id;
                return (
                  <div
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`cursor-pointer bg-white p-5 rounded-xl border transition-all duration-200 shadow-sm hover:shadow-md ${
                      isSelected
                        ? 'border-[var(--theme-accent)] ring-2 ring-[var(--theme-accent)]/30 bg-red-50/30'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-[var(--theme-accent)] text-white' : 'bg-amber-100 text-amber-900 border border-amber-300/60'
                        }`}>
                          {location.tag}
                        </span>
                        <h4 className="font-serif font-bold text-[var(--theme-primary)] text-lg mt-1 group-hover:text-[var(--theme-accent)] transition-colors">
                          {location.name}
                        </h4>
                      </div>
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full shrink-0">
                        {location.distance}
                      </span>
                    </div>

                    <div className="text-gray-600 text-xs sm:text-sm mb-3 space-y-1">
                      <p className="font-semibold text-gray-900">{location.address}</p>
                      <p className="text-gray-500">{location.city}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-4">
                      <div className="flex items-center gap-1 font-medium">
                        <Clock size={14} className="text-[var(--theme-accent)]" />
                        <span>{location.hours}</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono font-bold text-[var(--theme-accent)]">
                        <Phone size={14} className="text-[var(--theme-accent)]" />
                        <span>{location.phoneDisplay}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {location.features.map((feat, idx) => (
                        <span key={idx} className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200">
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLocation(location);
                        }}
                        className={`flex-1 py-2 font-black text-xs uppercase tracking-wider rounded-lg transition-colors text-center ${
                          isSelected
                            ? 'bg-[var(--theme-accent)] text-white shadow-sm'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        {isSelected ? 'Viewing on Map' : 'View on Map'}
                      </button>

                      <a
                        href={location.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 border border-[var(--theme-primary)] text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-white py-2 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors text-center flex items-center justify-center gap-1"
                      >
                        <Navigation size={12} /> Directions
                      </a>

                      <a
                        href={`https://wa.me/${location.whatsappNumber}?text=${encodeURIComponent(`Hello Italian Pizza Kawkab, I would like to place an order from ${location.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
                        title="Order on WhatsApp"
                      >
                        <MessageCircle size={14} />
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 flex flex-col justify-center items-center text-center h-full">
                <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mb-4">
                  <Search size={28} className="text-gray-400" />
                </div>
                <p className="text-[var(--theme-primary)] text-base mb-2 font-bold">
                  No matching Sharjah branch found
                </p>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[240px]">
                  Please search for Corniche, Al Majaz, or Al Taawun, or tap "Near You" to view all locations.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
