// 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let hashKey = {};
    strs.forEach((v, i) => {
        let key = v.split("").sort().join("")
        if(hashKey[key]) {
            hashKey[key].push(v)
        }else {
            hashKey[key] = [v]
        }
    })
    let res = [];
    Object.keys(hashKey).forEach(v => {
        res.push(hashKey[v])
    })
    return res;
};
console.log(groupAnagrams(["eat", "tea"]))