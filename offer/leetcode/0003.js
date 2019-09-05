// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) { // TLE
    let max = 0;
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            let subS = s.slice(i, j+1);
            let len = new Set(subS).size;
            if(subS.length === len) max = Math.max(max, len)
        }
    }
    return max;
};

var lengthOfLongestSubstring = function(s) {
    let i = j = max = 0, mm = new Map();
    while (i < s.length && j <= i) {
        if(mm.has(s[i])) {
            mm.delete(s[j])
            j++;
        }else {
            mm.set(s[i], i);
            max = Math.max(max, mm.size);
            i++;
        }
    }
    return max;
};

var lengthOfLongestSubstring = function(s) {
    let mm = new Map(), max = 0;
    for (let i = 0, j = 0; j < s.length; j++) {
        if(mm.has(s[j])) {
            i = Math.max(mm.get(s[j]), i);
        }
        max = Math.max(max, j - i + 1);
        mm.set(s[j], j+1);
    }
    return max;
};

console.log(lengthOfLongestSubstring("abcabcbb"))