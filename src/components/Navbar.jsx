import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [countryOpen, setCountryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full absolute top-4 z-50">
      <div className="container">
        <nav className="bg-white/0 rounded-full px-6 h-16 flex items-center justify-between">
          {/* Left - Logo (UNCHANGED) */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo2.png"
              alt="Yaritrip Logo"
              className="h-36 w-auto object-contain"
            />
          </Link>

          {/* Center - Support (DESKTOP ONLY - UNCHANGED) */}
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-700 ml-[510px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 14 14"
            >
              <g fill="none">
                <path
                  fill="#8fbffa"
                  fill-rule="evenodd"
                  d="M7 1.5a3.25 3.25 0 0 0-3.25 3.25v2.5a.75.75 0 0 1-1.5 0v-2.5A4.75 4.75 0 0 1 7 0h.25A4.75 4.75 0 0 1 12 4.75v5.382c0 .892-.448 1.667-.993 2.198c-.534.521-1.274.92-2.007.92a.75.75 0 0 1 0-1.5c.221 0 .606-.148.96-.493c.341-.334.54-.743.54-1.125V4.75A3.25 3.25 0 0 0 7.25 1.5z"
                  clip-rule="evenodd"
                />
                <path
                  fill="#2859c5"
                  d="M5 12.5A1.5 1.5 0 0 1 6.5 11H8a1.5 1.5 0 0 1 0 3H6.5A1.5 1.5 0 0 1 5 12.5m-5-6A1.5 1.5 0 0 1 1.5 5h2.25v4a1 1 0 0 1-1 1H1.5A1.5 1.5 0 0 1 0 8.5zM10.5 5h2A1.5 1.5 0 0 1 14 6.5v2a1.5 1.5 0 0 1-1.5 1.5h-2z"
                />
              </g>
            </svg>
            <span className="font-semibold text-white">Customer Support</span>
          </div>

          {/* Right Section (DESKTOP ONLY - UNCHANGED) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Country Selector */}
            <div className="relative mr-2 text-white">
              <button
                onClick={() => setCountryOpen(!countryOpen)}
                className="flex items-center gap-1 text-sm font-medium text-gray-100 hover:text-sky-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="auto"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#3e87ff"
                    d="M363 176L246 464h47.24l24.49-58h90.54l24.49 58H480Zm-26.69 186L363 279.85L389.69 362ZM272 320c-.25-.19-20.59-15.77-45.42-42.67c39.58-53.64 62-114.61 71.15-143.33H352V90H214V48h-44v42H32v44h219.25c-9.52 26.95-27.05 69.5-53.79 108.36c-32.68-43.44-47.14-75.88-47.33-76.22L143 152l-38 22l6.87 13.86c.89 1.56 17.19 37.9 54.71 86.57c.92 1.21 1.85 2.39 2.78 3.57c-49.72 56.86-89.15 79.09-89.66 79.47L64 368l23 36l19.3-11.47c2.2-1.67 41.33-24 92-80.78c24.52 26.28 43.22 40.83 44.3 41.67L255 362Z"
                  />
                </svg>
                <span className="text-white">English</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {countryOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded-md overflow-hidden text-black">
                  <button className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-black">
                    Arabic
                  </button>
                  <button className="block w-full px-4 py-2 text-sm hover:bg-gray-100">
                    Hindi
                  </button>
                </div>
              )}
            </div>

            <Link
              to="/login"
              className="text-md font-medium px-4 py-1.5 border border-gray-300 rounded-full hover:border-sky-500 hover:text-sky-600 transition text-white"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="text-md font-medium px-4 py-1.5 border border-gray-300 rounded-full hover:border-sky-500 hover:text-sky-600 transition text-white"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger */}
          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl text-white transition-transform duration-300 "
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span
              className={`inline-block transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-90 scale-110" : "rotate-0"
              }`}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </span>
          </button>
        </nav>

        {/* Mobile Menu (ONLY MOBILE) */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden mt-3 bg-white rounded-2xl shadow-md p-4 space-y-4
    transition-all duration-300 ease-in-out
    ${
      mobileMenuOpen
        ? "opacity-100 translate-y-0 max-h-[600px]"
        : "opacity-0 -translate-y-3 max-h-0 overflow-hidden pointer-events-none"
    }
  `}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none" fill-rule="evenodd" clip-rule="evenodd">
                  <path
                    fill="#8fbffa"
                    d="M6 9a6 6 0 1 1 12 0h2A8 8 0 1 0 4 9zm14 8h-2a3 3 0 0 1-3 3v2a5 5 0 0 0 5-5"
                  />
                  <path
                    fill="#2859c5"
                    d="M1 9h5v8H1zm17 0h5v8h-5zm-3 10H9v4h6z"
                  />
                </g>
              </svg>
              <span className="font-bold">Customer Support</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              {" "}
              <div className="relative mr-2">
                <button
                  onClick={() => setCountryOpen(!countryOpen)}
                  className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:text-sky-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#3e87ff"
                      d="M363 176L246 464h47.24l24.49-58h90.54l24.49 58H480Zm-26.69 186L363 279.85L389.69 362ZM272 320c-.25-.19-20.59-15.77-45.42-42.67c39.58-53.64 62-114.61 71.15-143.33H352V90H214V48h-44v42H32v44h219.25c-9.52 26.95-27.05 69.5-53.79 108.36c-32.68-43.44-47.14-75.88-47.33-76.22L143 152l-38 22l6.87 13.86c.89 1.56 17.19 37.9 54.71 86.57c.92 1.21 1.85 2.39 2.78 3.57c-49.72 56.86-89.15 79.09-89.66 79.47L64 368l23 36l19.3-11.47c2.2-1.67 41.33-24 92-80.78c24.52 26.28 43.22 40.83 44.3 41.67L255 362Z"
                    />
                  </svg>
                  <span className="font-bold">English</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {countryOpen && (
                  <div className="absolute mt-2 w-32 bg-white shadow-lg rounded-md overflow-hidden font-bold">
                    <button className="block w-full px-4 py-2 text-sm hover:bg-gray-100">
                      Arabic
                    </button>
                    <button className="block w-full px-4 py-2 text-sm hover:bg-gray-100">
                      Hindi
                    </button>
                  </div>
                )}
              </div>
            </div>

            <Link
              to="/login"
              className="block text-center py-2 border border-gray-300 rounded-full"
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
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
