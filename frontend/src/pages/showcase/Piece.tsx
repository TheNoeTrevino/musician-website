import ContactSection from "../../components/ContactSection";
import ShowcaseSection from "../../components/ShowcaseSection";
import { PieceDTO } from "../../dtos/dtos";
import useScrollToTop from "../../hooks/ScrollTop";

const Shop = ({ piece }: { piece: PieceDTO }) => {
  useScrollToTop();
  return (
    <div className="flex flex-col bg-black gap-6">
      <ShowcaseSection piece={piece} />
      <ContactSection />
    </div>
  );
};

export default Shop;
