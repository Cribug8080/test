// 请你来实现一个 atoi 函数，使其能将字符串转换成整数。

/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    str = str.trim();
    let flag = true;
    if(str[0] === '+') {
        flag = true;
        str = str.slice(1)
    } else if(str[0] === '-') {
        flag = false;
        str = str.slice(1)
    }
    
    let index = str.search(/\D/)
    if(index === 0) {
        return 0;
    }else {
        if(index == -1) index = str.length;
        let res = str.slice(0, index);
        res = flag ? +res : -res;
        if(res > 2**31 - 1) return 2**31 - 1;
        else if(res < -(2**31)) return -(2**31);
        return res;
    }
};

console.log(myAtoi("4193 with words"))