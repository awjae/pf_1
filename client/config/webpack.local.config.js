const path = require("path");
const { merge } = require('webpack-merge');
const baseConfig = require("./webpack.base.config");
const DotEnv = require("dotenv-webpack");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PORT = 89;

module.exports = merge(baseConfig, {
  plugins: [
    new DotEnv({
      path: path.resolve(__dirname, "./local.env")
    }),
    // new MiniCssExtractPlugin({
    //   filename: "bundle.css"
    // })
  ],
  mode: "development",
  devtool: "cheap-module-source-map",
  output: {
    filename: "bundle.js",
    publicPath: "http://localhost:" + PORT + "/"
  },
  devServer: {
    port: PORT,
    host: "0.0.0.0",
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    proxy: {
      "/api/*": {
        target: "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode",
        secure: false,
        changeOrigin: true
      } // 프록시
    },
  },
  optimization: {
    namedModules: true,
    noEmitOnErrors: true
  }
});
