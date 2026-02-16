import { useParams, useNavigate } from "react-router-dom";
import { packagesData } from "./Results/mockData";
import { useMemo } from "react";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /* -------- FIND PACKAGE BY ID -------- */
  const pkg = useMemo(() => {
    return packagesData.find((item) => item.id === Number(id));
  }, [id]);

  /* -------- IF PACKAGE NOT FOUND -------- */
  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Package Not Found..
        </h2>
        <p className="text-gray-500 mt-2">
          The package you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/results")}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
        >
          Back to Results
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* 🔹 TITLE SECTION */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {pkg.title}
          </h1>
          <p className="text-gray-600 mt-1">
            {pkg.location} • {pkg.nights} Nights
          </p>
        </div>

        {/* 🔹 IMAGE SECTION */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-[400px] object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* 🔹 PRICE CARD */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">
            <h3 className="text-lg font-semibold text-gray-800">
              Price
            </h3>

            <div className="mt-3 text-3xl font-bold text-gray-900">
              ₹{pkg.price.toLocaleString()}
              <span className="text-sm font-normal text-gray-500">
                {" "} /person
              </span>
            </div>

            <div className="mt-3 text-yellow-500 font-medium">
              ⭐ {pkg.rating} Rating
            </div>

            <button
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full transition"
            >
              Proceed to Booking
            </button>
          </div>
        </div>

        {/* 🔹 DESCRIPTION SECTION */}
        <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Package Overview
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Enjoy a premium getaway to <strong>{pkg.location}</strong>.
            This {pkg.nights}-night package is designed to give you
            a smooth travel experience with curated stays,
            transfers, and memorable activities.
          </p>

          <ul className="mt-6 space-y-2 text-gray-600">
            <li>✔ Comfortable Hotel Stay</li>
            <li>✔ Airport Transfers</li>
            <li>✔ Guided Sightseeing</li>
            <li>✔ 24/7 Travel Support</li>
          </ul>
        </div>

        {/* 🔹 ITINERARY MOCK SECTION */}
        <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Itinerary
          </h2>

          {Array.from({ length: pkg.nights }).map((_, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-500 pl-4 mb-4"
            >
              <h4 className="font-semibold text-gray-800">
                Day {index + 1}
              </h4>
              <p className="text-gray-600 text-sm mt-1">
                Arrival, hotel check-in, leisure activities and
                exploration of local attractions.
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PackageDetails;
