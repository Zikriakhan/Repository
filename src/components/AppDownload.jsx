import React from 'react';

const AppDownload = () => {
  return (
    <section className="flex flex-col md:flex-row w-full bg-[#92141f]">
      {/* Left Image Side */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#F2F2F2] via-[#e5e7eb] to-[#d0dbd4] p-12 flex justify-center items-center relative overflow-hidden">
        {/* Mockup Placeholder */}
        <div className="relative z-10 w-72 h-[540px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden">
          {/* Phone Notch */}
          <div className="w-1/2 h-6 bg-gray-800 rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2 z-20"></div>
          
          <img src="https://i.pinimg.com/736x/f9/63/e5/f963e5085a68e781e21ca5852bfa0ec5.jpg" alt="App UI" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-20 relative">
        {/* Confetti decoration */}
        <div className="absolute top-0 left-0 w-full h-32 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #d0dbd4 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>

        <div className="max-w-lg z-10">
          <h3 className="text-white font-bold tracking-[0.2em] uppercase mb-4 text-sm">
            YOUR PHONE JUST GOT SWEETER
          </h3>
          <h2 className="font-serif text-white text-5xl md:text-6xl mb-6">
            Download Our App
          </h2>
          <p className="text-white text-lg mb-8 font-medium leading-relaxed">
            The Cheesecake Factory app makes it easier than ever to book reservations, order pickup, reorder favorites, and keep track of your rewards - all in one convenient place. Enable notifications for the latest updates and reward alerts.
          </p>
          <button className="bg-white text-[#92141f] font-bold tracking-widest uppercase px-8 py-3 hover:bg-gray-100 transition-colors shadow-md">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
