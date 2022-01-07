# BFC

## BFC是什么？
块格式化上下文（Block Formatting Context，BFC）简单来说就是，BFC是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。具象化来说BFC就像一个黑盒，子元素的样式不会影响到外面的布局。

## 如何创建BFC
* 根元素（```<html>```）
* 浮动元素
  * float不为none的其它属性
* display
  * flex
  * inline-flex
  * inline-block
  * table
  * table-cell
* position
  * absolute 
  * fixed
* overflow
  * auto
  * scroll
  * hidden


## BFC的规则
这些规则是BFC的特性记住就好：

1. BFC就是一个块级元素，块级元素会在垂直方向一个接一个的排列
2. BFC就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签
3. 垂直方向的距离由margin决定， 属于同一个BFC的两个相邻的标签外边距会发生重叠
4. BFC盒子会把内部的float盒子算进高度中

## BFC解决了什么问题
概念比较让人模糊，以下示例解释如何创建BFC环境，且可以解决什么样的问题。

1. [用BFC来解决margin边距重叠](./demo1.html)
1. 这个例子两个box都是float，脱离了文档流，所以父级container的计算的高度为0，背景色无法看到。如何解决这个问题呢？根据之前的**BFC的规则**第4条，BFC盒子会把内部的float盒子算进高度中。我们可以将父级创建成BFC盒子，这样就可以解决高度坍塌的问题了。[用BFC解决float导致的高度坍塌](./demo2.html)



参考：
* https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context
* https://juejin.cn/post/6950082193632788493
* https://juejin.cn/post/6982179919597928485#heading-11
