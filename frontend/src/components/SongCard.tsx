import { Link } from "react-router-dom";

interface Players {
  name: string;
  instrument: string;
}

interface Song {
  title: string;
  description: string;
  year: number;
  players: Players[];
  grade: number;
  length: string;
  electronics: boolean;
  octaves: number;
  price: number;
  quantity: number;
  image: string;
}

const SongCard = ({ song }: { song: Song }) => {
  return (
    <Link
      to={"/showcase"}
      className="text-white flex flex-col items-center justify-center text-center w-full "
      state={song}
    >
      <div className="bg-reallyBlack rounded-t-lg w-full text-sm h-12 flex items-center justify-center">
        {song.title}
      </div>
      <img
        className="w-full object-cover"
        src={song.image}
        alt={`${song.title} Album`}
      />
      <div className="bg-reallyBlack rounded-b-lg w-full text-2xl py-1">
        ${song.price}
      </div>
    </Link>
  );
};

export default SongCard;
