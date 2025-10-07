import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { PieceDTO } from "../dtos/dtos";
import { PieceService } from "../services/PieceService";
import PieceCard from "./PieceCard";

const StoreSecton = () => {
  const [allPieces, setAllPieces] = useState<PieceDTO[] | undefined>(undefined);
  const [shownPieces, setShownPieces] = useState<PieceDTO[] | undefined>(
    undefined,
  );

  const [currentCateogry, setCurrentCategory] = useState("all");

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);

    switch (category) {
      case "all":
        setShownPieces(allPieces);
        break;
      case "solo":
        setShownPieces(allPieces?.filter((piece) => piece.numOfPlayers == 1));
        break;
      case "ensemble":
        setShownPieces(allPieces?.filter((piece) => piece.numOfPlayers > 2));
        break;
      case "duet":
        setShownPieces(allPieces?.filter((piece) => piece.numOfPlayers == 2));
        break;
    }
  };

  const fetchPieces = async () => {
    const fetchedPieces = await PieceService.getAllPieces();
    setAllPieces(fetchedPieces);
    setShownPieces(fetchedPieces);
  };

  useEffect(() => {
    fetchPieces();
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    if (!searchText) {
      setShownPieces(allPieces);
    } else {
      setShownPieces(
        allPieces?.filter((piece) =>
          piece.title.toLowerCase().includes(searchText),
        ),
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row px-4 md:px-12 lg:px-24 xl:px-52 py-12 md:py-16 lg:py-20 mb-12 md:mb-20">
      {/* Desktop: Sidebar Categories */}
      <div className="hidden lg:flex w-1/3 text-3xl xl:text-4xl gap-12 xl:gap-20 flex-col text-white">
        <p>Categories</p>
        <div className="text-2xl xl:text-3xl h-full flex flex-col text-textGray gap-8 xl:gap-10 border-r border-textGray/40 pr-6">
          <p
            className={`${
              currentCateogry === "all" && "text-white"
            } cursor-pointer hover:text-white transition-colors`}
            onClick={() => {
              handleCategoryChange("all");
            }}
          >
            All
          </p>
          <p
            className={`${
              currentCateogry === "solo" && "text-white"
            } cursor-pointer hover:text-white transition-colors`}
            onClick={() => {
              handleCategoryChange("solo");
            }}
          >
            Solo
          </p>
          <p
            className={`${
              currentCateogry === "ensemble" && "text-white"
            } cursor-pointer hover:text-white transition-colors`}
            onClick={() => {
              handleCategoryChange("ensemble");
            }}
          >
            Percussion Ensemble
          </p>
          <p
            className={`${
              currentCateogry === "duet" && "text-white"
            } cursor-pointer hover:text-white transition-colors`}
            onClick={() => {
              handleCategoryChange("duet");
            }}
          >
            Duet
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-2/3 justify-between z-10 gap-6 md:gap-8 lg:gap-11 lg:ml-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10">
          <p className="text-4xl md:text-6xl lg:text-7xl text-white whitespace-nowrap">Shop</p>
          <div className="border border-r-10 rounded-xl flex items-center px-3 md:px-4 py-2 md:py-0 w-full gap-3 text-textGray">
            <IconSearch size={20} className="flex-shrink-0" />
            <input
              onChange={handleTextChange}
              className="bg-black w-full outline-none text-base md:text-lg"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Mobile: Horizontal Scrollable Categories */}
        <div className="lg:hidden flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <button
            className={`${
              currentCateogry === "all"
                ? "bg-primary text-white"
                : "bg-reallyBlack text-textGray"
            } px-4 py-2 rounded-lg whitespace-nowrap text-sm md:text-base font-medium transition-colors flex-shrink-0 active:scale-95`}
            onClick={() => handleCategoryChange("all")}
          >
            All
          </button>
          <button
            className={`${
              currentCateogry === "solo"
                ? "bg-primary text-white"
                : "bg-reallyBlack text-textGray"
            } px-4 py-2 rounded-lg whitespace-nowrap text-sm md:text-base font-medium transition-colors flex-shrink-0 active:scale-95`}
            onClick={() => handleCategoryChange("solo")}
          >
            Solo
          </button>
          <button
            className={`${
              currentCateogry === "ensemble"
                ? "bg-primary text-white"
                : "bg-reallyBlack text-textGray"
            } px-4 py-2 rounded-lg whitespace-nowrap text-sm md:text-base font-medium transition-colors flex-shrink-0 active:scale-95`}
            onClick={() => handleCategoryChange("ensemble")}
          >
            Percussion Ensemble
          </button>
          <button
            className={`${
              currentCateogry === "duet"
                ? "bg-primary text-white"
                : "bg-reallyBlack text-textGray"
            } px-4 py-2 rounded-lg whitespace-nowrap text-sm md:text-base font-medium transition-colors flex-shrink-0 active:scale-95`}
            onClick={() => handleCategoryChange("duet")}
          >
            Duet
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 bg-reallyBlack/30 p-4 md:p-6 rounded-lg overflow-y-auto h-full justify-items-start items-start">
          {shownPieces ? (
            shownPieces.length > 0 ? (
              shownPieces.map((piece) => <PieceCard key={piece.pieceId} piece={piece} />)
            ) : (
              <div className="text-white text-xl md:text-2xl lg:text-3xl">No pieces found.</div>
            )
          ) : (
            <div className="text-white text-xl md:text-2xl lg:text-3xl">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreSecton;
