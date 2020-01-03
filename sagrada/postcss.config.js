const purgeCSS = require("@fullhuman/postcss-purgecss")({
  content: [
    "./common/**/*.tsx",
    "./components/**/*.tsx",
    "./pages/**/*.tsx",
    "bulma/**/*.css",
  ],
  extractors: [
    {
      extractor: class {
        static extract(content) {
          return content.match(/[\w-/:]+(?<!:)/g) || []
        }
      },
      extensions: ["tsx"],
    },
  ],
  whitelistPatternsChildren: [/.bulma$/],
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
