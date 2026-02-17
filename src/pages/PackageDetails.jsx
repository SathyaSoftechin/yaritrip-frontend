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

  const touchStartX = useRef(null);

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

  /* ---------------- TAB ANIMATION ---------------- */

  const handleTabChange = (tab) => {
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = tabs.indexOf(tab);
    setDirection(newIndex > currentIndex ? "right" : "left");
    setActiveTab(tab);
  };

  /* ---------------- LIGHTBOX ---------------- */

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

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  /* ---------------- AUTO SLIDE ---------------- */

  useEffect(() => {
    if (!lightboxOpen || !autoSlide) return;
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, [lightboxOpen, autoSlide]);

  /* ---------------- KEYBOARD ---------------- */

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  /* ---------------- SWIPE ---------------- */

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (!touchStartX.current) return;

    if (touchStartX.current - touchEndX > 50) nextImage();
    if (touchEndX - touchStartX.current > 50) prevImage();
  };

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

      {/* ---------------- YOUR PROVIDED SECTION INTEGRATED ---------------- */}

      <div className="max-w-7xl mx-auto px-6 mt-10 grid md:grid-cols-3 gap-8">

        {/* Left Content */}
        <div className="md:col-span-2 overflow-hidden">

          <div
            key={activeTab}
            className={`transition-all duration-400 ${
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
                  <strong>{pkg.location}</strong>. Includes hotels,
                  transfers, sightseeing and curated experiences.
                </p>
              </>
            )}

            {activeTab === "Itinerary" &&
              Array.from({ length: pkg.nights }).map((_, index) => (
                <div key={index} className="border rounded-xl mb-4">
                  <button
                    onClick={() =>
                      setOpenDay(openDay === index ? null : index)
                    }
                    className="w-full px-4 py-3 flex justify-between font-medium"
                  >
                    Day {index + 1}
                    <span>{openDay === index ? "−" : "+"}</span>
                  </button>
                  {openDay === index && (
                    <div className="px-4 pb-4 text-sm text-gray-600">
                      Arrival, check-in, sightseeing and local
                      experiences.
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
                Guided tours, adventure sports and curated
                experiences.
              </p>
            )}
          </div>
        </div>

        {/* Price Card */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-28">
          <h3 className="text-lg font-semibold">Starting From</h3>
          <div className="mt-3 text-3xl font-bold">
            ₹{pkg.price.toLocaleString()}
            <span className="text-sm text-gray-500"> /person</span>
          </div>
          <div className="mt-2 text-yellow-500">
            ⭐ {pkg.rating} Rating
          </div>
          <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition">
            Proceed to Booking
          </button>
          <p className="mt-6 text-xs text-red-500">
            <b>*Prices may vary depending on availability.</b>
          </p>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">

          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ✕
          </button>

          <div className="absolute top-6 left-6 text-white text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>

          <button
            onClick={prevImage}
            className="absolute left-6 text-white text-5xl hover:scale-110 transition"
          >
            ‹
          </button>

          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="max-w-5xl w-full px-6"
          >
            <img
              src={images[currentImageIndex]}
              alt=""
              className="max-h-[75vh] mx-auto rounded-xl shadow-2xl transition hover:scale-105"
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-6 text-white text-5xl hover:scale-110 transition"
          >
            ›
          </button>

          <div className="flex gap-3 mt-6 overflow-x-auto px-6 max-w-4xl">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setCurrentImageIndex(index)}
                className={`h-20 w-28 object-cover rounded-lg cursor-pointer border-2 transition
                  ${
                    currentImageIndex === index
                      ? "border-blue-500"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
              />
            ))}
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
          @keyframes slideRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>

    </div>
  );
};

export default PackageDetails;
