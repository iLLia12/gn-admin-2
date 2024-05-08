/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "100px": "100px",
        "250px": "250px",
      },
    },
  },
  plugins: [],
};
