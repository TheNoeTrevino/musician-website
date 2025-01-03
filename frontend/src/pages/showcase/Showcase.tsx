import { useLocation } from "react-router-dom";
import ContactSection from "../../components/ContactSection";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SecondaryHeroSection from "../../components/SecondaryHeroSection";
import SeperationSection from "../../components/SeperationSection";
import ShowcaseSection from "../../components/ShowcaseSection";
const Shop = () => {
  const location = useLocation();
  const song = location.state;

  return (
    <body className="flex flex-col  bg-black">
      <Header />
      <SecondaryHeroSection backdrop={true} image={song.image} />
      <ShowcaseSection song={song} />

      <SeperationSection />
      <ContactSection />
      <Footer />
    </body>
  );
};

export default Shop;
