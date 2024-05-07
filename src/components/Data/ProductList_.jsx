import React, { useEffect, useState } from "react";
import LoadingProduct from "../Loading/LoadingProduct";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pro from "../../assets/pro.jpg";
import Lg from "../../assets/logo.png";
import Kiddy from "../../assets/kiddy.png"
import { BsCartPlus, BsFillStarFill } from "react-icons/bs";
import Swal from "sweetalert2";
import Iklan from "../iklan/Iklan";
import { BiDetail } from "react-icons/bi";

const ProductList_ = ({
  openModal,
  searchTerm,
  selectedCategory,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [visibleData, setVisibleData] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isFavoriteAvailable, setIsFavoriteAvailable] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(
    showMore ? searchTerm.length : 16
  );
 

  const API_URL = import.meta.env.VITE_API_KEY;

  // Di dalam useEffect pada komponen ProductList_
  useEffect(() => {
    const filterProductsByCategory = async () => {
      try {
        let filteredData;

        if (selectedCategory === "favorite") {
          // Filter berdasarkan produk favorit
          filteredData = searchTerm.filter((item) => item.is_favorite);
          setIsFavoriteAvailable(filteredData.length > 0);
        } else if (selectedCategory === "all") {
          // Tampilkan semua produk jika kategori "all" dipilih
          filteredData = searchTerm;
        } else {
          // Filter berdasarkan kategori yang dipilih
          filteredData = searchTerm.filter(
            (item) => item.Product_Category?.name === selectedCategory
          );
        }

        setVisibleData(filteredData.slice(0, itemsToShow));
      } catch (error) {
        console.error("Error filtering products:", error);
      }
    };

    // Panggil fungsi filterProductsByCategory
    filterProductsByCategory();
  }, [searchTerm, selectedCategory, itemsToShow]);


  // function button show muat lebih banyak/tampilkan kurang
  const toggleShowMore = () => {
    setLoadingMore(true);
    setShowMore(!showMore);
    setItemsToShow(!showMore ? searchTerm.length : 16); // Update itemsToShow
    setVisibleData(!showMore ? searchTerm : searchTerm.slice(0, itemsToShow));
    setLoadingMore(false);
  };

  return (
    <div className="px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 pt-6 ">
      <div className="flex cursor-context-menu justify-between font-bold text-gray-900 mb-3 md:text-xl text-lg sm:ml-0 md:ml-0 lg:ml-0 ml-1">
        {/* <div>Daftar Produk</div> */}
        {/* show category for mobile */}
        <div className="flex md:hidden sm:hidden lg:hidden">
          <div>Kategori</div>
          <div onClick={openModal} className="mt-2 ml-1">
            <BiDetail />
          </div>
        </div>
      </div>

      <div>
        {/* data produk */}

        <div className="mb-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-6 lg:gap-6 sm:gap-6 gap-2 ">
          {visibleData.map((item) => (
            <div
              className="relative bg-[#D9D9D9] bg-opacity-25 border rounded-md shadow hover:shadow-2xl group cursor-pointer"
              key={item.id}
            >
              <Link to={`/products/detail/${item.id}`}>
                <div className="flex justify-center items-center">
                  <img
                    src={item.image === null ? Lg : `${API_URL}/${item.image}`}
                    className="w-full object-cover sm:h-40 md:h-52 h-32 rounded-t-lg "
                  />
                </div>
                <div className="relative cursor-pointer">
                  <div className="sm:pl-3 pl-2 pr-1 sm:pr-3 pb-1.5 flex flex-col gap-3 justify-center text-center">
                    <div className="flex flex-col items-center">
                      <div className="mt-3 text-xl tracking-tight font-semibold text-gray-900 h-14">
                        {item.name}
                      </div>
                      <div className="flex items-end justify-center bg-[#000000] bg-opacity-40 text-sm font-medium text-center text-white p-2 rounded-xl mt-4 mb-5 border border-red-200">
                        Rp{item.price.toLocaleString("id-ID")}
                        {/* Move the button here */}
                      </div>
                    </div>
                    {item.is_favorite && (
                      <div className="mt-1 text-yellow-500 mr-2">
                        <BsFillStarFill size={18} />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {!isFavoriteAvailable && selectedCategory === "favorite" && (
          <div className="text-gray-500 font-semibold text-center flex items-center justify-center">
            <div>
              <img src={Pro} alt="" className="w-96" />
              <span> Data favorit tidak tersedia.</span>
            </div>
          </div>
        )}

        <div>
          {visibleData.length >= 16 && (
            <div className="flex justify-center mt-6 mb-8">
              {visibleData.length > 3 && (
                <div>
                  <button
                    onClick={toggleShowMore}
                    className="px-4 py-2 rounded-lg font-bold text-[#091F4B] focus:outline-none bg-white border border-[#091F4B] hover:bg-gray-100 hover:text-[#091F4B] focus:z-10 focus:ring-4 focus:ring-gray-200"
                  >
                    {loadingMore ? (
                      <div className="flex justify-center">
                        <div className="h-4 w-4 mt-1 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                        <div>Loading...</div>
                      </div>
                    ) : showMore ? (
                      "Tampilkan Kurang"
                    ) : (
                      "Muat Lebih Banyak"
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {/* button muat lebih banyak/tampilkan kurang */}
      </div>
    </div>
  );
};

export default ProductList_;
