import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Kiddy from "../../assets/kiddy.png";
import Topbar from "../topbar/Topbar";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import { FaMinus, FaPlus } from "react-icons/fa";
import Lg from "../../assets/logo.png";
import { checkTokenExpiration } from "../../utils/token";
import { BsCartPlus } from "react-icons/bs";
// import Iklan from "../iklan/Iklan";
import Topbar2 from "../topbar/Topbar2";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";

const ProductDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const API_URL = import.meta.env.VITE_API_KEY;

  const hairstylists = ["Hani", "Rizky", "Dina", "Mega"];
  const users = ["Vina", "Vino", "Vincent", "John", "Jane"]; // Array of user names
  const [selectedHairstylist, setSelectedHairstylist] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [memberId, setMemberId] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(1);

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      selectedHairstylist,
      name,
      memberId,
      phoneNumber,
      birthdate,
      gender,
      totalPrice,
    };
    // Convert the form data to a JSON string
    const formDataJSON = JSON.stringify(formData);
    // Save the form data to localStorage
    localStorage.setItem("formData", formDataJSON);
    // Clear form fields
    setSelectedHairstylist("");
    setName("");
    setMemberId("");
    setPhoneNumber("");
    setBirthdate("");
    setGender("");

    navigate("/payment");
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);

    // Filter suggestions based on user input
    if (inputValue.length >= 3) {
      // Filter suggestions based on user input
      const filteredSuggestions = users.filter((user) =>
        user.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if input length is less than 3
    }
  };

  const handleSelectSuggestion = (selectedName) => {
    setName(selectedName);
    setSuggestions([]); // Clear suggestions after selection
  };

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
        setTotalPrice(response.data.data.price);
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
    setTotalItem((prevTotalItem) => {
      const newTotalItem = prevTotalItem + 1;
      const newTotalPrice = detail.price * newTotalItem;
      setTotalPrice(newTotalPrice);
      return newTotalItem;
    });
  };
  // close Fungsi untuk menambahkan jumlah item

  // Fungsi untuk mengurusi jumlah item
  const decrementQuantity = () => {
    if (totalItem > 1) {
      setTotalItem((prevTotalItem) => {
        const newTotalItem = prevTotalItem - 1;
        const newTotalPrice = detail.price * newTotalItem;
        setTotalPrice(newTotalPrice);
        return newTotalItem;
      });
    }
  };
  // Fungsi untuk mengurusi jumlah item

  // fungsi untuk mengurus jumlah harga

  const isSameCartItem = (itemA, itemB) => {
    // return item1.idItem === item2.idItem;
    return (
      (itemA.id && itemA.id === itemB.id) ||
      (itemA.idItem && itemA.idItem === itemB.id)
    );
  };

  // fungsi untuk menambahkan data ke keranjang

  // close fungsi untuk menambahkan data ke keranjang

  // proceed to payment
  // const handleProceedPayment = () => {
  //   navigate("/payment");
  // };

  // Gunakan useEffect untuk memperbarui localStorage ketika cart berubah
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    handleGetProduct();
  }, []);

  // fungsi untuk memilih data dari Addon/Tambahan

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
      // setProduct(response.data.data);

      // console.log("data.data", response);
      // const groupAddons = JSON.parse(
      //   JSON.stringify(response.data.data.Group_Addons)
      // );
      // setAllAddons(groupAddons);
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
      <Topbar2 />
      {loading ? (
        // Loading Screen
        <div className="pt-20 flex text-center justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-white pt-16 pb-10" key={detail.id}>
            <div className="md:mt-[30px] lg:mt-[30px] sm:mt-[30] mt-[17px] flex gap-3 px-9">
              <Link
                to={"/dashboard"}
                className=" text-[#091F4B] md:text-3xl text-2xl"
              >
                <FaArrowLeft />
              </Link>
              <p className="font-semibold text-xl">Back</p>
            </div>
            <div className="lg:p-12 sm:p-7 flex flex-wrap lg:justify-start md:flex-nowrap bg-white">
              <div className="flex-wrap ">
                <img
                  src={!detail.image ? Kiddy : `${API_URL}/${detail.image}`}
                  className="lg:w-72 lg:h-72 md:w-96 md:h-80 w-screen h-[200px]  lg:rounded-xl md:rounded-xl object-cover cursor-pointer shadow-xl"
                  alt={detail.name}
                  onClick={
                    () =>
                      openModal(
                        !detail.image ? Kiddy : `${API_URL}/${detail.image}`
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
                  Rp {(detail.price * totalItem).toLocaleString("id-ID")}
                </div>
                <div className="lg:flex md:flex   mr-5 right-0">
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

            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col gap-3 px-10 py-10">
                <div>
                  <label className="text-xl text-[#463E3F]">Hairstylist</label>
                  <div className="flex space-x-4 overflow-auto mt-2">
                    {hairstylists.map((hairstylist) => (
                      <div key={hairstylist} className="flex-none">
                        <button
                          type="button"
                          className={`border-2 ${
                            selectedHairstylist === hairstylist
                              ? "text-white bg-[#6C1E5D]"
                              : "border-[#463E3F] text-black"
                          } py-3 px-7 rounded-lg focus:outline-none text-lg`}
                          onClick={() => setSelectedHairstylist(hairstylist)}
                        >
                          {hairstylist}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Member ID */}
                <div className="mt-2">
                  <label className="font-sm text-[#463E3F] text-lg">
                    Member ID
                  </label>
                  <input
                    type="number"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    className="border-slate-950 border-2  rounded-md block w-full p-3 mt-1"
                    required
                  />
                </div>

                {/* nama */}
                <div className="mt-2">
                  <label className="text-lg text-[#463E3F] ">Nama</label>
                  <input
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    className="border-slate-950 border-2 rounded-md block w-full p-3 mt-1"
                    required
                  />
                  {suggestions.length > 0 && (
                    <ul>
                      {suggestions.map((suggestion) => (
                        <li
                          key={suggestion}
                          onClick={() => handleSelectSuggestion(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* phone number */}
                <div className="mt-2">
                  <label className="font-sm text-[#463E3F] text-lg">
                    No HP
                  </label>
                  <input
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border-slate-950 border-2  rounded-md block w-full p-3 mt-1"
                    required
                  />
                </div>

                {/* birthdate */}
                <div className="mt-2">
                  <label className="font-sm text-[#463E3F] text-lg">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="border-slate-950 border-2  rounded-md block w-full p-3 mt-1"
                    min="2007-01-01"
                    required
                  />
                </div>
                <ul className="grid gap-4 max-w-80 grid-cols-2 w-1/2 text-center mt-4">
                  <li className="max-w-40">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value={gender}
                      onChange={() => setGender("male")}
                      className="hidden peer "
                    />
                    <label
                      htmlFor="male"
                      className="inline-flex items-center justify-center w-full p-5 text-black bg-white  rounded-lg cursor-pointer  peer-checked:border-[#B3B3B3] peer-checked:bg-[#6C1E5D]
                  peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 max-w-40 border-2 border-[#463E3F]"
                    >
                      <div className="block text-center">
                        <div className="w-full text-lg font-normal text-center">
                          Male
                        </div>
                      </div>
                    </label>
                  </li>
                  <li className="max-w-40">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value={gender}
                      onChange={() => setGender("female")}
                      className="hidden peer "
                    />
                    <label
                      htmlFor="female"
                      className="inline-flex items-center justify-center w-full p-5 text-black bg-white border rounded-lg cursor-pointer  peer-checked:border-[#B3B3B3] peer-checked:bg-[#6C1E5D] peer-checked:text-white hover:text-gray-600 hover:bg-gray-100  border-[#463E3F] "
                    >
                      <div className="block">
                        <div className="w-full text-lg font-normal">Female</div>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>

              <div className="flex justify-end lg:p-2 p-4">
                {/* button tambahkan ke keranjang */}
                <div className="flex lg:justify-end px-10 gap-3">
                  {/* button payment */}
                  <div className="w-48 kiosk:w-64">
                    <button
                      type="submit"
                      className=" items-center justify-center w-full py-5  flex gap-2 text-black bg-white border border-[#463E3F] rounded-lg cursor-pointer hover:text-white hover:bg-[#6C1E5D]"
                    >
                      <span className="inline  cursor-pointer text-2xl">
                        Next
                      </span>
                      <MdOutlineNavigateNext size={30} />
                    </button>
                  </div>
                </div>
              </div>
            </form>

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
          </div>
        </>
        // close data produk detail
      )}
    </>
  );
};

export default ProductDetail;
