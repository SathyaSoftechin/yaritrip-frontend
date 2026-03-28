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
  const [selectedNights, setSelectedNights] = useState("");
  const [sort, setSort] = useState("");
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

  /* ✅ SAFE DEFAULTS (IMPORTANT FIX) */
  const totalRooms = rooms || 1;
  const totalGuests = guests || 2;

  /* -------- FETCH PACKAGES (UNIVERSAL) -------- */
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

        // ✅ CASE 1: Full search (Search bar)
        if (from) {
          url = `http://192.168.1.17:8082/api/packages/search?fromCode=${from}&toCode=${to}&date=${formattedDate}&rooms=${totalRooms}&guests=${totalGuests}`;
        }

        // ✅ CASE 2: Only destination (Go Now button)
        else {
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
  }, [from, to, date, totalRooms, totalGuests]);

  /* -------- FILTER + SORT -------- */
  const filteredData = useMemo(() => {
    let data = [...packages];

    data = data.filter((pkg) => pkg.price <= maxPrice);

    if (selectedNights) {
      data = data.filter(
        (pkg) => pkg.nights === Number(selectedNights)
      );
    }

    if (sort === "priceLow") {
      data.sort((a, b) => a.price - b.price);
    } else if (sort === "priceHigh") {
      data.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    }

    return data;
  }, [packages, maxPrice, selectedNights, sort]);

  /* -------- PAGINATION -------- */
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">

        {/* Sidebar */}
        <FiltersSidebar
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedNights={selectedNights}
          setSelectedNights={setSelectedNights}
        />

        {/* Results */}
        <div className="md:col-span-3">

          {/* ✅ UPDATED HEADER LOGIC */}
          {to && (
            <div className="mb-6 bg-white p-4 rounded-xl shadow-sm mt-20">
              <p className="text-sm text-gray-600">
                {from ? (
                  <>
                    Showing packages from{" "}
                    <span className="font-semibold">
                      {codeToCity[from] || from}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold">
                      {codeToCity[to] || to}
                    </span>
                  </>
                ) : (
                  <>
                    Showing packages for{" "}
                    <span className="font-semibold">
                      {codeToCity[to] || to}
                    </span>
                  </>
                )}
              </p>
            </div>
          )}

          {/* Sorting */}
          <SortingBar sort={sort} setSort={setSort} />

          {/* Loading */}
          {loading && (
            <div className="text-center py-10 text-gray-500">
              Loading packages...
            </div>
          )}

          {/* Results */}
          {!loading && (
            <div className="grid sm:grid-cols-3 gap-6 mt-6">
              {paginatedData.length > 0 ? (
                paginatedData.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))
              ) : (
                <div className="col-span-3 text-center py-16 text-gray-500">
                  No packages found for this destination.
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
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