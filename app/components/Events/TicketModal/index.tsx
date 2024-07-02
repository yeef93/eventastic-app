import React from "react";

interface ticketModalProps {
  onClose: () => void;
  event: any;
}

function TicketModal({ onClose, event }:ticketModalProps) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 text-gray-500">
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
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Promo Code</label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Enter code"
                />
                <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">
                  Apply
                </button>
              </div>
              {event.prices.map((ticket:any, index:any) => (
                <div key={index} className="mb-4 border rounded p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">{ticket.name}</p>
                      <p>{ticket.price === 0 ? "Free" : `$${ticket.price.toFixed(2)}`}</p>
                    </div>
                    <div className="flex items-center">
                      <button className="bg-gray-200 text-gray-700 py-1 px-3 rounded">-</button>
                      <span className="mx-2">1</span>
                      <button className="bg-gray-200 text-gray-700 py-1 px-3 rounded">+</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <p className="font-bold">Total</p>
                <p className="font-bold">$0.00</p>
              </div>
              <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded w-full">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default TicketModal;