import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <body className="flex flex-col ">
      <div className="h-screen bg-black flex flex-row relative">
        <div className="flex flex-col items-center text-center gap-7 w-full h-full justify-center">
          <p className="text-8xl text-white">
            Your transaction has been canceled.
          </p>
          <span className="text-textGray text-4xl">
            <p>
              Feel free to continue browsing our{" "}
              <Link to={"/"} className="text-sky-700 underline">
                website.
              </Link>{" "}
            </p>
          </span>
        </div>
      </div>
    </body>
  );
};

export default Cancel;
