import { useState, useEffect, useRef } from 'react';
import { asset } from '../lib/assets';

const SLIDES = [
  { logo: 'Assests/logo - Oracle.png', quote: '"The TAITAN team didn\'t just grow LATAM—they made it the global benchmark for performance."', author: 'President Oracle Latin America' },
  { logo: 'Assests/Logo - Cisco.png', quote: '"We had world-class products, but no signal through the noise. The TAITAN team fixed that."', author: 'SVP, Strategy & GTM Cisco' },
  { logo: 'Assests/Logo - Panasonic.png', quote: '"Our best product was invisible until the TAITAN team gave us a voice the market couldn\'t ignore."', author: 'VP, Global Sales Panasonic Toughbook Division' },
  { logo: 'Assests/Logo - Tablau.png', quote: '"We had raw speed but no steering wheel. The TAITAN team gave us direction and dominance."', author: 'SVP, Business Strategy Tableau' },
  { logo: 'Assests/Logo - Solid Works.png', quote: '"We were lost in a sea of tools, SKUs, and new sellers. Twelve months later, the TAITAN team helped us become the category beacon."', author: 'Director, Product Marketing SolidWorks' },
  { logo: 'Assests/Logo - Motorola.png', quote: '"Our sensor technology was treated like a cost center. The TAITAN team turned it into a revenue engine."', author: 'VP, Innovation & Strategic Sales Motorola' },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    wrapRef.current.style.transform = `translateX(-${(index * 100) / total}%)`;
  }, [index, total]);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % total), 8000);
    return () => clearInterval(t);
  }, [total]);

  const go = (delta) => setIndex((i) => (i + delta + total) % total);

  return (
    <section className="reviews" id="reviews">
      <div className="reviews-inner">
        <p className="reviews-subtitle">What Our Leaders Have Delivered;</p>
        <h2 className="reviews-title">Reviews</h2>
        <div className="reviews-carousel">
          <button type="button" className="reviews-arrow reviews-arrow-prev" aria-label="Previous review" onClick={() => go(-1)}>←</button>
          <div className="reviews-track">
            <div className="reviews-slides-wrap" ref={wrapRef}>
              {SLIDES.map((slide, i) => (
                <div key={i} className="reviews-slide" data-index={i}>
                  <img src={asset(slide.logo)} alt="" className="reviews-logo" />
                  <blockquote className="reviews-quote">{slide.quote}</blockquote>
                  <p className="reviews-author">{slide.author}</p>
                </div>
              ))}
            </div>
          </div>
          <button type="button" className="reviews-arrow reviews-arrow-next" aria-label="Next review" onClick={() => go(1)}>→</button>
        </div>
      </div>
    </section>
  );
}
