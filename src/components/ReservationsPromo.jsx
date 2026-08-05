import React from 'react';

const ReservationsPromo = () => {
  return (
    <section className="flex flex-col md:flex-row w-full bg-[#92141f]">
      {/* Left Content */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-20">
        <div className="max-w-md">
          <h3 className="text-white font-bold tracking-[0.2em] uppercase mb-4 text-sm">
            YOUR TABLE IS WAITING
          </h3>
          <h2 className="font-serif text-white text-5xl md:text-6xl mb-6">
            Reservations
          </h2>
          <p className="text-white text-lg mb-8 font-medium leading-relaxed">
            Only Cheesecake Rewards&reg; members can make online reservations - easy, convenient, and available for parties up to six. Book up to 30 days in advance.
          </p>
          <button className="bg-white text-[#92141f] font-bold tracking-widest uppercase px-8 py-3 hover:bg-gray-100 transition-colors shadow-md">
            Save Me A Seat
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1000&auto=format&fit=crop"
          alt="Delicious Pasta Dish"
          className="w-full h-full object-cover min-h-[400px]"
        />
      </div>
    </section>
  );
};

export default ReservationsPromo;
