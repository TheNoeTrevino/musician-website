/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0F0F0F",
        white: "#F9F9F9",
        reallyWhite: "#FFFFFF",
        reallyBlack: "#000000",
        primary: "#7266F5",
        textGray: "#808080",
      },
    },
  },
  safelist: ["md:mx-12", "lg:mx-24", "xl:mx-48", "mt-12", "md:mt-24", "pb-16"],
  plugins: [],
};
