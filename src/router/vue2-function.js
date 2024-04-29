//vue2页面测试
import Layout from "@/views/layout";
const Vue2FunctionCompTest = () => import("@/views/vue2-functional/keep-alive");
const CropperAvatarUpload = () =>
  import("@/views/vue2-functional/cropper-upload");
export default {
  path: "/vue2",
  component: Layout,
  meta: {
    title: "vue2特性测试",
    icon: "el-icon-eleme",
  },
  children: [
    {
      path: "keep-alive",
      component: Vue2FunctionCompTest,
      name: "keep-alive-form",
      meta: {
        title: "页面缓存",
        icon: "el-icon-s-goods",
      },
      children: [],
    },
    {
      path: "cropper-upload",
      component: CropperAvatarUpload,
      name: "cropper-upload-avatar",
      meta: {
        title: "头像裁剪上传",
        icon: "el-icon-s-cooperation",
      },
      children: [],
    },
  ],
};
