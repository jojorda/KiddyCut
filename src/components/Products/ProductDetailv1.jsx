import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Topbar from "../topbar/Topbar";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import { FaMinus, FaPlus } from "react-icons/fa";
import Lg from "../../assets/logo.png";
import { checkTokenExpiration } from "../../utils/token";
import { BsCartPlus } from "react-icons/bs";
import Iklan from "../iklan/Iklan";

const ProductDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const API_URL = import.meta.env.VITE_API_KEY;
  const [notes, setNotes] = useState("");
  const [allAddons, setAllAddons] = useState([]);
  const [allSelectAddOns, setAllSelectAddOns] = useState([]);
  const [handleSelect, setHandleSelect] = useState([]);
  const [product, setProduct] = useState({});
  const [totalItem, setTotalItem] = useState(1);
  const navigate = useNavigate();

  // get data produk detail
  useEffect(() => {
    const getData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_KEY;
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/api/v1/product/find-product/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response);
        setDetail(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
          setLoading(false);
        }
      }
    };
    getData();
  }, [id]);
  // close get data produk detail

  // Fungsi untuk membuka modal gambar
  const openModal = (imageUrl) => {
    const modalImage = document.getElementById("modalImage");
    modalImage.src = imageUrl;
    const modal = document.getElementById("imageModal");
    modal.classList.remove("hidden");
  };
  // close Fungsi untuk membuka modal gambar

  // Fungsi untuk menutup modal gambar
  const closeModal = () => {
    const modal = document.getElementById("imageModal");
    modal.classList.add("hidden");
  };
  // close Fungsi untuk menutup modal gambar

  // fungsi untuk menambahkan jumlah item
  const incrementQuantity = () => {
    setTotalItem(totalItem + 1);
  };
  // close Fungsi untuk menambahkan jumlah item

  // Fungsi untuk mengusi jumlah item
  const decrementQuantity = () => {
    if (totalItem > 1) {
      setTotalItem(totalItem - 1);
    }
  };
  // Fungsi untuk mengusi jumlah item

  const isSameCartItem = (itemA, itemB) => {
    // return item1.idItem === item2.idItem;
    return (
      (itemA.id && itemA.id === itemB.id) ||
      (itemA.idItem && itemA.idItem === itemB.id)
    );
  };

  // fungsi untuk menambahkan data ke keranjang
  const handleAddCart = () => {
    try {
      const addonsTotalPrice = allSelectAddOns.reduce(
        (total, addon) => total + addon.price,
        0
      );

      const amount = product.price + addonsTotalPrice;
      const cartItemId = `${product.id}-${allSelectAddOns
        .map((addon) => addon.id)
        .join("-")}`;
      const cartItem = {
        id: cartItemId,
        business_id: product.business_id,
        outlet_id: product.outlet_id,
        nameItem: product.name,
        priceItem: product.price,
        descriptionItem: product.description || null,
        imageItem: product.image || null,
        totalItem: totalItem,
        updateAddons: handleSelect,
        fullDataAddons: allSelectAddOns,
        fullDataProduct: product,
        allAddons: allSelectAddOns,
        totalAmount: amount * totalItem,
        addons: allSelectAddOns,
        sales_type_id: 613,
        notes: notes,
        product_id: product.id,
        quantity: totalItem,
        price_product: product.price,
        price_discount: 0,
        price_service: 0,
        price_addons_total: addonsTotalPrice * totalItem || 0,
        price_total: amount * totalItem,
      };

      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      let itemExists = false;
      for (let i = 0; i < existingCart.length; i++) {
        const existingCartItem = existingCart[i];

        if (existingCartItem.id === cartItemId) {
          // Jika item sudah ada, lakukan update seperti sebelumnya
          existingCartItem.totalItem += totalItem;
          existingCartItem.quantity += totalItem;
          existingCartItem.totalAmount += cartItem.totalAmount;
          existingCartItem.notes = notes;

          // Periksa apakah addons sudah ada dalam existingCartItem
          for (const newAddon of allSelectAddOns) {
            const existingAddonIndex =
              existingCartItem.fullDataAddons.findIndex(
                (existingAddon) => existingAddon.id === newAddon.id
              );

            if (existingAddonIndex !== -1) {
              // Jika addon sudah ada, update quantity
              existingCartItem.fullDataAddons[existingAddonIndex].quantity +=
                newAddon.quantity;
            } else {
              // Jika addon baru, tambahkan ke existingCartItem dengan jumlah minimal 1
              const addonWithMinQuantity = {
                ...newAddon,
                quantity: Math.max(newAddon.quantity, 1),
              };

              existingCartItem.fullDataAddons.push(addonWithMinQuantity);
            }
          }

          // Perbarui total harga untuk addons
          existingCartItem.price_addons_total +=
            existingCartItem.fullDataAddons.reduce(
              (total, addon) => total + addon.price * totalItem,
              0
            );

          itemExists = true;
          break;
        }
      }

      if (!itemExists) {
        // Jika item belum ada, tambahkan ke dalam existingCart
        existingCart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));

      Swal.fire({
        icon: "success",
        title: "Item Ditambahkan ke Keranjang",
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          title: "text-lg",
        },
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  // close fungsi untuk menambahkan data ke keranjang

  // Gunakan useEffect untuk memperbarui localStorage ketika cart berubah
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    handleGetProduct();
  }, []);

  // fungsi untuk memilih data dari Addon/Tambahan
  const handleSelectAllAddons = (data2, index, data) => {
    const data2_temp = { ...data2, group_id: data.id };

    // Check if any addon from this group is already selected
    const isGroupSelected = allSelectAddOns.some(
      (element) => element.group_id === data.id
    );

    // Check if the current addon is already selected
    const isSelected = allSelectAddOns.some(
      (element) => element.id === data2_temp.id
    );

    if (isGroupSelected && isSelected) {
      // If any addon from this group is already selected and current addon is already selected, remove all addons from this group
      const updatedSelectAddOns = allSelectAddOns.filter(
        (addon) => addon.group_id !== data.id
      );

      const updatedHandleSelect = handleSelect.filter(
        (element) => element.split(",")[0] !== `${index}`
      );

      // Update state allSelectAddOns with the updated selection
      setAllSelectAddOns(updatedSelectAddOns);

      // Update state handleSelect with the updated selection
      setHandleSelect(updatedHandleSelect);
    } else {
      // If no addon from this group is selected or current addon is not selected, add or toggle the selected addon to the selection
      const updatedHandleSelect = handleSelect.filter(
        (element) => element.split(",")[0] !== `${index}`
      );

      if (isSelected) {
        // If current addon is already selected, remove it from selection
        setHandleSelect(
          updatedHandleSelect.filter(
            (element) => element !== `${index},${data2_temp.id}`
          )
        );
        setAllSelectAddOns((prevAllSelectAddOns) =>
          prevAllSelectAddOns.filter((element) => element.id !== data2_temp.id)
        );
      } else {
        // If current addon is not selected, add it to selection
        setHandleSelect([...updatedHandleSelect, `${index},${data2_temp.id}`]);
        setAllSelectAddOns((prevAllSelectAddOns) => [
          ...prevAllSelectAddOns,
          data2_temp,
        ]);
      }
    }
  };



  // fungsi untuk mengget data Addon/Tambahan
  const handleGetProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/api/v1/product/find-product/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProduct(response.data.data);

      // console.log("data.data", response);
      const groupAddons = JSON.parse(
        JSON.stringify(response.data.data.Group_Addons)
      );
      // console.log("groupAddons", groupAddons);
      // groupAddons.forEach((value) => {
      //   setAllAddons((prevAllAddons) => [...prevAllAddons, value]);
      // });
      setAllAddons(groupAddons);
      if (response.data.data.image) {
        response.data.data.image;
      } else {
        response.data.data.image = "";
      }
      // console.log("data ===>", response.data.data);
      // setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // close fungsi untuk mengget data Addon/Tambahan

  return (
    <>
      {/* Header */}
      <Topbar detail={detail} loading={loading} cart={cart} />
      {/* close Header */}
      {loading ? (
        // Loading Screen
        <div className="pt-20 flex text-center justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        // Close Loading Screen
        // data produk detail
        <div className="bg-white  pt-16 pb-10" key={detail.id}>
          <div className="lg:p-12 sm:p-7 flex flex-wrap lg:justify-start md:flex-nowrap bg-white">
            <div className="flex-wrap ">
              <img
                src={detail.image == null ? Lg : `${API_URL}/${detail.image}`}
                className="lg:w-72 lg:h-72 md:w-96 md:h-80 w-screen h-[200px]  lg:rounded-xl md:rounded-xl object-cover cursor-pointer shadow-xl"
                alt={detail.name}
                onClick={
                  () =>
                    openModal(
                      detail.image == null ? Lg : `${API_URL}/${detail.image}`
                    ) // Buka modal dengan gambar yang diklik
                }
              />
            </div>
            <div className="lg:pl-10 cursor-context-menu p-5 md:pl-10 lg:pr-20 flex-wrap lg:pt-10">
              <div className="mb-2 lg:text-3xl md:text-3xl sm:text-3xl text-2xl font-bold tracking-tight text-gray-900">
                {detail.name}
              </div>
              <div className="flex">
                <div className="mb-3 lg:mt-3 md:mt-3 mt-1 sm:mt-3 p-1 pl-2 pr-2 rounded-lg font-normal text-gray-500 bg-gray-200">
                  {detail.Product_Category?.name}
                </div>
              </div>

              <div className="inline-flex items-center lg:mt-16 md:mt-16 sm:mt-16 -mt-10 py-2 text-2xl font-medium text-center">
                Rp {detail.price.toLocaleString("id-ID")}
              </div>
              <div className="lg:flex md:flex hidden  mr-5 right-0">
                <div className="rounded-xl flex items-center justify-between py-2 mr-4">
                  <button
                    className={`px-4 py-1 rounded-l-md pl-5 text-white  cursor-pointer hover:opacity-70 duration-500 bg-[#6C1E5D] ${
                      totalItem === 1
                        ? "opacity-50 cursor-not-allowed text-white bg-[#E3CFE3]"
                        : ""
                    }`}
                    onClick={decrementQuantity}
                    disabled={totalItem === 1}
                  >
                    <FaMinus />
                  </button>
                  <p className="font-semibold text-black bg-white pl-4 pr-4">
                    {totalItem}
                  </p>
                  <button
                    className="px-5 py-1  rounded-r-md hover:opacity-70 text-white bg-[#6C1E5D]
                    cursor-pointer duration-500"
                    onClick={incrementQuantity}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>

    
          <div className="flex flex-col gap-3 px-10 py-10">
            <div>
              <label className="font-sm text-[#ACACAC]">Hairstyling</label>
              <input
                type="text"
                className="border-2 rounded-md block w-full p-2"
              />
            </div>
            <div>
              <label className="font-sm text-[#ACACAC]">Nama</label>
              <input
                type="text"
                className="border-2 rounded-md block w-full p-2"
              />
            </div>
            <div>
              <label className="font-sm text-[#ACACAC]">No HP</label>
              <input
                type="text"
                className="border-2 rounded-md block w-full p-2"
              />
            </div>
            <div>
              <label className="font-sm text-[#ACACAC]">Tanggal Lahir</label>
              <input
                type="text"
                className="border-2 rounded-md block w-full p-2"
              />
            </div>
            <ul className="grid gap-6 grid-cols-2 w-1/2 text-center">
              <li>
                <input
                  type="radio"
                  id="hosting-small"
                  name="hosting"
                  value="hosting-small"
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor="hosting-small"
                  className="inline-flex items-center justify-center w-full p-5  text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-black peer-checked:text-black hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400"
                >
                  <div className="block text-center">
                    <div className="w-full text-lg font-semibold text-center">
                      Male
                    </div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="hosting-big"
                  name="hosting"
                  value="hosting-big"
                  className="hidden peer"
                />
                <label
                  htmlFor="hosting-big"
                  className="inline-flex items-center justify-center w-full p-5  text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-black peer-checked:text-black hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Female</div>
                  </div>
                </label>
              </li>
            </ul>
          </div>

          <hr className="" />
          {/* add-On/Tambahan */}
          <div className="pt-2  bg-white pb-3 ">
            <div className="sm:pl-[30px] pl-3 sm:pr-[30px] cursor-context-menu">
              {allAddons.length > 0 ? (
                <>
                  <h5 className="font-semibold cursor-context-menu">
                    Tambahan
                  </h5>
                  <hr />
                  {allAddons.map((data, index) => (
                    <div key={index}>
                      <h6 className="mb-2 font-semibold">{data.name}</h6>
                      {data.type === "single" ? (
                        <div>
                          {data.Addons.map((data2, index2) => (
                            <div
                              key={index2}
                              onClick={() =>
                                handleSelectAllAddons(data2, index, data)
                              }
                            >
                              <div
                                className={`border cursor-pointer md:w-[400px] border-[#091F4B] flex mb-2 mr-2 rounded-lg p-1 pl-3 text-sm text-gray-700 hover:bg-[#091F4B] hover:text-white ${
                                  handleSelect.some(
                                    (element) =>
                                      element === `${index},${data2.id}`
                                  )
                                    ? "bg-[#091F4B] text-white"
                                    : ""
                                }`}
                              >
                                <div className="flex-grow">
                                  <p className="">{data2.name}</p>
                                </div>
                                <div className="text-right">
                                  <p className="items-end flex ml-2 mr-1.5">
                                    Rp. {data2.price.toLocaleString("id-ID")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>
                          {data.Addons.map((data2, index2) => (
                            <div
                              key={index2}
                              onClick={() =>
                                handleSelectAllAddons(data2, index, data)
                              }
                            >
                              <div
                                className={`border cursor-pointer   md:w-[400px] border-[#091F4B] flex mb-2 mr-2 rounded-lg p-1 pl-3 text-sm text-gray-700 hover:bg-[#091F4B] hover:text-white ${
                                  allSelectAddOns.some(
                                    (element) => element.id === data2.id
                                  )
                                    ? "selected "
                                    : ""
                                }`}
                              >
                                <p className="title-choose-size">
                                  {data2.name}
                                </p>
                                <p className="justify-end items-end flex text-right">
                                  Rp. {data2.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <h5 className="available-addon cursor-context-menu">
                  Tambahan tidak Tersedia.
                </h5>
              )}
            </div>
          </div>
          {/* close Add-on/Tambahan */}

          {/* notes */}
          <div className="sm:pl-[30px] pl-3 pr-3 sm:pr-[40px] bg-white">
            <label className="flex mb-1.5 cursor-context-menu">
              <div className="font-semibold">Catatan</div>
              <div className="font-semibold ml-1 text-gray-400">
                (opsional)
              </div>{" "}
            </label>
            <textarea
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="rounded-md text-sm p-1.5 w-full border border-gray-400 focus:border-[#091F4B] focus:ring-[#091F4B] focus:outline-none focus:ring focus:ring-opacity-5"
              rows={4}
              cols={50}
              placeholder="Ketik sesuatu di sini..."
            />
          </div>
          {/* close Notes */}

          {/* Modal gambar */}
          <div
            id="imageModal"
            className="fixed z-50 top-0 left-0 w-full h-full flex hidden items-center justify-center bg-black bg-opacity-80 transition-opacity  "
          >
            <button
              id="closeModal"
              className="absolute top-4 right-4 text-white text-5xl hover:text-gray-200"
              onClick={() => closeModal()} // Tutup modal saat tombol close diklik
            >
              &times;
            </button>
            <div className="relative  max-w-xl mx-auto">
              <img
                id="modalImage"
                src={detail.image == null ? Lg : `${API_URL}/${detail.image}`} // Gunakan gambar default jika gambar modal tidak ada
                className=" rounded-lg"
                alt="Modal"
              />
            </div>
          </div>
          {/* close modal Gambar */}

          <div className="lg:block flex justify-center lg:p-2 p-4">
            {/* button  plus/tambah dan minus/kurang  */}
            <div className="lg:hidden md:hidden block lg:ml-10 lg:mr-0 mr-2">
              <div className="bg-[#091F4B] rounded-xl flex items-center justify-between py-2 ">
                <button
                  className={`px-4 pl-5 text-white  cursor-pointer hover:opacity-70 duration-500 ${
                    totalItem === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={decrementQuantity}
                  disabled={totalItem === 1}
                >
                  <FaMinus />
                </button>
                <p className="font-bold text-white pl-4 pr-4">{totalItem}</p>
                <button
                  className="px-5 hover:opacity-70 text-white  cursor-pointer duration-500"
                  onClick={incrementQuantity}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            {/* close button  plus/tambah dan minus/kurang  */}

            {/* button tambahkan ke keranjang */}
            <div className="lg:flex lg:justify-center">
              <div className=""></div>
              <div className="">
                <button
                  className="text-white text-center bg-[#091F4B] rounded-xl font-semibold lg:pl-20 lg:pr-20 md:pl-20 md:pr-20 pl-[50px] pr-[50px] py-2"
                  onClick={handleAddCart}
                >
                  <span className="sm:hidden md:hidden lg:hidden inline">
                    {" "}
                    <BsCartPlus size={25} />
                  </span>
                  {/* <!-- Hanya tampilkan ikon cart di ukuran mobile --> */}
                  <span className="hidden md:inline lg:inline sm:inline cursor-pointer">
                    Tambah ke Keranjang
                  </span>
                </button>
              </div>
            </div>
            {/* close button tambahkan ke keranjang */}
          </div>
        </div>
        // close data produk detail
      )}
    </>
  );
};

export default ProductDetail;
