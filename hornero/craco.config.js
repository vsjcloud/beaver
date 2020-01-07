module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss"),
      ],
    },
  },
  babel: {
    plugins: [
      "@babel/plugin-proposal-optional-chaining",
    ],
  },
};
