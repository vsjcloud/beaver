const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    colors: {
      "transparent": "transparent",
      "black": "var(--color-black)",
      "white": "var(--color-white)",
      "dark-gray": {
        1: "var(--color-dark-gray-1)",
        2: "var(--color-dark-gray-2)",
        3: "var(--color-dark-gray-3)",
        4: "var(--color-dark-gray-4)",
        5: "var(--color-dark-gray-5)",
      },
      "gray": {
        1: "var(--color-gray-1)",
        2: "var(--color-gray-2)",
        3: "var(--color-gray-3)",
        4: "var(--color-gray-4)",
        5: "var(--color-gray-5)",
      },
      "light-gray": {
        1: "var(--color-light-gray-1)",
        2: "var(--color-light-gray-2)",
        3: "var(--color-light-gray-3)",
        4: "var(--color-light-gray-4)",
        5: "var(--color-light-gray-5)",
      },
      "blue": {
        1: "var(--color-blue-1)",
        2: "var(--color-blue-2)",
        3: "var(--color-blue-3)",
        4: "var(--color-blue-4)",
        5: "var(--color-blue-5)",
      },
      "green": {
        1: "var(--color-green-1)",
        2: "var(--color-green-2)",
        3: "var(--color-green-3)",
        4: "var(--color-green-4)",
        5: "var(--color-green-5)",
      },
      "orange": {
        1: "var(--color-orange-1)",
        2: "var(--color-orange-2)",
        3: "var(--color-orange-3)",
        4: "var(--color-orange-4)",
        5: "var(--color-orange-5)",
      },
      "red": {
        1: "var(--color-red-1)",
        2: "var(--color-red-2)",
        3: "var(--color-red-3)",
        4: "var(--color-red-4)",
        5: "var(--color-red-5)",
      },
    },
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
