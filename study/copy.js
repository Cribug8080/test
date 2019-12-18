
// deepClone
// function deepClone1(target) {
//     let res = {}
//     for (const key in target) {
//         res[key] = target[key]
//     }
//     return res;
// }

// let obj = {a: 1, b: {bb: 22}}
// let clone = deepClone1(obj)
// console.log(obj == clone)
// console.log(obj.b == clone.b)


// function deepClone2(target) {
//     if(typeof target === 'object' && target!== null) {
//         let res = Array.isArray(target) ? [] : {}
//         for (const key in target) {
//             res[key] = deepClone2(target[key])
//         }
//         return res;
//     } else {
//         return target
//     } 
// }

// let obj = {a: 1, b: {bb: 22}, c: [1,2]}
// // obj.circle = obj
// let clone = deepClone2(obj)
// console.log(clone)
// console.log(obj == clone)
// console.log(obj.b == clone.b)
// console.log(obj.c == clone.c)

// 正由于这样的弱引用，WeakMap 的 key 是不可枚举的 (没有方法能给出所有的 key)。
// 如果key 是可枚举的话，其列表将会受垃圾回收机制的影响，从而得到不确定的结果。
// 因此，如果你想要这种类型对象的 key 值的列表，你应该使用 Map。

// function deepClone3(target, map = new WeakMap()) {
//     if(typeof target === 'object' && target!== null) {
//         let res = Array.isArray(target) ? [] : {}
//         if(map.get(target)) return map.get(target)
//         map.set(target, res)
//         for (const key in target) {
//             res[key] = deepClone3(target[key], map)
//         }
//         return res;
//     } else {
//         return target
//     } 
// }

// let obj = {a: 1, b: {bb: 22}, c: [1,2]}
// obj.circle = obj
// let clone = deepClone3(obj)
// console.log(clone)
// console.log(obj == clone)
// console.log(obj.circle.circle == clone.circle.circle)

function cloneFn(fn) {
    // eval("res = " + fn.toString())
    return eval('(' + fn.toString() + ')');
}

function test(a,b,c) {
    return new Array(3).fill(1).map((v, i) => {
        return i+2
    })
}

cFn = cloneFn(test)
console.log(cFn === test)
console.log(test())
console.log(cFn())


