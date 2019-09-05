// 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if(x < 0) return false;
    let str = "" + x;
    let i = 0, j = str.length - 1;
    let flag =  true;
    while (i <= j) {
        flag = flag && str[i] === str[j];
        i++;
        j--;
    }
    return flag;
};
console.log(isPalindrome(1221))