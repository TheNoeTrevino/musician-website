import ContactSection from "../../components/ContactSection";
import StoreSecton from "../../components/PieceShopSecton";
import useScrollToTop from "../../hooks/ScrollTop";

// TODO: probably no secondary hero section here either
const Shop = () => {
  useScrollToTop();
  return (
    <body className="flex flex-col bg-black">
      <div className="h-px bg-black w-3/4 self-center my-7"></div>
      <StoreSecton />
      <ContactSection />
    </body>
  );
};

export default Shop;
