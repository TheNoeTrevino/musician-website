import { IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PieceService } from "../services/PieceService";
import { PieceDTO } from "../dtos/dtos";

const ShopSecton = () => {
  const [pieces, setPieces] = useState<PieceDTO[] | undefined>(undefined);

  const fetchPieces = async () => {
    const fetchedPieces = await PieceService.getAllPieces();
    setPieces(fetchedPieces);
  };

  useEffect(() => {
    fetchPieces();
  }, []);

  return (
    <div className="bg-black flex flex-col md:flex-row px-4 md:px-12 lg:px-24 xl:pr-52 relative">
      {/* Background image - hidden on mobile, visible on tablet+ */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <img
          className="h-full w-full object-cover opacity-80"
          src="/shopsection_image.png"
          alt="Sebastian playing instrument in a band"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col w-full justify-between z-10 py-12 md:pt-14 gap-8 md:gap-0">
        <div className="flex flex-col gap-2 md:gap-3">
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">Shop</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-0">
          {pieces
            ?.filter((piece) => piece.completed == true)
            .map((piece, index) => (
              <div key={index} className="hover:opacity-90 transition-opacity active:scale-95">
                <Link to={"/" + piece.title.replace(/ /g, "-")}>
                  <img
                    className="w-full aspect-square object-cover"
                    src={
                      "/albums/" +
                      piece.title.replace(/ /g, "-").toLowerCase() +
                      ".png"
                    }
                    alt={`${piece.title} Album`}
                    loading="lazy"
                  />
                </Link>
              </div>
            ))}

          <div className="flex relative items-center justify-center aspect-square">
            <img
              className="absolute w-full h-full opacity-5 object-cover"
              src="/albums/blank.png"
              alt="Music Album #4"
              loading="lazy"
            />
            <Link
              to={"/shop"}
              className="button bg-primary cursor-pointer z-10 text-sm sm:text-base py-3 md:py-2 active:scale-95"
            >
              Shop More
              <IconChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSecton;
