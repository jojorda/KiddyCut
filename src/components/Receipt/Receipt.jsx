import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Receipt = ({ formData, qrCode }) => {
  const {
    service,
    selectedHairstylist,
    name,
    memberId,
    phoneNumber,
    birthdate,
    gender,
    totalPrice,
  } = formData;

  const number = 2;
  const paddedNumber = String(number).padStart(3, "0");
  const navigate = useNavigate();

  const tax = totalPrice * (10 / 100);

  const [showQr, setShowQr] = useState(false);

  const handleShowQr = () => {
    setShowQr((showQr) => !showQr);
  };

  const formattedTotalPrice = totalPrice
    ? totalPrice.toLocaleString("id-ID")
    : "";

  const formattedTax = tax.toLocaleString("id-ID");
  const formattedFinalPrice = (totalPrice + tax).toLocaleString("id-ID");

  const handleDone = () => {
    const newFormData = {
      service,
      selectedHairstylist,
      name,
      memberId,
      phoneNumber,
      birthdate,
      gender,
      totalPrice,
      formattedTotalPrice,
      formattedFinalPrice,
      paddedNumber,
    };
    const newFormDataJson = JSON.stringify(newFormData);
    localStorage.setItem("formData", newFormDataJson);
    navigate("/payment-complete");
  };

  return (
    <>
      <h2 className="text-5xl font-normal mb-10">Payment</h2>

      {/* table for receipt */}
      <div className="bg-white rounded shadow-md border-2 p-5 flex flex-col gap-6 align-items-center justify-between">
        <div className="grid grid-cols-2 gap-4 text-3xl justify-between">
          {/* Grid layout for details */}
          <p>{name}</p>
          <p className="text-right">{service}</p>
          <p>{phoneNumber}</p>
        </div>
        <hr className="font-bold border-2 mt-3 border-opacity-50" />
        <div className="grid grid-cols-2 gap-4 mt-4 text-3xl">
          {/* Grid layout for cost details */}
          <p>No antrian</p>
          <p className="text-right">{paddedNumber}</p>
          <p>Hairstylist</p>
          <p className="text-right">{selectedHairstylist}</p>
          <p>Cut and Blow</p>
          <p className="text-right">Rp{formattedTotalPrice}</p>
          <p>Tax</p>
          <p className="text-right">Rp{formattedTax}</p>
          <p>Diskon </p>
          <p className="text-right">Rp0</p>
          <p>Diskon</p>
          <p className="text-right">Rp0</p>
        </div>
      </div>

      <div className="grid grid-cols-2 p-5 font-bold text-4xl mt-5">
        <p>Total</p>
        <p className="text-right">Rp{formattedFinalPrice}</p>
      </div>
      <div className="p-5 flex flex-col gap-5">
        <p className="text-4xl font-semibold">Merchant Transaction ID</p>
        <p className="text-2xl">KZkBK3qATQH4</p>
      </div>

      <div className="p-5 flex flex-col gap-8">
        <p className="text-4xl font-semibold ">Payment Method</p>
        <div className="flex justify-start gap-3 ">
          <div className="w-52">
            <button
              className="inline-flex items-center justify-center w-full p-5  text-black bg-white border border-black rounded-lg cursor-pointer hover:text-white hover:bg-[#6C1E5D] hover:border-#B3B3B3]
              }`}"
              onClick={handleShowQr}
            >
              <span className="cursor-pointer text-2xl">QRIS</span>
            </button>
          </div>

          <div className="w-96">
            <button
              className={`inline-flex items-center justify-center w-full p-5 border border-black rounded-lg cursor-pointer hover:text-white hover:bg-[#6C1E5D] hover:border-#B3B3B3]
              }`}
              onClick={handleDone}
            >
              <span className="cursor-pointer text-2xl">
                Payment at Cashier
              </span>
            </button>
          </div>
        </div>
      </div>

      {showQr && (
        <>
          <div className="flex justify-center flex-col text-center mt-16 relative">
            <p className="text-4xl font-semibold">Scan for Payment</p>
            <img
              src={qrCode}
              alt="qrcode"
              className=" w-[426px] h-[426px] mx-auto"
            />
            <button
              className="absolute right-0 md:right-14 lg:right-36 xl:right-72 kiosk:right-5 bottom-5 border-[#463E3F] text-black border-2 lg:px-14 lg:py-4 rounded-md px-5 py-3 text-2xl font-medium"
              onClick={handleDone}
            >
              Done
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Receipt;
