import Socials from "./Socials";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row bg-reallyBlack px-4 md:px-12 lg:px-24 xl:px-52 gap-6 md:gap-0">
      <div className="flex flex-col grow shrink py-12 md:py-20 text-white">
        <div className="text-5xl max-md:text-4xl">
          <img src="/logo.png" alt="logo" className="w-48 md:w-56 lg:w-64" loading="lazy" />
        </div>
        <div className="mt-2 text-xs">© Copyright 2025</div>
      </div>
      <div className="flex flex-row gap-6 md:gap-10 justify-start md:justify-center items-center text-white pb-8 md:pb-0">
        <Socials />
      </div>
    </div>
  );
};

export default Footer;
