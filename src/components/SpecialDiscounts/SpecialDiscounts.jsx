import React, { useState } from 'react'
import { proModel } from '../../assets/images'
import DiscountModal from '../widgets/Modals/Discount'
import './SpecialDiscounts.css'

const SpecialDiscounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Установите дату окончания акции
  const targetDate = new Date('2025-12-31T23:59:59');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="special-discounts">
      <div className="container">
        <h2 className="section-title">სპეციალური შეთავაზება</h2>
        <div className="discounts__wrapper">
          <div className="discounts__text">
            <h3 className="discounts__title">მეტი ბეჭდვა-მეტი სარგებელი!</h3>
            <p className="discounts__description">დეკემბრის თვის განსაკუთრებული შეთავაზება! მხოლოდ PRO მოდელის პრინტერის Click სერვისით სარგებლობისას, დაბეჭდეთ  1000 ლარზე მეტი ღირებულების A4 გვერდი და მიიღეთ 10%-იანი ფასდაკლება.
            </p>
            <button className="discounts__button" onClick={handleOpenModal}>
              შეთავაზების მიღება
            </button>
          </div>
          <img className="discounts__image" src={proModel} alt="Discount" />
        </div>
      </div>

      <DiscountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        targetDate={targetDate}
        description="დეკემბრის თვის განსაკუთრებული შეთავაზება! დარჩენილია:"
      />
    </section>
  )
}

export default SpecialDiscounts