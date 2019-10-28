// 字符串相乘
// 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    let arr1 = num1.split("").map(v => +v).reverse();
    let arr2 = num2.split("").map(v => +v).reverse();
    let res = [], carry = 0;
    for (let i = 0; i < arr1.length; i++) {
        carry = 0;
        for (let j = 0; j < arr2.length; j++) {
            let cur = arr1[i] * arr2[j] + carry + (res[i + j] || 0);
            carry = Math.floor(cur / 10);
            res[i + j] = cur % 10;
        }
        if(carry) res[i + arr2.length] = carry;
    }
    return res.reverse().join('').replace(/^0*/, '') || '0'
};

console.log(multiply('12355667', '123125666'));