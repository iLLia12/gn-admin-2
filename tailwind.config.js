/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "modal-mask": "rgb(0 0 0 / 66%);",
      },
      width: {
        "100px": "100px",
        "250px": "250px",
      },
    },
  },
  plugins: [],
};
