<template>
  <div
    :class="['el-form-item',{
      'el-form-item--feedback': gfForm && gfForm.statusIcon,
    'is-required': isRequired || required,
    'is-no-asterisk': gfForm && gfForm.hideRequiredAsterisk,
    'is-error': validateState === 'error',
  },
  sizeClass ? 'el-form-item--' + sizeClass : '']"
  >
    <label-wrapper>
      <label
        :for="labelFor"
        v-if="label || $slots.label"
        class="el-form-item__label"
        :style="labelStyle"
      >
        <slot name="label">{{label + form.labelSuffix}}</slot>
      </label>
    </label-wrapper>
    <div class="el-form-item__content" :style="contentStyle">
      <slot></slot>
      <transition name="el-zoom-in-top">
        <slot
          v-if="validateState === 'error' && showMessage && form.showMessage"
          name="error"
          :error="validateMessage"
        >
          <div class="el-form-item__error">{{validateMessage}}</div>
        </slot>
      </transition>
    </div>
  </div>
</template>

<script>
import LabelWrapper from "./label-wrapper.vue";
import { noop, getPropByPath } from "element-ui/src/utils/util";
import objectAssign from "element-ui/src/utils/merge";
import AsyncValidator from "async-validator";
import emitter from "element-ui/src/mixins/emitter";

export default {
  components: { LabelWrapper },
  name: "GfFormItem",
  componentName: "GfFormItem",
  provide() {
    return {
      gfFormItem: this,
    };
  },
  mixins: [emitter],
  inject: ["gfForm"],
  created() {},
  mounted() {
    if (this.prop) {
      this.dispatch("GfForm", "gf.form.addField", [this]);
    }
    this.addValidateEvents();
  },
  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: {
      type: Boolean,
      default: false,
    },
    for: String,
    rules: [Object, Array],
    error: String,
    showMessage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isNested: false, //是否被嵌套
      validateDisabled: false,
      validateState: "",
      validateMessage: "",
    };
  },
  computed: {
    labelFor() {
      return this.for || this.prop;
    },
    labelStyle() {
      const ret = {};
      if (this.form.labelPosition === "top") return ret;
      const labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth) {
        ret.width = labelWidth;
      }
      return ret;
    },
    contentStyle() {
      const ret = {};
      const label = this.label;
      if (this.form.labelPosition === "top" || this.form.inline) return ret;
      if (!label && !this.labelWidth && this.isNested) return ret;
      const labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth === "auto") {
        if (this.labelWidth === "auto") {
          ret.marginLeft = this.computedLabelWidth;
        } else if (this.form.labelWidth === "auto") {
          ret.marginLeft = this.elForm.autoLabelWidth;
        }
      } else {
        ret.marginLeft = labelWidth;
      }
      return ret;
    },
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName != "GfForm") {
        if (parentName == "GfFormItem") {
          this.isNested = true;
        }
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },
    isRequired() {
      let rules = this.getRules();
      let isRequired = false;
      if (rules && rules.length) {
        rules.every((value, index, array) => {
          if (value.required) {
            isRequired = true;
            return false;
          }
          return true;
        });
      }

      return isRequired;
    },
    fieldValue() {
      const model = this.form?.model;
      if (!model || !this.prop) {
        return;
      }
      let path = this.prop;
      if (path.indexOf(":") !== -1) {
        path = path.replace(/:/, ".");
      }
      return getPropByPath(model, path, true).v;
    },
    _formSize() {
      return this.gfForm.size;
    },
    gfFormItemSize() {
      return this.size || this._formSize;
    },
    sizeClass() {
      return this.gfFormItemSize || (this.$ELEMENT || {}).size;
    },
  },
  methods: {
    getRules() {
      let formRules = this.form.rules;
      const selfRules = this.rules;
      const requiredRule =
        this.required != undefined ? { required: !!this.required } : [];
      const prop = getPropByPath(formRules, this.prop || "");
      formRules = formRules ? prop.o[this.prop || ""] || prop.v : [];
      return [].concat(selfRules || formRules || []).concat(requiredRule);
    },
    validate(trigger, cb = noop) {
      this.validateDisabled = false;
      const rules = this.getFilteredRule(trigger);
      if ((!rules || rules.length === 0) && this.required === undefined) {
        cb();
        return true;
      }
      this.validateState = "validating";
      const descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach((rule) => {
          delete rule.trigger;
        });
      }
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);

      const model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(
        model,
        { firstFields: true },
        (errors, invalidFields) => {
          this.validateState = !errors ? "success" : "error";
          this.validateMessage = errors ? errors[0].message : "";
          cb(this.validateMessage, invalidFields);
          this.gfForm &&
            this.gfForm.$emit(
              "validate",
              this.prop,
              !errors,
              this.validateMessage || null
            );
        }
      );
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules
        .filter((rule) => {
          if (!rule.trigger || trigger == "") return true;
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger) > -1;
          } else {
            return rule.trigger === trigger;
          }
        })
        .map((_) => objectAssign({}, _));
    },
    onFieldBlur() {
      this.validate("blur");
    },
    onFieldChange() {
      console.log(this.validateDisabled);
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }
      this.validate("change");
    },
    addValidateEvents() {
      const rules = this.getRules();
      if (rules.length || this.required) {
        this.$on("gf.form.blur", this.onFieldBlur);
        this.$on("gf.form.change", this.onFieldChange);
      }
    },
  },
};
</script>

<style>
</style>