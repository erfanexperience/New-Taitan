import { asset } from '../lib/assets';
import SiteNavbar from './SiteNavbar';

export default function Hero({ navOpen, setNavOpen }) {
  return (
    <header className="hero" role="banner">
      <div className="hero-inner">
        <div className="hero-bg-wrap">
          <img src={asset('Assests/Web-Hero-BG - 5.webp')} alt="" className="hero-bg hero-bg-desktop" />
          <img src={asset('Assests/Mobile - hero - 4.webp')} alt="" className="hero-bg hero-bg-mobile" />
        </div>

        <SiteNavbar navOpen={navOpen} setNavOpen={setNavOpen} />

        <div className="hero-content-wrap">
          <div className="hero-content">
            <h1 className="hero-heading">
              <span className="hero-heading-line1">AI Mission</span>
              <span className="hero-heading-line2">Command</span>
            </h1>
            <p className="hero-subheading">
              Total AI Transformation, Acceleration & Navigation – From Strategy To Execution.
            </p>
            {/* LinkedIn CTA removed (desktop) */}
          </div>
        </div>
      </div>
    </header>
  );
}
