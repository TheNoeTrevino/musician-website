const AboutSection = () => {
  return (
    <div
      id="about"
      className="min-h-screen flex flex-col lg:flex-row px-4 md:px-12 lg:pl-24 xl:pl-52 pt-32 md:pt-40 lg:pt-48 pb-12 lg:pb-0"
    >
      <div className="flex flex-col w-full lg:w-3/4 gap-4 md:gap-6 z-10">
        <p className="text-4xl md:text-6xl lg:text-7xl text-white">About</p>
        <span className="text-textGray text-base md:text-lg lg:text-xl">
          <p className="mb-4">
            Sebastian Havner is a Swedish-American percussionist, educator, arranger, and composer based out of Denton,
            TX.
          </p>
          <p className="mb-4">
            Sebastian's inspirations stem from his extensive background as a solo and chamber performer. He is an active
            performer in the UNT Percussion Studio, performing in many notable works as a soloist and being involved in
            many world premieres and consortiums. He also frequently participates in competitions and festivals across
            the country, most notably earning third place in the 2025 Great Plains International Marimba Competition duo
            category, performing alongside Ryan Hurford.
          </p>
          <p className="mb-4">
            His creativity and desire to push the boundaries of percussion music is shown throughout his compositions.
            He inspires to take percussion music to a new level, integrating new and unique sounds through the use of
            acoustic sounds and electronic tracks. With all his works, his primary goal is to incite emotion within
            every audience member, providing the listener with a meaningful experience that transcends traditional
            compositions. He aims to extend his writing style to performers of all ages, maintaining the same quality
            and emotions regardless of age and experience. His compositions have been performed by multiple groups at a
            high school and collegiate level.
          </p>
          <p className="mb-4">
            Sebastian has received extensive knowledge and inspiration from his years in Drum Corps. He was a member of
            the Santa Clara Vanguard in the 2022 and 2024 season, winning the Fred Sanford Percussion Caption award in
            the 2024 season. He was also a member of the 2023 Casper Troopers while SCV was on hiatus. Sebastian’s drum
            corps experience has influenced his path as a composer and teacher, serving as the Front Ensemble technician
            for the UNT Green Brigade in 2023 and Byron Nelson Highschool starting in the 2024 season, winning the best
            front ensemble caption awards at both the HEB and Lonestar Drumline Competitions.
          </p>
        </span>
      </div>

      <div className="hidden lg:block w-auto">
        <img
          className="h-screen absolute right-0 object-cover object-center"
          src="/aboutsection_image.png"
          alt="Sebastian playing instrument in a band"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default AboutSection;
