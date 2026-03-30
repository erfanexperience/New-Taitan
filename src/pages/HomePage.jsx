import { useState, useCallback } from 'react';
import Hero from '../components/Hero';
import Discover from '../components/Discover';
import Services from '../components/Services';
import PartnerWithUs from '../components/PartnerWithUs';
import Footer from '../components/Footer';
import PageLoadOverlay from '../components/PageLoadOverlay';

export default function HomePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [homeIntroReady, setHomeIntroReady] = useState(false);
  const onLoadOverlayDone = useCallback(() => setHomeIntroReady(true), []);

  return (
    <>
      <PageLoadOverlay onComplete={onLoadOverlayDone} />
      <Hero navOpen={navOpen} setNavOpen={setNavOpen} desktopIntroEnabled={homeIntroReady} />
      <Discover />
      <Services />
      <PartnerWithUs />
      <Footer />
    </>
  );
}
