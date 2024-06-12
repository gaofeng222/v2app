## 组件之 GfMessage

> 消息提示, 用于页面顶部消息栏的展示, 默认是居中显示, 可以通过设置属性来改变位置
> 消息组件有点类似 alert 组件，区别是 message 组件是不用写在页面上，而是通过调用方法来弹窗显示

## 效果预览

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/983ee1dad13044fb961fde6af43df7e3.png)

## 属性

|           参数           |   类型   |                 说明                  |           可选值           | 默认值 |
| :----------------------: | :------: | :-----------------------------------: | :------------------------: | :----: |
|         visible          | Boolean  |               显示隐藏                |             -              | false  |
|        showClose         | Boolean  |             显示关闭图标              |             -              | false  |
|         duration         |  Number  |            延迟关闭的时间             |             -              |  1500  |
| dangerouslyUseHTMLString | Boolean  | 是否将 message 属性作为 HTML 片段处理 |             -              | false  |
|         onClose          | Function |           关闭时的回调事件            |             -              |   -    |
|      verticalOffset      |  Number  |            距离底部的距离             |             -              |   20   |
|        iconClass         |  String  |                 图标                  |             -              | false  |
|           type           |  String  |              弹窗的风格               | info/warning/error/success | "info" |
|          center          | Boolean  |             内容是否居中              |             -              | false  |
|          offset          |  Number  |            距离底部的偏移             |             -              |   20   |

## 代码实现

这里我们要件两个文件，一个是组件的静态模版，一个是组件的 js 逻辑

main.vue 的内容如下：

```js

<template>
  <transition name="el-message-fade" @after-leave="handleAfterLeave">
    <div
      :class="['el-message',type && !iconClass ? `el-message--${ type }` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',]"
      v-show="visible"
      :style="positionStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <i :class="iconClass" v-if="iconClass"></i>
      <i :class="typeClass" v-else></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="el-message__content">{{ message }}{{ id }}</p>
        <p v-else v-html="message" class="el-message__content"></p>
      </slot>
      <i v-if="showClose" class="el-message__closeBtn el-icon-close" @click="close"></i>
    </div>
  </transition>
</template>

<script>
import { isFunction } from "element-ui/src/utils/types";
const typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};
export default {
  name: "GfMessage",
  data() {
    return {
      visible: false,
      showClose: false,
      message: "",
      duration: 3000,
      dangerouslyUseHTMLString: false,
      onClose: null,
      closed: false,
      verticalOffset: 20,
      iconClass: "",
      type: "info",
      center: false,
      id: 0,
    };
  },
  computed: {
    positionStyle() {
      return {
        bottom: `${this.verticalOffset}px`,
      };
    },
    typeClass() {
      return this.type && !this.iconClass
        ? `el-message__icon el-icon-${typeMap[this.type]}`
        : "";
    },
  },
  mounted() {
    // this.startTimer();
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    },
  },
  methods: {
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
      if (isFunction(this.onClose)) {
        this.onClose(this);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
  },
};
</script>

<style lang="scss">
.el-message {
  top: auto;
  transition: bottom 0.4s;
  left: auto;
  right: 30px;
  transform: translateX(0);
}
</style>

```

main.js 的内容如下：

```js
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
  // 利用构造创建新的实例，并挂载
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

//四种不同类型的消息提示
["success", "warning", "info", "error"].forEach((type) => {
  GfMessage[type] = (options) => {
    if (isObject(options) && !isVNode(options)) {
      return GfMessage({
        ...options,
        type,
      });
    }
    return GfMessage({
      type,
      message: options,
    });
  };
});

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
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  for (let i = index; i < len - 1; i++) {
    let dom = instances[i].$el;
    //重新计算每个实例的bottom值
    dom.style["bottom"] =
      parseInt(dom.style["bottom"], 10) - removeHeight - 16 + "px";
  }
};

export default GfMessage;
```

**`样式文件可以参考elementui的实现`，后面会写一篇文章详细分析组件库的样式怎么去写的文章，敬请关注**

## 使用

> 测试效果

然后全局挂在的 vue 的原型上面,这样，我们就实现了自己的 命令式 message 组件

```js
Vue.prototype.$GfMessage = GfMessage;
```

```html
<el-button type="danger" @click="showHandleMessage">showMessage</el-button>
```

```js
    showHandleMessage() {
      this.$GfMessage({
        message: "这是一条消息提示",
        showClose: true,
        duration: 1500,
        type: "warning",
      });
    }

    或者
    showHandleMessage() {
      this.$GfMessage("这是一条消息提示");
    }
```

有不明白的地方可以评论区留言，或者加我微信，一起探讨！！
