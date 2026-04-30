import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

import footerBg from "../assets/footer-bg.jpeg";
import suitcaseImg from "../assets/footer-img.png";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="relative w-full overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${footerBg})` }}
        />
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-12 text-white">

          {/* TOP SECTION */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-10 items-start">

            {/* LOGO + SOCIAL */}
            <div className="lg:col-span-2">
              <div className="h-32 flex items-center">
                <img
                  src="/logo2.png"
                  alt="yaritrip"
                  className="h-full object-contain scale-110"
                />
              </div>

              <div className="flex gap-5 text-lg">
                <FaFacebookF className="hover:text-blue-400 cursor-pointer" />
                <FaTwitter className="hover:text-sky-400 cursor-pointer" />
                <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                <FaLinkedinIn className="hover:text-blue-500 cursor-pointer" />
                <FaYoutube className="hover:text-red-500 cursor-pointer" />
              </div>
            </div>

            {/* PRODUCT */}
            <div>
              <h4 className="text-lime-400 font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="hover:text-white cursor-pointer">Features</li>
                <li className="hover:text-white cursor-pointer">Pricing</li>
                <li className="hover:text-white cursor-pointer">Reviews</li>
                <li className="hover:text-white cursor-pointer">
                  Travel Guidance
                </li>
                <li className="hover:text-white cursor-pointer">Updates</li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h4 className="text-lime-400 font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>
                  <NavLink
                    to="/about"
                    className="hover:text-white cursor-pointer"
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className="hover:text-white cursor-pointer"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div>
              <h4 className="text-lime-400 font-semibold mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="hover:text-white cursor-pointer">Help center</li>
                <li className="hover:text-white cursor-pointer">
                  Server status
                </li>
                <li className="hover:text-white cursor-pointer">
                  Report a bug
                </li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="text-lime-400 font-semibold mb-4">Contact Us</h4>

              <ul className="space-y-3 text-sm text-gray-300">

                {/* EMAIL */}
                <li className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    className="flex-shrink-0"
                  >
                    <g fill="none">
                      <path fill="#367af2" d="M14 5H2v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2z" />
                      <path fill="#4894fe" d="M4 3a2 2 0 0 0-2 2v.84l5.763 3.103a.5.5 0 0 0 .474 0L14 5.84V5a2 2 0 0 0-2-2z" />
                    </g>
                  </svg>
                  <span>info.yaritrip@gmail.com</span>
                </li>

                {/* PHONE */}
                <li className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="flex-shrink-0"
                  >
                    <path
                      fill="#367af2"
                      d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.98.98 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02c-.37-1.11-.56-2.3-.56-3.53c0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99"
                    />
                  </svg>
                  <span className="text-[12px]">(+91) 91171-77979</span>
                </li>

                {/* SUPPORT */}
                <li className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="flex-shrink-0"
                  >
                    <path
                      fill="#367af2"
                      d="M11 21v-2h8v-7.1q0-2.925-2.037-4.962T12 4.9T7.038 6.938T5 11.9V18H4q-.825 0-1.412-.587T2 16v-2q0-.525.263-.987T3 12.275l.075-1.325q.2-1.7.988-3.15t1.975-2.525T8.762 3.6T12 3t3.225.6t2.725 1.663t1.975 2.512t1 3.15l.075 1.3q.475.225.738.675t.262.95v2.3q0 .5-.262.95t-.738.675V19q0 .825-.587 1.413T19 21z"
                    />
                  </svg>
                  <span>Support Hours: 24/7</span>
                </li>

              </ul>
            </div>

            {/* IMAGE */}
            <div className="hidden lg:flex justify-end items-end">
              <img
                src={suitcaseImg}
                alt="Travel suitcase"
                className="h-44 object-contain"
              />
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">

            <span>© 2026 yaritrip. All rights reserved.</span>

            <div className="flex gap-6 flex-wrap justify-center">
              <NavLink to="/terms-conditions" className="hover:text-white">
                Terms & Conditions
              </NavLink>
              <NavLink to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </NavLink>
              <NavLink to="/refund-policy" className="hover:text-white">
                Refund Policy
              </NavLink>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;