const withPlugins = require("next-compose-plugins");
const sass = require("@zeit/next-sass");
const optimizedImages = require("next-optimized-images");
const dotEnvLoad = require("dotenv-load");

const optimizeCSSAssets = require("./plugins/optimize-css-assets");

dotEnvLoad();

module.exports = withPlugins([
  optimizedImages,
  sass,
  optimizeCSSAssets,
], {
  env: {
    PHOTO_AWS_REGION: process.env.PHOTO_AWS_REGION,
    PHOTO_S3_BUCKET: process.env.PHOTO_S3_BUCKET,
    API_URL: process.env.API_URL,
    API_GRPC_PATH: process.env.API_GRPC_PATH,
  },
});
