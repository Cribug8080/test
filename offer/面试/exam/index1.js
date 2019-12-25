
// console.log(__dirname)
// console.log(console)
// console.log(module)
// console.log(process)

// var v = 'hhh';
// (function(){
//   console.log(v);
//   v="www"
// })()

// (function() {
//   var a = b = 3
// })()
// console.log(typeof a !== 'undefined')
// console.log(typeof b !== 'undefined')

// var a1 = 1;
// console.log(a1)
// console.log(a2)
// console.log(a3) // => a3 is not defined
// var a2 = 2
// a3 = 3 

function Foo() {
  getName = function(){console.log(1)}
  return this
}

Foo.getName = function(){console.log(2)}
Foo.prototype.getName = function(){console.log(3)}
var getName = function(){console.log(4)}
function getName(){console.log(5)}

Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()
