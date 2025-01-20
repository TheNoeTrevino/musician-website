import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { PieceDTO } from "../../dtos/dtos";
import { useState } from "react";
import WavesurferPlayer from "@wavesurfer/react";
import WaveSurfer from "wavesurfer.js/dist/types.js";

const formatTime = (seconds: number) => {
  return [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");
};

const AudioDisplay = ({ piece: piece }: { piece: PieceDTO }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const onReady = (ws: WaveSurfer) => {
    setWavesurfer(ws);
    setIsPlaying(false);
    setIsLoading(false);
    setDuration(ws.getDuration());
  };
  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };
  const handleTimeUpdate = (ws: WaveSurfer) => {
    setCurrentTime(ws.getCurrentTime());
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
            onClick={onPlayPause}
            className="absolute z-30 text-primary size-28 hover:text-reallyWhite cursor-pointer"
          />
        ) : (
          <IconPlayerPlayFilled
            onClick={onPlayPause}
            className="absolute z-30 text-primary size-28 hover:text-reallyWhite cursor-pointer"
          />
        )}
      </div>
      <div>
        {isLoading && <div className="text-center">Loading music...</div>}
        <WavesurferPlayer
          dragToSeek={true}
          barWidth={2}
          barRadius={2}
          height={75}
          waveColor="#F5862F"
          progressColor="#A65E2E"
          url={
            "../../public/audios/" +
            piece.title.replace(/ /g, "-").toLowerCase() +
            ".mp3"
          }
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeupdate={handleTimeUpdate}
        />
      </div>
      <div className="flex flex-row justify-center gap-3">
        <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>
        <p>
          {formatTime(currentTime)} / {formatTime(duration)}
        </p>
      </div>
    </>
  );
};

export default AudioDisplay;
