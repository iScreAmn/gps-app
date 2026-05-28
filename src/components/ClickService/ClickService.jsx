import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./ClickService.css";

const STEPS = [
  {
    num: "01",
    title: "პრინტერის შეძენა აღარ გჭირდებათ",
    text: "დაივიწყეთ ძვირადღირებული ტექნიკის შეძენა — ჩვენ უზრუნველვყოფთ პრინტერებს თქვენი საჭიროებების შესაბამისად.",
  },
  {
    num: "02",
    title: "ტექნიკურ მომსახურებას ჩვენი გუნდი უზრუნველყოფს",
    text: "სათადარიგო ნაწილები, რემონტი, კონსუმატივები — ყველაფერი ჩვენი პროფესიონალური გუნდის პასუხისმგებლობაა.",
  },
  {
    num: "03",
    title: "იხდით მხოლოდ ბეჭდვისთვის",
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
      const viewportH = window.innerHeight;
      const total = section.offsetHeight - viewportH;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;

      const maxX = Math.max(track.scrollWidth - window.innerWidth, 0);
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

        <div className="how-head">
          <h3 className="how-head-title">
            CLICK სერვისი მარტივი პრინციპით მუშაობს:
          </h3>
          <span className="how-head-counter">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="how-head-counter-divider">/</span>
            <span>{String(STEPS.length).padStart(2, "0")}</span>
          </span>
        </div>

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
