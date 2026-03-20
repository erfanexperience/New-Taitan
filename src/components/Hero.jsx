import { useState } from 'react';
import { asset } from '../lib/assets';

export default function Hero({ navOpen, setNavOpen }) {
  return (
    <header className="hero" role="banner">
      <div className="hero-inner">
        <div className="hero-bg-wrap">
          <img src={asset('Assests/Web-Hero-BG - 2.webp')} alt="" className="hero-bg hero-bg-desktop" />
          <img src={asset('Assests/Mobile - hero - 2.webp')} alt="" className="hero-bg hero-bg-mobile" />
        </div>

        <nav className={`navbar ${navOpen ? 'navbar--open' : ''}`} aria-label="Main navigation">
          <img src={asset('Assests/left.webp')} alt="TAITAN" className="navbar-left-img" />
          <button
            type="button"
            className="navbar-toggle"
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            onClick={() => setNavOpen(!navOpen)}
          >
            <span className="navbar-toggle-bar" />
            <span className="navbar-toggle-bar" />
            <span className="navbar-toggle-bar" />
          </button>
          <div className="navbar-segment navbar-menu-segment">
            <ul className="navbar-menu">
              <li><a href="#team" onClick={() => setNavOpen(false)}>Our Team</a></li>
              <li><a href="#services" onClick={() => setNavOpen(false)}>Services</a></li>
              <li><a href="#partnership" onClick={() => setNavOpen(false)}>Partnership</a></li>
              <li><a href="#contact" onClick={() => setNavOpen(false)}>Contact</a></li>
            </ul>
          </div>
        </nav>

        <div className="hero-content-wrap">
          <div className="hero-content">
            <h1 className="hero-heading">
              <span className="hero-heading-line1">AI Mission</span>
              <span className="hero-heading-line2">Command</span>
            </h1>
            <p className="hero-subheading">
              Total AI Transformation, Acceleration & Navigation – From Strategy To Execution.
            </p>
            <div className="hero-cta">
              <img src={asset('Assests/Web-Linkedin.png')} alt="" className="cta-linkedin" />
              <div className="cta-text">
                <span className="cta-line1">See what we're building</span>
                <a href="https://linkedin.com/company/taitan" className="cta-link" target="_blank" rel="noopener noreferrer">Let's connect</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
