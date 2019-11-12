// 给定一个二进制字符串 S（一个仅由若干 '0' 和 '1' 构成的字符串）和一个正整数 N，
// 如果对于从 1 到 N 的每个整数 X，其二进制表示都是 S 的子串，就返回 true，否则返回 false。

/**
 * @param {string} S
 * @param {number} N
 * @return {boolean}
 */
var queryString = function(S, N) {
    for (let i = 1; i <= N; i++) {
        if(S.indexOf(new Number(i).toString(2)) === -1) return false;
    }
    return true;
};

console.log(queryString("0110", 6))