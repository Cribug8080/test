// 给定两个二进制字符串，返回他们的和（用二进制表示）。
// 输入为非空字符串且只包含数字 1 和 0。
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let aLen = a.length, bLen = b.length;
    let maxLen = Math.max(aLen, bLen);
    let up = 0, res = "";
    for (let i = 1; i < maxLen + 1; i++) {
        let temp = up + (+a[aLen - i] || 0) + (+b[bLen - i] || 0)
        if(temp % 2 === 0) res = "0" + res;
        else res = "1" + res;
        if(temp > 1) up= 1;
        else up= 0;
    }
    if(up) res = "1" + res;
    return res;
};
console.log(addBinary('1010', '1011'))