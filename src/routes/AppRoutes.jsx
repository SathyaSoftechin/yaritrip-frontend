import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserProfile from "../pages/UserProfile";
import ResultsPage from "../pages/Results";
import PackageDetails from "../pages/PackageDetails";
import CheckoutPage from "../pages/CheckoutPage";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/package/:id" element={<PackageDetails />} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />


    </Routes>
  );
};

export default AppRoutes;
