interface SecondaryHeroSectionProps {
  backdrop: boolean;
  image: string;
}

const SecondaryHeroSection: React.FC<SecondaryHeroSectionProps> = ({
  backdrop,
  image,
}) => {
  return (
    <div className="h-screen bg-black flex flex-row relative">
      {backdrop ? (
        <div className="w-full h-full relative ">
          <img
            className="absolute inset-0 object-cover w-full h-full "
            src={image}
            alt="Music Album Background Image"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center gap-7 w-full h-full justify-center">
          <p className="text-8xl text-white">Our Shop </p>
          <span className="text-textGray text-4xl">
            Lorem ipsum odor amet, <p>consectetuer adipiscing elit.</p>
          </span>
        </div>
      )}
    </div>
  );
};

export default SecondaryHeroSection;
