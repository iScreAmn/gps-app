import { aboutOrder } from "../../assets/images";
import { useLanguage } from "../../hooks/useLanguage";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import "./OnlineOrder.css";
const OnlineOrder = () => {
  const { t } = useLanguage();
  return (
    <div className="container">
      <div className="online__order">
        <img className="order__img" src={aboutOrder} alt="" />
        <div className="order__content">
          <h2 className="order__content-title">{t("about.order.title")}</h2>
          <p className="order__content-subtitle">
            {t("about.order.description")}
          </p>
          <motion.button
            className="order__content-btn order__content-btn-primary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {t("about.order.cta")}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default OnlineOrder;
