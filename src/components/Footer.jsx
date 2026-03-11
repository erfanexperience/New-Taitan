import { asset } from '../lib/assets';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col footer-brand">
          <img src={asset('Assests/logo - footer.png')} alt="TAITAN" className="footer-logo" />
          <p className="footer-copyright">©2026 Taitan Global</p>
        </div>
        <div className="footer-col footer-locations">
          <h3 className="footer-heading">Our Locations</h3>
          <div className="footer-location">
            <img src={asset('Assests/Footer - US.png')} alt="" className="footer-flag" />
            <div>
              <p className="footer-address">3911 Stevens Creek Blvd. Suite 204, Santa Clara, CA 95051</p>
              <p className="footer-phone">+1 408 605 2489</p>
            </div>
          </div>
          <div className="footer-location">
            <img src={asset('Assests/Footer - KSA.png')} alt="" className="footer-flag" />
            <div>
              <p className="footer-address">Level 29, Olaya Towers Tower B, Riyadh, Saudi Arabia</p>
              <p className="footer-phone">+966 56 775 9338</p>
            </div>
          </div>
        </div>
        <div className="footer-col footer-contact">
          <h3 className="footer-heading">Contact Us</h3>
          <p className="footer-email"><a href="mailto:Info@titanglobal.ai">Info@titanglobal.ai</a></p>
          <p className="footer-links">
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://linkedin.com/company/taitan" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
