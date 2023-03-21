const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "500px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        "25/100": "25%",
        "50/100": "50%",
        "75/100": "75%",
        "80/100": "80%",
      },
      minWidth: {
        "25/100": "25%",
        "50/100": "50%",
        "75/100": "75%",
        "80/100": "80%",
      },
      zIndex: {
        dialog: "40",
      },
    },
  },
  variants: {
    space: ["responsive", "direction"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
