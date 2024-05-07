import Topbar2 from "../../components/topbar/Topbar2";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Receipt from "../../components/Receipt/Receipt";
import QrCode from "../../assets/qrcode.png";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Payment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("formData"));
    if (items) {
      setFormData(items);
    }
  }, []);
  // console.log(formData);

  return (
    <>
      <Topbar2 />
      <div className="md:mt-[80px] lg:mt-[80px] sm:mt-[80] mt-[50px] flex gap-3 px-5">
        <button
          onClick={() => navigate(-1)}
          className=" text-[#091F4B] md:text-3xl text-2xl"
        >
          <FaArrowLeft />
        </button>
        <p className="font-semibold text-xl">Back</p>
      </div>
      <div className="bg-white pt-12 pb-10 px-5">
        <div className="border-solid py-6">
          <Receipt formData={formData} qrCode={QrCode} />
        </div>
      </div>
    </>
  );
};

export default Payment;
