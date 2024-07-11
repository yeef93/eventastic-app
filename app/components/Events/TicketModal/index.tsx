import React, { useState, useEffect } from "react";
import Switch from "react-switch"; // Import the Switch component
import paymentMethods from "@/utils/paymentMethods";

interface TicketModalProps {
  onClose: () => void;
  event: any;
  onGetTotalPrice: (totalPrice: number) => void;
}

function TicketModal ({ onClose, event, onGetTotalPrice }:TicketModalProps) {
  const [ticketQuantities, setTicketQuantities] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [useCoin, setUseCoin] = useState(false);
  const coinBalance = 100000;

  useEffect(() => {
    setTicketQuantities(event.ticketTypes.map(() => 0));
  }, [event]);

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
    onGetTotalPrice(newTotalPrice); // Send total price back to parent component
  };

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const toggleUseCoin = () => {
    setUseCoin((prevUseCoin) => !prevUseCoin);
  };

  const getFinalPrice = () => {
    const discount = useCoin ? coinBalance : 0;
    return Math.max(totalPrice - discount, 0);
  };


  return (
    <div className="fixed inset-0 flex xl:items-center xl:justify-center md:items-start md:justify-start z-50 text-gray-500">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50"></div>
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
            <div className="flex justify-between items-center">
              <p className="font-bold py-8">Total</p>
              <p className="font-bold">
                {totalPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="mb-4">
              <div className="flex flex-row items-center">
                <input
                  type="text"
                  className="border rounded-l w-full py-2 px-3"
                  placeholder="Enter Voucher Code"
                />
                <button className="bg-red-500 text-white py-2 px-4 rounded-r">
                  Apply
                </button>
              </div>
            </div>
            <div className="flex items-end justify-between mb-4">
              <span className="mr-2">Use Coin Balance (100,000 IDR)</span>
              <Switch
                onChange={toggleUseCoin}
                checked={useCoin}
                offColor="#888"
                onColor="#097969"
                uncheckedIcon={false}
                checkedIcon={false}
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="font-bold">Final Price</p>
              <p className="font-bold">
                {getFinalPrice().toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="mt-4">
              <select
                value={selectedPaymentMethod}
                onChange={handlePaymentMethodChange}
                className="border rounded w-full py-2 px-3"
              >
                <option value="">Select a payment method</option>
                {paymentMethods.map((method: any) => (
                  <option key={method.id} value={method.id}>
                    {method.name}
                  </option>
                ))}
              </select>
              {selectedPaymentMethod && (
                <div className="mt-4 p-4 border rounded">
                  <p className="font-bold">
                    {
                      paymentMethods.find(
                        (method: any) => method.id === selectedPaymentMethod
                      )?.detail
                    }
                  </p>
                </div>
              )}
            </div>
            <button className="mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;