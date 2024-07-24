const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
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
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/vars.scss";`,
      },
    },
  },
});
