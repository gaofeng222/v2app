<template>
  <g-container>
    <div>
      <span>点击头像，更换头像:</span>
      <el-avatar @click.native="handleShowCropper" :src="avatarUrl"></el-avatar>
    </div>
    <el-dialog
      title="更换头像"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="dialogBeforeClose"
      v-if="dialogVisible"
      append-to-body
    >
      <el-row :gutter="10">
        <el-col :span="12" :style="{ height: '350px' }">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :info="true"
            :auto-crop="option.autoCrop"
            :outputSize="option.size"
            :outputType="option.outputType"
            @realTime="realTime"
            centerBox
          ></vueCropper>
        </el-col>
        <el-col :span="12" class="preview-container">
          <div class="avatar-upload-preview">
            <div :style="previews.div">
              <img :src="previews.url" :style="previews.img" />
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top:20px;text-align:center" justify="center">
        <el-col :span="4">
          <el-upload
            action
            name="file"
            accept="image/*"
            :before-upload="beforeUpload"
            :show-upload-list="false"
          >
            <el-button icon="upload">选择图片</el-button>
          </el-upload>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="changeScale(1)">放大</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="changeScale(-1)">缩小</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="rotateLeft">左旋转</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="rotateRight">右旋转</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="saveHandle('blob')">保存</el-button>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </g-container>
</template>
<script>
import { VueCropper } from "vue-cropper";
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      option: { img: "", size: 1, outputType: "", autoCrop: true },
      dialogVisible: false,
      previews: {},
      avatarUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    };
  },
  methods: {
    handleShowCropper() {
      this.dialogVisible = true;
    },
    dialogBeforeClose() {
      this.dialogVisible = false;
    },
    changeScale(num) {
      this.$refs.cropper.changeScale(num);
    },
    // 左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    // 右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    beforeUpload(file) {
      console.log("🚀 ~ beforeUpload ~ file:", file);
      const reader = new FileReader();
      // / 转化为base64
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader, "reader");
        // this.previews.url = reader.result;
        this.option.img = reader.result;
      };
    },
    // 裁剪之后的数据
    realTime(data) {
      console.log("🚀 ~ realTime ~ data:", data);
      this.previews = data;
    },
    // 上传图片（点击保存按钮）
    saveHandle(type) {
      this.$refs.cropper.getCropData((data) => {
        this.dialogVisible = false;
        console.log(data);
        // data为base64图片，供接口使用
        this.avatarUrl = data;
        this.$emit("save", data);
      });
    },
    beforeDestory() {
      this.previews = null;
      this.option = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-avatar {
  cursor: pointer;
}
.preview-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  .avatar-upload-preview {
    overflow: hidden;
  }
}
</style>