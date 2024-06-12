import Atag from "./src/main.vue";

Atag.install = function (Vue) {
  Vue.component(Atag.name, Atag);
};
export default Atag;
