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
    <div className="h-screen bg-black flex flex-row pr-52 ">
      <div className="w-full">
        <img
          className="h-screen absolute "
          src="/shopsection_image.png"
          alt="Sebastian playing instrument in a band"
        />
      </div>

      <div className="flex flex-col w-full justify-between  z-10 pt-14 ">
        <div className="flex flex-col gap-3">
          <p className="text-7xl text-white">Shop</p>
        </div>

        <div className="grid grid-cols-2">
          {pieces
            ?.filter((piece) => piece.completed == true)
            .map((piece, index) => (
              <div key={index}>
                <Link to={"/" + piece.title.replace(/ /g, "-")}>
                  <img
                    className="w-full"
                    src={
                      "/albums/" +
                      piece.title.replace(/ /g, "-").toLowerCase() +
                      ".png"
                    }
                    alt={`${piece.title} Album`}
                  />
                </Link>
              </div>
            ))}

          <div className="flex relative items-center justify-center">
            <img
              className="absolute w-full opacity-5"
              src="/albums/blank.png"
              alt="Music Album #4"
            />
            <Link
              to={"/shop"}
              className=" button bg-primary cursor-pointer z-10"
            >
              Shop More
              <IconChevronRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSecton;
