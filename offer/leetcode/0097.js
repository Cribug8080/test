// 给定三个字符串 s1, s2, s3, 验证 s3 是否是由 s1 和 s2 交错组成的。

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, s3) {
    if(s1.length + s2.length != s3.length) return false
    if(s1 === '' && s1 === s2 && s1 === s3) return true;
    let flag = false
    if(s1[0] === s3[0]) flag = isInterleave(s1.slice(1), s2, s3.slice(1))
    if(flag) return true
    else if(s2[0] === s3[0]) return isInterleave(s1, s2.slice(1), s3.slice(1))
    else return false
};

console.log(isInterleave("a", "b", "a"))