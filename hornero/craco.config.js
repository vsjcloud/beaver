// eslint-disable-next-line @typescript-eslint/no-var-requires
const purgeCSS = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: [
    "./src/**/*.tsx"
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

// eslint-disable-next-line no-undef
module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss"),
        // eslint-disable-next-line no-undef
        ...process.env.NODE_ENV === "production" ? [purgeCSS] : []
      ]
    }
  }
};
