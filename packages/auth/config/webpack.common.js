// The HtmlWebpackPlugin is a Webpack plugin used to simplify the creation of HTML files to serve your bundled JavaScript files.
// It automatically generates an HTML file (or uses a template you provide), injects your script tags for the output bundles,
// and can handle things like favicon, meta tags, and more. This is especially useful in single-page applications,
// as it ensures your HTML always references the correct bundle filenames, even when hashes are used for cache busting.
const HtmlWebpaclplugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        // Process JavaScript files with Babel
        // This rule applies to all .mjs , .js and .jsx files, excluding node_modules
        // It uses babel-loader to transpile the code using specified presets and plugins
        // Babel is used to convert modern JavaScript and React code (ES15, ES16, ES17, ES20 ) into a format compatible with older browsers ES5
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpaclplugin({
      //   filename: "index.html",
      template: "./public/index.html",
      //   inject: true,
      //   scriptLoading: "blocking",
    }),
  ],
};
