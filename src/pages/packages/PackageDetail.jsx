import { useParams, useNavigate } from "react-router-dom";
import { attractionsPackages } from "../../data/attractionsPackages";

const PackageDetails = () => {
  const { country, packageId } = useParams();
  const navigate = useNavigate();

  const packages = attractionsPackages[country?.toLowerCase()] || [];

  const packageData = packages.find(
    (pkg) => pkg.id === packageId
  );

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Package Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">

      <div className="relative h-[420px] w-full overflow-hidden">
        <img
          src={packageData.image}
          alt={packageData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold mb-2">
            {packageData.title}
          </h1>
          <p className="text-sm opacity-90">
            ⭐ {packageData.rating} • {country.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">
            Overview
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {packageData.description}
          </p>
        </div>

        <div>
          <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
            <h3 className="text-2xl font-bold text-blue-600">
              ₹{packageData.price.toLocaleString()}
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              Duration: {packageData.duration}
            </p>

            <button
              onClick={() =>
                navigate(`/checkout/${packageData.id}`)
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;