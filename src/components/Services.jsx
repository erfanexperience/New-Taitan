import { useEffect, useRef, useState } from 'react';
import { asset } from '../lib/assets';

const SERVICES = [
  {
    heading: 'Who We Are',
    desc: 'TAITAN is a Saudi-based firm led by a seasoned team of executives with decades of experience across government, industry, and global markets. With deep roots in both the United States and the Kingdom of Saudi Arabia, we bring a practical understanding of institutional frameworks, regulatory environments, and strategic priorities. We are driven by a commitment to deliver results, bridging innovation, investment, and execution to help organizations successfully operate and grow within complex international landscapes.',
    list: [],
    image: 'Assests/Rounded rectangle-1.webp',
    imageLeft: false,
  },
  {
    heading: 'What We Do',
    desc: 'TAITAN partners with corporate leaders and investors to provide strategic guidance and hands-on execution across business development, market entry, regulatory navigation, and deal origination. From initial strategy through to successful execution and closing, we help organizations identify opportunities, structure engagements, and navigate the Saudi and U.S. ecosystems to drive measurable outcomes and long-term value.',
    list: [],
    image: 'Assests/Rounded rectangle-2.webp',
    imageLeft: true,
  },
  {
    heading: 'How We Work',
    desc: 'TAITAN brings together the full strength of its strategic, operational, and relationship capital to address each client\'s specific objectives. We take a tailored, hands-on approach—aligning the right expertise, partnerships, and resources to each engagement. With coverage across key sectors including technology, healthcare, aerospace, and advanced manufacturing, and a primary focus on bridging the United States and Saudi Arabia, we operate as an extension of our clients\' leadership teams to drive execution, not just strategy.',
    list: [],
    image: 'Assests/Rounded rectangle-3.webp',
    imageLeft: false,
  },
];

function headingLeadAndRest(heading) {
  const i = heading.indexOf(' ');
  if (i === -1) return { lead: heading, rest: '' };
  return { lead: heading.slice(0, i), rest: heading.slice(i + 1) };
}

function ServiceBlock({ item, isVisible }) {
  const { lead, rest } = headingLeadAndRest(item.heading);
  return (
    <article className={`service ${item.imageLeft ? 'service--image-left' : ''} ${isVisible ? 'service--visible' : ''}`}>
      <div className="service-content">
        <h3 className="service-heading">
          <span className="service-heading-lead">{lead}</span>
          {rest ? <> {rest}</> : null}
        </h3>
        <p className="service-desc">{item.desc}</p>
        {item.list.length > 0 ? (
          <ul className="service-list">
            {item.list.map((li) => (
              <li key={li}>{li}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="service-image">
        <img src={asset(item.image)} alt="" />
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
    <section className="services" id="who-we-are">
      {SERVICES.map((item, i) => (
        <div key={item.heading} className="service-block-wrap" ref={(el) => (refs.current[i] = el)} data-index={i}>
          <ServiceBlock item={item} isVisible={!!visible[i]} />
        </div>
      ))}
    </section>
  );
}
