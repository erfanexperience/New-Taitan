import { useEffect, useRef, useState } from 'react';

const WORD = 'INNOVATION';

export default function Innovation() {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setRevealed(true);
      },
      { rootMargin: '0px', threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`innovation ${revealed ? 'innovation-revealed' : ''}`} aria-label="Innovation" ref={sectionRef}>
      <div className="innovation-inner">
        <h2 className="innovation-word">
          {WORD.split('').map((char, i) => (
            <span key={i} className="innovation-char">{char}</span>
          ))}
        </h2>
      </div>
    </section>
  );
}
