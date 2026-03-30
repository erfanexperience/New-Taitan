import ProfilePage from './ProfilePage';

const DANIELLE_PROFILE = {
  name: 'Danielle Ahmadi',
  title: 'COO',
  image: 'Assests/Team Danielle.webp',
  bio: 'Danielle Ahmadi is the Chief Operating Officer of TAITAN, overseeing operational execution, scale, and market expansion across the United States and the Middle East. With over 25 years of experience across international investments, technology, manufacturing, and software, she brings a disciplined, execution-focused approach to scaling complex initiatives in alignment with Saudi Arabia\'s Vision 2030.',
  email: 'Danielle@taitanglobal.ai',
  phones: ['(KSA) +966 56 775 9338', '(USA) +1 408 605 2489'],
  linkedin: null,
};

export default function DaniellePage() {
  return <ProfilePage profile={DANIELLE_PROFILE} />;
}
