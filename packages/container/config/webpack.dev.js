const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// Load the package.json file to access the dependencies and use them within the shared configuration
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
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
