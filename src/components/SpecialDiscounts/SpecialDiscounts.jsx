import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../hooks/useLanguage'
import { iechoSummerOffer } from '../../assets/images'
import './SpecialDiscounts.css'

const SpecialDiscounts = () => {
  const { language } = useLanguage();

  return (
    <section className="special-discounts">
      <div className="container">
        <h2 className="section-title">სპეციალური შეთავაზება</h2>
        <div className="discounts__wrapper">
          <div className="discounts__text">
            <h3 className="discounts__title">საზაფხულო შეთავაზება IECHO-სგან!</h3>
            <p className="discounts__description">
              მიიღეთ 20%-იანი ფასდაკლება <strong>IECHO-ს</strong> უნივერსალურ საჭრელ აპარატზე <strong>PK0705 Plus</strong>.
              <br />
              არ გაუშვათ შესაძლებლობა, შეიძინოთ პროფესიონალური საჭრელი აპარატი განსაკუთრებულ ფასად
            </p>
            <Link to={`/${language}/special-offer/iecho-pk0705-plus`} className="discounts__button">
              გაიგე მეტი
            </Link>
          </div>
          <img className="discounts__image" src={iechoSummerOffer} alt="IECHO PK0705 Plus" />
        </div>
      </div>
    </section>
  )
}

export default SpecialDiscounts