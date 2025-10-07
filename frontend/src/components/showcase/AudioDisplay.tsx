import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconRewindBackward15,
  IconRewindForward15,
} from "@tabler/icons-react";
import { PieceDTO } from "../../dtos/dtos";
import { useState } from "react";
import WavesurferPlayer from "@wavesurfer/react";
import WaveSurfer from "wavesurfer.js";
// import HoverPlugin from "wavesurfer.js/dist/plugins/hover.js";

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
  const handleTimeUpdate = () => {
    if (wavesurfer) {
      setCurrentTime(wavesurfer.getCurrentTime());
    }
  };
  const skipForward = () => {
    wavesurfer?.setTime(wavesurfer.getCurrentTime() + 15);
  };
  const skipBackwards = () => {
    wavesurfer?.setTime(wavesurfer.getCurrentTime() - 15);
  };
  return (
    <>
      <div className="relative flex items-center justify-center">
        <img
          className="z-10 rounded-full w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[550px] lg:h-[550px] object-cover"
          src={
            "/albums/" + piece.title.replace(/ /g, "-").toLowerCase() + ".png"
          }
          alt="Music Album"
          loading="eager"
        />
        <img
          loading="lazy"
          className="absolute z-20 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[550px] lg:h-[550px] opacity-30 object-cover"
          src="/record_overlay.png"
          alt="Music Album Overlay"
        />
        {isPlaying ? (
          <IconPlayerPauseFilled
            onClick={onPlayPause}
            className="absolute z-30 text-primary size-20 sm:size-24 md:size-28 hover:text-reallyWhite cursor-pointer active:scale-95 transition-transform"
          />
        ) : (
          <IconPlayerPlayFilled
            onClick={onPlayPause}
            className="absolute z-30 text-primary size-20 sm:size-24 md:size-28 hover:text-reallyWhite cursor-pointer active:scale-95 transition-transform"
          />
        )}
      </div>
      <div className="py-2 w-full">
        {isLoading && <div className="text-center text-white">Loading audio...</div>}
        <WavesurferPlayer
          dragToSeek={true}
          barWidth={2}
          barRadius={2}
          height={75}
          waveColor="#FFFFFF"
          progressColor="#888888"
          url={
            "/audios/" + piece.title.replace(/ /g, "-").toLowerCase() + ".mp3"
          }
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeupdate={handleTimeUpdate}
          // TODO: for some reason, this breaks eveything
          // plugins={[HoverPlugin.create()]}
        />
      </div>
      {!isLoading && (
        <>
          <div className="flex flex-row justify-center items-center gap-3 md:gap-4">
            <button className="button py-3 px-6 md:py-2 md:px-8 text-base md:text-lg active:scale-95" onClick={skipBackwards}>
              <IconRewindBackward15 className="w-6 h-6 md:w-7 md:h-7" />
            </button>
            <button className="button py-3 px-6 md:py-2 md:px-8 text-base md:text-lg active:scale-95" onClick={onPlayPause}>
              {isPlaying ? <IconPlayerPlayFilled className="w-6 h-6 md:w-7 md:h-7" /> : <IconPlayerPlayFilled className="w-6 h-6 md:w-7 md:h-7" />}
            </button>
            <button className="button py-3 px-6 md:py-2 md:px-8 text-base md:text-lg active:scale-95" onClick={skipForward}>
              <IconRewindForward15 className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          </div>
          <p className="text-center text-white text-sm md:text-base mt-2">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </>
      )}
    </>
  );
};

export default AudioDisplay;
