import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserProfile from "../pages/UserProfile";
import ResultsPage from "../pages/Results";
import PackageDetails from "../pages/PackageDetails";

/* Checkout Pages */
import CheckoutLayout from "../pages/checkout/CheckoutLayout";
import TravellersStep from "../pages/checkout/TravellersStep";
import ReviewStep from "../pages/checkout/ReviewStep";
import PaymentStep from "../pages/checkout/PaymentStep";
import SuccessStep from "../pages/checkout/SuccessStep";

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

      {/* ================= CHECKOUT FLOW ================= */}
      <Route path="/checkout/:id" element={<CheckoutLayout />}>
        <Route path="travellers" element={<TravellersStep />} />
        <Route path="review" element={<ReviewStep />} />
        <Route path="payment" element={<PaymentStep />} />
        <Route path="success" element={<SuccessStep />} />
      </Route>

      {/* Optional: Redirect fallback */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;