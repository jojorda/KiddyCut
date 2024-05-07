import ProductKeranjang2 from "../../components/Products/ProductKeranjang";
import BottomBar from "../../components/bottombar/BottomBar";
import Iklan from "../../components/iklan/Iklan";
import Topbar2 from "../../components/topbar/Topbar2";

const ProductKeranjang = () => {
  return (
    <>
      <Topbar2 />
      <div className="sm:mb-[210px] md:mb-[210px] lg:mb-[260px] mb-[90px]">
        <ProductKeranjang2 />
      </div>
      <div className="">
        <Iklan />
      </div>
      {/* <BottomBar/> */}
    </>
  );
};

export default ProductKeranjang;
