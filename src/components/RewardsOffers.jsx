import React from 'react';

const RewardsOffers = () => {
  return (
    <section className="relative w-full bg-gradient-to-r from-[#92141f] via-[#92141f] to-[#92141f] py-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Top Confetti decoration */}
      <div className="absolute top-0 left-0 w-full h-16 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #d0dbd4 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>

      {/* Ribbon decoration at the bottom */}
      <div className="absolute bottom-[-10px] left-0 w-full flex justify-between px-10 opacity-60">
        {/* Placeholder ribbons */}
        <div className="w-32 h-16 border-t-4 border-b-4 border-[#d0dbd4] transform -skew-x-12 rounded-full blur-sm"></div>
        <div className="w-32 h-16 border-t-4 border-b-4 border-[#d0dbd4] transform skew-x-12 rounded-full blur-sm"></div>
      </div>

      <div className="z-10 text-center max-w-2xl px-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="inline-block bg-white px-8 py-3.5 rounded-xl shadow-2xl mb-3">
            <img
              src="/logo.png"
              alt="The Cheesecake Factory Logo"
              className="h-16 md:h-20 lg:h-24 w-auto object-contain"
            />
          </div>
          <span className="text-[#d0dbd4] text-sm tracking-[0.3em] font-sans uppercase font-bold">Rewards</span>
        </div>

        <h3 className="text-white font-bold text-xl md:text-2xl mb-2">
          Members Enjoy:
        </h3>

        <div className="flex items-center justify-center space-x-3 mb-8">
          <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
            <path d="M12.5 4a8.5 8.5 0 0 1 8.5 8.5c0 3.73-2.4 6.88-5.75 8.12a.75.75 0 1 1-.5-1.42A7 7 0 1 0 12.5 5.5a.75.75 0 0 1 0-1.5z" />
            <path d="M5.5 12.5h11a.75.75 0 0 0 0-1.5h-11a.75.75 0 0 0 0 1.5z" />
          </svg>
          <h2 className="font-serif text-white text-5xl md:text-6xl font-bold">
            DoorDash Offers
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <button className="bg-white text-[#92141f] font-bold tracking-widest uppercase px-10 py-3 hover:bg-gray-100 transition-colors shadow-md w-full sm:w-auto">
            Learn More
          </button>
          <button className="bg-transparent border-2 border-white text-white font-bold tracking-widest uppercase px-10 py-3 hover:bg-white hover:text-[#92141f] transition-colors w-full sm:w-auto">
            Login
          </button>
        </div>

        <p className="text-white text-xs font-medium tracking-wide">
          Available in the United States, including Puerto Rico
        </p>
      </div>
    </section>
  );
};

export default RewardsOffers;
