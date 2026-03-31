import { useCallback, useEffect, useRef, useState } from 'react';
import { asset } from '../lib/assets';

const GEMINI_MODEL = 'gemini-flash-latest';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkopbnde';

const TAITAN_SYSTEM_PROMPT = `You are a warm, articulate ambassador for TAITAN, an AI-focused strategic advisory firm serving enterprises in Saudi Arabia and the United States.

The visitor has described a project idea by voice; the transcript may contain small errors or filler words.

Write a polished, human response in plain prose (no markdown headings, no bullet lists). Use exactly two paragraphs, separated by one blank line:
- Paragraph 1: Reflect their idea encouragingly in 2–3 sentences, and briefly note how enterprise AI, strategy, or execution could matter (not salesy).
- Paragraph 2: Say TAITAN would be delighted to help bring this vision to life in Saudi Arabia and the region, and invite them to submit the form to continue.

Keep the whole reply concise (about 3–5 sentences total across both paragraphs). Do not add a third paragraph. Do not mention speech recognition, microphones, or automation.`;

function limitToParagraphs(text, maxParagraphs) {
  const parts = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.slice(0, maxParagraphs).join('\n\n');
}

function getSpeechRecognition() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export default function PartnerWithUs({
  sectionId = 'contact',
  inputIdPrefix = '',
  voiceProject = false,
} = {}) {
  const [listening, setListening] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [aiBusy, setAiBusy] = useState(false);
  const [capturedTranscript, setCapturedTranscript] = useState('');
  const [fullReply, setFullReply] = useState('');
  const [displayedReply, setDisplayedReply] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [submitState, setSubmitState] = useState('idle'); // idle | sending | success | error

  const recognitionRef = useRef(null);
  const sectionRef = useRef(null);
  const partnerRevealTimeoutRef = useRef(null);
  const finalTranscriptRef = useRef('');
  const latestSpeechRef = useRef('');
  const processAfterStopRef = useRef(null);

  const speechSupported = typeof window !== 'undefined' && !!getSpeechRecognition();

  const [sectionInView, setSectionInView] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(min-width: 769px)').matches;
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const mq = window.matchMedia('(min-width: 769px)');
    if (!mq.matches) {
      setSectionInView(true);
      return;
    }
    const revealDelayMs = 200;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (partnerRevealTimeoutRef.current) {
            window.clearTimeout(partnerRevealTimeoutRef.current);
          }
          partnerRevealTimeoutRef.current = window.setTimeout(() => {
            partnerRevealTimeoutRef.current = null;
            setSectionInView(true);
          }, revealDelayMs);
        } else {
          if (partnerRevealTimeoutRef.current) {
            window.clearTimeout(partnerRevealTimeoutRef.current);
            partnerRevealTimeoutRef.current = null;
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.14 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (partnerRevealTimeoutRef.current) {
        window.clearTimeout(partnerRevealTimeoutRef.current);
        partnerRevealTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop();
      } catch {
        /* ignore */
      }
      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!fullReply) {
      setDisplayedReply('');
      setIsTyping(false);
      return;
    }
    setIsTyping(true);
    setDisplayedReply('');
    const graphemes = [...fullReply];
    let i = 0;
    const step = 3;
    const id = window.setInterval(() => {
      i += step;
      if (i >= graphemes.length) {
        setDisplayedReply(fullReply);
        setIsTyping(false);
        window.clearInterval(id);
      } else {
        setDisplayedReply(graphemes.slice(0, i).join(''));
      }
    }, 18);
    return () => {
      window.clearInterval(id);
    };
  }, [fullReply]);

  const runGemini = useCallback(async (transcript) => {
    setApiError(null);
    setAiBusy(true);
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    if (!key || String(key).trim() === '') {
      setApiError(
        'Add your Gemini API key to a local file named .env.local as VITE_GEMINI_API_KEY= (see .env.example). Never commit the key.'
      );
      setAiBusy(false);
      return;
    }

    try {
      const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': key,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: TAITAN_SYSTEM_PROMPT }],
          },
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Here is what they said about their project:\n\n"""${transcript}"""\n\nWrite your response now.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.78,
            /* Enough headroom for two complete paragraphs; 380 often cuts mid-sentence (MAX_TOKENS) */
            maxOutputTokens: 900,
          },
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data?.error?.message || res.statusText || 'Request failed';
        throw new Error(msg);
      }

      const raw =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('')?.trim() ||
        "Thank you for sharing—TAITAN would love to explore how we can support your vision in Saudi Arabia and beyond.";

      setFullReply(limitToParagraphs(raw, 2));
    } catch (e) {
      setApiError(e?.message || 'Could not reach Gemini. Check your key and network, or try again.');
    } finally {
      setAiBusy(false);
    }
  }, []);

  const startListening = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) {
      setSpeechError('Voice input is not supported in this browser. Try Chrome or Edge.');
      return;
    }
    setSpeechError(null);
    setFormError(null);
    finalTranscriptRef.current = '';
    latestSpeechRef.current = '';

    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const chunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += chunk;
        } else {
          interim += chunk;
        }
      }
      latestSpeechRef.current = (finalTranscriptRef.current + interim).trim();
    };

    rec.onerror = (ev) => {
      processAfterStopRef.current = null;
      if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') {
        setSpeechError('Microphone access was denied. Allow the mic in your browser settings.');
      } else if (ev.error === 'no-speech') {
        setSpeechError('No speech detected. Tap the mic when you are ready to speak.');
      } else if (ev.error !== 'aborted') {
        setSpeechError(ev.message || `Speech error: ${ev.error}`);
      }
    };

    rec.onend = () => {
      setListening(false);
      recognitionRef.current = null;
      const cb = processAfterStopRef.current;
      processAfterStopRef.current = null;
      if (cb) cb();
    };

    try {
      recognitionRef.current = rec;
      rec.start();
      setListening(true);
    } catch {
      setSpeechError('Could not start voice input.');
      setListening(false);
    }
  }, []);

  function handleMicClick() {
    setFormError(null);
    if (listening) {
      processAfterStopRef.current = () => {
        const t = latestSpeechRef.current.trim();
        if (!t) {
          setSpeechError("We didn't catch that. Tap the mic, speak, then tap again when you finish.");
          return;
        }
        setSpeechError(null);
        setCapturedTranscript(t);
        void runGemini(t);
      };
      try {
        recognitionRef.current?.stop();
      } catch {
        /* ignore */
      }
      return;
    }

    setSpeechError(null);
    setApiError(null);
    setCapturedTranscript('');
    setFullReply('');
    setDisplayedReply('');
    setIsTyping(false);
    startListening();
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);
    setSubmitState('idle');
    if (voiceProject) {
      if (!capturedTranscript.trim()) {
        setFormError('Describe your project with the microphone first, then wait for your message from TAITAN.');
        return;
      }
      if (!fullReply.trim() || isTyping) {
        setFormError('Please wait until your personalized message has finished appearing, then submit.');
        return;
      }
    }

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    formData.append('_subject', 'Partner With Us submission');
    formData.append('_replyto', String(formData.get('email') || ''));

    setSubmitState('sending');

    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.errors?.[0]?.message || 'Could not submit right now. Please try again.');
        }
        setSubmitState('success');
        formEl.reset();
        setFormError(null);
      })
      .catch((err) => {
        setSubmitState('error');
        setFormError(err?.message || 'Could not submit right now. Please try again.');
      });
  }

  const nameId = `${inputIdPrefix}partner-name`;
  const emailId = `${inputIdPrefix}partner-email`;
  const projectId = `${inputIdPrefix}partner-project`;

  return (
    <section
      ref={sectionRef}
      className={`partner-with-us${sectionInView ? ' partner-with-us--in-view' : ''}`}
      {...(sectionId ? { id: sectionId } : {})}
    >
      <div className="partner-with-us-inner">
        <div className="partner-with-us-left">
          <img src={asset('Assests/partner-side.svg')} alt="" className="partner-side-img" />
          <img src={asset('Assests/Partner - mobile - top.webp')} alt="" className="partner-side-img-mobile" />
        </div>
        <div className="partner-with-us-center">
          <h2 className="partner-with-us-title">Partner With Us</h2>
          <p className="partner-with-us-desc">
            If you're someone who's looking to bring a space to life, share a few details to help me reach out to you so we can discuss how to bring your vision to life.
          </p>
          <form className="partner-with-us-form" onSubmit={handleSubmit} action={FORMSPREE_ENDPOINT} method="post">
            {voiceProject ? (
              <>
                <input type="hidden" name="voice_transcript" value={capturedTranscript} readOnly aria-hidden />
                <input type="hidden" name="taitan_ai_reply" value={fullReply} readOnly aria-hidden />
              </>
            ) : null}
            <label htmlFor={nameId}>Your Name:</label>
            <input type="text" id={nameId} name="name" required />
            <label htmlFor={emailId}>Your Email Address:</label>
            <input type="email" id={emailId} name="email" required />
            {voiceProject ? (
              <>
                <span className="partner-voice-label" id={`${projectId}-voice-label`}>
                  Let&apos;s talk about your project:
                </span>
                <div className="partner-voice-stack">
                  <div className={`partner-listening-stage${listening ? ' partner-listening-stage--active' : ''}`}>
                    <div className="partner-mic-wrap">
                      <div className="partner-listening-rings" aria-hidden="true">
                        <span className="partner-listening-ring partner-listening-ring--1" />
                        <span className="partner-listening-ring partner-listening-ring--2" />
                        <span className="partner-listening-ring partner-listening-ring--3" />
                      </div>
                      <button
                        type="button"
                        className={`partner-mic-btn${listening ? ' partner-mic-btn--listening' : ''}`}
                        onClick={handleMicClick}
                        aria-pressed={listening}
                        aria-describedby={`${projectId}-voice-label ${projectId}-voice-hint`}
                        aria-label={listening ? 'Stop and send to TAITAN' : 'Start speaking'}
                      >
                        <span className="partner-mic-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                          </svg>
                        </span>
                      </button>
                    </div>
                    {listening ? (
                      <div className="partner-sound-bars" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    ) : null}
                  </div>
                  <p className="partner-voice-hint" id={`${projectId}-voice-hint`}>
                    {listening
                      ? "We're listening… Tap the microphone again when you've finished speaking."
                      : speechSupported
                        ? 'Tap the microphone to speak. Tap again when you are done.'
                        : 'Voice input is not available in this browser. Try Chrome or Edge on desktop or Android.'}
                  </p>
                </div>
                {speechError ? (
                  <p className="partner-voice-error" role="alert">
                    {speechError}
                  </p>
                ) : null}
                {aiBusy ? (
                  <div className="partner-ai-loading" aria-live="polite">
                    <div className="partner-ai-loading-inner">
                      <div className="partner-ai-orbit" aria-hidden="true" />
                      <p className="partner-ai-loading-text">Working on your idea…</p>
                    </div>
                    <p className="partner-ai-loading-sub">This usually takes a few seconds.</p>
                  </div>
                ) : null}
                {apiError ? (
                  <p className="partner-voice-error" role="alert">
                    {apiError}
                  </p>
                ) : null}
                {(displayedReply || isTyping) && !aiBusy ? (
                  <div className="partner-gemini-reply" aria-live="polite">
                    <p className="partner-gemini-reply-eyebrow">TAITAN</p>
                    <div className="partner-gemini-reply-body">
                      {displayedReply}
                      {isTyping ? <span className="partner-typing-caret" aria-hidden="true" /> : null}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <label htmlFor={projectId}>About Your Project:</label>
                <textarea id={projectId} name="project" rows={4} required />
              </>
            )}
            {submitState === 'success' ? (
              <p className="partner-voice-success" role="status">
                Thanks - your message was sent. We will reach out soon.
              </p>
            ) : null}
            {formError ? (
              <p className="partner-voice-error" role="alert">
                {formError}
              </p>
            ) : null}
            <button type="submit" className="partner-with-us-submit" disabled={submitState === 'sending'}>
              {submitState === 'sending' ? 'Sending...' : "Let's Connect"}
            </button>
          </form>
        </div>
        <div className="partner-with-us-right">
          <div className="partner-main-img-wrap">
            <img src={asset('Assests/partner.avif')} alt="Partner with us" className="partner-main-img partner-main-img-desktop" />
            <img src={asset('Assests/mobile - partner.jpg')} alt="Partner with us" className="partner-main-img partner-main-img-mobile" />
          </div>
        </div>
      </div>
    </section>
  );
}
