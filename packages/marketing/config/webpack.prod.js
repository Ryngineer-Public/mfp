const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// Load the package.json file to access the dependencies and use them within the shared configuration
const packageJson = require("../package.json");

const prodConfig = {
  mode: "production",
  output: {
    // filename defines the name of the output file when the code is bundled
    // [name] is a placeholder that will be replaced with the name of the entry point
    // [contenthash] is a placeholder that will be replaced with a unique hash based on the content of the file
    // This helps with cache busting, as the filename will change
    // whenever the content of the file changes, ensuring that browsers load the latest version.
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      // name is the unique identifier for this module federation configuration
      name: "marketing",
      // filename defines the name of the file that will be generated for this module federation configuration
      filename: "remoteEntry.js",
      // exposes defines which modules from this application should be made available to other applications
      exposes: {
        // The key here would be used to import this module in other applications.
        "./MarketingApp": "./src/bootstrap",
      },
      // shared defines which dependencies should be shared between different applications
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(common, prodConfig);
