const { defineConfig } = require("@vue/cli-service");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    // when there are many pages, it will cause too many meaningless requests
    // config.plugins.delete('prefetch')
    // // it can improve the speed of the first screen, it is recommended to turn on preload
    // config.plugin('preload').tap(() => [
    //   {
    //     rel: 'preload',
    //     // to ignore runtime.js
    //     // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
    //     include: 'initial'
    //   }
    // ])
    config.plugin("html").tap((args) => {
      console.log("🚀 ~ config.plugin ~ args:", args);
      args[0].title = "vue-admin";
      return args;
    });
    // set svg-sprite-loader

    config.module
      .rule("svg")
      .exclude.add(resolve("src/components/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/components/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  css: {
    loaderOptions: {
      scss: {
        // additionalData: `@import "@/assets/styles/variables.scss";`,
        //解决vuex里面Layout组件scss变量获取不到的问题
        additionalData: (content, loaderContext) => {
          const { resourcePath } = loaderContext;
          if (resourcePath.endsWith("variables.module.scss")) return content;
          return `@import "@/assets/styles/variables.module.scss"; 
          ${content}`;
        },
      },
    },
  },
});
