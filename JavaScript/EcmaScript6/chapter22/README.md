# Class 的基本语法
该章节需要知道基础概念：实例对象和原型对象、原型链、构造函数、new操作符...
## 1. 类的由来
JavaScript 语言中，生成实例对象的传统方法是通过构造函数。下面是一个例子。

参考实例：[普通函数创造构造函数](./类的由来/example01.html)

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

参考实例：[class创建构造函数](./类的由来/example02.html)

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return this.x + ',' + this.y;
  }
}
```

上面代码定义了一个“类”，可以看到里面有一个 `constructor()` 方法，这就是构造方法，而 `this` 关键字则代表实例对象。这种新的 `Class` 写法，本质上与本章开头的 ES5 的构造函数Point是一致的。

Point类除了构造方法，还定义了一个 `toString()` 方法。注意，定义 `toString()` 方法的时候，前面不需要加上 `function` 这个关键字，直接把函数定义放进去了就可以了。另外，方法与方法之间不需要逗号分隔，加了会报错。

ES6 的类，完全可以看作构造函数的另一种写法。

参考实例：[class创建构造函数](./类的由来/example02.html)

```javascript
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。

构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。

参考实例：[class创建构造函数2](./类的由来/example03.html)

```javascript
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

上面代码中，constructor()、toString()、toValue()这三个方法，其实都是定义在Point.prototype上面。当然实际上不能这么写，会导致覆盖prototype上的constructor。

因此，在类的实例上面调用方法，其实就是调用原型上的方法。

由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign()方法可以很方便地一次向类添加多个方法。

参考实例：[Object.assign给原型链上添加方法](./类的由来/example03.html)

```javascript
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```

prototype对象的constructor()属性，直接指向“类”的本身，这与 ES5 的行为是一致的。

```javascript
Point.prototype.constructor === Point // true
```

另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

参考实例：[不可枚举类的属性](./类的由来/example04.html)

```javascript
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)// []
Object.getOwnPropertyNames(Point.prototype)// ["constructor","toString"]
```
上面代码中，toString()方法是Point类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。

```javascript
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function () {
  // ...
};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

上面代码采用 ES5 的写法，toString()方法就是可枚举的。参考实例：[不可枚举类的属性](./类的由来/example04.html)

## 2. constructor() 方法
constructor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor()方法，如果没有显式定义，一个空的constructor()方法会被默认添加。

参考实例：[默认添加的constructor()方法](./constructor()%E6%96%B9%E6%B3%95/example01.html)

```javascript
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```

上面代码中，定义了一个空的类Point，JavaScript 引擎会自动为它添加一个空的constructor()方法。

constructor()方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

[改变constructor()方法默认返回的值](./constructor()%E6%96%B9%E6%B3%95/example02.html)

```javascript
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```

## 3. 类的实例
## 4. 实例属性的新写法
## 5. 取值函数（getter）和存值函数（setter）
## 6. 属性表达式
## 7. Class 表达式
## 8. 静态方法
## 9. 静态属性
## 10. 私有方法和私有属性
## 11. 静态块
## 12. 类的注意点
## 13. new.target 属性

**问题：**
1. class 在实际项目中使用的多吗？在哪里使用

[ECMAScript 6 入门教程 - Class 的基本语法](https://es6.ruanyifeng.·1com/#docs/class)