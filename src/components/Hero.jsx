import { useEffect, useState } from 'react';
import { asset } from '../lib/assets';
import SiteNavbar from './SiteNavbar';

export default function Hero({ navOpen, setNavOpen }) {
  const [showMobileHeroAlt, setShowMobileHeroAlt] = useState(false);
  const mobileTitle = 'TAITAN';
  const [typedTitle, setTypedTitle] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [dotOn, setDotOn] = useState(true);

  useEffect(() => {
    // Only animate the hero image swap on mobile screens.
    const mql = window.matchMedia('(max-width: 768px)');
    if (!mql.matches) return;

    const timeoutId = window.setTimeout(() => {
      setShowMobileHeroAlt(true);
    }, 3000);

    const handleChange = (e) => {
      if (!e.matches) {
        window.clearTimeout(timeoutId);
        setShowMobileHeroAlt(false);
      }
    };

    // Support older browsers with addListener/removeListener fallback.
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handleChange);
      return () => {
        window.clearTimeout(timeoutId);
        mql.removeEventListener('change', handleChange);
      };
    }

    mql.addListener(handleChange);
    return () => {
      window.clearTimeout(timeoutId);
      mql.removeListener(handleChange);
    };
  }, []);

  useEffect(() => {
    // Typing animation for the mobile hero heading only.
    const mql = window.matchMedia('(max-width: 768px)');
    let typingIntervalId = null;
    let dotIntervalId = null;

    const stopTyping = () => {
      if (typingIntervalId) window.clearInterval(typingIntervalId);
      if (dotIntervalId) window.clearInterval(dotIntervalId);
      typingIntervalId = null;
      dotIntervalId = null;

      setTypedTitle(mobileTitle);
      setTypingDone(true);
      setDotOn(false);
    };

    const startTyping = () => {
      if (typingIntervalId) window.clearInterval(typingIntervalId);
      if (dotIntervalId) window.clearInterval(dotIntervalId);
      typingIntervalId = null;
      dotIntervalId = null;

      setTypedTitle('');
      setTypingDone(false);
      setDotOn(true);

      let index = 0;
      typingIntervalId = window.setInterval(() => {
        index += 1;
        setTypedTitle(mobileTitle.slice(0, index));

        if (index >= mobileTitle.length) {
          window.clearInterval(typingIntervalId);
          typingIntervalId = null;
          setTypingDone(true);

          dotIntervalId = window.setInterval(() => {
            setDotOn((v) => !v);
          }, 450);
        }
      }, 120);
    };

    const handleChange = (e) => {
      if (e.matches) startTyping();
      else stopTyping();
    };

    if (mql.matches) startTyping();
    else stopTyping();

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handleChange);
      return () => {
        mql.removeEventListener('change', handleChange);
        if (typingIntervalId) window.clearInterval(typingIntervalId);
        if (dotIntervalId) window.clearInterval(dotIntervalId);
      };
    }

    mql.addListener(handleChange);
    return () => {
      mql.removeListener(handleChange);
      if (typingIntervalId) window.clearInterval(typingIntervalId);
      if (dotIntervalId) window.clearInterval(dotIntervalId);
    };
  }, []);

  return (
    <header className="hero" role="banner">
      <div className="hero-inner">
        <div className="hero-bg-wrap">
          <img src={asset('Assests/Web-Hero-BG - 5.webp')} alt="" className="hero-bg hero-bg-desktop" />
          <img
            src={asset('Assests/Mobile - hero - 3.webp')}
            alt=""
            className={`hero-bg hero-bg-mobile hero-bg-mobile-img ${
              showMobileHeroAlt ? 'hero-bg-mobile-img--hidden' : 'hero-bg-mobile-img--shown'
            }`}
          />
          <img
            src={asset('Assests/Mobile - hero - 4.webp')}
            alt=""
            className={`hero-bg hero-bg-mobile hero-bg-mobile-img ${
              showMobileHeroAlt ? 'hero-bg-mobile-img--shown' : 'hero-bg-mobile-img--hidden'
            }`}
          />
        </div>

        <SiteNavbar navOpen={navOpen} setNavOpen={setNavOpen} />

        <div className="hero-content-wrap">
          <div className="hero-content">
            <h1 className="hero-heading">
              <span className="hero-heading-desktop">
                <span className="hero-heading-line1">Built to Bridge.</span>
                <span className="hero-heading-line2">Driven to Deliver.</span>
              </span>
              <span className="hero-heading-mobile">
                <span className="hero-typing-text">{typedTitle}</span>
                <span
                  className={`hero-typing-dot ${
                    typingDone ? (dotOn ? 'hero-typing-dot--on' : 'hero-typing-dot--off') : 'hero-typing-dot--off'
                  }`}
                  aria-hidden="true"
                >
                  .
                </span>
              </span>
            </h1>
            <p className="hero-subheading hero-subheading-desktop">
              Connecting Capital, Strategy & Execution — From San Francisco to Riyadh.
            </p>
            <p className="hero-subheading hero-subheading-mobile">
              The partner of choice for
              <br />
              enterprises in <span className="country-saudi">Saudi Arabia</span> and the
              <br />
              <span className="country-us">United States</span>.
            </p>
            {/* LinkedIn CTA removed (desktop) */}
          </div>
        </div>
      </div>
    </header>
  );
}
