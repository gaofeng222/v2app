<template>
  <div>
    <div class="canvas-container">
      <div class="tool-box">
        <ul>
          <li
            v-for="(item,index) in tools"
            :class="{active:index === currentIndex}"
            :key="item.name"
            @click="currentIndex = index"
          >{{ item.name }}</li>
          <li @click="handleClear">清空</li>
        </ul>
      </div>
      <div class="main">
        <div class="content" id="content" ref="content"></div>
        <div class="attr"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Leafer, Rect, Ellipse } from "leafer-ui";

export default {
  name: "Canvas",
  data() {
    this.tools = [
      { name: "矩形", icon: "icon-rect" },
      { name: "圆形", icon: "icon-circle" },
      { name: "三角形", icon: "icon-triangle" },
      { name: "多边形", icon: "icon-polygon" },
      { name: "直线", icon: "icon-line" },
      { name: "文字", icon: "icon-text" },
    ];
    return {
      currentIndex: 0,
      startX: 0,
      startY: 0,
      disX: 0,
      disY: 0,
      leafer: null,
      id: 0,
    };
  },
  mounted() {
    this.leafer = new Leafer({ view: "content" });

    // 画矩形
    this.createRect();
  },
  methods: {
    createRect() {
      this.$refs.content.addEventListener("mousedown", (e) => {
        console.log(e, "9090");
        console.log(e.target.id, "9090");
        this.startX = e.offsetX;
        this.startY = e.offsetY;
        this.$refs.content.addEventListener("mousemove", this.drawRect);
        this.$refs.content.addEventListener("mouseup", this.drawEndRect);
      });
    },
    drawRect(e) {
      this.disX = e.offsetX - this.startX;
      this.disY = e.offsetY - this.startY;
    },
    drawEndRect(e) {
      this.addRect(this.startX, this.startY, this.disX, this.disY);
      // 重置参数
      this.resetData();
    },
    addRect(x, y, w, h) {
      const rect = new Rect({
        x,
        y,
        width: this.disX,
        height: this.disY,
        draggable: true,
        fill: "red", // 背景色
        dragBounds: true,
      });
      rect.setId(this.id++);
      this.leafer.add(rect);
    },
    resetData() {
      this.startX = 0;
      this.startY = 0;
      this.disX = 0;
      this.disY = 0;
    },
    // createRect() {
    //   const rect = new Rect({
    //     x: 10,
    //     y: 10,
    //     width: 100,
    //     height: 100,
    //     draggable: true,
    //     fill: "#32cd79", // 背景色
    //   });
    //   this.leafer.add(rect);
    // },
    createEllipse() {
      const rect = new Ellipse({
        X: 100,
        Y: 100,
        width: 100,
        height: 100,
        fill: "red",
        draggable: true,
        hoverStyle: {
          fill: "black",
        },
      });
      this.leafer.add(rect);
    },
    handleClear() {
      this.leafer.clear();
    },
  },
};
</script>
<style lang="scss" scoped>
.canvas-container {
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  .tool-box {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    ul {
      overflow: hidden;
      li {
        float: left;
        width: 100px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        &.active {
          background: var(--color-primary);
          color: #fff;
        }
      }
    }
  }
  .main {
    display: flex;
    min-height: 700px;
    .content {
      flex: 1;
      border: 1px solid #ccc;
    }
    .attr {
      width: 300px;
      border: 1px solid #ccc;
      margin-left: 10px;
    }
  }
}
</style>
