const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// Load the package.json file to access the dependencies and use them within the shared configuration
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  // Output configuration for development mode
  // This is needed as we start to see issues when running application with nested paths " /auth/siginup " etc
  output: {
    publicPath: "http://localhost:8081/",
  },
  devServer: {
    port: 8081,
    // htmlk file to navaigate to when the URL does not match any static files
    // historyApiFallback: {
    //   index: "/index.html",
    // },
    historyApiFallback: true, // This will serve index.html for all 404s, useful for single-page applications
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
  ],
};

module.exports = merge(common, devConfig);
