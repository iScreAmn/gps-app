import React from 'react';
import Calculator from './Calculator/Calculator';
import CtaHome from './CtaHome/CtaHome';
import './OnlineOrder.css';

const OnlineOrder = () => {
  return (
    <section className="online-order-page">
      <Calculator />
      <CtaHome />
    </section>
  );
};

export default OnlineOrder;

