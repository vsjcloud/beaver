module.exports = {
  content: [
    "./src/**/*.tsx",
    "./public/index.html",
  ],
  extractors: [
    {
      extractor: class {
        static extract(content) {
          return content.match(/[\w-/:]+(?<!:)/g) || []
        }
      },
      extensions: ["html", "tsx"],
    },
  ],
  whitelistPatterns: [/^bp3-/],
};
