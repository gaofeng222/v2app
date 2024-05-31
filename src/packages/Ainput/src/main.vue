<template>
  <div
    :class="[ type === 'textarea' ? 'el-textarea' : 'el-input',inputSize ? 'el-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'el-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
    }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="el-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="el-input__inner"
        :readonly="readonly"
        :type="inputType"
        :disabled="disabled"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        v-bind="$attrs"
        :aria-label="label"
        @change="handleChange"
        :autocomplete="autocomplete"
      />
      <!-- 后置内容 -->
      <span class="el-input__suffix" v-if="getSuffixVisible">
        <span class="el-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i :class="[suffixIcon,'el-input__icon']" v-if="suffixIcon"></i>
          </template>
          <i
            v-if="showClear"
            @mousedown.prevent
            @click="handleClear"
            class="el-input__icon el-icon-circle-close el-input__clear"
          ></i>
          <i
            v-if="showPwdVisible"
            @mousedown.prevent
            class="el-input__icon el-icon-view el-input__clear"
            @click="handlePasswordVisible"
          ></i>
          <span v-if="isWordLimitVisible" class="el-input__count">
            <span class="el-input__count-inner">{{ textLength }}/{{ upperLimit }}</span>
          </span>
        </span>
        <i
          class="el-input__icon"
          v-if="validateState"
          :class="['el-input__validateIcon', validateIcon]"
        ></i>
      </span>
      <!-- 后置元素 -->
      <div class="el-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      :tabindex="tabindex"
      class="el-textarea__inner"
      :style="textareaStyle"
      v-else
      ref="textarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    ></textarea>
    <span
      v-if="isWordLimitVisible && type === 'textarea'"
      class="el-input__count"
    >{{ textLength }}/{{ upperLimit }}</span>
  </div>
</template>

<script>
import merge from "element-ui/src/utils/merge";
import calcTextareaHeight from "./calcTextareaHeight";
import emitter from "element-ui/src/mixins/emitter";
export default {
  name: "GfInput",
  inheritAttrs: false,
  data() {
    return {
      isComposing: false,
      focused: false,
      hovering: false,
      passwordVisible: false,
      textareaCalcStyle: {},
    };
  },
  inject: {
    gfForm: {
      default: "",
    },
    gfFormItem: {
      default: "",
    },
  },

  mixins: [emitter],
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: "text",
    },
    size: String,
    disabled: Boolean,
    readonly: Boolean,
    showPassword: {
      type: Boolean,
      default: false,
    },
    tabindex: String,
    clearable: {
      type: Boolean,
      default: false,
    },
    suffixIcon: String,
    label: String,
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    resize: String,
    autosize: {
      type: [Boolean, Object],
      default: false,
    },
    autocomplete: {
      type: String,
      default: "off",
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    nativeInputValue() {
      this.setNativeInputValue();
    },
    value(val) {
      if (this.validateEvent) {
        this.dispatch("GfFormItem", "gf.form.change", [val]);
      }
    },
  },
  computed: {
    inputSize() {
      return this.size;
    },
    validateState() {
      return this.gfFormItem ? this.gfFormItem.validateState : "";
    },
    needStatusIcon() {
      return this.gfForm ? this.gfForm.statusIcon : false;
    },
    inputType() {
      return this.showPassword
        ? this.passwordVisible
          ? "password"
          : "text"
        : this.type;
    },
    inputDisabled() {
      return this.disabled;
    },
    showClear() {
      return (
        this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        (this.focused || this.hovering)
      );
    },
    getSuffixVisible() {
      return (
        this.$slots.suffix ||
        this.suffixIcon ||
        this.showClear ||
        this.showPassword ||
        this.isWordLimitVisible ||
        (this.validateState && this.needStatusIcon)
      );
    },
    showPwdVisible() {
      return (
        this.showPassword &&
        !this.inputDisabled &&
        !this.readonly &&
        this.focused
      );
    },

    isWordLimitVisible() {
      return (
        this.showWordLimit &&
        this.$attrs.maxlength &&
        (this.type === "text" || this.type === "textarea") &&
        !this.inputDisabled &&
        !this.readonly &&
        !this.showPassword
      );
    },
    textLength() {
      if (typeof this.value === "number") {
        return String(this.value).length;
      }

      return (this.value || "").length;
    },
    upperLimit() {
      return this.$attrs.maxlength;
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined
        ? ""
        : String(this.value);
    },
    textareaStyle() {
      return merge({}, this.textareaCalcStyle, { resize: this.resize });
    },
    validateIcon() {
      return {
        validating: "el-icon-loading",
        success: "el-icon-circle-check",
        error: "el-icon-circle-close",
      }[this.validateState];
    },
  },
  methods: {
    focus() {
      this.getInput().focus();
    },
    blur() {
      this.getInput().blur();
    },
    handleChange(event) {
      this.$emit("change", event.target.value);
    },
    async handleInput() {
      if (this.isComposing) return false;
      this.$emit("input", event.target.value);
      await this.$nextTick();
      this.setNativeInputValue();
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit("focus", event);
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit("blur", event);
      if (this.validateEvent) {
        this.dispatch("GfFormItem", "gf.form.blur", [this.value]);
      }
    },
    select() {
      this.getInput().select();
    },
    handleClear() {
      this.$emit("input", "");
      this.$emit("change", "");
      //清空的时回调事件
      this.$emit("clear");
    },
    async handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
      await this.$nextTick();
      this.focus();
    },
    resizeTextarea() {
      if (this.$isServer) return;
      const { autosize, type } = this;
      if (type !== "textarea") return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight,
        };
        return;
      }
      const minRows = autosize.minRows;
      const maxRows = autosize.maxRows;

      this.textareaCalcStyle = calcTextareaHeight(
        this.$refs.textarea,
        minRows,
        maxRows
      );
    },
  },

  created() {
    this.$on("inputSelect", this.select);
  },
  mounted() {
    this.resizeTextarea();
  },
};
</script>

<style>
</style>