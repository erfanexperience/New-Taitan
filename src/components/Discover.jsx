import { useState, useEffect } from 'react';
import { asset } from '../lib/assets';

const PULSE_URL = 'https://pulse.taitanglobal.ai/';
const PULSE_CURSOR = asset('Assests/pulse-cursor.png');
const PULSE_MOBILE = asset('Assests/Pulse - Mobile.webp');
const CURSOR_SCALE = 0.7;

export default function Discover() {
  const [hover, setHover] = useState(false);
  const [scaledCursor, setScaledCursor] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const w = Math.max(1, Math.round(img.naturalWidth * CURSOR_SCALE));
      const h = Math.max(1, Math.round(img.naturalHeight * CURSOR_SCALE));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      setScaledCursor(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      if (!cancelled) setScaledCursor(null);
    };
    img.src = PULSE_CURSOR;
    return () => {
      cancelled = true;
    };
  }, []);

  const cursorStyle = hover
    ? scaledCursor
      ? `url("${scaledCursor}") 0 0, pointer`
      : 'pointer'
    : undefined;

  return (
    <>
      <div
        className="discover discover--desktop"
        id="discover"
        style={{ cursor: cursorStyle }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="discover-pulse-wrap">
          <img src={asset('Assests/pulse.webp')} alt="" className="discover-pulse-img" />
        </div>
        <a
          href={PULSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="discover-pulse-hit"
        >
          <span className="discover-pulse-sr-only">Open TAITAN Pulse (new tab)</span>
        </a>
      </div>

      <div className="discover discover--mobile">
        <div className="discover-pulse-wrap">
          <img src={PULSE_MOBILE} alt="" className="discover-pulse-img" />
        </div>
        <a
          href={PULSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="discover-pulse-hit"
        >
          <span className="discover-pulse-sr-only">Open TAITAN Pulse (new tab)</span>
        </a>
      </div>
    </>
  );
}
