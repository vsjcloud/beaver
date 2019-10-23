module.exports = {
  theme: {
    fontFamily: {
      body: ["Lato", "sans-serif"],
    },
    colors: {
      primary: {
        1: "var(--primary-1)",
        2: "var(--primary-2)",
        3: "var(--primary-3)",
        4: "var(--primary-4)",
        5: "var(--primary-5)",
      },
      success: {
        1: "var(--success-1)",
        2: "var(--success-2)",
        3: "var(--success-3)",
        4: "var(--success-4)",
        5: "var(--success-5)",
      },
      warning: {
        1: "var(--warning-1)",
        2: "var(--warning-2)",
        3: "var(--warning-3)",
        4: "var(--warning-4)",
        5: "var(--warning-5)",
      },
      danger: {
        1: "var(--danger-1)",
        2: "var(--danger-2)",
        3: "var(--danger-3)",
        4: "var(--danger-4)",
        5: "var(--danger-5)",
      },
      black: "var(--black)",
      "dark-gray": {
        1: "var(--dark-gray-1)",
        2: "var(--dark-gray-2)",
        3: "var(--dark-gray-3)",
        4: "var(--dark-gray-4)",
        5: "var(--dark-gray-5)",
      },
      gray: {
        1: "var(--gray-1)",
        2: "var(--gray-2)",
        3: "var(--gray-3)",
        4: "var(--gray-4)",
        5: "var(--gray-5)",
      },
      "light-gray": {
        1: "var(--light-gray-1)",
        2: "var(--light-gray-2)",
        3: "var(--light-gray-3)",
        4: "var(--light-gray-4)",
        5: "var(--light-gray-5)",
      },
      white: "var(--white)",
      blue: {
        1: "var(--blue-1)",
        2: "var(--blue-2)",
        3: "var(--blue-3)",
        4: "var(--blue-4)",
        5: "var(--blue-5)",
      },
      green: {
        1: "var(--green-1)",
        2: "var(--green-2)",
        3: "var(--green-3)",
        4: "var(--green-4)",
        5: "var(--green-5)",
      },
      orange: {
        1: "var(--orange-1)",
        2: "var(--orange-2)",
        3: "var(--orange-3)",
        4: "var(--orange-4)",
        5: "var(--orange-5)",
      },
      red: {
        1: "var(--red-1)",
        2: "var(--red-2)",
        3: "var(--red-3)",
        4: "var(--red-4)",
        5: "var(--red-5)",
      },
    },
    boxShadow: {
      "elevation-0": "var(--shadow-elevation-0)",
      "elevation-1": "var(--shadow-elevation-1)",
      "elevation-2": "var(--shadow-elevation-2)",
      "elevation-3": "var(--shadow-elevation-3)",
      "elevation-4": "var(--shadow-elevation-4)",
      "dark-elevation-0": "var(--shadow-dark-elevation-0)",
      "dark-elevation-1": "var(--shadow-dark-elevation-1)",
      "dark-elevation-2": "var(--shadow-dark-elevation-2)",
      "dark-elevation-3": "var(--shadow-dark-elevation-3)",
      "dark-elevation-4": "var(--shadow-dark-elevation-4)",
      "button-box": "var(--shadow-button-box)",
      "button-box-active": "var(--shadow-button-box-active)",
      "button-intent-box": "var(--shadow-button-intent-box)",
      "button-intent-box-active": "var(--shadow-button-intent-box-active)",
    },
    gradients: {
      button: "var(--gradient-button)",
      "button-intent": "var(--gradient-button-intent)",
    },
  },
  variants: {},
  plugins: [
    // Background image plugins
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function ({addUtilities, e, theme, variants}) {
      const gradients = theme("gradients", {});
      const gradientVariants = variants("gradients", []);
      const utilities = Object.keys(gradients).map((key) => ({
        [`.bg-gradient-${e(key)}`]: {
          backgroundImage: gradients[key],
        },
      }));
      addUtilities(utilities, gradientVariants);
    },
  ],
};
