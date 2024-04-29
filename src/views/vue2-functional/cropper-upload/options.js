//组件的选项参数
//https://github.com/xyxiao001/vue-cropper
const option = {
  img: "", // 裁剪图片的地址
  info: true, // 裁剪框的大小信息
  outputSize: 0.8, // 裁剪生成图片的质量 [1至0.1]
  outputType: "jpeg", // 裁剪生成图片的格式
  canScale: false, // 图片是否允许滚轮缩放
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth: 300, // 默认生成截图框宽度
  autoCropHeight: 200, // 默认生成截图框高度
  fixedBox: true, // 固定截图框大小 不允许改变
  fixed: true, // 是否开启截图框宽高固定比例
  fixedNumber: [7, 5], // 截图框的宽高比例
  full: true, // 是否输出原图比例的截图
  canMoveBox: false, // 截图框能否拖动
  original: false, // 上传图片按照原始比例渲染
  centerBox: false, // 截图框是否被限制在图片里面
  infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
};
