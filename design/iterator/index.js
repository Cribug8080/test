
//迭代器
/**
迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，
而又不需要暴露该对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，
在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素
 */

var myEach = function(array, callback){
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        callback.call(array, element, index, array)
    }
}

myEach([1,2,3],function(v,i,arr){
    console.log(`${this.join(',')}[${i}]=${v}`)
})
