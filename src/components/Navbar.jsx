import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [countryOpen, setCountryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Pages where navbar should NOT be pill-style
  const noPillRoutes = ["/", "/login", "/signup"];
  const isPillNavbar = !noPillRoutes.includes(location.pathname);

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
    <header className="w-full absolute top-4 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <nav
          className={`h-16 flex items-center justify-between transition-all duration-300
            ${
              isPillNavbar
                ? "bg-white rounded-full px-6 shadow-md"
                : "bg-transparent px-0"
            }`}
        >
          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo2.png"
              alt="Yaritrip Logo"
              className="h-36 object-contain"
            />
          </Link>

          {/* RIGHT SECTION */}
          <div className="hidden md:flex items-center gap-6">

            {/* Customer Support */}
            <div
              className={`flex items-center gap-2 text-sm font-medium
                ${isPillNavbar ? "text-gray-700" : "text-white"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 14 14"
              >
                <g fill="none">
                  <path
                    fill="#8fbffa"
                    fillRule="evenodd"
                    d="M7 1.5a3.25 3.25 0 0 0-3.25 3.25v2.5a.75.75 0 0 1-1.5 0v-2.5A4.75 4.75 0 0 1 7 0h.25A4.75 4.75 0 0 1 12 4.75v5.382c0 .892-.448 1.667-.993 2.198c-.534.521-1.274.92-2.007.92a.75.75 0 0 1 0-1.5c.221 0 .606-.148.96-.493c.341-.334.54-.743.54-1.125V4.75A3.25 3.25 0 0 0 7.25 1.5z"
                    clipRule="evenodd"
                  />
                  <path
                    fill="#2859c5"
                    d="M5 12.5A1.5 1.5 0 0 1 6.5 11H8a1.5 1.5 0 0 1 0 3H6.5A1.5 1.5 0 0 1 5 12.5m-5-6A1.5 1.5 0 0 1 1.5 5h2.25v4a1 1 0 0 1-1 1H1.5A1.5 1.5 0 0 1 0 8.5zM10.5 5h2A1.5 1.5 0 0 1 14 6.5v2a1.5 1.5 0 0 1-1.5 1.5h-2z"
                  />
                </g>
              </svg>
              Customer Support
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setCountryOpen(!countryOpen)}
                className={`flex items-center gap-1 text-sm font-medium
                  ${isPillNavbar ? "text-gray-700" : "text-white"}`}
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

            {/* ✅ AUTH BASED RENDERING */}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-1.5 rounded-full border transition
                    ${
                      isPillNavbar
                        ? "text-gray-100 hover:text-black bg-blue-600"
                        : "border-white text-white"
                    }`}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className={`px-4 py-1.5 rounded-full border transition
                    ${
                      isPillNavbar
                        ? "text-gray-100 hover:text-black bg-blue-600"
                        : "border-white text-white"
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
              isPillNavbar ? "text-gray-700" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </nav>

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
    </header>
  );
};

export default Navbar;
