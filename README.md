# mpa 项目创建模块

## 项目结构
```txt
├── out                                 编译后生成的文件
├── src
│   ├── extension.ts                    插件主代码
│   └── test                            单元测试
│       ├── runTest.ts
│       └── suite
│           ├── extension.test.ts
│           └── index.ts
├── .eslintrc.json                      eslint 配置
├── .vscodeignore                       发布到vscode marketplace时忽略的文件
└── tsconfig.json                       typescript配置
```

## 安装依赖

```sh
npm install
```

## 发布
```sh
npm run publish
```

## 自动创建模块代码

需要当前项目中创建 `mpa.tempalte.js`，

返回对象的 `key` 为文件名，`value` 是文件内容

下面创建了两个文件 `app.vue` 和 `main.js`

```js
module.exports = {
  render (pageName) {
    return {
      'app.vue':
`<template>
  <div>hello world</div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: '${pageName}'
});
</script>`,
      'main.js':
`import App from './app.vue';
import { createApp } from 'vue';
import 'tailwindcss/tailwind.css';
createApp(App)
  .mount('#${pageName}');
`
    };
  }
};
```