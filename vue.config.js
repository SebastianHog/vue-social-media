const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    proxy: "http://localhost:3156",
  },
  transpileDependencies: true,
});
