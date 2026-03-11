import { asset } from '../lib/assets';

const LOGOS = [
  { name: 'Oracle', src: 'Assests/logo - Oracle.png' },
  { name: 'Tableau', src: 'Assests/Logo - Tablau.png' },
  { name: 'SolidWorks', src: 'Assests/Logo - Solid Works.png' },
  { name: 'Panasonic', src: 'Assests/Logo - Panasonic.png' },
  { name: 'Motorola', src: 'Assests/Logo - Motorola.png' },
  { name: 'Cisco', src: 'Assests/Logo - Cisco.png' },
];

export default function PartnersLogos() {
  return (
    <section className="partners-logos" id="partners">
      <div className="partners-logos-inner">
        <h2 className="partners-logos-title">Our leadership team has partnered with:</h2>
        <div className="partners-logos-grid">
          {LOGOS.map((logo) => (
            <a key={logo.name} href="#" className="partners-logo" aria-label={logo.name}>
              <img src={asset(logo.src)} alt={logo.name} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
