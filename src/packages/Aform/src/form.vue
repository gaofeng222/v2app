<template>
  <form
    :class="['el-form',labelPosition? 'el-form--label-'+labelPosition:'',{ 'el-form--inline': inline }]"
  >
    <slot></slot>
  </form>
</template>

<script>
import objectAssign from "element-ui/src/utils/merge";

export default {
  name: "GfForm",
  componentName: "GfForm",
  provide() {
    return {
      gfForm: this,
    };
  },

  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String,
    inline: Boolean,
    labelSuffix: {
      type: String,
      default: "",
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false,
    },
    showMessage: {
      type: Boolean,
      default: true,
    },
    statusIcon: Boolean,
    size: String,
  },
  data() {
    return {
      fields: [],
      potentialLabelWidthArr: [], // use this array to calculate auto width
    };
  },
  created() {
    this.$on("gf.form.addField", (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
  },
  computed: {
    autoLabelWidth() {
      if (!this.potentialLabelWidthArr.length) return 0;
      const max = Math.max(...this.potentialLabelWidthArr);
      return max ? max : "";
    },
  },
  methods: {
    validate(cb) {
      if (!this.model) {
        console.warn(
          "[Element Warn][Form]model is required for validate to work!"
        );
        return;
      }
      let valid = true;
      let count = 0;
      if (this.fields.length === 0 && cb) {
        cb(true);
      }
      let invalidFields = {};
      this.fields.forEach((field) => {
        field.validate("", (message, field) => {
          if (message) {
            valid = false;
          }
          invalidFields = objectAssign({}, invalidFields, field);
          if (typeof cb === "function" && ++count === this.fields.length) {
            cb(valid, invalidFields);
          }
        });
      });
    },
  },
};
</script>

<style>
</style>