// 给定两个表示复数的字符串。
// 返回表示它们乘积的字符串。注意，根据定义 i2 = -1 。

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var complexNumberMultiply = function(a, b) {
    let [Aa, Ab] = a.replace('i', '').split('+').map(v => +v)
    let [Ba, Bb] = b.replace('i', '').split('+').map(v => +v)
    return (Aa*Ba - Ab*Bb) + '+' + (Aa*Bb+Ba*Ab+'i');
};

console.log(complexNumberMultiply("1+1i", "1+1i"))