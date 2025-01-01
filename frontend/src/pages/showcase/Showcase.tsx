import { PieceDTO } from "../../dtos/dtos";

interface ShowcaseProps {
  piece: PieceDTO;
}

// TODO: dynamically get the image
// and figure out a better way to store time in the db
const Showcase = ({ piece }: ShowcaseProps) => {
  return (
    <div>
      <div>{piece.composer}</div>
      <div>{piece.title}</div>
      <div>{piece.yearComposed}</div>
      <div>{piece.timeLength}</div>
      <div>{piece.difficultyGrade}</div>
    </div>
  );
};

export default Showcase;
