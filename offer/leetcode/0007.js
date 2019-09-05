// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let arr = undefined, flag = true;
    if(x > 0) {
        arr = (x+'').split("");
    } else {
        arr = (-x+'').split("");
        flag = false;
    }
    let res = arr.reverse().join("");
    res = flag ? +res : -res
    if(res > 2**31 - 1 || res < -(2**31)) return 0;
    return res;
};

console.log(reverse(-123))