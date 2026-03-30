import { asset } from '../lib/assets';

export default function Discover() {
  return (
    <section className="discover" id="discover">
      <div className="discover-flag discover-flag-left">
        <img src={asset('Assests/KSA-Flag.webp')} alt="" />
      </div>
      <div className="discover-inner">
        <p className="discover-text">
          The bridge connecting capital, strategy, and execution from{' '}
          <span className="country-us">San Francisco</span> to{' '}
          <span className="country-saudi">Riyadh</span>.
        </p>
      </div>
      <div className="discover-flag discover-flag-right">
        <img src={asset('Assests/USA-Flag.webp')} alt="" />
      </div>
    </section>
  );
}
