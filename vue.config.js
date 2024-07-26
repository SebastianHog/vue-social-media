const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    proxy: "http://192.168.1.7:3156",
  },
  transpileDependencies: true,
});
