/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        primary: "#F2F3ED",
        "hijau-muda": "#DEE8CF",
        hijau: "#D5ED9F",
        "hijau-tua": "#DEE8CF",
        hitam: "#2B2B2B",
        hitam2: " #333333",

        hover: "#171717",
        "hijau-opa": "#B0B7A5",
        button: "#2B2B2B",
        nav: "#",
        "ghost-white": "#f6f5fa",
        footer: "#EAEAEA",
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [daisyui],
};
