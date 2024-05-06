<template>
  <g-container>
    <div class="draggable-container">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="left-component">
            <h3>基础组件</h3>
            <draggable
              class="dragCompArea list-group"
              :list="list1"
              :group="{ name: 'component-drag', pull: 'clone', put: false }"
              :clone="cloneDog"
              @change="log"
              tag="div"
              :sort="false"
            >
              <div class="list-group-item" v-for="element in list1" :key="element.id">
                <div class="list-group-item__content">{{ element.name }}</div>
              </div>
            </draggable>
          </div>
        </el-col>
        <el-col :span="12">
          <draggable class="dragArea list-group" :list="list2" group="component-drag" @change="log">
            <div class="dragArea__empty" v-if="!list2.length">请拖动左边的组件到此处</div>
            <template v-else>
              <div
                class="list-group-item"
                v-for="element in list2"
                :key="element.id"
                @click="selectHandle(element)"
              >{{ element.name }}</div>
            </template>
          </draggable>
        </el-col>
        <el-col :span="6">
          <div class="right-setting">{{ compConfig }}</div>
        </el-col>
      </el-row>
    </div>
  </g-container>
</template>

<script>
import draggable from "vuedraggable";
import { v4 as uuidv4 } from "uuid";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      list1: [
        { name: "单行文本", id: uuidv4() },
        { name: "多行文本", id: uuidv4() },
        { name: "时间选择", id: uuidv4() },
        { name: "是/否", id: uuidv4() },
      ],
      list2: [],
      compConfig: {
        name: "",
      },
    };
  },
  methods: {
    log: function (evt) {
      window.console.log(evt);
    },
    cloneDog({ id }) {
      return {
        id: uuidv4(),
        name: `cat ${id}`,
      };
    },
    selectHandle(item) {
      console.log("🚀 ~ selectHandle ~ item:", item);
      this.compConfig = item;
    },
  },
};
</script>
<style lang="scss" scoped>
.draggable-container {
  .left-component,
  .right-setting {
    height: 600px;
    border: 1px solid #f1f1f1;
    .dragCompArea {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      .list-group-item {
        flex: 1 0 50%;
        /* height: 80px; */
        text-align: center;
        /* line-height: 80px; */
        &__content {
          padding: 10px;
          box-sizing: border-box;
          border: 1px solid #ccc;
        }
      }
    }
  }
  .right-setting {
  }
  .dragArea {
    height: 600px;
    &__empty {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
