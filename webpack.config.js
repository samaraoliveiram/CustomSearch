const path = require("path");
const webpack = require("webpack");
const webpackServicenowUploader = require("webpackServicenowUploader");
const snConfig = require(path.resolve(process.cwd(), `.snow.config.json`));

const cwd = process.cwd();
module.exports = ({ name, filePath }) => ({
  entry: {
    [name]: ["babel-regenerator-runtime", path.resolve(cwd, filePath)]
  },
  output: {
    filename: "./build/[name].js"
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "lib"),
      path.resolve(__dirname, "client"),
      "node_modules"
    ],
    alias: {
      Components: path.resolve(__dirname, "client/Components/"),
      lib: path.resolve(__dirname, "lib")
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpackServicenowUploader({
      name,
      ...snConfig,
      ...snConfig.scripts[name]
    })
  ]
});
