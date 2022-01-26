const _this = (typeof window !== 'undefined'
 ? window
 : (typeof process == 'object' && 
    typeof require === 'function' &&
    typeof global === 'object')
    ? global
: this);

console.log(_this);//global对象

// 这里使用的是require / import 的方式，方便nodejs运行，运行方式：Git Bash运行 > node example01.js
// 获取nodejs全局环境下的顶层对象
// 可以翻阅相关资料了解：FrontEnd-Replay\NodeJS\1\README.md
module.exports = _this