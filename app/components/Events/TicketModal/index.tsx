import React, { useState, useEffect } from "react";
import Switch from "react-switch"; // Import the Switch component
import paymentMethods from "@/utils/paymentMethods";
import Image from "next/image";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
  selectedTicketType: { name: string; price: number } | null;
  ticketQuantities: { [key: string]: number };
  handleQuantityChange: (ticketType: string, quantity: number) => void;
  handleGetTotalPrice: () => number;
}

function TicketModal({
  isOpen,
  onClose,
  event,
  selectedTicketType,
  ticketQuantities,
  handleGetTotalPrice,
}: TicketModalProps) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | null
  >(null);
  const [useCoin, setUseCoin] = useState(false);
  const coinBalance = 100000;

  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      // Add your purchase logic here
      console.log("Purchasing tickets...");
    } catch (error) {
      console.error("Error purchasing tickets:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formattedEventDate = formatDate(event.eventDate);
  const formattedStartTime = formatTime(event.startTime);
  const formattedEndTime = formatTime(event.endTime);

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const methodId = parseInt(event.target.value, 10);
    setSelectedPaymentMethod(methodId);
  };

  const selectedMethodDetail = paymentMethods.find(
    (method) => method.id === selectedPaymentMethod
  )?.detail;

  const toggleUseCoin = () => {
    setUseCoin((prevUseCoin) => !prevUseCoin);
  };

  const getFinalPrice = () => {
    const discount = useCoin ? coinBalance : 0;
    return Math.max(totalPrice - discount, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-gray-500 p-4">
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
        <div className="p-6 ">
          <div className=" flex flex-row gap-8 text-sm">
            <div className=" h-48 w-80">
              <Image
                src={event.image.imageUrl}
                alt={event.name}
                layout="responsive"
                width={5}
                height={5}
                className=" rounded-lg"
              />
            </div>
            <div className=" text-left flex flex-col gap-10">
              <div>
                <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
                <p>{formattedEventDate}</p>
                <p>
                  {formattedStartTime}-{formattedEndTime}
                </p>
                <p>
                  {event.venue}, {event.location}
                </p>
              </div>
              <div>
                {selectedTicketType && (
                  <>
                    <p className="font-semibold">
                      {selectedTicketType.name} x{" "}
                      {ticketQuantities[selectedTicketType.name]} @{selectedTicketType.price} 
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <p className="font-bold py-8">Total</p>
              <p className="font-bold">
                {handleGetTotalPrice().toLocaleString("id-ID", {
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
                value={selectedPaymentMethod || ""}
                onChange={handlePaymentMethodChange}
                className="border rounded w-full py-2 px-3"
              >
                <option value="">Select a payment method</option>
                {paymentMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.name}
                  </option>
                ))}
              </select>
              {selectedPaymentMethod && (
                <div className="mt-4 p-4 border rounded">
                  <p className="font-bold">{selectedMethodDetail}</p>
                </div>
              )}
            </div>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-full"
              onClick={handlePurchase}
              disabled={loading}
            >
              {loading ? "Processing..." : "Purchase"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketModal;
