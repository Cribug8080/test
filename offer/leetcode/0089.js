// 格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。
// 给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。格雷编码序列必须以 0 开头。

/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function(n) {
    return new Array(Math.pow(2, n)).fill(1).map((v, i) => i);
};

/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function(n) {
    let res = [0];
    let i = 1;
    while (i <= n) {
        let right = [];
        res.forEach(v => {
            right.unshift(Math.pow(2, n-1) + v)
        })
        res.push(...right);
        n--;
    }
    return res;
};

console.log(grayCode(3))