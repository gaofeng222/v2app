<template>
  <Transition name="el-alert-fade">
    <div
      :class="['el-alert',typeClass,center?'is-center':'','is-' + effect]"
      v-show="visible"
      role="alert"
    >
      <i :class="['el-alert__icon',iconClass, isBigIcon ]" v-if="showIcon"></i>
      <div class="el-alert__content">
        <span :class="['el-alert__title',isBoldTitle]" v-if="title || $slots.title">
          <slot name="title">{{ title }}</slot>
        </span>

        <!-- 描述内容两种方式都可以 -->
        <p class="el-alert__description" v-if="$slots.default && !description">
          <slot></slot>
        </p>
        <p class="el-alert__description" v-if="description && !$slots.default">{{ description }}</p>
        <i
          :class="['el-alert__closebtn',{'el-icon-close': closeText === ''}]"
          v-show="closable"
          @click="handleClose"
        >{{ closeText }}</i>
      </div>
    </div>
  </Transition>
</template>

<script>
const TYPE_CLASSES_MAP = {
  success: "el-icon-success",
  warning: "el-icon-warning",
  error: "el-icon-error",
};
export default {
  name: "GfAlert",
  created() {
    console.log("this is from alert888");
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "info",
    },
    description: {
      type: String,
      default: "",
    },
    effect: {
      type: String,
      default: "light",
      validator: function (value) {
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
    closeText: {
      type: String,
      default: "",
    },
    showIcon: Boolean,
    center: Boolean,
    closable: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      visible: true,
    };
  },
  computed: {
    typeClass() {
      return `el-alert--${this.type}`;
    },
    isBoldTitle() {
      /**
       * 存在描述内容或者有插槽slots
       */
      return this.description || this.$slots.default ? "is-bold" : "";
    },
    iconClass() {
      return TYPE_CLASSES_MAP[this.type] || "el-icon-info";
    },
    isBigIcon() {
      return this.description || this.$slots.default ? "is-big" : "";
    },
  },
  methods: {
    handleClose() {
      this.visible = false;
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>