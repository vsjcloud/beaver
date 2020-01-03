const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    fontFamily: {
      display: [
        "Vollkorn",
        ...defaultTheme.fontFamily.serif,
      ],
      body: [
        "Lato",
        ...defaultTheme.fontFamily.sans,
      ],
    },
  },
  variants: {},
  plugins: [],
};
