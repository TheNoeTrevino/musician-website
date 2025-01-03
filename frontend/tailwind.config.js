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
        primary: "#F5862F",
        textGray: "#808080",
      },
    },
  },
  plugins: [],
};
