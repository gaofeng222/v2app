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
        top: `${this.verticalOffset}px`,
      };
    },
    typeClass() {
      return this.type && !this.iconClass
        ? `el-message__icon el-icon-${typeMap[this.type]}`
        : "";
    },
  },
  mounted() {
    this.startTimer();
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
</style>