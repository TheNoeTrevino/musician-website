import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { PieceDTO } from "../../dtos/dtos";
import { useState } from "react";

const AudioDisplay = ({
  piece: piece,
  audio: audio,
  progress: progress,
  duration: duration,
}: {
  piece: PieceDTO;
  audio: React.MutableRefObject<HTMLAudioElement>;
  progress: string;
  duration: string;
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const handlePlayPauseClick = () => {
    if (isPlaying) {
      audio.current.pause();
    } else {
      audio.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
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
          {progress + " "} /{" " + duration}
        </div>
      </div>
    </>
  );
};

export default AudioDisplay;
