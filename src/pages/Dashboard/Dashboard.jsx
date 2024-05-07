import Dash from "../../components/Dashboard/Dash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkTokenExpiration } from "../../utils/token";
import Topbar2 from "../../components/topbar/Topbar2";
import Topbar3 from "../../components/topbar/Topbar3";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [cart, setCart] = useState([])
  const navigate = useNavigate();

  // cek expired token
  useEffect(() => {
    checkTokenExpiration();
    const token = localStorage.getItem("token");
    if (!token) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "warning",
        text: "Anda harus Login Terlebih dahulu!",
      });
      return navigate("/login");
    }
    return navigate("/dashboard");
  }, []);
  // close cek expired token

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  return (
    <>
      <Topbar3 cart={cart} />
      <div
        className="sm:mb-[210px] md:mb-[220px] lg:mb-[280px] mb-[70px]"
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
      >
        <Dash />
      </div>
    </>
  );
};

export default Dashboard;
