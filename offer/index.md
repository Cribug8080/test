1. 实现一个自适应的搜索框,搜索按钮固定宽度,搜索框内容自适应填充父容器的剩余空间
2. 考察eventloop。宏任务和微任务有什么关系和不同。
3. 考察闭包

给你一个函数头如下:
`const repeat = function (func, times, wait) {};`
要求能够实现如下的情况:
repeat函数返回一个函数,使之可以这样子执行
```js
let repeatFunc = repeat(alert,4,3000);
repeatFunc("hello world"); 
//alert "hello world" 四次,
//每次之间间隔3秒,并且repeatFunc可以再次使用.
```
4. 写一个深度拷贝
5. cdn原理
6. [尾调用&尾递归](https://segmentfault.com/a/1190000014277519)。尾调用优化只在严格模式下有效，禁止arguments，caller这些属性
7. [词法分析、AST、V8、JIT](https://segmentfault.com/a/1190000011858383?utm_source=tag-newest)。[js引擎](https://segmentfault.com/a/1190000019205065)
8. 暂时性死区，let，const。引起typeof不再是一个百分之百安全的操作
9. 手写jsonp。要封装好，用完要删除script和引入的全局变量
10. 原生ajax
11. [变量提升，函数提升](https://blog.csdn.net/kontar123/article/details/83508740)。变量声明的提升是以变量所处的第一层词法作用域为“单位”的，即全局作用域中声明的变量会提升至全局最顶层，函数内声明的变量只会提升至该函数作用域最顶层。
12. 解构赋值
13. 
