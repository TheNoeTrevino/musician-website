import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { PieceDTO } from "../dtos/dtos";
import PieceAttributeCard from "./showcase/PieceAttributeCard";
import AudioDisplay from "./showcase/AudioDisplay";
import { useCartContext } from "./CartContext";

// TODO: this is giving a weird pace to the size of some seconds
function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  if (seconds > 9) {
    return `${minutes}:${seconds}`;
  } else {
    return `${minutes}:0${seconds}`;
  }
}

const ShowcaseSection = ({ piece: piece }: { piece: PieceDTO }) => {
  const { addToCart } = useCartContext();

  const [duration, setDuration] = useState<string>("0:00");
  const pieceAudio =
    "/audios/" + piece.title.replace(/ /g, "-").toLowerCase() + ".mp3";
  const audio = useRef(new Audio(pieceAudio));

  // TODO: this is not pausing
  const handleLoadedMetaData = () => {
    setDuration(formatTime(audio.current.duration));
  };

  useEffect(() => {
    audio.current.addEventListener("loadedmetadata", handleLoadedMetaData);

    return () => {
      audio.current.removeEventListener("loadedmetadata", handleLoadedMetaData);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-row mx-48 mt-24">
        <PieceAttributeCard piece={piece} duration={duration} />

        <div className="flex flex-col  justify-between text-2xl font-medium text-textGray w-full gap-4 h-screen py-3">
          <AudioDisplay piece={piece} />

          <div>
            <div className="flex flex-row justify-center text-2xl">
              <p className="text-6xl text-white text-center">${piece.price}</p>
            </div>
            <a
              onClick={() => {
                addToCart({ ...piece, quantity: 1 });
                toast.success(piece.title + " Added to Cart");
              }}
              className="button bg-primary py-6"
            >
              Add To Cart
            </a>
          </div>
        </div>
      </div>

      {/* TODO: change this to where it works with the backend   */}
      {/* <div className="flex flex-col w-full  gap-10  text-center items-center justify-center py-44 "> */}
      {/*   <p className="text-7xl text-white">Players</p> */}
      {/*   {song.players.map((player, index) => ( */}
      {/*     <span key={index} className="text-textGray text-4xl font-light"> */}
      {/*       {player.name} - {player.instrument} */}
      {/*     </span> */}
      {/*   ))} */}
      {/* </div> */}
    </>
  );
};

export default ShowcaseSection;
