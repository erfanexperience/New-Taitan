import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SiteNavbar from '../components/SiteNavbar';
import Footer from '../components/Footer';
import { asset } from '../lib/assets';

const INTRO = [
  'TAITAN is led by operators and advisors who have spent their careers building, scaling, and governing technology enterprises across the United States and the Middle East. Together we align world-class AI capabilities with the priorities of Saudi Arabia\'s Vision 2030 and the organisations we serve.',
  'On this page you\'ll meet the executives responsible for strategy, delivery, and long-term stewardship of our mission.',
];

const MEMBERS = [
  {
    name: 'Jason Roos',
    title: 'CEO',
    image: 'Assests/Team Jason 2.webp',
    profileTo: '/jason',
    paragraphs: [
      'Jason Roos is the Chief Executive Officer of TAITAN, an AI-focused strategic advisory firm connecting leading U.S. artificial intelligence solutions to the Saudi Arabian market.',
      'With over 25 years of experience, he has led major digital and AI transformations across healthcare, education, defense, and technology, operating at the intersection of Silicon Valley innovation and Saudi Arabia\'s Vision 2030.',
    ],
    photoOnRight: false,
  },
  {
    name: 'Danielle Ahmadi',
    title: 'COO',
    image: 'Assests/Team Danielle.webp',
    profileTo: '/danielle',
    paragraphs: [
      'Danielle Ahmadi is the Chief Operating Officer of TAITAN, overseeing operational execution, scale, and market expansion across the United States and the Middle East.',
      'With over 25 years of experience across international investments, technology, manufacturing, and software, she brings a disciplined, execution-focused approach to scaling complex initiatives in alignment with Saudi Arabia\'s Vision 2030.',
    ],
    photoOnRight: true,
  },
  {
    name: 'Erfan Farahani',
    title: 'CPO',
    image: 'Assests/Team Erfan.webp',
    profileTo: null,
    paragraphs: [
      'Erfan Farahani is the Chief Product Officer of TAITAN, responsible for product strategy and the path from advanced AI research to dependable solutions for enterprise and public-sector partners.',
      'He partners across leadership and engineering to prioritise roadmaps, integration, and adoption—balancing innovation with governance as the firm deepens its footprint in the United States and Saudi Arabia.',
    ],
    photoOnRight: false,
  },
];

export default function TeamPage() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.title = 'Meet Our Team | TAITAN';
    return () => {
      document.title = 'TAITAN – AI Mission Command';
    };
  }, []);

  return (
    <div className="team-page">
      <header className="team-page-hero-nav" role="banner">
        <div className="team-page-hero-nav-inner">
          <SiteNavbar
            navOpen={navOpen}
            setNavOpen={setNavOpen}
            logoSrc="Assests/Team-Left.webp"
            variant="team"
          />
        </div>
      </header>
      <main className="team-landing">
        <div className="team-landing-hero">
          <h1 className="team-landing-title">Meet Our Team</h1>
          <div className="team-landing-intro">
            {INTRO.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {MEMBERS.map((member) => (
          <article
            key={member.name}
            className={`team-landing-member ${member.photoOnRight ? 'team-landing-member--photo-right' : ''}`}
          >
            <div className="team-landing-photo-oval">
              <img src={asset(member.image)} alt="" />
            </div>
            <div className="team-landing-copy">
              <h2 className="team-landing-name">
                {member.profileTo ? (
                  <Link to={member.profileTo} className="team-landing-name-link">
                    {member.name}
                  </Link>
                ) : (
                  member.name
                )}
              </h2>
              <p className="team-landing-role">{member.title}</p>
              {member.paragraphs.map((para, i) => (
                <p key={i} className="team-landing-bio">
                  {para}
                </p>
              ))}
            </div>
          </article>
        ))}
      </main>
      <Footer />
    </div>
  );
}
