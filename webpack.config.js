const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "dist/[name].css",
      chunkFilename: "dist/[id].css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html"
    })
  ],
  devServer: {
    contentBase: __dirname,
    compress: true
  },
  output: {
    path: __dirname,
    filename: "dist/[name].[hash].js"
  },
  resolve: {
    alias: {
      "pkg-dir": path.resolve(__dirname, "./src/shims/pkg-dir.js"),
      "cosmiconfig": path.resolve(__dirname, "./src/shims/cosmiconfig.js"),
      fs: "browserify-fs",
      module: "browser-module"
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(eot|woff2?|ttf)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },
      { test: /\.hbs$/, loader: "handlebars-loader" }
    ]
  }
};
