import { Link } from "react-router-dom";
import { PieceDTO } from "../dtos/dtos";

const PieceCard = ({ piece }: { piece: PieceDTO }) => {
  const fallbackSrc = "/albums/blank.png";

  return (
    <Link
      to={"/" + piece.title.replace(/ /g, "-")}
      className="text-white flex flex-col items-center justify-center text-center w-full transition-transform hover:scale-105 active:scale-95"
    >
      <div className="bg-reallyBlack rounded-t-lg w-full text-xs sm:text-sm md:text-base h-10 sm:h-12 md:h-14 flex items-center justify-center px-2">
        {piece.title}
      </div>
      <img
        className="w-full object-cover aspect-square"
        src={"/albums/" + piece.title.replace(/ /g, "-").toLowerCase() + ".png"}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = fallbackSrc;
        }}
        alt={`${piece.title} Album cover`}
        loading="lazy"
      />
      <div className="bg-reallyBlack rounded-b-lg w-full text-lg sm:text-xl md:text-2xl py-2 md:py-1">
        ${piece.price}
      </div>
    </Link>
  );
};

export default PieceCard;
