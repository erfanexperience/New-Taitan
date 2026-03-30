import { useEffect, useLayoutEffect, useState } from 'react';
import { asset } from '../lib/assets';
import SiteNavbar from './SiteNavbar';

const DESKTOP_TYPE_TEXT = 'TAITAN';
const TYPE_MS = 185;
const START_DELAY_MS = 280;
const AFTER_TYPE_PAUSE_MS = 1200;

export default function Hero({ navOpen, setNavOpen, desktopIntroEnabled = false }) {
  const [showDesktopHeroAlt, setShowDesktopHeroAlt] = useState(false);
  const [desktopHeadPhase, setDesktopHeadPhase] = useState('idle'); // idle | typing | main
  const [typedHero, setTypedHero] = useState('');

  /* Desktop: keep hero tall + hide Discover until typing finishes */
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 769px)');
    const handleChange = (e) => {
      if (!e.matches) {
        setShowDesktopHeroAlt(false);
        document.documentElement.dataset.desktopHeroStage = 'tall';
        setDesktopHeadPhase('idle');
        setTypedHero('');
      }
    };

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handleChange);
      return () => mql.removeEventListener('change', handleChange);
    }
    mql.addListener(handleChange);
    return () => mql.removeListener(handleChange);
  }, []);

  /* Desktop: init tall before intro sequence */
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 769px)');
    if (mql.matches) {
      document.documentElement.dataset.desktopHeroStage = 'tall';
      setShowDesktopHeroAlt(false);
    }
  }, []);

  /* Desktop intro: type TAITAN → pause → shrink brand + hero + Discover + show partner lines */
  useLayoutEffect(() => {
    if (!desktopIntroEnabled) return undefined;

    const mql = window.matchMedia('(min-width: 769px)');
    if (!mql.matches) return undefined;

    let cancelled = false;
    let timeoutId = null;

    const clearTimer = () => {
      if (timeoutId != null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      document.documentElement.dataset.desktopHeroStage = 'main';
      setShowDesktopHeroAlt(true);
      setDesktopHeadPhase('main');
      setTypedHero(DESKTOP_TYPE_TEXT);
      return undefined;
    }

    document.documentElement.dataset.desktopHeroStage = 'tall';
    setShowDesktopHeroAlt(false);
    setDesktopHeadPhase('typing');
    setTypedHero('');

    const text = DESKTOP_TYPE_TEXT;
    let i = 0;

    const step = () => {
      if (cancelled) return;
      i += 1;
      setTypedHero(text.slice(0, i));
      if (i >= text.length) {
        timeoutId = window.setTimeout(() => {
          if (cancelled) return;
          setShowDesktopHeroAlt(true);
          document.documentElement.dataset.desktopHeroStage = 'main';
          setDesktopHeadPhase('main');
        }, AFTER_TYPE_PAUSE_MS);
        return;
      }
      timeoutId = window.setTimeout(step, TYPE_MS);
    };

    timeoutId = window.setTimeout(step, START_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimer();
    };
  }, [desktopIntroEnabled]);

  return (
    <header className={`hero ${showDesktopHeroAlt ? 'hero--desktop-normal' : 'hero--desktop-tall'}`} role="banner">
      <div className="hero-inner">
        <div className="hero-bg-wrap">
          <img
            src={asset('Assests/Web-Hero-BG - 5.webp')}
            alt=""
            className="hero-bg hero-bg-desktop hero-bg-desktop-static"
          />
          <img
            src={asset('Assests/Mobile - hero - 4.webp')}
            alt=""
            className="hero-bg hero-bg-mobile hero-bg-mobile-static"
          />
        </div>

        <SiteNavbar navOpen={navOpen} setNavOpen={setNavOpen} />

        <div className="hero-content-wrap">
          <div className="hero-content">
            <h1 className="hero-heading">
              <span className="hero-heading-desktop">
                {desktopHeadPhase === 'typing' || desktopHeadPhase === 'main' ? (
                  <>
                    <span
                      className={`hero-heading-desktop-brand ${
                        desktopHeadPhase === 'main'
                          ? 'hero-heading-desktop-brand--settled'
                          : 'hero-heading-desktop-brand--typing'
                      }`}
                      {...(desktopHeadPhase === 'typing' ? { 'aria-live': 'polite' } : {})}
                    >
                      {desktopHeadPhase === 'typing' ? typedHero : 'TAITAN'}
                      {desktopHeadPhase === 'typing' &&
                      typedHero.length < DESKTOP_TYPE_TEXT.length ? (
                        <span className="hero-heading-desktop-brand-cursor" aria-hidden="true">
                          |
                        </span>
                      ) : null}
                    </span>
                    {desktopHeadPhase === 'main' ? (
                      <>
                        <span className="hero-heading-desktop-block hero-heading-desktop-block--lead hero-heading-desktop-block--reveal">
                          <span className="hero-heading-desktop-line hero-heading-desktop-line--part1">
                            The Partner Of Choice For Enterprises
                          </span>
                        </span>
                        <span className="hero-heading-desktop-block hero-heading-desktop-block--tail hero-heading-desktop-block--reveal">
                          In Saudi Arabia And The United States.
                        </span>
                      </>
                    ) : null}
                  </>
                ) : null}
              </span>
              <span className="hero-heading-mobile">TAITAN</span>
            </h1>
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
