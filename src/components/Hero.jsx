import { useEffect, useState } from 'react';
import { asset } from '../lib/assets';
import SiteNavbar from './SiteNavbar';

export default function Hero({ navOpen, setNavOpen }) {
  const [showMobileHeroAlt, setShowMobileHeroAlt] = useState(false);

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
                <span className="hero-heading-line1">AI Mission</span>
                <span className="hero-heading-line2">Command</span>
              </span>
              <span className="hero-heading-mobile">TAITAN</span>
            </h1>
            <p className="hero-subheading hero-subheading-desktop">
              Total AI Transformation, Acceleration & Navigation – From Strategy To Execution.
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
