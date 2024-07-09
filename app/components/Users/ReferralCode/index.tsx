import React from "react";

function ReferralCode() {
  const referralCode = "EKREF5368";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied to clipboard");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white">
      <label className="block mb-1 font-medium">Referral Code</label>
      <div className="flex justify-between items-center border border-yellow-300 bg-yellow-100 p-4 rounded-md">
        <span className="font-bold text-lg">{referralCode}</span>
        <button
          onClick={handleCopy}
          className="text-blue-600 hover:underline text-sm"
        >
          Copy link
        </button>
      </div>
    </div>
  );
}

export default ReferralCode;
