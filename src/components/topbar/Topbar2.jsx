import BeetKiosk from "../../assets/LogoBeetStore.png";
import KiddyCutsLogo from "../../assets/KiddyCutsLogo.png";

// import Lg from "../../assets/lg_robo.jfif";
// import Lg1 from "../../assets/lgo_r.png";

const Topbar2 = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="bg-white shadow fixed z-50 bg-opacity-85 w-full flex justify-between items-center px-9">
          {/* logo beetkiosk */}
          <div className="">
            <img
              src={BeetKiosk}
              alt=""
              className="lg:w-[130px] sm:w-[120px] md:w-[100px] w-[65px] m-2"
            />
          </div>
          {/* close logo beetkiosk */}

          {/* logo kiddycuts */}
          <div className="">
            <img
              src={KiddyCutsLogo}
              alt=""
              className="lg:w-[130px] sm:w-[120px] lg:mt-4 md:mt-4 mt-3 md:w-[100px] w-[75px] m-2 mr-4"
            />
          </div>
          {/* close logo kiddycuts */}
        </div>
      </div>
    </>
  );
};

export default Topbar2;
