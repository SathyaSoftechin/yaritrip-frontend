import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { packagesData } from "./mockData";
import FiltersSidebar from "./FiltersSidebar";
import SortingBar from "./SortingBar";
import Pagination from "./Pagination";
import PackageCard from "../../components/PackageCard";

const Results = () => {
  const [maxPrice, setMaxPrice] = useState(80000);
  const [selectedNights, setSelectedNights] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  /* -------- READ SEARCH PARAMS FROM HERO -------- */
  const [searchParams] = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  const filteredData = useMemo(() => {
    let data = [...packagesData];

    // Only filter by destination
    if (to) {
      data = data.filter((pkg) => pkg.code === to);
    }

    data = data.filter((pkg) => pkg.price <= maxPrice);

    if (selectedNights) {
      data = data.filter((pkg) => pkg.nights === Number(selectedNights));
    }

    if (sort === "priceLow") {
      data = [...data].sort((a, b) => a.price - b.price);
    } else if (sort === "priceHigh") {
      data = [...data].sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      data = [...data].sort((a, b) => b.rating - a.rating);
    }

    return data;
  }, [to, maxPrice, selectedNights, sort]);

  /* -------- PAGINATION -------- */
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
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

        {/* Results Section */}
        <div className="md:col-span-3">
          {/* Optional: Show Search Info */}
          {(from || to || date) && (
            <div className="mb-6 bg-white p-4 rounded-xl shadow-sm mt-20">
              <p className="text-sm text-gray-600">
                Showing Available Packages
                {from && (
                  <>
                    {" "}
                    from <span className="font-semibold">{from}</span>
                  </>
                )}
                {to && (
                  <>
                    {" "}
                    to <span className="font-semibold">{to}</span>
                  </>
                )}
                {/* {date && <> on <span className="font-semibold">{date}</span></>} */}
              </p>
            </div>
          )}

          <SortingBar sort={sort} setSort={setSort} />

          <div className="grid sm:grid-cols-3 gap-6 mt-6">
            {paginatedData.length > 0 ? (
              paginatedData.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)
            ) : (
              <div className="col-span-2 text-center py-16 text-gray-500">
                No packages found for this search.
              </div>
            )}
          </div>

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
