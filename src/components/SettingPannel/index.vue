<template>
  <el-drawer
    :title="settingPannelTitle"
    :visible.sync="drawer"
    :direction="settingPannelShowType"
    :before-close="handleClose"
    append-to-body
    size="420px"
  >
    <el-row>
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="100px" style="padding:0 20px;">
          <el-form-item label="主题色：">
            <el-color-picker
              v-model="form.colors.primary"
              show-alpha
              @change="changeColorHandler"
              color-format="rgb"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="菜单高亮色：">
            <el-color-picker
              v-model="form.colors.menuActive"
              show-alpha
              @change="changeColorHandler"
              color-format="rgb"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="显示Logo">
            <el-switch v-model="form.showLogo" @change="toggleLogoHandler"></el-switch>
          </el-form-item>
          <el-form-item label="路由模式：">
            <el-radio v-model="form.routeMode" label="前端路由"></el-radio>
            <el-radio v-model="form.routeMode" label="后端路由"></el-radio>
          </el-form-item>
          <el-form-item label="暗黑模式：">
            <el-switch v-model="form.darkMode" @change="toggleDarkModeHandler"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import generateColors from "@/utils/color/color.js";
const defaultColor = "#409eff";
const defaultMenuActiveColor = "yellow";
export default {
  props: {
    showPannel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        routeMode: "前端路由", //默认是前端路由
        colors: {
          primary: localStorage.getItem("color") || defaultColor,
          menuActive:
            localStorage.getItem("menuActiveColor") || defaultMenuActiveColor,
        },
        showLogo: true,
        darkMode: !!localStorage.getItem("isDarkMode"),
      },
      localColor: "",
      localMenuActiveColor: "",
      originalStylesheetCount: -1,
      originalStyle: "",
    };
  },
  created() {
    this.getIndexStyle();
    this.localColor = localStorage.getItem("color");
    this.localMenuActiveColor = localStorage.getItem("menuActiveColor");
  },
  mounted() {},
  computed: {
    ...mapGetters(["settingPannelTitle", "settingPannelShowType"]),
    drawer: {
      get() {
        return this.showPannel;
      },
      set(value) {
        this.$emit("update:showPannel", !this.showPannel);
      },
    },
  },
  methods: {
    ...mapActions({
      toggleLogo: "app/toggleLogo",
    }),
    initTheme() {
      this.originalStylesheetCount = document.styleSheets.length;
      this.form.colors.primary = this.localColor
        ? this.localColor
        : defaultColor;
      this.form.colors.menuActive = this.localMenuActiveColor
        ? this.localMenuActiveColor
        : defaultMenuActiveColor;
      this.initColor();
      const isDarkMode = localStorage.getItem("isDarkMode");
      //eslint-ignore
      if (isDarkMode == 1) {
        this.toggleDarkModeHandler();
      }
    },
    handleClose() {
      this.$emit("update:showPannel", !this.showPannel);
    },

    async changeColorHandler(value) {
      this.form.colors = Object.assign(
        {},
        this.form.colors,
        generateColors(this.form.colors.primary)
      );
      this.writeNewStyle();
      localStorage.setItem("color", this.form.colors.primary);
      localStorage.setItem("menuActiveColor", this.form.colors.menuActive);
    },
    toggleLogoHandler(value) {
      console.log("🚀 ~ toggleLogoHandler ~ value:", value);
      this.toggleLogo(value);
    },
    toggleDarkModeHandler(value) {
      const body = document.body;
      body.classList.toggle("dark-mode");
      localStorage.setItem(
        "isDarkMode",
        body.classList.contains("dark-mode") ? 1 : 0
      );
    },
    //以下是处理主题色切换的操作
    //参考:https://www.jianshu.com/p/b6f0c0d20e86
    getStyleTemplate(data) {
      const colorMap = {
        "#3a8ee6": "shade-1",
        "#409eff": "primary",
        "#53a8ff": "light-1",
        "#66b1ff": "light-2",
        "#79bbff": "light-3",
        "#8cc5ff": "light-4",
        "#a0cfff": "light-5",
        "#b3d8ff": "light-6",
        "#c6e2ff": "light-7",
        "#d9ecff": "light-8",
        "#ecf5ff": "light-9",
      };
      Object.keys(colorMap).forEach((key) => {
        const value = colorMap[key];
        data = data.replace(new RegExp(key, "ig"), value);
      });
      return data;
    },
    getFile(url, isBlob = false) {
      return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest();
        client.responseType = isBlob ? "blob" : "";
        client.onreadystatechange = () => {
          if (client.readyState !== 4) {
            return;
          }
          if (client.status === 200) {
            const urlArr = client.responseURL.split("/");
            resolve({
              data: client.response,
              url: urlArr[urlArr.length - 1],
            });
          } else {
            reject(new Error(client.statusText));
          }
        };
        client.open("GET", url);
        client.send();
      });
    },
    initColor() {
      this.form.colors = Object.assign(
        {},
        this.form.colors,
        generateColors(this.form.colors.primary)
      );
      this.writeNewStyle();
    },
    getIndexStyle() {
      this.getFile("//unpkg.com/element-ui/lib/theme-chalk/index.css").then(
        ({ data }) => {
          this.originalStyle = this.getStyleTemplate(data);
        }
      );
    },
    writeNewStyle() {
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--color-primary", this.form.colors.primary);
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--menu-color-primary", this.form.colors.menuActive);
      let cssText = this.originalStyle;
      Object.keys(this.form.colors).forEach((key) => {
        cssText = cssText.replace(
          new RegExp("(:|\\s+)" + key, "g"),
          "$1" + this.form.colors[key]
        );
      });

      if (this.originalStylesheetCount === document.styleSheets.length) {
        const style = document.createElement("style");
        style.innerText = cssText;
        document.head.appendChild(style);
      } else {
        document.head.lastChild.innerText = cssText;
      }
    },
  },
};
</script>