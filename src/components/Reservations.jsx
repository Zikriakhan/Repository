import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, ChevronDown } from 'lucide-react';

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
          <div className="inline-block bg-white px-8 py-3 rounded-xl shadow-2xl mb-6">
            <img src="/logo.png" alt="The Cheesecake Factory" className="h-16 md:h-20 lg:h-24 w-auto object-contain mx-auto" />
          </div>
          <span className="text-[#ffd700] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Secure Your Table</span>
          <h1 className="font-serif text-white text-5xl md:text-6xl font-bold mb-6">Online Reservations</h1>
          <p className="text-gray-300 text-lg">Experience legendary dining and over 30 delicious cheesecakes. Only Cheesecake Rewards® members can make online reservations for parties up to six.</p>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section className="px-6 md:px-12 -mt-10 relative z-20">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* Form Area */}
            <div className="w-full md:w-3/5 p-10 md:p-16">
              <h2 className="font-serif text-3xl font-bold text-[#3a1e26] mb-8">Find Your Table</h2>

              <div className="space-y-8">
                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-gray-200 text-[#1F2937] text-sm rounded-sm py-4 pl-12 pr-10 focus:outline-none focus:border-[#3a1e26] focus:ring-1 focus:ring-[#3a1e26] appearance-none transition-colors"
                    >
                      <option value="" disabled>Select a Restaurant</option>
                      <option value="ny">New York - Queens Center</option>
                      <option value="la">Los Angeles - The Grove</option>
                      <option value="chi">Chicago - John Hancock Center</option>
                      <option value="mia">Miami - Aventura Mall</option>
                      <option value="sf">San Francisco - Union Square</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[#F9FAFB] border border-gray-200 text-[#1F2937] text-sm rounded-sm py-4 pl-12 pr-4 focus:outline-none focus:border-[#3a1e26] focus:ring-1 focus:ring-[#3a1e26] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-[#F9FAFB] border border-gray-200 text-[#1F2937] text-sm rounded-sm py-4 pl-12 pr-10 focus:outline-none focus:border-[#3a1e26] focus:ring-1 focus:ring-[#3a1e26] appearance-none transition-colors"
                      >
                        <option value="" disabled>Select Time</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="17:30">5:30 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="18:30">6:30 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="20:30">8:30 PM</option>
                        <option value="21:00">9:00 PM</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>

                {/* Party Size */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Party Size</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-gray-200 text-[#1F2937] text-sm rounded-sm py-4 pl-12 pr-10 focus:outline-none focus:border-[#3a1e26] focus:ring-1 focus:ring-[#3a1e26] appearance-none transition-colors"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="7">7+ Guests (Call to Book)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>

                <div className="pt-6">
                  <button className="w-full bg-[#92141f] hover:bg-[#92141f] text-white py-5 rounded-sm font-bold tracking-[0.15em] uppercase text-xs transition-colors shadow-lg">
                    Check Availability
                  </button>
                </div>
              </div>
            </div>

            {/* Information Area */}
            <div className="w-full md:w-2/5 bg-[#fdfaf5] p-10 md:p-16 border-l border-gray-100 flex flex-col justify-center">
              <div className="mb-10">
                <h3 className="font-serif text-xl font-bold text-[#3a1e26] mb-4">Dining &amp; Reservation Policies</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Only Cheesecake Rewards® members can make online reservations — easy, convenient, and available for parties up to six guests.
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
            <h3 className="font-serif text-[#3a1e26] text-3xl font-bold mb-4">Cheesecake Rewards®</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              Not a member yet? Sign up for free today to make online reservations and receive complimentary birthday cheesecake slices!
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
