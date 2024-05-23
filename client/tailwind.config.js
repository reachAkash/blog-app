import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        md: "3rem",
        lg: "5rem",
        xl: "7.5rem",
      },
    },
    screens: {
      xxs: "300px",
      xs: "475px",
      sm: "639px",
      md: "768px",
      lg: "1024px",
      xl: "1281px",
      "2xl": "1441px",
      "3xl": "1920px",
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
