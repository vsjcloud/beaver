const purgeCSS = require("@fullhuman/postcss-purgecss")({
  content: [
    "./common/**/*.tsx",
    "./common/**/*.ts",
    "./components/**/*.tsx",
    "./components/**/*.ts",
    "./pages/**/*.tsx",
    "./pages/**/*.ts",
  ],
  whitelist: ["html", "body"],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
    ...process.env.NODE_ENV === "production"
      ? [purgeCSS]
      : [],
  ],
};
