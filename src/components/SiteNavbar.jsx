import { Link } from 'react-router-dom';
import { asset } from '../lib/assets';

export default function SiteNavbar({
  navOpen,
  setNavOpen,
  logoSrc = 'Assests/left.webp',
  variant = 'default',
}) {
  const isTeam = variant === 'team';

  return (
    <nav
      className={`navbar ${navOpen ? 'navbar--open' : ''} ${isTeam ? 'navbar--team' : ''}`}
      aria-label="Main navigation"
    >
      <Link
        to="/"
        className="navbar-logo-link"
        aria-label="TAITAN Home"
        onClick={() => setNavOpen(false)}
      >
        <img src={asset(logoSrc)} alt="TAITAN" className="navbar-left-img" />
      </Link>
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
          <li>
            <Link to="/team" onClick={() => setNavOpen(false)}>
              Our Team
            </Link>
          </li>
          <li>
            <Link to={{ pathname: '/', hash: 'who-we-are' }} onClick={() => setNavOpen(false)}>
              Who We Are
            </Link>
          </li>
          <li>
            <Link to={{ pathname: '/', hash: 'contact' }} onClick={() => setNavOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
