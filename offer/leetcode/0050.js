// 实现 pow(x, n) ，即计算 x 的 n 次幂函数。

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    let res = 1;
    if(n === 0) return res;
    for (let i = 0; i < Math.abs(n); i++) {
        res *= x;
    }
    if(n < 0) return(1/res);

    return res;
};

var myPow = function(x, n) {
    let res = 1;
    if(n === 0) return res;
    for (let i = 0; i < Math.abs(n); i++) {
        res *= x;
    }
    if(n < 0) return(1/res);

    return res;
};

console.log(myPow(0, 1))