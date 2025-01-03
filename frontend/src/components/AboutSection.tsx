const AboutSection = () => {
  return (
    <div id="about" className="h-screen bg-black flex flex-row pl-52 ">
      <div className="flex flex-col w-full  gap-10  z-10 pt-14 ">
        <p className="text-7xl text-white">About</p>
        <span className="text-textGray text-xl">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Mollis interdum
          nulla pharetra nulla mi commodo curae urna. Vehicula libero vitae
          fames ullamcorper class lacus sed mi dictumst. Facilisis egestas
          luctus tortor erat ultricies etiam viverra tellus purus? Magnis
          aliquet curabitur dignissim est himenaeos mi. Velit ridiculus ornare
          magna libero varius facilisi. Sit placerat scelerisque habitasse velit
          purus pulvinar mus imperdiet hac. Vehicula etiam leo iaculis mus
          egestas consectetur. Lacinia tincidunt laoreet lacinia pharetra;
          platea velit. Ad litora faucibus neque proin sollicitudin facilisi.
          Pharetra dictum sollicitudin tristique nam sociosqu dui eu quisque
          donec. Platea pulvinar viverra massa, commodo bibendum facilisi odio.
          Amet placerat lectus torquent, arcu morbi maximus est tristique.
          Malesuada arcu gravida enim magnis mattis libero curabitur ad
          malesuada. Suscipit id neque conubia risus finibus magnis. Enim
          tincidunt interdum hendrerit at imperdiet risus per ultrices? Finibus
          vel nibh dictum, sit sem felis sociosqu nulla. Odio ridiculus lacus,
          metus nam cubilia lobortis orci? Id nisl commodo eget aptent facilisis
          quis. Hendrerit elementum in convallis conubia per blandit.
        </span>
      </div>

      <div className="w-full">
        <img
          className="h-screen absolute right-0"
          src="/aboutsection_image.png"
          alt="Sebastian playing instrument in a band"
        />
      </div>
    </div>
  );
};

export default AboutSection;
