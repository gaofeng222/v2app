import Vue from "vue";
import Main from "./main.vue";

import { isVNode } from "element-ui/src/utils/vdom";
import { isObject, isString, isFunction } from "element-ui/src/utils/types";

// 构造函数
let MessageConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const GfMessage = (options = {}) => {
  console.log("🚀 ~ GfMessage ~ options:", options);
  if (Vue.prototype.$isServer) return;
  if (isString(options)) {
    options = {
      message: options,
    };
  }
  let userOnClose = options.onClose;
  let id = "message_" + seed++;
  options.onClose = function () {
    GfMessage.close(id, userOnClose);
  };
  instance = new MessageConstructor({
    data: options,
    created() {
      console.log("🚀 ~ GfMessage ~ created");
    },
  });
  instance.id = id;
  // 挂载实例
  instance.$mount();
  // 插入到body
  document.body.appendChild(instance.$el);
  let verticalOffset = options.offset || 20;
  instances.forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  instance.verticalOffset = verticalOffset;
  instance.visible = true;
  instances.push(instance);
  return instance;
};

GfMessage.close = function (id, userOnClose) {
  let index = -1;
  let len = instances.length;
  let removeHeight;
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removeHeight = instances[i].$el.offsetHeight;
      index = i;
      if (isFunction(userOnClose)) {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
  console.log("🚀 ~ index:", index);
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  for (let i = index; i < len - 1; i++) {
    let dom = instances[i].$el;
    dom.style["top"] =
      parseInt(dom.style["top"], 10) - removeHeight - 16 + "px";
  }
};

export default GfMessage;
