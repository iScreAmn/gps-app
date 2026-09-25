import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { useLanguage } from '../../hooks/useLanguage';
import './NotFoundPage.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const randomCoord = (max) => (Math.random() * max).toFixed(4).padStart(7, '0');

// Coordinates keep scrambling — the "GPS" has lost its signal
const useScrambledCoords = () => {
  const [coords, setCoords] = useState({ lat: '41.7151', lng: '44.8271' });

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => {
      setCoords({ lat: randomCoord(90), lng: randomCoord(180) });
    }, 110);
    return () => clearInterval(id);
  }, []);

  return coords;
};

const useTbilisiClock = () => {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tbilisi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date());

  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
};

const useMagneticPointer = () => {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return { ref, onPointerMove: handleMove, onPointerLeave: handleLeave };
};

const MagneticLink = ({ to, className, children }) => {
  const magnetic = useMagneticPointer();

  return (
    <Link to={to} className={className} {...magnetic}>
      {children}
    </Link>
  );
};

const NotFoundPage = () => {
  const { language, t } = useLanguage();
  const { pathname } = useLocation();
  const sectionRef = useRef(null);
  const coords = useScrambledCoords();
  const time = useTbilisiClock();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = t('notFound.docTitle');
    return () => {
      document.title = prevTitle;
    };
  }, [t]);

  // Smoothed pointer tracking drives the spotlight and digit parallax via CSS vars
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReducedMotion()) return undefined;

    const target = { x: 0.5, y: 0.4 };
    const current = { ...target };
    let frame;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = (e.clientY - rect.top) / rect.height;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      el.style.setProperty('--mx', `${current.x * 100}%`);
      el.style.setProperty('--my', `${current.y * 100}%`);
      el.style.setProperty('--px', (current.x - 0.5) * 2);
      el.style.setProperty('--py', (current.y - 0.5) * 2);
      frame = requestAnimationFrame(tick);
    };

    el.addEventListener('pointermove', onMove);
    frame = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const base = `/${language}`;
  const titleWords = t('notFound.title').split(' ');
  const marqueeItems = [t('notFound.marquee'), '404', t('notFound.marquee2'), '404'];

  return (
    <section className="nf" ref={sectionRef}>
      <div className="nf__spotlight" aria-hidden="true" />
      <div className="nf__grid" aria-hidden="true" />
      <div className="nf__grain" aria-hidden="true" />

      <div className="nf__inner container">
        <header className="nf__meta" aria-hidden="true">
          <span className="nf__meta-item">
            <i className="nf__dot" /> ERR_404
          </span>
          <span className="nf__meta-item">{t('notFound.status')}</span>
          <span className="nf__meta-item nf__meta-item--coords">
            {coords.lat}° N / {coords.lng}° E
          </span>
          <span className="nf__meta-item">TBS {time}</span>
        </header>

        <h1 className="nf__code" aria-label="404">
          <span className="nf__digit" style={{ '--d': -1, '--i': 0 }} aria-hidden="true">4</span>
          <span className="nf__digit nf__radar" style={{ '--d': 0.4, '--i': 1 }} aria-hidden="true">
            <span className="nf__radar-ring" />
            <span className="nf__radar-ring nf__radar-ring--mid" />
            <span className="nf__radar-ring nf__radar-ring--inner" />
            <span className="nf__radar-cross" />
            <span className="nf__radar-sweep" />
            <span className="nf__radar-blip" />
          </span>
          <span className="nf__digit" style={{ '--d': 1, '--i': 2 }} aria-hidden="true">4</span>
        </h1>

        <div className="nf__body">
          <div className="nf__col nf__col--left">
            <p className="nf__eyebrow">{t('notFound.eyebrow')}</p>
            <h2 className="nf__title">
              {titleWords.map((word, i) => (
                <span className="nf__word" key={`${word}-${i}`}>
                  <span style={{ '--i': i }}>{word}</span>
                </span>
              ))}
            </h2>
          </div>

          <div className="nf__col nf__col--right">
            <p className="nf__text">{t('notFound.text')}</p>

            <div className="nf__path">
              <span className="nf__path-label">{t('notFound.requested')}</span>
              <code className="nf__path-value">{pathname}</code>
            </div>

            <nav className="nf__actions">
              <MagneticLink to={base} className="nf__btn nf__btn--primary">
                <span className="nf__btn-label">{t('notFound.home')}</span>
                <HiArrowRight className="nf__btn-icon" />
              </MagneticLink>
              <MagneticLink to={`${base}/catalog`} className="nf__btn">
                <span className="nf__btn-label">{t('notFound.catalog')}</span>
              </MagneticLink>
            </nav>
          </div>
        </div>
      </div>

      <div className="nf__marquee" aria-hidden="true">
        <div className="nf__marquee-track">
          {[0, 1].map((copy) => (
            <div className="nf__marquee-group" key={copy}>
              {marqueeItems.map((item, i) => (
                <span className="nf__marquee-item" key={i}>
                  {item}
                  <span className="nf__marquee-star">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
