## 问题：页面导入样式时，使用link和@import有什么区别？

## 解答：

link和@import的区别：
1. link是HTML标签，除了引入样式还可以引入图片、字体（[<link>的功能](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link)），@import是css提供的。
2. link引入的样式页面加载时同时加载，@import引入的样式需等页面加载完成后再加载。
3. link没有兼容性问题，@import不兼容低版本浏览器（比如：ie5以下）。
4. link可以通过js操作DOM动态引入样式表改变样式，而@import不可以。

## 示例
* [link引入样式](./Example1.html)
* [@import引入样式](./Example2.html)

参考：https://xiangshuo.blog.csdn.net/article/details/52885924