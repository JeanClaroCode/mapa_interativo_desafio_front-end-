const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",

  entry: {
    index: "./src/index.js",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    liveReload: true,
  },

  plugins: [
    /*
    new require("webpack-ai-plugin")({
      languageModel: "codegen",
    }),
    */
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 2020,
        compress: true,
        mangle: true,
      },
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],

  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
      vm: require.resolve("vm-browserify"),
      buffer: require.resolve("buffer/"),
      stream: require.resolve("stream-browserify"),
      process: require.resolve("process/browser"),
    },
  },
};
