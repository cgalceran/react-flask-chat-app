module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  theme: {
    extend: {
      gridTemplateColumns : {
        '45/60': '45% 60%',
      }
    },
  },
  darkMode: "class",
  plugins: [
    require("daisyui"), 
    require("tailwind-scrollbar-hide"),
  ],
};
