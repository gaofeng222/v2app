## 组件之 GfSide

> 侧边栏组件一般有固定宽度用于导航菜单,布局

## 效果预览

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/983ee1dad13044fb961fde6af43df7e3.png)

## 属性

| 参数  |  类型  |     说明     | 可选值 | 默认值 |
| :---: | :----: | :----------: | :----: | :----: |
| width | String | 侧边栏的宽度 |        |  30%   |

## 代码实现

这里我们使用了 function 组件来实现 space 组件，比较简洁灵活

```js
<template>
  <aside class="el-aside" :style="{width}" v-bind="$attrs">
    <slot></slot>
  </aside>
</template>

<script>
export default {
  name: "GfAside",
  componentName: "GfAside",
  props: {
    width: {
      type: String,
      default: "300px",
    },
  },
};
</script>
```

**`样式文件可以参考elementui的实现`，后面会写一篇文章详细分析组件库的样式怎么去写的文章，敬请关注**

## 使用

> 借用上篇文章 tag 标签，来测试下平均布局的效果

```html
<gf-aside :width="!isCollapse ? '210px' : '50px'">
  <SiderBar
    class="sidebar-container"
    :style="{ width: !isCollapse ? '210px' : '50px' }"
  />
</gf-aside>
```

这样，我们就实现了自己的 side 组件
