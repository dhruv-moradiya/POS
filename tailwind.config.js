/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "amber-sea": "#FC8019",
        "green-pantone": "#09AA20",
        linen: "#FFF2E8",
        "raisin-black": "#171826",
        "spanish-gray": "#9F9F9E",
        "culture-white": "#F5F5F5",
      },
    },
  },
  plugins: [],
};

// 'spanish-gray': 'rgba(159, 159, 158, 1)',
// 'culture-white': 'rgba(245, 245, 245, 1)',
