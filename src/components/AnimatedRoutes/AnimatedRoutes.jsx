import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../../Auth/Login";
import Forgot from "../../Auth/FogotPassword";
import Dashboard from "../../pages/Dashboard/Dashboard";
import ProductsDetail from "../../pages/Products/ProductsDetail";
// import ProductKeranjang from "./pages/Products/ProductKeranjang";
import CheckOut from "../../pages/Products/CheckOut";
import NewPassword from "../../Auth/NewPassword";
import LogOut from "../../Auth/LogOut";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Payment from "../../pages/Products/Payment";
import CompletePayment from "../../pages/CompletePayment/CompletePayment";
import ProductKeranjang from "../../pages/Products/ProductKeranjang";

import NotFoundPage from "../../pages/NotFound/NotFound";
import ProtectedRoute from "../../Auth/ProtectedRoutes";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/logout" element={<LogOut />} />
      <Route exact path="/forgotPassword" element={<Forgot />} />
      <Route exact path="/new_Password" element={<NewPassword />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/products/detail/:id" element={<ProductsDetail />} />

      {/* <Route exact path="/CheckOut" element={<CheckOut />} /> */}

      {/* <Route exact path="/payment-complete" element={<CompletePayment />} /> */}

      {/* <Route element={<ProtectedRoute />}> */}
      <Route exact path="/products/keranjang" element={<ProductKeranjang />} />
      <Route exact path="/payment" element={<Payment />} />
      <Route exact path="/payment-complete" element={<CompletePayment />} />
      {/* </Route> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AnimatedRoutes;
