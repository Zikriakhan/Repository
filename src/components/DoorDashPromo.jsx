import React from 'react';
import promoImage from './admin/Gemini_Generated_Image_1mxcgv1mxcgv1mxc.png';

const DoorDashPromo = () => {
  return (
    <section className="flex flex-col md:flex-row w-full bg-[#F2F2F2]">
      {/* Left Content */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-20">
        <div className="max-w-md">
          <h3 className="text-[#044d1d] font-bold tracking-[0.2em] uppercase mb-4 text-sm">
            REDEEM ON DOORDASH
          </h3>
          <h2 className="font-serif text-[#92141f] text-5xl md:text-6xl mb-6">
            20% Off Up to $10
          </h2>
          <p className="text-[#044d1d] text-lg mb-8 font-medium leading-relaxed">
            Now through 9/30/26, link your Cheesecake Rewards&reg; and DoorDash accounts to receive 20% off your next order through DoorDash, up to $10!
          </p>
          <button className="bg-[#92141f] text-white font-bold tracking-widest uppercase px-8 py-3 hover:bg-[#b30c15] transition-colors shadow-md">
            Link Accounts
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2">
        <img
          src={promoImage}
          alt="DoorDash Food Delivery"
          className="w-full h-full object-cover min-h-[400px]"
        />
      </div>
    </section>
  );
};

export default DoorDashPromo;
