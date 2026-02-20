import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCheckoutStore } from "../../store/checkout.store";

const PaymentStep = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    travellers,
    getTotal,
    setPaymentDetails,
    generateTransactionId,
  } = useCheckoutStore();

  const totalAmount = getTotal();

  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (totalAmount === 0) {
      alert("Invalid payment amount");
      return;
    }

    if (selectedMethod === "upi" && !upiId) {
      alert("Enter UPI ID");
      return;
    }

    if (selectedMethod === "card" && !cardData.number) {
      alert("Enter Card Details");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const transactionId = "TXN" + Date.now();

      setPaymentDetails({
        method: selectedMethod,
        transactionId,
        amount: totalAmount,
      });

      setLoading(false);

      navigate(`/checkout/${id}/success`);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">

      <h2 className="text-2xl font-semibold mb-8">
        Secure Payment
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT - Payment Options */}
        <div className="flex-1 border rounded-2xl p-6 bg-white shadow-sm">

          {/* Payment Method Tabs */}
          <div className="flex gap-4 mb-6">
            {["upi", "card", "netbanking", "wallet"].map((method) => (
              <button
                key={method}
                onClick={() => setSelectedMethod(method)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedMethod === method
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {method.toUpperCase()}
              </button>
            ))}
          </div>

          {/* UPI */}
          {selectedMethod === "upi" && (
            <div>
              <label className="block text-sm mb-2">
                Enter UPI ID
              </label>
              <input
                type="text"
                placeholder="example@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full border p-3 rounded-lg"
              />
            </div>
          )}

          {/* Card */}
          {selectedMethod === "card" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                value={cardData.number}
                onChange={(e) =>
                  setCardData({ ...cardData, number: e.target.value })
                }
                className="w-full border p-3 rounded-lg"
              />
              <input
                type="text"
                placeholder="Card Holder Name"
                value={cardData.name}
                onChange={(e) =>
                  setCardData({ ...cardData, name: e.target.value })
                }
                className="w-full border p-3 rounded-lg"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) =>
                    setCardData({ ...cardData, expiry: e.target.value })
                  }
                  className="w-full border p-3 rounded-lg"
                />
                <input
                  type="password"
                  placeholder="CVV"
                  value={cardData.cvv}
                  onChange={(e) =>
                    setCardData({ ...cardData, cvv: e.target.value })
                  }
                  className="w-full border p-3 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Net Banking */}
          {selectedMethod === "netbanking" && (
            <p className="text-sm text-gray-600">
              Redirect to Bank Portal (Simulated)
            </p>
          )}

          {/* Wallet */}
          {selectedMethod === "wallet" && (
            <p className="text-sm text-gray-600">
              Pay using Wallet Balance (Simulated)
            </p>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-8 w-full bg-black text-white py-3 rounded-xl"
          >
            {loading ? "Processing..." : `Pay ₹${totalAmount.toLocaleString()}`}
          </button>

        </div>

        {/* RIGHT - Summary */}
        <div className="w-full lg:w-96">
          <div className="border rounded-2xl p-6 bg-white shadow-sm sticky top-6">
            <h3 className="font-semibold mb-4">
              Payment Summary
            </h3>

            <div className="flex justify-between mb-2">
              <span>Total Travellers</span>
              <span>{travellers.length}</span>
            </div>

            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total Amount</span>
              <span>
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentStep;