const AboutSection = () => {
  return (
    <div id="about" className="min-h-screen  flex flex-row pl-52 mt-20">
      <div className="flex flex-col w-3/4  gap-6  z-10">
        <p className="text-7xl text-white">About</p>
        <span className="text-textGray text-xl-auto">
          <p className="mb-4">
            Sebastian Havner is an American percussionist, educator, arranger,
            and composer based out of Denton, TX.
          </p>
          <p>
            Sebastian’s creativity and desire to push the boundaries of
            percussion music are shown throughout his compositions. He aspires
            to take percussion music to a new level, integrating new, unique
            sounds through the use of acoustic sounds and electronic tracks.
            With all his works, Sebastian’s primary goal is to incite emotion
            within every audience member, providing the listener with a
            meaningful experience that transcends traditional compositions.
            Sebastian aims to extend his writing style to performers of all
            ages, maintaining the same quality and emotions regardless of age
            and experience. His compositions have been performed in groups at a
            high school and collegiate level.
          </p>
          <p className="mb-4">
            Sebastian's inspirations stem from his extensive background as a
            solo and chamber performer. He is an active performer in the UNT
            Percussion Studio, performing in notable works including White Pines
            by Michael Burritt as a soloist, and multiple world premieres.
          </p>
          <p className="mb-4">
            Sebastian has received extensive knowledge and inspiration from his
            years in Drum Corps. Sebastian is currently a member of the Santa
            Clara Vanguard for the 2024 season, continuing on his time with the
            group from the 2022 season. During the 2023 season, he was part of a
            monumental season with the Casper Troopers, receiving the highest
            percussion score in corps history. Sebastian’s drum corps experience
            has influenced his path as a composer and teacher, serving as the
            Front Ensemble technician for the UNT Green Brigade in 2023.
            Sebastian
          </p>
          <p className="mb-4">
            Havner is currently pursuing a Bachelor’s degree in Music Education
            from the University of North Texas.
          </p>
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
