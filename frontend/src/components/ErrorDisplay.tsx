import { Link } from "react-router-dom";

const ErrorDisplay = () => {
  return (
    <div className="h-screen bg-black flex flex-row relative">
      <div className="flex flex-col items-center text-center gap-7 w-full h-full justify-center">
        <p className="text-8xl text-white">Oops! </p>
        <span className="text-textGray text-4xl">
          The page you are looking for does not exist.{" "}
          <p>
            Please go back the{" "}
            <Link to={"./"} className="text-sky-700 underline">
              home page
            </Link>{" "}
            and try again.
          </p>
        </span>
      </div>
    </div>
  );
};

export default ErrorDisplay;
