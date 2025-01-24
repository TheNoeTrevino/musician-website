import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { PieceDTO } from "../dtos/dtos";
import { PieceService } from "../services/PieceService";
import PieceCard from "./PieceCard";

const StoreSecton = () => {
  const [allPieces, setAllPieces] = useState<PieceDTO[] | undefined>(undefined);
  const [pieces, setPieces] = useState<PieceDTO[] | undefined>(undefined);

  const [currentCateogry, setCurrentCategory] = useState("solo");

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    {
      switch (category) {
        case "all":
          setPieces(allPieces);
          break;
        case "solo":
          setPieces(allPieces?.filter((piece) => piece.numOfPlayers == 1));
          break;
        case "ensemble":
          setPieces(allPieces?.filter((piece) => piece.numOfPlayers > 2));
          break;
        case "duet":
          setPieces(allPieces?.filter((piece) => piece.numOfPlayers == 2));
          break;
      }
    }
  };

  const fetchPieces = async () => {
    const fetchedPieces = await PieceService.getAllPieces();
    setAllPieces(fetchedPieces); // Save the original data
    setPieces(fetchedPieces); // Set the initial display data
  };

  useEffect(() => {
    fetchPieces();
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    if (!searchText) {
      setPieces(allPieces); // Reset to all pieces if the search text is empty
    } else {
      setPieces(
        allPieces?.filter((piece) =>
          piece.title.toLowerCase().includes(searchText),
        ),
      );
    }
  };

  return (
    <div className="h-screen bg-black flex flex-row px-52 py-20 mb-20">
      <div className="w-1/3 text-4xl gap-20 flex flex-col text-white ">
        <p>Categories</p>
        <div className=" text-3xl h-full flex flex-col text-textGray gap-10 border-r border-textGray/40">
          <p
            className={`${
              currentCateogry === "all" && "text-white"
            } cursor-pointer`}
            onClick={() => {
              handleCategoryChange("all");
            }}
          >
            All
          </p>
          <p
            className={`${
              currentCateogry === "solo" && "text-white"
            } cursor-pointer`}
            onClick={() => {
              handleCategoryChange("solo");
            }}
          >
            Solo
          </p>
          <p
            className={`${
              currentCateogry === "percussion-ensemble" && "text-white"
            } cursor-pointer`}
            onClick={() => {
              handleCategoryChange("ensemble");
            }}
          >
            Percussion Ensemble
          </p>
          <p
            className={`${
              currentCateogry === "percussion-ensemble" && "text-white"
            } cursor-pointer`}
            onClick={() => {
              handleCategoryChange("duet");
            }}
          >
            Duet
          </p>
        </div>
      </div>

      <div className="flex flex-col w-2/3 justify-between  z-10  gap-11 ml-20">
        <div className="flex flex-row  gap-10">
          {/* TODO: remove this */}
          <p className="text-7xl text-white">Shop</p>
          <div className="border border-r-10 rounded-xl flex items-center px-4 w-full gap-3  text-textGray">
            <IconSearch />
            <input
              onChange={handleTextChange}
              className="bg-black w-full h-1/2 "
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 bg-reallyBlack/30 p-6 rounded-lg overflow-y-scroll h-full justify-items-start items-start">
          {pieces ? (
            pieces.length > 0 ? (
              pieces.map((piece) => <PieceCard piece={piece} />)
            ) : (
              <div className="text-white text-3xl">No pieces found.</div>
            )
          ) : (
            <div className="text-white text-3xl">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreSecton;
