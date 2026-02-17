import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [countryOpen, setCountryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  // Pages where navbar should NOT be pill-style
  const noPillRoutes = ["/", "/login", "/signup"];
  const isPillNavbar = !noPillRoutes.includes(location.pathname);

  /* ✅ Scroll Logic */
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight; // Hero is full screen

      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Show search only after passing hero section
      if (window.scrollY > heroHeight - 100) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };

    if (isHome) {
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsSticky(true);
      setShowSearch(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  /* ✅ Check Login Status */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedImage = localStorage.getItem("profileImage");

    if (token) {
      setIsLoggedIn(true);
      setProfileImage(storedImage || "https://i.pravatar.cc/150");
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ${
        isSticky ? "fixed top-0 bg-white shadow-md" : "absolute top-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <nav
          className={`h-16 flex items-center justify-between transition-all duration-300
            ${
              isPillNavbar && isSticky
                ? "bg-white rounded-full px-6 shadow-md"
                : "bg-transparent px-0"
            }`}
        >
          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo2.png"
              alt="Yaritrip Logo"
              className="h-36 object-contain transition-all duration-300"
            />
          </Link>

          {/* 🔍 SHRINKED SEARCH */}
          {showSearch && (
            <div className="hidden md:flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full animate-slideDown">
              <input
                type="text"
                placeholder="From"
                className="bg-transparent outline-none text-sm w-24"
              />
              <div className="w-px h-5 bg-gray-300" />
              <input
                type="text"
                placeholder="To Destination"
                className="bg-transparent outline-none text-sm w-32"
              />
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 transition">
                Search
              </button>
            </div>
          )}

          {/* RIGHT SECTION */}
          <div className="hidden md:flex items-center gap-6">

            {/* Customer Support */}
            <div
              className={`flex items-center gap-2 text-sm font-medium
                ${isSticky ? "text-gray-700" : "text-white"}`}
            >
              Customer Support
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setCountryOpen(!countryOpen)}
                className={`flex items-center gap-1 text-sm font-medium
                  ${isSticky ? "text-gray-700" : "text-white"}`}
              >
                English
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {countryOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded-md overflow-hidden">
                  <button className="block w-full px-4 py-2 text-sm hover:bg-gray-100">
                    Arabic
                  </button>
                  <button className="block w-full px-4 py-2 text-sm hover:bg-gray-100">
                    Hindi
                  </button>
                </div>
              )}
            </div>

            {/* AUTH BASED RENDERING */}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-1.5 rounded-full border transition
                    ${
                      isSticky
                        ? "text-gray-100 hover:text-black bg-blue-600"
                        : "border-white hover:text-blue-500 hover:border-blue-500 text-white"
                    }`}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className={`px-4 py-1.5 rounded-full border transition
                    ${
                      isSticky
                        ? "text-gray-100 hover:text-black bg-blue-600"
                        : "border-white hover:text-blue-500 hover:border-blue-500 text-white"
                    }`}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div
                onClick={() => navigate("/user-profile")}
                className="cursor-pointer"
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                />
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className={`md:hidden text-2xl ${
              isSticky ? "text-gray-700" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {/* MOBILE SEARCH */}
        {showSearch && (
          <div className="md:hidden mt-3 bg-white rounded-xl shadow-md p-4 flex gap-2">
            <input
              type="text"
              placeholder="From"
              className="flex-1 border px-2 py-1 rounded"
            />
            <input
              type="text"
              placeholder="To"
              className="flex-1 border px-2 py-1 rounded"
            />
          </div>
        )}

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 bg-white rounded-2xl shadow-md p-4 space-y-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="block text-center py-2 border rounded-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-center py-2 bg-blue-600 text-white rounded-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/user-profile");
                }}
                className="block w-full text-center py-2 bg-blue-600 text-white rounded-full"
              >
                My Profile
              </button>
            )}
          </div>
        )}
      </div>

      {/* Smooth animation */}
      <style>
        {`
          .animate-slideDown {
            animation: slideDown 0.3s ease forwards;
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </header>
  );
};

export default Navbar;
