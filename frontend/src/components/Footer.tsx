import Socials from "./Socials";

const Footer = () => {
  return (
    <div className="flex flex-row bg-reallyBlack px-52">
      <div className="flex flex-col grow shrink py-20 text-white ">
        <div className="text-5xl max-md:text-4xl">
          <img src="/logo.png" alt="logo" className="w-64" />
        </div>
        <div className="mt-2 text-xs">© Copyright 2025</div>
      </div>
      <div className="flex flex-row gap-10 justify-center items-center text-white ">
        <Socials />
      </div>
    </div>
  );
};

export default Footer;
