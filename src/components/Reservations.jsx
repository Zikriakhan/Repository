import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, ChevronDown } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Reservations() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [location, setLocation] = useState('');

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#1F2937] pt-20 pb-32">

      {/* Hero Header */}
      <section className="relative w-full bg-[#3a1e26] py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay'
        }}></div>
        <div className="relative z-10 max-w-3xl mx-auto animate-fade-up">
          {/* <div className="inline-block bg-white px-8 py-3 rounded-xl shadow-2xl mb-6">
            <img src={logoImg} alt="Italian Pizza Kawkab Logo" className="h-16 md:h-20 lg:h-24 w-auto object-contain mx-auto" />
          </div> */}
          <span className="text-[#ffd700] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Secure Your Table</span>
          <h1 className="font-serif text-white text-5xl md:text-6xl font-bold mb-6">Online Reservations</h1>
          <p className="text-gray-300 text-lg">Experience legendary dining and over 30 delicious cheesecakes. Only Italian pizza kawkabRewards® members can make online reservations for parties up to six.</p>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section className="px-6 md:px-12 -mt-10 relative z-20">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* Form Area */}


            {/* Information Area */}
            <div className="w-full md:w-2/5 bg-[#fdfaf5] p-10 md:p-16 border-l border-gray-100 flex flex-col justify-center">
              <div className="mb-10">
                <h3 className="font-serif text-xl font-bold text-[#3a1e26] mb-4">Dining &amp; Reservation Policies</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Only Italian pizza kawkabRewards® members can make online reservations — easy, convenient, and available for parties up to six guests.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Reservations can be booked up to 30 days in advance. We hold tables for 15 minutes past the reserved time.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="font-serif text-xl font-bold text-[#3a1e26] mb-4">Large Parties &amp; Events</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  For parties larger than 6 guests or for private banquet events, please contact your nearest restaurant directly.
                </p>
                <a href="/locations" className="text-[#92141f] font-bold uppercase tracking-[0.15em] text-xs hover:text-[#92141f] transition-colors border-b border-transparent hover:border-[#92141f] pb-1">
                  Find Your Restaurant
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Society Member Callout */}
      <section className="px-6 md:px-12 mt-32 max-w-4xl mx-auto text-center">
        <div className="border border-[#3a1e26]/20 rounded-sm p-12 bg-white relative overflow-hidden group shadow-sm">
          <div className="absolute inset-0 bg-[#3a1e26]/5 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500"></div>
          <div className="relative z-10">
            <h3 className="font-serif text-[#3a1e26] text-3xl font-bold mb-4">Italian pizza kawkabRewards®</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              Not a member yet? Sign up for free today to make online reservations and receive complimentary birthday Italian pizza kawkabslices!
            </p>
            <a href="/rewards" className="inline-block bg-transparent border-2 border-[#3a1e26] text-[#3a1e26] hover:bg-[#3a1e26] hover:text-white px-10 py-4 rounded-sm font-bold tracking-[0.15em] uppercase text-xs transition-colors">
              Learn More About Rewards®
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
