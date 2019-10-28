// 给定一个仅包含大小写字母和空格 ' ' 的字符串，返回其最后一个单词的长度。
// 如果不存在最后一个单词，请返回 0 。
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    let arr = (s.trim()+'a').split(' ');
    return arr[arr.length - 1].length - 1;
};

console.log(lengthOfLastWord("  "))