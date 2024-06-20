<template>
  <g-container>
    <div>
      <form>
        <div>
          <label for="username">用户名:</label>
          <input id="username" type="text" v-model="form.username" />
        </div>
        <div>
          <label for="age">年龄:</label>
          <input id="age" type="text" v-model.number="form.age" />
        </div>
        <button @click="handleSubmit">提交</button>
        <button>重置</button>
      </form>
    </div>
  </g-container>
</template>

<script>
import Schema from "async-validator";

export default {
  created() {},
  mounted() {},
  data() {
    return {
      form: {
        username: "",
        age: "",
      },
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const descriptor = {
        name: {
          type: "string",
          required: true,
          validator: (rule, value, cb) => {
            console.log("🚀 ~ handleSubmit ~ name:", value);
            if (!value) {
              cb("请输入用户名");
            }
            //value === "muji"
          },
        },
        age: {
          type: "number",
          asyncValidator: async (rule, value, cb) => {
            const res = await new Promise((resolve, reject) => {
              if (value < 18) {
                return false;
              }
              return true;
            });
            if (!res) {
              return Promise.reject("年龄不能小于18");
            }
            return Promise.resolve();
          },
        },
      };
      const validator = new Schema(descriptor);
      validator.validate(
        { name: this.form.username, age: this.form.age },
        (errors, fields) => {
          if (errors) {
            console.log("🚀 ~ validator.validate ~ errors:", errors);
            // validation failed, errors is an array of all errors
            // fields is an object keyed by field name with an array of
            // errors per field
            // return handleErrors(errors, fields);
          }
          // validation passed
          console.log("000");
        }
      );
      // PROMISE USAGE
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
