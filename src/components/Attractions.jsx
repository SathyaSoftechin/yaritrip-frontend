import { useState } from "react";

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

/* -------- DATA -------- */
const attractionsData = {
  Dubai: {
    exploreImage: exploreDubai,
    items: [
      {
        title: "Dubai : Global Village Entry",
        image: dubaiGlobal,
        rating: "8.5/10",
        reviews: "2,010 reviews",
      },
      {
        title: "Dubai : Burj khalifa lake ride",
        image: dubaiBurj,
        rating: "8.5/10",
        reviews: "2,010 reviews",
      },
      {
        title: "Dubai : Mega Yacht Dinner Cruise",
        image: dubaiYacht,
        rating: "8.5/10",
        reviews: "2,010 reviews",
      },
    ],
  },
  India: {
    exploreImage: exploreIndia,
    items: [
      {
        title: "Taj Mahal Guided Tour",
        image: indiaTaj,
        rating: "9.1/10",
        reviews: "5,410 reviews",
      },
      {
        title: "Jaipur Heritage Walk",
        image: indiaJaipur,
        rating: "8.7/10",
        reviews: "2,230 reviews",
      },
      {
        title: "Kerala Backwater Cruise",
        image: indiaKerala,
        rating: "8.9/10",
        reviews: "3,010 reviews",
      },
    ],
  },
  Singapore: {
    exploreImage: exploreSingapore,
    items: [
      {
        title: "SkyPark Observation Deck",
        image: singaporeSky,
        rating: "8.8/10",
        reviews: "1,980 reviews",
      },
      {
        title: "Gardens by the Bay",
        image: singaporeGarden,
        rating: "9.0/10",
        reviews: "4,120 reviews",
      },
    ],
  },
  Bangkok: {
    exploreImage: exploreBangkok,
    items: [
      {
        title: "Grand Palace & Temple Tour",
        image: bangkokTemple,
        rating: "8.6/10",
        reviews: "2,640 reviews",
      },
    ],
  },
};

const countries = Object.keys(attractionsData);

const Attractions = () => {
  const [activeCountry, setActiveCountry] = useState("Dubai");
  const { items, exploreImage } = attractionsData[activeCountry];

  return (
    <section className="w-full px-4 py-16">
      {/* ✅ CLIPPING WRAPPER */}
      <div className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 rounded-3xl bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${attractionsBg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "98% 100%",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-10 text-white bg-gradient-to-r">
          <h2 className="text-2xl font-semibold mb-6">
            Popular Packages with Great Attractions.
          </h2>

          {/* Tabs */}
          <div className="flex gap-3 mb-8">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setActiveCountry(country)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition
                  ${
                    activeCountry === country
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
              >
                {country}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div
            key={activeCountry}
            className="flex gap-6 items-stretch animate-slide-in"
          >
            {items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-3 w-[260px] shadow-lg"
              >
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[160px] w-full object-cover"
                  />
                </div>

                <div className="pt-3">
                  <p className="text-sm font-medium text-black mb-2 leading-snug">
                    {item.title}
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-semibold">
                      {item.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.reviews}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Explore Card */}
            <div className="relative rounded-2xl overflow-hidden w-[260px] shadow-lg">
              <img
                src={exploreImage}
                alt="Explore more"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                <p className="text-sm mb-3">
                  Explore more packages for popular destinations
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg w-fit">
                  Go Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ FIXED ANIMATION */}
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
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
