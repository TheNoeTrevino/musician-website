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
      <div className="main-container">
        <div className="information-container">
          <div className="title-description-container">
            <p className="title">{piece.title}</p>
            <span className="description">{piece.description}</span>
          </div>

          <div className="attributes-container">
            <div className="attributes">
              <IconCalendar /> {piece.yearComposed}
            </div>

            <div className="attributes">
              <IconUsers /> {piece.numOfPlayers} Players
            </div>

            <div className="attributes">
              <IconBrandSpeedtest /> {piece.difficultyGrade}{" "}
              {piece.difficultyGrade < 3 ? "Beginner" : "Advanced"}
            </div>

            <div className="attributes">
              <IconClock /> {piece.timeLength} Minutes
            </div>

            <div className="flex flex-row gap-4 items-center">
              {piece.hasElectronics ? (
                <IconCircleCheckFilled className="electronics-check" />
              ) : (
                <IconCircleXFilled className="electronics-check" />
              )}
              Electronics
            </div>

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

        <div className="music-cart-container">
          <div className="image-container">
            <img
              className="art"
              src={
                "../../public/albums/" +
                piece.title.replace(/ /g, "-").toLowerCase() +
                ".png"
              }
              alt="Music Album"
            />
            <img
              loading="lazy"
              className="record-overlay"
              src="/record_overlay.png"
              alt="Music Album Overlay"
            />
            {isPlaying ? (
              <IconPlayerPauseFilled
                onClick={handlePlayPauseClick}
                className="player-icon"
              />
            ) : (
              <IconPlayerPlayFilled
                onClick={handlePlayPauseClick}
                className="player-icon"
              />
            )}
          </div>

          <div className="progressbar-container">
            {/* TODO: somehow need to make this choose where you are in the piece */}
            <div
              className="progressbar"
              style={{
                width: `${(audio.current.currentTime / audio.current.duration) * 100}%`,
              }}
            ></div>
            <div className="progress-fraction">
              {progress + " "} /{" " + formatTime(audio.current.duration)}
            </div>
          </div>

          <div>
            <div className="cart-section">
              <div className="button primary-button">
                Quantity {quantity} <IconChevronDown />
              </div>
              <p className="price-text">${piece.price}</p>
            </div>
            <a
              onClick={() => {
                toast.success(piece.title + " Added to Cart");
              }}
              className="button primary-button"
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
