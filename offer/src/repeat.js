
function print(){
    console.log(arguments[0] + arguments[1])
}

/**
 * @description 可以反复执行n次的函数
 * @param func 回调函数
 * @param times 执行次数
 * @param wait 间隔时间
 */
 const repeatFunc = function(func, times, wait){
    return function(){
        let num = 0;
        func(...arguments);
        let code = setInterval(()=>{
            num++;
            func(...arguments)
            if(num == times-1){
                clearInterval(code)
            }
        },wait)
    };
 }

let fn1 =  repeatFunc(print, 3, 1000)
fn1('123','234')


