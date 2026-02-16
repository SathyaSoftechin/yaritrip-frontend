import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserProfile from "../pages/UserProfile";
import ResultsPage from "../pages/Results";
import PackageDetails from "../pages/PackageDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/package/:id" element={<PackageDetails />} />
    </Routes>
  );
};

export default AppRoutes;