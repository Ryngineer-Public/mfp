const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// Load the package.json file to access the dependencies and use them within the shared configuration
const packageJson = require("../package.json");
const domain = process.env.PRODUCTION_DOMAIN || "localhost:8080";

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
      name: "container",
      // remotes defines the remote applications that this application can consume
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      // shared defines which dependencies should be shared between different applications
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(common, prodConfig);
