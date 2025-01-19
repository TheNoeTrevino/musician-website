import {
  IconCalendar,
  IconUsers,
  IconBrandSpeedtest,
  IconClock,
  IconCircleCheckFilled,
  IconCircleXFilled,
} from "@tabler/icons-react";
import { PieceDTO } from "../dtos/dtos";

const PieceAttributeCard = ({
  piece: piece,
  duration: duration,
}: {
  piece: PieceDTO;
  duration: string;
}) => {
  return (
    <div className="flex flex-col w-full h-screen  z-10  text-textGray justify-between py-3">
      <div className="flex flex-col gap-2">
        <p className="text-7xl text-white">{piece.title}</p>
        <span className="text-textGray text-lg font-light w-4/5">
          {piece.description}
        </span>
      </div>

      <div className="flex flex-col gap-4 text-3xl font-light">
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
          <IconClock /> {duration} Minutes
        </div>

        <div className="flex flex-row gap-4 items-center">
          {piece.hasElectronics ? (
            <IconCircleCheckFilled className="text-primary size-6" />
          ) : (
            <IconCircleXFilled className="text-primary size-6" />
          )}
          Electronics
        </div>
      </div>
    </div>
  );
};

export default PieceAttributeCard;
