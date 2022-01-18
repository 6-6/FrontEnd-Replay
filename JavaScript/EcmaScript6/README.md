# EcmaScript 6 教程
本文摘取各个网络上的es6教程，提供快速理解的查阅，因此带有个人主观的精简。

## ECMAScript 6 简介
ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的**下一代标准**，已经在 2015 年 6 月正式发布了。

### 1.ECMAScript 和 JavaScript 的关系
ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现日常场合，这两个词是可以互换的。

### 2.ES6 与 ECMAScript 2015 的关系
ECMAScript 2015（简称 ES2015）这个词，也是经常可以看到的。它与 ES6 是什么关系呢？

ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。以下就是ES6体系：

![ES6体系](https://7675-vuepress-7g6mefe5ad729c51-1258812673.tcb.qcloud.la/FrontEnd-Replay/JavaScript/EcmaScript6/es6_1.png?sign=d4a6a22406e99c60b9dc8714069187ad&t=1642083266)

### 3.语法提案的批准流程
任何人都可以向标准委员会（又称 TC39 委员会）提案，要求修改语言标准。

一种新的语法从提案到变成正式标准，需要经历五个阶段。每个阶段的变动都需要由 TC39 委员会批准。

Stage 0 - Strawman（展示阶段）
Stage 1 - Proposal（征求意见阶段）
Stage 2 - Draft（草案阶段）
Stage 3 - Candidate（候选人阶段）
Stage 4 - Finished（定案阶段）

一个提案只要能进入 Stage 2，就差不多肯定会包括在以后的正式标准里面。ECMAScript 当前的所有提案，可以在 TC39 的官方网站[GitHub.com/tc39/ecma262](https://github.com/tc39/ecma262)查看。

### 4.ECMAScript 的历史
目前，各大浏览器对 ES6 的支持可以查看[kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/)。

Node.js 是 JavaScript 的服务器运行环境（runtime）。它对 ES6 的支持度更高。除了那些默认打开的功能，还有一些语法功能已经实现了，但是默认没有打开。使用下面的命令，可以查看 Node.js 默认没有打开的 ES6 实验性语法。
```shell
// Linux & Mac
node --v8-options | grep harmony

// Windows
node --v8-options | findstr harmony
```

用git bash尝试了命令，报此错误```stdout is not a tty```，输入```bash```命令重启下即可。

### 5.Babel 转码器
[Babel](https://babeljs.io/) 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。下面是一个例子。
```javascript
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});
```

上面的原始代码用了箭头函数，Babel 将其转为普通函数，就能在不支持箭头函数的 JavaScript 环境执行了。

下面的命令在项目目录中，安装 Babel。
```shell
npm install --save-dev @babel/core
```

#### 配置文件.babelrc
Babel 的配置文件是```.babelrc```，存放在项目的根目录下。使用 Babel 的第一步，就是配置这个文件。
该文件用来设置转码规则和插件，基本格式如下。
```json
{
  "presets": [],
  "plugins": []
}
```

presets字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。

```shell
# 最新转码规则
npm install --save-dev @babel/preset-env

# react 转码规则
npm install --save-dev @babel/preset-react
```

手动创建.babelrc文件，然后将以下规则加入。

```json
{
  "presets": [
    "@babel/env",
    "@babel/preset-react"
  ],
  "plugins": []
}
```

注意，以下所有 Babel 工具和模块的使用，都必须先写好.babelrc。

#### 命令行转码
Babel 提供命令行工具```@babel/cli```，用于命令行转码。
它的安装命令如下：
```shell
npm install --save-dev @babel/cli
```

**基本用法如下：**

新建一个```example.js```，然后在文件中随意添加一个es6写法的代码。
```javascript
const fn = () => 1;
```

```shell
# 输出ES6转码后的结果
npx babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
npx babel example.js --out-file compiled.js
# 或者
npx babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
npx babel src --out-dir lib
# 或者
npx babel src -d lib

# -s 参数生成source map文件
npx babel src -d lib -s
```







文章参考：
* [ECMAScript 6 入门教程](https://es6.ruanyifeng.com/)