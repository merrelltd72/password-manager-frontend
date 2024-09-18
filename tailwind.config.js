/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        landingpage: "url('/assets/images/react.svg')",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
