import { useParams, useNavigate } from "react-router-dom";
import { packagesData } from "./Results/mockData";
import { useMemo, useState, useEffect, useRef } from "react";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Overview");
  const [direction, setDirection] = useState("right");
  const [openDay, setOpenDay] = useState(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  /* -------- ACTIVITY STATES -------- */
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [activeActivityDay, setActiveActivityDay] = useState(null);

  const touchStartX = useRef(null);
  const modalRef = useRef(null);

  const pkg = useMemo(() => {
    return packagesData.find((item) => item.id === Number(id));
  }, [id]);

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

  /* -------- ADD-ON ACTIVITIES -------- */
  const activitiesList = [
    {
      id: 1,
      name: "Desert Safari Experience",
      price: 3500,
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    {
      id: 2,
      name: "Luxury Yacht Cruise",
      price: 5200,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      id: 3,
      name: "Helicopter City Tour",
      price: 8900,
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      id: 4,
      name: "Adventure Water Sports",
      price: 4200,
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b",
    },
  ];

  /* -------- TAB CHANGE -------- */
  const handleTabChange = (tab) => {
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = tabs.indexOf(tab);
    setDirection(newIndex > currentIndex ? "right" : "left");
    setActiveTab(tab);
  };

  /* -------- ACTIVITY TOGGLE -------- */
  const handleActivityToggle = (activity, day) => {
    const exists = selectedActivities.find(
      (item) => item.id === activity.id && item.day === day,
    );

    if (exists) {
      setSelectedActivities((prev) =>
        prev.filter((item) => !(item.id === activity.id && item.day === day)),
      );
    } else {
      setSelectedActivities((prev) => [...prev, { ...activity, day }]);
    }
  };

  /* -------- PRICE CALCULATION -------- */
  const activitiesTotal = selectedActivities.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  const totalPrice = pkg.price + activitiesTotal;

  /* -------- MODAL CLOSE LOGIC -------- */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setActivityModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setActivityModalOpen(false);
    }
  };

  /* -------- LIGHTBOX -------- */
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
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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
                index === 0 ? "col-span-2 row-span-2 h-64 md:h-80" : "h-40"
              } w-full object-cover rounded-xl cursor-pointer hover:scale-105 transition`}
            />
          ))}
        </div>

        {/* TABS */}
        <div className="sticky top-16 bg-gray-100 pt-6 z-10">
          <div className="relative flex gap-6 border-b border-gray-300 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`relative pb-3 text-sm font-medium transition
                  ${
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
        {/* LEFT CONTENT */}
        <div className="md:col-span-2">
          <div
            key={activeTab}
            className={`transition-all duration-300 ${
              direction === "right" ? "animate-slideRight" : "animate-slideLeft"
            } bg-white rounded-2xl shadow p-6`}
          >
            {activeTab === "Overview" && (
              <>
                <h2 className="text-lg font-semibold mb-4">Package Overview</h2>
                <p className="text-gray-600">
                  Enjoy a premium {pkg.nights}-night getaway in{" "}
                  <strong>{pkg.location}</strong>. Includes hotels, transfers,
                  sightseeing and curated experiences.
                </p>
              </>
            )}

            {activeTab === "Itinerary" &&
              Array.from({ length: pkg.nights }).map((_, index) => (
                <div key={index} className="border rounded-xl mb-4">
                  <button
                    onClick={() => setOpenDay(openDay === index ? null : index)}
                    className="w-full px-4 py-3 flex justify-between font-medium"
                  >
                    Day {index + 1}
                    <span>{openDay === index ? "−" : "+"}</span>
                  </button>

                  {openDay === index && (
                    <div className="px-4 pb-4 space-y-4 text-sm text-gray-600">
                      <p>
                        Arrival, check-in, sightseeing and curated experiences.
                      </p>

                      <button
                        onClick={() => {
                          setActiveActivityDay(index);
                          setActivityModalOpen(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs hover:bg-blue-700 transition"
                      >
                        + Add Activity
                      </button>
                    </div>
                  )}
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
              <p className="text-gray-600">
                Guided tours, adventure sports and curated experiences.
              </p>
            )}
          </div>
        </div>

        {/* PRICE CARD */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-28">
          <h3 className="text-lg font-semibold">Starting From</h3>

          <div className="mt-3 text-3xl font-bold transition-all duration-300">
            ₹{totalPrice.toLocaleString()}
            <span className="text-sm text-gray-500"> /person</span>
          </div>

          {activitiesTotal > 0 && (
            <div className="mt-2 text-sm text-green-600 font-medium">
              + ₹{activitiesTotal.toLocaleString()} added on selected activities
            </div>
          )}

          <div className="mt-2 text-yellow-500">⭐ {pkg.rating} Rating</div>

          {/* -------- SELECTED ACTIVITIES SUMMARY -------- */}
          {selectedActivities.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-semibold mb-3 text-gray-700">
                Selected Activities Breakdown
              </h4>

              {Object.entries(
                selectedActivities.reduce((acc, activity) => {
                  if (!acc[activity.day]) acc[activity.day] = [];
                  acc[activity.day].push(activity);
                  return acc;
                }, {}),
              ).map(([day, activities]) => (
                <div key={day} className="mb-4">
                  <p className="text-xs font-semibold text-gray-600 mb-2">
                    Day {Number(day) + 1}
                  </p>

                  {activities.map((act, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-xs text-gray-700 mb-1"
                    >
                      <span>{act.name}</span>
                      <span className="font-medium">
                        ₹{act.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => navigate(`/checkout/${pkg.id}`)}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
          >
            Proceed to Booking
          </button>

          <p className="mt-6 text-xs text-red-500">
            <b>*Prices may vary depending on availability.</b>
          </p>
        </div>
      </div>

      {/* -------- ANIMATED ACTIVITY MODAL -------- */}
      {activityModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn"
          onClick={handleOverlayClick}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-2xl p-6 w-full max-w-4xl relative max-h-[85vh] overflow-y-auto animate-scaleIn"
          >
            <button
              onClick={() => setActivityModalOpen(false)}
              className="absolute top-4 right-4 text-xl"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-1">{pkg.title} Package</h3>

            <p className="text-sm text-gray-500 mb-6">
              Add Activity – Day {activeActivityDay + 1} of {pkg.nights}-Night
              Trip
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {activitiesList.map((activity) => {
                const isSelected = selectedActivities.find(
                  (item) =>
                    item.id === activity.id && item.day === activeActivityDay,
                );

                return (
                  <div
                    key={activity.id}
                    className="border rounded-xl overflow-hidden shadow"
                  >
                    <img
                      src={activity.image}
                      alt={activity.name}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold">{activity.name}</h4>
                      <p className="text-sm text-gray-500 mb-3">
                        ₹{activity.price.toLocaleString()}
                      </p>

                      <button
                        onClick={() =>
                          handleActivityToggle(activity, activeActivityDay)
                        }
                        className={`w-full py-2 rounded-lg text-sm ${
                          isSelected
                            ? "bg-red-500 text-white"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {isSelected ? "Remove" : "Add Activity"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>
        {`
          .animate-slideRight {
            animation: slideRight 0.3s ease forwards;
          }
          .animate-slideLeft {
            animation: slideLeft 0.3s ease forwards;
          }
          .animate-fadeIn {
            animation: fadeIn 0.25s ease forwards;
          }
          .animate-scaleIn {
            animation: scaleIn 0.25s ease forwards;
          }

          @keyframes slideRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default PackageDetails;
