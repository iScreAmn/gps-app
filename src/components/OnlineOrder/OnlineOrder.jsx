import React, { useEffect, useLayoutEffect } from 'react';
import { useAnimate, useInView, useReducedMotion } from 'motion/react';
import Calculator from './Calculator/Calculator';
import CtaHome from './CtaHome/CtaHome';
import './OnlineOrder.css';

// Анимируем только колонки: модалки CtaHome рендерятся прямо в секции,
// и transform на их предке сломал бы им position: fixed.
// Калькулятор выезжает слева, CTA — справа.
const COLUMNS = [
  { selector: '.calculator__wrapper', x: -60, delay: 0 },
  { selector: '.online__order', x: 60, delay: 0.15 },
];
const EASE = [0.16, 1, 0.3, 1];

const OnlineOrder = () => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  // Прячем колонки до первой отрисовки, чтобы не было вспышки контента.
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    COLUMNS.forEach(({ selector, x }) => {
      animate(selector, { opacity: 0, x }, { duration: 0 });
    });
  }, [animate, prefersReducedMotion]);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;
    COLUMNS.forEach(({ selector, delay }) => {
      animate(selector, { opacity: 1, x: 0 }, { duration: 1, ease: EASE, delay });
    });
  }, [animate, isInView, prefersReducedMotion]);

  return (
    <section ref={scope} className="online-order-page">
      <Calculator />
      <CtaHome />
    </section>
  );
};

export default OnlineOrder;
