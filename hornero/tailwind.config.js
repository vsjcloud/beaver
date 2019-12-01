const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    colors: {
      "transparent": "transparent",
      "black": "#10161a",
      "white": "#ffffff",
      "dark-gray": {
        1: "#182026",
        2: "#202b33",
        3: "#293742",
        4: "#30404d",
        5: "#394b59",
      },
      "gray": {
        1: "#5c7080",
        2: "#738694",
        3: "#8a9ba8",
        4: "#a7b6c2",
        5: "#bfccd6",
      },
      "light-gray": {
        1: "#ced9e0",
        2: "#d8e1e8",
        3: "#e1e8ed",
        4: "#ebf1f5",
        5: "#f5f8fa",
      },
      "blue": {
        1: "#0e5a8a",
        2: "#106ba3",
        3: "#137cbd",
        4: "#2b95d6",
        5: "#48aff0",
      },
      "green": {
        1: "#0a6640",
        2: "#0d8050",
        3: "#0f9960",
        4: "#15b371",
        5: "#3dcc91",
      },
      "orange": {
        1: "#a66321",
        2: "#bf7326",
        3: "#d9822b",
        4: "#f29d49",
        5: "#ffb366",
      },
      "red": {
        1: "#a82a2a",
        2: "#c23030",
        3: "#db3737",
        4: "#f55656",
        5: "#ff7373",
      },
    },
    fontFamily: {
      sans: [
        "Lato",
        ...defaultTheme.fontFamily.sans,
      ],
    },
  },
  variants: {},
  plugins: [],
};
