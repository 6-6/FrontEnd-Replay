# Class 的基本语法

## 类的由来
JavaScript 语言中，生成实例对象的传统方法是通过构造函数。下面是一个例子。

```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() {
  return this.x + ',' + this.y;
}

var p = new Point(1, 2);
p.toString(); // "1,2"
```

ES6 提供了更接近传统语言(JAVA、C++)的写法，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。

基本上，ES6 的 `class` 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 `class` 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的 `class` 改写，就是下面这样。

```javascript

```

**问题：**
1. class 在实际项目中使用的多吗？在哪里使用

[ECMAScript 6 入门教程 - Class 的基本语法](https://es6.ruanyifeng.com/#docs/class)