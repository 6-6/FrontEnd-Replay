# 字符串的扩展
本章介绍 ES6 对字符串的改造和增强，下一章介绍字符串对象的新增方法。

> 可以通过[Unicode 字符百科](https://unicode-table.com/cn)查询相关字符的信息，也可以通过工具转码等操作。

## 1.字符的 Unicode 表示法
ES6 加强了对 Unicode 的支持，允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点。
[字符的Unicode表示法](./字符的Unicode表示法/example01.html)
```javascript
"\u0061"
// "a"
```

但是，这种表示法只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。
[字符的Unicode双字节表示法](./字符的Unicode表示法/example02.html)
```javascript
"\uD842\uDFB7"
// "𠮷"

"\u20BB7"
```

上面代码表示，如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7），JavaScript 会理解成\u20BB+7。由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7。

ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。
[大括号正确解读Unicode表示法](./字符的Unicode表示法/example03.html)
```javascript
"\u{20BB7}"
// "𠮷"

"\u{41}\u{42}\u{43}"
// "ABC"

let hello = 123;
hell\u{6F} // 123

'\u{1F680}' === '\uD83D\uDE80'
// true
```

上面代码中，最后一个例子表明，大括号表示法与四字节的 UTF-16 编码是等价的。

有了这种表示法之后，JavaScript 共有 6 种方法可以。
[Unicode表示一个字符的方式](./字符的Unicode表示法/example04.html)
```javascript
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```

## 2.字符串的遍历器接口
ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。

[字符串的遍历器接口](./字符串的遍历器接口/example01.html)
```javascript
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```

除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
[for和for of遍历字符串](./字符串的遍历器接口/example02.html)
```javascript
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
```

上面代码中，字符串text只有一个字符，但是for循环会认为它包含两个字符（都不可打印），而for...of循环会正确识别出这一个字符。


## 3.直接输入 U+2028 和 U+2029
JavaScript 字符串允许直接输入字符，以及输入字符的转义形式。举例来说，“中”的 Unicode 码点是 U+4e2d，你可以直接在字符串里面输入这个汉字，也可以输入它的转义形式\u4e2d，两者是等价的。

[汉字 和 Unicode 码点等价](./直接输入U+2028和U+2029/example01.html)
```javascript
'中' === '\u4e2d' // true
```

但是，JavaScript 规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。

- U+005C：反斜杠（reverse solidus)
- U+000D：回车（carriage return）
- U+2028：行分隔符（line separator）
- U+2029：段分隔符（paragraph separator）
- U+000A：换行符（line feed）

举例来说，字符串里面不能直接包含反斜杠，一定要转义写成\\或者\u005c。

这个规定本身没有问题，麻烦在于 JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。这样一来，服务器输出的 JSON 被JSON.parse解析，就有可能直接报错。

[JSON.parse()解析特殊字符](./直接输入U+2028和U+2029/example02.html)
```javascript
const json = '"\u2028"';
JSON.parse(json); // 可能报错
```

**JSON 格式已经冻结（RFC 7159），没法修改了。** 为了消除这个报错，ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。

```javascript
const PS = eval("'\u2029'");
```

根据这个提案，上面的代码不会报错。

注意，模板字符串现在就允许直接输入这两个字符。另外，正则表达式依然不允许直接输入这两个字符，这是没有问题的，因为 JSON 本来就不允许直接包含正则表达式。

## 4.JSON.stringify() 的改造
根据标准，JSON 数据必须是 UTF-8 编码。但是，现在的JSON.stringify()方法有可能返回不符合 UTF-8 标准的字符串。

具体来说，UTF-8 标准规定，0xD800到0xDFFF之间的码点，不能单独使用，必须配对使用。比如，\uD834\uDF06是两个码点，但是必须放在一起配对使用，代表字符```𝌆```。这是为了表示码点大于0xFFFF的字符的一种变通方法。单独使用\uD834和\uDF06这两个码点是不合法的，或者颠倒顺序也不行，因为\uDF06\uD834并没有对应的字符。

JSON.stringify()的问题在于，它可能返回0xD800到0xDFFF之间的单个码点。

```javascript
JSON.stringify('\u{D834}') // "\u{D834}"
```

为了确保返回的是合法的 UTF-8 字符，ES2019 改变了JSON.stringify()的行为。如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。

[JSON.stringify()解析特殊字符](./直接输入U+2028和U+2029/example03.html)
```javascript
JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""
```

## 5.模板字符串
传统的 JavaScript 语言，输出模板通常是这样写的（下面使用了 jQuery 的方法）。

```javascript
$('#result').append(
  'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);
```

上面这种写法相当繁琐不方便，ES6 引入了模板字符串解决这个问题。

[模板字符串示例1](./模板字符串/example01.html)
```javascript
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

[模板字符串示例2](./模板字符串/example02.html)
```javascript
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```
## 6.实例：模板编译
## 7.标签模板
## 8.模板字符串的限制

[ECMAScript 6 入门教程 - 字符串的扩展](https://es6.ruanyifeng.com/#docs/string)