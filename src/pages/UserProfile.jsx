import { useState } from "react";
import User from "../assets/UserProfile/user.png";
import Banner from "../assets/UserProfile/image.jpg";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("Personal Information");
  const [profileImage, setProfileImage] = useState(User);

  const tabs = [
    "Personal Information",
    "Bookings History",
    "Preferred Language",
    "Notifications",
    "Privacy and Policy",
    "Terms and Conditions",
  ];

  /* -------- Handle Image Upload -------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setProfileImage(imageURL);
  };

  /* -------- Dummy Booking Data -------- */
  const bookings = [
    {
      id: 1,
      destination: "Dubai Luxury Package",
      date: "12 Mar 2026",
      status: "Confirmed",
      amount: "₹48,000",
    },
    {
      id: 2,
      destination: "Kerala Backwater Resort",
      date: "05 Jan 2026",
      status: "Completed",
      amount: "₹22,500",
    },
    {
      id: 3,
      destination: "Singapore Skyline Tour",
      date: "22 Dec 2025",
      status: "Cancelled",
      amount: "₹36,700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="h-80 relative">
        <img
          src={Banner}
          alt="banner"
          className="h-full w-full object-cover"
        />

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-6 md:left-20">
          <div className="relative w-36 h-36">
            {/* Circle Image */}
            <div className="w-full h-full rounded-full border-4 border-white overflow-hidden shadow-xl bg-white">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Edit Button */}
            <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs px-4 py-1.5 rounded-full cursor-pointer shadow-md hover:bg-blue-700 transition">
              ✏️ Edit
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-white rounded-2xl shadow-md p-5 h-fit">
            <ul className="space-y-3">
              {tabs.map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition
                      ${
                        activeTab === tab
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>

            {/* Logout */}
            <button className="mt-6 w-full py-2 border border-red-400 text-red-500 rounded-xl font-medium hover:bg-red-50 transition">
              Log Out
            </button>
          </div>

          {/* Content */}
          <div className="md:col-span-3 bg-white rounded-2xl shadow-md p-6 md:p-8">
            {/* -------- PERSONAL INFO -------- */}
            {activeTab === "Personal Information" && (
              <>
                <h2 className="text-xl font-semibold mb-6">
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter mobile number"
                      className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition">
                    Save Changes
                  </button>
                </div>
              </>
            )}

            {/* -------- BOOKINGS HISTORY -------- */}
            {activeTab === "Bookings History" && (
              <>
                <h2 className="text-xl font-semibold mb-6">
                  Your Booking History
                </h2>

                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {booking.destination}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Travel Date: {booking.date}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium
                            ${
                              booking.status === "Confirmed"
                                ? "bg-green-100 text-green-600"
                                : booking.status === "Completed"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-red-100 text-red-600"
                            }`}
                        >
                          {booking.status}
                        </span>

                        <span className="font-semibold">
                          {booking.amount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Other Tabs Placeholder */}
            {activeTab !== "Personal Information" &&
              activeTab !== "Bookings History" && (
                <div className="text-gray-500 text-sm">
                  This section will be configured soon.
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
