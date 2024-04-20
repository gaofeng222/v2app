<template>
  <div>
    <template>
      <m-link>
        <el-menu-item>
          <Item />
        </el-menu-item>
      </m-link>
    </template>
    <el-submenu>
      <template slot="title"></template>
      <el-menu-item index="2-1"></el-menu-item>
    </el-submenu>
  </div>
</template>

<script>
import MLink from "./m-link.vue";
import Item from "./item.vue";
export default {
  components: { MLink, Item },
};
</script>