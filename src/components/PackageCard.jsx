import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PackageCard = ({ pkg }) => {
  console.log("PACKAGE CARD DATA:", pkg);

  const navigate = useNavigate();

  // 🔑 get userId (make sure it's stored after login)
  const userId = localStorage.getItem("userId");

  const [wishlisted, setWishlisted] = useState(false);

  // ✅ OPTIONAL: sync with backend (preload wishlist state)
  useEffect(() => {
    const fetchWishlistStatus = async () => {
      try {
        const res = await fetch("http://192.168.1.17:8080/api/wishlist");
        if (!res.ok) return;

        const data = await res.json();
        const exists = data.some((item) => item.id === pkg.id);

        setWishlisted(exists);
      } catch (err) {
        console.error("Wishlist fetch error:", err);
      }
    };

    fetchWishlistStatus();
  }, [pkg.id]);

  const handleClick = () => {
    navigate(`/package/${pkg.id}`);
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();

    try {
      if (!userId) {
        console.error("User not logged in");
        return;
      }

      if (wishlisted) {
        await fetch(
          // `http://localhost:8080/api/wishlist/${pkg.id}?userId=${userId}`,
          `http://192.168.1.17:8080/api/wishlist/${pkg.id}?userId=${userId}`,
          {
            method: "DELETE",
          },
        );
      } else {
        await fetch(
          // `http://localhost:8080/api/wishlist/${pkg.id}?userId=${userId}`,
          `http://192.168.1.17:8080/api/wishlist/${pkg.id}?userId=${userId}`,
          {
            method: "POST",
          },
        );
      }

      setWishlisted(!wishlisted);
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-sm overflow-hidden
                 hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300
                 cursor-pointer"
    >
      <div className="relative group overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white rounded-full 
                     w-9 h-9 flex items-center justify-center
                     shadow-md hover:scale-110 transition duration-300"
        >
          {wishlisted ? "❤️" : "🤍"}
        </button>

        <div className="absolute top-3 left-3 bg-white/95 px-2 py-1 rounded-md shadow-sm text-xs font-medium flex items-center gap-1">
          ⭐ {pkg.rating}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-base text-gray-800 line-clamp-1">
          {pkg.location}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {pkg.location} • {pkg.nights} Nights
        </p>

        <div className="border-t my-3"></div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Package Starting from</span>

          <span className="font-semibold text-lg text-gray-900">
            ₹{pkg.price.toLocaleString()}
            <span className="text-xs text-gray-500"> /person</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
