import React, { useState } from 'react'
import { nocaiArt } from '../../assets/images'
import DiscountModal from '../widgets/Modals/Discount'
import './SpecialDiscounts.css'

const SpecialDiscounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <p className="discounts__description">დეკემბრის თვის განსაკუთრებული შეთავაზება Nocai-ის UV პრინტერზე, დაგვიკავშირდით და მიიღეთ ფასდაკლება
            </p>
            <button className="discounts__button" onClick={handleOpenModal}>
              შეთავაზების მიღება
            </button>
          </div>
          <img className="discounts__image" src={nocaiArt} alt="Discount" />
        </div>
      </div>

      <DiscountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        description="დეკემბრის თვის განსაკუთრებული შეთავაზება!"
        countdown={{
          targetDate: "2025-12-31T23:59:59"
        }}
      />
    </section>
  )
}

export default SpecialDiscounts