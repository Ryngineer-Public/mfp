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
};
