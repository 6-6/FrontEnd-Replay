# 前端模块化CommonJS/AMD/CMD/ESModule

## 一、CommonJS
Node.js是commonJS规范的主要实践者，它有四个重要的环境变量为模块化的实现提供支持：module、exports、require、global。实际使用时，用module.exports定义当前模块对外输出的接口（不推荐直接用exports），用require加载模块。


## CommonJS 和 ES6 Module 的区别

### 一、前言
老规矩我们带上疑问开始今天的分析🤔🤔🤔：

1 Commonjs 和 Es Module 有什么区别 ？
2 Commonjs 如何解决的循环引用问题 ？
3 既然有了 exports，为何又出了 module.exports ? 既生瑜，何生亮 ？
4 require 模块查找机制 ？
5 Es Module 如何解决循环引用问题 ？
6 exports = {} 这种写法为何无效 ？
7 关于 import() 的动态引入 ？
8 Es Module 如何改变模块下的私有变量 ？

### 二、模块化
例举一个很常见的场景：

```html
<body>
  <script src="./index.js"></script>
  <script src="./home.js"></script>
  <script src="./list.js"></script>
</body>
```

如上在没有模块化的前提下，如果在 html 中这么写，那么就会暴露一系列问题。

#### 全局污染
没有模块化，那么 script 内部的变量是可以相互污染的。比如有一种场景：

````index.js```` 中声明 name 属性是一个字符串。

```javascript
var name = '我不是外星人'
```

````list.js```` 中，输出 name 属性，期待结果当然是字符串，然而````name````输出结果为函数。

```javascript
console.log(name)
```

打开````./home.js````发现，原来在此文件有一个同名````name````的函数，覆盖了之前的变量。

```javascript
function name(){
    //...
}
```

在早期未使用模块化的时期，我们可以用IIFE（匿名自执行函数），形成独立的作用域。这样是解决了问题，但是还存在一些问题。

```javascript
(function (){
    function name(){
        //...
    }
})()
```

#### 依赖管理
依赖管理也是一个难以处理的问题。例如JQuery时期，````bootstrap.js````依赖````JQuery````正常情况下，执行 js 的先后顺序就是 script 标签排列的前后顺序。那么如何三个 js 之间有依赖关系，那么应该如何处理呢？下面说道前端模块化的两个重要方案：````Commonjs```` 和 ````Es Module````


## 参考：
* [前端模块化：CommonJS,AMD,CMD,ES6](https://juejin.cn/post/6844903576309858318)
* [「万字进阶」深入浅出 Commonjs 和 Es Module](https://juejin.cn/post/6994224541312483336)