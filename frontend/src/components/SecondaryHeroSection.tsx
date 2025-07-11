interface SecondaryHeroSectionProps {
  backdrop: boolean;
  image: string | null;
}

const SecondaryHeroSection = ({
  backdrop,
  image,
}: SecondaryHeroSectionProps) => {
  return (
    <div className="h-screen bg-black flex flex-row relative">
      {backdrop && image ? (
        <div className="w-full h-full relative ">
          <img
            loading="lazy"
            className="absolute inset-0 object-cover w-full h-full "
            src={image}
            alt="Music Album Background Image"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center gap-7 w-full h-full justify-center">
          <p className="text-8xl text-white">Our Shop </p>
        </div>
      )}
    </div>
  );
};

export default SecondaryHeroSection;
