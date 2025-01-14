import ContactSection from "../../components/ContactSection";
import SeperationSection from "../../components/SeperationSection";
import ShowcaseSection from "../../components/showcase/ShowcaseSection";
import { PieceDTO } from "../../dtos/dtos";

const Shop = ({ piece }: { piece: PieceDTO }) => {
  return (
    <body className="flex flex-col  bg-black">
      {/* <SecondaryHeroSection */}
      {/*   backdrop={true} */}
      {/*   image={ */}
      {/*     "../../../public/albums/" + */}
      {/*     piece.title.replace(/ /g, "-").toLowerCase() + */}
      {/*     ".png" */}
      {/*   } */}
      {/* /> */}
      <ShowcaseSection piece={piece} />
      <SeperationSection />
      <ContactSection />
    </body>
  );
};

export default Shop;
