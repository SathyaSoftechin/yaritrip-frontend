import React, { useState } from "react";

const FiltersSidebar = ({
  maxPrice,
  setMaxPrice,
  selectedNights,
  setSelectedNights,
}) => {
  const [selectedBudget, setSelectedBudget] = useState([]);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [searchCity, setSearchCity] = useState("");

  const toggleSelection = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  return (
    <div className="bg-white w-full max-w-xs rounded-2xl shadow-md overflow-y-auto h-screen p-5 space-y-8 mt-5">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={() => {
            setSelectedNights(5);
            setMaxPrice(8000000);
            setSelectedBudget([]);
            setSelectedStars([]);
            setSelectedCities([]);
          }}
          className="text-sm text-orange-500 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* 🔥 Duration */}
      <div>
        <p className="text-sm font-medium mb-3">Duration</p>

        {/* Quick Select */}
        <div className="flex gap-2 flex-wrap mb-4">
          {[2, 3, 5, 7].map((nights) => (
            <button
              key={nights}
              onClick={() => setSelectedNights(nights)}
              className={`px-3 py-1 rounded-full text-sm border transition ${
                selectedNights === nights
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {nights}N
            </button>
          ))}
        </div>

        {/* Slider */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">
              {selectedNights <= 3
                ? "Short"
                : selectedNights <= 6
                ? "Medium"
                : "Long"}
            </span>
            <span className="text-orange-500 font-semibold">
              {selectedNights} Nights
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="10"
            value={selectedNights}
            onChange={(e) => setSelectedNights(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>
      </div>

      {/* 🔥 Budget (Modern Chips instead of checkboxes) */}
      <div>
        <p className="text-sm font-medium mb-3">Budget</p>

        <div className="flex flex-wrap gap-2">
          {[
            "0-10000",
            "10000-15000",
            "15000-20000",
            "20000+",
          ].map((range) => (
            <button
              key={range}
              onClick={() =>
                toggleSelection(range, selectedBudget, setSelectedBudget)
              }
              className={`px-3 py-1 rounded-full text-sm border ${
                selectedBudget.includes(range)
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              ₹{range}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 Hotel Category (Star UI) */}
      <div>
        <p className="text-sm font-medium mb-3">Hotel Category</p>

        <div className="flex gap-2 flex-wrap">
          {[2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() =>
                toggleSelection(star, selectedStars, setSelectedStars)
              }
              className={`px-3 py-1 rounded-full text-sm border ${
                selectedStars.includes(star)
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {"⭐".repeat(star)}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 Cities with Search */}
      <div>
        <p className="text-sm font-medium mb-3">Cities</p>

        <input
          type="text"
          placeholder="Search city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="w-full border rounded-lg p-2 text-sm mb-3"
        />

        <div className="space-y-2 max-h-32 overflow-y-auto">
          {["Agatti", "Goa", "Hampi"]
            .filter((city) =>
              city.toLowerCase().includes(searchCity.toLowerCase())
            )
            .map((city) => (
              <label key={city} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCities.includes(city)}
                  onChange={() =>
                    toggleSelection(city, selectedCities, setSelectedCities)
                  }
                />
                {city}
              </label>
            ))}
        </div>
      </div>

      {/* 🔥 Package Type (Better Toggle UI) */}
      <div>
        <p className="text-sm font-medium mb-3">Package Type</p>

        <div className="flex gap-2">
          {["Customization", "Group"].map((type) => (
            <button
              key={type}
              className="px-4 py-2 rounded-full border text-sm bg-gray-100 hover:bg-gray-200"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 Premium Toggle */}
      <div>
        <p className="text-sm font-medium mb-2">Premium</p>

        <label className="flex items-center justify-between text-sm">
          <span>Premium Packages</span>
          <input type="checkbox" className="accent-orange-500" />
        </label>
      </div>
    </div>
  );
};

export default FiltersSidebar;