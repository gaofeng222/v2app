<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from "@/utils";
export default {
  props: {
    to: {
      type: String,
      reuired: true,
    },
  },
  computed: {
    isExternal() {
      return isExternal(this.to);
    },
    type() {
      if (this.isExternal) {
        return "a";
      } else {
        return "router-link";
      }
    },
  },
  methods: {
    linkProps(to) {
      console.log("🚀 ~ linkProps ~ to:", to);
      if (this.isExternal) {
        return {
          href: to,
          target: "_blank",
          rel: "noopener",
        };
      } else {
        return {
          to,
        };
      }
    },
  },
};
</script>