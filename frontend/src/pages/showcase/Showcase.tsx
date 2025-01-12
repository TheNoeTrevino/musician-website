import ContactSection from "../../components/ContactSection";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SecondaryHeroSection from "../../components/SecondaryHeroSection";
import SeperationSection from "../../components/SeperationSection";
import ShowcaseSection from "../../components/ShowcaseSection";
import { PieceDTO } from "../../dtos/dtos";

const Shop = ({ piece }: { piece: PieceDTO }) => {
  return (
    <body className="flex flex-col  bg-black">
      <Header />
      <SecondaryHeroSection
        backdrop={true}
        image={
          "../../../public/albums/" + piece.title.replace(/ /g, "-") + ".png"
        }
      />
      <ShowcaseSection piece={piece} />
      <SeperationSection />
      <ContactSection />
      <Footer />
    </body>
  );
};

export default Shop;
