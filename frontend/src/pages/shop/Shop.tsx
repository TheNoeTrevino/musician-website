import ContactSection from "../../components/ContactSection";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SecondaryHeroSection from "../../components/SecondaryHeroSection";
import SeperationSection from "../../components/SeperationSection";
import StoreSecton from "../../components/StoreSecton";

const Shop = () => {
  return (
    <body className="flex flex-col bg-black">
      <Header />
      <SecondaryHeroSection backdrop={false} image={null} />
      <div className="h-px bg-gray-500 w-3/4 self-center my-32"></div>
      <StoreSecton />
      <SeperationSection />
      <ContactSection />
      <Footer />
    </body>
  );
};

export default Shop;
