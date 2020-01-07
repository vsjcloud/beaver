const {PHASE_PRODUCTION_BUILD} = require("next/constants");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    phases: [PHASE_PRODUCTION_BUILD],
    webpack(config, options) {
      const {dev} = options;

      if (!dev) {
        if (!Array.isArray(config.optimization.minimizer)) {
          config.optimization.minimizer = []
        }

        config.optimization.minimizer.push(
          new OptimizeCssAssetsWebpackPlugin({
            cssProcessorOptions: {
              discardComments: {removeAll: true},
            },
          }),
        )
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  })
};
