import React, { useState } from 'react';
import { CreditCard, Gift, ArrowRight, ChevronDown } from 'lucide-react';

const faqQuestions = [
  "Where do you sell U.S. Gift Cards?",
  "Where can I redeem my U.S. Gift Card?",
  "How do I redeem my U.S. eGift Card?",
  "Where are U.S. gift cards NOT redeemable?",
  "Where can I buy/redeem Canadian Gift Cards?",
  "Can Gift Cards be purchased in bulk?",
  "How do I check my Gift Card balance?",
  "What is the Personal Identification Number (PIN) on the back of my Gift Card?",
  "Can I transfer balances on Gift Cards?",
  "What do you mean by Gift Cards and eGift Cards?",
  "May I use a Gift Card to pay for delivery?",
  "What is a With Our Compliments (Comp Card) card?",
  "What if my Gift Card/Comp Card balance doesn't cover my entire bill?",
  "Do Gift Cards/Comp Cards expire?",
  "Can I reload my Gift Card?"
];

export default function GiftCards() {
  const [openFaq, setOpenFaq] = useState(null);
  const [faqTab, setFaqTab] = useState('general');

  const navigateTo = (path) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans text-[#1F2937] pt-20">

      {/* 1. Hero Section (Warm Cream Background with Official Floating Strawberries & Cutout Cheesecake) */}
      <section className="relative w-full bg-[#F2F2F2] overflow-hidden py-16 md:py-24 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between border-b border-gray-200">

        {/* Background Dots Texture */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <img
            src="https://www.thecheesecakefactory.com/sites/default/files/styles/full_width_xl/public/2021-09/dots-wide-bg_0.png"
            alt="Background Dots"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Left Side: Hero Text & Buttons */}
        <div className="w-full md:w-1/2 z-10 flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:ml-12 mb-12 md:mb-0">
          <span className="font-serif italic text-2xl md:text-3xl text-[#92141f] mb-2 font-medium">
            Give the Gift of Cheesecake
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#044d1d] mb-6 tracking-tight">
            The Perfect Gift!
          </h1>
          <p className="text-[#044d1d]/80 text-sm md:text-base max-w-lg mb-8 leading-relaxed font-medium">
            The Cheesecake Factory gift cards make the perfect gift for birthdays, anniversaries, holidays and any special occasion! Send a gift card by mail or email today.
          </p>

          <button
            onClick={() => navigateTo('/order')}
            className="bg-[#92141f] hover:bg-[#b30c15] text-white px-8 py-3.5 text-xs font-bold tracking-[0.15em] uppercase rounded-none shadow-md transition-all mb-6 transform hover:-translate-y-0.5"
          >
            PURCHASE U.S. GIFT CARDS
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-bold uppercase tracking-[0.15em]">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 1200, behavior: 'smooth' }); }}
              className="text-[#92141f] hover:underline"
            >
              RELOAD PLASTIC GIFT CARDS
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 1800, behavior: 'smooth' }); }}
              className="text-[#92141f] hover:underline"
            >
              FAQS
            </a>
          </div>
        </div>

        {/* Right Side: Hero Official Images (Gift Card + High-Res Strawberry Cheesecake Cutout) */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center z-10 min-h-[350px] md:min-h-[450px]">
          {/* Card Mockup Graphic */}
          <div className="relative z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-700 drop-shadow-2xl w-64 md:w-80">
            <img
              src="https://www.thecheesecakefactory.com/sites/default/files/styles/full_width_xl/public/2026-05/mobile-just-card-1-1.png"
              alt="The Cheesecake Factory Gift Card"
              className="w-full h-auto object-contain filter drop-shadow-2xl"
            />
          </div>

          {/* Background High-Res Strawberry Cheesecake Cutout */}
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-80 md:w-[480px] z-10 pointer-events-none">
            <img
              src="https://www.thecheesecakefactory.com/sites/default/files/styles/full_width_xl/public/2021-09/Strawberry-cheesecake-highres-cutout.png"
              alt="Fresh Strawberry Cheesecake Cutout"
              className="w-full h-auto object-contain filter drop-shadow-xl"
            />
          </div>
        </div>

      </section>

      {/* 2. Banner Section 1: Purchase Gift Cards for U.S. & Puerto Rico (Deep Plum Burgundy) */}
      <section className="bg-[#09481f] text-white py-16 px-6 text-center border-b border-[#065f24] relative">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="mb-4 text-[#d0dbd4]">
            <CreditCard size={44} strokeWidth={1.25} />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3 tracking-wide">
            Purchase Gift Cards for U.S. &amp; Puerto Rico
          </h2>
          <p className="text-gray-300 text-xs md:text-sm font-semibold uppercase tracking-widest max-w-xl mb-8 leading-relaxed">
            u.s. gift cards are redeemable in any of The Cheesecake Factory restaurants in the u.s. &amp; Puerto Rico &amp; online.
          </p>
          <button
            onClick={() => navigateTo('/order')}
            className="bg-white hover:bg-gray-100 text-[#044d1d] px-9 py-3 text-xs font-bold tracking-[0.15em] uppercase rounded-none transition-all shadow-md"
          >
            BUY A GIFT CARD
          </button>
        </div>
      </section>

      {/* 3. Banner Section 2: Split Cards (Bulk Orders & Canada) */}
      <section className="flex flex-col md:flex-row">
        {/* Left Split Card */}
        <div className="flex-1 bg-[#92141f] text-white p-14 md:p-20 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-[#92141f] group cursor-pointer transition-colors">
          <div className="mb-4 text-[#d0dbd4]">
            <Gift size={38} strokeWidth={1.25} />
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">
            Bulk Purchase Gift Cards<br />for U.S. &amp; Puerto Rico
          </h3>
          <p className="text-white/80 text-xs md:text-sm mb-8 leading-relaxed max-w-md font-medium">
            Order gift cards in bulk for your business or clients. Minimum purchase of $1000 required.
          </p>
          <button
            onClick={() => navigateTo('/order')}
            className="text-white font-bold uppercase tracking-[0.2em] text-xs flex items-center group-hover:text-[#d0dbd4] transition-colors"
          >
            ORDER NOW <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Split Card */}
        <div className="flex-1 bg-[#92141f] text-white p-14 md:p-20 flex flex-col items-center text-center group cursor-pointer transition-colors">
          <div className="mb-4 text-[#d0dbd4]">
            <Gift size={38} strokeWidth={1.25} />
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">
            Purchase Gift Cards for Canada
          </h3>
          <p className="text-white/80 text-xs md:text-sm mb-8 leading-relaxed max-w-md font-medium">
            Purchase plastic Canadian denominated Gift Cards redeemable at our restaurant in Toronto.
          </p>
          <button
            onClick={() => navigateTo('/order')}
            className="text-white font-bold uppercase tracking-[0.2em] text-xs flex items-center group-hover:text-[#d0dbd4] transition-colors"
          >
            ORDER NOW <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 4. Section: Manage Gift Cards Purchased (Pure White Background) */}
      <section className="bg-white py-20 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto text-center flex flex-col items-center">
          <div className="mb-4 text-[#9e2a4b]">
            <CreditCard size={40} strokeWidth={1.25} />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3a1e26] mb-14 tracking-tight">
            Manage Gift Cards Purchased
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex flex-col items-center justify-between p-6 bg-[#fff8ed] border border-gray-200 hover:border-[#c69214] transition-all group rounded-none"
            >
              <span className="text-[#3a1e26] font-bold text-xs uppercase tracking-[0.15em] mb-4 text-center leading-relaxed group-hover:text-[#9e2a4b] transition-colors">
                FIND OR RESEND YOUR EGIFT CARD
              </span>
              <ArrowRight size={18} className="text-[#9e2a4b] group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex flex-col items-center justify-between p-6 bg-[#fff8ed] border border-gray-200 hover:border-[#c69214] transition-all group rounded-none"
            >
              <span className="text-[#3a1e26] font-bold text-xs uppercase tracking-[0.15em] mb-4 text-center leading-relaxed group-hover:text-[#9e2a4b] transition-colors">
                RELOAD PLASTIC GIFT CARD OR CHECK BALANCE
              </span>
              <ArrowRight size={18} className="text-[#9e2a4b] group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex flex-col items-center justify-between p-6 bg-[#fff8ed] border border-gray-200 hover:border-[#c69214] transition-all group rounded-none"
            >
              <span className="text-[#3a1e26] font-bold text-xs uppercase tracking-[0.15em] mb-4 text-center leading-relaxed group-hover:text-[#9e2a4b] transition-colors">
                CHECK GIFT CARD BALANCE
              </span>
              <ArrowRight size={18} className="text-[#9e2a4b] group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex flex-col items-center justify-between p-6 bg-[#fff8ed] border border-gray-200 hover:border-[#c69214] transition-all group rounded-none"
            >
              <span className="text-[#3a1e26] font-bold text-xs uppercase tracking-[0.15em] mb-4 text-center leading-relaxed group-hover:text-[#9e2a4b] transition-colors">
                SPECIALTY SUPPORT FOR ONLINE PURCHASES OR CALL 888-891-2401
              </span>
              <ArrowRight size={18} className="text-[#9e2a4b] group-hover:translate-x-1 transition-transform" />
            </a>

          </div>
        </div>
      </section>

      {/* 5. FAQ Section (Frequently Asked Questions, Warm Light Cream) */}
      <section className="bg-[#fff8ed] py-20 px-6 md:px-12 pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3a1e26] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setFaqTab('general')}
              className={`px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${faqTab === 'general' ? 'bg-[#b8860b] text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
            >
              GIFT CARDS (GENERAL)
            </button>
            <button
              onClick={() => setFaqTab('help')}
              className={`px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${faqTab === 'help' ? 'bg-[#b8860b] text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
            >
              NEED HELP
            </button>
            <button
              onClick={() => setFaqTab('terms')}
              className={`px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${faqTab === 'terms' ? 'bg-[#b8860b] text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
            >
              TERMS OF USE FOR GIFT CARDS
            </button>
          </div>

          {/* Accordion Questions List */}
          <div className="border-t border-[#c69214]/30">
            {faqQuestions.map((question, idx) => (
              <div key={idx} className="border-b border-[#c69214]/30">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-5 text-left hover:bg-white/50 transition-colors px-3 group"
                >
                  <span className="font-serif text-[#3a1e26] text-base md:text-lg font-semibold pr-6 group-hover:text-[#9e2a4b] transition-colors">
                    {question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#c69214] flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pb-6 px-3 text-gray-700 text-xs md:text-sm leading-relaxed max-w-3xl">
                    For detailed information regarding this topic, please contact our guest support team or refer to the official terms and conditions provided with your gift card purchase. We strive to provide legendary hospitality and service to all our guests.
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <button className="bg-[#92141f] hover:bg-[#92141f] text-white px-8 py-3.5 text-xs font-bold tracking-[0.15em] uppercase rounded-none shadow-md transition-all">
              GUEST SUPPORT DIRECTORY
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
