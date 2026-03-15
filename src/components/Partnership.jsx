import { useEffect, useRef, useState } from 'react';
import { asset } from '../lib/assets';

const PARTNERS = [
  { name: 'Exos', subtitle: 'The AI Operations Platform', logo: 'Assests/logo - exos.webp', image: 'Assests/Rectangle 1.webp', text: '<strong>Taitan</strong> partnered with EXOS to support enterprise organizations in building AI systems grounded in accurate, structured, and trustworthy knowledge. Our collaboration focused on aligning governance frameworks, validation processes, and operational requirements—helping ensure AI deployments remain compliant, resilient, and aligned with strategic objectives.' },
  { name: 'AeroRegis', subtitle: 'AI-Powered Airspace Management', logo: 'Assests/logo - AeroRegis.png', image: 'Assests/Rectangle 5.webp', videoUrl: 'https://www.youtube.com/watch?v=-UPRZgKHpo8', text: '<strong>Taitan</strong> partnered with AeroRegis to support AI-powered airspace management solutions. Our collaboration focused on bringing enterprise-grade AI and governance to the aviation and airspace sector.' },
  { name: 'Flatiron', subtitle: 'Technology & AI Workforce Training', logo: 'Assests/logo - FlatIron.webp', image: 'Assests/Rectangle 4.webp', text: '<strong>Taitan</strong> partnered with Flatiron School to deliver hands-on, industry-aligned technology and AI training. We brought real-world enterprise perspective to help connect technical and AI skills with practical, job-ready application.' },
  { name: 'Bletchley Fellowship', subtitle: 'AI Research & Leadership Development', logo: 'Assests/logo - bletchley.webp', image: 'Assests/Rectangle 3.webp', text: '<strong>Taitan</strong> partnered with the Bletchley Fellowship to support the development of AI leaders at the intersection of research, policy, and real-world application. We contributed technical guidance, governance insight, and applied AI expertise—helping bridge academic innovation with enterprise and public-sector deployment.' },
];

function PartnerBlock({ partner, isVisible }) {
  return (
    <article className={`partner-block ${isVisible ? 'partner-block--visible' : ''}`}>
      <div className={`partner-img partner-img-left ${partner.videoUrl ? 'partner-img--video' : ''}`}>
        {partner.videoUrl ? (
          <button
            type="button"
            className="partner-video-wrap"
            onClick={() => window.open(partner.videoUrl, 'youtube', 'width=960,height=540,scrollbars=yes,resizable=yes')}
            aria-label="Play video"
          >
            <img src={asset(partner.image)} alt="" />
            <span className="partner-play-btn" aria-hidden="true" />
          </button>
        ) : (
          <img src={asset(partner.image)} alt="" />
        )}
      </div>
      <div className="partner-center">
        <div className="partner-logos">
          <img src={asset(partner.logo)} alt={partner.name} className="partner-logo" />
          <span className="partner-x">x</span>
          <img src={asset('Assests/logo - Taitan.webp')} alt="TAITAN" className="partner-logo partner-logo-taitan" />
        </div>
        <h3 className="partner-name">{partner.name}</h3>
        <p className="partner-subtitle">{partner.subtitle}</p>
        <div className="partner-text">
          <p dangerouslySetInnerHTML={{ __html: partner.text }} />
        </div>
      </div>
      <div className={`partner-img partner-img-right ${partner.videoUrl ? 'partner-img--video' : ''}`}>
        {partner.videoUrl ? (
          <button
            type="button"
            className="partner-video-wrap"
            onClick={() => window.open(partner.videoUrl, 'youtube', 'width=960,height=540,scrollbars=yes,resizable=yes')}
            aria-label="Play video"
          >
            <img src={asset(partner.image)} alt="" />
            <span className="partner-play-btn" aria-hidden="true" />
          </button>
        ) : (
          <img src={asset(partner.image)} alt="" />
        )}
      </div>
    </article>
  );
}

export default function Partnership() {
  const refs = useRef([]);
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((v) => ({ ...v, [entry.target.dataset.index]: true }));
          }
        });
      },
      { rootMargin: '0px', threshold: 0.15 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="partnership" id="partnership">
      <h2 className="partnership-title">PARTNERSHIP</h2>
      {PARTNERS.map((partner, i) => (
        <div key={partner.name} ref={(el) => (refs.current[i] = el)} data-index={i}>
          <PartnerBlock partner={partner} isVisible={!!visible[i]} />
        </div>
      ))}
    </section>
  );
}
