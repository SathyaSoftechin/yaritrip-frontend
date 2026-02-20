import { useState, useEffect } from "react";

/* -------- IMAGE IMPORTS -------- */
import dubaiGlobal from "../assets/attractions/global-village.png";
import dubaiBurj from "../assets/attractions/burj-khalifa.jpg";
import dubaiYacht from "../assets/attractions/yacht-cruise.jpg";

import indiaTaj from "../assets/attractions/indiaTaj.png";
import indiaJaipur from "../assets/attractions/indiaJaipur.png";
import indiaKerala from "../assets/attractions/indiaKerala.png";

import singaporeSky from "../assets/attractions/singaporeSky.png";
import singaporeGarden from "../assets/attractions/singaporeGarden.png";

import bangkokTemple from "../assets/attractions/bangkokTemple.png";

import exploreDubai from "../assets/attractions/explore.jpg";
import exploreIndia from "../assets/attractions/indiaKerala.png";
import exploreSingapore from "../assets/attractions/singaporeSky.png";
import exploreBangkok from "../assets/attractions/bangkokTemple.png";

import attractionsBg from "../assets/attractions/attractions-bg.jpeg";

/* -------- STATIC FALLBACK DATA -------- */
// Used when API is loading or fails — keeps the UI from going blank
const fallbackData = {
  Dubai: {
    items: [
      { title: "Dubai : Global Village Entry",    image: dubaiGlobal, rating: "8.5", reviews: 2010 },
      { title: "Dubai : Burj Khalifa Lake Ride",  image: dubaiBurj,   rating: "8.5", reviews: 2010 },
      { title: "Dubai : Mega Yacht Dinner Cruise", image: dubaiYacht,  rating: "8.5", reviews: 2010 },
    ],
  },
  India: {
    items: [
      { title: "Taj Mahal Guided Tour",    image: indiaTaj,    rating: "9.1", reviews: 5410 },
      { title: "Jaipur Heritage Walk",     image: indiaJaipur, rating: "8.7", reviews: 2230 },
      { title: "Kerala Backwater Cruise",  image: indiaKerala, rating: "8.9", reviews: 3010 },
    ],
  },
  Singapore: {
    items: [
      { title: "SkyPark Observation Deck", image: singaporeSky,    rating: "8.8", reviews: 1980 },
      { title: "Gardens by the Bay",       image: singaporeGarden, rating: "9.0", reviews: 4120 },
    ],
  },
  Bangkok: {
    items: [
      { title: "Grand Palace & Temple Tour", image: bangkokTemple, rating: "8.6", reviews: 2640 },
    ],
  },
};

const exploreImages = {
  Dubai:     exploreDubai,
  India:     exploreIndia,
  Singapore: exploreSingapore,
  Bangkok:   exploreBangkok,
};

const countries = ["Dubai", "India", "Singapore", "Bangkok"];

const API_BASE = "http://192.168.1.9:8081";

/* -------- COMPONENT -------- */
const Attractions = () => {
  const [activeCountry, setActiveCountry] = useState("Dubai");
  const [items, setItems]                 = useState(fallbackData["Dubai"].items);
  const [loading, setLoading]             = useState(false);

  useEffect(() => {
    const fetchAttractions = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/api/attractions/popular?city=${activeCountry}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // If API returns results, use them; otherwise fall back to static data
        if (data && data.length > 0) {
          setItems(
            data.map((item) => ({
              title:   item.title,
              image:   item.imageUrl,   // backend sends imageUrl, card expects image
              rating:  item.rating.toFixed(1),
              reviews: item.reviews,
            }))
          );
        } else {
          setItems(fallbackData[activeCountry]?.items ?? []);
        }
      } catch (err) {
        console.error("Attractions API error:", err);
        // Silently fall back — UI stays intact
        setItems(fallbackData[activeCountry]?.items ?? []);
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, [activeCountry]);

  const exploreImage = exploreImages[activeCountry];

  return (
    <section className="w-full px-4 py-10 md:py-16">
      <div className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${attractionsBg})` }}
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 p-5 md:p-10 text-white">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            Popular Packages with Great Attractions.
          </h2>

          {/* Tabs - Scrollable on Mobile */}
          <div className="flex gap-3 mb-8 overflow-x-auto scrollbar-hide">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setActiveCountry(country)}
                className={`px-5 py-2 whitespace-nowrap rounded-full text-sm font-medium transition
                  ${
                    activeCountry === country
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
              >
                {country}
              </button>
            ))}
          </div>

          {/* Cards Section */}
          <div
            key={activeCountry}
            className="flex gap-5 md:gap-6 overflow-x-auto md:overflow-visible animate-slide-in scrollbar-hide"
          >
            {/* Loading shimmer — replaces cards only while fetching */}
            {loading
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="min-w-[230px] md:w-[260px] bg-white/20 rounded-2xl p-3 shadow-lg animate-pulse"
                  >
                    <div className="rounded-xl bg-white/30 h-[150px] md:h-[160px] w-full mb-3" />
                    <div className="h-4 bg-white/30 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-white/30 rounded w-1/2" />
                  </div>
                ))
              : items.map((item, idx) => (
                  <div
                    key={idx}
                    className="min-w-[230px] md:min-w-0 md:w-[260px] bg-white rounded-2xl p-3 shadow-lg"
                  >
                    <div className="rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-[150px] md:h-[160px] w-full object-cover"
                      />
                    </div>

                    <div className="pt-3">
                      <p className="text-sm font-medium text-black mb-2 leading-snug">
                        {item.title}
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-semibold">
                          ⭐{item.rating}/5
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.reviews.toLocaleString()} reviews
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

            {/* Explore Card — unchanged */}
            <div className="min-w-[230px] md:w-[260px] relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={exploreImage}
                alt="Explore more"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />

              <div className="relative z-10 p-4 h-full flex flex-col justify-end text-white">
                <p className="text-sm mb-3">Explore more packages</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg w-fit">
                  Go Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(40px); }
            to   { opacity: 1; transform: translateY(0);    }
          }
          .animate-slide-in {
            animation: slideIn 0.45s ease-out both;
          }
        `}
      </style>
    </section>
  );
};

export default Attractions;