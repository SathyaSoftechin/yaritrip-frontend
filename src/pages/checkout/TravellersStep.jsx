import { useParams, useNavigate } from "react-router-dom";
import { useCheckoutStore } from "../../store/checkout.store";
import { packagesData } from "../Results/mockData";
import { useEffect, useState } from "react";

const TravellersStep = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    travellers,
    addTraveller,
    updateTraveller,
    removeTraveller,
    setPackage,
    getTotal,
  } = useCheckoutStore();

  const pkg = packagesData.find((p) => p.id === Number(id));
  const [showSummary, setShowSummary] = useState(false);
  const [animatedTotal, setAnimatedTotal] = useState(0);

  /* ---------------- Persist State ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("checkoutTravellers");
    if (saved) {
      useCheckoutStore.setState({ travellers: JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "checkoutTravellers",
      JSON.stringify(travellers)
    );
  }, [travellers]);

  /* ---------------- Set Package ---------------- */
  useEffect(() => {
    if (pkg) {
      setPackage(pkg);
    }
  }, [pkg, setPackage]);

  if (!pkg) return <div className="p-10">Package not found</div>;

  const isAbroad = pkg.category === "Abroad";

  const adults = travellers.filter((t) => t.type === "Adult");
  const children = travellers.filter((t) => t.type === "Child");

  const adultTotal = adults.length * pkg.price;
  const childTotal = children.length * (pkg.price * 0.75);
  const totalAmount = travellers.length === 0 ? 0 : getTotal();

  /* ---------------- Animate Price ---------------- */
  useEffect(() => {
    let start = animatedTotal;
    const diff = totalAmount - start;
    const duration = 300;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );
      setAnimatedTotal(start + diff * progress);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [totalAmount]);

  /* ---------------- Validation ---------------- */
  const handleContinue = () => {
    if (travellers.length === 0) {
      alert("Please add at least one traveller.");
      return;
    }

    const invalid = travellers.some(
      (t) =>
        !t.name ||
        !t.age ||
        !t.email ||
        (isAbroad && !t.passport)
    );

    if (invalid) {
      alert("Please fill all traveller details.");
      return;
    }

    navigate(`/checkout/${id}/review`);
  };

  return (
    <div className="relative">

      {/* ================= Step Progress ================= */}
      <div className="flex items-center justify-between mb-8">
        {["Travellers", "Review", "Payment"].map((step, index) => (
          <div key={step} className="flex-1 text-center">
            <div
              className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
            <p className="text-xs mt-2">{step}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* ================= LEFT SIDE ================= */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-6">
            Traveller Details
          </h2>

          {travellers.length === 0 && (
            <p className="text-gray-500 mb-4">
              No travellers added yet.
            </p>
          )}

          {travellers.map((traveller, index) => (
            <div
              key={index}
              className="border p-5 rounded-lg mb-5 bg-gray-50 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="font-medium">
                  {traveller.type} {index + 1}
                </p>

                <button
                  onClick={() => removeTraveller(index)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={traveller.name || ""}
                  onChange={(e) =>
                    updateTraveller(index, { name: e.target.value })
                  }
                  className="border p-3 rounded"
                />

                <input
                  type="number"
                  placeholder="Age"
                  value={traveller.age || ""}
                  onChange={(e) =>
                    updateTraveller(index, { age: e.target.value })
                  }
                  className="border p-3 rounded"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={traveller.email || ""}
                  onChange={(e) =>
                    updateTraveller(index, { email: e.target.value })
                  }
                  className="border p-3 rounded"
                />

                <input
                  type="gender"
                  placeholder="Gender"
                  value={traveller.gender || ""}
                  onChange={(e) =>
                    updateTraveller(index, { gender: e.target.value })
                  }
                  className="border p-3 rounded"
                />

                {isAbroad && (
                  <input
                    type="text"
                    placeholder="Passport Number"
                    value={traveller.passport || ""}
                    onChange={(e) =>
                      updateTraveller(index, {
                        passport: e.target.value,
                      })
                    }
                    className="border p-3 rounded"
                  />
                )}
              </div>
            </div>
          ))}

          {/* Add Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() =>
                addTraveller({
                  type: "Adult",
                  name: "",
                  age: "",
                  email: "",
                  gender: "",
                })
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-full"
            >
              + Add Adult
            </button>

            <button
              onClick={() =>
                addTraveller({
                  type: "Child",
                  name: "",
                  age: "",
                  email: "",
                  gender: "",
                })
              }
              className="px-4 py-2 bg-green-600 text-white rounded-full"
            >
              + Add Child (25% Off)
            </button>
          </div>

          <button
            onClick={handleContinue}
            className="mt-8 px-6 py-3 bg-black text-white rounded-full"
          >
            Continue to Review
          </button>
        </div>

        {/* ================= DESKTOP SIDEBAR ================= */}
        <div className="hidden lg:block w-96">
          <div className="sticky top-6 border rounded-xl p-6 shadow-sm bg-white">
            <h3 className="text-lg font-semibold mb-4">
              Price Summary
            </h3>

            <div className="flex justify-between mb-2">
              <span>Adults ({adults.length})</span>
              <span>₹{adultTotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Children ({children.length})</span>
              <span>₹{childTotal.toLocaleString()}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>
                ₹{Math.round(animatedTotal).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE SUMMARY DRAWER ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <p className="font-semibold">
            ₹{Math.round(animatedTotal).toLocaleString()}
          </p>
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="text-blue-600 text-sm"
          >
            {showSummary ? "Hide" : "View Details"}
          </button>
        </div>

        {showSummary && (
          <div className="mt-4 text-sm">
            <div className="flex justify-between">
              <span>Adults ({adults.length})</span>
              <span>₹{adultTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Children ({children.length})</span>
              <span>₹{childTotal.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravellersStep;