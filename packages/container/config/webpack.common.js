// The HtmlWebpackPlugin is a Webpack plugin used to simplify the creation of HTML files to serve your bundled JavaScript files.
// It automatically generates an HTML file (or uses a template you provide), injects your script tags for the output bundles,
// and can handle things like favicon, meta tags, and more. This is especially useful in single-page applications,
// as it ensures your HTML always references the correct bundle filenames, even when hashes are used for cache busting.
const HtmlWebpackplugin = require("html-webpack-plugin");
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
    // The ModuleFederationPlugin is a Webpack plugin that enables the sharing of modules between
    // different Webpack builds, allowing for micro-frontend architectures.
    // It allows you to dynamically load code from other applications at runtime,
    // enabling the creation of modular applications that can be developed and deployed independently.
    new HtmlWebpackplugin({
      //   filename: "index.html",
      template: "./public/index.html",
      //   inject: true,
      //   scriptLoading: "blocking",
    }),
  ],
};
