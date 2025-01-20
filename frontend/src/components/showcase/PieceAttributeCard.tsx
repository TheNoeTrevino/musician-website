import {
  IconCalendar,
  IconUsers,
  IconBrandSpeedtest,
  IconClock,
  IconCircleCheckFilled,
  IconCircleXFilled,
} from "@tabler/icons-react";
import { PieceDTO } from "../../dtos/dtos";
import { useEffect, useState } from "react";

const PieceAttributeCard = ({
  piece: piece,
  duration: duration,
}: {
  piece: PieceDTO;
  duration: string;
}) => {
  const [difficulty, setDifficulty] = useState("Intermediate");

  const handleDifficulty = (difficulty: number): string => {
    switch (difficulty) {
      // NOTE: this could be named better
      case 1:
        return `${difficulty} Beginner`;
      case 2:
        return `${difficulty} Beginner-Intermediate`;
      case 3:
        return `${difficulty} Intermediate`;
      case 4:
        return `${difficulty} Intermediate-Hard`;
      case 5:
        return `${difficulty} Intermediate-Advanced`;
      case 6:
        return `${difficulty} Advanced`;
      default:
        return "Error processing difficulty";
    }
  };

  useEffect(
    () => setDifficulty(handleDifficulty(piece.difficultyGrade)),
    [piece.difficultyGrade],
  );

  return (
    <div className="flex flex-col w-full h-screen  z-10  text-textGray justify-between py-3">
      <div className="flex flex-col gap-2">
        <p className="text-7xl text-white">{piece.title}</p>
        <span className="text-textGray text-lg font-light w-4/5 mt-3">
          {piece.description}
        </span>
      </div>

      <div className="flex flex-col gap-4 text-3xl font-light">
        <div className="flex flex-row gap-4 items-center">
          <IconCalendar /> {piece.yearComposed}
        </div>

        <div className="flex flex-row gap-4 items-center">
          <IconUsers /> {piece.numOfPlayers}{" "}
          {piece.numOfPlayers > 1 ? "Players" : "Player"}
        </div>

        <div className="flex flex-row gap-4 items-center">
          <IconBrandSpeedtest />
          {difficulty}
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
