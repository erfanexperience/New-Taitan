import { asset } from '../lib/assets';

export default function Discover() {
  return (
    <section className="discover" id="discover">
      <div className="discover-inner">
        <div className="discover-flag discover-flag-left">
          <img src={asset('Assests/KSA-Flag.webp')} alt="" />
        </div>
        <div className="discover-text-block">
          <p className="discover-text">
            TAITAN Global is the AI partner of choice for enterprises in{' '}
            <span className="country-saudi">Saudi Arabia</span> and the{' '}
            <span className="country-us">United States</span>
          </p>
        </div>
        <div className="discover-flag discover-flag-right">
          <img src={asset('Assests/USA-Flag.webp')} alt="" />
        </div>
      </div>
    </section>
  );
}
