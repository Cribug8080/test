

## `static`
静态方法不能被实例使用。

## 事件传播的三个阶段
`Capturing > Target > Bubbling`
在捕获（capturing）阶段中，事件从祖先元素向下传播到目标元素。当事件达到目标（target）元素后，冒泡（bubbling）才开始。
![](https://raw.githubusercontent.com/Cribug8080/images/master/markdown/js-event.png)

## 除了基本对象（base object），所有对象都有原型。
基本对象可以访问一些方法和属性，比如 .toString。这就是为什么你可以使用内置的 JavaScript 方法！所有这些方法在原型上都是可用的。虽然 JavaScript 不能直接在对象上找到这些方法，但 JavaScript 会沿着原型链找到它们，以便于你使用。
## 使用标记模板字面量
第一个参数的值总是包含字符串的数组。其余的参数获取的是传递的表达式的值！
```js
function getPersonInfo(one, two, three) {
  console.log(one)
  console.log(two)
  console.log(three)
}

const person = 'Lydia'
const age = 21

getPersonInfo`${person} is ${age} years old`   // => ["", " is ", " years old"] "Lydia" 21
```

## 两个名称相同的键
如果你有两个名称相同的键，则键会被替换掉。它仍然位于第一个键出现的位置，但是值是最后出现那个键的值
## 对象的键被自动转换为字符串
```
const a = {}
const b = { key: 'b' }
const c = { key: 'c' }

a[b] = 123
a[c] = 456

console.log(a[b])
```
对象的键被自动转换为字符串。我们试图将一个对象 b 设置为对象 a 的键，且相应的值为 123。

然而，当字符串化一个对象时，它会变成 "[object Object]"。因此这里说的是，a["[object Object]"] = 123。然后，我们再一次做了同样的事情，c 是另外一个对象，这里也有隐式字符串化，于是，a["[object Object]"] = 456。

然后，我们打印 a[b]，也就是 a["[object Object]"]。之前刚设置为 456，因此返回的是 456。
## 事件循环

## 
```html
<div onclick="console.log('div')">
  <p onclick="console.log('p')">
    Click here!
  </p>
</div>
```
p div

如果我们点击 p，我们会看到两个日志：p 和 div。在事件传播期间，有三个阶段：捕获、目标和冒泡。默认情况下，事件处理程序在冒泡阶段执行（除非将 useCapture 设置为 true）。它从嵌套最深的元素向外传播。

## `bind call apply`
```js
const person = { name: 'Lydia' }

function sayHi(age) {
  console.log(`${this.name} is ${age}`)
}

sayHi.call(person, 21)  //立即执行
sayHi.bind(person, 21)  //返回函数
```

## [立即执行函数](https://segmentfault.com/a/1190000003985390)

## 下面哪些值是 falsy?
```js
0 // => falsy
new Number(0)
('') // => falsy
(' ')
new Boolean(false)
undefined // => falsy
```
只有 6 种 falsy 值
- undefined
- null
- NaN
- 0
- '' (empty string)
- false
## JavaScript 只有基本类型和对象。

## generator
```js
function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next()); // => {value: 10, done: false}
console.log(gen.next()); // => {value: 20, done: false}
console.log(gen.next()); // => {value: undefined, done: true}
```
## Promise
```js
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, "one");
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, "two");
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));
```
当我们向Promise.race方法中传入多个Promise时，会进行 优先 解析。在这个例子中，我们用setTimeout给firstPromise和secondPromise分别设定了500ms和100ms的定时器。这意味着secondPromise会首先解析出字符串two。那么此时res参数即为two，是为输出结果。
## 引用赋值
```js
let person = { name: "Lydia" };
const members = [person];
person = null;

console.log(members); // => [{ name: "Lydia" }]
```

## let x = (y = 10)
```js
(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);
```
## 引入的模块是只读的
```js
// counter.js
let counter = 10;
export default counter;

// index.js
import myCounter from "./counter";
myCounter += 1;
console.log(myCounter);
```
引入的模块是只读的: 你不能修改引入的模块。只有导出他们的模块才能修改其值。当我们给myCounter增加一个值的时候会抛出一个异常： myCounter是只读的，不能被修改。

### Object.defineProperty()
`Object.defineProperty(obj, prop, descriptor)`

descriptor

名字|默认|描述
--|--|--
`configurable`|`false`|当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变
`enumerable`|`false`|枚举属性
`writable`|`false`|当且仅当该属性的writable为true时，value才能被赋值运算符改变
`value`|`undefined`|值
`get`|`undefined`|
`set`|`undefined`|

### JSON.stringify
```js
let obj={a:{aa:1},b:22}
JSON.stringify(obj, ["a"]) // => "{"a":{}}"
JSON.stringify(obj, ["a", "aa"]) // => "{"a":{"aa":1}}"
```


