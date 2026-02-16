import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import User from "../assets/UserProfile/user.png";
import Banner from "../assets/UserProfile/image.jpg";

const UserProfile = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Personal Information");
  const [profileImage, setProfileImage] = useState(User);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const tabs = [
    "Personal Information",
    // "Preferred Language",
    "Wishlist",
    "My Bookings",
    "Notifications",
    "Privacy and Policy",
    "Terms and Conditions",
  ];

  /* -------- Load Profile + Image -------- */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetch("http://192.168.1.3:8081/api/users/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setProfile({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
        });
      })
      .catch(() => navigate("/"));

    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setProfileImage(savedImage);
  }, [navigate]);

  /* -------- Image Upload -------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setProfileImage(imageURL);
    localStorage.setItem("profileImage", imageURL);
  };

  /* -------- Logout -------- */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
    navigate("/");
  };

  /* -------- Update Profile -------- */
  const handleSave = () => {
    const token = localStorage.getItem("token");

    fetch("http://192.168.1.3:8081/api/users/me", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: profile.name,
        mobile: profile.mobile,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => alert("Profile updated successfully!"))
      .catch((err) => console.error(err));
  };

  /* -------- Dummy Bookings -------- */
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
            <div className="w-full h-full rounded-full border-4 border-white overflow-hidden shadow-xl bg-white">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

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

            <button
              onClick={handleLogout}
              className="mt-6 w-full py-2 border border-red-400 text-red-500 rounded-xl font-medium hover:bg-red-50 transition"
            >
              Log Out ➜]
            </button>
          </div>

          {/* Content */}
          <div className="md:col-span-3 bg-white rounded-2xl shadow-md p-6 md:p-8">

            {/* Personal Information */}
            {activeTab === "Personal Information" && (
              <>
                <h2 className="text-xl font-semibold mb-6">
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      readOnly
                      className="mt-1 w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      readOnly
                      className="mt-1 w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Mobile Number</label>
                    <input
                      type="text"
                      value={profile.mobile}
                      readOnly
                      className="mt-1 w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}

            {/* Preferred Language */}
            {activeTab === "Preferred Language" && (
              <>
                <h2 className="text-xl font-semibold mb-6">
                  Preferred Language
                </h2>
                <select className="border px-4 py-2 rounded-lg">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Telugu</option>
                  <option>Tamil</option>
                </select>
              </>
            )}

            {/* Wishlist */}
            {activeTab === "Wishlist" && (
              <>
                <h2 className="text-xl font-semibold mb-6">Wishlist</h2>
                <p className="text-gray-500">
                  You haven’t added any destinations yet.
                </p>
              </>
            )}

            {/* My Bookings */}
            {activeTab === "My Bookings" && (
              <>
                <h2 className="text-xl font-semibold mb-6">My Bookings</h2>

                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border rounded-xl p-4 shadow-sm flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold">
                          {booking.destination}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {booking.date}
                        </p>
                        <p className="text-sm mt-1">{booking.status}</p>
                      </div>
                      <div className="font-semibold">
                        {booking.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Notifications */}
            {activeTab === "Notifications" && (
              <>
                <h2 className="text-xl font-semibold mb-6">
                  Notifications
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Email Notifications</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="flex justify-between">
                    <span>SMS Alerts</span>
                    <input type="checkbox" />
                  </div>
                </div>
              </>
            )}

            {/* Privacy */}
            {activeTab === "Privacy and Policy" && (
              <>
                <h2 className="text-xl font-semibold mb-6">
                  Privacy and Policy
                </h2>
                <p className="text-gray-600">
                  Your privacy is important to us. We ensure secure
                  handling of all personal and booking information.
                </p>
              </>
            )}

            {/* Terms */}
            {activeTab === "Terms and Conditions" && (
              <>
                <h2 className="text-xl font-semibold mb-6">
                  Terms and Conditions
                </h2>
                <p className="text-gray-600">
                  By using Yaritrip, you agree to our booking,
                  cancellation, and refund policies.
                </p>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
