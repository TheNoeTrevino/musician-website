import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { songDummyData } from "../constants/songDummyData";
import SongCard from "./SongCard";

const StoreSecton = () => {
  const [items, setItems] = useState(songDummyData);

  const [currentCateogry, setCurrentCategory] = useState("Solo");

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
  };
  return (
    <div className="h-screen bg-black flex flex-row px-52 py-20 mb-20">
      <div className="w-1/3 text-4xl gap-20 flex flex-col text-white ">
        <p>Categories</p>
        <div className=" text-3xl h-full flex flex-col text-textGray gap-10 border-r border-textGray/40">
          <p
            className={`${
              currentCateogry === "All" && "text-white"
            } cursor-pointer`}
            onClick={() => {
              handleCategoryChange("All");
            }}
          >
            All
          </p>
          <p
            className={`${
              currentCateogry === "Solo" && "text-white"
            } cursor-pointer`}
            onClick={() => {
              handleCategoryChange("Solo");
            }}
          >
            Solo
          </p>
          <p
            className={`${
              currentCateogry === "Percussion Ensemble" && "text-white"
            } cursor-pointer`}
            onClick={() => {
              handleCategoryChange("Percussion Ensemble");
            }}
          >
            Percussion Ensemble
          </p>
        </div>
      </div>

      <div className="flex flex-col w-2/3 justify-between  z-10  gap-11 ml-20">
        <div className="flex flex-row  gap-10">
          <p className="text-7xl text-white">Pieces</p>
          <div className="buttonOutline w-full gap-3 cursor-text text-textGray">
            <IconSearch />
            Search
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 bg-reallyBlack/30 p-6 rounded-lg overflow-y-scroll h-full justify-items-start items-start">
          {items.map((item) => (
            <SongCard song={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreSecton;