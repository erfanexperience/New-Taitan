import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../lib/assets';

export default function ProfilePage({ profile }) {
  const { name, title, image, bio, email, phones, linkedin } = profile;

  useEffect(() => {
    document.title = `${name} – ${title} | TAITAN`;
    return () => { document.title = 'TAITAN – AI Mission Command'; };
  }, [name, title]);

  return (
    <div className="profile-page">
      <header className="profile-header">
        <Link to="/" className="profile-logo-link" aria-label="TAITAN Home">
          <img src={asset('Assests/left.webp')} alt="TAITAN" className="profile-logo" />
        </Link>
      </header>

      <main className="profile-card">
        <div className="profile-photo-wrap">
          <img src={asset(image)} alt={name} className="profile-photo" />
        </div>
        <div className="profile-content">
          <h1 className="profile-name">{name}</h1>
          <p className="profile-title">{title}</p>
          <p className="profile-bio">{bio}</p>

          <div className="profile-contact">
          {email && (
            <a href={`mailto:${email}`} className="profile-contact-item profile-email">
              <span className="profile-contact-icon" aria-hidden>📩</span>
              {email}
            </a>
          )}
          {phones?.map((phone, i) => (
            <a key={i} href={`tel:${phone.replace(/\s/g, '')}`} className="profile-contact-item profile-phone">
              <span className="profile-contact-icon" aria-hidden>📞</span>
              {phone}
            </a>
          ))}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="profile-contact-item profile-linkedin">
              <span className="profile-contact-icon" aria-hidden>in</span>
              LinkedIn
            </a>
          )}
          </div>
        </div>
      </main>
    </div>
  );
}
