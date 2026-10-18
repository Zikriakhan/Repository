import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, MessageCircle, ExternalLink, Sparkles, Award, CheckCircle2, Search, Compass } from 'lucide-react';

export const SHARJAH_LOCATIONS = [
  {
    id: 'buhaira-corniche',
    name: 'Italian Pizza Kawkab (Flagship)',
    tag: 'Flagship Pizzeria',
    address: 'Crescent Tower, Buhaira Corniche - Al Majaz 3',
    city: 'Sharjah, United Arab Emirates',
    distance: '0.1 km',
    hours: 'Open Daily · 11:00 AM – 4:00 AM',
    phoneDisplay: '+971 50 298 5578',
    whatsappNumber: '971502985578',
    googleMapsUrl: 'https://maps.app.goo.gl/kQuFvJ3BiMWcP8FSA',
    embedMapUrl: 'https://maps.google.com/maps?q=Italian+Pizza+Kawkab+Crescent+Tower+Buhaira+Corniche+Al+Majaz+3+Sharjah&t=&z=16&ie=UTF8&iwloc=&output=embed',
    highlights: [
      '🔥 Wood-Fired Oven at 450°C',
      '🌊 Buhaira Corniche View',
      '🚗 Dine-In, Curbside & Late Delivery',
      '⭐ Sharjah’s Favorite Pizzeria'
    ],
    features: ['Dine-In', 'Takeaway', 'Late Night Delivery', 'Outdoor Seating']
  },

];

const FindRestaurant = () => {
  const [selectedLocation, setSelectedLocation] = useState(SHARJAH_LOCATIONS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigateTo = (e, path) => {
    e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  const filteredLocations = SHARJAH_LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="locations" className="relative w-full bg-[var(--theme-light)] py-20 lg:py-28 overflow-hidden text-[#1F2937]">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--theme-accent)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--theme-primary)]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 animate-fade-down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-black tracking-[0.25em] uppercase mb-4 shadow-sm">
            <Sparkles size={14} className="text-amber-700" />
            <span>JOIN US TODAY • LOCATIONS ACROSS SHARJAH</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--theme-primary)] mb-5 tracking-tight drop-shadow-sm">
            Find a Restaurant LOCATIONS
          </h2>

          <p className="text-gray-700 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            Craving something extraordinary? Visit our authentic Italian pizzerias across Sharjah or contact us on WhatsApp for fast local delivery and takeaway!
          </p>
        </div>

        {/* Quick Branch Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {SHARJAH_LOCATIONS.map((loc) => {
            const isSelected = selectedLocation.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 shadow-sm ${isSelected
                    ? 'bg-[var(--theme-accent)] text-white shadow-md shadow-[var(--theme-accent)]/25 ring-2 ring-[var(--theme-accent)]/40 scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-[var(--theme-primary)] border border-gray-200'
                  }`}
              >
                <MapPin size={16} className={isSelected ? 'text-white' : 'text-[var(--theme-accent)]'} />
                <span>{loc.name.replace('Italian Pizza Kawkab - ', '')}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Main Section: Interactive Locations List + Live Embedded Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">

          {/* Left Column (5 Cols): Locations Directory Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative mb-2">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Sharjah branches (e.g. Corniche, Majaz, Taawun)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)] shadow-sm transition-all"
              />
            </div>

            {/* Location Cards */}
            <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1">
              {filteredLocations.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border-2 shadow-md relative overflow-hidden ${isSelected
                        ? 'bg-red-50/40 border-[var(--theme-accent)] ring-2 ring-[var(--theme-accent)]/30 shadow-xl shadow-[var(--theme-accent)]/10'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
                      }`}
                  >
                    {/* Header: Tag + Status */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${isSelected
                          ? 'bg-[var(--theme-accent)] text-white shadow-sm'
                          : 'bg-amber-100 text-amber-900 border border-amber-300/60'
                        }`}>
                        {loc.tag}
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                        Open Now
                      </span>
                    </div>

                    {/* Branch Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--theme-primary)] mb-2 leading-tight">
                      {loc.name}
                    </h3>

                    {/* Address */}
                    <div className="flex items-start gap-2.5 text-gray-700 text-xs sm:text-sm mb-2.5">
                      <MapPin size={18} className="text-[var(--theme-accent)] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-gray-900">{loc.address}</p>
                        <p className="text-xs text-gray-500">{loc.city}</p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-center gap-2 text-gray-600 text-xs mb-2">
                      <Clock size={16} className="text-[var(--theme-accent)] shrink-0" />
                      <span>{loc.hours}</span>
                    </div>

                    {/* Hotline */}
                    <div className="flex items-center gap-2 text-gray-600 text-xs mb-4">
                      <Phone size={16} className="text-[var(--theme-accent)] shrink-0" />
                      <span className="font-mono font-bold text-[var(--theme-accent)]">{loc.phoneDisplay}</span>
                    </div>

                    {/* Feature Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {loc.features.map((feat, idx) => (
                        <span key={idx} className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-md border border-gray-200">
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                      <a
                        href={loc.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-[var(--theme-accent)] hover:bg-[#a61723] text-white font-extrabold py-2.5 px-3 rounded-xl text-center text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
                      >
                        <Navigation size={14} />
                        <span>Directions</span>
                        <ExternalLink size={12} />
                      </a>

                      <a
                        href={`https://wa.me/${loc.whatsappNumber}?text=${encodeURIComponent(`Hello Italian Pizza Kawkab (${loc.name}), I would like to place an order / get directions.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 px-3 rounded-xl text-center text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
                      >
                        <MessageCircle size={14} />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (7 Cols): Embedded Interactive Google Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border-2 border-gray-200 shadow-2xl relative min-h-[460px] lg:min-h-full bg-neutral-900 flex flex-col">

            {/* Top Bar on Map */}
            <div className="bg-[var(--theme-primary)] px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white z-10 shadow-md">
              <div className="flex items-center gap-2.5 font-bold">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <MapPin size={17} className="text-amber-400" />
                <span className="text-xs sm:text-sm">
                  Active Map: <strong className="text-amber-300">{selectedLocation.name}</strong>
                </span>
              </div>
              <a
                href={selectedLocation.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/15 hover:bg-white/25 text-white font-extrabold px-3 py-1.5 rounded-lg flex items-center gap-1.5 uppercase tracking-wider text-[11px] transition-all"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Embedded Live Google Map iframe */}
            <div className="relative flex-grow w-full min-h-[420px] lg:min-h-[540px]">
              <iframe
                key={selectedLocation.id}
                title={`${selectedLocation.name} Google Maps Location`}
                src={selectedLocation.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '440px' }}
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
                    <span>Get Directions</span>
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

        </div>

        {/* Bottom Call to Action Bar */}
        <div className="bg-[var(--theme-primary)] text-white border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center md:text-left">
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Order Online for Fast Delivery in Sharjah
            </h4>
            <p className="text-gray-200 text-sm sm:text-base">
              Fresh hot pizza from our wood-fired oven right to your door. WhatsApp hotline: <strong className="text-amber-300 font-mono text-base">+971 50 298 5578</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${selectedLocation.whatsappNumber}?text=${encodeURIComponent("Hello Italian Pizza Kawkab, I would like to place an order for delivery in Sharjah.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Us Now</span>
            </a>

            <button
              onClick={(e) => navigateTo(e, '/order')}
              className="bg-[var(--theme-accent)] hover:bg-[#a61723] text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg"
            >
              Order Online
            </button>

            <button
              onClick={(e) => navigateTo(e, '/BrowseMenu')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all"
            >
              Browse Menu
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FindRestaurant;
