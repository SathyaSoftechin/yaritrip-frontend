import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPackagesByCountry } from "../../services/package.service";

const CountryPackages = () => {
  const { country } = useParams();
  const navigate = useNavigate();

  const normalizedCountry = country?.toLowerCase();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadPackages = async () => {
      setLoading(true);
      try {
        const data = await fetchPackagesByCountry(normalizedCountry);

        if (!mounted) return;

        setPackages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log("Backend down — using fallback");

        if (!mounted) return;

        setPackages([
          {
            id: "dubai-global-village",
            title: "Dubai : Global Village Entry",
            duration: "3N/4D",
            price: 24999,
            imageUrl:
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
          },
        ]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadPackages();

    return () => {
      mounted = false;
    };
  }, [normalizedCountry]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading packages...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 capitalize">
          {normalizedCountry} Packages
        </h1>

        {packages.length === 0 ? (
          <div className="text-center text-gray-500">
            No packages available
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() =>
                  navigate(`/packages/${normalizedCountry}/${pkg.id}`)
                }
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="font-semibold mb-2">
                    {pkg.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-2">
                    {pkg.duration}
                  </p>

                  <p className="text-blue-600 font-bold text-lg">
                    ₹{pkg.price?.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryPackages;