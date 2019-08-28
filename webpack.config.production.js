process.traceDeprecation = true;

const path = require("path");
const webpack = require("webpack");
const ServiceNowUploader = require("servicenow-uploader-webpack-plugin");
const snConfig = require(path.resolve(process.cwd(), `.snow.config.json`));
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const cwd = process.cwd();
module.exports = ({ name, filePath }) => ({
  mode: "production",
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
    new webpack.LoaderOptionsPlugin({
      debug: false,
      color: true,
      minimize: true,
      progress: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new ServiceNowUploader({
      name,
      ...snConfig,
      ...snConfig.scripts[name]
    })
    // new BundleAnalyzerPlugin(),
  ]
});
