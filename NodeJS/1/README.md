## 问题：import 和 require 导入的区别？

## 解答：
这两个都是为了JS模块化编程使用.

**遵循规范**
* require 是 AMD规范引入方式
* import是es6的一个语法标准，如果要兼容浏览器的话必须转化成es5的语法

**调用时间**
* require 是赋值过程并且是运行时才执行，也就是同步加载，可以理解为一个全局方法，因为它是一个方法所以意味着可以在任何地方执行。
* import是解构过程并且是编译时执行，理解为异步加载，会提升到整个模块的头部，具有置顶性，但是建议写在文件的顶部。

**本质**
* require是赋值过程，其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量
* import是解构过程，但是目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require

**性能**
require 的性能相对于 import 稍低。

因为 require 是在运行时才引入模块并且还赋值给某个变量，而 import 只需要依据 import 中的接口在编译时引入指定模块所以性能稍高

require / exports ：
遵循 CommonJS/AMD，只能在运行时确定模块的依赖关系及输入/输出的变量，无法进行静态优化。
用法只有以下三种简单的写法：

```javascript
const fs = require('fs')
exports.fs = fs
module.exports = fs
```

import / export：
遵循 ES6 规范，支持编译时静态分析，便于JS引入宏和类型检验。动态绑定。
写法就比较多种多样：

```javascript
import fs from 'fs'
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'

export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'
```

1. 通过require引入基础数据类型时，属于复制该变量。
2. 通过require引入复杂数据类型时，数据浅拷贝该对象。
3. 出现模块之间的循环引用时，会输出已经执行的模块，而未执行的模块不输出（比较复杂）
4. CommonJS模块默认export的是一个对象，即使导出的是基础数据类型

## 示例：
* [import导入](./importExample1.html)
* [require基础导入](./requireExample1.html)
* [require导入配置依赖模块](./requireExample1.html)

关于require参考：
* https://requirejs.org/
* https://www.ruanyifeng.com/blog/2012/11/require_js.html
* https://www.runoob.com/w3cnote/requirejs-tutorial-1.html

关于两者区别和import参考：
* https://javascript.info/modules-intro
* https://www.cnblogs.com/hwldyz/p/9145959.html
* https://juejin.cn/post/7014011266796617736