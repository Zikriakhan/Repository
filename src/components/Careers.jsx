import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

export default function Careers() {
  const { data, addApplication } = useAdminData();
  const [applyingFor, setApplyingFor] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredCareers = data.careers
    .filter(c => c.active)
    .filter(c => activeCategory ? c.department.toLowerCase() === activeCategory.toLowerCase() : true)
    .filter(c => searchKeyword ? (c.title.toLowerCase().includes(searchKeyword.toLowerCase()) || c.description.toLowerCase().includes(searchKeyword.toLowerCase()) || c.department.toLowerCase().includes(searchKeyword.toLowerCase())) : true)
    .filter(c => searchLocation ? c.location.toLowerCase().includes(searchLocation.toLowerCase()) : true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cnic: '',
    questionnaire: '',
    cv: null,
    image: null
  });
  const [submitted, setSubmitted] = useState(false);

  const handleApplyClick = (career) => {
    setApplyingFor(career);
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', cnic: '', questionnaire: '', cv: null, image: null, imageUrl: null });
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (name === 'image' && file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, image: file, imageUrl: reader.result }));
        };
        reader.readAsDataURL(file);
      } else {
        setFormData(prev => ({ ...prev, [name]: file }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApp = {
      jobId: applyingFor.id,
      jobTitle: applyingFor.title,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      cnic: formData.cnic,
      questionnaire: formData.questionnaire,
      cvName: formData.cv ? formData.cv.name : 'No file',
      imageName: formData.image ? formData.image.name : 'No file',
      imageUrl: formData.imageUrl || null,
    };
    addApplication(newApp);
    setSubmitted(true);
    setTimeout(() => {
      setApplyingFor(null);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans text-[#1F2937] pt-20 relative">

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-center px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2000&auto=format&fit=crop"
            alt="Professional Chefs"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 p-10 md:p-14 max-w-2xl w-full animate-fade-up">
          <span className="text-[#d0dbd4] font-bold text-xs tracking-[0.2em] uppercase mb-6 block">Join Our Team</span>
          <h1 className="font-serif text-white text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-md">
            Crafting<br /><span className="italic font-light text-[#92141f]">Excellence</span>
          </h1>
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-gray-300 mb-10 drop-shadow-sm">
            Search careers by keyword, role, or location
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Job Title or Keyword"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-sm focus:outline-none focus:border-white text-white placeholder-gray-400 shadow-inner"
            />
            <button
              onClick={() => {
                document.getElementById('openings-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#92141f] hover:bg-[#b30c15] text-white px-10 py-5 rounded-sm font-bold tracking-[0.15em] uppercase text-xs transition-all shadow-xl hover:-translate-y-1">
              Search Roles
            </button>
          </div>
        </div>
      </section>

      {/* Category Nav Bar */}
      <section className="bg-white border-b border-gray-200 sticky top-[73px] z-30 shadow-sm">
        <div className="max-w-[1440px] mx-auto flex overflow-x-auto no-scrollbar justify-start md:justify-center px-6">
          {['All', 'Dining Room', 'Culinary Team', 'Management', 'Corporate', 'Bakery & Dessert'].map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat === 'All' ? null : cat)}
              className={`border-b-2 px-8 py-6 text-xs font-bold uppercase tracking-[0.15em] transition-colors whitespace-nowrap ${(activeCategory === cat || (cat === 'All' && !activeCategory))
                ? 'text-[#92141f] border-[#92141f]'
                : 'text-gray-600 hover:text-[#92141f] border-transparent hover:border-[#92141f]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Let's Do Big Things Text Area */}
      <section className="py-32 px-6 md:px-12 text-center max-w-4xl mx-auto">
        <h2 className="font-serif text-[#044d1d] text-5xl font-bold mb-8">A Legacy of Legendary Quality</h2>
        <p className="text-gray-600 text-xl leading-relaxed font-medium">
          At The Cheesecake Factory, our people are the foundation of our success. We are looking for passionate individuals who share our dedication to culinary excellence, from-scratch cooking, and world-class hospitality. Join our team and be part of an extraordinary legacy.
        </p>
      </section>

      {/* Current Openings Grid */}
      <section id="openings-section" className="px-6 md:px-12 py-24 bg-[#F2F2F2]">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#92141f] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Available Positions</span>
            <h2 className="font-serif text-[#044d1d] text-4xl md:text-5xl font-bold">Current Openings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCareers.length > 0 ? (
              filteredCareers.map(career => (
                <div key={career.id} className="bg-white p-8 rounded-sm shadow-md border border-gray-100 hover:shadow-xl transition-shadow group flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <h3 className="font-serif text-[#044d1d] text-2xl font-bold group-hover:text-[#92141f] transition-colors">{career.title}</h3>
                      <span className="bg-[#d0dbd4] text-[#044d1d] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-center">{career.department}</span>
                    </div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">
                      {career.location} • {career.type}
                    </div>
                    <p className="text-gray-600 mb-8 leading-relaxed text-sm">{career.description}</p>
                  </div>
                  <button
                    onClick={() => handleApplyClick(career)}
                    className="w-full bg-transparent border-2 border-[#044d1d] text-[#044d1d] hover:bg-[#044d1d] hover:text-white px-6 py-3 font-bold tracking-[0.15em] transition-all uppercase text-xs rounded-sm"
                  >
                    Apply Now
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500">
                <p className="text-xl font-serif">No careers found matching your criteria.</p>
                <button
                  onClick={() => { setSearchKeyword(''); setSearchLocation(''); setActiveCategory(null); }}
                  className="mt-4 text-[#92141f] font-bold uppercase tracking-widest text-xs hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {applyingFor && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-md shadow-2xl relative">
            <button
              onClick={() => setApplyingFor(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none"
            >
              &times;
            </button>
            <div className="p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#059669] text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✓</div>
                  <h3 className="font-serif text-[#044d1d] text-3xl font-bold mb-4">Application Submitted!</h3>
                  <p className="text-gray-600">Thank you for applying for the <strong>{applyingFor.title}</strong> position. We will be in touch soon.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="font-serif text-[#044d1d] text-3xl font-bold mb-2">Apply for {applyingFor.title}</h3>
                    <p className="text-gray-500 text-sm">{applyingFor.location} • {applyingFor.type}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name *</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-[#044d1d]" placeholder="Jane Doe" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-[#044d1d]" placeholder="jane@example.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone Number *</label>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-[#044d1d]" placeholder="(555) 123-4567" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">CNIC / ID Number *</label>
                        <input type="text" name="cnic" required value={formData.cnic} onChange={handleInputChange} className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-[#044d1d]" placeholder="XXXXX-XXXXXXX-X" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Questionnaire: Why do you want to join our team? *</label>
                      <textarea name="questionnaire" required value={formData.questionnaire} onChange={handleInputChange} rows="3" className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-[#044d1d]" placeholder="Tell us about your experience and passion..." />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-gray-100 pt-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Upload CV (PDF, DOC) *</label>
                        <input type="file" name="cv" required onChange={handleInputChange} accept=".pdf,.doc,.docx" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:uppercase file:bg-[#d0dbd4] file:text-[#044d1d] hover:file:bg-[#b0c4ba] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Profile Image *</label>
                        <input type="file" name="image" required onChange={handleInputChange} accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:uppercase file:bg-[#d0dbd4] file:text-[#044d1d] hover:file:bg-[#b0c4ba] transition-colors" />
                      </div>
                    </div>

                    <div className="pt-6">
                      <button type="submit" className="w-full bg-[#92141f] hover:bg-[#b30c15] text-white py-4 rounded-sm font-bold tracking-[0.15em] uppercase text-xs transition-colors shadow-lg">
                        Submit Application
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Premium Alternate Grid */}
      <section className="px-6 md:px-12 py-32 max-w-[1440px] mx-auto space-y-32">

        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-center gap-16 group">
          <div className="w-full md:w-1/2 overflow-hidden rounded-sm shadow-2xl relative">
            <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop" alt="Chefs" className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#044d1d]/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          <div className="w-full md:w-1/2 md:px-8 text-center md:text-left">
            <span className="text-[#92141f] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Development</span>
            <h3 className="font-serif text-[#044d1d] text-4xl md:text-5xl font-bold mb-8">Master Your Craft.</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Our culinary and management teams are passionate about training and developing talent. You will refine your skills in a high-energy, from-scratch kitchen under the guidance of industry leaders, with a clear path to advance your career.
            </p>
            <a href="#" className="inline-flex items-center text-[#044d1d] font-bold uppercase tracking-[0.15em] text-xs hover:text-[#92141f] transition-colors group/link border-b border-transparent hover:border-[#92141f] pb-1">
              Explore Training
              <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16 group">
          <div className="w-full md:w-1/2 overflow-hidden rounded-sm shadow-2xl relative">
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" alt="Server" className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#044d1d]/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          <div className="w-full md:w-1/2 md:px-8 text-center md:text-left">
            <span className="text-[#92141f] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Culture</span>
            <h3 className="font-serif text-[#044d1d] text-4xl md:text-5xl font-bold mb-8">An Inclusive Environment.</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              We celebrate diversity and foster an inclusive culture where every team member feels respected, supported, and empowered to deliver their best. True hospitality starts from within.
            </p>
            <a href="#" className="inline-flex items-center text-[#044d1d] font-bold uppercase tracking-[0.15em] text-xs hover:text-[#92141f] transition-colors group/link border-b border-transparent hover:border-[#92141f] pb-1">
              Our Culture
              <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

      </section>

      {/* Awards Section */}
      <section className="bg-[#044d1d] py-32 text-center px-6 border-y border-[#065f24]">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-serif text-white text-4xl md:text-5xl font-bold mb-6">Recognized for Excellence</h2>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d0dbd4] mb-20">
            Honored by the industry's most prestigious organizations year after year.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24">
            <div className="flex flex-col items-center group">
              <div className="w-32 h-32 bg-[#065f24] rounded-full flex flex-col items-center justify-center text-white font-bold text-xl mb-8 shadow-2xl border border-[#d0dbd4]/30 transform group-hover:scale-110 transition-transform duration-500">
                <span>FORBES</span>
                <span className="text-3xl leading-none font-serif font-light mt-1 text-[#d0dbd4]">Top</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-center text-gray-300">Top Employers<br />in Hospitality</span>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-32 h-32 bg-[#92141f] rounded-full flex flex-col items-center justify-center text-white font-bold text-xl mb-8 shadow-2xl border border-white/30 transform group-hover:scale-110 transition-transform duration-500">
                <span>GREAT</span>
                <span className="font-serif font-light mt-1">Place</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-center text-gray-300">Great Place<br />To Work Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Manager Spotlight */}
      <section className="py-32 px-6 bg-[#F2F2F2] overflow-hidden">
        <div className="max-w-[1440px] mx-auto relative">

          <div className="bg-white rounded-sm p-12 md:p-20 flex flex-col md:flex-row items-center relative overflow-hidden shadow-xl border border-gray-100">
            {/* Decorative Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#92141f]/5 to-transparent rounded-bl-full pointer-events-none"></div>

            <div className="w-full md:w-1/3 flex justify-center md:justify-start mb-12 md:mb-0 relative z-10">
              <div className="relative group">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" alt="Sarah J." className="w-64 h-64 md:w-80 md:h-80 object-cover shadow-2xl rounded-sm filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute -bottom-6 -right-6 bg-[#044d1d] text-[#d0dbd4] p-6 shadow-xl rounded-sm font-serif italic text-2xl">
                  Sarah J.
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 md:pl-20 relative z-10 text-center md:text-left">
              <h3 className="text-[#92141f] font-bold uppercase tracking-[0.2em] text-xs mb-6">Executive Chef Spotlight</h3>
              <p className="font-serif text-[#044d1d] text-3xl md:text-4xl leading-snug italic mb-10">
                "The standard of excellence here is unparalleled. With over 250 menu items made fresh from scratch every day, our kitchens are a true masterclass in culinary precision and teamwork."
              </p>
              <span className="text-gray-500 font-bold uppercase tracking-[0.15em] text-xs">— Sarah J., Executive Kitchen Manager</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-32 bg-[#92141f] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Background" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <span className="text-[#d0dbd4] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Behind The Scenes</span>
          <h2 className="font-serif text-5xl font-bold mb-8">The Cheesecake Factory Standard</h2>
          <p className="text-gray-300 text-xl mb-16">Witness the passion, energy, and precision that defines our kitchens every single day.</p>

          <div className="relative group cursor-pointer w-full max-w-4xl mx-auto rounded-sm overflow-hidden shadow-2xl border border-gray-700 hover:border-gray-500 transition-colors">
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop" className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" alt="Video thumbnail" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                <Play className="text-white ml-2" size={48} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer Search */}
      <section className="bg-[#044d1d] py-24 px-6 md:px-12 text-center text-white border-t border-[#044d1d]">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] mb-12 font-serif text-[#d0dbd4]">Begin Your Legacy</h2>
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-6 bg-white/5 p-4 rounded-sm backdrop-blur-sm border border-white/10 shadow-2xl">
          <input
            type="text"
            placeholder="Job Title or Keyword"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="flex-1 p-5 rounded-sm bg-white/10 border border-white/20 text-white focus:outline-none focus:bg-white/20 transition-colors placeholder-gray-300"
          />
          <input
            type="text"
            placeholder="City, State, or Zip Code"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="flex-1 p-5 rounded-sm bg-white/10 border border-white/20 text-white focus:outline-none focus:bg-white/20 transition-colors placeholder-gray-300"
          />
          <button
            onClick={() => {
              document.getElementById('openings-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#92141f] hover:bg-[#b30c15] text-white px-16 py-5 rounded-sm font-bold tracking-[0.15em] uppercase text-xs transition-colors shadow-lg">
            Search
          </button>
        </div>
      </section>
    </div>
  );
}
