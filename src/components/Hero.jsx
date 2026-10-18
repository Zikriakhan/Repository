import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Award, UtensilsCrossed, Star, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

const HERO_PLAYLIST = [
  {
    id: 1,
    label: 'Clip 1',
    name: 'Artisan Wood-Fired Oven',
    src: 'https://res.cloudinary.com/um3irlrh/video/upload/v1792044052/Screen_Recording_10-15-2026_10-37-29_AM_yijxxi_audbr6.mp4'
  },
];

const Hero = () => {
  const { data } = useAdminData();
  const promo = data?.promos?.find(p => p.name === 'Hero') || {};
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Derive active playlist from API promo or fallback
  let activePlaylist = [];

  if (Array.isArray(promo.playlist) && promo.playlist.length > 0) {
    const validClips = promo.playlist.filter(item => item && item.src);
    if (validClips.length > 0) {
      activePlaylist = validClips;
    }
  }

  // If promo has videoUrl and it's not yet in activePlaylist, prioritize it
  if (promo.videoUrl) {
    if (activePlaylist.length === 0) {
      activePlaylist = [{ id: 1, label: 'Hero Video', name: promo.title || 'Artisan Scene', src: promo.videoUrl }];
    } else if (!activePlaylist.some(clip => clip.src === promo.videoUrl)) {
      activePlaylist = [
        { id: 1, label: 'Clip 1', name: promo.title || 'Main Video', src: promo.videoUrl },
        ...activePlaylist
      ];
    }
  }

  if (activePlaylist.length === 0) {
    activePlaylist = HERO_PLAYLIST;
  }

  const currentItem = activePlaylist[currentVideoIndex % activePlaylist.length] || activePlaylist[0];
  const currentVideoSrc = currentItem?.src || promo.videoUrl || HERO_PLAYLIST[0].src;

  // Ensure autoplay and loop functionality work seamlessly across all browsers
  useEffect(() => {
    const video = videoRef.current;
    if (video && currentVideoSrc) {
      video.muted = isMuted;
      video.defaultMuted = isMuted;
      try {
        video.load();
      } catch (e) { }

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log('Autoplay handled:', err);
            // If browser autoplay policy requires mute, enforce mute and play
            if (video) {
              video.muted = true;
              setIsMuted(true);
              video.play().then(() => setIsPlaying(true)).catch(() => { });
            }
          });
      }
    }
  }, [currentVideoSrc, isMuted]);

  // Handle seamless video loop / sequence playback
  const handleVideoEnded = () => {
    if (activePlaylist.length > 1) {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % activePlaylist.length);
    } else if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch((err) => console.log('Loop play error:', err));
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const navigateTo = (e, path) => {
    e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <section id="hero" className="relative w-full min-h-[90vh] lg:min-h-[95vh] overflow-hidden flex items-center pt-28 pb-20 md:py-36 bg-black">

      {/* Background Running Video with Autoplay and Seamless Loop */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          ref={videoRef}
          key={currentVideoSrc}
          src={currentVideoSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleVideoEnded}
          onError={(e) => console.warn('Hero video load notice for:', currentVideoSrc, e)}
          poster={promo.imageUrl || "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1920&auto=format&fit=crop"}
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-75 filter brightness-[0.85] contrast-[1.08] transition-opacity duration-1000"
        />

        {/* Ambient Dark & Warm Amber Overlay Gradients - Enhanced for Professional Navbar Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 z-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--theme-accent,#c69214)]/15 rounded-full blur-3xl pointer-events-none z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-20" style={{ top: "2rem" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Premium Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            {/* Top Trending Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mb-6 animate-fade-down">
              <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[11px] md:text-xs font-extrabold tracking-[0.25em] uppercase text-amber-300">
                Over 26 Years of Tradition • Serving Sharjah Since 1999
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl xl:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6 drop-shadow-xl" dangerouslySetInnerHTML={{
              __html: promo.title || `Welcome To <br />
              <span className="italic font-normal text-amber-400 relative inline-block">
                Italian Pizza Kawkab
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-400/50" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 9.5C50 2.5 150 2.5 198 9.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>`}}>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 text-lg sm:text-xl md:text-2xl font-light mb-8 max-w-xl leading-relaxed drop-shadow-md">
              {promo.description || <>Italian Pizza Kawkab has been serving the Sharjah community since 1999, building a legacy of great taste, wood-fired authenticity, and unforgettable memories for more than 26 years.</>}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
              <button
                onClick={(e) => navigateTo(e, '/BrowseMenu')}
                className="bg-[var(--theme-accent,#c69214)] hover:bg-amber-500 text-white font-serif px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs md:text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                <span>Explore Over 30 Flavors</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={(e) => navigateTo(e, '/order')}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/40 px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-xs md:text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <UtensilsCrossed size={18} className="text-amber-400" />
                <span>Order Online Now</span>
              </button>
            </div>

            {/* Key Feature Stats Bar */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-6 border-t border-white/20 w-full max-w-lg">
              <div>
                <div className="font-serif text-2xl md:text-3xl font-extrabold text-white">30+</div>
                <div className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-300 mt-0.5">Legendary Flavors</div>
              </div>
              <div className="border-l border-white/20 pl-4 md:pl-8">
                <div className="font-serif text-2xl md:text-3xl font-extrabold text-white">450°C</div>
                <div className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-300 mt-0.5">Wood-Fired Bake</div>
              </div>
              <div className="border-l border-white/20 pl-4 md:pl-8">
                <div className="font-serif text-2xl md:text-3xl font-extrabold text-amber-400">4.9★</div>
                <div className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-300 mt-0.5">Guest Favorite</div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] text-gray-400 mt-8 max-w-lg leading-normal italic">
              Authentic Wood-Fired Crust &amp; Fresh Mozzarella • Dine-in &amp; Online Delivery in Sharjah.
            </p>
          </div>

          {/* Right Column: Live Ambient Kitchen & Crust Showcase Badge */}

        </div>
      </div>

      {/* Interactive Background Video Control Bar (Auto-Play & Loop Controls) */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-2 rounded-full shadow-2xl transition-all duration-300 hover:bg-black/80">
        <button
          type="button"
          onClick={togglePlayPause}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-amber-400 hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer"
          title={isPlaying ? "Pause Video" : "Play Video"}
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-amber-400 hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        {/* Live Auto-Loop Status Indicator */}
        <div className="flex items-center gap-1.5 pl-1.5 pr-2 border-l border-white/20 select-none">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-300 hidden sm:inline">
            {isPlaying ? 'Auto-Looping' : 'Paused'}
          </span>
        </div>

        {/* Multi-Clip Playlist Switcher (if more than 1 clip) */}
        {activePlaylist.length > 1 && (
          <div className="flex items-center gap-1 pl-2 border-l border-white/20">
            {activePlaylist.map((clip, index) => {
              const isActive = (currentVideoIndex % activePlaylist.length) === index;
              return (
                <button
                  key={clip.id || index}
                  type="button"
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-black shadow-md scale-105'
                      : 'bg-white/10 hover:bg-white/25 text-gray-300'
                  }`}
                  title={clip.name || clip.label || `Clip ${index + 1}`}
                >
                  {clip.label || `Clip ${index + 1}`}
                </button>
              );
            })}
          </div>
        )}
      </div>

    </section>
  );
};

export default Hero;
