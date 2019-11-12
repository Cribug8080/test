// 给出集合 [1,2,3,…,n]，其所有元素共有 n! 种排列。
// 按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：
// "123"
// "132"
// "213"
// "231"
// "312"
// "321"
// 给定 n 和 k，返回第 k 个排列。
// 说明：
// 给定 n 的范围是 [1, 9]。
// 给定 k 的范围是[1,  n!]。
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
    let res = [[1]];
    for (let i = 2; i <= n; i++) {
        let temp = []
        res.forEach(v => {
            temp.push(v.concat(i));
            for (let j = v.length - 1; j >= 0; j--) {
                let clone = [].concat(v)
                clone.splice(j, 0, i)
                temp.push(clone);
            }
        })
        res = [].concat(temp);
    }
    return res;
};
console.log(getPermutation(3, 1))