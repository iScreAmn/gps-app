import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "motion/react";
import "./ClickService.css";

const STEPS = [
  {
    num: "01",
    title: "პრინტერის შეძენა აღარ გჭირდებათ",
    text: "მიიღეთ თანამედროვე პრინტერი მოქნილი პირობებით",
  },
  {
    num: "02",
    title: "ტექნიკურ მომსახურებას ჩვენ ვუზრუნველყოფთ",
    text: "ჩვენი გუნდი უზრუნველყოფს სრულ სერვისს და მუდმივ მხარდაჭერას",
  },
  {
    num: "03",
    title: "გადახდა ანაბეჭდის მიხედვით",
    text: "გადაიხადეთ მხოლოდ რეალურად დაბეჭდილ გვერდებში და თავიდან აირიდეთ ზედმეტი ხარჯები.",
  },
];

const ClickService = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!section || !track || !bar) return;

    let rafId = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      // sticky pins below the fixed site header; use its actual rendered height
      const stickyEl = track.closest(".how-sticky");
      const stickyH = stickyEl ? stickyEl.clientHeight : window.innerHeight;
      const headerOffset = window.innerHeight - stickyH;
      const total = section.offsetHeight - stickyH;
      const scrolled = Math.min(
        Math.max(-rect.top + headerOffset, 0),
        total
      );
      const progress = total > 0 ? scrolled / total : 0;

      const viewportEl = track.parentElement;
      const viewportW = viewportEl ? viewportEl.clientWidth : window.innerWidth;
      const maxX = Math.max(track.scrollWidth - viewportW, 0);
      track.style.transform = `translate3d(${-progress * maxX}px, 0, 0)`;
      bar.style.width = `${progress * 100}%`;

      const idx = Math.min(
        STEPS.length - 1,
        Math.floor(progress * STEPS.length + 0.0001)
      );
      setActiveIndex(idx);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`click-service-how ${
        prefersReducedMotion ? "is-reduced" : ""
      }`}
    >
      <div className="how-sticky">
        <div className="how-intro">
          <motion.div
            className="how-intro-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="how-intro-dot" />
            <span>CLICK / სერვისი</span>
          </motion.div>

          <motion.h2
            className="how-intro-title"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            აირჩიეთ <em>CLICK სერვისი</em> და გადაიხადეთ მხოლოდ{" "}
            <span className="how-intro-highlight">რეალურად დაბეჭდილ</span>{" "}
            გვერდებში.
          </motion.h2>

          <motion.p
            className="how-intro-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            დაივიწყეთ ზედმეტი დანახარჯი ტექნიკაზე, მომსახურებაზე და მოვლაზე.
            პრინტერებთან დაკავშირებულ ყველა პროცესს ჩვენი პროფესიონალთა გუნდი
            სრულად უზრუნველყოფს.
          </motion.p>
        </div>

        <h3 className="how-head-title">
          CLICK სერვისი მარტივი პრინციპით მუშაობს:
        </h3>

        <div className="how-progress">
          <div ref={barRef} className="how-progress-bar" />
        </div>

        <div className="how-viewport">
          <div ref={trackRef} className="how-track">
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                className={`how-step ${i === activeIndex ? "is-active" : ""}`}
              >
                <span className="how-step-num">{s.num}</span>
                <div className="how-step-body">
                  <h4 className="how-step-title">{s.title}</h4>
                  <p className="how-step-text">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClickService;
