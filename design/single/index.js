

//声明全局变量，并且禁止被修改
var gv = {};

Object.defineProperty(gv, 'name', {
    configurable:true,
    get: ()=>{
        return 'this.name'
    },
    set: (name)=>{
        // this.name = name
        throw new Error('不允许')
    }
})
console.log(gv.name)
console.log(gv.name = 'ssad')
