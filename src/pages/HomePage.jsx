import { useState } from 'react';
import Hero from '../components/Hero';
import Discover from '../components/Discover';
import Services from '../components/Services';
import Innovation from '../components/Innovation';
import PartnerWithUs from '../components/PartnerWithUs';
import Footer from '../components/Footer';

export default function HomePage() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <Hero navOpen={navOpen} setNavOpen={setNavOpen} />
      <Discover />
      <Services />
      <PartnerWithUs />
      <Innovation />
      <Footer />
    </>
  );
}
