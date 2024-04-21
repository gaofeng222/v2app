# v2app

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## 问题及解决方法

1.vue 项目中 scss 文件导出，js 文件引入 scss 文件时为空{}

> 解决办法一： 将 scss 文件重命名为 ‘原名.module.scss’  
> 解决办法二：降低 vue 脚手架的版本

```bash
"@vue/cli-plugin-babel": "~4.5.0",
"@vue/cli-plugin-eslint": "~4.5.0",
"@vue/cli-service": "~4.5.0",
```

2.import path from 'path'报错

> BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.> This is no longer the case. Verify if you need this module and configure a polyfill for it.

    这句话的意思是 webpack 5 之前是自动导入 node 一些核心模块的垫片，现在不导入了，你自己的导入吧！

    第一步：npm i -D path-browserify

    第二步：import path from 'path-browserify'

           或者：在 vue.config.js 里面修改
