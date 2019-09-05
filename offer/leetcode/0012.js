// 罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。
// 整数转罗马数字

/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    const nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const lm = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let res = '', i = 0;
    while (i < lm.length) {
        while (num >= nums[i]) {
            res += lm[i];
            num -= nums[i];
        }
        i++;
    }
    return res;
};
console.log(intToRoman(10000))