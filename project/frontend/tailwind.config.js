/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fffdf8",
        soft: "#fff7ef",
        redSoft: "#ff5f52",
        orangeSoft: "#ff9f43",
        greenSoft: "#2dcf73"
      },
      boxShadow: {
        premium: "0 20px 60px rgba(255, 143, 85, 0.25)",
        glass: "0 10px 30px rgba(255, 120, 80, 0.15)"
      }
    }
  },
  plugins: []
};
