// 最长公共前缀

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(strs.length < 1) return "";
    let res = "";
    for (let i = 0; i < strs[0].length; i++) {
        let flag  = true;
        for (let j = 0; j < strs.length - 1; j++) {
            flag = flag && strs[j][i] === strs[j + 1][i]
        }
        if(!flag) return res;
        else res += strs[0][i];
    }
    return res;
};
console.log(longestCommonPrefix([""]))