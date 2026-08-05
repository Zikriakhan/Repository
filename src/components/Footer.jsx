import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer style={{ background: 'linear-gradient(180deg, #0a2e14 0%, #061a0c 100%)' }} className="text-white pt-20 pb-0 border-t-4 border-[var(--theme-accent)]">

      {/* ── Main Grid ─────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-white/10">

          {/* ── Column 1: Brand ── */}
          <div className="flex flex-col gap-6">
            {/* Logo card — white bg ensures max contrast */}
            <div className="inline-flex w-fit bg-white px-5 py-3 rounded-lg shadow-lg">
              <img
                src="/logo.png"
                alt="The Cheesecake Factory"
                className="h-14 w-auto object-contain"
              />
            </div>

            <p style={{ color: '#b8ccbe', lineHeight: '1.75' }} className="text-sm">
              Over 250 dishes crafted fresh from scratch daily, plus 30+ legendary cheesecakes.
              Something extraordinary for everyone.
            </p>

            {/* Social links — accessible icon buttons with visible labels */}
            <div className="flex gap-3 ">
              {[
                {
                  label: 'Facebook',
                  href: '#',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  label: 'X/Twitter',
                  href: '#',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  href: '#',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#b8ccbe' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#92141f';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = '#b8ccbe';
                  }}
                >
                  {icon}
                  <span className="hidden sm:inline">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Discover ── */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: '#d4b896' }}>
              Discover
            </h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {[
                  { label: 'Browse Menu', href: '/BrowseMenu' },
                  { label: 'Locations', href: '/locations' },
                  { label: 'Gift Cards', href: '/gift-cards' },
                  { label: 'Cheesecake Rewards®', href: '/rewards' },
                  { label: 'Catering', href: '/catering' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="flex items-center gap-2 text-sm transition-all duration-200 group"
                      style={{ color: '#b8ccbe' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#b8ccbe'; }}
                    >
                      <span
                        className="w-0 h-px transition-all duration-300 group-hover:w-4"
                        style={{ background: 'var(--theme-accent)', display: 'inline-block' }}
                      />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Column 3: Contact ── */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: '#d4b896' }}>
              Contact &amp; Support
            </h4>
            <ul className="space-y-4">
              {/* Address */}
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0" style={{ color: 'var(--theme-accent)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <address className="not-italic text-sm leading-relaxed" style={{ color: '#b8ccbe' }}>
                  26901 Malibu Hills Road<br />
                  Calabasas Hills, CA 91301
                </address>
              </li>

              {/* Phone */}
              <li className="flex gap-3 items-center">
                <span className="shrink-0" style={{ color: 'var(--theme-accent)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <a
                  href="tel:+18188713000"
                  className="text-sm font-semibold transition-colors duration-200"
                  style={{ color: '#b8ccbe' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#b8ccbe'}
                >
                  (818) 871-3000
                </a>
              </li>

              {/* Email */}
              <li className="flex gap-3 items-start">
                <span className="shrink-0 mt-0.5" style={{ color: 'var(--theme-accent)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <a
                  href="mailto:guestrelations@thecheesecakefactory.com"
                  className="text-sm transition-colors duration-200 break-all leading-snug"
                  style={{ color: '#b8ccbe' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#b8ccbe'}
                >
                  guestrelations@<wbr />thecheesecakefactory.com
                </a>
              </li>

              {/* Hours */}
              <li className="flex gap-3 items-start mt-1">
                <span className="shrink-0 mt-0.5" style={{ color: 'var(--theme-accent)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed" style={{ color: '#b8ccbe' }}>
                  Mon–Thu: 11am – 11pm<br />
                  Fri–Sun: 11am – 12:30am
                </span>
              </li>
            </ul>
          </div>

          {/* ── Column 4: Newsletter ── */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: '#d4b896' }}>
              Stay Connected
            </h4>

            {/* Benefit chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {['🎂 Free Birthday Slice', '🎁 Exclusive Offers', '🍰 New Menu Alerts'].map(chip => (
                <span
                  key={chip}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#b8ccbe' }}
                >
                  {chip}
                </span>
              ))}
            </div>

            {subscribed ? (
              /* ── Success state ── */
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold"
                style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                You're subscribed — welcome to the family!
              </div>
            ) : (
              /* ── Input form ── */
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <label htmlFor="footer-email" className="sr-only">Email address</label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full text-sm px-4 py-3 rounded-lg focus:outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1.5px solid rgba(255,255,255,0.15)',
                      color: '#ffffff',
                    }}
                    onFocus={e => {
                      e.target.style.border = '1.5px solid var(--theme-accent)';
                      e.target.style.background = 'rgba(255,255,255,0.12)';
                    }}
                    onBlur={e => {
                      e.target.style.border = '1.5px solid rgba(255,255,255,0.15)';
                      e.target.style.background = 'rgba(255,255,255,0.08)';
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-sm font-bold tracking-[0.1em] uppercase transition-all duration-200 active:scale-95"
                  style={{ background: '#92141f', color: '#ffffff' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Join Cheesecake Rewards®
                </button>
                <p className="text-xs" style={{ color: 'rgba(184,204,190,0.6)' }}>
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6">
          <p className="text-xs order-2 sm:order-1" style={{ color: 'rgba(184,204,190,0.55)' }}>
            © 2026 The Cheesecake Factory Incorporated. All Rights Reserved.
          </p>

          <nav aria-label="Legal links" className="flex items-center gap-1 order-1 sm:order-2">
            {['Privacy Policy', 'Terms of Use', 'Accessibility'].map((item, idx, arr) => (
              <React.Fragment key={item}>
                <a
                  href="#"
                  className="text-xs px-2 py-1 rounded transition-colors duration-150"
                  style={{ color: 'rgba(184,204,190,0.55)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(184,204,190,0.55)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {item}
                </a>
                {idx < arr.length - 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
