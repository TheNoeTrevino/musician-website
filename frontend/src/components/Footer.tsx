import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandSoundcloud,
  IconBrandYoutube,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <div className="flex flex-row bg-reallyBlack px-52">
      <div className="flex  flex-col grow shrink py-20 text-white ">
        <div className="  text-5xl max-md:text-4xl">
          <img src="/logo.png" alt="logo" className="w-64" />
        </div>
        <div className="mt-2 text-xs">© Copyright 2025</div>
      </div>
      <div className="flex flex-row gap-10 justify-center items-center text-white ">
        <a
          href="https://www.instagram.com/sebastianhavnermusic/"
          target="_blank"
        >
          <IconBrandInstagram
            strokeWidth={1}
            className="cursor-pointer hover:scale-105 transition-transform"
          />
        </a>
        <a href="https://www.youtube.com/@sebastianhavner" target="_blank">
          <IconBrandYoutube
            strokeWidth={1}
            className="cursor-pointer hover:scale-105 transition-transform"
          />
        </a>
        <a href="https://soundcloud.com/sebastian-havner" target="_blank">
          <IconBrandSoundcloud
            strokeWidth={1}
            className="cursor-pointer hover:scale-105 transition-transform"
          />
        </a>
        <a href="https://www.facebook.com/sebastian.havner.5" target="_blank">
          <IconBrandFacebook
            strokeWidth={1}
            className="cursor-pointer hover:scale-105 transition-transform"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
