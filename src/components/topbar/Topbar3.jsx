import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import LogoBeetKiosk from "../../assets/LogoBeetStore.png";
import "animate.css/animate.min.css"; // Impor animate.css
import BeetKiosk from "../../assets/LogoBeetStore.png";
import KiddyCutsLogo from "../../assets/KiddyCutsLogo.png";

const Topbar3 = ({ cart, detail, products, loading }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    Swal.fire({
      icon: "success",
      text: "Anda Berhasil Logout.",
      showConfirmButton: false,
      timer: 1500, // Menampilkan alert selama 1,5 detik
      customClass: {
        title: "text-sm", // Mengatur ukuran teks judul menjadi lebih kecil
      },
    });
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col">
        <nav className="bg-white shadow fixed w-full  z-50 max-w-full mx-auto px-9 justify-between items-center">
            <div className="flex justify-between items-center ">
              {/* logo beetkiosk */}
              <div onClick={() => navigate("/dashboard")} className="cursor-pointer" >
                <img
                  src={BeetKiosk}
                  alt=""
                  className="lg:w-[130px] sm:w-[120px] md:w-[100px] w-[65px] m-2"
                />
              </div>
              {/* close logo beetkiosk */}

              <div className="flex items-center justify-between ">
                <div>
                  <div className="relative">
                    <Link
                      to={"/products/keranjang"}
                      className="text-[#091F4B] px-4 py-2 rounded-md focus:outline-none hover:text-gray-200"
                    >
                      <div className="md:text-3xl lg:text-3xl sm:text-3xl text-2xl">
                        <FaShoppingCart />
                      </div>

                      {cart.length > 0 && (
                        <span className="absolute top-5 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
                          {cart.length}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>

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
        </nav>
      </div>
    </>
  );
};

export default Topbar3;
