# Class 的基本语法

**文章来源：** [ECMAScript 6 入门教程 - Class 的基本语法](https://es6.ruanyifeng.com/#docs/class)

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

参考实例：[默认添加的constructor()方法](./constructor()方法/example01.html)

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

[改变constructor()方法默认返回的值](./constructor()方法/example02.html)

```javascript
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```

上面代码中，constructor()函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。

类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。

[类必须用new来调用](./constructor()方法/example03.html)

```javascript
class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'
```

## 3. 类的实例
类的属性和方法，除非显式定义在其本身（即定义在constructor()函数中的this对象上），否则都是定义在原型上（即定义在class上）。

[类的属性和方法](./类的实例/example01.html)

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return this.x + ', ' + this.y;
  }
}

var point = new Point(1, 2);

point.toString() // (1, 2)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```

上面代码中，x和y都是实例对象point自身的属性（因为定义在this对象上），所以hasOwnProperty()方法返回true，而toString()是原型对象的属性（因为定义在Point类上），所以hasOwnProperty()方法返回false。这些都与 ES5 的行为保持一致。

与 ES5 一样，类的所有实例共享一个原型对象。

```javascript
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
```

上面代码中，p1和p2都是Point的实例，它们的原型都是Point.prototype，所以__proto__属性是相等的。

### 问题：定义在this对象x,y通过point能够访问，为什么toString()也可以访问呢？

**解答：**

因为`new`操作符创建了新对象继承，并改变了this指向？

这个网站 [REPL 在线编译器](https://babeljs.io/repl/)，可以在线将 ES6 代码转为 ES5 代码，将ES6源码转成ES5来看看。

左侧菜单 "SETTINGS" 都可以打开，尤其是"Time Travel"可以看到转义的过程。如果没成功转换，点击  "Enabled -> Force All Transforms"。

**代码分析：**

转换后的代码：[类的ES5源码实现](./类的实例/example02.html)

1. 构造函数的调用

    ```javascript
    // 自执行函数
    var Point = /*#__PURE__*/ (function () {})();
    // 调用构造函数
    var point = new Point(1, 2);
    ```

    > 小知识点：
    > 
    > `/*#__PURE__*/` 表示的是一个纯函数，没有副作用的函数。
    > 
    > 作用：用在webpack的`tree-traking`时，如果没有使用该函数，就会直接移除掉该函数，用于缩小打包体积（优化）

2. _classCallCheck()函数
    `_classCallCheck(this, Point);` 的作用是检查函数的调用方式是否用 `new` 操作符。

    [为什么需要`_classCallCheck();`函数](./类的实例/example03.html)

    ```javascript
     /**
      * 描述：检查instance是否继承于Constructor，就是不能直接以 普通函数的方式调用
      * @param {Object} instance 实例对象
      * @param {Function} Constructor 构造函数 
      */
     function _classCallCheck(instance, Constructor) {
       if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
       }
     }
    ```

3. _createClass()函数
    `_createClass()` 的作用是大致目的就是，给类的原型上添加类方法，给类的本身上添加属性（静态方法）。

    [为什么需要`_defineProperties();`函数](./类的实例/example04.html)

    [为什么需要`_createClass();`函数](./类的实例/example05.html)
    
    ```javascript
      /**
      * 描述：给target上添加方法
      * @param {Function} target 
      * @param {Array} props 
      */
     function _defineProperties(target, props) {
       for (var i = 0; i < props.length; i++) {
         var descriptor = props[i];
         descriptor.enumerable = descriptor.enumerable || false;
         descriptor.configurable = true;
         if ("value" in descriptor) descriptor.writable = true;
         Object.defineProperty(target, descriptor.key, descriptor);
       }
     }
     ​
     /**
      * 描述：给类添加方法。原型上(Constructor.prototype) 或者 自身(Constructor)
      * @param {Function} Constructor 构造函数的原型
      * @param {Array} protoProps 类方法的集合
      * @param {Array} staticProps 静态方法的集合
      */
     function _createClass(Constructor, protoProps, staticProps) {
       // 添加在原型
       if (protoProps) _defineProperties(Constructor.prototype, protoProps);
       // 添加在本身
       if (staticProps) _defineProperties(Constructor, staticProps);
       Object.defineProperty(Constructor, "prototype", { writable: false });
       return Constructor;
     }
    ```


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

**参考文章：**
1. [ES6的class转ES5的源码阅读](https://juejin.cn/post/7122235657887416333)