const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/_variables.sass";
          @import "@/styles/_globalStyles.sass";
          @import "@/styles/_buttons.sass";
          @import "@/styles/_inputs.sass";
        `,
      },
    },
  },
});
