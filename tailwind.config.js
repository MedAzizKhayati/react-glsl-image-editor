/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxHeight: {
        120: "30rem",
      },
      colors: {
        buttonBlue: "#0375ff",
      },
    },
  },
  plugins: [],
};
