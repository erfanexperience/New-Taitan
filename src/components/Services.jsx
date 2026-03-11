import { useEffect, useRef, useState } from 'react';
import { asset } from '../lib/assets';

const SERVICES = [
  {
    heading: 'Governance & Compliance',
    desc: 'We help organizations deploy AI responsibly by establishing the oversight, controls, and standards required for safe and compliant operations.',
    list: ['Model Validation & Safety', 'Regulatory Alignment', 'Risk Monitoring', 'Audit & Controls'],
    image: 'Assests/Rounded rectangle-1.webp',
    imageLeft: false,
  },
  {
    heading: 'Education & Development',
    desc: 'We equip teams with the practical skills needed to work confidently with AI-enabled systems through structured, real-world training programs.',
    list: ['AI Literacy', 'Workflow Education', 'Executive Enablement', 'Scenario Workshops'],
    image: 'Assests/Rounded rectangle-2.webp',
    imageLeft: true,
  },
  {
    heading: 'Advisory & Consulting',
    desc: 'We guide organizations in shaping and scaling AI-driven initiatives, improving decision-making and operational efficiency.',
    list: ['AI Strategy', 'Process Optimization', 'Architecture Guidance', 'Implementation Support'],
    image: 'Assests/Rounded rectangle-3.webp',
    imageLeft: false,
  },
];

function ServiceBlock({ item, isVisible }) {
  return (
    <article className={`service ${item.imageLeft ? 'service--image-left' : ''} ${isVisible ? 'service--visible' : ''}`}>
      <div className="service-content">
        <h3 className="service-heading">{item.heading}</h3>
        <p className="service-desc">{item.desc}</p>
        <ul className="service-list">
          {item.list.map((li) => (
            <li key={li}>{li}</li>
          ))}
        </ul>
      </div>
      <div className="service-image">
        <img src={asset(item.image)} alt={item.heading} />
      </div>
    </article>
  );
}

export default function Services() {
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
      { rootMargin: '0px 0px -25% 0px', threshold: 0.15 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="services" id="services">
      <h2 className="services-title">SERVICES</h2>
      {SERVICES.map((item, i) => (
        <div key={item.heading} ref={(el) => (refs.current[i] = el)} data-index={i}>
          <ServiceBlock item={item} isVisible={!!visible[i]} />
        </div>
      ))}
    </section>
  );
}
