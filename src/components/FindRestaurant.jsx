import React from 'react';

const FindRestaurant = () => {
  return (
    <section className="relative w-full bg-black py-24 flex items-center justify-center">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
          alt="Restaurant Interior"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6 w-full">
        <h3 className="text-white font-bold tracking-[0.2em] uppercase mb-4 text-sm">
          JOIN US TODAY
        </h3>
        <h2 className="font-serif text-white text-5xl md:text-6xl mb-6">
          Find a Restaurant
        </h2>
        <p className="text-white text-lg mb-10 font-medium leading-relaxed max-w-2xl mx-auto">
          Craving something extraordinary? We've got something for everyone. Find your nearest location and treat yourself to an unforgettable dining experience today!
        </p>

        {/* Search Form */}
        <div className="flex flex-col sm:flex-row max-w-2xl mx-auto shadow-2xl">
          <input
            type="text"
            placeholder="CITY AND STATE OR ZIP CODE"
            className="flex-grow bg-white text-[#3a1e26] px-6 py-4 outline-none font-bold placeholder-gray-500 uppercase tracking-wide"
          />
          <button className="bg-[#92141f] text-white font-bold tracking-widest uppercase px-8 py-4 hover:bg-[#92141f] transition-colors whitespace-nowrap">
            Find A Location
          </button>
        </div>
      </div>
    </section>
  );
};

export default FindRestaurant;
