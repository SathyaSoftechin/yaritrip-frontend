import { useState } from "react";

/* ---------------- IMAGE IMPORTS ---------------- */
import Heritage from "../assets/properties/heritage.png";
import oberoi from "../assets/properties/oberoi.png";
import keralaResort from "../assets/properties/kerala-resort.png";
import goaResort from "../assets/properties/goa-resort.png";
import kolkataHotel from "../assets/properties/kolkata.png";
import mumbaiHotel from "../assets/properties/mumbai.png";
import udaipurHotel from "../assets/properties/udaipur.png";

/* ---------------- DATA STRUCTURE ---------------- */

const propertiesData = {
  India: {
    regions: {
      "North India": [
        {
          title: "The Oberoi Amarvilas, Agra",
          image: oberoi,
          rating: "9.2/10",
          nights: "2 days/3 nights",
          reviews: "2,140 reviews",
          price: "₹22,500",
        },
        {
          title: "Jaipur Heritage Palace",
          image: Heritage,
          rating: "8.9/10",
          nights: "3 days/4 nights",
          reviews: "1,820 reviews",
          price: "₹18,200",
        },
      ],
      "South India": [
        {
          title: "Kerala Backwater Resort",
          image: keralaResort,
          rating: "9.0/10",
          nights: "2 days/3 nights",
          reviews: "3,010 reviews",
          price: "₹14,800",
        },
        {
          title: "Goa Beachfront Villa",
          image: goaResort,
          rating: "8.7/10",
          nights: "3 days/4 nights",
          reviews: "2,540 reviews",
          price: "₹19,900",
        },
      ],
      "East India": [
        {
          title: "Kolkata Luxury Stay",
          image: kolkataHotel,
          rating: "8.5/10",
          nights: "2 days/3 nights",
          reviews: "1,120 reviews",
          price: "₹12,400",
        },
      ],
      "West India": [
        {
          title: "Mumbai Skyline Suites",
          image: mumbaiHotel,
          rating: "8.8/10",
          nights: "2 days/3 nights",
          reviews: "2,300 reviews",
          price: "₹20,100",
        },
        {
          title: "Udaipur Palace",
          image: udaipurHotel,
          rating: "8.8/10",
          nights: "2 days/3 nights",
          reviews: "2,300 reviews",
          price: "₹20,100",
        },
      ],
    },
  },
};

const Properties = () => {
  const [activeRegion, setActiveRegion] = useState("North India");

  const regions = Object.keys(propertiesData.India.regions);
  const listings = propertiesData.India.regions[activeRegion];

  return (
    <section className="w-full px-4 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-8">
          Handpicked Premium Stays in India
        </h2>

        {/* Region Tabs */}
        <div className="flex gap-4 mb-10 flex-wrap">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeRegion === region
                    ? "bg-blue-800 text-white scale-105"
                    : "bg-white border border-gray-300 hover:bg-gray-100"
                }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Property Cards */}
        <div
          key={activeRegion}
          className="grid md:grid-cols-4 gap-6 animate-region"
        >
          {listings.map((property, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 animate-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="h-[180px] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-sm font-medium mb-3">
                  {property.title}
                </p>

                <div className="flex items-center gap-2 text-xs mb-2">
                  <span className="bg-blue-400 text-white px-2 py-0.5 rounded-md font-semibold">
                    ⭐{property.rating}
                  </span>
                  <span className="text-orange-500 font-semibold">
                    {property.nights}
                  </span>
                  <span className="text-gray-500">
                    {property.reviews}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-gray-500 text-sm">Starting from </span>
                  <span className="font-bold text-lg">
                    {property.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeSlideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-region {
            animation: fadeSlideUp 0.4s ease-out;
          }

          .animate-card {
            opacity: 0;
            animation: fadeSlideUp 0.6s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
};

export default Properties;
