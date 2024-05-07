// import KiddyCutsLogo from "../../assets/KiddyCutsLogo.png";
import { useNavigate } from "react-router-dom";
import Topbar2 from "../../components/topbar/Topbar2";
import { FaArrowLeft } from "react-icons/fa";
import PaymentSuccesfulLogo from "../../assets/succesful.png";
import { useEffect, useState } from "react";

const CompletePayment = () => {
  const navigate = useNavigate();

  const [newformData, setNewFormData] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("formData"));
    if (items) {
      setNewFormData(items);
    }
  }, []);

  const handleBackToPage = () => {
    localStorage.removeItem("formData");
    navigate("/dashboard");
  }

  return (
    <>
      <Topbar2 />
      <div className="flex flex-col gap-12">
        <div className="md:mt-[80px] lg:mt-[80px] sm:mt-[80] mt-[50px] flex gap-3 px-9">
          <button
            onClick={handleBackToPage}
            className=" text-[#091F4B] md:text-3xl text-2xl"
          >
            <FaArrowLeft />
          </button>
          <p className="font-semibold text-xl">Back</p>
        </div>

        <div className="flex cursor-context-menu justify-center font-bold text-gray-900 mb-3 md:text-xl text-lg sm:ml-0 md:ml-0 lg:ml-0 ml-1 md:mt-12">
          <h1 className="font-normal text-black text-[52px]">
            Payment Succesful
          </h1>
        </div>

        <div className="flex justify-center items-center">
          <img
            src={PaymentSuccesfulLogo}
            alt="Payment Success"
            className="w-80 h-80 object-cover"
          />
        </div>

        {/* payment details */}
        <div className="bg-white rounded shadow-md border-2 p-5 flex flex-col gap-6 align-items-center justify-between mx-20 ">
          {/* Tailwind CSS classes */}
          <div className="grid grid-cols-2 gap-4 text-3xl justify-between">
            <p>{newformData.name}</p>
            <p className="text-right">{newformData.service}</p>
            <p>{newformData.phoneNumber}</p>
          </div>
          <hr className="font-bold border-2 mt-3 border-opacity-50" />
          <div className="grid grid-cols-2 gap-4 mt-4 text-3xl">
            {/* Grid layout for cost details */}
            <p>Hairstylist</p>
            <p className="text-right">{newformData.selectedHairstylist}</p>
            <p>No. Antrian</p>
            <p className="text-right">{newformData.paddedNumber}</p>
            <p>Cut and Blow</p>
            <p className="text-right">Rp{newformData.formattedTotalPrice}</p>
            <p>Total</p>
            <p className="text-right">Rp{newformData.formattedFinalPrice}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletePayment;
