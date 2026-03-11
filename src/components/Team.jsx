import { asset } from '../lib/assets';

const TEAM = [
  { name: 'Jason Roos', role: 'CEO', image: 'Assests/Team Jason.webp' },
  { name: 'Danielle Ahmadi', role: 'COO', image: 'Assests/Team Danielle.webp' },
  { name: 'Erfan Farahani', role: 'CPO', image: 'Assests/Team Erfan.webp' },
  { name: 'Jeff Carven', role: 'Board Member', image: 'Assests/Team Jeff.webp' },
];

export default function Team() {
  return (
    <section className="team" id="team">
      <div className="team-inner">
        <h2 className="team-title">Meet Our Team</h2>
        <div className="team-grid">
          {TEAM.map((member) => (
            <div key={member.name} className="team-card">
              <div className="team-card-img">
                <img src={asset(member.image)} alt={member.name} />
              </div>
              <div className="team-card-caption">
                <span className="team-name">{member.name}</span>
                <span className="team-role">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
