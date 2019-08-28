const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    CustomSearch: [
      // "./src/scripts/CustomSearch/mockAjax.js",
      "babel-regenerator-runtime",
      "./src/scripts/CustomSearch/CustomSearch.js"
    ],
    CustomSearchClientScript: [
      // "./src/scripts/CustomSearch/mockAjax.js",
      "babel-regenerator-runtime",
      "./src/scripts/CustomSearch/ClientScript.js"
    ]
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
  output: {
    filename: "./build/[name].js"
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
  devServer: {
    watchOptions: {
      ignored: "/node_modules/"
    }
  }
};
