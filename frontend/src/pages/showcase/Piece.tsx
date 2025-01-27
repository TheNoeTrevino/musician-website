import ContactSection from "../../components/ContactSection";
import SeperationSection from "../../components/SeperationSection";
import ShowcaseSection from "../../components/ShowcaseSection";
import { PieceDTO } from "../../dtos/dtos";
import useScrollToTop from "../../hooks/ScrollTop";

const Shop = ({ piece }: { piece: PieceDTO }) => {
  useScrollToTop();
  return (
    <body className="flex flex-col bg-black gap-6">
      <ShowcaseSection piece={piece} />
      <SeperationSection />
      <ContactSection />
    </body>
  );
};

export default Shop;
