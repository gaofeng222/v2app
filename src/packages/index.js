import Alert from "./Alert/index";
import Aside from "./Aside/index";
import Ainput from "./Ainput/index";
import Aform from "./Aform/index";
import AformItem from "./AformItem/index";
import Adrawer from "./Adrawer/index";
import Atag from "./Atag/index";
import GfSpace from "./Aspace/index";
import GfMessage from "./AMessage/index";

const components = [
  Alert,
  Aside,
  Ainput,
  Aform,
  AformItem,
  Adrawer,
  Atag,
  GfSpace,
];

const install = function (Vue, opts) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$GfMessage = GfMessage;
};

if (typeof window != "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version: "0.0.1",
  install,
};
