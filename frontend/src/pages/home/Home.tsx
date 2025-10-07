import AboutSection from "../../components/AboutSection";
import ContactSection from "../../components/ContactSection";
import HeroSection from "../../components/HeroSection";
import HomeShopSection from "../../components/HomeShopSection";

const Home = () => {
  return (
    <div className="flex flex-col ">
      <HeroSection />
      <AboutSection />
      <HomeShopSection />
      <ContactSection />
    </div>
  );
};

export default Home;
