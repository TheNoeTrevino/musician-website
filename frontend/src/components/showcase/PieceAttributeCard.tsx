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

const PieceAttributeCard = ({ piece: piece, duration: duration }: { piece: PieceDTO; duration: string }) => {
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

  useEffect(() => setDifficulty(handleDifficulty(piece.difficultyGrade)), [piece.difficultyGrade]);

  return (
    <div className="flex flex-col w-full md:h-screen z-10 text-textGray justify-between py-3 md:py-6 gap-6 md:gap-0">
      <div className="flex flex-col gap-2 md:gap-3">
        <p className="text-4xl sm:text-5xl pt-6 md:pt-0 md:text-6xl lg:text-7xl text-white">{piece.title}</p>
        <span className="text-textGray text-sm sm:text-base md:text-lg font-light w-full md:w-4/5 mt-2 md:mt-3">
          {piece.description}
        </span>
      </div>

      <div className="flex flex-col gap-3 md:gap-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light">
        <div className="flex flex-row gap-3 md:gap-4 items-center">
          <IconCalendar className="w-6 h-6 md:w-7 md:h-7" /> {piece.yearComposed}
        </div>

        <div className="flex flex-row gap-3 md:gap-4 items-center">
          <IconUsers className="w-6 h-6 md:w-7 md:h-7" /> {piece.numOfPlayers}{" "}
          {piece.numOfPlayers > 1 ? "Players" : "Player"}
        </div>

        <div className="flex flex-row gap-3 md:gap-4 items-center">
          <IconBrandSpeedtest className="w-6 h-6 md:w-7 md:h-7" />
          {difficulty}
        </div>

        <div className="flex flex-row gap-3 md:gap-4 items-center">
          <IconClock className="w-6 h-6 md:w-7 md:h-7" /> {duration} Minutes
        </div>

        <div className="flex flex-row gap-3 md:gap-4 items-center">
          {piece.hasElectronics ? (
            <IconCircleCheckFilled className="text-primary w-6 h-6 md:w-7 md:h-7" />
          ) : (
            <IconCircleXFilled className="text-primary w-6 h-6 md:w-7 md:h-7" />
          )}
          Electronics
        </div>
      </div>
    </div>
  );
};

export default PieceAttributeCard;
