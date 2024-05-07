import { Link } from "react-router-dom";
import BeetKiosk from "../../assets/beetkiosk.png";
import KiddyCutsLanding from "../../assets/KiddyCutsLanding.png";
import KiddyCutsLogo from "../../assets/KiddyCuts.png";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div
      className="items-center flex flex-col text-white max-h-screen"
    >
      <div className="bg-gradient-to-b from-[#F89A57] from-45% to-[#6C1E5D] w-full h-screen bg-no-repeat flex flex-col items-center justify-between relative">
        <img
          src={KiddyCutsLanding}
          className="w-full h-full object-cover absolute opacity-50 "
        />
        <img
          src={BeetKiosk}
          className="w-2/5 mt-16 lg:mt-5 z-10 lg:max-w-64"
          alt="beetkiosk"
        />
        <img
          src={KiddyCutsLogo}
          alt="kiddy-cuts"
          className="w-3/5 z-10 kiosk:max-w-96 kiosk:mb-80 lg:max-w-64"
        />
        <div className="w-3/4 kiosk:w-full text-center bg-white hover:cursor-pointer z-10 rounded-md kiosk:max-w-[969px] hover:bg-[#6C1E5D] hover:bg-opacity-30 hover:border-[#6C1E5D] lg:mb-5 kiosk:mb-52 mb-24 hover:text-white lg:max-w-96">
          <button className="w-full font-semibold opacity-30 text-xl kiosk:text-5xl text-[#382f2f] p-5 hover:text-white kiosk:py-9">
            <Link to="/dashboard">Touch To Order</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
