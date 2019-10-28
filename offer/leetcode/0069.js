// 实现 int sqrt(int x) 函数。
// 计算并返回 x 的平方根，其中 x 是非负整数。
// 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    let res = 1;
    if(x == 0) return 0;
    while ((res + 1)*(res++ + 1) <= x);
    return res-1;
};
var mySqrt = function(x) {
    if(x == 1) return 1;
    let start = 0, end = x;
    while (start < end - 1){
        let temp = Math.floor((start + end)/2);
        if(temp*temp > x) {
            end = temp;
        } else {
            start = temp;
        }
    }
    return start;
};
var mySqrt = function(x) {
    if(x == 1) return 1;
    let start = 0, end = x;
    while (start < end - 1){
        let temp = Math.floor((start + end)/2);
        if(temp*temp > x) {
            end = temp;
        } else {
            start = temp;
        }
    }
    if(start * start === x) return start;
    
    let temp = (start + end)/2
    for (let i = 0; i < 1000; i++) {
        if(temp* temp > x) end = temp;
        else start = temp;
        temp = (start + end)/2
    }
    return temp;
};
console.log(mySqrt(2))