import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import paymentMethods from "@/utils/paymentMethods";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Event {
  id: number;
  title: string;
  image: {
    imageUrl: string;
  };
  eventDate: string;
  startTime: string;
  endTime: string;
  organizer: string;
  location: string;
  venue: string;
  map: string;
  availableSeat: number;
  seatLimit: number;
  isFree: boolean;
  ticketTypes: {
    name: string;
    price: number;
  }[];
  category: string;
  description: string;
  promoPercent?: number;
  promoEndDate?: string;
}

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  selectedTicketType: {
    id:number;
    name: string;
    price: number;
    promoPrice?: number;
  } | null;
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
}: TicketModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | null
  >(null);
  const [useCoin, setUseCoin] = useState(false);
  const [coinBalance, setCoinBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      setShowLoginPrompt(true);
      return;
    }

    const fetchCoinBalance = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/users/me/points`, {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });
        const result = await response.json();
        if (result.success) {
          setCoinBalance(result.data.points);
        } else {
          throw new Error("Failed to fetch coin balance");
        }
      } catch (error) {
        console.error("Error fetching coin balance:", error);
        setShowLoginPrompt(true);
        // Consider showing an error message to the user
      } finally {
        setLoading(false);
      }
    };

    fetchCoinBalance();
  }, [session, apiUrl, router]);

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const handleCancel = () => {
    setShowLoginPrompt(false);
    onClose();
  };

  const handlePurchase = () => {
    setShowConfirmation(true);
  };

  const confirmPurchase = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/trx/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({
          eventId: event.id,
          ticketTypeId: selectedTicketType?.id,
          qty: ticketQuantities[selectedTicketType?.name ?? ""] || 0,
          paymentId: selectedPaymentMethod,
          voucherCode: voucherCode,
          usingPoints: useCoin.toString(),
        }),
      });
      const result = await response.json();
      if (result.success) {
        setShowSuccessMessage(true); // Show success message
        // console.log("Purchase successful!");
      } else {
        console.error("Purchase failed:", result.message);
      }
    } catch (error) {
      console.error("Error purchasing tickets:", error);
    } finally {
      setLoading(false);
      setShowConfirmation(false);
      // onClose();
      setTimeout(() => {
        setShowSuccessMessage(false); // Hide success message after a delay
        onClose();
      }, 3000); // 3-second delay
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
    if (useCoin) {
      setVoucherCode("");
    }
  };

  const getSelectedTicketPrice = () => {
    if (!selectedTicketType) return 0;

    // Use promoPrice if available, otherwise use the normal price
    return selectedTicketType.promoPrice ?? selectedTicketType.price;
  };

  const getTicketPrice = () => {
    const ticketPrice = getSelectedTicketPrice();
    const total =
      ticketPrice * (ticketQuantities[selectedTicketType?.name ?? ""] || 0);
    return Math.max(total, 0);
  };

  const getFinalPrice = () => {
    if (coinBalance === null) return 0;

    const ticketPrice = getSelectedTicketPrice();
    const total =
      ticketPrice * (ticketQuantities[selectedTicketType?.name ?? ""] || 0);
    const discount = useCoin ? Math.min(coinBalance, total) : 0;
    return Math.max(total - discount, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-gray-500 p-4">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden relative z-50 max-w-3xl w-full">
        {showLoginPrompt ? (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Please Login First</h2>
            <p className="mb-4">
              You need to be logged in to complete this purchase. Please log in
              to proceed.
            </p>
            <div className="flex gap-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                onClick={handleLoginRedirect}
              >
                Continue to Login
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : showSuccessMessage ? ( // Display success message
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-500">
              Purchase Successful!
            </h2>
            <p>Thank you for your purchase. Your tickets are being processed.</p>
          </div>
        ): (
          <>
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
              <div className="flex flex-row gap-8 text-sm">
                <div className=" h-[60] w-96 relative">
                  <Image
                    src={event.image.imageUrl}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>

                <div className="text-left flex flex-col">
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
                  <div className="mt-4">
                    {selectedTicketType && (
                      <>
                        <p className="font-semibold">
                          {selectedTicketType.name} x{" "}
                          {ticketQuantities[selectedTicketType.name]} @
                          {getSelectedTicketPrice().toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </>
                    )}
                    <div className="flex flex-row justify-between mt-4">
                      <label>Use Coins:</label>
                      <Switch
                        onChange={toggleUseCoin}
                        checked={useCoin}
                        onColor="#EF4444"
                        offColor="#ccc"
                      />
                    </div>
                    <p className="text-right mt-2">
                      Coin Balance:{" "}
                      {coinBalance !== null
                        ? Math.min(
                            coinBalance,
                            getTicketPrice()
                          ).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 2,
                          })
                        : "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <input
                  type="text"
                  placeholder="Enter voucher code"
                  className="border rounded-l w-full py-2 px-3"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  disabled={useCoin} // Disable when using coins
                />
                <button
                  className={`bg-red-500 text-white py-2 px-4 rounded-r ${
                    useCoin ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={useCoin} // Disable when using coins
                >
                  Apply
                </button>
              </div>
              <div className="mt-4 text-right">
                <p className="text-lg font-semibold">
                  Total Price:{" "}
                  {getFinalPrice().toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="mt-4">
                Payment Method
                <select
                  className="w-full border rounded-lg p-2 mb-4"
                  value={selectedPaymentMethod ?? ""}
                  onChange={handlePaymentMethodChange}
                >
                  <option value="" disabled>
                    Select Payment Method
                  </option>
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.name}
                    </option>
                  ))}
                </select>
                {selectedMethodDetail && (
                  <div className="p-4 mb-4 border border-gray-200 rounded-lg">
                    <p className="text-sm">No Rek : {selectedMethodDetail}</p>
                  </div>
                )}
              </div>
              <div className="mt-4 flex flex-row justify-end gap-4">
                <button
                  className={`bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded ${
                    !selectedPaymentMethod || loading
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  onClick={handlePurchase}
                  disabled={loading || !selectedPaymentMethod}
                >
                  {loading ? "Processing..." : "Purchase"}
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 text-gray-500 p-4">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative z-50 max-w-md w-full p-6">
              <h2 className="text-2xl font-bold mb-4">Confirm Purchase</h2>
              <p>Are you sure you want to purchase these tickets?</p>
              <div className="flex justify-end mt-4 gap-4">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  onClick={confirmPurchase}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketModal;
