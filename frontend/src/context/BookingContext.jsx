import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [dates, setDates] = useState({
    checkIn: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0]
  });
  const [guests, setGuests] = useState(2);

  const openBookingModal = (room) => {
    if (room) setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const calculateTotal = (room, checkIn, checkOut) => {
    if (!room) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    return diffDays * (room.pricePerNight || 35000);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedRoom,
        setSelectedRoom,
        isBookingModalOpen,
        openBookingModal,
        closeBookingModal,
        dates,
        setDates,
        guests,
        setGuests,
        calculateTotal
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    return {
      selectedRoom: null,
      setSelectedRoom: () => {},
      isBookingModalOpen: false,
      openBookingModal: () => {},
      closeBookingModal: () => {},
      dates: { checkIn: '', checkOut: '' },
      setDates: () => {},
      guests: 2,
      setGuests: () => {},
      calculateTotal: () => 0,
    };
  }
  return context;
};
