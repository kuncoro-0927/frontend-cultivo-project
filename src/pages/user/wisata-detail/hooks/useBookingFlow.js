import { useEffect, useState } from "react";

export const useBookingFlow = (isLoggedIn, price) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (price) {
      setTotal(price * quantity);
    }
  }, [quantity, price]);

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      setIsPopUpOpen(true);
    }
  };

  const handleNextStep = (date) => {
    setSelectedDate(date);
    setModalStep(2);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    setModalStep(1);
  };

  return {
    isLoginModalOpen,
    setIsLoginModalOpen,
    isPopUpOpen,
    setIsPopUpOpen,
    modalStep,
    selectedDate,
    setSelectedDate,
    quantity,
    setQuantity,
    total,
    handleButtonClick,
    handleNextStep,
    closePopUp,
  };
};
