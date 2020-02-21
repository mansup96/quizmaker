var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "examples"),
    compress: true,
    port: 9000
  }
};
