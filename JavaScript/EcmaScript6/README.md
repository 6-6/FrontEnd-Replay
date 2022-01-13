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
$ node --v8-options | grep harmony

// Windows
$ node --v8-options | findstr harmony
```

用git bash尝试了命令，报此错误```stdout is not a tty```，输入```bash```命令重启下即可。


文章参考：
* [ECMAScript 6 入门教程](https://es6ruanyifeng.com/)