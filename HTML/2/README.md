## 问题：import 和 require 导入的区别？

## 解答：
import 的ES6 标准模块； require 是 AMD规范引入方式；
import是编译时调用，所以必须放在文件开头;是解构过程
require是运行时调用，所以require理论上可以运用在代码的任何地方;是赋值过程。其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量

## 示例：
* [import导入](./Example1.html)
* [require导入](./Example2.html)

参考：
* https://juejin.cn/post/6991724298197008421
* https://javascript.info/modules-intro
