## 问题：闭包了解吗？说说它的原理和使用场景

## 解答：

```javascript
//最简单常见的闭包结构
function a(){
    let value = 1;
    return function(){
        return value + 1;
    }
}

let instance = a();
instance();
```

简单回答：
闭包是指可以访问另一个函数作用域中变量的函数

闭包简要原理：
1. a函数内```return```一个匿名函数，这个匿名函数引用了a函数中的变量value。这样就会形成一个闭包，原因见第2点。
2. 外部作用域内的变量，因为被内部作用域引用，待内部作用域执行完毕后，外部作用域的变量才得到释放。
3. 闭包就像一个小背包，存储了函数定义创建时作用域中的所有变量。

### 使用场景
[闭包的运用-防抖函数](./debounce.html)
[闭包的运用-模拟块级作用域](./blockScope.html)
[闭包的运用-私有变量](./privateVariable.html)

### 闭包题目
[](./closureExample1.html)


参考：
* https://juejin.cn/post/6844903858636849159
* https://juejin.cn/post/7004638318843412493?share_token=f65e6692-0418-455d-b985-35a4301e8ea7#heading-8