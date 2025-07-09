const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
// The HtmlWebpackPlugin is a Webpack plugin used to simplify the creation of HTML files to serve your bundled JavaScript files.
// It automatically generates an HTML file (or uses a template you provide), injects your script tags for the output bundles,
// and can handle things like favicon, meta tags, and more. This is especially useful in single-page applications,
// as it ensures your HTML always references the correct bundle filenames, even when hashes are used for cache busting.
const HtmlWebpaclplugin = require("html-webpack-plugin");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// Load the package.json file to access the dependencies and use them within the shared configuration
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      // The name here
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        // The key here would be used to import this module in other applications.
        "./MarketingApp": "./src/bootstrap",
      },

      // This configuration allows the container application to share dependencies with the marketing application.
      // Thus reducing the bundle size and ensuring that both applications use the same version of these libraries.
      // shared: ["react", "react-dom"],
      // Simpler approach rather than specifying each dependency manually
      shared: packageJson.dependencies,
    }),
    new HtmlWebpaclplugin({
      //   filename: "index.html",
      template: "./public/index.html",
      //   inject: true,
      //   scriptLoading: "blocking",
    }),
  ],
};

module.exports = merge(common, devConfig);
