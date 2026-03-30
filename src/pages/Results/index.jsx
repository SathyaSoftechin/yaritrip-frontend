import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FiltersSidebar from "./FiltersSidebar";
import SortingBar from "./SortingBar";
import Pagination from "./Pagination";
import PackageCard from "../../components/PackageCard";

/* -------- CODE → CITY MAPPING -------- */
const codeToCity = {
  DXB: "Dubai",
  DEL: "India",
  SIN: "Singapore",
  BKK: "Bangkok",
};

const Results = () => {
  const [maxPrice, setMaxPrice] = useState(8000000);
  const [selectedNights, setSelectedNights] = useState(5);
  const [sort, setSort] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // 🔥 NEW STATES
  const [selectedBudget, setSelectedBudget] = useState([]);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const itemsPerPage = 4;

  /* -------- QUERY PARAMS -------- */
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");
  const rooms = searchParams.get("rooms");
  const guests = searchParams.get("guests");

  /* -------- FETCH PACKAGES -------- */
  useEffect(() => {
    const fetchPackages = async () => {
      if (!to) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const formattedDate =
          date || new Date().toISOString().split("T")[0];

        let url = "";

        if (from) {
          url = `http://192.168.1.17:8082/api/packages/search?fromCode=${from}&toCode=${to}&date=${formattedDate}&rooms=${rooms || 1}&guests=${guests || 1}`;
        } else {
          url = `http://192.168.1.17:8082/api/packages/by-destination?toCode=${to}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [from, to, date, rooms, guests]);

  /* -------- FILTER + SORT -------- */
  const filteredData = useMemo(() => {
    let data = [...packages];

    // Category
    if (activeCategory !== "all") {
      data = data.filter((pkg) => pkg.category === activeCategory);
    }

    // Price
    data = data.filter((pkg) => pkg.price <= maxPrice);

    // Nights
    if (selectedNights) {
      data = data.filter(
        (pkg) => pkg.nights === Number(selectedNights)
      );
    }

    // 🔥 Budget Filter
    if (selectedBudget.length > 0) {
      data = data.filter((pkg) => {
        return selectedBudget.some((range) => {
          if (range === "0-10000") return pkg.price <= 10000;
          if (range === "10000-15000")
            return pkg.price > 10000 && pkg.price <= 15000;
          if (range === "15000-20000")
            return pkg.price > 15000 && pkg.price <= 20000;
          if (range === "20000+") return pkg.price > 20000;
          return true;
        });
      });
    }

    // 🔥 Star Filter
    if (selectedStars.length > 0) {
      data = data.filter((pkg) =>
        selectedStars.includes(pkg.hotelRating)
      );
    }

    // 🔥 City Filter
    if (selectedCities.length > 0) {
      data = data.filter((pkg) =>
        selectedCities.includes(pkg.city)
      );
    }

    // Sorting
    if (sort === "priceLow") {
      data.sort((a, b) => a.price - b.price);
    } else if (sort === "priceHigh") {
      data.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    }

    return data;
  }, [
    packages,
    maxPrice,
    selectedNights,
    sort,
    activeCategory,
    selectedBudget,
    selectedStars,
    selectedCities,
  ]);

  /* -------- CATEGORY COUNTS -------- */
  const categoryCounts = useMemo(() => {
    const counts = {
      all: packages.length,
      longWeekend: 0,
      honeymoon: 0,
      beach: 0,
      northGoa: 0,
    };

    packages.forEach((pkg) => {
      if (pkg.category && counts[pkg.category] !== undefined) {
        counts[pkg.category]++;
      }
    });

    return counts;
  }, [packages]);

  /* -------- RESET PAGE ON FILTER CHANGE -------- */
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  /* -------- PAGINATION -------- */
  const totalPages = Math.ceil(
    filteredData.length / itemsPerPage
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      {/* HERO */}
      <div className="w-full h-[420px] relative rounded-2xl overflow-hidden">
        <img
          src="/beach-banner.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

        {to && (
          <div className="absolute bottom-48 left-8 text-white">
            <h1 className="text-4xl font-bold">
              {codeToCity[to] || to} Packages
            </h1>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 -mt-40 relative z-20">

        {/* Sidebar */}
        <div className="bg-white rounded-2xl shadow-lg">
          <FiltersSidebar
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedNights={selectedNights}
            setSelectedNights={setSelectedNights}
            selectedBudget={selectedBudget}
            setSelectedBudget={setSelectedBudget}
            selectedStars={selectedStars}
            setSelectedStars={setSelectedStars}
            selectedCities={selectedCities}
            setSelectedCities={setSelectedCities}
          />
        </div>

        {/* Results */}
        <div className="md:col-span-3 bg-white rounded-2xl shadow-lg px-6 pb-6 pt-1">
          <SortingBar
            sort={sort}
            setSort={setSort}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categoryCounts={categoryCounts}
          />

          {loading ? (
            <div className="text-center py-10 text-gray-500">
              Loading packages...
            </div>
          ) : (
            <>
              <div className="text-sm text-gray-500 mb-3">
                {filteredData.length} packages found
              </div>

              <div className="grid sm:grid-cols-3 gap-6 mt-4">
                {paginatedData.length > 0 ? (
                  paginatedData.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-16 text-gray-500">
                    No packages found.
                  </div>
                )}
              </div>
            </>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;