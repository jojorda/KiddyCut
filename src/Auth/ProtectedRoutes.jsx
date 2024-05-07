import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = () => {
  // Check if formData key exists in localStorage
  const formDataExists = localStorage.getItem("formData");

  useEffect(() => {
    // Show toast message only when navigating to the dashboard and formDataExists is false
    if (!formDataExists) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        text: "Anda belum memasukkan detail order",
      });
      Toast.fire();
    }
  }, [formDataExists]);

  return formDataExists ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default ProtectedRoute;
