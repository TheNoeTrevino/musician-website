import AboutSection from "../../components/AboutSection";
import ContactSection from "../../components/ContactSection";
import SeperationSection from "../../components/SeperationSection";

const About = () => {
  return (
    <body className="flex flex-col ">
      <AboutSection />;
      <SeperationSection />
      <ContactSection />
    </body>
  );
};

export default About;
