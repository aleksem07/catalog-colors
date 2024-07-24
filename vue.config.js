const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  rules: [
    {
      test: /\.pug$/,
      oneOf: [
        {
          resourceQuery: /^\?vue/,
          use: ["pug-plain-loader"],
        },
        {
          use: ["raw-loader", "pug-plain-loader"],
        },
      ],
    },
  ],
});
