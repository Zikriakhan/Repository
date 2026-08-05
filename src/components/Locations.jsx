import React, { useState } from 'react';
import { MapPin, ShoppingBag, Truck, Search, Compass, ChevronRight, Phone, Clock } from 'lucide-react';

const MOCK_LOCATIONS = [
  {
    id: 1,
    name: "Beverly Hills",
    address: "252 N Beverly Dr",
    cityState: "Beverly Hills, CA 90210",
    distance: "1.2 mi",
    status: "Open until 11:00 PM"
  },
  {
    id: 2,
    name: "Santa Monica Place",
    address: "395 Santa Monica Pl",
    cityState: "Santa Monica, CA 90401",
    distance: "5.4 mi",
    status: "Open until 10:00 PM"
  },
  {
    id: 3,
    name: "Marina Del Rey",
    address: "4718 Admiralty Way",
    cityState: "Marina del Rey, CA 90292",
    distance: "8.1 mi",
    status: "Open until 11:00 PM"
  }
];

export default function Locations() {
  const [activeTab, setActiveTab] = useState('Near You');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim() && activeTab !== 'Near You') return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      // Basic mock filter
      if (searchQuery.toLowerCase().includes('no')) {
        setResults([]);
      } else {
        setResults(MOCK_LOCATIONS);
      }
      setIsSearching(false);
    }, 800);
  };

  const handleNearYou = () => {
    setActiveTab('Near You');
    setSearchQuery('');
    handleSearch();
  };

  return (
    <div className="min-h-screen font-sans flex flex-col bg-[#FFFFFF] pt-24">

      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-10">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#3a1e26] mb-4">Find a Restaurant</h1>
        <p className="text-gray-600 font-medium text-sm max-w-xl">
          Discover over 210 The Cheesecake Factory restaurants nationwide and globally. Whether you are looking for an unforgettable dine-in meal, legendary cheesecakes, or convenient curbside pickup, we are ready to serve you.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white shadow-md z-10 flex flex-col md:flex-row items-center w-full max-w-[1440px] mx-auto px-6 md:px-12 py-4 mb-8 rounded-sm border border-gray-100">

        {/* Left Actions */}
        <div className="flex w-full md:w-auto h-12 md:h-14 border border-gray-200 rounded-sm overflow-hidden mb-4 md:mb-0">
          <button 
            onClick={handleNearYou}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 font-bold text-xs uppercase tracking-wider transition-colors ${activeTab === 'Near You' ? 'bg-[#3a1e26] text-white hover:bg-[#522a36]' : 'bg-white text-[#3a1e26] hover:bg-gray-50'}`}
          >
            <MapPin size={16} />
            Near You
          </button>
          <button 
            onClick={() => setActiveTab('Pickup')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 font-bold text-xs uppercase tracking-wider border-l border-gray-200 transition-colors ${activeTab === 'Pickup' ? 'bg-[#3a1e26] text-white hover:bg-[#522a36]' : 'bg-white text-[#3a1e26] hover:bg-gray-50'}`}
          >
            <ShoppingBag size={16} />
            Pickup
          </button>
          <button 
            onClick={() => setActiveTab('Delivery')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 font-bold text-xs uppercase tracking-wider border-l border-gray-200 transition-colors ${activeTab === 'Delivery' ? 'bg-[#3a1e26] text-white hover:bg-[#522a36]' : 'bg-white text-[#3a1e26] hover:bg-gray-50'}`}
          >
            <Truck size={16} />
            Delivery
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex-1 flex h-12 md:h-14 w-full md:w-auto md:ml-6 border border-gray-200 rounded-sm overflow-hidden">
          <div className="flex-1 relative flex items-center bg-gray-50">
            <div className="absolute left-4 text-gray-400">
              <Compass size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="City, State, or Zip Code"
              className="w-full h-full pl-12 pr-4 bg-transparent text-[#3a1e26] placeholder-gray-400 font-medium focus:outline-none focus:bg-white transition-colors uppercase"
            />
          </div>
          <button 
            type="submit"
            className="bg-[#92141f] hover:bg-[#a61723] text-white px-10 font-bold text-xs uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Search'
            )}
          </button>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full px-6 md:px-12 gap-8 pb-20 flex-1">

        {/* Map Section */}
        <div className="relative w-full lg:w-2/3 h-[50vh] lg:h-[70vh] bg-[#E5E7EB] rounded-sm overflow-hidden shadow-inner premium-card border border-gray-200">
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(50%)'
          }}></div>

          {/* Central Pin Mock */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
            <div className="w-16 h-16 bg-[#92141f] rounded-full border-4 border-white flex items-center justify-center shadow-xl">
              <div className="flex flex-col items-center text-white">
                <MapPin size={28} strokeWidth={2} />
              </div>
            </div>
            <div className="w-4 h-4 bg-[#92141f]/40 rounded-full mt-2 filter blur-sm"></div>
          </div>

          {/* Additional Mock Pins if results exist */}
          {results.length > 0 && !isSearching && (
            <>
              <div className="absolute left-[30%] top-[40%] text-[#3a1e26] hover:text-[#92141f] transition-colors cursor-pointer"><MapPin size={32} fill="white" /></div>
              <div className="absolute left-[60%] top-[60%] text-[#3a1e26] hover:text-[#92141f] transition-colors cursor-pointer"><MapPin size={32} fill="white" /></div>
            </>
          )}

          {/* Map Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col shadow-lg rounded-sm overflow-hidden bg-white">
            <button className="w-10 h-10 text-[#3a1e26] flex items-center justify-center hover:bg-gray-100 hover:text-[#92141f] text-2xl font-light border-b border-gray-200 transition-colors">
              +
            </button>
            <button className="w-10 h-10 text-[#3a1e26] flex items-center justify-center hover:bg-gray-100 hover:text-[#92141f] text-2xl font-light transition-colors">
              -
            </button>
          </div>
        </div>

        {/* Results Sidebar */}
        <div className="w-full lg:w-1/3 flex flex-col h-[50vh] lg:h-[70vh] bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 bg-[#3a1e26] text-white shrink-0">
            <h3 className="font-serif text-2xl font-bold mb-1 text-[#ffd700]">Restaurant Directory</h3>
            <p className="text-gray-300 text-xs uppercase tracking-widest">
              {activeTab === 'Near You' ? 'Showing locations near you' : `Showing ${activeTab} options`}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50/50">
            {isSearching ? (
              <div className="p-8 flex flex-col justify-center items-center h-full">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-[#92141f] rounded-full animate-spin mb-4" />
                <p className="text-gray-500 font-medium text-sm">Searching locations...</p>
              </div>
            ) : !hasSearched && results.length === 0 ? (
              <div className="p-8 flex flex-col justify-center items-center text-center h-full">
                <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-6">
                  <Search size={32} className="text-gray-300" />
                </div>
                <p className="text-[#3a1e26] text-lg mb-3 font-bold">
                  Find Your Cheesecake
                </p>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">
                  Enter a location to find restaurants, or use "Near You" to find the closest Cheesecake Factory.
                </p>
              </div>
            ) : results.length > 0 ? (
              <div className="flex flex-col p-4 gap-4">
                {results.map((location) => (
                  <div key={location.id} className="bg-white p-5 rounded-sm border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-[#3a1e26] text-lg group-hover:text-[#92141f] transition-colors">{location.name}</h4>
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{location.distance}</span>
                    </div>
                    
                    <div className="text-gray-600 text-sm mb-4 space-y-1">
                      <p>{location.address}</p>
                      <p>{location.cityState}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mb-5">
                      <div className="flex items-center gap-1.5"><Clock size={14} className="text-[#92141f]" /> {location.status}</div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 border border-[#3a1e26] text-[#3a1e26] hover:bg-[#3a1e26] hover:text-white py-2 font-bold text-xs uppercase tracking-wider transition-colors">
                        Details
                      </button>
                      <button className="flex-1 bg-[#92141f] hover:bg-[#a61723] text-white py-2 font-bold text-xs uppercase tracking-wider transition-colors">
                        Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 flex flex-col justify-center items-center text-center h-full">
                <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-6">
                  <Search size={32} className="text-gray-300" />
                </div>
                <p className="text-[#3a1e26] text-lg mb-3 font-bold">
                  No locations found
                </p>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">
                  We couldn't find any The Cheesecake Factory restaurants matching "{searchQuery}". Please try searching a different city, state, or zip code.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
