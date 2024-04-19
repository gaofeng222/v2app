import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./router/permission.js";
import store from "./store";
import "@/assets/styles/index.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(ElementUI, {
  size: "medium",
  zIndex: 3000,
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
