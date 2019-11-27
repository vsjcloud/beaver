module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss"),
        ...process.env.NODE_ENV === "production" ? [
          require("@fullhuman/postcss-purgecss"),
        ] : [

        ],
      ],
    },
  },
};
