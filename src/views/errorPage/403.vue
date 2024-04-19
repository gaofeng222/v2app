<template>
  <div style="background-color: #fef2f5;;">403</div>
</template>

<script>
export default {
  name: "page404",
  dtat() {
    return {};
  },
  methods: {
    backhome() {
      return this.$router.push("/");
    },
  },
  computed: {
    message() {
      return "Oop,您的页面飞跑了";
    },
  },
};
</script>