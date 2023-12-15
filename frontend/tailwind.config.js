/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-400": "#F6F6F6",
        "gray-500": "#B6BAC1",
        "dark-700": "#22262F",
        "blue-500": "#347BF6",
        "red-500": "#CA454B",
      },
    },
  },
  plugins: [],
};
