import ContactSection from "../../components/ContactSection";
import SecondaryHeroSection from "../../components/SecondaryHeroSection";
import SeperationSection from "../../components/SeperationSection";
import StoreSecton from "../../components/PieceShopSecton";

// TODO: probably no secondary hero section here either
const Shop = () => {
  return (
    <body className="flex flex-col bg-black">
      <SecondaryHeroSection backdrop={false} image={null} />
      <div className="h-px bg-gray-500 w-3/4 self-center my-32"></div>
      <StoreSecton />
      <SeperationSection />
      <ContactSection />
    </body>
  );
};

export default Shop;
