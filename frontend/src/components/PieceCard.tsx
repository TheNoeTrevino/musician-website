import { Link } from "react-router-dom";
import { PieceDTO } from "../dtos/dtos";

const PieceCard = ({ piece }: { piece: PieceDTO }) => {
  return (
    <Link
      to={"/" + piece.title.replace(/ /g, "-")}
      className="text-white flex flex-col items-center justify-center text-center w-full "
      state={piece}
    >
      <div className="bg-reallyBlack rounded-t-lg w-full text-sm h-12 flex items-center justify-center">
        {piece.title}
      </div>
      <img
        className="w-full object-cover"
        src={
          "../../public/albums/" +
          piece.title.replace(/ /g, "-").toLowerCase() +
          ".png"
        }
        alt={`${piece.title} Album. Photo not found`}
      />
      <div className="bg-reallyBlack rounded-b-lg w-full text-2xl py-1">
        ${piece.price}
      </div>
    </Link>
  );
};

export default PieceCard;
