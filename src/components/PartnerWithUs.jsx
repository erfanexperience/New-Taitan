import { asset } from '../lib/assets';

export default function PartnerWithUs() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="partner-with-us" id="contact">
      <div className="partner-with-us-inner">
        <div className="partner-with-us-left">
          <img src={asset('Assests/partner-side.svg')} alt="" className="partner-side-img" />
        </div>
        <div className="partner-with-us-center">
          <h2 className="partner-with-us-title">Partner With Us</h2>
          <p className="partner-with-us-desc">
            If you're someone who's looking to bring a space to life, share a few details to help me reach out to you so we can discuss how to bring your vision to life.
          </p>
          <form className="partner-with-us-form" onSubmit={handleSubmit} action="#" method="post">
            <label htmlFor="partner-name">Your Name:</label>
            <input type="text" id="partner-name" name="name" required />
            <label htmlFor="partner-email">Your Email Address:</label>
            <input type="email" id="partner-email" name="email" required />
            <label htmlFor="partner-project">About Your Project:</label>
            <textarea id="partner-project" name="project" rows={4} required />
            <button type="submit" className="partner-with-us-submit">Let's Connect</button>
          </form>
        </div>
        <div className="partner-with-us-right">
          <div className="partner-main-img-wrap">
            <img src={asset('Assests/partner.avif')} alt="Partner with us" className="partner-main-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
