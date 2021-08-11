const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(js|tsx|mdx)"],
  // Add any Storybook addons you want here: https://storybook.js.org/addons/
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
    "@storybook/addon-backgrounds",
    "@storybook/addon-controls",
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });

    config.module.rules.push({
      test: /\.(ts|tsx|mdx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [
          [
            "react-app",
            {
              flow: false,
              typescript: true,
            },
          ],
        ],
      },
    });
    config.resolve.extensions.push(".ts", ".tsx", ".mdx");

    return config;
  },
};
