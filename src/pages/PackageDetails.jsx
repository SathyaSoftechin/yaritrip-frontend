import { useParams, useNavigate } from "react-router-dom";
import { packagesData } from "./Results/mockData";
import { useMemo, useState, useEffect } from "react";
import { useCheckoutStore } from "../store/checkout.store";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const numericId = Number(id);
  const isValidNumericRoute =
    id !== undefined && !isNaN(numericId) && String(numericId) === String(id);

  const [activeTab, setActiveTab] = useState("Overview");
  const [direction, setDirection] = useState("right");
  const [openDay, setOpenDay] = useState(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const [selectedActivities, setSelectedActivities] = useState([]);

  const { toggleAddon, clearAddons, setPackage } = useCheckoutStore();

  const pkg = useMemo(() => {
    if (!isValidNumericRoute) return null;
    return packagesData.find((item) => item.id === numericId);
  }, [numericId, isValidNumericRoute]);

  useEffect(() => {
    if (pkg) {
      clearAddons();
      setSelectedActivities([]);
      setPackage(pkg);
    }
  }, [pkg, clearAddons, setPackage]);

  if (!isValidNumericRoute) return null;

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <button
          onClick={() => navigate("/results")}
          className="bg-blue-600 text-white px-6 py-2 rounded-full"
        >
          Back to Results
        </button>
      </div>
    );
  }

  const images = pkg.images || [pkg.image];

  const tabs = [
    "Overview",
    "Itinerary",
    "Transfers",
    "Rooms & Hotels",
    "Activities",
  ];

  const handleTabChange = (tab) => {
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = tabs.indexOf(tab);
    setDirection(newIndex > currentIndex ? "right" : "left");
    setActiveTab(tab);
  };

  /* ---------- ACTIVITY LIST ---------- */
  const activitiesList = [
    {
      id: 1,
      name: "Desert Safari Experience",
      price: 3500,
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    {
      id: 2,
      name: "Luxury Yacht Cruise",
      price: 5200,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      id: 3,
      name: "Helicopter City Tour",
      price: 8900,
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      id: 4,
      name: "Adventure Water Sports",
      price: 4200,
      image:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b",
    },
  ];

  const handleActivityToggle = (activity, day) => {
    const exists = selectedActivities.find(
      (item) => item.id === activity.id && item.day === day
    );

    const activityForStore = {
      ...activity,
      id: `${activity.id}-${day}`,
      day,
    };

    if (exists) {
      setSelectedActivities((prev) =>
        prev.filter(
          (item) =>
            !(item.id === activity.id && item.day === day)
        )
      );
      toggleAddon(activityForStore);
    } else {
      setSelectedActivities((prev) => [
        ...prev,
        { ...activity, day },
      ]);
      toggleAddon(activityForStore);
    }
  };

  const activitiesTotal = selectedActivities.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const totalPrice = pkg.price + activitiesTotal;

  /* ---------- LIGHTBOX ---------- */
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    setAutoSlide(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setAutoSlide(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (!lightboxOpen || !autoSlide) return;
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, [lightboxOpen, autoSlide]);

  return (
    <div className="min-h-screen bg-gray-100 pb-16 mt-20">

      {/* HEADER */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold">{pkg.title}</h1>
          <p className="text-gray-600 text-sm mt-1">
            {pkg.location} • {pkg.nights} Nights
          </p>
        </div>
      </div>

      {/* GALLERY */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              onClick={() => openLightbox(index)}
              className={`${
                index === 0
                  ? "col-span-2 row-span-2 h-64 md:h-80"
                  : "h-40"
              } w-full object-cover rounded-xl cursor-pointer hover:scale-105 transition`}
            />
          ))}
        </div>

        {/* TAB NAVIGATION RESTORED */}
        <div className="sticky top-16 bg-gray-100 pt-6 z-10">
          <div className="relative flex gap-6 border-b border-gray-300 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`relative pb-3 text-sm font-medium transition ${
                  activeTab === tab
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 mt-10 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div
            key={activeTab}
            className={`transition-all duration-300 ${
              direction === "right"
                ? "animate-slideRight"
                : "animate-slideLeft"
            } bg-white rounded-2xl shadow p-6`}
          >
            {activeTab === "Overview" && (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  Package Overview
                </h2>
                <p className="text-gray-600">
                  Enjoy a premium {pkg.nights}-night getaway in{" "}
                  <strong>{pkg.location}</strong>.
                </p>
              </>
            )}

            {activeTab === "Itinerary" &&
              Array.from({ length: pkg.nights }).map((_, index) => (
                <div key={index} className="border rounded-xl mb-4 p-4">
                  <h3 className="font-semibold">
                    Day {index + 1}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Arrival, sightseeing and curated experiences.
                  </p>
                </div>
              ))}

            {activeTab === "Transfers" && (
              <p className="text-gray-600">
                Airport pickup and drop with private transfers.
              </p>
            )}

            {activeTab === "Rooms & Hotels" && (
              <p className="text-gray-600">
                4-star luxury hotel stay with breakfast.
              </p>
            )}

            {activeTab === "Activities" && (
              <>
                <h2 className="text-lg font-semibold mb-6">
                  Add Activities
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {activitiesList.map((activity) => (
                    <div
                      key={activity.id}
                      className="border rounded-xl overflow-hidden shadow"
                    >
                      <img
                        src={activity.image}
                        alt={activity.name}
                        className="h-40 w-full object-cover"
                      />

                      <div className="p-4 space-y-3">
                        <h4 className="font-semibold">
                          {activity.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          ₹{activity.price.toLocaleString()}
                        </p>

                        <select
                          className="w-full border rounded-lg p-2 text-sm"
                          onChange={(e) =>
                            handleActivityToggle(
                              activity,
                              Number(e.target.value)
                            )
                          }
                        >
                          <option value="">
                            Select Day
                          </option>
                          {Array.from(
                            { length: pkg.nights },
                            (_, i) => (
                              <option key={i} value={i}>
                                Day {i + 1}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* PRICE CARD */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-28">
          <h3 className="text-lg font-semibold">
            Starting From
          </h3>

          <div className="mt-3 text-3xl font-bold">
            ₹{totalPrice.toLocaleString()}
            <span className="text-sm text-gray-500">
              {" "}
              /person
            </span>
          </div>

          {activitiesTotal > 0 && (
            <div className="mt-2 text-sm text-green-600 font-medium">
              + ₹{activitiesTotal.toLocaleString()} added
            </div>
          )}

          <button
            onClick={() =>
              navigate(`/checkout/${pkg.id}/travellers`)
            }
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
          >
            Proceed to Booking
          </button>
        </div>
      </div>

      {/* Slide Animation */}
      <style>
        {`
          @keyframes slideRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slideRight {
            animation: slideRight 0.3s ease-out both;
          }
          .animate-slideLeft {
            animation: slideLeft 0.3s ease-out both;
          }
        `}
      </style>
    </div>
  );
};

export default PackageDetails;