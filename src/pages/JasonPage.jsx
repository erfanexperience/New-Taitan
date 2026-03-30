import ProfilePage from './ProfilePage';

const JASON_PROFILE = {
  name: 'Jason Roos',
  title: 'CEO',
  image: 'Assests/Team Jason.webp',
  bio: 'Jason Roos is the Chief Executive Officer of TAITAN, an AI-focused strategic advisory firm connecting leading U.S. artificial intelligence solutions to the Saudi Arabian market. With over 25 years of experience, he has led major digital and AI transformations across healthcare, education, defense, and technology, operating at the intersection of Silicon Valley innovation and Saudi Arabia\'s Vision 2030.',
  email: 'Jason@Taitanglobal.ai',
  phones: ['(KSA) +966 54 231 3470', '(USA) +1 650 847 9502'],
  linkedin: 'https://www.linkedin.com/in/jason-roos-9840933/',
};

export default function JasonPage() {
  return <ProfilePage profile={JASON_PROFILE} />;
}
