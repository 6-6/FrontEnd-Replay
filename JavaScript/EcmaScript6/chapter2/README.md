# let 和 const 命令
ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的**下一代标准**，已经在 2015 年 6 月正式发布了。

## 1.let 命令

### 基本用法
ES6 新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
[let和var的作用域](./基本用法/letExample01.html)
```javascript
if(true){
  let a = 10;
  var b = 1;
}

console.log(a); // Uncaught ReferenceError: a is not defined.
console.log(b) // 1
```
上面代码在代码块之中，分别用let和var声明了两个变量。然后在代码块之外调用这两个变量，结果let声明的变量报错，var声明的变量返回了正确的值。这表明，let声明的变量只在它所在的代码块有效。

for循环的计数器，就很合适使用let命令。
[let声明变量在for循环当中](./基本用法/letExample02.html)
```javascript
for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);
// ReferenceError: i is not defined
```

上面代码中，变量i只在for循环体内有效，在循环体外引用就会报错。

下面的代码如果使用var，最后输出的是10。
[var声明变量在for循环当中](./基本用法/letExample03.html)
```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```

上面代码中，变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，里面的i指向的就是全局的i。也就是说，所有数组a的成员里面的i，指向的都是同一个i，导致运行时输出的是最后一轮的i的值，也就是 10。

如果使用let，声明的变量仅在块级作用域内有效，最后输出的是 6。
[闭包保存for循环i的引用](./基本用法/letExample04.html)
```javascript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值（参考“闭包”的概念），初始化本轮的变量i时，就在上一轮循环的基础上进行计算。

文章参考：
* [ECMAScript 6 入门教程](https://es6.ruanyifeng.com/)