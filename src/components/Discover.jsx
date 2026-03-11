import { asset } from '../lib/assets';

export default function Discover() {
  return (
    <section className="discover" id="discover">
      <div className="discover-inner">
        <img src={asset('Assests/KSA-Flag.webp')} alt="" className="discover-flag discover-flag-left" />
        <div className="discover-text-wrap">
          <p className="discover-text">
            TAITAN Global is the AI partner of choice for enterprises in
          </p>
          <p className="discover-countries">
            <span className="country-saudi">Saudi Arabia</span> and the <span className="country-us">United States</span>
          </p>
        </div>
        <img src={asset('Assests/US-Flag.webp')} alt="" className="discover-flag discover-flag-right" />
      </div>
    </section>
  );
}
