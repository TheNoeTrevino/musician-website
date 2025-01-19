import {
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandSoundcloud,
  IconBrandFacebook,
} from "@tabler/icons-react";

const Socials = () => {
  return (
    <>
      <a href="https://www.instagram.com/sebastianhavnermusic/" target="_blank">
        <IconBrandInstagram
          strokeWidth={1}
          className="cursor-pointer hover:scale-125 transition-transform"
        />
      </a>
      <a href="https://www.youtube.com/@sebastianhavner" target="_blank">
        <IconBrandYoutube
          strokeWidth={1}
          className="cursor-pointer hover:scale-125 transition-transform"
        />
      </a>
      <a href="https://soundcloud.com/sebastian-havner" target="_blank">
        <IconBrandSoundcloud
          strokeWidth={1}
          className="cursor-pointer hover:scale-125 transition-transform"
        />
      </a>
      <a href="https://www.facebook.com/sebastian.havner.5" target="_blank">
        <IconBrandFacebook
          strokeWidth={1}
          className="cursor-pointer hover:scale-125 transition-transform"
        />
      </a>
    </>
  );
};

export default Socials;
