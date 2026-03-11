import { useState } from 'react';
import Hero from './components/Hero';
import Discover from './components/Discover';
import Services from './components/Services';
import Partnership from './components/Partnership';
import Team from './components/Team';
import PartnersLogos from './components/PartnersLogos';
import Reviews from './components/Reviews';
import Innovation from './components/Innovation';
import PartnerWithUs from './components/PartnerWithUs';
import Footer from './components/Footer';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <Hero navOpen={navOpen} setNavOpen={setNavOpen} />
      <Discover />
      <Services />
      <Partnership />
      <Team />
      <PartnersLogos />
      <Reviews />
      <Innovation />
      <PartnerWithUs />
      <Footer />
    </>
  );
}
