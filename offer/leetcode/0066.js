// 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
// 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
// 你可以假设除了整数 0 之外，这个整数不会以零开头。

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    let up = 1;
    for (let i = digits.length-1; i > -1; i--) {
        let temp = digits[i] + up
        up = temp > 9?1:0;
        digits[i] = temp % 10;
    }
    if(up) digits.unshift(1);
    return digits;
};
console.log(plusOne([9,9,2]))