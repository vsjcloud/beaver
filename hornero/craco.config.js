// eslint-disable-next-line @typescript-eslint/no-var-requires
const purgeCSS = require("@fullhuman/postcss-purgecss")({
  content: [
    "./src/**/*.tsx",
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss"),
        ...process.env.NODE_ENV === "production" ? [purgeCSS] : [],
      ],
    },
  },
};
