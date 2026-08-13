import React, { useState } from 'react';
import { Calendar, Cake, Gift, User, Mail, Star } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

const faqData = [
  "What is Cheesecake Rewards®?",
  "How do I sign up for Cheesecake Rewards®?",
  "What are the exclusive member benefits?",
  "Is there a membership fee to join?",
  "Does this program have points?",
  "Do you have a mobile app?",
  "Is the Cheesecake Rewards® program available at all locations?",
  "Are your international restaurants participating in Cheesecake Rewards®?",
  "Where can I contact guest support regarding my account?"
];

export default function Rewards() {
  const { data } = useAdminData();
  const [openFaq, setOpenFaq] = useState(null);
  const [faqTab, setFaqTab] = useState('about');

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#1F2937] pt-20">

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-[#044d1d] via-[#065f24] to-[#044d1d] overflow-hidden py-24 md:py-32 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between min-h-[500px]">
        {/* Background decorative texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2000&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay'
        }}></div>

        {/* Left Content */}
        <div className="w-full md:w-1/2 z-10 flex flex-col items-center md:items-start text-center md:text-left text-white max-w-2xl mx-auto md:ml-12 animate-fade-up">
          <div className="inline-block bg-white px-8 py-3 rounded-xl shadow-2xl mb-6">
            <img src="/logo.png" alt="The Cheesecake Factory Logo" className="h-16 md:h-20 lg:h-24 w-auto object-contain" />
          </div>
          <div className="font-serif italic text-4xl md:text-6xl font-bold mb-8 drop-shadow-md text-[#d0dbd4]">
            Cheesecake<br /><span className="font-light text-white uppercase tracking-widest text-3xl md:text-5xl not-italic">Rewards®</span>
          </div>
          <p className="text-gray-300 text-xs font-bold uppercase tracking-[0.2em] mb-4">Exclusive Member Perks:</p>
          <div className="flex items-center gap-4 mb-10">
            <Cake size={40} className="text-[#92141f]" strokeWidth={1.5} />
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">Free Birthday Slice</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <button className="bg-[#92141f] hover:bg-[#b30c15] text-white px-12 py-4 font-bold tracking-[0.15em] transition-all uppercase text-xs shadow-xl hover:-translate-y-1 rounded-sm">
              Join Rewards® Now
            </button>
            <button className="bg-transparent border border-white text-white px-12 py-4 font-bold tracking-[0.15em] transition-all uppercase text-xs hover:bg-white hover:text-[#044d1d] rounded-sm">
              Member Login
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-16 md:mt-0 z-10 pr-0 md:pr-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#92141f] translate-x-4 translate-y-4 rounded-sm transition-transform group-hover:translate-x-6 group-hover:translate-y-6 duration-500"></div>
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop"
              alt="Cheesecake Rewards Slice"
              className="relative w-[90%] md:w-full max-w-lg object-cover rounded-sm shadow-2xl z-10 h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* App Promo Section */}
      <section className="py-24 px-6 md:px-12 flex flex-col md:flex-row items-center justify-center max-w-[1440px] mx-auto gap-16">
        <div className="w-full md:w-5/12 flex justify-center relative animate-fade-up">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#92141f]/10 to-transparent rounded-full blur-3xl transform -translate-x-10 translate-y-10"></div>
          <img
            src="https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=500&auto=format&fit=crop"
            alt="Phone Mockup"
            className="w-64 h-auto rounded-[3rem] border-8 border-gray-900 shadow-2xl transform -rotate-6 hover:-rotate-2 transition-transform duration-700 relative z-10"
          />
        </div>
        <div className="w-full md:w-7/12 text-center md:text-left animate-smooth-reveal">
          <span className="text-[#92141f] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Mobile Experience</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#044d1d] mb-6">The Cheesecake Factory App</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
            The Cheesecake Factory app makes it easier than ever to book online reservations, order pickup, reorder your legendary favorites, and access your Cheesecake Rewards® offers — all in one convenient place.
          </p>
          <button className="bg-transparent border-2 border-[#044d1d] text-[#044d1d] hover:bg-[#044d1d] hover:text-white px-10 py-4 font-bold tracking-[0.15em] transition-all uppercase text-xs rounded-sm">
            Download App Today
          </button>
        </div>
      </section>

      {/* Benefits Grid Section */}
      <section className="bg-white py-24 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto text-center">
          <span className="text-[#92141f] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Membership Privileges</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#044d1d] mb-16 max-w-3xl mx-auto leading-tight">
            Joining <span className="italic font-light text-[#92141f]">Cheesecake Rewards®</span> unlocks access to legendary benefits.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {data.rewards.filter(r => r.active).map((reward, _idx) => {
              // Pick an icon based on category/index
              let Icon = Gift;
              if (reward.category === 'Birthday' || reward.title.toLowerCase().includes('birthday') || reward.title.toLowerCase().includes('slice')) Icon = Cake;
              else if (reward.category === 'Redemption' || reward.title.toLowerCase().includes('off')) Icon = Star;
              else if (reward.category === 'Welcome' || reward.title.toLowerCase().includes('bonus')) Icon = Calendar;

              return (
                <div key={reward.id} className="bg-[#F2F2F2] border border-gray-100 p-10 flex flex-col items-center text-center shadow-sm premium-card rounded-sm">
                  <div className="w-16 h-16 bg-[#044d1d] rounded-full flex items-center justify-center text-[#d0dbd4] mb-6 shadow-lg">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#044d1d] mb-4">{reward.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1">{reward.description}</p>
                  {reward.points > 0 && (
                    <span className="text-[#92141f] font-bold tracking-[0.15em] uppercase text-[10px] bg-white px-3 py-1 border border-gray-200 rounded-full">
                      {reward.points} Points
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <button className="bg-[#92141f] hover:bg-[#b30c15] text-white px-12 py-4 font-bold tracking-[0.15em] transition-all uppercase text-xs shadow-xl hover:-translate-y-1 rounded-sm">
            Become A Member Today
          </button>
        </div>
      </section>

      {/* Make the Most Section */}
      <section className="py-24 px-6 md:px-12 bg-[#F2F2F2]">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#044d1d] mb-4">Maximizing Your Rewards</h2>
          <p className="text-gray-600 font-bold text-xs uppercase tracking-[0.2em] mb-20">Membership is 100% free. Enjoying legendary rewards is effortless.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-20 h-20 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[#92141f] mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <User size={36} strokeWidth={1.5} />
              </div>
              <h4 className="font-serif font-bold text-[#044d1d] text-2xl mb-4">Give Your Phone Number</h4>
              <p className="text-gray-600 text-base leading-relaxed max-w-sm">Simply provide your registered mobile number to your server or host when dining in to redeem available rewards.</p>
            </div>

            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-20 h-20 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[#92141f] mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <Mail size={36} strokeWidth={1.5} />
              </div>
              <h4 className="font-serif font-bold text-[#044d1d] text-2xl mb-4">Check Your Inbox</h4>
              <p className="text-gray-600 text-base leading-relaxed max-w-sm">Keep an eye on your email or mobile app notifications for new offers, surprise rewards, and exclusive dining invitations.</p>
            </div>

            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-20 h-20 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[#92141f] mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <Gift size={36} strokeWidth={1.5} />
              </div>
              <h4 className="font-serif font-bold text-[#044d1d] text-2xl mb-4">Redeem With Ease</h4>
              <p className="text-gray-600 text-base leading-relaxed max-w-sm">Apply rewards directly during online checkout or let your server know when you want to enjoy a complimentary slice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24 px-6 md:px-12 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#92141f] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Inquiries</span>
            <h2 className="font-serif text-4xl font-bold text-[#044d1d]">Frequently Asked Questions</h2>
          </div>

          {/* FAQ Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['about rewards', 'member perks', 'reservations', 'support'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFaqTab(tab)}
                className={`px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-colors ${faqTab === tab ? 'bg-[#044d1d] text-white' : 'bg-[#F5F5F5] text-gray-600 hover:bg-gray-200'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="border-t border-gray-200">
            {faqData.map((question, idx) => (
              <div key={idx} className="border-b border-gray-200">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-6 text-left hover:bg-gray-50 transition-colors px-4 group"
                >
                  <span className="font-serif text-[#044d1d] text-xl font-bold pr-8 group-hover:text-[#92141f] transition-colors">{question}</span>
                  <span className={`text-[#92141f] font-bold text-2xl flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pb-8 px-4 text-gray-600 text-sm leading-relaxed max-w-3xl">
                    Our guest support team is available 7 days a week to assist with any questions regarding your Cheesecake Rewards® account. Membership perks are designed to give you legendary dining and dessert rewards. Please review our official rewards terms and conditions for complete details.
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center gap-6">
            <button className="bg-transparent border-2 border-[#044d1d] text-[#044d1d] hover:bg-[#044d1d] hover:text-white px-12 py-4 font-bold tracking-[0.15em] transition-all uppercase text-xs rounded-sm">
              Contact Guest Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
