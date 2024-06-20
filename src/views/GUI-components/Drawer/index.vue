<template>
  <g-container>
    <Gf-space flex :gap="10">
      <gf-tag
        closable
        @close="handleTagClose"
        v-for="item in tags"
        :key="item.name"
        :type="item.type"
      >{{ item.name }}</gf-tag>
    </Gf-space>
    <Gf-space flex :gap="10" direction="column">
      <gf-tag
        closable
        effect="dark"
        @close="handleTagClose"
        v-for="item in tags"
        :key="item.name"
        :type="item.type"
      >{{ item.name }}</gf-tag>
    </Gf-space>
    <gf-drawer
      :visible.sync="drawer1"
      :before-close="handleClose1"
      wrapperClosable
      appendToBody
      :title="title"
      :openDelay="3000"
      modalAppendToBody
    >
      <div>我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!</div>
    </gf-drawer>
    <el-button type="primary" @click="showDrawer1">showDrawer1</el-button>
    <el-button type="primary" @click="showDrawer">showDrawer</el-button>
    <br />
    <br />
    <div>
      <el-button type="danger" @click="showHandleMessage">showMessage</el-button>
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      wrapperClosable
      @open="handleOpen"
      appendToBody
      @opened="handleOpened"
      :openDelay="3000"
      modalAppendToBody
    >
      <div>我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!</div>
    </el-drawer>
    <el-form :model="form">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model.number="form.age" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button type="primary" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <ul>
      <li v-for="item in books" :key="item">{{ item }}</li>
    </ul>
  </g-container>
</template>

<script>
import { person } from "@/utils";
console.log("🚀 ~ person:", person);

export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
      drawer1: false,
      title: "弹窗标题",
      showTag: true,
      tags: [
        { name: "标签一", type: "" },
        { name: "标签二", type: "success" },
        { name: "标签三", type: "info" },
        { name: "标签四", type: "warning" },
        { name: "标签五", type: "danger" },
      ],
      form: {
        name: "",
        age: "10",
        address: "北京",
      },
    };
  },
  created() {
    this.books = person.books;
    console.log("🚀 ~ person:-created222", person);
  },
  methods: {
    handleSubmit() {
      console.log("aaa", person.name);
      person.books.push("java高级程序设计");
      console.log(this.form);
      this.books = person.books;
    },
    handleReset() {},
    showDrawer1() {
      this.drawer1 = !this.drawer1;
    },
    showDrawer() {
      this.drawer = true;
    },
    handleClose() {
      this.drawer = false;
    },
    handleClose1() {
      this.drawer1 = false;
    },
    handleOpen() {
      alert("handleOpen");
    },
    handleOpened() {
      alert("handleOpened");
    },
    handleTagClose() {
      this.showTag = false;
    },
    showHandleMessage1() {
      this.$GfMessage({
        message: "这是一条消息提示",
        showClose: true,
        duration: 1500,
        type: "warning",
      });
    },
    showHandleMessage() {
      this.$GfMessage("这是一条消息提示");
    },
  },
};
</script>

<style>
</style>