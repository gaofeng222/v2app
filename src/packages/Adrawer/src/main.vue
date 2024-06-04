<template>
  <transition name="el-drawer-fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div class="el-drawer__wrapper" v-show="visible">
      <div
        class="el-drawer__container"
        :class="visible && 'el-drawer__open'"
        @click="handleWrapperClick"
      >
        <div
          class="el-drawer"
          ref="drawer"
          :class="[direction, customClass]"
          :style="isHorizontal ? `width: ${drawerSize}` : `height: ${drawerSize}`"
        >
          <header class="el-drawer__header" id="el-drawer__title" v-if="withHeader">
            <slot name="title">
              <span :title="title">{{ title }}</span>
            </slot>
            <button
              class="el-drawer__close-btn"
              type="button"
              v-if="showClose"
              @click="closeDrawer"
            >
              <i class="el-dialog__close el-icon el-icon-close"></i>
            </button>
          </header>
          <section class="el-drawer__body" v-if="rendered">
            <slot></slot>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from "element-ui/src/utils/popup";
export default {
  name: "GfDrawer",
  data() {
    return { rendered: false };
  },
  mixins: [Popup],
  props: {
    visible: {
      type: Boolean,
    },
    direction: {
      type: String,
      default: "rtl",
      validator(val) {
        return ["ltr", "rtl", "ttb", "btt"].indexOf(val) !== -1;
      },
    },
    customClass: {
      type: String,
      default: "",
    },
    withHeader: {
      type: Boolean,
      default: true,
    },
    wrapperClosable: {
      type: Boolean,
      default: true,
    },
    size: {
      type: [Number, String],
      default: "30%",
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    beforeClose: {
      type: Function,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    modal: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    if (this.visible) {
      this.rendered = true;
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
  },
  methods: {
    afterEnter() {},
    afterLeave() {},
    hide(cancel) {
      console.log("🚀 ~ hide ~ cancel:", cancel);
      if (cancel != false) {
        console.log("ok");
        this.$emit("update:visible", false);
      }
    },
    handleWrapperClick() {
      if (this.wrapperClosable) {
        this.closeDrawer();
      }
    },
    closeDrawer() {
      if (typeof this.beforeClose === "function") {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
  },
  computed: {
    isHorizontal() {
      return this.direction === "ltr" || this.direction === "rtl";
    },
    drawerSize() {
      return typeof this.size === "number" ? `${this.size}px` : this.size;
    },
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      console.log("🚀 ~ destroyed ~ this.appendToBody:", this.appendToBody);

      this.$el.parentNode.removeChild(this.$el);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>