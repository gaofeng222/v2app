## 组件之 GfSpace

> 多个同类型的内容比如 div/span/button/li 等，实现水平、垂直方向的均匀布局的功能

## 效果预览

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/983ee1dad13044fb961fde6af43df7e3.png)

## 属性

|   参数    |  类型   |      说明      |   可选值   | 默认值 |
| :-------: | :-----: | :------------: | :--------: | :----: |
|   flex    | Boolean | 是否 flex 布局 | true/false | false  |
|    gap    | Number  |    内容间距    |     -      |   10   |
| direction | String  |  内容排列方向  | row/column |  row   |

## 代码实现

这里我们使用了 function 组件来实现 space 组件，比较简洁灵活

```js
<script>
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
<Gf-space flex gap="10">
  <gf-tag
    closable
    @close="handleTagClose"
    v-for="item in tags"
    :key="item.name"
    :type="item.type"
    >{{ item.name }}</gf-tag
  >
</Gf-space>
<Gf-space flex gap="10" direction="column">
  <gf-tag
    closable
    effect="dark"
    @close="handleTagClose"
    v-for="item in tags"
    :key="item.name"
    :type="item.type"
    >{{ item.name }}</gf-tag
  >
</Gf-space>
```

这样，我们就实现了自己的 space 组件
