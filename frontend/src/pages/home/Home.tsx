import AboutSection from "../../components/AboutSection";
import ContactSection from "../../components/ContactSection";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeroSection from "../../components/HeroSection";
import SeperationSection from "../../components/SeperationSection";
import ShopSecton from "../../components/ShopSecton";
import { UserService } from "../../services/UserService";

const Home = () => {
  const logGetUser = () => {
    console.log(UserService.getUserById(1));
  };
  const logDeleteUser = () => {
    console.log(UserService.deleteUserById(1));
  };
  const logGetUserByRole = () => {
    console.log(UserService.getAllUsersByRole("ADMIN"));
  };

  return (
    <body className="flex flex-col ">
      <Header />
      <HeroSection />
      <AboutSection />
      <SeperationSection />
      <ShopSecton />
      <ContactSection />
      <Footer />
    </body>
  );
};

export default Home;
