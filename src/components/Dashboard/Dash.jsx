import { useEffect, useState } from "react";
import ProductList_ from "../Data/ProductList_";
import { debounce } from "lodash";
import axios from "axios";
import Category from "../Category/Category";
// import Iklan from "../iklan/Iklan";
import Loading from "../Loading/Loading";

const Dash = () => {
  const [searchTerm, setSearchTerm] = useState([]);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorite, setFavorite] = useState(false);
  const [category, setCategory] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setIsCategoryOpen(true);
  };

  // get data logo, product dan category
  useEffect(() => {
    
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const API_URL = import.meta.env.VITE_API_KEY;
        const dataBusiness = JSON.parse(localStorage.getItem("user"));

        const token = localStorage.getItem("token");
        try {
          // Mendapatkan respons dari API
          const BusinessResponse = await axios.get(
            `${API_URL}/api/v1/business/223`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const imageUrl = BusinessResponse.data.data.image; // Ganti dengan properti yang sesuai dari respons API

          // Menyimpan base64 string ke dalam localStorage
          localStorage.setItem("logo", imageUrl);

          // console.log("Gambar berhasil disimpan di localStorage");
        } catch (error) {
          console.error("Terjadi kesalahan:", error.message);
          setIsLoading(false);
        }

        // get data product
        const productResponse = await axios.get(
          `${API_URL}/api/v1/product/emenu?outlet_id=${dataBusiness.outlet_id}&business_id=${dataBusiness.business_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const activeProducts = productResponse.data.data.filter(
          (item) => item.status === "active"
        );

        const isAnyFavorite = productResponse.data.data.some(
          (item) => item.is_favorite
        );
        setFavorite(isAnyFavorite);

        // get data category
        const categoryProductResponse = await axios.get(
          `${API_URL}/api/v1/product-category/lite?outlet_id=${dataBusiness.outlet_id}&business_id=${dataBusiness.business_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const resCategoryProduct = categoryProductResponse.data.data.filter(
          (value) => value.Products.length > 0 && !value.hidden
        );

        setSearchTerm(activeProducts);
        setCategory(resCategoryProduct);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    
    getProduct();


  }, []);
  // close get data logo, product dan category

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fungsi untuk menggulir ke atas halaman
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Fungsi yang akan dipanggil saat halaman di-scroll
  return (
    <>
      {isLoading ? (
        <div className="pt-20 flex text-center justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <>
          {/* button scroll top */}
          {showScrollButton && (
            <button
              onClick={scrollToTop}
              className="fixed sm:bottom-[330px]  lg:bottom-[360px]  md:bottom-[265px] bottom-[150px] z-50 right-6 bg-[#6C1E5D] hover:bg-[#8f387d] text-white p-2 rounded-full shadow-xl focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          )}
          {/* close  button scroll top */}

          {/* data product dan category */}
          <div className="flex pt-[65px]">
            {/* data category */}
            <div
              className={`bg-gray-100 flex-grow  pt-5 shadow h-full lg:mt-[15px] sm:mt-[15px] md:mt-[15px] mt-[15px] kiosk:mt-[20px] z-50 fixed ${
                category.length > 0
                  ? "overflow-auto scroll-m-1.5"
                  : "overflow-hidden"
              }`}
            >
              <Category
                isCategoryOpen={isCategoryOpen}
                closeModal={() => setIsCategoryOpen(false)}
                category={category}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
            {/* close data category */}

            {/* data product */}
            <div className="flex-grow lg:mt-[10px] sm:mt-[10px] md:mt-[10px] mt-[10px] kiosk:mt-[15px] pl-[0px] sm:pl-[100px] md:pl-[110px]">
              <ProductList_
                openModal={openModal}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                favorite={favorite}
              />
            </div>
            {/* close data product */}
          </div>
          {/* close data product dan category */}

          {/* <div className="">
            <Iklan />
          </div> */}
        </>
      )}
    </>
  );
};

export default Dash;
