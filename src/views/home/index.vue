<template>
  <g-container>
    <div>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-card>
            <div>
              {{ logVue }}
              <CCheckbox v-model="logVue" value="自定义复选" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div></div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div></div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </g-container>
</template>

<script>
import CCheckbox from "@/components/c-checkbox";
export default {
  components: {
    CCheckbox,
  },
  data() {
    return {
      logVue: true,
    };
  },
};
</script>

<style lang="scss" scoped></style>
