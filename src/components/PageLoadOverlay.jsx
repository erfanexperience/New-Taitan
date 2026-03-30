import { useEffect, useState } from 'react';

const MIN_VISIBLE_MS = 1500;
const EXIT_MS = 650;

/**
 * Full-screen loader on home: blocks interaction until window load, then fades out.
 */
export default function PageLoadOverlay({ onComplete }) {
  const [phase, setPhase] = useState('loading'); // loading | exiting | done

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const start = Date.now();
    let loadTimer;

    const scheduleExit = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      loadTimer = window.setTimeout(() => setPhase('exiting'), wait);
    };

    if (document.readyState === 'complete') {
      scheduleExit();
    } else {
      window.addEventListener('load', scheduleExit, { once: true });
    }

    return () => {
      window.removeEventListener('load', scheduleExit);
      window.clearTimeout(loadTimer);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'exiting') return undefined;
    const id = window.setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
      onComplete?.();
    }, EXIT_MS);
    return () => window.clearTimeout(id);
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className={`page-load-overlay ${phase === 'exiting' ? 'page-load-overlay--exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-busy={phase === 'loading'}
    >
      <span className="page-load-overlay__sr-only">Loading</span>
      <div className="page-load-overlay__inner">
        <div className="page-load-overlay__mark" aria-hidden="true" />
      </div>
    </div>
  );
}
