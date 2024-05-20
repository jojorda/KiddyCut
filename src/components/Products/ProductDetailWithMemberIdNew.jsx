import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import axios from "axios";
import Kiddy from "../../assets/kiddy.png";
import Topbar3 from "../topbar/Topbar3";
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
import { BsCart2 } from "react-icons/bs";
import { memberList } from "../../../data/memberId"; // Import the memberId array

const ProductDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_KEY;

  const hairstylists = ["Hani", "Rizky", "Dina", "Mega"];
  // const users = ["Vina", "Vino", "Vincent", "John", "Jane"];
  const [filteredMemberData, setFilteredMemberData] = useState(null);
  const [selectedHairstylist, setSelectedHairstylist] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [memberId, setMemberId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(1);

  const [customers, setCustomers] = useState([]);
  const [customersName, setCustomersName] = useState([]);

  // member state
  const [isMember, setIsMember] = useState(false);
  const [phoneNumbersMember, setPhoneNumbersMember] = useState("");
  const [filteredCustomer, setFilteredCustomer] = useState(null);

  // useState for cart
  const [cart, setCart] = useState([]);
  const [notes, setNotes] = useState("");
  const [product, setProduct] = useState({});
  const [allSelectAddOns, setAllSelectAddOns] = useState([]);
  const [handleSelect, setHandleSelect] = useState([]);

  const navigate = useNavigate();

  const checkMemberData = async () => {
    if (!memberId || !phoneNumbersMember) {
      // alert("Please enter both Member ID and Phone Number");
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Mohon masukkan member ID dan nomor telepon",
      });
      return;
    }
    // console.log(customers);
    // console.log(memberId, phoneNumbersMember);
    // Filter customers based on memberId and phoneNumbersMember
    const filteredCustomer = customers.filter(
      (customer) =>
        customer.id === +memberId &&
        customer.phone_number === phoneNumbersMember
    );
    console.log(filteredCustomer);

    if (filteredCustomer.length > 0) {
      Swal.fire({
        icon: "success",
        title: "Data member ditemukan",
      });
      setFilteredCustomer(filteredCustomer[0]); // Assuming only one match
      
    } else {
      setFilteredCustomer(null);
      Swal.fire({
        icon: "warning",
        title: "Data member tidak ditemukan",
        text: "Mohon cek kembali member ID dan nomor telepon"
      });
    }
  };

  const handleCheckboxChange = () => {
    setIsMember((isMember) => !isMember);
    // if (!isMember) {
    //   setMemberId("");
    //   setFilteredMemberData("");
    //   setBirthdate("");
    //   setFilteredCustomer("");
    //   setPhoneNumbersMember("");
    // } 
  };

  useEffect(() => {
    if (!isMember) {
      setMemberId("");
      setFilteredMemberData("");
      setBirthdate("");
      setFilteredCustomer("");
      setPhoneNumbersMember("");
    }
  }, [isMember]);

  // filter selected memberId
  // const handleInputMemberId = (e) => {
  //   const { value } = e.target;
  //   setMemberId(value);
  //   // Filter the JSON data based on the entered memberId
  //   const filtered = memberList.find((item) => item.id === parseInt(value));
  //   setFilteredMemberData(filtered);
  // };

  let counter = 2000;

  // create 4 digit memberId if there is new member
  function generateRandom4DigitNumber() {
    // Generate a random number between 0 and 9999
    const randomNumber = Math.floor(Math.random() * 10000);

    // Ensure the number is exactly 4 digits long
    const formattedNumber = randomNumber.toString().padStart(4, "0");

    return formattedNumber;
  }

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   if (!selectedHairstylist) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Oops...",
  //       text: "Mohon pilih hairstylist terlebih dahulu",
  //     });
  //     return;
  //   }
  //   let formData;
  //   if (filteredMemberData) {
  //     formData = {
  //       service: detail.name,
  //       selectedHairstylist,
  //       name: filteredMemberData.name,
  //       memberId,
  //       phoneNumber: filteredMemberData.phone,
  //       birthdate: filteredMemberData.birthdate,
  //       gender: filteredMemberData.gender,
  //       totalPrice,
  //     };
  //   } else {
  //     if (!gender) {
  //       Swal.fire({
  //         icon: "warning",
  //         title: "Oops...",
  //         text: "Opsi jenis kelamin belum dipilih",
  //       });
  //       return;
  //     }
  //     formData = {
  //       service: detail.name,
  //       selectedHairstylist,
  //       name,
  //       memberId: generateRandom4DigitNumber(),
  //       phoneNumber,
  //       birthdate,
  //       gender,
  //       totalPrice,
  //     };
  //   }

  //   // Convert the form data to a JSON string
  //   const formDataJSON = JSON.stringify(formData);
  //   // Save the form data to localStorage
  //   localStorage.setItem("formData", formDataJSON);

  //   // Clear form fields
  //   setSelectedHairstylist("");
  //   setName("");
  //   setMemberId("");
  //   setPhoneNumber("");
  //   setBirthdate("");
  //   setGender("");

  //   navigate("/payment");
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedHairstylist) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Mohon pilih hairstylist terlebih dahulu",
      });
      return;
    }
    let formData;
    if (filteredCustomer) {
      formData = {
        service: detail.name,
        selectedHairstylist,
        name: filteredCustomer.name,
        memberId,
        phoneNumber: phoneNumbersMember,
        birthdate: filteredCustomer.bod || "",
        gender: filteredMemberData.sex || "",
        totalPrice,
      };
    } else {
      formData = {
        service: detail.name,
        selectedHairstylist,
        name: name,
        memberId,
        phoneNumber: phoneNumber,
        birthdate: birthdate,
        gender: gender,
        totalPrice,
      };
    } 

    // Convert the form data to a JSON string
    const formDataJSON = JSON.stringify(formData);
    // Save the form data to localStorage
    localStorage.setItem("formData", formDataJSON);

    //  add to cart
    handleAddCart();

    // Clear form fields
    setSelectedHairstylist("");
    setName("");
    setMemberId("");
    setPhoneNumber("");
    setBirthdate("");
    setGender("");

    navigate("/products/keranjang");
  };

  // Function to format the birthdate string to 'yyyy-mm-dd'
  const formatDate = (birthdate) => {
    const months = {
      Januari: "01",
      Februari: "02",
      Maret: "03",
      April: "04",
      Mei: "05",
      Juni: "06",
      Juli: "07",
      Agustus: "08",
      September: "09",
      Oktober: "10",
      November: "11",
      Desember: "12",
    };

    const parts = birthdate.split(" ");
    return `${parts[2]}-${months[parts[1]]}-${parts[0]}`;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);

    // Filter suggestions based on user input
    if (inputValue.length >= 3) {
      // Filter suggestions based on user input
      const filteredSuggestions = customersName.filter((customerName) =>
        customerName.toLowerCase().includes(inputValue.toLowerCase())
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

  // get customer names
  // https://api.beetpos.com/api/v1/customer
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_KEY;
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/v1/customer`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const customersData = response.data.data;
        // Extract names directly and set them
        const customerNames = response.data.data.map(
          (customer) => customer.name
        );
        setCustomers(customersData);
        setCustomersName(customerNames);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
        setLoading(false);
      }
    };
    getCustomers();
  }, []);
  // close get customer names

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

  const isSameCartItem = (itemA, itemB) => {
    return (
      (itemA.id && itemA.id === itemB.id) ||
      (itemA.idItem && itemA.idItem === itemB.id)
    );
  };

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

      setProduct(response.data.data);

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

  // get data keranjang
  // useEffect(() => {
  //   const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //   setCart(storedCart);
  //   handleGetProduct();
  // }, []);

  // get data cart localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    handleGetProduct();
  }, []);

  // fungsi untuk menambahkan data ke keranjang
  const handleAddCart = () => {
    try {
      if (!selectedHairstylist) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Mohon pilih hairstylist terlebih dahulu",
        });
        return;
      }
      if (filteredCustomer) {
        setGender(filteredCustomer.gender || null);
      } else {
        if (!gender) {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Opsi jenis kelamin belum dipilih",
          });
          return;
        }
      }

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
        selectedHairstylists: selectedHairstylist,
        name: name
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
      setCart(existingCart);

      Swal.fire({
        icon: "success",
        title: "Item Ditambahkan ke Keranjang",
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          title: "text-lg",
        },
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  // close fungsi untuk menambahkan data ke keranjang

  return (
    <>
      {/* <Topbar2 /> */}
      <Topbar3 detail={detail} loading={loading} cart={cart} />
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
                  src={
                    !detail.image
                      ? "https://api.beetpos.com/images/product/productImage/productImage-1713493799493.jpeg"
                      : `${API_URL}/${detail.image}`
                  }
                  className="lg:w-72 lg:h-72 md:w-96 md:h-80 w-screen h-[200px]  lg:rounded-xl md:rounded-xl object-cover cursor-pointer shadow-xl"
                  alt={detail.name}
                  onClick={
                    () =>
                      openModal(
                        // !detail.image ? Kiddy : `${API_URL}/${detail.image}`
                        !detail.image
                          ? "https://api.beetpos.com/images/product/productImage/productImage-1713493799493.jpeg"
                          : `${API_URL}/${detail.image}`
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

            {/* Bio Form */}
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
                          required
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
                    value={isMember ? memberId : ""}
                    onChange={(e) => setMemberId(e.target.value)}
                    className="border-slate-950 border-2  rounded-md block w-full p-3 mt-1 disabled:bg-[#e0e0e0]"
                    required
                    disabled={!isMember}
                  />
                </div>

                {/* checkbox memberId */}
                <div>
                  <label>
                    <input type="checkbox" onChange={handleCheckboxChange} />
                    &nbsp; Saya punya Member ID
                  </label>
                  <br />
                </div>

                {/* phone number for member */}
                {isMember && (
                  <div className="mt-5">
                    <label className="font-sm text-[#463E3F] text-lg">
                      No HP
                    </label>
                    <input
                      type="number"
                      value={phoneNumbersMember}
                      className="border-slate-950 border-2  rounded-md block w-full p-3 mt-1 read-only:bg-[#e0e0e0]"
                      required
                      onChange={(e) => setPhoneNumbersMember(e.target.value)}
                    />
                  </div>
                )}
                {/* close phone number for member */}

                {/* check button for member */}
                {isMember && (
                  <div className="flex lg:justify-end mt-3">
                    <div className="w-48 kiosk:w-64">
                      <button
                        onClick={checkMemberData}
                        type="button"
                        className=" items-center justify-center w-full py-5 px-5 flex gap-2 text-black bg-white border border-[#463E3F] rounded-lg cursor-pointer hover:text-white hover:bg-[#6C1E5D]"
                      >
                        <span className="inline cursor-pointer text-2xl">
                          Check Member
                        </span>
                      </button>
                    </div>
                  </div>
                )}
                {/* close check button for member */}
                

                {/* manual input */}
                {!filteredCustomer && !isMember && (
                  <>
                    {/* manual input value */}
                    {/* nama */}
                    <div className="mt-2">
                      <label className="text-lg text-[#463E3F] ">Nama</label>
                      <input
                        type="text"
                        value={name}
                        onChange={handleInputChange}
                        className="border-slate-950 border-2 rounded-md block w-full p-3 mt-1 disabled:bg-[#e0e0e0]"
                        required
                        disabled={isMember}
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
                        className="border-slate-950 border-2  rounded-md block w-full p-3 mt-1 disabled:bg-[#e0e0e0]"
                        required
                        disabled={isMember}
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
                        className="border-slate-950 border-2  rounded-md block w-full p-3 mt-1 disabled:bg-[#e0e0e0]"
                        min="2007-01-01"
                        required
                        disabled={isMember}
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
                          className="hidden peer"
                          disabled={isMember}
                          // required
                        />
                        <label
                          htmlFor="male"
                          className="inline-flex items-center justify-center w-full p-5 text-black bg-white  rounded-lg cursor-pointer  peer-checked:border-[#B3B3B3] peer-checked:bg-[#6C1E5D]
                  peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 max-w-40 border-2 border-[#463E3F] "
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
                          disabled={isMember}
                          // required
                        />
                        <label
                          htmlFor="female"
                          className="inline-flex items-center justify-center w-full p-5 text-black bg-white border-2 rounded-lg cursor-pointer  peer-checked:border-[#B3B3B3] peer-checked:bg-[#6C1E5D] peer-checked:text-white hover:text-gray-600 hover:bg-gray-100  border-[#463E3F]"
                        >
                          <div className="block">
                            <div className="w-full text-lg font-normal">
                              Female
                            </div>
                          </div>
                        </label>
                      </li>
                    </ul>
                  </>
                )}


                {/* Conditionally display filtered customer data if found */}
                {filteredCustomer && (
                  <div>
                    {/* nama */}
                    <div className="mt-2">
                      <label className="text-lg text-[#463E3F] ">Nama</label>
                      <input
                        type="text"
                        value={filteredCustomer.name}
                        className="border-slate-950 border-2 rounded-md block w-full p-3 mt-1 read-only:bg-[#e0e0e0]"
                        readOnly
                      />
                    </div>
                    {/* birthdate */}
                    <div className="mt-5">
                      <label className="font-sm text-[#463E3F] text-lg">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        value={formatDate(filteredCustomer.bod || "")}
                        className="border-slate-950 border-2 rounded-md block w-full p-3 mt-1 read-only:bg-[#e0e0e0]"
                        min="2007-01-01"
                        readOnly
                      />
                    </div>
                    {/* male/female */}
                    <ul className="grid gap-4 max-w-80 grid-cols-2 w-1/2 text-center mt-5">
                      <li className="max-w-40">
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          checked={filteredCustomer.gender === "male"}
                          className="hidden peer"
                          readOnly
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
                          value="female"
                          className="hidden peer"
                          checked={filteredCustomer.gender === "female"}
                          readOnly
                        />
                        <label
                          htmlFor="female"
                          className="inline-flex items-center justify-center w-full p-5 text-black bg-white  rounded-lg cursor-pointer  peer-checked:border-[#B3B3B3] peer-checked:bg-[#6C1E5D] peer-checked:text-white hover:text-gray-600 hover:bg-gray-100  border-[#463E3F] max-w-40 border-2 "
                        >
                          <div className="block">
                            <div className="w-full text-lg font-normal">
                              Female
                            </div>
                          </div>
                        </label>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-end lg:p-2 p-4">
                <div className="flex lg:justify-end px-10 gap-3">
                  {/* button save */}
                  <div className="w-48 kiosk:w-64">
                    <button
                      onClick={handleAddCart}
                      type="button"
                      className=" items-center justify-center w-full py-5  flex gap-2 text-black bg-white border border-[#463E3F] rounded-lg cursor-pointer hover:text-white hover:bg-[#6C1E5D]"
                    >
                      <span className="inline  cursor-pointer text-2xl">
                        Save
                      </span>
                      <BsCart2 size={30} />
                    </button>
                  </div>

                  {/* button next */}
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
            {/* close bio form */}

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
                  src={detail.image == null ? Lg : `${API_URL}/${detail.image}`}
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
