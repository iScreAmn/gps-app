import { aboutOrder } from "../../assets/images";
import { useLanguage } from "../../hooks/useLanguage";
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
            <button className="order__content-btn">
              {t("about.order.cta")}
            </button>
          </div>
        </div>
      </div>
  )
}

export default OnlineOrder