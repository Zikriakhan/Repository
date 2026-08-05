import React from 'react';

const GiftCardPromo = () => {
  return (
    <section className="flex flex-col md:flex-row w-full bg-[#92141f]">
      {/* Left Image Side */}
      <div className="w-full md:w-1/2 relative bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
          alt="Delicious Food Background"
          className="w-full h-full object-cover min-h-[400px]"
        />
        {/* Placeholder for the hand holding a gift card overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-72 h-44 md:w-80 md:h-48 bg-gradient-to-r from-[#92141f] to-[#b30c15] rounded-xl shadow-2xl flex flex-col items-center justify-center border-2 border-white transform -rotate-6 transition-transform hover:rotate-0 duration-300 p-4">
            <div className="bg-white px-5 py-2 rounded-lg shadow-md mb-2">
              <img src="/logo.png" alt="The Cheesecake Factory" className="h-10 md:h-12 w-auto object-contain mx-auto" />
            </div>
            <p className="text-white font-sans text-xs font-bold mt-1 uppercase tracking-widest">Gift Card</p>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-20 relative overflow-hidden bg-gradient-to-r from-[#92141f] to-[#b30c15]">
        {/* Confetti decoration */}
        <div className="absolute top-0 left-0 w-full h-32 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #d0dbd4 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>

        <div className="max-w-lg z-10">
          <h2 className="font-serif text-white text-5xl md:text-6xl mb-6">
            The Perfect Gift!
          </h2>
          <p className="text-white text-lg mb-8 font-medium leading-relaxed">
            Give the gift of The Cheesecake Factory gift card. Purchase a physical gift card or send an eCard today.
          </p>
          <button className="bg-white text-[#92141f] font-bold tracking-widest uppercase px-8 py-3 hover:bg-gray-100 transition-colors shadow-md">
            Buy a Gift Card
          </button>
        </div>
      </div>
    </section>
  );
};

export default GiftCardPromo;
