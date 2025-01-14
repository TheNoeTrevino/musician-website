import {
  IconBrandSpeedtest,
  IconCalendar,
  IconChevronDown,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconClock,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { PieceDTO } from "../../dtos/dtos";
import "./ShowcaseSection.css";

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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [progress, setProgress] = useState<string>("0:00");
  const pieceAudio =
    "../../public/audios/" +
    piece.title.replace(/ /g, "-").toLowerCase() +
    ".mp3";
  const audio = useRef(new Audio(pieceAudio));

  // TODO: this is not pausing
  const handlePlayPauseClick = () => {
    if (isPlaying) {
      audio.current.pause();
    } else {
      audio.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      setProgress(formatTime(audio.current.currentTime));
    };

    audio.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-row mx-52 mt-24">
        <div className="flex flex-col w-full h-screen  z-10  text-textGray justify-between py-3">
          <div className="flex flex-col gap-2">
            <p className="text-7xl text-white">{piece.title}</p>
            <span className="text-textGray text-lg font-light w-4/5">
              {piece.description}
            </span>
          </div>

          <div className="flex flex-col gap-4 text-3xl font-light;">
            <div className="flex flex-row gap-4 items-center">
              <IconCalendar /> {piece.yearComposed}
            </div>

            <div className="flex flex-row gap-4 items-center">
              <IconUsers /> {piece.numOfPlayers} Players
            </div>

            <div className="flex flex-row gap-4 items-center">
              <IconBrandSpeedtest /> {piece.difficultyGrade}{" "}
              {piece.difficultyGrade < 3 ? "Beginner" : "Advanced"}
            </div>

            <div className="flex flex-row gap-4 items-center">
              <IconClock /> {piece.timeLength} Minutes
            </div>

            <div className="flex flex-row gap-4 items-center">
              {piece.hasElectronics ? (
                <IconCircleCheckFilled className="text-primary size-6" />
              ) : (
                <IconCircleXFilled className="text-primary size-6" />
              )}
              Electronics
            </div>

            {/* TODO: change this to use the backend  */}
            {/* <div className="flex flex-row gap-4 items-center"> */}
            {/*   {song.octaves > 0 ? ( */}
            {/*     `(${song.octaves}) Octave` */}
            {/*   ) : ( */}
            {/*     <> */}
            {/*       <IconCircleXFilled className="text-primary size-6" /> Octaves */}
            {/*     </> */}
            {/*   )} */}
            {/* </div> */}
          </div>
        </div>

        <div className="flex flex-col  justify-between text-2xl font-medium text-textGray w-full  gap-4 h-screen py-3;">
          <div className="relative flex items-center justify-center">
            <img
              className="z-10 rounded-full w-[550px] h-[550px] object-cover"
              src={
                "../../public/albums/" +
                piece.title.replace(/ /g, "-").toLowerCase() +
                ".png"
              }
              alt="Music Album"
            />
            <img
              loading="lazy"
              className="absolute z-20 w-[550px] h-[550px] opacity-30 object-cover"
              src="/record_overlay.png"
              alt="Music Album Overlay"
            />
            {isPlaying ? (
              <IconPlayerPauseFilled
                onClick={handlePlayPauseClick}
                className="absolute z-30 text-primary size-28 hover:text-reallyWhite cursor-pointer"
              />
            ) : (
              <IconPlayerPlayFilled
                onClick={handlePlayPauseClick}
                className="absolute z-30 text-primary size-28 hover:text-reallyWhite cursor-pointer"
              />
            )}
          </div>

          <div className="relative w-full h-1  bg-reallyWhite rounded">
            {/* TODO: somehow need to make this choose where you are in the piece */}
            <div
              className="absolute h-full bg-primary rounded"
              style={{
                width: `${(audio.current.currentTime / audio.current.duration) * 100}%`,
              }}
            ></div>
            <div className="absolute -top-6 right-0 text-white text-sm">
              {progress + " "} /{" " + formatTime(audio.current.duration)}
            </div>
          </div>

          <div>
            <div className="flex flex-row justify-between text-2xl">
              <div className="button bg-primary py-6">
                Quantity {quantity} <IconChevronDown />
              </div>
              <p className="text-6xl text-white">${piece.price}</p>
            </div>
            <a
              onClick={() => {
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
