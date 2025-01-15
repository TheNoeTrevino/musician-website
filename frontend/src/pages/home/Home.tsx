import AboutSection from "../../components/AboutSection";
import ContactSection from "../../components/ContactSection";
import HeroSection from "../../components/HeroSection";
import SeperationSection from "../../components/SeperationSection";
import ShopSecton from "../../components/ShopSecton";

const Home = () => {
  return (
    <body className="flex flex-col ">
      <HeroSection />
      <AboutSection />
      <SeperationSection />
      <ShopSecton />
      <ContactSection />
    </body>
  );
};

export default Home;
