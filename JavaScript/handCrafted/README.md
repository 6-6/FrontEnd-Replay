# 《手写JavaScript代码》
本文参考[「中高级前端面试」JavaScript手写代码无敌秘籍](https://juejin.cn/post/6844903809206976520)的文章标题结构，作为个人读书笔记和准备面试。


## 一、手写一个JS深拷贝

### 赋值和深/浅拷贝的区别
关于浅拷贝和深拷贝的定义，请看[参考1](https://juejin.cn/post/6844903929705136141#heading-1)的文章。

**浅拷贝：** 如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是*内存地址*（指针） ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

**深拷贝：** 将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象。

从以上的论述可以看出，浅拷贝和深拷贝讨论的是引用类型，深拷贝会开辟新的内存空间，而浅拷贝只是复制内存地址。

这里很容易混淆的是赋值和浅拷贝，两者之间不同但又很相似。请看以下就是赋值/浅拷贝/深拷贝，更改数据三者的区别

|--| 和原数据是否指向同一对象 | 第一层数据为基本数据类型 | 原数据包含子对象 |
| --- | --- | --- | --- |
| **赋值** | 是 | 改变会使得原数据一同改变 | 改变会使得原数据一同改变 |
| **浅拷贝** | 否 | 改变**不**会使得原数据一同改变 | 改变会使得原数据一同改变 |
| **深拷贝** | 否 | 改变**不**会使得原数据一同改变 | 改变**不**会使得原数据一同改变 |

以下例子对比赋值与深/浅拷贝，得到的对象修改后对原始对象的影响：

[对象赋值](./diffrent/assign.html)

```javascript
let obj1 = {
    name : 't',
    arr : [1,[2,3],4],
};

// 对象赋值操作，本质上obj1和obj2指向同一个对象
let obj2 = obj1;

// 所以改动obj2对象中任意值，都会引起原数据obj1的变化
obj2.name = "t1";
obj2.arr[1] =[5,6,7] ;

console.log('obj1',obj1) // obj1 { name: 't', arr: [ 1, [ 5, 6, 7 ], 4 ] }
console.log('obj2',obj2) // obj2 { name: 't', arr: [ 1, [ 5, 6, 7 ], 4 ] }
```

[浅拷贝对象](./diffrent/shallowCopy.html)

```javascript
let obj1 = {
    name : 't',
    arr : [1,[2,3],4],
};

// 通过浅拷贝将obj1复制到obj2
let obj2 = shallowClone(obj1)

// 这是个浅拷贝的方法
function shallowClone(target) {
  let cloneTarget = {};
  for (const key in target) {
      cloneTarget[key] = target[key];
  }
  return cloneTarget;
}

// 尝试改变复制后的数据obj2
// 改变基础数据类型，不影响原有数据
obj2.name = "t1";
// 直接替换一个新的数组，栈内存的指针指向了，新的内存空间
// obj2.arr = [5,6,7] ; 

// 试想一下，cloneTarget[1] = [1,[2,3],4]
// 本质上是赋值操作，obj2.arr和obj1.arr指向同一个对象，所以改动其子对象，源数据也会发生改变
obj2.arr[1] = [5,6,7] ; 

console.log('obj1',obj1) // obj1 { name: 't', arr: [ 1, [ 5, 6, 7 ], 4 ] }
console.log('obj2',obj2) // obj2 { name: 't1', arr: [ 1, [ 5, 6, 7 ], 4 ] }
```

### 深拷贝-乞丐版（JSON.parse(JSON.stringify(obj))）
最开始用的最多的就是 ```JSON.parse(JSON.stringify(obj))``` ，一般的场景可以应对，但是遇到复杂场景就会出现很多问题。请看以下例子：[JSON.parse(JSON.stringify())深克隆的问题](./deepCopy/deepCopyPoor.html)，这种方法遇到了undefined类型又或是构造函数等，都会丢失或错误的转换。

### 深拷贝-基础版本
如果是浅拷贝的话，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性依次添加到新对象上，返回。

如果是深拷贝的话，考虑到我们要拷贝的对象是不知道有多少层深度的，我们可以用递归来解决问题，稍微改写上面的代码：
* 如果是原始类型，无需继续拷贝，直接返回
* 如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上。

[深拷贝1-简单版](./deepCopy/deepCopy1.html)

```javascript
function clone(target) {
    if (typeof target === 'object') {
        let cloneTarget = {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
};

const target = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8]
};

console.log(clone(target));
```

### 深拷贝-考虑数组
[深拷贝2-考虑数组](./deepCopy/deepCopy2.html)

### 深拷贝-循环引用
[深拷贝3-循环引用](./deepCopy/deepCopy3.html)

### 参考：
1. [如何写出一个惊艳面试官的深拷贝?](https://juejin.cn/post/6844903929705136141)
2. [JSON.parse(JSON.stringify(obj))实现深拷贝的弊端](https://juejin.cn/post/6844904130247573517)
3. [浅拷贝与深拷贝](https://juejin.cn/post/6844904197595332622)