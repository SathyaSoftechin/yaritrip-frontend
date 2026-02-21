import { useParams, useNavigate } from "react-router-dom";
import { useCheckoutStore } from "../../store/checkout.store";
import { packagesData } from "../Results/mockData";
import { useEffect, useState } from "react";

const TravellersStep = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    travellers,
    addons,
    addTraveller,
    updateTraveller,
    removeTraveller,
    setPackage,
    getTotal,
  } = useCheckoutStore();

  const pkg = packagesData.find((p) => p.id === Number(id));
  const [animatedTotal, setAnimatedTotal] = useState(0);

  useEffect(() => {
    if (pkg) setPackage(pkg);
  }, [pkg, setPackage]);

  if (!pkg) return <div className="p-10">Package not found</div>;

  const isAbroad = pkg.category === "Abroad";

  const adults = travellers.filter((t) => t.type === "Adult");
  const children = travellers.filter((t) => t.type === "Child");

  const adultTotal = adults.length * pkg.price;
  const childTotal = children.length * (pkg.price * 0.75);

  const addonsTotal = addons.reduce(
    (sum, addon) => sum + addon.price,
    0
  );

  const totalAmount = travellers.length === 0 ? 0 : getTotal();

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
        !t.gender ||
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

      {/* STEP PROGRESS */}
      <div className="flex items-center justify-between mb-8">
        {["Travellers", "Review", "Payment"].map((step, index) => (
          <div key={step} className="flex-1 text-center">
            <div
              className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
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

        {/* LEFT SIDE */}
        <div className="flex-1">

          <h2 className="text-2xl font-semibold mb-6">
            Traveller Details
          </h2>

          {travellers.map((traveller, index) => (
            <div
              key={index}
              className="border p-5 rounded-lg mb-5 bg-gray-50"
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

          {/* ADD BUTTONS */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() =>
                addTraveller({
                  type: "Adult",
                  name: "",
                  age: "",
                  email: "",
                  gender:" ",
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
                  gender:" ",
                })
              }
              className="px-4 py-2 bg-green-600 text-white rounded-full"
            >
              + Add Child (25% Off)
            </button>
          </div>

          {/* MOBILE SUMMARY — FORCED DIRECT POSITION */}
          <div className="lg:hidden border rounded-xl p-6 shadow-sm bg-white mt-6">

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

            {addons.length > 0 && (
              <>
                <hr className="my-4" />
                <p className="text-sm font-medium mb-2">
                  Selected Activities
                </p>

                {addons.map((addon) => (
                  <div
                    key={addon.id}
                    className="flex justify-between text-sm mb-1"
                  >
                    <span>
                      Day {addon.day + 1} - {addon.name}
                    </span>
                    <span>
                      ₹{addon.price.toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className="flex justify-between font-medium mt-2">
                  <span>Add-ons Total</span>
                  <span>
                    ₹{addonsTotal.toLocaleString()}
                  </span>
                </div>
              </>
            )}

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>
                ₹{Math.round(animatedTotal).toLocaleString()}
              </span>
            </div>
          </div>

          {/* CONTINUE BUTTON — NOW GUARANTEED BELOW SUMMARY */}
          <button
            onClick={handleContinue}
            className="mt-6 w-full px-6 py-3 bg-black text-white rounded-full"
          >
            Continue to Review
          </button>

        </div>

        {/* DESKTOP SIDEBAR */}
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

            {addons.length > 0 && (
              <>
                <hr className="my-4" />
                <p className="text-sm font-medium mb-2">
                  Selected Activities
                </p>

                {addons.map((addon) => (
                  <div
                    key={addon.id}
                    className="flex justify-between text-sm mb-1"
                  >
                    <span>
                      Day {addon.day + 1} - {addon.name}
                    </span>
                    <span>
                      ₹{addon.price.toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className="flex justify-between font-medium mt-2">
                  <span>Add-ons Total</span>
                  <span>
                    ₹{addonsTotal.toLocaleString()}
                  </span>
                </div>
              </>
            )}

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
    </div>
  );
};

export default TravellersStep;