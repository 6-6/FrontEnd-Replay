const getGlobal = function(){
  //ES2020 在语言标准的层面，引入globalThis作为顶层对象，指向全局环境下的this。
  if(typeof globalThis !== 'undefined') { return globalThis; }
  //现代浏览器支持ES2020的情况下，以下代码就不必要了，但为了兼容性还是用以下的比较好。
  if(typeof self !== 'undefined') { return self; }
  if(typeof window !== 'undefined') { return window; }
  if(typeof global !== 'undefined') { return global; }

  throw new Error('获取不到当前环境下的全局对象')
}

console.log(getGlobal());//global对象

// 这里使用的是require / import 的方式，方便nodejs运行，运行方式：Git Bash运行 > node example01.js
// 获取nodejs全局环境下的顶层对象
// 可以翻阅相关资料了解：FrontEnd-Replay\NodeJS\1\README.md
module.exports = getGlobal