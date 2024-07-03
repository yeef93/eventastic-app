import React, { useState } from "react";
import Modal from "@/components/Modal";

interface TicketModalProps {
  onClose: () => void;
  event: any;
}

function TicketModal({ onClose, event }: TicketModalProps) {
  const [ticketQuantities, setTicketQuantities] = useState(
    event.ticketTypes.map(() => 0)
  );
  const [totalPrice, setTotalPrice] = useState(0);

  const handleIncrement = (index: number) => {
    if (ticketQuantities[index] < event.ticketTypes[index].availableSeat) {
      const newQuantities = [...ticketQuantities];
      newQuantities[index] += 1;
      setTicketQuantities(newQuantities);
      updateTotalPrice(newQuantities);
    }
  };

  const handleDecrement = (index: number) => {
    if (ticketQuantities[index] > 0) {
      const newQuantities = [...ticketQuantities];
      newQuantities[index] -= 1;
      setTicketQuantities(newQuantities);
      updateTotalPrice(newQuantities);
    }
  };

  const updateTotalPrice = (quantities: number[]) => {
    const newTotalPrice = quantities.reduce((total, quantity, index) => {
      return total + quantity * event.ticketTypes[index].price;
    }, 0);
    setTotalPrice(newTotalPrice);
  };

  return (
    <Modal>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden relative z-50 max-w-3xl w-full">
        <button
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">{event.title}</h2>
          <p className="text-center mb-4">{event.dateTime}</p>
          <p className="text-center mb-4">{event.location}</p>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Voucher Code</label>
              <div className="flex flex-row items-center">
                <input
                  type="text"
                  className="border rounded-l w-full py-2 px-3"
                  placeholder="Enter code"
                />
                <button className="bg-blue-500 text-white py-2 px-4 rounded-r">
                  Apply
                </button>
              </div>
            </div>
            {event.ticketTypes.map((ticket: any, index: number) => (
              <div key={index} className="mb-4 border rounded p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold uppercase">{ticket.name}</p>
                    <p>
                      {ticket.price === 0
                        ? "Free"
                        : `${ticket.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 2,
                          })}`}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-200 text-gray-700 py-1 px-3 rounded"
                      onClick={() => handleDecrement(index)}
                    >
                      -
                    </button>
                    <span className="mx-2">{ticketQuantities[index]}</span>
                    <button
                      className="bg-gray-200 text-gray-700 py-1 px-3 rounded"
                      onClick={() => handleIncrement(index)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center">
              <p className="font-bold">Total</p>
              <p className="font-bold">
                {totalPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <button className="mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TicketModal;